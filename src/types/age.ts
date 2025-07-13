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
    name: 'Sekundy',
    description: 'Jednotky času (1/86400 dne)',
    category: 'basic',
    conversionToDays: 1 / (24 * 60 * 60), // 1 sekunda = 1/86400 dne
    icon: '⏱️'
  },
  {
    id: 'minutes',
    name: 'Minuty',
    description: 'Jednotky času (1/1440 dne)',
    category: 'basic',
    conversionToDays: 1 / (24 * 60), // 1 minuta = 1/1440 dne
    icon: '⏲️'
  },
  {
    id: 'hours',
    name: 'Hodiny',
    description: 'Jednotky času (1/24 dne)',
    category: 'basic',
    conversionToDays: 1 / 24, // 1 hodina = 1/24 dne
    icon: '🕒'
  },
  {
    id: 'days',
    name: 'Dny',
    description: 'Standardní dny',
    category: 'basic',
    conversionToDays: 1,
    icon: '📅'
  },
  {
    id: 'weeks',
    name: 'Týdny',
    description: 'Sedmidenní období',
    category: 'basic',
    conversionToDays: 7,
    icon: '📆'
  },
  {
    id: 'months',
    name: 'Měsíce',
    description: 'Průměrný měsíc (30.44 dne)',
    category: 'basic',
    conversionToDays: 30.44,
    icon: '🗓️'
  },
  {
    id: 'years',
    name: 'Roky',
    description: 'Kalendářní roky',
    category: 'basic',
    conversionToDays: 365.25,
    icon: '🎂'
  },

  // Biological units
  {
    id: 'heartbeats',
    name: 'Srdeční tepy',
    description: '70 tepů za minutu',
    category: 'biological',
    conversionToDays: 1 / (70 * 60 * 24), // 1 tep = 1/(70*60*24) dne
    icon: '💓'
  },
  {
    id: 'breaths',
    name: 'Nádechy',
    description: '16 nádechů za minutu',
    category: 'biological',
    conversionToDays: 1 / (16 * 60 * 24),
    icon: '🫁'
  },
  {
    id: 'blinks',
    name: 'Mrknutí',
    description: '15 mrknutí za minutu',
    category: 'biological',
    conversionToDays: 1 / (15 * 60 * 24),
    icon: '👁️'
  },
  {
    id: 'steps',
    name: 'Kroky',
    description: '8000 kroků denně',
    category: 'biological',
    conversionToDays: 1 / 8000,
    icon: '👣'
  },

  // Cosmic units
  {
    id: 'moon_cycles',
    name: 'Úplňky',
    description: 'Lunární cykly (29.53 dne)',
    category: 'cosmic',
    conversionToDays: 29.53,
    icon: '🌕'
  },
  {
    id: 'light_distance',
    name: 'Světelné roky',
    description: 'Vzdálenost světla za rok',
    category: 'cosmic',
    conversionToDays: 365.25, // Pro výpočet vzdálenosti
    icon: '✨'
  },
  {
    id: 'earth_rotations',
    name: 'Otočky Země',
    description: 'Rotace Země kolem osy',
    category: 'cosmic',
    conversionToDays: 1,
    icon: '🌍'
  },

  // Cultural/Fun units
  {
    id: 'pizzas',
    name: 'Pizzy snězené',
    description: '1 pizza týdně',
    category: 'fun',
    conversionToDays: 7, // 1 pizza = 7 dní
    icon: '🍕'
  },
  {
    id: 'coffee_cups',
    name: 'Šálky kávy',
    description: '2 šálky denně',
    category: 'fun',
    conversionToDays: 1 / 2,
    icon: '☕'
  },
  {
    id: 'netflix_episodes',
    name: 'Netflix epizody',
    description: '45min epizoda denně',
    category: 'cultural',
    conversionToDays: 1, // 1 epizoda = 1 den
    icon: '📺'
  },
  {
    id: 'tiktok_videos',
    name: 'TikTok videa',
    description: '30s video, 50 denně',
    category: 'cultural',
    conversionToDays: 1 / 50,
    icon: '📱'
  },
  {
    id: 'books_read',
    name: 'Přečtené knihy',
    description: '1 kniha za měsíc',
    category: 'cultural',
    conversionToDays: 30,
    icon: '📚'
  },
  {
    id: 'songs_listened',
    name: 'Poslechnuté písně',
    description: '3min píseň, 20 denně',
    category: 'cultural',
    conversionToDays: 1 / 20,
    icon: '🎵'
  },
  {
    id: 'memes_seen',
    name: 'Viděné memy',
    description: '100 memů denně',
    category: 'fun',
    conversionToDays: 1 / 100,
    icon: '😂'
  },
  {
    id: 'instagram_posts',
    name: 'Instagram posty',
    description: '1 post za 3 dny',
    category: 'cultural',
    conversionToDays: 3,
    icon: '📸'
  },
  {
    id: 'video_games_hours',
    name: 'Hodiny hraní her',
    description: '2 hodiny denně',
    category: 'fun',
    conversionToDays: 1 / 2, // 1 hodina = 0.5 dne
    icon: '🎮'
  },
  {
    id: 'toilet_visits',
    name: 'Návštěvy WC',
    description: '6 návštěv denně',
    category: 'biological',
    conversionToDays: 1 / 6,
    icon: '🚽'
  },
  {
    id: 'laughs',
    name: 'Smíchy',
    description: '15 smíchů denně',
    category: 'fun',
    conversionToDays: 1 / 15,
    icon: '😄'
  },
  {
    id: 'yawns',
    name: 'Zívnutí',
    description: '8 zívnutí denně',
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
