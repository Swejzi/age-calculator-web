'use client';

import { IntervalResult } from '@/types/age';
import { formatDate } from '@/utils/ageCalculations';

interface IntervalResultsProps {
  result: IntervalResult;
}

export function IntervalResults({ result }: IntervalResultsProps) {
  const { interval, unit, targetDate, ageAtTarget, special } = result;

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

  const isPastDate = targetDate < new Date();

  return (
    <div className="space-y-6">
      {/* Target Date Display */}
      <div className={`rounded-xl p-6 border ${
        isPastDate 
          ? 'bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800'
          : 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800'
      }`}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🎯 Cílové datum
        </h3>
        
        <div className="text-center">
          <div className="text-3xl font-bold mb-2">
            {unit.icon} {interval.toLocaleString()} {unit.name}
          </div>
          <div className={`text-xl font-semibold mb-4 ${
            isPastDate ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'
          }`}>
            {formatDate(targetDate)}
          </div>
          
          {isPastDate ? (
            <div className="bg-orange-100 dark:bg-orange-900/30 rounded-lg p-3">
              <p className="text-orange-800 dark:text-orange-200 font-medium">
                ⚠️ Toto datum již proběhlo!
              </p>
            </div>
          ) : (
            <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3">
              <p className="text-green-800 dark:text-green-200 font-medium">
                ✅ Toto datum nastane v budoucnosti
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Age at Target Date */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          📊 Váš věk k tomuto datu
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xl mb-1">🎂</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{ageAtTarget.years}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">let</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xl mb-1">🗓️</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{ageAtTarget.months}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">měsíců</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xl mb-1">📆</div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{ageAtTarget.weeks}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">týdnů</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xl mb-1">📅</div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{ageAtTarget.days}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">dní</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xl mb-1">🕒</div>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{ageAtTarget.hours}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">hodin</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xl mb-1">⏲️</div>
            <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">{ageAtTarget.minutes}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">minut</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xl mb-1">⏱️</div>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{ageAtTarget.seconds}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">sekund</div>
          </div>
        </div>
      </div>

      {/* Special Units for the Interval */}
      {Object.entries(groupedUnits).map(([category, units]) => (
        <div key={category} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {categoryNames[category as keyof typeof categoryNames]} za tento interval
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
