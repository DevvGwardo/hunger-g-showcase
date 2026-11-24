import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { GameFooter, GameNav, Reveal, Eyebrow } from '../../shared/game-ui';
import { HollowScene } from '../../shared/scenes';

const realms = [
  {
    id: 'root',
    number: 'I',
    title: 'Root Halls',
    subtitle: 'Where stone remembers',
    depth: '−240 m',
    atmosphere: 'root',
    description:
      'A forest fell here before the first maps were drawn. Its roots became corridors, and the corridors learned to move. Follow the warm seams in the stone; the oldest paths always carry a pulse.',
    hazard: 'Shifting rootways and listening spores',
    reward: 'Wickstep charm · Rootbound atlas page',
    fieldNote: 'The walls are not breathing. You are.',
  },
  {
    id: 'glass',
    number: 'II',
    title: 'Choir of Glass',
    subtitle: 'Every note has a shadow',
    depth: '−610 m',
    atmosphere: 'glass',
    description:
      'Cathedral-thin crystals bridge an abandoned resonance vault. Each footfall wakes a chord; each chord opens a door. Learn the silence between notes, or the choir will learn you.',
    hazard: 'Resonance storms and mirrored sentinels',
    reward: 'Glass Echo charm · Choir cipher',
    fieldNote: 'Do not answer the song that knows your name.',
  },
  {
    id: 'garden',
    number: 'III',
    title: 'Pale Garden',
    subtitle: 'Nothing here has seen the sun',
    depth: '−900 m',
    atmosphere: 'garden',
    description:
      'Pale blossoms lean toward lanterns they have never known. Beneath their soft, impossible light, a garden keeps the memory of daylight. Something tender still tends it.',
    hazard: 'Lumen moths and petrifying pollen',
    reward: 'Stillwater vow · The last seed',
    fieldNote: 'Even underground, a thing may turn toward hope.',
  },
] as const;

const relics = [
  {
    id: 'wickstep',
    name: 'Wickstep',
    kind: 'Movement charm',
    icon: 'spark',
    description: 'Your sidestep leaves a brief ribbon of light, revealing safe stone in the dark.',
  },
  {
    id: 'echo',
    name: 'Glass Echo',
    kind: 'Perception charm',
    icon: 'echo',
    description: 'Distant echoes bloom into visible threads, tracing hidden passages through glass.',
  },
  {
    id: 'rootbound',
    name: 'Rootbound',
    kind: 'Traversal charm',
    icon: 'root',
    description: 'Once per fall, a curl of living root catches you and returns you to the air.',
  },
  {
    id: 'stillwater',
    name: 'Stillwater Vow',
    kind: 'Survival charm',
    icon: 'drop',
    description: 'Hold your breath to slow a descent and steady your lantern in resonant wind.',
  },
] as const;

const archiveNotes = [
  {
    title: 'A borrowed flame',
    place: 'Upper shaft · Margin 12',
    quote:
      'I gave my last ember to a stranger. We found no road down, only warm stone and the courage to keep walking.',
    attribution: 'Mara Venn, lantern keeper',
  },
  {
    title: 'The note between',
    place: 'Resonance vault · Margin 31',
    quote:
      'The choir does not sing to frighten us. It is trying to remember what silence sounded like before we arrived.',
    attribution: 'Iven Sorrow, glasswright',
  },
  {
    title: 'Instructions for dawn',
    place: 'Pale garden · Margin 08',
    quote:
      'A light is not a promise that you will return. It is a promise that the next step is yours.',
    attribution: 'The Cartographer’s Last Margin',
  },
] as const;

type RealmId = (typeof realms)[number]['id'];
type RelicId = (typeof relics)[number]['id'];
type RelicIcon = (typeof relics)[number]['icon'];

function readRealm(): RealmId | null {
  try {
    const saved = window.localStorage.getItem('hollowlight-route');
    return realms.some((realm) => realm.id === saved) ? (saved as RealmId) : null;
  } catch {
    return null;
  }
}

function readRelics(): RelicId[] {
  try {
    const saved: unknown = JSON.parse(window.localStorage.getItem('hollowlight-relics') ?? '[]');
    if (!Array.isArray(saved)) return [];
    return saved.filter(
      (id): id is RelicId => relics.some((relic) => relic.id === id),
    ).slice(0, 2);
  } catch {
    return [];
  }
}

function Lantern({ className = '' }: { className?: string }) {
  const glowId = useId().replaceAll(':', '');

  return (
    <div className={`lantern ${className}`} aria-hidden="true">
      <svg viewBox="0 0 180 310" fill="none">
        <defs>
          <radialGradient id={glowId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(90 181) rotate(90) scale(96)">
            <stop stopColor="#d6ffc8" stopOpacity=".96" />
            <stop offset=".42" stopColor="#8be9c6" stopOpacity=".35" />
            <stop offset="1" stopColor="#67cbb5" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${glowId}-glass`} x1="55" y1="145" x2="128" y2="244" gradientUnits="userSpaceOnUse">
            <stop stopColor="#c9ffe4" stopOpacity=".25" />
            <stop offset=".48" stopColor="#8de7cb" stopOpacity=".06" />
            <stop offset="1" stopColor="#6b7aae" stopOpacity=".22" />
          </linearGradient>
        </defs>
        <ellipse cx="90" cy="184" rx="79" ry="106" fill={`url(#${glowId})`} />
        <path d="M90 -14V24M90 24C90 24 61 32 61 48C61 62 119 62 119 48C119 32 90 24 90 24Z" stroke="currentColor" strokeWidth="2" />
        <path d="M66 58H114L126 76H54L66 58Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M54 76V85H126V76" stroke="currentColor" strokeWidth="2" />
        <path d="M58 84L49 119V226L65 248H115L131 226V119L122 84" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M49 119H131V226H49V119Z" fill={`url(#${glowId}-glass)`} stroke="currentColor" strokeWidth="1.5" />
        <path d="M90 87V245M49 119L67 143L58 178L78 202L65 248M131 119L113 143L122 178L102 202L115 248" stroke="currentColor" strokeOpacity=".62" strokeWidth="1.5" />
        <path d="M64 248H116L122 262H58L64 248Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M90 256V272" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path className="lantern__flame" d="M90 126C75 149 69 163 75 180C78 190 83 195 90 196C98 195 103 190 105 180C108 165 101 150 90 126Z" fill="#d4ffbd" />
        <path className="lantern__flame-core" d="M90 151C84 162 82 169 85 177C86 181 88 184 90 184C95 182 97 177 97 172C97 165 94 158 90 151Z" fill="#f2ffe4" />
      </svg>
    </div>
  );
}

function RealmSigil({ realm }: { realm: RealmId }) {
  return (
    <svg className="realm-sigil" viewBox="0 0 180 180" fill="none" aria-hidden="true">
      <circle cx="90" cy="90" r="73" stroke="currentColor" strokeOpacity=".18" />
      <circle cx="90" cy="90" r="61" stroke="currentColor" strokeOpacity=".28" strokeDasharray="1 8" />
      {realm === 'root' && (
        <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M90 22V62M90 44C73 44 70 58 55 62M90 58C108 58 111 72 129 76" />
          <path d="M90 68V151M90 82C72 74 66 89 49 90M90 102C107 91 115 105 134 103M90 128C77 119 68 129 61 148M90 139C103 127 109 140 118 156" />
          <path d="M70 151C80 163 101 163 111 151" />
          <circle cx="90" cy="70" r="5" fill="currentColor" fillOpacity=".18" />
        </g>
      )}
      {realm === 'glass' && (
        <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M90 20V51M48 66L62 57M132 66L118 57M38 120L58 112M142 120L122 112" />
          <path d="M90 52L127 78V127L90 155L53 127V78L90 52Z" />
          <path d="M90 52V155M53 78L90 104L127 78M53 127L90 104L127 127" />
          <path d="M90 104L71 137" />
          <circle cx="90" cy="104" r="6" fill="currentColor" fillOpacity=".2" />
        </g>
      )}
      {realm === 'garden' && (
        <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M90 158V89M90 119C73 116 65 103 66 87C82 88 94 100 90 119ZM90 101C105 99 114 86 114 71C99 72 89 84 90 101Z" />
          <path d="M90 88C75 84 66 70 71 55C85 60 94 71 90 88ZM90 85C104 79 109 64 102 52C89 58 84 70 90 85Z" />
          <path d="M90 55C88 42 94 32 103 28C107 41 103 51 90 55Z" />
          <path d="M68 160H112M76 168H104" />
          <circle cx="48" cy="126" r="3" fill="currentColor" />
          <circle cx="133" cy="48" r="3" fill="currentColor" />
        </g>
      )}
    </svg>
  );
}

function RelicIcon({ icon }: { icon: RelicIcon }) {
  return (
    <svg className="relic-icon" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      {icon === 'spark' && (
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M32 8L37 26L55 32L37 38L32 56L26 38L9 32L26 26L32 8Z" />
          <path d="M48 10V20M43 15H53M15 45V54M10 50H20" />
          <circle cx="32" cy="32" r="4" fill="currentColor" fillOpacity=".18" />
        </g>
      )}
      {icon === 'echo' && (
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M13 34C18 23 23 20 32 20C41 20 46 23 51 34" />
          <path d="M18 38C22 30 26 28 32 28C38 28 42 30 46 38" />
          <path d="M23 42C26 37 29 36 32 36C35 36 38 37 41 42" />
          <path d="M32 47V56" />
          <circle cx="32" cy="20" r="3" fill="currentColor" />
        </g>
      )}
      {icon === 'root' && (
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M32 8V28C32 38 22 40 20 50C18 56 24 60 32 60C40 60 46 56 44 50C42 40 32 38 32 28" />
          <path d="M32 31C24 25 17 25 12 30M32 43C40 37 47 37 52 42M20 50L13 56M44 50L51 56" />
        </g>
      )}
      {icon === 'drop' && (
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M32 8C32 8 15 28 15 39C15 49 22 56 32 56C42 56 49 49 49 39C49 28 32 8 32 8Z" />
          <path d="M22 39C22 44 25 47 30 48M32 20V29M27 25H37" />
        </g>
      )}
    </svg>
  );
}

export default function App() {
  const [activeRealm, setActiveRealm] = useState<RealmId>('root');
  const [selectedRoute, setSelectedRoute] = useState<RealmId | null>(readRealm);
  const [equipped, setEquipped] = useState<RelicId[]>(readRelics);
  const [activeNote, setActiveNote] = useState(0);
  const [downloadMessage, setDownloadMessage] = useState('');
  const realmTabs = useRef<Array<HTMLButtonElement | null>>([]);

  const currentRealm = realms.find((realm) => realm.id === activeRealm) ?? realms[0];
  const currentNote = archiveNotes[activeNote];
  const markedRealm = realms.find((realm) => realm.id === selectedRoute);

  useEffect(() => {
    try {
      if (selectedRoute) window.localStorage.setItem('hollowlight-route', selectedRoute);
      else window.localStorage.removeItem('hollowlight-route');
    } catch {
      // The concept remains usable when storage is unavailable.
    }
  }, [selectedRoute]);

  useEffect(() => {
    try {
      window.localStorage.setItem('hollowlight-relics', JSON.stringify(equipped));
    } catch {
      // The concept remains usable when storage is unavailable.
    }
  }, [equipped]);

  function onRealmKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % realms.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + realms.length) % realms.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = realms.length - 1;
    else return;

    event.preventDefault();
    setActiveRealm(realms[next].id);
    realmTabs.current[next]?.focus();
  }

  function toggleRelic(id: RelicId) {
    setEquipped((current) => {
      if (current.includes(id)) return current.filter((relic) => relic !== id);
      if (current.length >= 2) return current;
      return [...current, id];
    });
  }

  function downloadFieldGuide() {
    const route = markedRealm?.title ?? 'Undecided';
    const loadout = equipped.length
      ? equipped.map((id) => relics.find((relic) => relic.id === id)?.name).join(' + ')
      : 'No charms equipped';
    const guide = [
      'HOLLOWLIGHT — EXPEDITION NOTES',
      'An original, unofficial fan-made metroidvania concept',
      '',
      `MARKED ROUTE: ${route}`,
      `LANTERN LOADOUT: ${loadout}`,
      '',
      'THREE DESCENTS',
      ...realms.flatMap((realm) => [
        '',
        `${realm.number}. ${realm.title.toUpperCase()} (${realm.depth})`,
        realm.description,
        `Hazard: ${realm.hazard}`,
        `Reward: ${realm.reward}`,
      ]),
      '',
      'FROM THE LANTERN LEDGER',
      ...archiveNotes.map((note) => `“${note.quote}” — ${note.attribution}`),
      '',
      'This is a design concept, not a playable game. Not affiliated with the creators or publishers of Hollow Knight.',
    ].join('\n');
    const blob = new Blob([guide], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hollowlight-expedition-notes.txt';
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setDownloadMessage('Expedition notes downloaded with your marked route and charms.');
  }

  return (
    <>
      <a className="skip-link" href="#world">Skip to the world</a>
      <GameNav
        name="HOLLOWLIGHT"
        inspiration="A fan-made descent"
        links={[
          { href: '#world', label: 'THE WORLD' },
          { href: '#realms', label: 'REALMS' },
          { href: '#relics', label: 'CHARMS' },
          { href: '#voices', label: 'FIELD NOTES' },
        ]}
      />

      <main>
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-scene"><HollowScene /></div>
          <div className="hero-shade" aria-hidden="true" />
          <Lantern className="lantern--hero" />

          <div className="container hero-inner">
            <div className="hero-copy">
              <Eyebrow light>An original fan-made metroidvania concept</Eyebrow>
              <h1 id="hero-title">
                <span>Descend</span>
                <span>into the</span>
                <em>Quiet.</em>
              </h1>
              <p className="hero-intro">
                Beneath a world that has forgotten the sky, one lantern still burns.
                Find what the dark has been keeping.
              </p>
              <div className="hero-actions">
                <a className="button button--primary" href="#realms">
                  Enter the depths <span aria-hidden="true">↓</span>
                </a>
                <a className="button button--secondary" href="#world">Read the field notes</a>
              </div>
              <nav className="mobile-jump-links" aria-label="Quick section links">
                <a href="#world">The world</a>
                <a href="#realms">Realms</a>
                <a href="#relics">Charms</a>
              </nav>
            </div>

            <div className="hero-lantern-label" aria-hidden="true">
              <span>THE ONLY MAP</span>
              <span>Light, carried by hand</span>
            </div>

            <div className="hero-ledger">
              <div><span>Expedition</span><strong>HL — 001</strong></div>
              <div><span>Lowest depth</span><strong>Unknown</strong></div>
              <a href="#world"><span>Next step</span><strong>The world below <b aria-hidden="true">↓</b></strong></a>
            </div>
          </div>
        </section>

        <section className="lore section" id="world" aria-labelledby="world-title">
          <div className="container lore-grid">
            <Reveal className="lore-copy">
              <Eyebrow>01 / The world below</Eyebrow>
              <h2 id="world-title">Some places<br />do not want<br />to be found.</h2>
              <p className="lore-lead">
                HOLLOWLIGHT is a story of descent told in small discoveries: a door that answers a melody,
                a garden growing without sun, a name scratched into the back of a map.
              </p>
              <p>
                You are the last lantern-bearer of Vale. Your light does not make you invincible.
                It makes the world visible—and lets the world see you in return.
              </p>
              <a className="text-link lore-link" href="#realms">Trace the first route <span aria-hidden="true">↘</span></a>
            </Reveal>

            <Reveal className="field-card-wrap" delay={120}>
              <article className="field-card">
                <div className="field-card__top"><span>Recovered field note</span><span>No. 0001</span></div>
                <div className="field-card__strata" aria-hidden="true">
                  <span /><span /><span /><span /><span />
                  <div className="field-card__light" />
                </div>
                <blockquote>
                  “The upper gates closed without a sound.
                  I have been walking toward the warmth ever since.”
                </blockquote>
                <div className="field-card__bottom">
                  <span>Vale · Final expedition</span>
                  <span className="field-card__stamp">ARCHIVE</span>
                </div>
              </article>
              <p className="field-caption">A world explored at walking pace, where atmosphere is the map.</p>
            </Reveal>
          </div>
        </section>

        <section className="realms section section--dark" id="realms" aria-labelledby="realms-title">
          <div className="container">
            <Reveal className="section-heading">
              <div>
                <Eyebrow light>02 / Choose a descent</Eyebrow>
                <h2 id="realms-title">Three ways<br />into silence.</h2>
              </div>
              <p>
                Every realm changes how the world hears you. Study its rhythm, mark a route,
                and decide what kind of light you will become.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="realm-tabs" role="tablist" aria-label="Explore the realms">
                {realms.map((realm, index) => (
                  <button
                    className={`realm-tab ${activeRealm === realm.id ? 'is-active' : ''}`}
                    type="button"
                    role="tab"
                    key={realm.id}
                    id={`realm-tab-${realm.id}`}
                    aria-selected={activeRealm === realm.id}
                    aria-controls={activeRealm === realm.id ? `realm-panel-${realm.id}` : undefined}
                    tabIndex={activeRealm === realm.id ? 0 : -1}
                    onClick={() => setActiveRealm(realm.id)}
                    onKeyDown={(event) => onRealmKeyDown(event, index)}
                    ref={(element) => { realmTabs.current[index] = element; }}
                  >
                    <span className="realm-tab__number">{realm.number}</span>
                    <span><strong>{realm.title}</strong><small>{realm.depth}</small></span>
                    <span className="realm-tab__arrow" aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>

              <div
                className={`realm-panel realm-panel--${currentRealm.atmosphere}`}
                id={`realm-panel-${currentRealm.id}`}
                role="tabpanel"
                aria-labelledby={`realm-tab-${currentRealm.id}`}
                tabIndex={0}
              >
                <div className="realm-visual">
                  <span className="realm-visual__plate">Field plate / 0{realms.indexOf(currentRealm) + 1}</span>
                  <div className="realm-visual__orbit" aria-hidden="true" />
                  <RealmSigil realm={currentRealm.id} />
                  <p>{currentRealm.fieldNote}</p>
                  <span className="realm-visual__depth">Depth {currentRealm.depth}</span>
                </div>

                <div className="realm-details" key={currentRealm.id}>
                  <span className="realm-details__kicker">{currentRealm.subtitle}</span>
                  <h3>{currentRealm.title}</h3>
                  <p className="realm-description">{currentRealm.description}</p>
                  <dl className="realm-facts">
                    <div><dt>Primary hazard</dt><dd>{currentRealm.hazard}</dd></div>
                    <div><dt>Hidden reward</dt><dd>{currentRealm.reward}</dd></div>
                  </dl>
                  <button
                    className="button button--primary realm-route-button"
                    type="button"
                    disabled={selectedRoute === currentRealm.id}
                    onClick={() => setSelectedRoute(currentRealm.id)}
                  >
                    {selectedRoute === currentRealm.id ? 'Route marked' : 'Mark this route'}
                    <span aria-hidden="true">{selectedRoute === currentRealm.id ? '✓' : '↘'}</span>
                  </button>
                  <p className="route-status" role="status">
                    {markedRealm ? `Saved route: ${markedRealm.title}` : 'No route marked. Choose the first place your lantern will go.'}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="relics section" id="relics" aria-labelledby="relics-title">
          <div className="container">
            <Reveal className="section-heading">
              <div>
                <Eyebrow>03 / The lantern bench</Eyebrow>
                <h2 id="relics-title">Small lights.<br />Lasting power.</h2>
              </div>
              <p>
                Bind up to two charms to your lantern. Each one changes the way you move through the quiet;
                none can carry the journey for you.
              </p>
            </Reveal>

            <div className="relic-grid">
              {relics.map((relic, index) => {
                const isEquipped = equipped.includes(relic.id);
                const atCapacity = equipped.length >= 2 && !isEquipped;
                return (
                  <Reveal key={relic.id} delay={index * 70}>
                    <article className={`relic-card ${isEquipped ? 'is-equipped' : ''}`}>
                      <div className="relic-card__head"><span>0{index + 1}</span><span>{relic.kind}</span></div>
                      <RelicIcon icon={relic.icon} />
                      <h3>{relic.name}</h3>
                      <p>{relic.description}</p>
                      <button
                        className="relic-equip"
                        type="button"
                        aria-pressed={isEquipped}
                        disabled={atCapacity}
                        onClick={() => toggleRelic(relic.id)}
                        title={atCapacity ? 'Remove a charm before equipping another' : undefined}
                      >
                        <span>{isEquipped ? 'Bound to lantern' : atCapacity ? 'Lantern full' : 'Bind charm'}</span>
                        <span aria-hidden="true">{isEquipped ? '✓' : '+'}</span>
                      </button>
                    </article>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={120}>
              <div className="loadout-bar">
                <div className="loadout-label"><span>Your lantern loadout</span><small>{equipped.length} of 2 resonance slots bound</small></div>
                <div className="loadout-slots" aria-label="Equipped charms">
                  {[0, 1].map((slot) => {
                    const relic = relics.find((item) => item.id === equipped[slot]);
                    return (
                      <div className={`loadout-slot ${relic ? 'is-filled' : ''}`} key={slot}>
                        {relic ? <RelicIcon icon={relic.icon} /> : <span aria-hidden="true">◇</span>}
                        <span>{relic?.name ?? 'Empty resonance'}</span>
                      </div>
                    );
                  })}
                </div>
                <button
                  className="loadout-clear"
                  type="button"
                  disabled={!equipped.length}
                  onClick={() => setEquipped([])}
                >
                  Clear charms
                </button>
              </div>
              <p className="sr-only" role="status" aria-live="polite">
                {equipped.length
                  ? `${equipped.length} charms equipped: ${equipped.map((id) => relics.find((relic) => relic.id === id)?.name).join(', ')}.`
                  : 'No charms equipped.'}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="voices section section--dark" id="voices" aria-labelledby="voices-title">
          <div className="container">
            <Reveal className="voices-heading">
              <div>
                <Eyebrow light>04 / The lantern ledger</Eyebrow>
                <h2 id="voices-title">Whispers from<br />the way below.</h2>
              </div>
              <p>Fragments left by those who carried a light before you. Read slowly. The quiet edits every story.</p>
            </Reveal>

            <Reveal className="ledger" delay={80}>
              <div className="ledger-list" aria-label="Choose a field note">
                {archiveNotes.map((note, index) => (
                  <button
                    className={`ledger-entry ${index === activeNote ? 'is-active' : ''}`}
                    type="button"
                    key={note.title}
                    aria-pressed={index === activeNote}
                    aria-controls="archive-quote"
                    onClick={() => setActiveNote(index)}
                  >
                    <span className="ledger-entry__number">0{index + 1}</span>
                    <span><strong>{note.title}</strong><small>{note.place}</small></span>
                    <span aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>

              <blockquote className="quote-panel" id="archive-quote" aria-live="polite" aria-atomic="true">
                <span className="quote-panel__mark" aria-hidden="true">“</span>
                <p>{currentNote.quote}</p>
                <footer>
                  <span className="quote-panel__line" aria-hidden="true" />
                  <cite>{currentNote.attribution}</cite>
                  <span className="quote-panel__count">0{activeNote + 1} / 0{archiveNotes.length}</span>
                </footer>
              </blockquote>
            </Reveal>

            <div className="ledger-controls" aria-label="Field note navigation">
              <button
                type="button"
                onClick={() => setActiveNote((current) => (current - 1 + archiveNotes.length) % archiveNotes.length)}
              >
                <span aria-hidden="true">←</span> Previous entry
              </button>
              <button
                type="button"
                onClick={() => setActiveNote((current) => (current + 1) % archiveNotes.length)}
              >
                Next entry <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </section>

        <section className="final-cta" id="begin" aria-labelledby="begin-title">
          <div className="final-rings" aria-hidden="true"><span /><span /><span /><span /></div>
          <Lantern className="lantern--final" />
          <div className="container final-content">
            <Reveal>
              <Eyebrow light>The descent begins with one step</Eyebrow>
              <h2 id="begin-title">Carry a little<br /><em>light.</em></h2>
              <p>
                The gates are behind you. The quiet is ahead.<br />
                Take the route that feels like yours.
              </p>
              <div className="final-actions">
                <a className="button button--primary" href="#realms">Choose your descent <span aria-hidden="true">↓</span></a>
                <button className="button button--secondary" type="button" onClick={downloadFieldGuide}>
                  Download field guide <span aria-hidden="true">↗</span>
                </button>
              </div>
              <p className="final-disclaimer">
                An unofficial fan-made concept. Not affiliated with the creators or publishers of Hollow Knight.
                This experience is a design showcase, not a playable game.
              </p>
              <p className="download-status" role="status">{downloadMessage}</p>
            </Reveal>
          </div>
          <a className="final-coordinate" href="#top">Surface coordinate / 00.000 <span aria-hidden="true">↑</span></a>
        </section>
      </main>

      <GameFooter
        name="HOLLOWLIGHT"
        inspiration="Hollow Knight fan-made concept"
        note="Unofficial fan-made concept · Original world and artwork"
      />
    </>
  );
}
