'use client';

import { useState } from 'react';
import { AgeForm } from '@/components/AgeForm';
import { AgeResults } from '@/components/AgeResults';
import { IntervalForm } from '@/components/IntervalForm';
import { IntervalResults } from '@/components/IntervalResults';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { AgeResult, IntervalResult } from '@/types/age';

type CalculationType = 'age' | 'interval' | null;

// Simple translations without next-intl
const translations = {
  cs: {
    title: '⏰ Kalkulačka věku',
    subtitle: 'Zjistěte, jak dlouho jste na světě v různých jednotkách - od srdečních tepů po snězené pizzy! Nyní s živými čísly v reálném čase! ⚡',
    back: '← Zpět na výběr',
    menuTitle: 'Co chcete spočítat?',
    menuSubtitle: 'Vyberte si jednu z možností níže',
    ageTitle: 'Můj aktuální věk',
    ageDescription: 'Zadejte datum narození a zjistěte, jak dlouho jste na světě ve všech možných jednotkách.',
    intervalTitle: 'Budoucí milníky',
    intervalDescription: 'Zjistěte, kdy dosáhnete konkrétního čísla v jakékoli jednotce. Kdy budete žít 10 000 dní?',
    ageFormTitle: '🎂 Váš věk',
    intervalFormTitle: '🎯 Budoucí milníky',
    ageResultsTitle: '📊 Výsledky věku',
    intervalResultsTitle: '🎯 Výsledky intervalu',
    // Form texts
    birthDate: 'Datum narození',
    birthTime: 'Čas narození (volitelné)',
    intervalValue: 'Hodnota',
    selectUnit: 'Jednotka',
    calculating: 'Počítám...',
    calculateAge: '🎂 Spočítat věk',
    calculateInterval: '📅 Spočítat interval',
    error: 'Chyba při výpočtu. Zkontrolujte zadané hodnoty.',
    // Units
    years: 'let',
    months: 'měsíců',
    weeks: 'týdnů',
    days: 'dní',
    hours: 'hodin',
    minutes: 'minut',
    seconds: 'sekund',
    // Categories
    basicUnits: '📅 Základní jednotky',
    biologicalUnits: '🫀 Biologické jednotky',
    cosmicUnits: '🌌 Kosmické jednotky',
    culturalUnits: '🎭 Kulturní jednotky',
    funUnits: '🎉 Zábavné jednotky',
    // Results
    yourAge: '📊 Váš věk',
    yourAgeAtDate: '📊 Váš věk k tomuto datu',
    targetDate: '🎯 Cílové datum',
    pastDateWarning: '⚠️ Toto datum již proběhlo!',
    futureDate: '✅ Toto datum nastane v budoucnosti',
    fromTo: 'Od {from} do {to}',
    forThisInterval: 'za tento interval'
  },
  en: {
    title: '⏰ Age Calculator',
    subtitle: 'Find out how long you\'ve been in the world in various units - from heartbeats to eaten pizzas! Now with live real-time numbers! ⚡',
    back: '← Back to selection',
    menuTitle: 'What would you like to calculate?',
    menuSubtitle: 'Choose one of the options below',
    ageTitle: 'My current age',
    ageDescription: 'Enter your birth date and find out how long you\'ve been in the world in all possible units.',
    intervalTitle: 'Future milestones',
    intervalDescription: 'Find out when you\'ll reach a specific number in any unit. When will you live 10,000 days?',
    ageFormTitle: '🎂 Your age',
    intervalFormTitle: '🎯 Future milestones',
    ageResultsTitle: '📊 Age results',
    intervalResultsTitle: '🎯 Interval results',
    // Form texts
    birthDate: 'Birth date',
    birthTime: 'Birth time (optional)',
    intervalValue: 'Value',
    selectUnit: 'Unit',
    calculating: 'Calculating...',
    calculateAge: '🎂 Calculate age',
    calculateInterval: '📅 Calculate interval',
    error: 'Error calculating. Please check the entered values.',
    // Units
    years: 'years',
    months: 'months',
    weeks: 'weeks',
    days: 'days',
    hours: 'hours',
    minutes: 'minutes',
    seconds: 'seconds',
    // Categories
    basicUnits: '📅 Basic units',
    biologicalUnits: '🫀 Biological units',
    cosmicUnits: '🌌 Cosmic units',
    culturalUnits: '🎭 Cultural units',
    funUnits: '🎉 Fun units',
    // Results
    yourAge: '📊 Your age',
    yourAgeAtDate: '📊 Your age at this date',
    targetDate: '🎯 Target date',
    pastDateWarning: '⚠️ This date has already passed!',
    futureDate: '✅ This date will occur in the future',
    fromTo: 'From {from} to {to}',
    forThisInterval: 'for this interval'
  },
  de: {
    title: '⏰ Altersrechner',
    subtitle: 'Finden Sie heraus, wie lange Sie schon auf der Welt sind in verschiedenen Einheiten - von Herzschlägen bis zu gegessenen Pizzas!',
    back: '← Zurück zur Auswahl',
    menuTitle: 'Was möchten Sie berechnen?',
    menuSubtitle: 'Wählen Sie eine der folgenden Optionen',
    ageTitle: 'Mein aktuelles Alter',
    ageDescription: 'Geben Sie Ihr Geburtsdatum ein und finden Sie heraus, wie lange Sie schon auf der Welt sind in allen möglichen Einheiten.',
    intervalTitle: 'Zukünftige Meilensteine',
    intervalDescription: 'Finden Sie heraus, wann Sie eine bestimmte Zahl in einer beliebigen Einheit erreichen. Wann werden Sie 10.000 Tage leben?',
    ageFormTitle: '🎂 Ihr Alter',
    intervalFormTitle: '🎯 Zukünftige Meilensteine',
    ageResultsTitle: '📊 Altersergebnisse',
    intervalResultsTitle: '🎯 Intervallergebnisse',
    birthDate: 'Geburtsdatum',
    birthTime: 'Geburtszeit (optional)',
    intervalValue: 'Wert',
    selectUnit: 'Einheit',
    calculating: 'Berechne...',
    calculateAge: '🎂 Alter berechnen',
    calculateInterval: '📅 Intervall berechnen',
    error: 'Fehler bei der Berechnung. Bitte überprüfen Sie die eingegebenen Werte.',
    years: 'Jahre', months: 'Monate', weeks: 'Wochen', days: 'Tage', hours: 'Stunden', minutes: 'Minuten', seconds: 'Sekunden',
    basicUnits: '📅 Grundeinheiten', biologicalUnits: '🫀 Biologische Einheiten', cosmicUnits: '🌌 Kosmische Einheiten', culturalUnits: '🎭 Kulturelle Einheiten', funUnits: '🎉 Spaßige Einheiten',
    yourAge: '📊 Ihr Alter', yourAgeAtDate: '📊 Ihr Alter zu diesem Datum', targetDate: '🎯 Zieldatum',
    pastDateWarning: '⚠️ Dieses Datum ist bereits vergangen!', futureDate: '✅ Dieses Datum liegt in der Zukunft',
    fromTo: 'Von {from} bis {to}', forThisInterval: 'für dieses Intervall'
  },
  ja: {
    title: '⏰ 年齢計算機',
    subtitle: '心拍数から食べたピザまで、様々な単位であなたがこの世にいる時間を調べましょう！',
    back: '← 選択に戻る',
    menuTitle: '何を計算しますか？',
    menuSubtitle: '以下のオプションから選択してください',
    ageTitle: '現在の年齢',
    ageDescription: '生年月日を入力して、あらゆる単位であなたがこの世にいる時間を調べましょう。',
    intervalTitle: '未来のマイルストーン',
    intervalDescription: '任意の単位で特定の数値に達する時期を調べましょう。10,000日生きるのはいつ？',
    ageFormTitle: '🎂 あなたの年齢',
    intervalFormTitle: '🎯 未来のマイルストーン',
    ageResultsTitle: '📊 年齢結果',
    intervalResultsTitle: '🎯 間隔結果',
    birthDate: '生年月日', birthTime: '出生時刻（任意）', intervalValue: '値', selectUnit: '単位',
    calculating: '計算中...', calculateAge: '🎂 年齢を計算', calculateInterval: '📅 間隔を計算',
    error: '計算エラーです。入力値を確認してください。',
    years: '年', months: 'ヶ月', weeks: '週', days: '日', hours: '時間', minutes: '分', seconds: '秒',
    basicUnits: '📅 基本単位', biologicalUnits: '🫀 生物学的単位', cosmicUnits: '🌌 宇宙的単位', culturalUnits: '🎭 文化的単位', funUnits: '🎉 楽しい単位',
    yourAge: '📊 あなたの年齢', yourAgeAtDate: '📊 この日のあなたの年齢', targetDate: '🎯 目標日',
    pastDateWarning: '⚠️ この日は既に過ぎています！', futureDate: '✅ この日は未来に起こります',
    fromTo: '{from}から{to}まで', forThisInterval: 'この間隔で'
  }
};

export default function Home() {
  const [locale, setLocale] = useState<'cs' | 'en' | 'de' | 'ja'>('cs');
  const [calculationType, setCalculationType] = useState<CalculationType>(null);
  const [ageResult, setAgeResult] = useState<AgeResult | null>(null);
  const [intervalResult, setIntervalResult] = useState<IntervalResult | null>(null);

  const t = translations[locale];

  const resetCalculation = () => {
    setCalculationType(null);
    setAgeResult(null);
    setIntervalResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Language Switcher */}
        <div className="flex justify-end mb-6">
          <LanguageSwitcher currentLocale={locale} onLocaleChange={setLocale} />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.subtitle}
          </p>

          {/* Back button when calculation type is selected */}
          {calculationType && (
            <button
              type="button"
              onClick={resetCalculation}
              className="mt-6 inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {t.back}
            </button>
          )}
        </div>

        {/* Main Content */}
        {!calculationType ? (
          /* Choice Menu */
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
                {t.menuTitle}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {t.menuSubtitle}
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
                    {t.ageTitle}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {t.ageDescription}
                  </p>
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
                    {t.intervalTitle}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {t.intervalDescription}
                  </p>
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
                {t.ageFormTitle}
              </h2>
              <AgeForm onResult={setAgeResult} locale={locale} />
            </div>

            {/* Age Results */}
            {ageResult && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  {t.ageResultsTitle}
                </h2>
                <AgeResults result={ageResult} locale={locale} />
              </div>
            )}
          </div>
        ) : (
          /* Interval Calculation Section */
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Interval Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                {t.intervalFormTitle}
              </h2>
              <IntervalForm onResult={setIntervalResult} locale={locale} />
            </div>

            {/* Interval Results */}
            {intervalResult && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  {t.intervalResultsTitle}
                </h2>
                <IntervalResults result={intervalResult} locale={locale} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {locale === 'cs' && 'Vytvořeno s ❤️ od'}
            {locale === 'en' && 'Created with ❤️ by'}
            {locale === 'de' && 'Erstellt mit ❤️ von'}
            {locale === 'ja' && '❤️で作成者'}
            {' '}
            <span className="font-semibold text-gray-900 dark:text-white">Swejzi</span>
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/Swejzi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/lukasswaczyna/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://x.com/swejzi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-black dark:hover:text-white transition-colors duration-200 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
              </svg>
              <span>X (Twitter)</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
