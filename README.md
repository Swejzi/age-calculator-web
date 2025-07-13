# ⏰ Age Calculator - Kalkulačka věku

Moderní webová aplikace pro výpočet věku v různých jednotkách - od standardních let a měsíců až po zábavné jednotky jako snězené pizzy, srdeční tepy nebo viděné memy!

## ✨ Funkce

- **Intuitivní rozcestník** - Vyberte si, co chcete počítat s podrobným popisem funkcí
- **Výpočet aktuálního věku** - Zadejte datum narození a zjistěte svůj přesný věk
- **Libovolné intervaly** - Spočítejte, kdy nastane určitý počet jednotek od vašeho narození
- **Různé kategorie jednotek**:
  - 📅 **Základní**: sekundy, minuty, hodiny, dny, týdny, měsíce, roky
  - 🫀 **Biologické**: srdeční tepy, nádechy, mrknutí, kroky
  - 🌌 **Kosmické**: úplňky, světelné roky, otočky Země
  - 🎭 **Kulturní**: Netflix epizody, TikTok videa, přečtené knihy
  - 🎉 **Zábavné**: pizzy, káva, memy, smíchy
- **Tmavý/světlý motiv** - Automatické přepínání podle systémových preferencí
- **Responzivní design** - Funguje na všech zařízeních
- **Moderní UI** - Čistý a intuitivní design s animacemi
- **Vertikální zobrazení** - Výsledky jsou přehledně zobrazeny pod sebou
- **Optimalizovaný layout** - Výsledky intervalů jsou hned vedle formuláře pro lepší přehlednost
- **Celá čísla** - Zobrazení čísel s mezerami jako oddělovači tisíců (1 234 567 místo 1.2M)
- **Uživatelsky přívětivé rozhraní** - Jasný rozcestník s popisem funkcí

## 🚀 Rychlý start

### Pomocí Makefile (doporučeno)

```bash
# Nainstalujte závislosti
make install

# Spusťte vývojový server
make dev
```

### Pomocí npm

```bash
# Nainstalujte závislosti
npm install

# Spusťte vývojový server
npm run dev
```

Otevřete [http://localhost:3000](http://localhost:3000) v prohlížeči.

## 📋 Dostupné příkazy

```bash
make help      # Zobrazí nápovědu
make install   # Nainstaluje závislosti
make dev       # Spustí vývojový server
make build     # Sestaví produkční verzi
make start     # Spustí produkční server
make lint      # Zkontroluje kód
make clean     # Vyčistí cache a build soubory
```

## 🛠️ Technologie

- **Next.js 15** - React framework s App Router
- **TypeScript** - Typová bezpečnost
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - Moderní React patterns

## 📁 Struktura projektu

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Globální styly
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Hlavní stránka
├── components/         # React komponenty
│   ├── AgeForm.tsx     # Formulář pro věk
│   ├── AgeResults.tsx  # Výsledky věku
│   ├── IntervalForm.tsx # Formulář pro interval
│   └── IntervalResults.tsx # Výsledky intervalu
├── types/              # TypeScript typy
│   └── age.ts          # Typy pro věk a jednotky
└── utils/              # Utility funkce
    └── ageCalculations.ts # Výpočetní logika
```

## 🎯 Příklady použití

### Rozcestník
1. Na úvodní stránce si vyberte jednu ze dvou možností:
   - **🎂 Můj aktuální věk** - pro výpočet současného věku
   - **📅 Libovolný interval** - pro výpočet budoucích dat

### Výpočet věku
1. Vyberte "Můj aktuální věk" z rozcestníku
2. Zadejte datum narození (a volitelně čas)
3. Klikněte na "Spočítat věk"
4. Uvidíte svůj věk ve všech jednotkách hned vedle formuláře

### Výpočet intervalu
1. Vyberte "Libovolný interval" z rozcestníku
2. Zadejte datum narození
3. Zadejte hodnotu a vyberte jednotku (např. "1000 pizzy")
4. Klikněte na "Spočítat interval"
5. Uvidíte, kdy tento interval nastane a jaký budete mít věk

## ⚡ Živá čísla v reálném čase

Aplikace nyní podporuje **živé aktualizace** všech časových hodnot:

- **Automatické aktualizace**: Všechna čísla se aktualizují každou sekundu
- **Real-time zobrazení**: Sekundy, minuty, hodiny se zvyšují v reálném čase
- **Ovládací prvky**: Možnost pozastavit/obnovit aktualizace
- **Optimalizovaný výkon**: Inteligentní správa intervalů a cleanup

### Ovládání živých čísel

V pravém horním rohu výsledků najdete ovládací prvky:
- ⚡ **Indikátor stavu**: Zelená tečka = aktualizuje se, červená = pozastaveno
- ⏸️ **Pozastavit**: Zastaví real-time aktualizace
- ▶️ **Obnovit**: Spustí real-time aktualizace
- 🔄 **Aktualizovat nyní**: Okamžitá aktualizace

## 🌟 Unikátní jednotky

Aplikace obsahuje mnoho zábavných jednotek:

- **🍕 Pizzy snězené** (1 týdně)
- **☕ Šálky kávy** (2 denně)
- **😂 Viděné memy** (100 denně)
- **🎮 Hodiny hraní her** (2 denně)
- **📱 TikTok videa** (50 denně)
- **💓 Srdeční tepy** (70/min)
- **🫁 Nádechy** (16/min)
- **🌕 Úplňky** (každých 29.53 dne)
- **✨ Světelné roky** (vzdálenost světla)
- A mnoho dalších!

## 🎨 Design

- **Automatický tmavý/světlý motiv** podle systémových preferencí
- **Moderní gradientní pozadí**
- **Animace a přechody** pro lepší UX
- **Responzivní layout** pro všechna zařízení
- **Přístupnost** s focus stavy a ARIA labely

## 🤝 Přispívání

Příspěvky jsou vítány! Pokud máte nápad na novou jednotku nebo vylepšení, neváhejte vytvořit issue nebo pull request.

## 📄 Licence

MIT License - viz LICENSE soubor pro detaily.

---

Vytvořeno s ❤️ pro zábavu s časem!
