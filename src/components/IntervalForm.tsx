'use client';

import { useState } from 'react';
import { IntervalResult, TIME_UNITS } from '@/types/age';
import { calculateIntervalResult, parseBirthDateTime } from '@/utils/ageCalculations';

interface IntervalFormProps {
  onResult: (result: IntervalResult) => void;
  locale: 'cs' | 'en' | 'de' | 'ja';
}

// Unit name translations (using actual IDs from types/age.ts)
const unitNames = {
  cs: {
    seconds: 'Sekundy', minutes: 'Minuty', hours: 'Hodiny', days: 'Dny', weeks: 'Týdny', months: 'Měsíce', years: 'Roky',
    heartbeats: 'Srdeční tepy', breaths: 'Nádechy', blinks: 'Mrknutí', steps: 'Kroky', yawns: 'Zívnutí',
    // Cosmic units
    moon_cycles: 'Úplňky', light_distance: 'Světelné roky', earth_rotations: 'Otočky Země',
    mercury_years: 'Merkurské roky', venus_years: 'Venuše roky', mars_years: 'Marsovské roky',
    jupiter_years: 'Jupiterské roky', saturn_years: 'Saturnské roky', uranus_years: 'Uranské roky',
    neptune_years: 'Neptunské roky', pluto_years: 'Plutonské roky', solar_flares: 'Sluneční erupce',
    halley_comet: 'Halleyova kometa', galactic_rotations: 'Galaktické rotace', light_years_traveled: 'Uražené světelné roky',
    asteroid_encounters: 'Setkání s asteroidy', meteor_showers: 'Meteorické roje', eclipse_cycles: 'Cykly zatmění',
    supernova_events: 'Supernovy', cosmic_background_shifts: 'Posun kosmického pozadí', neutron_star_pulses: 'Pulzy neutronových hvězd',
    black_hole_orbits: 'Orbity černých děr', voyager_distance: 'Vzdálenost Voyageru', iss_orbits: 'Orbity ISS',
    // Fun units
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

// Unit description translations (using actual IDs from types/age.ts)
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
    seconds: '時間単位（1日の1/86400）', minutes: '時間単位（1日の1/1440）', hours: '時間単位（1日の1/24）', days: '標準的な日', weeks: '7日間', months: '平均月（30.44日）', years: 'カレンダー年',
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

const intervalTranslations = {
  cs: { birthDate: 'Datum narození', birthTime: 'Čas narození (volitelné)', intervalValue: 'Hodnota', selectUnit: 'Jednotka', calculating: 'Počítám...', calculateInterval: '📅 Spočítat interval', error: 'Chyba při výpočtu. Zkontrolujte zadané hodnoty.', basicUnits: '📅 Základní', biologicalUnits: '🫀 Biologické', cosmicUnits: '🌌 Kosmické', culturalUnits: '🎭 Kulturní', funUnits: '🎉 Zábavné', valuePlaceholder: 'např. 1000', dateFormat: 'dd.mm.rrrr' },
  en: { birthDate: 'Birth date', birthTime: 'Birth time (optional)', intervalValue: 'Value', selectUnit: 'Unit', calculating: 'Calculating...', calculateInterval: '📅 Calculate interval', error: 'Error calculating. Please check the entered values.', basicUnits: '📅 Basic', biologicalUnits: '🫀 Biological', cosmicUnits: '🌌 Cosmic', culturalUnits: '🎭 Cultural', funUnits: '🎉 Fun', valuePlaceholder: 'e.g. 1000', dateFormat: 'mm/dd/yyyy' },
  de: { birthDate: 'Geburtsdatum', birthTime: 'Geburtszeit (optional)', intervalValue: 'Wert', selectUnit: 'Einheit', calculating: 'Berechne...', calculateInterval: '📅 Intervall berechnen', error: 'Fehler bei der Berechnung. Bitte überprüfen Sie die eingegebenen Werte.', basicUnits: '📅 Grund', biologicalUnits: '🫀 Biologische', cosmicUnits: '🌌 Kosmische', culturalUnits: '🎭 Kulturelle', funUnits: '🎉 Spaßige', valuePlaceholder: 'z.B. 1000', dateFormat: 'dd.mm.yyyy' },
  ja: { birthDate: '生年月日', birthTime: '出生時刻（任意）', intervalValue: '値', selectUnit: '単位', calculating: '計算中...', calculateInterval: '📅 間隔を計算', error: '計算エラーです。入力値を確認してください。', basicUnits: '📅 基本', biologicalUnits: '🫀 生物学的', cosmicUnits: '🌌 宇宙的', culturalUnits: '🎭 文化的', funUnits: '🎉 楽しい', valuePlaceholder: '例：1000', dateFormat: 'yyyy/mm/dd' }
};

export function IntervalForm({ onResult, locale }: IntervalFormProps) {
  const t = intervalTranslations[locale];
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [intervalValue, setIntervalValue] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('days');
  const [isCalculating, setIsCalculating] = useState(false);

  // Create localized units
  const localizedUnits = TIME_UNITS.map(unit => ({
    ...unit,
    name: getLocalizedUnitName(unit.id, locale),
    description: getLocalizedUnitDescription(unit.id, locale)
  }));

  // Group units by category for better organization
  const groupedUnits = localizedUnits.reduce((acc, unit) => {
    if (!acc[unit.category]) {
      acc[unit.category] = [];
    }
    acc[unit.category].push(unit);
    return acc;
  }, {} as Record<string, typeof localizedUnits>);

  const categoryNames = {
    basic: t.basicUnits,
    biological: t.biologicalUnits,
    cosmic: t.cosmicUnits,
    cultural: t.culturalUnits,
    fun: t.funUnits
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate || !intervalValue || !selectedUnit) return;

    setIsCalculating(true);
    
    try {
      const parsedDate = parseBirthDateTime(birthDate, birthTime);
      const value = parseFloat(intervalValue);
      
      if (isNaN(value) || value <= 0) {
        alert(t.error);
        return;
      }

      const result = calculateIntervalResult(parsedDate, value, selectedUnit, locale);
      if (result) {
        onResult(result);
      } else {
        alert(t.error);
      }
    } catch (error) {
      console.error('Error calculating interval:', error);
      alert(t.error);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="intervalBirthDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t.birthDate} * <span className="text-xs text-gray-500 dark:text-gray-400">({t.dateFormat})</span>
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
          {t.birthTime}
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
            {t.intervalValue} *
          </label>
          <input
            type="number"
            id="intervalValue"
            value={intervalValue}
            onChange={(e) => setIntervalValue(e.target.value)}
            placeholder={t.valuePlaceholder}
            min="0"
            step="any"
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="intervalUnit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.selectUnit} *
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
            {t.calculating}
          </>
        ) : (
          t.calculateInterval
        )}
      </button>
    </form>
  );
}
