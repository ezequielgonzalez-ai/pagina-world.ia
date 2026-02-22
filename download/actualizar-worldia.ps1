# Script para actualizar WORLD.IA
# Copia este archivo a tu computadora y ejecútalo con PowerShell

Write-Host "🚀 Actualizando WORLD.IA..." -ForegroundColor Cyan

# Ir al escritorio
cd $env:USERPROFILE\Desktop

# Clonar/actualizar repositorio
if (Test-Path "pagina-world.ia") {
    cd pagina-world.ia
    git pull origin master
} else {
    git clone https://github.com/ezequielgonzalez-ai/pagina-world.ia
    cd pagina-world.ia
}

Write-Host "✅ ¡Listo! Ahora abre GitHub Desktop y haz Push" -ForegroundColor Green
Write-Host "📍 Carpeta: $PWD" -ForegroundColor Yellow

Read-Host "Presiona Enter para salir"
