'use client';

import { AgeResult } from '@/types/age';
import { formatDate } from '@/utils/ageCalculations';

interface AgeResultsProps {
  result: AgeResult;
}

export function AgeResults({ result }: AgeResultsProps) {
  const { basic, special, birthDate, currentDate } = result;

  // Group special units by category
  const groupedUnits = special.reduce((acc, item) => {
    const category = item.unit.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof special>);

  const categoryNames = {
    basic: '📅 Základní jednotky',
    biological: '🫀 Biologické jednotky',
    cosmic: '🌌 Kosmické jednotky',
    cultural: '🎭 Kulturní jednotky',
    fun: '🎉 Zábavné jednotky'
  };

  return (
    <div className="space-y-6">
      {/* Basic Age Display */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          📊 Váš věk
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xl mb-1">🎂</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{basic.years}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">let</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xl mb-1">🗓️</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{basic.months}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">měsíců</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xl mb-1">📆</div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{basic.weeks}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">týdnů</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xl mb-1">📅</div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{basic.days}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">dní</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xl mb-1">🕒</div>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{basic.hours}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">hodin</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xl mb-1">⏲️</div>
            <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">{basic.minutes}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">minut</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xl mb-1">⏱️</div>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{basic.seconds}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">sekund</div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Od {formatDate(birthDate)} do {formatDate(currentDate)}</p>
        </div>
      </div>

      {/* Special Units by Category */}
      {Object.entries(groupedUnits).map(([category, units]) => (
        <div key={category} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {categoryNames[category as keyof typeof categoryNames]}
          </h3>
          <div className="space-y-3">
            {units.map((item) => (
              <div
                key={item.unit.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{item.unit.icon}</span>
                    <div>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {item.unit.name}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {item.unit.description}
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {item.formattedValue}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
