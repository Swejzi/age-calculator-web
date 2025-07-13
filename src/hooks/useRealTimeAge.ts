import { useState, useEffect, useRef, useCallback } from 'react';
import { AgeResult, IntervalResult } from '@/types/age';
import { calculateAgeResult, calculateIntervalResult } from '@/utils/ageCalculations';

/**
 * Custom hook for real-time age calculation
 * Updates age calculations every second to provide live numbers
 */
export function useRealTimeAge(birthDate: Date | null, locale: string = 'cs'): AgeResult | null {
  const [ageResult, setAgeResult] = useState<AgeResult | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);

  // Memoized update function to prevent unnecessary re-renders
  const updateAge = useCallback(() => {
    if (!birthDate || !mountedRef.current) return;

    const currentDate = new Date();
    const result = calculateAgeResult(birthDate, currentDate, locale);

    // Only update if component is still mounted
    if (mountedRef.current) {
      setAgeResult(result);
    }
  }, [birthDate, locale]);

  useEffect(() => {
    mountedRef.current = true;

    if (!birthDate) {
      setAgeResult(null);
      return;
    }

    // Initial calculation
    updateAge();

    // Set up interval for real-time updates
    intervalRef.current = setInterval(updateAge, 1000);

    // Cleanup function
    return () => {
      mountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [birthDate, updateAge]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return ageResult;
}

/**
 * Custom hook for real-time interval calculation
 * Updates interval calculations every second to provide live numbers
 */
export function useRealTimeInterval(
  birthDate: Date | null,
  intervalValue: number | null,
  unitId: string | null,
  locale: string = 'cs'
): IntervalResult | null {
  const [intervalResult, setIntervalResult] = useState<IntervalResult | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);

  // Memoized update function
  const updateInterval = useCallback(() => {
    if (!birthDate || !intervalValue || !unitId || !mountedRef.current) return;

    const result = calculateIntervalResult(birthDate, intervalValue, unitId, locale);

    // Only update if component is still mounted
    if (mountedRef.current) {
      setIntervalResult(result);
    }
  }, [birthDate, intervalValue, unitId, locale]);

  useEffect(() => {
    mountedRef.current = true;

    if (!birthDate || !intervalValue || !unitId) {
      setIntervalResult(null);
      return;
    }

    // Initial calculation
    updateInterval();

    // Set up interval for real-time updates
    intervalRef.current = setInterval(updateInterval, 1000);

    // Cleanup function
    return () => {
      mountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [birthDate, intervalValue, unitId, updateInterval]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return intervalResult;
}

/**
 * Hook for managing real-time updates with performance optimization
 * Allows pausing/resuming updates and provides update frequency control
 */
export function useRealTimeAgeWithControls(
  birthDate: Date | null,
  locale: string = 'cs',
  updateInterval: number = 1000,
  isPaused: boolean = false
): {
  ageResult: AgeResult | null;
  isUpdating: boolean;
  pause: () => void;
  resume: () => void;
  forceUpdate: () => void;
} {
  const [ageResult, setAgeResult] = useState<AgeResult | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pausedRef = useRef(isPaused);

  // Update paused state
  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  const updateAge = useCallback(() => {
    if (!birthDate || pausedRef.current) return;

    const currentDate = new Date();
    const result = calculateAgeResult(birthDate, currentDate, locale);
    setAgeResult(result);
  }, [birthDate, locale]);

  const startUpdating = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setIsUpdating(true);
    updateAge(); // Initial update

    intervalRef.current = setInterval(updateAge, updateInterval);
  }, [updateAge, updateInterval]);

  const stopUpdating = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsUpdating(false);
  }, []);

  const pause = useCallback(() => {
    pausedRef.current = true;
    stopUpdating();
  }, [stopUpdating]);

  const resume = useCallback(() => {
    pausedRef.current = false;
    if (birthDate) {
      startUpdating();
    }
  }, [birthDate, startUpdating]);

  const forceUpdate = useCallback(() => {
    updateAge();
  }, [updateAge]);

  useEffect(() => {
    if (!birthDate) {
      setAgeResult(null);
      stopUpdating();
      return;
    }

    if (!isPaused) {
      startUpdating();
    }

    return () => {
      stopUpdating();
    };
  }, [birthDate, locale, updateInterval, isPaused, startUpdating, stopUpdating]);

  return {
    ageResult,
    isUpdating,
    pause,
    resume,
    forceUpdate
  };
}
