'use client';

import { IntervalResult } from '@/types/age';
import { formatDate } from '@/utils/ageCalculations';

interface IntervalResultsProps {
  result: IntervalResult;
  locale: 'cs' | 'en' | 'de' | 'ja';
}

// Unit name translations (same as in other components)
const unitNames = {
  cs: {
    seconds: 'Sekundy', minutes: 'Minuty', hours: 'Hodiny', days: 'Dny', weeks: 'Týdny', months: 'Měsíce', years: 'Roky',
    heartbeats: 'Srdeční tepy', breaths: 'Nádechy', blinks: 'Mrknutí', steps: 'Kroky', yawns: 'Zívnutí',
    moon_cycles: 'Úplňky', light_distance: 'Světelné roky', earth_rotations: 'Otočky Země',
    pizzas: 'Pizzy snězené', coffee_cups: 'Šálky kávy', netflix_episodes: 'Netflix epizody', tiktok_videos: 'TikTok videa',
    books_read: 'Přečtené knihy', songs_listened: 'Poslechnuté písně', memes_seen: 'Viděné memy', instagram_posts: 'Instagram posty',
    video_games_hours: 'Hodiny hraní her', toilet_visits: 'Návštěvy WC', laughs: 'Smíchy'
  },
  en: {
    seconds: 'Seconds', minutes: 'Minutes', hours: 'Hours', days: 'Days', weeks: 'Weeks', months: 'Months', years: 'Years',
    heartbeats: 'Heartbeats', breaths: 'Breaths', blinks: 'Blinks', steps: 'Steps', yawns: 'Yawns',
    moon_cycles: 'Full moons', light_distance: 'Light years', earth_rotations: 'Earth rotations',
    pizzas: 'Pizzas eaten', coffee_cups: 'Coffee cups', netflix_episodes: 'Netflix episodes', tiktok_videos: 'TikTok videos',
    books_read: 'Books read', songs_listened: 'Songs listened', memes_seen: 'Memes seen', instagram_posts: 'Instagram posts',
    video_games_hours: 'Gaming hours', toilet_visits: 'Toilet visits', laughs: 'Laughs'
  },
  de: {
    seconds: 'Sekunden', minutes: 'Minuten', hours: 'Stunden', days: 'Tage', weeks: 'Wochen', months: 'Monate', years: 'Jahre',
    heartbeats: 'Herzschläge', breaths: 'Atemzüge', blinks: 'Blinzeln', steps: 'Schritte', yawns: 'Gähnen',
    moon_cycles: 'Vollmonde', light_distance: 'Lichtjahre', earth_rotations: 'Erdumdrehungen',
    pizzas: 'Gegessene Pizzas', coffee_cups: 'Kaffeetassen', netflix_episodes: 'Netflix-Episoden', tiktok_videos: 'TikTok-Videos',
    books_read: 'Gelesene Bücher', songs_listened: 'Gehörte Lieder', memes_seen: 'Gesehene Memes', instagram_posts: 'Instagram-Posts',
    video_games_hours: 'Spielstunden', toilet_visits: 'Toilettenbesuche', laughs: 'Lachen'
  },
  ja: {
    seconds: '秒', minutes: '分', hours: '時間', days: '日', weeks: '週', months: '月', years: '年',
    heartbeats: '心拍', breaths: '呼吸', blinks: 'まばたき', steps: '歩数', yawns: 'あくび',
    moon_cycles: '満月', light_distance: '光年', earth_rotations: '地球の自転',
    pizzas: '食べたピザ', coffee_cups: 'コーヒーカップ', netflix_episodes: 'Netflixエピソード', tiktok_videos: 'TikTok動画',
    books_read: '読んだ本', songs_listened: '聞いた歌', memes_seen: '見たミーム', instagram_posts: 'Instagramの投稿',
    video_games_hours: 'ゲーム時間', toilet_visits: 'トイレ訪問', laughs: '笑い'
  }
};

// Unit description translations
const unitDescriptions = {
  cs: {
    seconds: 'Jednotky času (1/86400 dne)', minutes: 'Jednotky času (1/1440 dne)', hours: 'Jednotky času (1/24 dne)', days: 'Standardní dny', weeks: 'Sedmidenní období', months: 'Průměrný měsíc (30.44 dne)', years: 'Kalendářní roky',
    heartbeats: '70 tepů za minutu', breaths: '16 nádechů za minutu', blinks: '15 mrknutí za minutu', steps: '8000 kroků denně', yawns: '8 zívnutí denně',
    moon_cycles: 'Lunární cykly (29.53 dne)', light_distance: 'Vzdálenost světla za rok', earth_rotations: 'Rotace Země kolem osy',
    pizzas: '1 pizza týdně', coffee_cups: '2 šálky denně', netflix_episodes: '45min epizoda denně', tiktok_videos: '30s video, 50 denně',
    books_read: '1 kniha za měsíc', songs_listened: '3min píseň, 20 denně', memes_seen: '100 memů denně', instagram_posts: '1 post za 3 dny',
    video_games_hours: '2 hodiny denně', toilet_visits: '6 návštěv denně', laughs: '15 smíchů denně'
  },
  en: {
    seconds: 'Time units (1/86400 of a day)', minutes: 'Time units (1/1440 of a day)', hours: 'Time units (1/24 of a day)', days: 'Standard days', weeks: '7-day periods', months: 'Average month (30.44 days)', years: 'Calendar years',
    heartbeats: '70 beats per minute', breaths: '16 breaths per minute', blinks: '15 blinks per minute', steps: '8000 steps daily', yawns: '8 yawns per day',
    moon_cycles: 'Lunar cycles (29.53 days)', light_distance: 'Distance light travels in a year', earth_rotations: 'Earth rotation around axis',
    pizzas: '1 pizza per week', coffee_cups: '2 cups daily', netflix_episodes: '45min episode daily', tiktok_videos: '30s video, 50 daily',
    books_read: '1 book per month', songs_listened: '3min song, 20 daily', memes_seen: '100 memes daily', instagram_posts: '1 post per 3 days',
    video_games_hours: '2 hours daily', toilet_visits: '6 visits daily', laughs: '15 laughs daily'
  },
  de: {
    seconds: 'Zeiteinheiten (1/86400 eines Tages)', minutes: 'Zeiteinheiten (1/1440 eines Tages)', hours: 'Zeiteinheiten (1/24 eines Tages)', days: 'Standardtage', weeks: '7-Tage-Perioden', months: 'Durchschnittlicher Monat (30,44 Tage)', years: 'Kalenderjahre',
    heartbeats: '70 Schläge pro Minute', breaths: '16 Atemzüge pro Minute', blinks: '15 Blinzeln pro Minute', steps: '8000 Schritte täglich', yawns: '8 Gähnen pro Tag',
    moon_cycles: 'Mondzyklen (29,53 Tage)', light_distance: 'Entfernung des Lichts in einem Jahr', earth_rotations: 'Erdrotation um die Achse',
    pizzas: '1 Pizza pro Woche', coffee_cups: '2 Tassen täglich', netflix_episodes: '45min Episode täglich', tiktok_videos: '30s Video, 50 täglich',
    books_read: '1 Buch pro Monat', songs_listened: '3min Lied, 20 täglich', memes_seen: '100 Memes täglich', instagram_posts: '1 Post alle 3 Tage',
    video_games_hours: '2 Stunden täglich', toilet_visits: '6 Besuche täglich', laughs: '15 Lachen täglich'
  },
  ja: {
    seconds: '時間単位（1日の1/86400）', minutes: '時間単位（1日の1/1440）', hours: '時間単位（1日の1/24）', days: '標準日', weeks: '7日間', months: '平均月（30.44日）', years: 'カレンダー年',
    heartbeats: '毎分70回', breaths: '毎分16回', blinks: '毎分15回', steps: '1日8000歩', yawns: '1日8回',
    moon_cycles: '月の周期（29.53日）', light_distance: '光が1年で進む距離', earth_rotations: '地球の軸周りの回転',
    pizzas: '週1枚', coffee_cups: '1日2杯', netflix_episodes: '1日45分エピソード', tiktok_videos: '30秒動画、1日50本',
    books_read: '月1冊', songs_listened: '3分の歌、1日20曲', memes_seen: '1日100個のミーム', instagram_posts: '3日に1投稿',
    video_games_hours: '1日2時間', toilet_visits: '1日6回', laughs: '1日15回'
  }
};

function getLocalizedUnitName(unitId: string, locale: 'cs' | 'en' | 'de' | 'ja'): string {
  const name = unitNames[locale][unitId as keyof typeof unitNames[typeof locale]];
  return name || unitNames['en'][unitId as keyof typeof unitNames['en']] || unitId;
}

function getLocalizedUnitDescription(unitId: string, locale: 'cs' | 'en' | 'de' | 'ja'): string {
  const description = unitDescriptions[locale][unitId as keyof typeof unitDescriptions[typeof locale]];
  return description || unitDescriptions['en'][unitId as keyof typeof unitDescriptions['en']] || unitId;
}

const intervalResultsTranslations = {
  cs: { targetDate: '🎯 Cílové datum', yourAgeAtDate: '📊 Váš věk k tomuto datu', pastDateWarning: '⚠️ Toto datum již proběhlo!', futureDate: '✅ Toto datum nastane v budoucnosti', forThisInterval: 'za tento interval', years: 'let', months: 'měsíců', weeks: 'týdnů', days: 'dní', hours: 'hodin', minutes: 'minut', seconds: 'sekund', basicUnits: '📅 Základní jednotky', biologicalUnits: '🫀 Biologické jednotky', cosmicUnits: '🌌 Kosmické jednotky', culturalUnits: '🎭 Kulturní jednotky', funUnits: '🎉 Zábavné jednotky' },
  en: { targetDate: '🎯 Target date', yourAgeAtDate: '📊 Your age at this date', pastDateWarning: '⚠️ This date has already passed!', futureDate: '✅ This date will occur in the future', forThisInterval: 'for this interval', years: 'years', months: 'months', weeks: 'weeks', days: 'days', hours: 'hours', minutes: 'minutes', seconds: 'seconds', basicUnits: '📅 Basic units', biologicalUnits: '🫀 Biological units', cosmicUnits: '🌌 Cosmic units', culturalUnits: '🎭 Cultural units', funUnits: '🎉 Fun units' },
  de: { targetDate: '🎯 Zieldatum', yourAgeAtDate: '📊 Ihr Alter zu diesem Datum', pastDateWarning: '⚠️ Dieses Datum ist bereits vergangen!', futureDate: '✅ Dieses Datum liegt in der Zukunft', forThisInterval: 'für dieses Intervall', years: 'Jahre', months: 'Monate', weeks: 'Wochen', days: 'Tage', hours: 'Stunden', minutes: 'Minuten', seconds: 'Sekunden', basicUnits: '📅 Grundeinheiten', biologicalUnits: '🫀 Biologische Einheiten', cosmicUnits: '🌌 Kosmische Einheiten', culturalUnits: '🎭 Kulturelle Einheiten', funUnits: '🎉 Spaßige Einheiten' },
  ja: { targetDate: '🎯 目標日', yourAgeAtDate: '📊 この日のあなたの年齢', pastDateWarning: '⚠️ この日は既に過ぎています！', futureDate: '✅ この日は未来に起こります', forThisInterval: 'この間隔で', years: '年', months: 'ヶ月', weeks: '週', days: '日', hours: '時間', minutes: '分', seconds: '秒', basicUnits: '📅 基本単位', biologicalUnits: '🫀 生物学的単位', cosmicUnits: '🌌 宇宙的単位', culturalUnits: '🎭 文化的単位', funUnits: '🎉 楽しい単位' }
};

export function IntervalResults({ result, locale }: IntervalResultsProps) {
  const { interval, unit, targetDate, ageAtTarget, special } = result;
  const t = intervalResultsTranslations[locale];

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
    basic: t.basicUnits,
    biological: t.biologicalUnits,
    cosmic: t.cosmicUnits,
    cultural: t.culturalUnits,
    fun: t.funUnits
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
          {t.targetDate}
        </h3>
        
        <div className="text-center">
          <div className="text-3xl font-bold mb-2">
            {unit.icon} {interval.toLocaleString(locale === 'cs' ? 'cs-CZ' : locale === 'en' ? 'en-US' : locale === 'de' ? 'de-DE' : 'ja-JP')} {getLocalizedUnitName(unit.id, locale)}
          </div>
          <div className={`text-xl font-semibold mb-4 ${
            isPastDate ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'
          }`}>
            {formatDate(targetDate, locale)}
          </div>
          
          {isPastDate ? (
            <div className="bg-orange-100 dark:bg-orange-900/30 rounded-lg p-3">
              <p className="text-orange-800 dark:text-orange-200 font-medium">
                {t.pastDateWarning}
              </p>
            </div>
          ) : (
            <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3">
              <p className="text-green-800 dark:text-green-200 font-medium">
                {t.futureDate}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Age at Target Date */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t.yourAgeAtDate}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xl mb-1">🎂</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{ageAtTarget.years}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t.years}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xl mb-1">🗓️</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{ageAtTarget.months}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t.months}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xl mb-1">📆</div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{ageAtTarget.weeks}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t.weeks}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xl mb-1">📅</div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{ageAtTarget.days}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t.days}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xl mb-1">🕒</div>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{ageAtTarget.hours}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t.hours}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xl mb-1">⏲️</div>
            <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">{ageAtTarget.minutes}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t.minutes}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xl mb-1">⏱️</div>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{ageAtTarget.seconds}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t.seconds}</div>
          </div>
        </div>
      </div>

      {/* Special Units for the Interval */}
      {Object.entries(groupedUnits).map(([category, units]) => (
        <div key={category} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {categoryNames[category as keyof typeof categoryNames]} {t.forThisInterval}
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
                        {getLocalizedUnitName(item.unit.id, locale)}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {getLocalizedUnitDescription(item.unit.id, locale)}
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
