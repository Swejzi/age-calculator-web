# Age Calculator - Makefile

.PHONY: help install dev build start test lint clean export

# Default target
help:
	@echo "Age Calculator - Kalkulačka věku"
	@echo ""
	@echo "Dostupné příkazy:"
	@echo "  make install  - Nainstaluje závislosti"
	@echo "  make dev      - Spustí vývojový server"
	@echo "  make build    - Sestaví produkční verzi"
	@echo "  make export   - Vygeneruje statické soubory pro Apache"
	@echo "  make start    - Spustí produkční server"
	@echo "  make test     - Spustí testy"
	@echo "  make lint     - Zkontroluje kód"
	@echo "  make clean    - Vyčistí cache a build soubory"

# Install dependencies
install:
	@echo "📦 Instaluji závislosti..."
	npm install

# Start development server
dev:
	@echo "🚀 Spouštím vývojový server..."
	npm run dev

# Build for production
build:
	@echo "🏗️ Sestavuji produkční verzi..."
	npm run build

# Export static files for Apache
export: build
	@echo "📦 Generuji statické soubory pro Apache..."
	@echo "✅ Statické soubory jsou v adresáři 'out/'"
	@echo "📁 Nahrajte obsah 'out/' adresáře na váš Apache server"

# Start production server
start: build
	@echo "▶️ Spouštím produkční server..."
	npm start

# Run tests (when implemented)
test:
	@echo "🧪 Spouštím testy..."
	@echo "Testy zatím nejsou implementovány"

# Lint code
lint:
	@echo "🔍 Kontroluji kód..."
	npm run lint

# Clean cache and build files
clean:
	@echo "🧹 Čistím cache a build soubory..."
	rm -rf .next
	rm -rf node_modules/.cache
	@echo "✅ Vyčištěno!"

# Quick setup for new environment
setup: install
	@echo "✅ Projekt je připraven k použití!"
	@echo "Spusťte 'make dev' pro spuštění vývojového serveru"
