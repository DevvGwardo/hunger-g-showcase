import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { Eyebrow, GameFooter, GameNav, Reveal } from '../../shared/game-ui';
import { SummitScene } from '../../shared/scenes';

const chapters = [
  {
    number: '01',
    name: 'First Light',
    shortName: 'Foothills',
    elevation: '1,280',
    difficulty: 'Gentle',
    mechanic: 'Momentum',
    progress: 12,
    color: '#ffd27d',
    description:
      'Find your footing where the forest meets the snow. Wide ledges, forgiving winds, and just enough height to make your first dash feel enormous.',
    note: 'Learn the rhythm. The mountain is patient.',
    path: 'M70 278 C112 245 132 263 164 226 S230 190 258 211 S315 177 350 151',
  },
  {
    number: '02',
    name: 'Blue Hour',
    shortName: 'Icefield',
    elevation: '2,140',
    difficulty: 'Steady',
    mechanic: 'Air dash',
    progress: 31,
    color: '#9edce7',
    description:
      'Cross a frozen sea of blue glass. Chain dashes between ice shelves, read the wind lanes, and turn a long fall into a perfectly timed crossing.',
    note: 'One dash is a step. Three are a line.',
    path: 'M70 278 C122 274 125 214 173 222 S244 164 276 181 S335 127 350 151',
  },
  {
    number: '03',
    name: 'Splinter Ridge',
    shortName: 'Ridge',
    elevation: '3,020',
    difficulty: 'Technical',
    mechanic: 'Wall hold',
    progress: 52,
    color: '#ff8d78',
    description:
      'Climb the broken spine of the mountain. Narrow holds and shifting stone reward a calm hand, a deliberate kick, and the courage to let go.',
    note: 'Stillness is a move, too.',
    path: 'M70 278 C115 263 111 191 161 207 S197 139 242 154 S280 104 318 128 S340 145 350 151',
  },
  {
    number: '04',
    name: 'The Whiteout',
    shortName: 'Whiteout',
    elevation: '3,860',
    difficulty: 'Relentless',
    mechanic: 'Wind shift',
    progress: 76,
    color: '#f5f4ea',
    description:
      'The trail disappears into fast weather. Follow the cairns, read the gusts, and keep moving when every instinct tells you to stop.',
    note: 'You cannot see the top. You can see the next hold.',
    path: 'M70 278 C125 286 130 225 180 233 S215 163 258 184 S303 112 350 151',
  },
  {
    number: '05',
    name: 'The Pale Crown',
    shortName: 'Summit',
    elevation: '4,620',
    difficulty: 'Final',
    mechanic: 'Every tool',
    progress: 100,
    color: '#ff715c',
    description:
      'Everything you have learned becomes one last ascent. Open sky, thin air, and a final ridge that asks for the cleanest version of your line.',
    note: 'The summit is not the end. It is your point of view.',
    path: 'M70 278 C105 256 132 247 156 220 S205 185 236 191 S282 144 310 153 S336 139 350 151',
  },
] as const;

type Chapter = (typeof chapters)[number];

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d={down ? 'M10 3v13m-5-5 5 5 5-5' : 'M4 10h12m-5-5 5 5-5 5'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__scene">
        <SummitScene />
      </div>
      <div className="hero__shade" />
      <div className="container hero__inner">
        <div className="hero__content">
          <Eyebrow light>An original alpine precision-platformer concept</Eyebrow>
          <h1 id="hero-title">
            <span>The only way</span>{' '}
            <span>
              is <em>up.</em>
            </span>
          </h1>
          <p className="hero__intro">
            One mountain. Five chapters. A thousand ways to find your line.
            Read the ridge, trust the rhythm, and take the next jump.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#trail">
              Start the ascent <Arrow />
            </a>
            <a className="button button--secondary" href="#challenge">
              Find your pace
            </a>
          </div>
          <dl className="hero__facts" aria-label="Game concept at a glance">
            <div>
              <dt>Chapters</dt>
              <dd>05</dd>
            </div>
            <div>
              <dt>Summit</dt>
              <dd>4,620 m</dd>
            </div>
            <div>
              <dt>Difficulty</dt>
              <dd>Yours</dd>
            </div>
          </dl>
        </div>
        <div className="hero__route-note" aria-hidden="true">
          <span>Mt. Vela</span>
          <strong>46° 32′ N</strong>
          <span>The Pale Crown route</span>
        </div>
      </div>
      <a className="hero__scroll" href="#trail">
        <span>Follow the trail</span>
        <Arrow down />
      </a>
    </section>
  );
}

function RouteDiagram({ chapter, index }: { chapter: Chapter; index: number }) {
  const markerPositions = [
    [70, 278],
    [170, 222],
    [248, 161],
    [292, 161],
    [350, 151],
  ];

  return (
    <div className="route-diagram">
      <div className="route-diagram__topline">
        <span>Route profile</span>
        <span>01—05</span>
      </div>
      <svg viewBox="0 0 420 340" role="img" aria-labelledby={`route-title-${index}`}>
        <title id={`route-title-${index}`}>{chapter.name} climbing route profile</title>
        <defs>
          <linearGradient id={`route-fill-${index}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={chapter.color} stopOpacity=".38" />
            <stop offset="1" stopColor={chapter.color} stopOpacity="0" />
          </linearGradient>
          <pattern id={`route-grid-${index}`} width="42" height="42" patternUnits="userSpaceOnUse">
            <path d="M42 0H0V42" fill="none" stroke="currentColor" strokeOpacity=".08" />
          </pattern>
        </defs>
        <rect width="420" height="340" fill={`url(#route-grid-${index})`} />
        <path d="M70 278V62M350 151V42M70 278H375" className="route-diagram__axis" />
        <path
          d="M70 278 C105 256 132 247 156 220 S205 185 236 191 S282 144 310 153 S336 139 350 151 V320 H70Z"
          fill={`url(#route-fill-${index})`}
        />
        <path d="M70 278 C105 256 132 247 156 220 S205 185 236 191 S282 144 310 153 S336 139 350 151" className="route-diagram__mountain" />
        <path d={chapter.path} className="route-diagram__active-route" style={{ stroke: chapter.color }} />
        {markerPositions.map(([x, y], markerIndex) => (
          <g key={`${x}-${y}`}>
            <circle
              cx={x}
              cy={y}
              r={markerIndex === index ? 11 : 6}
              fill={markerIndex <= index ? chapter.color : '#153640'}
              stroke={markerIndex === index ? '#f7f5ed' : chapter.color}
              strokeWidth={markerIndex === index ? 3 : 1.5}
            />
            {markerIndex === index && (
              <path d={`M${x} ${y - 19}v-13m0 0 10 4-10 4`} fill="none" stroke="#f7f5ed" strokeWidth="2" />
            )}
          </g>
        ))}
        <text x="55" y="307">1K</text>
        <text x="334" y="307">5K</text>
        <text x="342" y="129">SUMMIT</text>
      </svg>
      <div className="route-diagram__legend">
        <span><i style={{ background: chapter.color }} /> Active line</span>
        <span>Vertical scale / 4,620 m</span>
      </div>
    </div>
  );
}

function TrailSection({
  activeChapter,
  onSelect,
}: {
  activeChapter: number;
  onSelect: (index: number) => void;
}) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const chapter = chapters[activeChapter];

  const handleTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % chapters.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + chapters.length) % chapters.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = chapters.length - 1;
    else return;

    event.preventDefault();
    onSelect(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section className="trail-section section" id="trail" aria-labelledby="trail-title">
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <Eyebrow>Five chapters. One continuous climb.</Eyebrow>
            <h2 id="trail-title">Choose your<br />next horizon.</h2>
          </div>
          <p>
            Every chapter introduces a new idea, then asks you to make it your own.
            Start at the foothills or jump straight to the ridge. There is no wrong way up.
          </p>
        </Reveal>

        <Reveal className="trail-explorer" delay={100}>
          <div className="trail-selector">
            <div className="trail-progress" aria-label={`Chapter ${activeChapter + 1} of 5`}>
              <span className="trail-progress__line">
                <span style={{ width: `${chapter.progress}%` }} />
              </span>
              <span>{chapter.progress}% of the ascent</span>
            </div>
            <div className="trail-tabs" role="tablist" aria-label="Summit chapters" aria-orientation="vertical">
              {chapters.map((item, index) => (
                <button
                  key={item.number}
                  ref={(element) => { tabRefs.current[index] = element; }}
                  id={`chapter-tab-${index}`}
                  className={`chapter-tab ${index === activeChapter ? 'is-active' : ''}`}
                  type="button"
                  role="tab"
                  aria-selected={index === activeChapter}
                  aria-controls="chapter-panel"
                  tabIndex={index === activeChapter ? 0 : -1}
                  onClick={() => onSelect(index)}
                  onKeyDown={(event) => handleTabKey(event, index)}
                >
                  <span className="chapter-tab__number">{item.number}</span>
                  <span className="chapter-tab__name">
                    <strong>{item.name}</strong>
                    <small>{item.shortName} · {item.elevation} m</small>
                  </span>
                  <span className="chapter-tab__arrow" aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
            <p className="trail-selector__hint">
              <span aria-hidden="true">↔</span> Use arrow keys to explore the route.
            </p>
          </div>

          <div
            className="chapter-detail"
            id="chapter-panel"
            role="tabpanel"
            aria-labelledby={`chapter-tab-${activeChapter}`}
            tabIndex={0}
            key={chapter.number}
          >
            <div className="chapter-detail__content">
              <div className="chapter-detail__kicker">
                <span style={{ background: chapter.color }} />
                Chapter {chapter.number} / 05
              </div>
              <h3>{chapter.name}</h3>
              <p>{chapter.description}</p>
              <dl className="chapter-stats">
                <div>
                  <dt>Elevation</dt>
                  <dd>{chapter.elevation}<small> m</small></dd>
                </div>
                <div>
                  <dt>Difficulty</dt>
                  <dd>{chapter.difficulty}</dd>
                </div>
                <div>
                  <dt>Core mechanic</dt>
                  <dd>{chapter.mechanic}</dd>
                </div>
              </dl>
              <blockquote>{chapter.note}</blockquote>
              <a className="text-link" href="#assist">
                Shape this climb to you <Arrow />
              </a>
            </div>
            <RouteDiagram chapter={chapter} index={activeChapter} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

type AssistSettings = {
  speed: number;
  airControl: boolean;
  checkpoints: boolean;
  shake: boolean;
  contrast: boolean;
  reduceMotion: boolean;
};

const defaultSettings: AssistSettings = {
  speed: 100,
  airControl: false,
  checkpoints: true,
  shake: true,
  contrast: false,
  reduceMotion: false,
};

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="setting-row">
      <div>
        <strong>{label}</strong>
        <p>{description}</p>
      </div>
      <button
        className={`switch ${checked ? 'is-on' : ''}`}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
      >
        <span />
      </button>
    </div>
  );
}

function AssistSection() {
  const [settings, setSettings] = useState<AssistSettings>(() => {
    try {
      const saved = window.localStorage.getItem('summit-assist-settings');
      if (!saved) return defaultSettings;
      const parsed = JSON.parse(saved) as Partial<AssistSettings>;
      return {
        speed: [70, 85, 100].includes(parsed.speed ?? 0) ? parsed.speed! : 100,
        airControl: typeof parsed.airControl === 'boolean' ? parsed.airControl : false,
        checkpoints: typeof parsed.checkpoints === 'boolean' ? parsed.checkpoints : true,
        shake: typeof parsed.shake === 'boolean' ? parsed.shake : true,
        contrast: typeof parsed.contrast === 'boolean' ? parsed.contrast : false,
        reduceMotion: typeof parsed.reduceMotion === 'boolean' ? parsed.reduceMotion : false,
      };
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('summit-assist-settings', JSON.stringify(settings));
    } catch {
      // The preview remains usable when storage is unavailable.
    }
  }, [settings]);

  const update = <Key extends keyof AssistSettings>(key: Key, value: AssistSettings[Key]) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  const enabledCount = [settings.airControl, settings.checkpoints, !settings.shake, settings.contrast, settings.reduceMotion]
    .filter(Boolean).length;

  return (
    <section
      className={`assist-section section ${settings.contrast ? 'is-contrast' : ''} ${settings.reduceMotion ? 'reduce-motion' : ''}`}
      id="assist"
      aria-labelledby="assist-title"
    >
      <div className="assist-section__contour" aria-hidden="true" />
      <div className="container">
        <Reveal className="section-heading section-heading--light">
          <div>
            <Eyebrow light>Your mountain. Your rules.</Eyebrow>
            <h2 id="assist-title">The climb should<br />meet you halfway.</h2>
          </div>
          <p>
            Precision does not have to mean punishment. Tune the rhythm, add support,
            and keep the parts of the climb that make you feel alive.
          </p>
        </Reveal>

        <div className="assist-layout">
          <Reveal className="assist-principles" delay={80}>
            <article>
              <span>01</span>
              <div>
                <h3>Remap everything</h3>
                <p>Keyboard, controller, or a layout that feels like yours. Every action can be reassigned.</p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Read the mountain</h3>
                <p>High-contrast routes, clear wind cues, and color-independent signals keep every hazard legible.</p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Pause without penalty</h3>
                <p>Stop the clock, breathe, and return when you are ready. Your place on the ridge will wait.</p>
              </div>
            </article>
            <article>
              <span>04</span>
              <div>
                <h3>Make it yours</h3>
                <p>Assist options can change at any time. There is no wrong setting and no wrong way to reach the top.</p>
              </div>
            </article>
          </Reveal>

          <Reveal className="assist-card" delay={140}>
            <div className="assist-card__header">
              <div>
                <span className="mini-label">Assist preview</span>
                <h3>Find your rhythm</h3>
              </div>
              <button
                className="reset-button"
                type="button"
                onClick={() => setSettings(defaultSettings)}
              >
                Reset
              </button>
            </div>

            <fieldset className="speed-setting">
              <legend>Game speed</legend>
              <div className="speed-options">
                {[100, 85, 70].map((speed) => (
                  <label key={speed} className={settings.speed === speed ? 'is-selected' : ''}>
                    <input
                      type="radio"
                      name="game-speed"
                      value={speed}
                      checked={settings.speed === speed}
                      onChange={() => update('speed', speed)}
                    />
                    <strong>{speed}%</strong>
                    <small>{speed === 100 ? 'Full send' : speed === 85 ? 'Balanced' : 'Take it slow'}</small>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="setting-list">
              <Toggle
                label="Extra air control"
                description="A little more steering between jumps."
                checked={settings.airControl}
                onChange={() => update('airControl', !settings.airControl)}
              />
              <Toggle
                label="Frequent checkpoints"
                description="More places to catch your breath."
                checked={settings.checkpoints}
                onChange={() => update('checkpoints', !settings.checkpoints)}
              />
              <Toggle
                label="Screen shake"
                description="Subtle impact feedback."
                checked={settings.shake}
                onChange={() => update('shake', !settings.shake)}
              />
              <Toggle
                label="High-contrast route"
                description="Stronger edges and brighter signals."
                checked={settings.contrast}
                onChange={() => update('contrast', !settings.contrast)}
              />
              <Toggle
                label="Reduce motion"
                description="Keep the climb calm and steady."
                checked={settings.reduceMotion}
                onChange={() => update('reduceMotion', !settings.reduceMotion)}
              />
            </div>

            <div className="assist-card__footer">
              <p aria-live="polite">
                <span className="status-dot" />
                {settings.speed}% speed · {enabledCount} support {enabledCount === 1 ? 'option' : 'options'} on
              </p>
              <button
                type="button"
                className="text-link text-link--button"
                onClick={() => setSettings({ ...defaultSettings, speed: 85, airControl: true, shake: false })}
              >
                Use balanced preset <Arrow />
              </button>
            </div>
            <p className="assist-card__note">Preview settings are saved only on this device.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function formatTime(milliseconds: number) {
  const minutes = Math.floor(milliseconds / 60000).toString().padStart(2, '0');
  const seconds = Math.floor((milliseconds % 60000) / 1000).toString().padStart(2, '0');
  const hundredths = Math.floor((milliseconds % 1000) / 10).toString().padStart(2, '0');
  return `${minutes}:${seconds}.${hundredths}`;
}

function PracticeClock() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [best, setBest] = useState<number | null>(() => {
    try {
      const stored = window.localStorage.getItem('summit-practice-best');
      return stored ? Number(stored) : null;
    } catch {
      return null;
    }
  });
  const [message, setMessage] = useState('Ready when you are.');
  const startedAt = useRef(0);
  const accumulated = useRef(0);

  useEffect(() => {
    if (!running) return;
    startedAt.current = performance.now();
    const timer = window.setInterval(() => {
      setElapsed(accumulated.current + performance.now() - startedAt.current);
    }, 47);
    return () => window.clearInterval(timer);
  }, [running]);

  const toggleTimer = () => {
    if (running) {
      accumulated.current = elapsed;
      setRunning(false);
      setMessage('Clock paused. Your line is still here.');
    } else {
      setRunning(true);
      setMessage('Practice run in progress.');
    }
  };

  const resetTimer = () => {
    accumulated.current = 0;
    startedAt.current = 0;
    setElapsed(0);
    setRunning(false);
    setMessage('Fresh line. Fresh start.');
  };

  const saveRun = () => {
    if (elapsed <= 0) return;
    if (best === null || elapsed < best) {
      setBest(elapsed);
      try {
        window.localStorage.setItem('summit-practice-best', String(Math.round(elapsed)));
      } catch {
        // A local best still works for this session.
      }
      setMessage('New personal benchmark saved.');
    } else {
      setMessage('Run saved. Your personal benchmark is unchanged.');
    }
  };

  return (
    <div className="practice-card">
      <div className="practice-card__heading">
        <span className="mini-label">Practice clock</span>
        <span className={`live-dot ${running ? 'is-running' : ''}`} aria-hidden="true" />
      </div>
      <div className="practice-time" role="timer" aria-label={`Practice time ${formatTime(elapsed)}`}>
        {formatTime(elapsed)}
      </div>
      <p className="practice-message" aria-live="polite">{message}</p>
      <div className="practice-actions">
        <button type="button" className="button button--primary" onClick={toggleTimer}>
          {running ? 'Pause run' : elapsed > 0 ? 'Resume run' : 'Start practice'}
        </button>
        <button type="button" className="icon-button" onClick={resetTimer} aria-label="Reset practice clock">
          ↺
        </button>
      </div>
      <div className="practice-best">
        <span>Personal benchmark</span>
        <strong>{best === null ? '— — : — —' : formatTime(best)}</strong>
        <button type="button" className="text-link text-link--button" onClick={saveRun} disabled={elapsed <= 0}>
          Save run
        </button>
      </div>
    </div>
  );
}

function ChallengeSection({ chapter }: { chapter: Chapter }) {
  const [copyStatus, setCopyStatus] = useState('');
  const challengeCode = `SUMMIT-${chapter.number}`;

  const copyChallenge = async () => {
    try {
      await navigator.clipboard.writeText(`${challengeCode} · ${chapter.name} · #SUMMITLINE`);
      setCopyStatus(`${challengeCode} copied. Leave your mark.`);
    } catch {
      setCopyStatus(`Your challenge code is ${challengeCode}.`);
    }
  };

  return (
    <section className="challenge-section section" id="challenge" aria-labelledby="challenge-title">
      <div className="container">
        <Reveal className="challenge-heading">
          <div>
            <Eyebrow>Community challenge / The Sunday Ascent</Eyebrow>
            <h2 id="challenge-title">Chase the<br /><em>clean line.</em></h2>
          </div>
          <div className="challenge-heading__aside">
            <span className="challenge-number" aria-hidden="true">07</span>
            <p>
              Clear all five chapters. Find the smoothest route. Then share the run that felt like flying.
            </p>
            <a className="text-link" href="#trail">Pick your chapter <Arrow /></a>
          </div>
        </Reveal>

        <div className="challenge-grid">
          <Reveal className="challenge-brief" delay={80}>
            <div className="challenge-brief__top">
              <span className="mini-label">This week’s route</span>
              <span>{chapter.number} / 05</span>
            </div>
            <h3>{chapter.name}</h3>
            <p className="challenge-brief__mechanic">{chapter.mechanic} · {chapter.elevation} m</p>
            <p>
              The prompt is simple: one chapter, one uninterrupted line, no shortcuts.
              Assist mode is welcome. A little courage is required.
            </p>
            <div className="challenge-code">
              <div>
                <span>Challenge code</span>
                <strong>{challengeCode}</strong>
              </div>
              <button type="button" className="button button--dark" onClick={copyChallenge}>
                Copy code <span aria-hidden="true">⧉</span>
              </button>
            </div>
            <p className="copy-status" aria-live="polite">{copyStatus || 'Pair your run with #SUMMITLINE.'}</p>
            <div className="challenge-tags" aria-label="Challenge rules">
              <span>One continuous run</span>
              <span>All assists welcome</span>
              <span>Good sportsmanship</span>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <PracticeClock />
          </Reveal>

          <Reveal className="benchmark-card" delay={200}>
            <div className="benchmark-card__heading">
              <span className="mini-label">Community ghost benchmarks</span>
              <span aria-hidden="true">↗</span>
            </div>
            <ol>
              <li><span>01</span><strong>Northline</strong><time>02:48.62</time></li>
              <li><span>02</span><strong>Switchback</strong><time>03:12.04</time></li>
              <li><span>03</span><strong>Bluebird</strong><time>03:41.81</time></li>
            </ol>
            <p>Illustrative concept times. Your only real rival is your last line.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SummitArtwork() {
  return (
    <svg className="summit-artwork" viewBox="0 0 1200 540" fill="none" aria-hidden="true">
      <circle cx="914" cy="132" r="82" fill="#ffd27d" />
      <circle cx="914" cy="132" r="112" stroke="#ffd27d" strokeOpacity=".2" />
      <path d="M0 466 212 254l104 112L515 99l186 224 95-124 184 173 92-85 128 113v140H0Z" fill="#153946" />
      <path d="m212 254 104 112-69-25-39 17-30-30Zm303-155 186 224-116-39-53 28-58-45Zm281 100 95-124 184 173-113-44-62 34-44-21Z" fill="#dceff0" fillOpacity=".9" />
      <path d="M0 466 212 254l104 112L515 99l186 224 95-124 184 173 92-85 128 113" stroke="#8ccbd7" strokeOpacity=".55" strokeWidth="2" />
      <path d="M515 99v32m0-16 34 11-34 13" stroke="#ff715c" strokeWidth="4" />
      <path d="M0 490h1200M0 510h1200" stroke="#dceff0" strokeOpacity=".12" />
      <path d="m85 455 75-84 60 64 78-91 72 79 64-46 88 78" stroke="#ff715c" strokeOpacity=".55" strokeWidth="2" strokeDasharray="5 8" />
    </svg>
  );
}

function FinalSection({ onBegin }: { onBegin: () => void }) {
  return (
    <section className="final-section section" id="begin" aria-labelledby="final-title">
      <SummitArtwork />
      <div className="final-section__shade" />
      <div className="container final-section__inner">
        <Reveal>
          <Eyebrow light>The Pale Crown is waiting</Eyebrow>
          <h2 id="final-title">Your line<br />starts here.</h2>
          <p>
            No perfect run. No final answer. Just a mountain, a little courage,
            and the next jump.
          </p>
          <div className="final-actions">
            <a className="button button--primary" href="#trail" onClick={onBegin}>
              Begin at the foothills <Arrow />
            </a>
            <a className="button button--secondary" href="./summit-field-guide.txt" download>
              Get the field notes <span aria-hidden="true">↓</span>
            </a>
          </div>
          <span className="final-section__note">An original fan-made concept. Built for the joy of the climb.</span>
        </Reveal>
      </div>
    </section>
  );
}

export default function App() {
  const [activeChapter, setActiveChapter] = useState(0);

  return (
    <div className="summit">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <GameNav
        name="SUMMIT"
        inspiration="a Celeste-inspired concept"
        links={[
          { href: '#trail', label: 'The trail' },
          { href: '#assist', label: 'Play your way' },
          { href: '#challenge', label: 'The challenge' },
        ]}
      />
      <main id="main-content">
        <Hero />
        <div className="route-ribbon" role="region" aria-label="The SUMMIT climbing rhythm" tabIndex={0}>
          <span>Read the ridge</span>
          <span>Trust the rhythm</span>
          <span>Take the next jump</span>
          <span>Find your line</span>
        </div>
        <TrailSection activeChapter={activeChapter} onSelect={setActiveChapter} />
        <AssistSection />
        <ChallengeSection chapter={chapters[activeChapter]} />
        <FinalSection onBegin={() => setActiveChapter(0)} />
      </main>
      <GameFooter
        name="SUMMIT"
        inspiration="a Celeste-inspired concept"
        note="Read the ridge. Trust the rhythm. Take the next jump."
      />
    </div>
  );
}
