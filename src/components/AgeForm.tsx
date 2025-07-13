'use client';

import { useState } from 'react';
import { AgeResult } from '@/types/age';
import { calculateAgeResult, parseBirthDateTime } from '@/utils/ageCalculations';

interface AgeFormProps {
  onResult: (result: AgeResult) => void;
}

export function AgeForm({ onResult }: AgeFormProps) {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) return;

    setIsCalculating(true);
    
    try {
      const parsedDate = parseBirthDateTime(birthDate, birthTime);
      const result = calculateAgeResult(parsedDate);
      onResult(result);
    } catch (error) {
      console.error('Error calculating age:', error);
      alert('Chyba při výpočtu věku. Zkontrolujte zadané datum.');
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Datum narození *
        </label>
        <input
          type="date"
          id="birthDate"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="birthTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Čas narození (volitelné)
        </label>
        <input
          type="time"
          id="birthTime"
          value={birthTime}
          onChange={(e) => setBirthTime(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <button
        type="submit"
        disabled={!birthDate || isCalculating}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
      >
        {isCalculating ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Počítám...
          </>
        ) : (
          '🎂 Spočítat věk'
        )}
      </button>
    </form>
  );
}
