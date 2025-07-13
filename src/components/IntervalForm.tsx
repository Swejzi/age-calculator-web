'use client';

import { useState } from 'react';
import { IntervalResult, TIME_UNITS } from '@/types/age';
import { calculateIntervalResult, parseBirthDateTime } from '@/utils/ageCalculations';

interface IntervalFormProps {
  onResult: (result: IntervalResult) => void;
}

export function IntervalForm({ onResult }: IntervalFormProps) {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [intervalValue, setIntervalValue] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('days');
  const [isCalculating, setIsCalculating] = useState(false);

  // Group units by category for better organization
  const groupedUnits = TIME_UNITS.reduce((acc, unit) => {
    if (!acc[unit.category]) {
      acc[unit.category] = [];
    }
    acc[unit.category].push(unit);
    return acc;
  }, {} as Record<string, typeof TIME_UNITS>);

  const categoryNames = {
    basic: '📅 Základní',
    biological: '🫀 Biologické',
    cosmic: '🌌 Kosmické',
    cultural: '🎭 Kulturní',
    fun: '🎉 Zábavné'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate || !intervalValue || !selectedUnit) return;

    setIsCalculating(true);
    
    try {
      const parsedDate = parseBirthDateTime(birthDate, birthTime);
      const value = parseFloat(intervalValue);
      
      if (isNaN(value) || value <= 0) {
        alert('Zadejte platnou hodnotu intervalu.');
        return;
      }

      const result = calculateIntervalResult(parsedDate, value, selectedUnit);
      if (result) {
        onResult(result);
      } else {
        alert('Chyba při výpočtu intervalu.');
      }
    } catch (error) {
      console.error('Error calculating interval:', error);
      alert('Chyba při výpočtu intervalu. Zkontrolujte zadané hodnoty.');
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="intervalBirthDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Datum narození *
        </label>
        <input
          type="date"
          id="intervalBirthDate"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="intervalBirthTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Čas narození (volitelné)
        </label>
        <input
          type="time"
          id="intervalBirthTime"
          value={birthTime}
          onChange={(e) => setBirthTime(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="intervalValue" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Hodnota *
          </label>
          <input
            type="number"
            id="intervalValue"
            value={intervalValue}
            onChange={(e) => setIntervalValue(e.target.value)}
            placeholder="např. 1000"
            min="0"
            step="any"
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="intervalUnit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Jednotka *
          </label>
          <select
            id="intervalUnit"
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {Object.entries(groupedUnits).map(([category, units]) => (
              <optgroup key={category} label={categoryNames[category as keyof typeof categoryNames]}>
                {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.icon} {unit.name} - {unit.description}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={!birthDate || !intervalValue || !selectedUnit || isCalculating}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
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
          '📅 Spočítat interval'
        )}
      </button>
    </form>
  );
}
