// Curated Song Catalog with diverse genres, artists, and playable audio tracks
export const GENRES = [
  { id: 'all', name: 'All', color: '#1DB954' },
  { id: 'pop', name: 'Pop', color: '#8d67ab', gradient: 'linear-gradient(135deg, #8d67ab, #533968)' },
  { id: 'hip-hop', name: 'Hip-Hop', color: '#ba5d07', gradient: 'linear-gradient(135deg, #e13300, #731a00)' },
  { id: 'electronic', name: 'Electronic', color: '#1e3264', gradient: 'linear-gradient(135deg, #006450, #00362b)' },
  { id: 'rock', name: 'Rock', color: '#e91429', gradient: 'linear-gradient(135deg, #e91429, #790814)' },
  { id: 'rnb', name: 'R&B', color: '#dc148c', gradient: 'linear-gradient(135deg, #dc148c, #6c0a44)' },
  { id: 'lofi', name: 'Lo-Fi Chill', color: '#477d95', gradient: 'linear-gradient(135deg, #477d95, #223f4c)' },
  { id: 'indie', name: 'Indie & Alt', color: '#509bf5', gradient: 'linear-gradient(135deg, #509bf5, #1d4d8c)' },
  { id: 'ambient', name: 'Ambient', color: '#148a08', gradient: 'linear-gradient(135deg, #148a08, #0a4704)' },
];

export const INITIAL_SONGS = [
  {
    id: 's1',
    title: 'Midnight City Lights',
    artist: 'Luna Eclipse',
    singer: 'Luna Eclipse',
    album: 'Neon Horizons',
    genre: 'Electronic',
    genreId: 'electronic',
    duration: 214, // in seconds (3:34)
    durationFormatted: '3:34',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    plays: '1,420,950',
    lyrics: [
      'Neon glowing in the midnight rain',
      'Reflections washing all the pain',
      'Speeding down the empty avenue',
      'The bassline pulls me back to you',
      'Under the strobe lights, we never sleep',
      'Promises that we were meant to keep',
      'Electric dreams across the skyline glow',
      'Letting the rhythm take control'
    ]
  },
  {
    id: 's2',
    title: 'Golden Hour Memories',
    artist: 'The Sunset Club',
    singer: 'The Sunset Club ft. Maya',
    album: 'Coastline Reverie',
    genre: 'Pop',
    genreId: 'pop',
    duration: 188,
    durationFormatted: '3:08',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    plays: '3,842,100',
    lyrics: [
      'Warm breeze whispers through the open door',
      'Sand on our feet from the ocean floor',
      'Hold this moment before it slips away',
      'Golden light dancing at the end of day',
      'You smiled and whispered nothing at all',
      'Caught in the magic as shadows fall'
    ]
  },
  {
    id: 's3',
    title: 'Cyberpulse 2099',
    artist: 'Vektor Pulse',
    singer: 'Vektor Pulse',
    album: 'Synthwave Matrix',
    genre: 'Electronic',
    genreId: 'electronic',
    duration: 245,
    durationFormatted: '4:05',
    cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    plays: '984,200',
    lyrics: [
      'Binary pulses in my veins',
      'Digital shadows through acid rain',
      'Hologram memories flickering bright',
      'Speeding into the neon night',
      'System overload, heart in overdrive',
      'This frequency keeps us alive'
    ]
  },
  {
    id: 's4',
    title: 'Velvet Groove',
    artist: 'Aria Montell',
    singer: 'Aria Montell',
    album: 'Late Night Soul',
    genre: 'R&B',
    genreId: 'rnb',
    duration: 202,
    durationFormatted: '3:22',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    plays: '2,150,000',
    lyrics: [
      'Pour a little honey in the glass',
      'Watching the quiet hours pass',
      'Silky chords ringing in my chest',
      'Tonight we put the world to rest',
      'Step to the rhythm, smooth and slow',
      'Every soft touch a velvet glow'
    ]
  },
  {
    id: 's5',
    title: 'Thunder Alley',
    artist: 'Redline Rebels',
    singer: 'Redline Rebels',
    album: 'Overdrive Anthem',
    genre: 'Rock',
    genreId: 'rock',
    duration: 228,
    durationFormatted: '3:48',
    cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    plays: '4,520,300',
    lyrics: [
      'Engines roaring in the pitch black street',
      'Guitar screaming to the heavy drum beat',
      'No speed limits, no turning back',
      'Lightning crashing on the asphalt track',
      'We are the fire you cannot tame',
      'Shouting our freedom in the pouring rain'
    ]
  },
  {
    id: 's6',
    title: 'Coffee Beans & Raindrops',
    artist: 'Kairo Beats',
    singer: 'Kairo Beats',
    album: 'Study Session Chill',
    genre: 'Lo-Fi Chill',
    genreId: 'lofi',
    duration: 175,
    durationFormatted: '2:55',
    cover: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    plays: '5,890,120',
    lyrics: [
      'Rain tapping on the windowpane',
      'Steam rising like a gentle refrain',
      'Vinyl crackle in the cozy room',
      'Dispelling every hint of gloom',
      'Warm mug resting in my hand',
      'Drifting away to quiet lands'
    ]
  },
  {
    id: 's7',
    title: 'Streetlight Symphony',
    artist: 'Drake Sterling',
    singer: 'Drake Sterling ft. K-Flow',
    album: 'Concrete Crown',
    genre: 'Hip-Hop',
    genreId: 'hip-hop',
    duration: 198,
    durationFormatted: '3:18',
    cover: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    plays: '6,210,800',
    lyrics: [
      'Started from the block with a notebook rhyme',
      'Putting in the work, patient with time',
      'Skyscrapers watching over every grind',
      'Leaving all the doubts and fears behind',
      'Mic check 1-2, the beat drops clean',
      'Living out the vision of the big screen'
    ]
  },
  {
    id: 's8',
    title: 'Wildflower Breeze',
    artist: 'Willow & The Woods',
    singer: 'Willow & The Woods',
    album: 'Meadow Songs',
    genre: 'Indie & Alt',
    genreId: 'indie',
    duration: 210,
    durationFormatted: '3:30',
    cover: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    plays: '1,720,000',
    lyrics: [
      'Wildflowers blooming on the hillside crest',
      'Tangled hair and a wandering quest',
      'Acoustic strings beneath the open sky',
      'Watching the summer clouds go drifting by',
      'Singing out melodies wild and free',
      'Just where we were always meant to be'
    ]
  },
  {
    id: 's9',
    title: 'Starlight Odyssey',
    artist: 'Celeste Nova',
    singer: 'Celeste Nova',
    album: 'Deep Space Dreams',
    genre: 'Ambient',
    genreId: 'ambient',
    duration: 260,
    durationFormatted: '4:20',
    cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    plays: '830,500',
    lyrics: [
      'Floating through rings of cosmic dust',
      'In the silence of the stars we trust',
      'Gravity echoes gently in space',
      'Timeless wonders of time and place'
    ]
  },
  {
    id: 's10',
    title: 'Euphoria Nights',
    artist: 'Kyra Vance',
    singer: 'Kyra Vance',
    album: 'Prism Pop',
    genre: 'Pop',
    genreId: 'pop',
    duration: 195,
    durationFormatted: '3:15',
    cover: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    plays: '4,890,000',
    lyrics: [
      'Turn the volume high, feel the speakers kick',
      'Sparkles in the dark doing every trick',
      'Can you feel the love rising in the air?',
      'Hands up to the ceiling without a care'
    ]
  },
  {
    id: 's11',
    title: 'Brooklyn Subways',
    artist: 'Metro Ghost',
    singer: 'Metro Ghost ft. J. Ellis',
    album: 'Concrete Underground',
    genre: 'Hip-Hop',
    genreId: 'hip-hop',
    duration: 215,
    durationFormatted: '3:35',
    cover: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    plays: '2,940,300',
    lyrics: [
      'Click-clack on the tracks through the tunnel darkness',
      'Spitting lyrical gold with genuine sharpness',
      'Graffiti murals tell the history of our name',
      'Every corner got a chapter in the game'
    ]
  },
  {
    id: 's12',
    title: 'Solitude in Sound',
    artist: 'Echo Garden',
    singer: 'Echo Garden',
    album: 'Acoustic Solitude',
    genre: 'Indie & Alt',
    genreId: 'indie',
    duration: 232,
    durationFormatted: '3:52',
    cover: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    plays: '1,120,400',
    lyrics: [
      'Pine needles under boots on a winding trail',
      'Singing to the mountains when voices fail',
      'Simple melodies heal the weary mind',
      'Peace in the wild is what we find'
    ]
  },
  {
    id: 's13',
    title: 'Prismatic Waves',
    artist: 'DJ Zenith',
    singer: 'DJ Zenith',
    album: 'Festival Energy',
    genre: 'Electronic',
    genreId: 'electronic',
    duration: 205,
    durationFormatted: '3:25',
    cover: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
    plays: '3,100,500',
    lyrics: [
      'Build it up, build it high, feel the rush',
      'Laser beams cutting through the party hush',
      'Three, two, one, let the bass drop down!',
      'Rattling the speakers all through town'
    ]
  },
  {
    id: 's14',
    title: 'Silk & Shadows',
    artist: 'Damian Cruz',
    singer: 'Damian Cruz',
    album: 'Midnight Romance',
    genre: 'R&B',
    genreId: 'rnb',
    duration: 218,
    durationFormatted: '3:38',
    cover: 'https://images.unsplash.com/photo-1520523839898-50712140e698?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
    plays: '2,630,900',
    lyrics: [
      'Candle flame dancing slow across the wall',
      'Whenever you call me, I surrender it all',
      'Velvet touch, deep emotion in your eyes',
      'Underneath the starry city skies'
    ]
  },
  {
    id: 's15',
    title: 'Electric Renegade',
    artist: 'Iron Highway',
    singer: 'Iron Highway',
    album: 'Fuel and Fire',
    genre: 'Rock',
    genreId: 'rock',
    duration: 240,
    durationFormatted: '4:00',
    cover: 'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
    plays: '1,990,000',
    lyrics: [
      'Black leather jackets in the biting wind',
      'Rebel souls where new chapters begin',
      'Screaming lead guitars breaking down the wall',
      'Standing tall through it all'
    ]
  },
  {
    id: 's16',
    title: 'Sunset Boulevard Drift',
    artist: 'Kai Chillax',
    singer: 'Kai Chillax ft. Yoko',
    album: 'Tokyo Sunset Vibes',
    genre: 'Lo-Fi Chill',
    genreId: 'lofi',
    duration: 184,
    durationFormatted: '3:04',
    cover: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
    plays: '4,105,700',
    lyrics: [
      'Sunset painting pastel pink across the sky',
      'Lofi rhodes chords floating softly by',
      'Sip the matcha tea, take a breath real deep',
      'Gentle rhythm rocking you to sleep'
    ]
  }
];

export const ARTISTS = [
  {
    id: 'a1',
    name: 'Luna Eclipse',
    role: 'Electronic Producer & Vocalist',
    monthlyListeners: '2,840,192',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    verified: true
  },
  {
    id: 'a2',
    name: 'The Sunset Club',
    role: 'Indie Pop Duo',
    monthlyListeners: '4,120,490',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&auto=format&fit=crop&q=80',
    verified: true
  },
  {
    id: 'a3',
    name: 'Drake Sterling',
    role: 'Hip-Hop Artist & Lyricist',
    monthlyListeners: '8,410,320',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    verified: true
  },
  {
    id: 'a4',
    name: 'Aria Montell',
    role: 'Soul & R&B Singer',
    monthlyListeners: '3,210,000',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
    verified: true
  },
  {
    id: 'a5',
    name: 'Redline Rebels',
    role: 'Alternative Rock Band',
    monthlyListeners: '5,020,110',
    image: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=500&auto=format&fit=crop&q=80',
    verified: true
  },
  {
    id: 'a6',
    name: 'Kairo Beats',
    role: 'Lo-Fi Chill Beatmaker',
    monthlyListeners: '6,480,900',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80',
    verified: true
  }
];

export const INITIAL_PLAYLISTS = [
  {
    id: 'p1',
    name: 'Today\'s Top Hits',
    description: 'The biggest tracks right now. Featuring Luna Eclipse, Kyra Vance and more.',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80',
    color: '#1DB954',
    songIds: ['s1', 's2', 's10', 's7', 's13']
  },
  {
    id: 'p2',
    name: 'Late Night Chill & Lo-Fi',
    description: 'Soft beats, rain drops, and mellow melodies for focus or unwinding.',
    cover: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&auto=format&fit=crop&q=80',
    color: '#477d95',
    songIds: ['s6', 's16', 's8', 's4']
  },
  {
    id: 'p3',
    name: 'Neon Cyberpunk Workout',
    description: 'High octane electro & synthwave tracks to push your limits.',
    cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80',
    color: '#8d67ab',
    songIds: ['s3', 's5', 's13', 's15']
  }
];
