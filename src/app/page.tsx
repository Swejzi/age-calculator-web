'use client';

import { useState } from 'react';
import { AgeForm } from '@/components/AgeForm';
import { AgeResults } from '@/components/AgeResults';
import { IntervalForm } from '@/components/IntervalForm';
import { IntervalResults } from '@/components/IntervalResults';
import { AgeResult, IntervalResult } from '@/types/age';

type CalculationType = 'age' | 'interval' | null;

export default function Home() {
  const [calculationType, setCalculationType] = useState<CalculationType>(null);
  const [ageResult, setAgeResult] = useState<AgeResult | null>(null);
  const [intervalResult, setIntervalResult] = useState<IntervalResult | null>(null);

  const resetCalculation = () => {
    setCalculationType(null);
    setAgeResult(null);
    setIntervalResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            ⏰ Age Calculator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Zjistěte, jak dlouho jste na světě v různých jednotkách - od srdečních tepů po snězené pizzy!
          </p>

          {/* Back button when calculation type is selected */}
          {calculationType && (
            <button
              type="button"
              onClick={resetCalculation}
              className="mt-6 inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              ← Zpět na výběr
            </button>
          )}
        </div>

        {/* Main Content */}
        {!calculationType ? (
          /* Choice Menu */
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
                Co chcete spočítat?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Vyberte si jednu z možností níže
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Age Calculation Option */}
              <div
                onClick={() => setCalculationType('age')}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-blue-500"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">🎂</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Můj aktuální věk
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Zadejte datum narození a zjistěte, jak dlouho jste na světě ve všech možných jednotkách.
                  </p>
                  <div className="space-y-2 text-sm text-gray-500 dark:text-gray-500">
                    <p>✨ Roky, měsíce, týdny, dny, hodiny, minuty, sekundy</p>
                    <p>💓 Srdeční tepy, nádechy, mrknutí</p>
                    <p>🍕 Snězené pizzy, šálky kávy, viděné memy</p>
                    <p>🌕 Úplňky, světelné roky, a mnoho dalšího</p>
                  </div>
                </div>
              </div>

              {/* Interval Calculation Option */}
              <div
                onClick={() => setCalculationType('interval')}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-green-500"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Libovolný interval
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Zadejte počet jednotek a zjistěte, kdy od narození tento interval uplyne.
                  </p>
                  <div className="space-y-2 text-sm text-gray-500 dark:text-gray-500">
                    <p>🎯 Kdy nastane 1 milion sekund od narození?</p>
                    <p>🍕 Kdy sním svou 1000. pizzu?</p>
                    <p>💓 Kdy mi bude bít srdce miliardtý tep?</p>
                    <p>🌕 Kdy uvidím 500. úplněk?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : calculationType === 'age' ? (
          /* Age Calculation Section */
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Age Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                🎂 Váš věk
              </h2>
              <AgeForm onResult={setAgeResult} />
            </div>

            {/* Age Results */}
            {ageResult && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  📊 Výsledky věku
                </h2>
                <AgeResults result={ageResult} />
              </div>
            )}
          </div>
        ) : (
          /* Interval Calculation Section */
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Interval Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                📅 Libovolný interval
              </h2>
              <IntervalForm onResult={setIntervalResult} />
            </div>

            {/* Interval Results */}
            {intervalResult && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  🎯 Výsledky intervalu
                </h2>
                <IntervalResults result={intervalResult} />
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500 dark:text-gray-400">
          <p>Vytvořeno s ❤️ pro zábavu s časem</p>
        </div>
      </div>
    </div>
  );
}
