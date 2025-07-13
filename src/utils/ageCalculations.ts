import { 
  AgeCalculation, 
  AgeResult, 
  IntervalResult, 
  SpecialUnitCalculation, 
  TimeUnit, 
  TIME_UNITS, 
  getUnitById 
} from '@/types/age';

/**
 * Calculate the difference between two dates in various units
 */
export function calculateAge(birthDate: Date, currentDate: Date = new Date()): AgeCalculation {
  const diffMs = currentDate.getTime() - birthDate.getTime();
  
  // Convert to basic units
  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  
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
 * Format large numbers with thousands separators (spaces)
 */
export function formatLargeNumber(num: number): string {
  return Math.floor(num).toLocaleString('cs-CZ').replace(/,/g, ' ');
}

/**
 * Calculate special units for a given time period
 */
export function calculateSpecialUnits(totalDays: number): SpecialUnitCalculation[] {
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
        ? `${formatLargeNumber(value)} km` 
        : formatLargeNumber(value)
    };
  });
}

/**
 * Calculate complete age result
 */
export function calculateAgeResult(birthDate: Date, currentDate: Date = new Date()): AgeResult {
  const basic = calculateAge(birthDate, currentDate);
  const totalDays = calculateTotalDays(birthDate, currentDate);
  const special = calculateSpecialUnits(totalDays);
  
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
  unitId: string
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
  const special = calculateSpecialUnits(intervalDays);
  
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
 * Format date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('cs-CZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
