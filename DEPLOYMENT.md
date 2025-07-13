# 🚀 Deployment na Apache Server

Tento projekt je nakonfigurován pro generování statických souborů, které můžete nahrát na jakýkoli Apache hosting.

## 📦 Generování statických souborů

```bash
# Vygeneruje statické soubory
make export
```

Nebo přímo:
```bash
npm run build
```

## 📁 Soubory pro upload

Po spuštění `make export` najdete všechny potřebné soubory v adresáři `out/`:

```
out/
├── index.html          # Hlavní stránka
├── 404.html           # Error stránka
├── _next/             # Next.js assets (CSS, JS)
├── .htaccess          # Apache konfigurace
└── ostatní soubory...
```

## 🔧 Nahrání na Apache server

1. **Vygenerujte soubory**: `make export`
2. **Nahrajte obsah `out/` adresáře** na váš Apache server (do root adresáře webu)
3. **Ujistěte se**, že `.htaccess` soubor je nahrán a Apache má povolený `mod_rewrite`

## ⚙️ Apache konfigurace

Projekt obsahuje `.htaccess` soubor, který zajišťuje:

- ✅ **Client-side routing** - SPA funguje správně
- ✅ **Komprese** - rychlejší načítání
- ✅ **Cache headers** - optimalizace výkonu  
- ✅ **Security headers** - základní zabezpečení

### Požadavky na Apache:
- `mod_rewrite` (pro routing)
- `mod_deflate` (pro kompresi) - volitelné
- `mod_expires` (pro cache) - volitelné
- `mod_headers` (pro security) - volitelné

## 🌐 Testování

Po nahrání můžete otestovat:

1. Otevřete hlavní URL vašeho webu
2. Zkuste refresh stránky (měl by fungovat díky `.htaccess`)
3. Zkontrolujte, že všechny assets se načítají správně

## 🔄 Aktualizace

Pro aktualizaci webu:

1. Proveďte změny v kódu
2. Spusťte `make export`
3. Nahrajte nový obsah `out/` adresáře na server

## 🐛 Řešení problémů

**Problém**: 404 chyba při refreshi stránky
**Řešení**: Ujistěte se, že `.htaccess` je nahrán a `mod_rewrite` je povolen

**Problém**: Soubory se nenačítají
**Řešení**: Zkontrolujte cesty k souborům a ujistěte se, že jsou všechny soubory z `out/` nahrány

**Problém**: Styling nefunguje
**Řešení**: Zkontrolujte, že se načítají CSS soubory z `_next/static/` adresáře
