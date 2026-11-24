import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { DriftScene } from '../../shared/scenes';
import { Eyebrow, GameFooter, GameNav, Reveal } from '../../shared/game-ui';

type ChapterId = 'dawn' | 'dunes' | 'ruins' | 'ascent';
type SignalId = 'notice' | 'follow' | 'rest' | 'look';

interface Chapter {
  id: ChapterId;
  numeral: string;
  name: string;
  moment: string;
  terrain: string;
  encounter: string;
  description: string;
  reflection: string;
}

interface Signal {
  id: SignalId;
  label: string;
  response: string;
  cx: number;
  cy: number;
}

interface TravelerNote {
  id: string;
  name: string;
  initials: string;
  location: string;
  chapter: string;
  moment: string;
  text: string;
  isNew?: boolean;
}

const CHAPTERS: Chapter[] = [
  {
    id: 'dawn',
    numeral: 'I',
    name: 'Dawn',
    moment: 'First warmth',
    terrain: 'The glass flats',
    encounter: 'A figure in the distance',
    description:
      'The desert wakes slowly. A pale sun catches the edge of a red scarf, and the first small step becomes a direction.',
    reflection: 'We begin with almost nothing. It is enough.',
  },
  {
    id: 'dunes',
    numeral: 'II',
    name: 'Dunes',
    moment: 'The long light',
    terrain: 'The singing sand',
    encounter: 'Footsteps that match yours',
    description:
      'Wind redraws the path as quickly as you can follow it. Beneath the shifting crests, a quiet rhythm carries you onward.',
    reflection: 'The way disappears. The walking remains.',
  },
  {
    id: 'ruins',
    numeral: 'III',
    name: 'Ruins',
    moment: 'Blue hour',
    terrain: 'The hollow court',
    encounter: 'A light left burning',
    description:
      'Old stones hold the last of the day. Someone has waited here before; a loose ribbon says they may still be nearby.',
    reflection: 'In the quiet, a stranger becomes a companion.',
  },
  {
    id: 'ascent',
    numeral: 'IV',
    name: 'Ascent',
    moment: 'The far horizon',
    terrain: 'The high spine',
    encounter: 'The summit, shared',
    description:
      'The air thins and the whole desert opens below. There is no finish line—only a horizon, and someone walking beside you.',
    reflection: 'We arrive somewhere. We do not arrive alone.',
  },
];

const SIGNALS: Signal[] = [
  {
    id: 'notice',
    label: 'Notice',
    response: 'A small glow rises between you. Your companion turns to look.',
    cx: 450,
    cy: 290,
  },
  {
    id: 'follow',
    label: 'Follow',
    response: 'The light drifts ahead. Two sets of footsteps find the same rhythm.',
    cx: 520,
    cy: 230,
  },
  {
    id: 'rest',
    label: 'Rest',
    response: 'The glow settles into the sand. For a moment, there is nowhere else to be.',
    cx: 450,
    cy: 420,
  },
  {
    id: 'look',
    label: 'Look up',
    response: 'A bright thread lifts toward the sky. You both follow where it leads.',
    cx: 610,
    cy: 145,
  },
];

const INITIAL_NOTES: TravelerNote[] = [
  {
    id: 'seed-mara',
    name: 'Mara',
    initials: 'MA',
    location: 'North Coast',
    chapter: 'Dawn',
    moment: '04:17 · First light',
    text: 'I stopped where the dunes turn blue. Someone waited until I caught up.',
  },
  {
    id: 'seed-sol',
    name: 'Sol',
    initials: 'SO',
    location: 'The Salt Reach',
    chapter: 'Ruins',
    moment: 'Blue hour · West arch',
    text: 'We never spoke. At the old arch, they tied our scarves into one bright line.',
  },
  {
    id: 'seed-ivo',
    name: 'Ivo',
    initials: 'IV',
    location: 'Above the clouds',
    chapter: 'Ascent',
    moment: '06:02 · Last ridge',
    text: 'The final climb was slower. The quiet made room for both of us.',
  },
];

const NOTES_KEY = 'driftlight-traveler-notes-v1';
const EMPTY_DRAFT = { name: '', text: '', chapter: 'Dawn', location: '' };

function readSavedNotes(): TravelerNote[] {
  try {
    const saved = window.localStorage.getItem(NOTES_KEY);
    if (!saved) return INITIAL_NOTES;
    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed)) return INITIAL_NOTES;
    const notes = parsed.filter((value: unknown): value is TravelerNote => {
      if (!value || typeof value !== 'object') return false;
      const note = value as Record<string, unknown>;
      return (
        typeof note.id === 'string' &&
        typeof note.name === 'string' &&
        typeof note.initials === 'string' &&
        typeof note.location === 'string' &&
        typeof note.chapter === 'string' &&
        typeof note.moment === 'string' &&
        typeof note.text === 'string'
      );
    });
    return notes.length ? notes.slice(0, 6) : INITIAL_NOTES;
  } catch {
    return INITIAL_NOTES;
  }
}

function Walker({
  x,
  y,
  scale = 1,
  cloak = '#25233b',
  scarf = '#dc8d78',
}: {
  x: number;
  y: number;
  scale?: number;
  cloak?: string;
  scarf?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="3" rx="17" ry="4" fill="#171724" opacity=".18" />
      <path d="M-4-10-7 2M4-10 8 2" stroke="#25233b" strokeWidth="4" strokeLinecap="round" />
      <path d="M-9-42Q0-50 9-42L14-10Q0-4-14-10Z" fill={cloak} />
      <circle cx="0" cy="-50" r="7" fill="#25233b" />
      <path d="M-6-45Q-21-48-31-36" fill="none" stroke={scarf} strokeWidth="4" strokeLinecap="round" />
      <path d="M-29-37Q-39-32-48-38" fill="none" stroke={scarf} strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function ChapterArtwork({ chapter }: { chapter: Chapter }) {
  const skyId = `drift-sky-${chapter.id}`;
  const sandId = `drift-sand-${chapter.id}`;

  return (
    <svg
      className="chapter-artwork"
      viewBox="0 0 900 620"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
          {chapter.id === 'dawn' && (
            <>
              <stop offset="0" stopColor="#6f627c" />
              <stop offset=".58" stopColor="#d79783" />
              <stop offset="1" stopColor="#f1c69a" />
            </>
          )}
          {chapter.id === 'dunes' && (
            <>
              <stop offset="0" stopColor="#b87572" />
              <stop offset=".62" stopColor="#e5a281" />
              <stop offset="1" stopColor="#f1c391" />
            </>
          )}
          {chapter.id === 'ruins' && (
            <>
              <stop offset="0" stopColor="#24243f" />
              <stop offset=".66" stopColor="#6c5872" />
              <stop offset="1" stopColor="#bd7f7d" />
            </>
          )}
          {chapter.id === 'ascent' && (
            <>
              <stop offset="0" stopColor="#171a35" />
              <stop offset=".66" stopColor="#41415e" />
              <stop offset="1" stopColor="#a97679" />
            </>
          )}
        </linearGradient>
        <linearGradient id={sandId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#efbd90" />
          <stop offset="1" stopColor="#a95f5b" />
        </linearGradient>
      </defs>

      <rect width="900" height="620" fill={`url(#${skyId})`} />

      {chapter.id === 'dawn' && (
        <>
          <circle cx="655" cy="235" r="94" fill="#f8ddae" opacity=".92" />
          <circle cx="655" cy="235" r="132" fill="#f8ddae" opacity=".08" />
          <path d="M0 398Q180 320 368 394T900 360V620H0Z" fill="#d99578" />
          <path d="M0 470Q220 355 472 470T900 425V620H0Z" fill={`url(#${sandId})`} />
          <path d="M0 540Q245 462 490 548T900 508V620H0Z" fill="#925456" />
          <path d="m162 438 15-70 17 70Z" fill="#654b58" />
          <path d="m207 451 11-49 13 49Z" fill="#76515a" />
          <Walker x={584} y={493} scale={1.25} cloak="#343047" scarf="#f3c59e" />
          <path d="M555 498q33 10 65 0" fill="none" stroke="#6b4650" strokeWidth="3" opacity=".5" />
        </>
      )}

      {chapter.id === 'dunes' && (
        <>
          <circle cx="196" cy="178" r="66" fill="#f7d6a6" opacity=".72" />
          <path d="M0 370Q205 230 445 365T900 320V620H0Z" fill="#d58d72" />
          <path d="M0 454Q255 315 510 438T900 390V620H0Z" fill={`url(#${sandId})`} />
          <path d="M-20 560Q240 410 560 535T920 485V620H-20Z" fill="#b96e62" />
          <path d="M550 354q78-54 153 0M85 321q70-38 145-5" fill="none" stroke="#f7d3a7" strokeWidth="3" strokeLinecap="round" opacity=".55" />
          <Walker x={625} y={480} scale={1.15} cloak="#353047" scarf="#f2b798" />
          <Walker x={685} y={489} scale={0.95} cloak="#4c4154" scarf="#d98270" />
        </>
      )}

      {chapter.id === 'ruins' && (
        <>
          <circle cx="690" cy="145" r="44" fill="#f0d9c0" opacity=".86" />
          <circle cx="690" cy="145" r="78" fill="#f0d9c0" opacity=".06" />
          <path d="M0 430Q225 365 448 430T900 395V620H0Z" fill="#aa6b69" />
          <path d="M0 510Q260 430 540 510T900 470V620H0Z" fill="#7b505b" />
          <path d="M300 482V284a150 150 0 0 1 300 0v198" fill="none" stroke="#c99581" strokeWidth="36" />
          <path d="M323 482V290a127 127 0 0 1 254 0v192" fill="none" stroke="#493c54" strokeWidth="9" opacity=".65" />
          <rect x="188" y="374" width="48" height="118" rx="3" fill="#b68176" />
          <rect x="664" y="354" width="49" height="138" rx="3" fill="#b68176" />
          <path d="M175 374h74M650 354h77" stroke="#d7a38a" strokeWidth="9" />
          <Walker x={451} y={503} scale={1.25} cloak="#24243d" scarf="#e4ad8a" />
          <circle cx="508" cy="465" r="7" fill="#f4c78f" />
          <circle cx="508" cy="465" r="22" fill="#f4c78f" opacity=".13" />
        </>
      )}

      {chapter.id === 'ascent' && (
        <>
          {[
            [92, 92], [190, 150], [285, 75], [382, 129], [495, 65], [610, 104], [733, 62], [835, 146],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.5" fill="#f7e4cf" opacity=".8" />
          ))}
          <circle cx="707" cy="162" r="52" fill="#efc8a8" opacity=".78" />
          <path d="m0 537 252-260 145 151 112-207 391 357v42H0Z" fill="#55465f" />
          <path d="m252 277 60 72-59-24-54 30ZM509 221l92 113-92-40-81 43Z" fill="#c3948c" />
          <path d="M0 536Q220 472 439 535T900 509V620H0Z" fill="#8f5964" />
          <path d="M0 581Q260 522 515 581T900 557V620H0Z" fill="#604054" />
          <Walker x={519} y={334} scale={0.72} cloak="#1f2038" scarf="#e3a084" />
          <Walker x={545} y={341} scale={0.62} cloak="#2b2c45" scarf="#f0c69d" />
        </>
      )}
    </svg>
  );
}

function SignalIcon({ signal }: { signal: SignalId }) {
  if (signal === 'notice') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="12" r="8" />
      </svg>
    );
  }
  if (signal === 'follow') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 12h15M14 6l6 6-6 6" />
      </svg>
    );
  }
  if (signal === 'rest') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 16h16M7 16a5 5 0 0 1 10 0M12 4v2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4Z" />
    </svg>
  );
}

function CompanionScene({ signal }: { signal: Signal }) {
  return (
    <svg
      className={`companion-scene companion-scene--${signal.id}`}
      viewBox="0 0 900 620"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`Two original desert travelers share a silent ${signal.label.toLowerCase()} signal beneath a glowing sky.`}
    >
      <defs>
        <linearGradient id="companion-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#30304d" />
          <stop offset=".64" stopColor="#a46d78" />
          <stop offset="1" stopColor="#dca183" />
        </linearGradient>
        <linearGradient id="companion-sand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d99a7c" />
          <stop offset="1" stopColor="#8e5463" />
        </linearGradient>
        <radialGradient id="companion-light">
          <stop offset="0" stopColor="#fff2cb" stopOpacity=".95" />
          <stop offset=".28" stopColor="#f4c98e" stopOpacity=".45" />
          <stop offset="1" stopColor="#f4c98e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="900" height="620" fill="url(#companion-sky)" />
      <circle cx="683" cy="188" r="78" fill="#f4d8b4" opacity=".14" />
      <circle cx="683" cy="188" r="43" fill="#f4d8b4" opacity=".76" />
      <path d="M0 384Q190 312 401 382T900 344V620H0Z" fill="#b47473" />
      <path d="M0 484Q246 371 502 471T900 439V620H0Z" fill="url(#companion-sand)" />
      <path d="M0 564Q260 494 560 560T900 525V620H0Z" fill="#774b5b" />
      <path
        className="companion-scene__thread"
        d="M321 402Q447 320 578 405"
        fill="none"
        stroke="#f4d5a8"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Walker x={350} y={497} scale={1.75} cloak="#25243d" scarf="#e79b80" />
      <Walker x={586} y={503} scale={1.65} cloak="#354754" scarf="#f0c99b" />
      <g key={signal.id} className="companion-scene__signal">
        <circle cx={signal.cx} cy={signal.cy} r="76" fill="url(#companion-light)" />
        <circle cx={signal.cx} cy={signal.cy} r="9" fill="#fff0c9" />
        <circle className="companion-scene__ring" cx={signal.cx} cy={signal.cy} r="28" fill="none" stroke="#ffe5b6" strokeWidth="2" />
      </g>
    </svg>
  );
}

export default function App() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeSignal, setActiveSignal] = useState<SignalId>('notice');
  const [compactChapterTabs, setCompactChapterTabs] = useState(false);
  const [notes, setNotes] = useState<TravelerNote[]>(readSavedNotes);
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [formError, setFormError] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const chapterTabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const noteDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 760px)');
    const updateOrientation = () => setCompactChapterTabs(mediaQuery.matches);
    updateOrientation();
    mediaQuery.addEventListener('change', updateOrientation);
    return () => mediaQuery.removeEventListener('change', updateOrientation);
  }, []);

  const chapter = CHAPTERS[activeChapter];
  const signal = SIGNALS.find((item) => item.id === activeSignal) ?? SIGNALS[0];

  function handleChapterKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const lastIndex = CHAPTERS.length - 1;
    let nextIndex = index;

    if (event.key === 'ArrowRight') nextIndex = (index + 1) % CHAPTERS.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + CHAPTERS.length) % CHAPTERS.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = lastIndex;
    else return;

    event.preventDefault();
    setActiveChapter(nextIndex);
    chapterTabRefs.current[nextIndex]?.focus();
  }

  function openNoteDialog() {
    setFormError('');
    noteDialogRef.current?.showModal();
  }

  function submitNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.text.trim();
    const name = draft.name.trim() || 'Unnamed walker';
    const location = draft.location.trim() || 'Somewhere along the way';

    if (text.length < 8) {
      setFormError('Leave at least eight characters for the next traveler.');
      return;
    }

    const initials = name
      .split(/\s+/)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    const newNote: TravelerNote = {
      id: `traveler-${Date.now()}`,
      name,
      initials,
      location,
      chapter: draft.chapter,
      moment: 'Just now · Your field note',
      text,
      isNew: true,
    };
    const nextNotes = [newNote, ...notes].slice(0, 6);

    setNotes(nextNotes);
    try {
      window.localStorage.setItem(NOTES_KEY, JSON.stringify(nextNotes));
    } catch {
      // The note remains visible for this visit if browser storage is unavailable.
    }
    setDraft(EMPTY_DRAFT);
    setFormError('');
    noteDialogRef.current?.close();
    setAnnouncement('Your field note is now part of the trail.');
  }

  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#journey">Skip to the journey</a>

      <GameNav
        name="DRIFTLIGHT"
        inspiration="A wordless adventure"
        links={[
          { href: '#journey', label: 'The crossing' },
          { href: '#connection', label: 'The connection' },
          { href: '#travelers', label: 'Traveler notes' },
        ]}
      />

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__scene" aria-hidden="true">
            <DriftScene />
          </div>
          <div className="hero__veil" aria-hidden="true" />
          <div className="hero__grain" aria-hidden="true" />

          <div className="hero__content container">
            <Eyebrow light>An original, unofficial fan-made concept</Eyebrow>
            <h1 id="hero-title">
              <span>Some journeys</span>
              <span>need no <em>words</em></span>
            </h1>
            <p className="hero__intro">
              Follow a ribbon of light across an endless desert. Meet strangers without speaking.
              Discover what can be said by simply staying.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#journey">
                Begin the crossing <span aria-hidden="true">↗</span>
              </a>
              <a className="text-link hero__text-link" href="#connection">
                Find another way to speak <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className="hero__footer container" aria-hidden="true">
            <span>35° N · The salt reach</span>
            <span className="hero__scroll">Follow the light <i /></span>
            <span>No map required</span>
          </div>
        </section>

        <section className="crossing section" id="journey" aria-labelledby="journey-title">
          <div className="container">
            <Reveal className="section-heading">
              <div>
                <Eyebrow>The crossing · A travel log</Eyebrow>
                <h2 id="journey-title">Four chapters.<br />One quiet horizon.</h2>
              </div>
              <p>
                Not a race. Not a map to master. Four moments in a landscape that changes you
                as gently as the light.
              </p>
            </Reveal>

            <Reveal className="chapter-layout" delay={100}>
              <div
                className="chapter-tabs"
                role="tablist"
                aria-label="Travel log chapters"
                aria-orientation={compactChapterTabs ? 'horizontal' : 'vertical'}
              >
                {CHAPTERS.map((item, index) => (
                  <button
                    key={item.id}
                    ref={(element) => { chapterTabRefs.current[index] = element; }}
                    className={`chapter-tab ${activeChapter === index ? 'is-active' : ''}`}
                    id={`chapter-tab-${item.id}`}
                    type="button"
                    role="tab"
                    aria-selected={activeChapter === index}
                    aria-controls="chapter-panel"
                    tabIndex={activeChapter === index ? 0 : -1}
                    onClick={() => setActiveChapter(index)}
                    onKeyDown={(event) => handleChapterKeyDown(event, index)}
                  >
                    <span className="chapter-tab__number">0{index + 1}</span>
                    <span className="chapter-tab__name">{item.name}</span>
                    <span className="chapter-tab__arrow" aria-hidden="true">↗</span>
                  </button>
                ))}
                <p className="chapter-tabs__hint">
                  <span aria-hidden="true">↔</span> Choose a chapter
                </p>
              </div>

              <div
                className="chapter-panel"
                id="chapter-panel"
                role="tabpanel"
                aria-labelledby={`chapter-tab-${chapter.id}`}
                tabIndex={0}
              >
                <div className="chapter-panel__inner" key={chapter.id}>
                  <div className={`chapter-art chapter-art--${chapter.id}`}>
                    <ChapterArtwork chapter={chapter} />
                    <div className="chapter-art__top" aria-hidden="true">
                      <span>{chapter.numeral} / IV</span>
                      <span>{chapter.moment}</span>
                    </div>
                    <div className="chapter-art__caption" aria-hidden="true">
                      <span>Travel log · 0{activeChapter + 1}</span>
                      <strong>{chapter.name}</strong>
                    </div>
                  </div>

                  <div className="chapter-copy">
                    <div>
                      <p className="chapter-copy__description">{chapter.description}</p>
                      <p className="chapter-copy__reflection">“{chapter.reflection}”</p>
                    </div>
                    <dl className="chapter-copy__meta">
                      <div>
                        <dt>Landscape</dt>
                        <dd>{chapter.terrain}</dd>
                      </div>
                      <div>
                        <dt>Encounter</dt>
                        <dd>{chapter.encounter}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="connection section" id="connection" aria-labelledby="connection-title">
          <div className="connection__glow" aria-hidden="true" />
          <div className="container">
            <div className="connection__layout">
              <Reveal className="connection__copy">
                <Eyebrow light>A language older than language</Eyebrow>
                <h2 id="connection-title">We find each other<br />in the quiet.</h2>
                <p className="connection__intro">
                  A tilt of the head. A light held a little longer. A scarf caught by the same wind.
                  Companionship begins before the first word.
                </p>

                <div className="signal-lab">
                  <p className="signal-lab__label" id="signal-label">Try a silent signal</p>
                  <div className="signal-buttons" role="group" aria-labelledby="signal-label">
                    {SIGNALS.map((item) => (
                      <button
                        key={item.id}
                        className={`signal-button ${activeSignal === item.id ? 'is-active' : ''}`}
                        type="button"
                        aria-pressed={activeSignal === item.id}
                        onClick={() => setActiveSignal(item.id)}
                      >
                        <SignalIcon signal={item.id} />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                  <p className="signal-lab__response" aria-live="polite">{signal.response}</p>
                </div>
              </Reveal>

              <Reveal className="companion-visual" delay={120}>
                <div className="companion-visual__frame">
                  <CompanionScene signal={signal} />
                  <div className="companion-visual__label" aria-hidden="true">
                    <span>Signal 0{SIGNALS.findIndex((item) => item.id === signal.id) + 1}</span>
                    <span>No translation needed</span>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal className="connection-principles" delay={160}>
              <article>
                <span>01</span>
                <h3>Notice</h3>
                <p>Attention is the first gift. Someone else is here, moving through the same light.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Answer</h3>
                <p>A small signal is enough. Understanding does not always need a voice.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Stay</h3>
                <p>The deepest connection is simple: choosing to walk a little farther together.</p>
              </article>
            </Reveal>
          </div>
        </section>

        <section className="travelers section" id="travelers" aria-labelledby="travelers-title">
          <div className="container">
            <Reveal className="section-heading travelers__heading">
              <div>
                <Eyebrow>Community · Traveler notes</Eyebrow>
                <h2 id="travelers-title">Traces left by<br />other walkers.</h2>
              </div>
              <div className="travelers__invitation">
                <p>
                  Not reviews. Not scores. Just small memories from people who took the long way.
                </p>
                <button className="text-link travelers__button" type="button" onClick={openNoteDialog}>
                  Leave a field note <span aria-hidden="true">↗</span>
                </button>
              </div>
            </Reveal>

            <div className="traveler-notes" aria-live="polite">
              {notes.map((note, index) => (
                <Reveal className={`traveler-note ${note.isNew ? 'traveler-note--new' : ''}`} delay={index * 70} key={note.id}>
                  <div className="traveler-note__top">
                    <span className="traveler-note__chapter">{note.chapter}</span>
                    <span className="traveler-note__quote" aria-hidden="true">“</span>
                  </div>
                  <blockquote>{note.text}</blockquote>
                  <div className="traveler-note__person">
                    <span className="traveler-note__avatar" aria-hidden="true">{note.initials}</span>
                    <div>
                      <cite>{note.name}</cite>
                      <span>{note.location}</span>
                    </div>
                    <time>{note.moment}</time>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="travelers__footnote">
              <span aria-hidden="true">✳</span> Field notes are stored only in this browser. This is a concept, not a live service.
            </p>
          </div>
        </section>

        <section className="finale section" id="begin" aria-labelledby="finale-title">
          <div className="finale__stars" aria-hidden="true" />
          <div className="finale__halo" aria-hidden="true" />
          <Reveal className="finale__content">
            <Eyebrow light>There is still light ahead</Eyebrow>
            <h2 id="finale-title">We walk<br /><em>together.</em></h2>
            <p>One horizon. No finish line. Just a place beside you.</p>
            <a className="button button--primary finale__button" href="#journey">
              Find your first light <span aria-hidden="true">↗</span>
            </a>
            <span className="finale__note">A fan-made concept · Best wandered slowly</span>
          </Reveal>
        </section>
      </main>

      <GameFooter
        name="DRIFTLIGHT"
        inspiration="Journey"
        note="Made for the moments between words."
      />

      <dialog
        className="note-dialog"
        ref={noteDialogRef}
        aria-labelledby="note-dialog-title"
        aria-describedby="note-dialog-description"
        onClose={() => setFormError('')}
      >
        <div className="note-dialog__inner">
          <button className="note-dialog__close" type="button" onClick={() => noteDialogRef.current?.close()} aria-label="Close field note form">
            <span aria-hidden="true">×</span>
          </button>
          <Eyebrow>Leave a trace</Eyebrow>
          <h2 id="note-dialog-title">What did the quiet show you?</h2>
          <p id="note-dialog-description">
            A sentence, a moment, a small kindness. Your note stays on this device and joins your local trail.
          </p>

          <form className="note-form" onSubmit={submitNote} noValidate>
            <div className="note-form__row">
              <div className="note-form__field">
                <label htmlFor="note-name">Traveler name <span>(optional)</span></label>
                <input
                  id="note-name"
                  name="name"
                  type="text"
                  autoComplete="nickname"
                  maxLength={32}
                  placeholder="A name, an initial, a mystery"
                  value={draft.name}
                  onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
                />
              </div>
              <div className="note-form__field">
                <label htmlFor="note-location">Where? <span>(optional)</span></label>
                <input
                  id="note-location"
                  name="location"
                  type="text"
                  maxLength={40}
                  placeholder="Somewhere along the way"
                  value={draft.location}
                  onChange={(event) => setDraft((current) => ({ ...current, location: event.target.value }))}
                />
              </div>
            </div>

            <div className="note-form__field">
              <label htmlFor="note-chapter">Chapter</label>
              <select
                id="note-chapter"
                name="chapter"
                value={draft.chapter}
                onChange={(event) => setDraft((current) => ({ ...current, chapter: event.target.value }))}
              >
                {CHAPTERS.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
              </select>
            </div>

            <div className="note-form__field">
              <label htmlFor="note-text">Your field note</label>
              <textarea
                id="note-text"
                name="note"
                required
                minLength={8}
                maxLength={180}
                rows={4}
                placeholder="I stopped here when…"
                aria-describedby={formError ? 'note-error note-count' : 'note-count'}
                value={draft.text}
                onChange={(event) => setDraft((current) => ({ ...current, text: event.target.value }))}
              />
              <div className="note-form__meta">
                <p className="note-form__error" id="note-error" role="alert">{formError}</p>
                <span id="note-count">{draft.text.length} / 180</span>
              </div>
            </div>

            <button className="button button--primary note-form__submit" type="submit">
              Pin this note to the trail <span aria-hidden="true">↗</span>
            </button>
            <p className="note-form__privacy">No account. No server. Just a trace left in this browser.</p>
          </form>
        </div>
      </dialog>

      <span className="sr-only" role="status">{announcement}</span>
    </div>
  );
}
