import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('BLOCKBOUND experience', () => {
  test('loads without console or network failures', async ({ page }) => {
    const errors: string[] = [];
    const failures: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('requestfailed', (request) => failures.push(`${request.url()} ${request.failure()?.errorText}`));
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('YOUR NEXT');
    await expect(page.getByRole('heading', { name: 'THE WORLD IS WAITING.' })).toBeAttached();
    await page.waitForTimeout(500);
    expect(errors).toEqual([]);
    expect(failures).toEqual([]);
  });

  test('guided journey, gallery, and adventure dialogs work', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    await page.getByRole('button', { name: 'Watch the journey' }).click();
    const journey = page.getByRole('dialog', { name: 'Sunmeadow' });
    await expect(journey).toBeVisible();
    await page.getByRole('button', { name: 'Next biome' }).click();
    await expect(page.getByRole('dialog', { name: 'Whisperwood' })).toBeVisible();
    await page.getByRole('button', { name: 'Play journey' }).click();
    await expect(page.getByRole('button', { name: 'Pause journey' })).toBeVisible();
    await page.getByRole('button', { name: 'Pause journey' }).click();
    await expect(page.getByRole('button', { name: 'Play journey' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);

    await page.locator('#community').scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'Experiments', exact: true }).click();
    await expect(page.locator('.gallery-card')).toHaveCount(2);
    await page.getByRole('button', { name: /Small Wonders/ }).click();
    await expect(page.getByRole('dialog', { name: 'Small Wonders' })).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('dialog', { name: 'Elsewhere' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);

    await page.locator('#begin').scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'Start your adventure' }).click();
    await expect(page.getByRole('dialog', { name: /EVERY ADVENTURE/ })).toBeVisible();
    await page.getByRole('radio', { name: /The Wayfarer/ }).check();
    await expect(page.getByRole('radio', { name: /The Wayfarer/ })).toBeChecked();
    await page.getByRole('button', { name: 'Copy starter world seed' }).click();
    await expect(page.getByText('Seed copied to clipboard.')).toBeAttached();
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('link', { name: 'Download field guide' }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('BLOCKBOUND-field-guide.txt');
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });

  test('sound, feature notes, and mobile navigation are usable', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const sound = page.getByRole('button', { name: 'Sound off. Turn ambient sound on' });
    await sound.click();
    await expect(page.getByRole('button', { name: 'Sound on. Turn ambient sound off' })).toHaveAttribute('aria-pressed', 'true');
    await page.getByRole('button', { name: 'Sound on. Turn ambient sound off' }).click();
    await expect(page.getByRole('button', { name: 'Sound off. Turn ambient sound on' })).toHaveAttribute('aria-pressed', 'false');

    await page.getByRole('button', { name: 'Open navigation menu' }).click();
    await expect(page.locator('#mobile-menu')).toHaveClass(/is-open/);
    await page.keyboard.press('Escape');
    await expect(page.locator('#mobile-menu')).not.toHaveClass(/is-open/);
    await expect(page.getByRole('button', { name: 'Open navigation menu' })).toBeFocused();

    await page.locator('#features').scrollIntoViewIfNeeded();
    const notes = page.locator('.feature-notes').first();
    await notes.locator('summary').click();
    await expect(notes).toHaveAttribute('open', '');
    await expect(notes.locator('p')).toContainText('community pantry');
  });

  test('reduced motion provides a static biome experience', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('.biome-explorer')).toHaveClass(/is-static/);
    await expect(page.locator('.player-cursor')).toHaveCount(0);
    const duration = await page.locator('.hero-title .block-reveal__block').first().evaluate((element) => getComputedStyle(element).animationDuration);
    expect(duration).toBe('1e-05s');
  });

  test('desktop biome sequence pins and selector travels to a destination', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await expect(page.locator('.biome-explorer')).toHaveClass(/is-pinned/);
    await page.locator('#biomes').scrollIntoViewIfNeeded();
    await page.getByRole('tab', { name: /Emberwaste/ }).click();
    await expect(page.getByRole('tab', { name: /Emberwaste/ })).toHaveAttribute('aria-selected', 'true', { timeout: 15_000 });
    await expect(page.locator('#biome-panel h2')).toHaveText('Emberwaste');
    await expect(page.locator('.biome-pin')).toBeVisible();
  });

  test('responsive visual pass has no horizontal overflow', async ({ page }, testInfo) => {
    const sizes = [
      { name: 'desktop', width: 1440, height: 900 },
      { name: 'tablet', width: 1024, height: 768 },
      { name: 'mobile', width: 390, height: 844 },
    ];
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const size of sizes) {
      await page.setViewportSize({ width: size.width, height: size.height });
      await page.goto('/');
      const sections = ['top', 'world', 'biomes', 'features', 'community', 'begin'];
      for (const section of sections) {
        await page.locator(`#${section}`).evaluate((element) => {
          window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY);
        });
        await page.waitForTimeout(120);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow, `${size.name} overflow at #${section}`).toBeLessThanOrEqual(1);
        await page.screenshot({ path: testInfo.outputPath(`${size.name}-${section}.png`) });
      }
    }
  });

  test('automated WCAG audit has no violations', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const audit = async () => {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(results.violations.map((violation) => ({
        id: violation.id,
        nodes: violation.nodes.map((node) => node.target),
      }))).toEqual([]);
    };
    await audit();
    await page.getByRole('button', { name: 'Watch the journey' }).click();
    await audit();
    await page.keyboard.press('Escape');
    await page.locator('#begin').scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'Start your adventure' }).click();
    await audit();
    await page.keyboard.press('Escape');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.getByRole('button', { name: 'Open navigation menu' }).click();
    await audit();
  });

  test('keyboard reaches primary actions with visible focus', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to the world' })).toBeFocused();
    const outline = await page.getByRole('link', { name: 'Skip to the world' }).evaluate((element) => getComputedStyle(element).outlineStyle);
    expect(outline).not.toBe('none');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'BLOCKBOUND home' }).first()).toBeFocused();
    await page.getByRole('link', { name: 'Enter the world' }).focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#world$/);
  });
});
