export const INVITE_URL =
  'https://discord.com/oauth2/authorize?client_id=1328272164423729233&permissions=281474980236288&integration_type=0&scope=bot+applications.commands';

export const WEBPLAYER_URL = 'https://muzix-webplayer.com/';

export const SUPPORT_URL = 'https://discord.com/invite/TVR4efd8ts';

export const soundTags = [
  'High-quality playback',
  'Smart queue',
  'Playlists',
  'Favourites',
  'Audio filters',
  'Lyrics',
  'Autoplay',
  'Discord-native controls',
];

export const featureSpecimens = [
  { command: '/play', description: 'Start the sound.', accent: 'red' },
  { command: '/queue', description: 'Control what comes next.', accent: 'black' },
  { command: '/filter', description: 'Shape the mood.', accent: 'white' },
  { command: '/lyrics', description: 'Read every line.', accent: 'white' },
  { command: '/playlist', description: 'Save the vibe.', accent: 'red' },
  { command: '/autoplay', description: 'Keep it moving.', accent: 'black' },
  { command: 'Favourites', description: 'Return to what hits.', accent: 'red' },
  { command: 'Server Controls', description: 'Built for Discord rooms.', accent: 'white' },
];

export const weightFeatures = [
  { weight: 'Thin', value: 'Clean interface', className: 'font-light' },
  { weight: 'Light', value: 'Fast commands', className: 'font-light' },
  { weight: 'Regular', value: 'Stable playback', className: 'font-normal' },
  { weight: 'Medium', value: 'Smart queue', className: 'font-medium' },
  { weight: 'Semibold', value: 'Audio filters', className: 'font-semibold' },
  { weight: 'Bold', value: 'Server-wide music', className: 'font-bold' },
  { weight: 'Black', value: 'Full Discord music bot', className: 'font-black' },
];

export const commandTimeline = [
  { label: 'Start', command: '/play', description: 'A track enters the room and the server locks into one shared rhythm.' },
  { label: 'Queue', command: '/queue', description: 'The next songs stay visible, ordered, and ready for the whole channel.' },
  { label: 'Filter', command: '/filter', description: 'Bass, nightcore, vaporwave, and equalizer moods reshape the session.' },
  { label: 'Lyrics', command: '/lyrics', description: 'Lines arrive without leaving Discord, keeping the chorus close.' },
  { label: 'Autoplay', command: '/autoplay', description: 'When the queue runs low, Muzix keeps the energy moving.' },
  { label: 'Server Sound', command: 'Controls', description: 'Smooth commands make voice channels feel like a real music room.' },
];

export const soundAttractions = [
  {
    title: 'Smart Queue',
    label: 'Q U E U E',
    command: '/queue',
    body: 'Build the next stretch of the session with clean ordering, quick edits, and a queue that stays easy to read.',
  },
  {
    title: 'Audio Filters',
    label: 'F I L T E R S',
    command: '/filter',
    body: 'Shape the room with bass boost, nightcore, vaporwave, and equalizer moods that feel immediate inside Discord.',
  },
  {
    title: 'Lyrics',
    label: 'L Y R I C S',
    command: '/lyrics',
    body: 'Bring the words into the conversation so everyone can follow the hook, verse, and replay moment.',
  },
  {
    title: 'Playlists',
    label: 'P L A Y L I S T S',
    command: '/playlist',
    body: 'Save repeatable listening sets for gaming nights, study rooms, community events, and late voice calls.',
  },
  {
    title: 'Favourites',
    label: 'F A V O U R I T E S',
    command: 'Save',
    body: 'Keep the tracks that hit close, then bring them back whenever the server asks for that sound again.',
  },
  {
    title: 'Autoplay',
    label: 'A U T O P L A Y',
    command: '/autoplay',
    body: 'Let Muzix extend the session when the planned queue ends, keeping the room from going silent.',
  },
  {
    title: 'High-quality playback',
    label: 'S O U N D',
    command: '/play',
    body: 'Clear, stable playback gives your voice channel the polish a shared listening room should have.',
  },
  {
    title: 'Discord-native controls',
    label: 'C O N T R O L S',
    command: 'Slash',
    body: 'Commands stay where your community already is, so nobody has to break the flow to manage the music.',
  },
];
