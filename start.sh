#!/bin/bash

# Cambiar al directorio donde está el script
cd "$(dirname "$0")"

echo ""
echo "🚀 Inicializando frontend..."
echo ""

echo "📦 Instalando dependencias..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Error en instalacion de dependencias"
    read -p "Presiona Enter para salir..."
    exit 1
fi

echo ""
echo "🔥 Iniciando servidor de desarrollo..."
npm run dev

read -p "Presiona Enter para salir..."