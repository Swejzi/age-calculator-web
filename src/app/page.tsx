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
    </div>
  );
}
