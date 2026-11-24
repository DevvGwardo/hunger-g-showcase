import { expect, test, type Locator, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

interface ShowcaseRoute {
  path: string;
  name: string;
  heading: RegExp;
}

const routes: ShowcaseRoute[] = [
  { path: '/', name: 'showcase home', heading: /ideas in\.\s*worlds out\./i },
  { path: '/blockbound/', name: 'BLOCKBOUND', heading: /your next\s*adventure\s*starts here\./i },
  { path: '/starfall-acre/', name: 'STARFALL ACRE', heading: /grow a life\s*at your\s*own pace\./i },
  { path: '/hollowlight/', name: 'HOLLOWLIGHT', heading: /descend\s*into the\s*quiet\./i },
  { path: '/summit/', name: 'SUMMIT', heading: /the only way\s*is up\./i },
  { path: '/ember-oath/', name: 'EMBER OATH', heading: /defy\s*the descent/i },
  { path: '/driftlight/', name: 'DRIFTLIGHT', heading: /some journeys\s*need no words/i },
];

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
] as const;

function monitorRuntimeErrors(page: Page): string[] {
  const errors: string[] = [];

  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  page.on('pageerror', (error) => {
    errors.push(`pageerror: ${error.stack ?? error.message}`);
  });

  return errors;
}

async function visitRoute(page: Page, route: ShowcaseRoute, viewport: (typeof viewports)[number]) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(route.path, { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(route.heading);
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}

async function expectNoHorizontalOverflow(page: Page, label: string) {
  const layout = await page.evaluate(() => {
    const root = document.documentElement;
    const viewportWidth = root.clientWidth;
    const offenders = Array.from(document.querySelectorAll<HTMLElement>('body *'))
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          element: `${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ''}`,
          left: Math.round(rect.left),
          right: Math.round(rect.right),
        };
      })
      .filter(({ left, right }) => right > viewportWidth + 1 || left < -1)
      .slice(0, 8);

    return {
      clientWidth: viewportWidth,
      scrollWidth: root.scrollWidth,
      offenders,
    };
  });

  expect(
    layout.scrollWidth,
    `${label} overflows horizontally: ${JSON.stringify(layout.offenders)}`,
  ).toBeLessThanOrEqual(layout.clientWidth + 1);
}

async function scrollThroughPage(page: Page) {
  await page.evaluate(async () => {
    const nextFrame = () => new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });
    const step = Math.max(320, Math.floor(window.innerHeight * 0.75));
    const scrollHeight = document.documentElement.scrollHeight;

    for (let top = 0; top < scrollHeight; top += step) {
      window.scrollTo(0, top);
      await nextFrame();
    }

    window.scrollTo(0, scrollHeight);
    await nextFrame();
  });
}

async function expectVisibleImagesLoaded(page: Page) {
  const images = page.locator('img:visible');
  const count = await images.count();

  for (let index = 0; index < count; index += 1) {
    const image = images.nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(
      () => image.evaluate((element: HTMLImageElement) => element.naturalWidth),
      { message: `Visible image ${index + 1} of ${count} should finish loading` },
    ).toBeGreaterThan(0);
  }
}

async function expectFragmentTargets(page: Page, links: Locator, label: string) {
  const anchors = await links.evaluateAll((elements) => Array.from(elements).map((element) => {
    const anchor = element as HTMLAnchorElement;
    return {
      href: anchor.getAttribute('href') ?? '',
      label: anchor.getAttribute('aria-label') ?? anchor.textContent?.replace(/\s+/g, ' ').trim() ?? '',
    };
  }));
  const uniqueAnchors = [...new Map(anchors.map((anchor) => [anchor.href, anchor])).values()];

  expect(uniqueAnchors.length, `${label} should expose internal anchors`).toBeGreaterThan(0);

  for (const anchor of uniqueAnchors) {
    expect(anchor.href, `${label}: "${anchor.label}" needs a fragment target`).toMatch(/^#[^#]+$/);
    const targetExists = await page.evaluate((href) => {
      const encodedId = href.slice(1);
      let id = encodedId;
      try {
        id = decodeURIComponent(encodedId);
      } catch {
        // An invalid escape is still checked literally so the failure identifies the bad href.
      }
      return document.getElementById(id) !== null;
    }, anchor.href);

    expect(targetExists, `${label}: "${anchor.label}" points to missing target ${anchor.href}`).toBe(true);
  }
}

test('homepage links to every game and its internal targets exist', async ({ page }) => {
  await visitRoute(page, routes[0], viewports[0]);

  const linkedPaths = await page.locator('a[href]').evaluateAll((elements) => Array.from(elements).map((element) => {
    const pathname = new URL((element as HTMLAnchorElement).href).pathname;
    return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  }));

  for (const route of routes.slice(1)) {
    const expectedPath = route.path.replace(/\/+$/, '');
    expect(linkedPaths, `Homepage should link to ${route.name}`).toContain(expectedPath);
  }

  await expectFragmentTargets(
    page,
    page.locator('header a[href^="#"], main a[href^="#"], footer a[href^="#"]'),
    'showcase home navigation and CTAs',
  );
});

for (const route of routes) {
  test.describe(route.name, () => {
    for (const viewport of viewports) {
      test(`${viewport.name}: correct heading, clean runtime, loaded images, and no overflow`, async ({ page }) => {
        const runtimeErrors = monitorRuntimeErrors(page);
        const label = `${route.name} at ${viewport.width}px`;

        await visitRoute(page, route, viewport);
        await expectNoHorizontalOverflow(page, `${label} on initial load`);
        await scrollThroughPage(page);
        await expectVisibleImagesLoaded(page);
        await expectNoHorizontalOverflow(page, `${label} after scrolling`);
        await page.waitForLoadState('networkidle');

        expect(runtimeErrors, `${label} logged console or page errors`).toEqual([]);
      });

      test(`${viewport.name}: zero WCAG 2.1 A/AA axe violations`, async ({ page }) => {
        await visitRoute(page, route, viewport);
        await scrollThroughPage(page);

        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();
        const violations = results.violations.map((violation) => ({
          id: violation.id,
          impact: violation.impact,
          help: violation.help,
          nodes: violation.nodes.map((node) => ({
            target: node.target,
            summary: node.failureSummary,
          })),
        }));

        expect(
          violations,
          `${route.name} at ${viewport.width}px must have zero WCAG 2.1 A/AA violations`,
        ).toEqual([]);
      });
    }

    if (route.path !== '/') {
      test('primary navigation and CTA anchors resolve to existing targets', async ({ page }) => {
        for (const viewport of viewports) {
          await visitRoute(page, route, viewport);

          const menuToggle = page.locator('header button[aria-controls]:visible');
          if (await menuToggle.count() > 0) {
            const toggle = menuToggle.first();
            await toggle.click();
            await expect(toggle).toHaveAttribute('aria-expanded', 'true');
          }

          const navigationLinks = page.locator('header nav a[href^="#"], header .desktop-nav a[href^="#"]');
          const ctaLinks = page.locator(
            'header a[class*="cta" i][href^="#"], header a[class*="button" i][href^="#"], ' +
            'main a.button[href^="#"], main a[class*="cta" i][href^="#"]',
          );

          expect(await navigationLinks.count(), `${route.name} should expose primary navigation`).toBeGreaterThan(0);
          expect(await ctaLinks.count(), `${route.name} should expose a primary CTA`).toBeGreaterThan(0);
          await expectFragmentTargets(
            page,
            page.locator(
              'header a[href^="#"], main a.button[href^="#"], main a[class*="cta" i][href^="#"]',
            ),
            `${route.name} primary navigation and CTAs at ${viewport.width}px`,
          );
        }
      });
    }
  });
}
