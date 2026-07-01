import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    VitePWA({
      registerType: 'autoUpdate', //Actualiza el SW
      includeAssets: ['favicon.svg'], //Si quiero que guarde las imagenes en cache
      manifest: {
        name: 'Pokedex',
        short_name: 'Pokedex',
        description: 'Una pwa de pokemons',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icons/windows/LargeTile.scale-200.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/windows/StoreLogo.scale-400.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
