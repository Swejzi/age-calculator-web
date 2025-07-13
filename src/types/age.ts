// Types for the Age application

export interface TimeUnit {
  id: string;
  name: string;
  description: string;
  category: 'basic' | 'biological' | 'cultural' | 'cosmic' | 'fun';
  conversionToDays: number; // How many days equal 1 unit
  icon?: string;
}

export interface AgeCalculation {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface SpecialUnitCalculation {
  unit: TimeUnit;
  value: number;
  formattedValue: string;
}

export interface AgeResult {
  birthDate: Date;
  currentDate: Date;
  basic: AgeCalculation;
  special: SpecialUnitCalculation[];
}

export interface IntervalResult {
  interval: number;
  unit: TimeUnit;
  targetDate: Date;
  ageAtTarget: AgeCalculation;
  special: SpecialUnitCalculation[];
}

export interface BirthInput {
  date: string; // YYYY-MM-DD format
  time?: string; // HH:MM format
}

export interface IntervalInput {
  value: number;
  unitId: string;
}

// Predefined time units with unique and fun conversions
export const TIME_UNITS: TimeUnit[] = [
  // Basic units
  {
    id: 'seconds',
    name: 'Seconds',
    description: 'Time units (1/86400 of a day)',
    category: 'basic',
    conversionToDays: 1 / (24 * 60 * 60), // 1 second = 1/86400 day
    icon: '⏱️'
  },
  {
    id: 'minutes',
    name: 'Minutes',
    description: 'Time units (1/1440 of a day)',
    category: 'basic',
    conversionToDays: 1 / (24 * 60), // 1 minute = 1/1440 day
    icon: '⏲️'
  },
  {
    id: 'hours',
    name: 'Hours',
    description: 'Time units (1/24 of a day)',
    category: 'basic',
    conversionToDays: 1 / 24, // 1 hour = 1/24 day
    icon: '🕒'
  },
  {
    id: 'days',
    name: 'Days',
    description: 'Standard days',
    category: 'basic',
    conversionToDays: 1,
    icon: '📅'
  },
  {
    id: 'weeks',
    name: 'Weeks',
    description: '7-day periods',
    category: 'basic',
    conversionToDays: 7,
    icon: '📆'
  },
  {
    id: 'months',
    name: 'Months',
    description: 'Average month (30.44 days)',
    category: 'basic',
    conversionToDays: 30.44,
    icon: '🗓️'
  },
  {
    id: 'years',
    name: 'Years',
    description: 'Calendar years',
    category: 'basic',
    conversionToDays: 365.25,
    icon: '🎂'
  },

  // Biological units
  {
    id: 'heartbeats',
    name: 'Heartbeats',
    description: '70 beats per minute',
    category: 'biological',
    conversionToDays: 1 / (70 * 60 * 24), // 1 beat = 1/(70*60*24) day
    icon: '💓'
  },
  {
    id: 'breaths',
    name: 'Breaths',
    description: '16 breaths per minute',
    category: 'biological',
    conversionToDays: 1 / (16 * 60 * 24),
    icon: '🫁'
  },
  {
    id: 'blinks',
    name: 'Blinks',
    description: '15 blinks per minute',
    category: 'biological',
    conversionToDays: 1 / (15 * 60 * 24),
    icon: '👁️'
  },
  {
    id: 'steps',
    name: 'Steps',
    description: '8000 steps daily',
    category: 'biological',
    conversionToDays: 1 / 8000,
    icon: '👣'
  },

  // Cosmic units
  {
    id: 'moon_cycles',
    name: 'Full moons',
    description: 'Lunar cycles (29.53 days)',
    category: 'cosmic',
    conversionToDays: 29.53,
    icon: '🌕'
  },
  {
    id: 'light_distance',
    name: 'Light distance',
    description: 'Distance light travels in your lifetime',
    category: 'cosmic',
    conversionToDays: 365.25, // For distance calculation
    icon: '✨'
  },
  {
    id: 'earth_rotations',
    name: 'Earth rotations',
    description: 'Earth rotation around axis',
    category: 'cosmic',
    conversionToDays: 1,
    icon: '🌍'
  },

  // Cultural/Fun units
  {
    id: 'pizzas',
    name: 'Pizzas eaten',
    description: '1 pizza per week',
    category: 'fun',
    conversionToDays: 7, // 1 pizza = 7 days
    icon: '🍕'
  },
  {
    id: 'coffee_cups',
    name: 'Coffee cups',
    description: '2 cups daily',
    category: 'fun',
    conversionToDays: 1 / 2,
    icon: '☕'
  },
  {
    id: 'netflix_episodes',
    name: 'Netflix episodes',
    description: '45min episode daily',
    category: 'cultural',
    conversionToDays: 1, // 1 episode = 1 day
    icon: '📺'
  },
  {
    id: 'tiktok_videos',
    name: 'TikTok videos',
    description: '30s video, 50 daily',
    category: 'cultural',
    conversionToDays: 1 / 50,
    icon: '📱'
  },
  {
    id: 'books_read',
    name: 'Books read',
    description: '1 book per month',
    category: 'cultural',
    conversionToDays: 30,
    icon: '📚'
  },
  {
    id: 'songs_listened',
    name: 'Songs listened',
    description: '3min song, 20 daily',
    category: 'cultural',
    conversionToDays: 1 / 20,
    icon: '🎵'
  },
  {
    id: 'memes_seen',
    name: 'Memes seen',
    description: '100 memes daily',
    category: 'fun',
    conversionToDays: 1 / 100,
    icon: '😂'
  },
  {
    id: 'instagram_posts',
    name: 'Instagram posts',
    description: '1 post per 3 days',
    category: 'cultural',
    conversionToDays: 3,
    icon: '📸'
  },
  {
    id: 'video_games_hours',
    name: 'Gaming hours',
    description: '2 hours daily',
    category: 'fun',
    conversionToDays: 1 / 2, // 1 hour = 0.5 day
    icon: '🎮'
  },
  {
    id: 'toilet_visits',
    name: 'Toilet visits',
    description: '6 visits daily',
    category: 'biological',
    conversionToDays: 1 / 6,
    icon: '🚽'
  },
  {
    id: 'laughs',
    name: 'Laughs',
    description: '15 laughs daily',
    category: 'fun',
    conversionToDays: 1 / 15,
    icon: '😄'
  },
  {
    id: 'yawns',
    name: 'Yawns',
    description: '8 yawns daily',
    category: 'biological',
    conversionToDays: 1 / 8,
    icon: '🥱'
  }
];

export const getUnitById = (id: string): TimeUnit | undefined => {
  return TIME_UNITS.find(unit => unit.id === id);
};

export const getUnitsByCategory = (category: TimeUnit['category']): TimeUnit[] => {
  return TIME_UNITS.filter(unit => unit.category === category);
};
