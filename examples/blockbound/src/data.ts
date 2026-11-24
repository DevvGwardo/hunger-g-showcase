export type BiomeId = 'sunmeadow' | 'whisperwood' | 'hollow' | 'emberwaste' | 'beyond';

export interface Biome {
  id: BiomeId;
  index: string;
  name: string;
  shortName: string;
  kicker: string;
  description: string;
  detail: string;
  hazard: string;
  resources: string[];
  coordinates: string;
  accent: string;
  sky: string;
  ground: string;
  particle: 'pollen' | 'spores' | 'crystals' | 'embers' | 'stardust';
}

export const biomes: Biome[] = [
  {
    id: 'sunmeadow',
    index: '01',
    name: 'Sunmeadow',
    shortName: 'Overworld',
    kicker: 'Where every story gets its first block',
    description: 'Golden grass, slow rivers, and a village that always leaves a light on.',
    detail:
      'Follow the river past the wheat fields to find Sunmeadow’s old watchtower. By day, the meadows are all open sky and possibility. By night, lanterns draw a safe path home.',
    hazard: 'Wandering after dark',
    resources: ['Heartwood', 'Wild wheat', 'River stone'],
    coordinates: 'X 128  ·  Y 72  ·  Z −416',
    accent: '#b9ed78',
    sky: '#f4bd7c',
    ground: '#6f9e4d',
    particle: 'pollen',
  },
  {
    id: 'whisperwood',
    index: '02',
    name: 'Whisperwood',
    shortName: 'Deep Forest',
    kicker: 'The trees remember your name',
    description: 'A canopy so deep the afternoon glows green. Listen closely.',
    detail:
      'Old-growth trunks rise like pillars around a forest that never quite wakes. Follow the blue spores to hidden groves, timber bridges, and clearings made for midnight feasts.',
    hazard: 'Losing the trail',
    resources: ['Glowcap', 'Ancient timber', 'Moss'],
    coordinates: 'X −92  ·  Y 81  ·  Z −728',
    accent: '#80e6a2',
    sky: '#193d32',
    ground: '#315f43',
    particle: 'spores',
  },
  {
    id: 'hollow',
    index: '03',
    name: 'Crystal Hollow',
    shortName: 'Caverns',
    kicker: 'Beautiful things grow in the dark',
    description: 'Violet stone, still water, and crystals that hum beneath your feet.',
    detail:
      'Descend beyond the last torch. Crystal Hollow rewards patient explorers with luminous geodes, underground lakes, and echoes that seem to arrive a moment before you do.',
    hazard: 'Deep drops & darkness',
    resources: ['Amethyst', 'Echo ore', 'Cave moss'],
    coordinates: 'X 64  ·  Y −38  ·  Z −816',
    accent: '#b7a0ff',
    sky: '#17142c',
    ground: '#45345f',
    particle: 'crystals',
  },
  {
    id: 'emberwaste',
    index: '04',
    name: 'Emberwaste',
    shortName: 'Nether',
    kicker: 'Keep your courage close',
    description: 'A red horizon, rivers of fire, and fortresses carved from basalt.',
    detail:
      'The air shimmers above a sea of molten light. Cross the basalt bridges carefully, trade at the ash-market, and never mistake the quiet for safety.',
    hazard: 'Lava & falling ash',
    resources: ['Embersteel', 'Ash glass', 'Blaze resin'],
    coordinates: 'X −240  ·  Y 44  ·  Z −1,024',
    accent: '#ff9a62',
    sky: '#3e111b',
    ground: '#692b2c',
    particle: 'embers',
  },
  {
    id: 'beyond',
    index: '05',
    name: 'The Beyond',
    shortName: 'End-inspired',
    kicker: 'There is more sky beyond the sky',
    description: 'Floating islands, ancient stone, and a portal that dreams in cyan.',
    detail:
      'At the edge of the known world, the Stronghold waits under a field of stars. Its portal is not an ending. It is the first page of whatever comes next.',
    hazard: 'The void between islands',
    resources: ['Void stone', 'Star shards', 'Aether moss'],
    coordinates: 'X 0  ·  Y 108  ·  Z −2,048',
    accent: '#73f1de',
    sky: '#090e22',
    ground: '#282744',
    particle: 'stardust',
  },
];

export type GalleryCategory = 'Builds' | 'Adventures' | 'Experiments';

export interface GalleryItem {
  id: string;
  title: string;
  creator: string;
  category: GalleryCategory;
  description: string;
  detail: string;
  palette: string;
  scene: 'village' | 'bridge' | 'tower' | 'camp' | 'garden' | 'portal';
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'lantern-harbor',
    title: 'Lantern Harbor',
    creator: 'Moss & Mason',
    category: 'Builds',
    description: 'A tiny fishing village built one lantern at a time.',
    detail: 'Twelve docks, a tide-powered mill, and a bakery that opens before sunrise. Every window is placed to catch the first light over the water.',
    palette: '#f2ad73',
    scene: 'village',
  },
  {
    id: 'cloudline',
    title: 'Cloudline Bridge',
    creator: 'Junebug',
    category: 'Adventures',
    description: 'A hand-built crossing above a sea of clouds.',
    detail: 'The expedition took three evenings and 1,408 blocks. The bridge has no safety rails—by design. A small marker at the far end reads: worth it.',
    palette: '#9fd9e7',
    scene: 'bridge',
  },
  {
    id: 'last-light',
    title: 'The Last Light',
    creator: 'Cobaltcraft',
    category: 'Builds',
    description: 'An observatory at the very edge of the map.',
    detail: 'Its copper telescope tracks the moon through a retractable roof. Below, a map room plots every journey the community has ever taken.',
    palette: '#b7a0ff',
    scene: 'tower',
  },
  {
    id: 'wayfarers',
    title: 'Wayfarer’s Rest',
    creator: 'PocketFern',
    category: 'Adventures',
    description: 'A campfire, a good story, and room for one more.',
    detail: 'A traveling camp that moves with the community’s weekly journey. Visitors leave a block from their home in the ring around the fire.',
    palette: '#ff9a62',
    scene: 'camp',
  },
  {
    id: 'small-wonders',
    title: 'Small Wonders',
    creator: 'Hexaflora',
    category: 'Experiments',
    description: 'A garden where every plant is a tiny machine.',
    detail: 'Water flows uphill, flowers open with the weather, and hidden redstone circuits make the whole garden bloom when someone approaches.',
    palette: '#b9ed78',
    scene: 'garden',
  },
  {
    id: 'elsewhere',
    title: 'Elsewhere',
    creator: 'Northstar',
    category: 'Experiments',
    description: 'A portal study in impossible color.',
    detail: 'Layers of translucent blocks turn a simple frame into a window onto another world. Best viewed at night, with the sound on.',
    palette: '#73f1de',
    scene: 'portal',
  },
];

export interface Feature {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  tone: 'green' | 'amber' | 'violet' | 'cyan';
  icon: 'pickaxe' | 'blocks' | 'lantern' | 'compass';
}

export const features: Feature[] = [
  {
    number: '01',
    title: 'Survival, together',
    subtitle: 'Read the weather. Share the harvest.',
    description:
      'A world that changes with the people inside it. Seasonal events, shared supplies, and just enough danger to make the walk home matter.',
    details: ['Community seed & seasons', 'No pay-to-win upgrades', 'Persistent shared projects'],
    tone: 'green',
    icon: 'pickaxe',
  },
  {
    number: '02',
    title: 'Build without limits',
    subtitle: 'From first hut to impossible skyline.',
    description:
      'A complete creative toolkit with room to experiment. Clone your best work, remix a district, or start again with a clean horizon.',
    details: ['Unlimited block palette', 'One-click world snapshots', 'Schematics & build permissions'],
    tone: 'amber',
    icon: 'blocks',
  },
  {
    number: '03',
    title: 'Events worth showing up for',
    subtitle: 'Friday lantern runs. Sunday build jams.',
    description:
      'A living calendar made by players, not an algorithm. Small quests, ambitious collaborations, and celebrations that become local legends.',
    details: ['Weekly player-led events', 'Community build challenges', 'In-world photo trails'],
    tone: 'violet',
    icon: 'lantern',
  },
  {
    number: '04',
    title: 'Your world, your rules',
    subtitle: 'Shape the horizon before you spawn.',
    description:
      'Dial in the terrain, climate, and access. Make a peaceful creative realm or a hardcore expedition for friends who like a real challenge.',
    details: ['Custom world presets', 'Fine-grained roles', 'Private or public realms'],
    tone: 'cyan',
    icon: 'compass',
  },
];
