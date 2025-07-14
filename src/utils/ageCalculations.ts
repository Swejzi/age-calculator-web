import {
  AgeCalculation,
  AgeResult,
  IntervalResult,
  SpecialUnitCalculation,
  TIME_UNITS,
  getUnitById
} from '@/types/age';

/**
 * Calculate the difference between two dates in various units
 */
export function calculateAge(birthDate: Date, currentDate: Date = new Date()): AgeCalculation {
  // Calculate years, months, weeks
  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // Adjust for day of month
  if (currentDate.getDate() < birthDate.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }
  
  // Calculate remaining days after years and months
  const tempDate = new Date(birthDate);
  tempDate.setFullYear(birthDate.getFullYear() + years);
  tempDate.setMonth(birthDate.getMonth() + months);
  
  const remainingMs = currentDate.getTime() - tempDate.getTime();
  const remainingDays = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
  
  const weeks = Math.floor(remainingDays / 7);
  const days = remainingDays % 7;
  
  // Calculate remaining hours and minutes
  const remainingHours = Math.floor((remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const remainingMinutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
  const remainingSeconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
  
  return {
    years,
    months,
    weeks,
    days,
    hours: remainingHours,
    minutes: remainingMinutes,
    seconds: remainingSeconds
  };
}

/**
 * Calculate total days between two dates
 */
export function calculateTotalDays(birthDate: Date, currentDate: Date = new Date()): number {
  const diffMs = currentDate.getTime() - birthDate.getTime();
  return diffMs / (1000 * 60 * 60 * 24);
}

/**
 * Format large numbers with thousands separators with locale support
 */
export function formatLargeNumber(num: number, locale: string = 'cs'): string {
  // Map our locale codes to browser locale codes
  const localeMap: Record<string, string> = {
    'cs': 'cs-CZ',
    'en': 'en-US',
    'de': 'de-DE',
    'ja': 'ja-JP'
  };

  const browserLocale = localeMap[locale] || locale;
  return Math.floor(num).toLocaleString(browserLocale);
}

/**
 * Smart number formatting with decimal places for small numbers and abbreviations for very large numbers
 */
export function formatSmartNumber(num: number, unitId: string, locale: string = 'cs'): string {
  const localeMap: Record<string, string> = {
    'cs': 'cs-CZ',
    'en': 'en-US',
    'de': 'de-DE',
    'ja': 'ja-JP'
  };

  const browserLocale = localeMap[locale] || locale;

  // Planetary years should show 1-2 decimal places for better precision
  const planetaryUnits = [
    'mercury_years', 'venus_years', 'mars_years', 'jupiter_years',
    'saturn_years', 'uranus_years', 'neptune_years', 'pluto_years'
  ];

  if (planetaryUnits.includes(unitId)) {
    // For planetary years, show 1-2 decimal places
    if (num < 1) {
      return num.toLocaleString(browserLocale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    } else if (num < 10) {
      return num.toLocaleString(browserLocale, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      });
    } else {
      return num.toLocaleString(browserLocale, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      });
    }
  }

  // For very large numbers (12+ digits), use abbreviations
  if (num >= 1e12) {
    const abbreviations = {
      'cs': { trillion: 'bil.', quadrillion: 'biliarda', quintillion: 'trilion' },
      'en': { trillion: 'T', quadrillion: 'Q', quintillion: 'Qi' },
      'de': { trillion: 'Bio.', quadrillion: 'Brd.', quintillion: 'Trl.' },
      'ja': { trillion: '兆', quadrillion: '京', quintillion: '垓' }
    };

    const abbrev = abbreviations[locale as keyof typeof abbreviations] || abbreviations.en;

    if (num >= 1e18) {
      return `${(num / 1e18).toLocaleString(browserLocale, { maximumFractionDigits: 1 })} ${abbrev.quintillion}`;
    } else if (num >= 1e15) {
      return `${(num / 1e15).toLocaleString(browserLocale, { maximumFractionDigits: 1 })} ${abbrev.quadrillion}`;
    } else {
      return `${(num / 1e12).toLocaleString(browserLocale, { maximumFractionDigits: 1 })} ${abbrev.trillion}`;
    }
  }

  // For regular numbers, use standard formatting
  return Math.floor(num).toLocaleString(browserLocale);
}

/**
 * Calculate special units for a given time period
 */
export function calculateSpecialUnits(totalDays: number, locale: string = 'cs'): SpecialUnitCalculation[] {
  return TIME_UNITS.map(unit => {
    let value: number;
    
    // Special calculation for different unit types
    switch (unit.id) {
      case 'seconds':
        value = totalDays * 24 * 60 * 60; // seconds in total days
        break;
      case 'minutes':
        value = totalDays * 24 * 60; // minutes in total days
        break;
      case 'hours':
        value = totalDays * 24; // hours in total days
        break;
      case 'heartbeats':
        value = totalDays * 24 * 60 * 70; // 70 beats per minute
        break;
      case 'breaths':
        value = totalDays * 24 * 60 * 16; // 16 breaths per minute
        break;
      case 'blinks':
        value = totalDays * 24 * 60 * 15; // 15 blinks per minute
        break;
      case 'steps':
        value = totalDays * 8000; // 8000 steps per day
        break;
      case 'light_distance':
        // Calculate distance light travels in km
        const lightSpeedKmPerSecond = 299792.458;
        const secondsInPeriod = totalDays * 24 * 60 * 60;
        value = lightSpeedKmPerSecond * secondsInPeriod;
        break;
      case 'coffee_cups':
        value = totalDays * 2; // 2 cups per day
        break;
      case 'beers_drunk':
        // Czech average: 188.5L per year = 377 beers (0.5L bottles) per year
        // 377 beers ÷ 365.25 days = ~1.032 beers per day
        value = totalDays * (377 / 365.25);
        break;
      case 'tiktok_videos':
        value = totalDays * 50; // 50 videos per day
        break;
      case 'songs_listened':
        value = totalDays * 20; // 20 songs per day
        break;
      case 'memes_seen':
        value = totalDays * 100; // 100 memes per day
        break;
      case 'video_games_hours':
        value = totalDays * 2; // 2 hours per day
        break;
      case 'toilet_visits':
        value = totalDays * 6; // 6 visits per day
        break;
      case 'laughs':
        value = totalDays * 15; // 15 laughs per day
        break;
      case 'yawns':
        value = totalDays * 8; // 8 yawns per day
        break;
      default:
        // For other units, use the conversion factor
        value = totalDays / unit.conversionToDays;
        break;
    }
    
    return {
      unit,
      value,
      formattedValue: unit.id === 'light_distance'
        ? `${formatSmartNumber(value, unit.id, locale)} km`
        : formatSmartNumber(value, unit.id, locale)
    };
  });
}

/**
 * Calculate complete age result
 */
export function calculateAgeResult(birthDate: Date, currentDate: Date = new Date(), locale: string = 'cs'): AgeResult {
  const basic = calculateAge(birthDate, currentDate);
  const totalDays = calculateTotalDays(birthDate, currentDate);
  const special = calculateSpecialUnits(totalDays, locale);
  
  return {
    birthDate,
    currentDate,
    basic,
    special
  };
}

/**
 * Calculate interval result
 */
export function calculateIntervalResult(
  birthDate: Date,
  intervalValue: number,
  unitId: string,
  locale: string = 'cs'
): IntervalResult | null {
  const unit = getUnitById(unitId);
  if (!unit) return null;
  
  // Convert interval to days
  let intervalDays: number;
  
  switch (unit.id) {
    case 'seconds':
      intervalDays = intervalValue / (24 * 60 * 60);
      break;
    case 'minutes':
      intervalDays = intervalValue / (24 * 60);
      break;
    case 'hours':
      intervalDays = intervalValue / 24;
      break;
    case 'heartbeats':
      intervalDays = intervalValue / (70 * 60 * 24);
      break;
    case 'breaths':
      intervalDays = intervalValue / (16 * 60 * 24);
      break;
    case 'blinks':
      intervalDays = intervalValue / (15 * 60 * 24);
      break;
    case 'steps':
      intervalDays = intervalValue / 8000;
      break;
    case 'coffee_cups':
      intervalDays = intervalValue / 2;
      break;
    case 'beers_drunk':
      intervalDays = intervalValue / (377 / 365.25); // Convert beers to days
      break;
    case 'tiktok_videos':
      intervalDays = intervalValue / 50;
      break;
    case 'songs_listened':
      intervalDays = intervalValue / 20;
      break;
    case 'memes_seen':
      intervalDays = intervalValue / 100;
      break;
    case 'video_games_hours':
      intervalDays = intervalValue / 2;
      break;
    case 'toilet_visits':
      intervalDays = intervalValue / 6;
      break;
    case 'laughs':
      intervalDays = intervalValue / 15;
      break;
    case 'yawns':
      intervalDays = intervalValue / 8;
      break;
    default:
      intervalDays = intervalValue * unit.conversionToDays;
      break;
  }
  
  // Calculate target date
  const targetDate = new Date(birthDate.getTime() + intervalDays * 24 * 60 * 60 * 1000);
  
  // Calculate age at target date
  const ageAtTarget = calculateAge(birthDate, targetDate);
  
  // Calculate special units for the interval
  const special = calculateSpecialUnits(intervalDays, locale);
  
  return {
    interval: intervalValue,
    unit,
    targetDate,
    ageAtTarget,
    special
  };
}

/**
 * Parse date and time strings into a Date object
 */
export function parseBirthDateTime(dateStr: string, timeStr?: string): Date {
  const date = new Date(dateStr);
  
  if (timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    date.setHours(hours, minutes, 0, 0);
  } else {
    date.setHours(0, 0, 0, 0);
  }
  
  return date;
}

/**
 * Format date for display with locale support
 */
export function formatDate(date: Date, locale: string = 'cs-CZ'): string {
  // Map our locale codes to browser locale codes
  const localeMap: Record<string, string> = {
    'cs': 'cs-CZ',
    'en': 'en-US',
    'de': 'de-DE',
    'ja': 'ja-JP'
  };

  const browserLocale = localeMap[locale] || locale;

  return date.toLocaleDateString(browserLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
