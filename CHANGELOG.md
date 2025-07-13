# Changelog

## [1.1.0] - 2025-01-13

### ⚡ Nové funkce - Živá čísla v reálném čase

#### Přidáno
- **Real-time aktualizace**: Všechna časová čísla se nyní aktualizují každou sekundu
- **Ovládací prvky**: Možnost pozastavit/obnovit živé aktualizace
- **Vizuální indikátory**: Status indikátor zobrazující stav aktualizací
- **Performance optimalizace**: Inteligentní správa intervalů a memory management

#### Technické změny
- Nový custom hook `useRealTimeAge` pro základní real-time funkčnost
- Pokročilý hook `useRealTimeAgeWithControls` s ovládacími prvky
- Komponenta `RealTimeControls` pro uživatelské ovládání
- Optimalizace `AgeResults` komponenty pro real-time zobrazení
- Aktualizace `IntervalResults` komponenty (bez real-time pro fixed target dates)

#### Soubory
- `src/hooks/useRealTimeAge.ts` - Custom hooks pro real-time funkčnost
- `src/components/RealTimeControls.tsx` - UI ovládací prvky
- `src/components/AgeResults.tsx` - Aktualizováno pro real-time
- `src/components/IntervalResults.tsx` - Aktualizováno pro konzistenci
- `src/test/realtime-test.html` - Standalone test pro real-time funkčnost
- `src/test/integration-test.js` - Integrační testy
- `docs/REALTIME_IMPLEMENTATION.md` - Technická dokumentace

#### Uživatelské rozhraní
- ⚡ Indikátor stavu v pravém horním rohu výsledků
- Zelená tečka = aktualizuje se, červená = pozastaveno
- Animace pulse při aktivních aktualizacích
- Skrývatelný panel s ovládacími tlačítky
- Vícejazyčná podpora pro všechny nové texty

#### Performance
- Optimalizované useCallback hooks
- Správné cleanup intervalů při unmount
- Memory leak prevence s mounted reference tracking
- Minimální impact na bundle size

#### Testování
- Automatické testy pro real-time funkčnost
- Performance monitoring
- Memory usage tracking
- Browser console test suite

### 🌐 Lokalizace
- Aktualizované překlady pro všechny jazyky (cs, en, de, ja)
- Nové texty pro ovládací prvky
- Aktualizované subtitles s informací o živých číslech

### 📚 Dokumentace
- Rozšířené README s informacemi o živých číslech
- Nová technická dokumentace pro vývojáře
- Příklady použití a konfigurace
- Troubleshooting guide

### 🔧 Technické detaily
- React 18+ kompatibilní
- TypeScript strict mode
- SSR safe implementace
- Modern browser support (ES2018+)
- Tree shaking optimized

---

## [1.0.0] - 2024-12-XX

### Počáteční verze
- Základní kalkulačka věku
- Vícejazyčná podpora
- Unikátní jednotky
- Interval výpočty
- Responsive design
- Dark mode podpora
