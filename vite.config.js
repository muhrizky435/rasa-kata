import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // eslint-disable-next-line no-undef
    ...(process.env.NODE_ENV === 'production' ? [VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Rasa Kata',
        short_name: 'RasaKata',
        description: 'Kenali & Kelola Emosimu dengan Lebih Baik dengan AI Rasa Kata',
        theme_color: '#ffffff',
        icons: [
          {
            src: "assets/icon-144.png",
            type: "image/png",
            sizes: "144x144",
            purpose: "any"
          },
          {
            src: "assets/icon-48.png",
            type: "image/png",
            sizes: "48x48",
            purpose: "maskable"
          },
          {
            src: "assets/icon-96.png",
            type: "image/png",
            sizes: "96x96",
            purpose: "maskable"
          },
          {
            src: "assets/icon-192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "maskable"
          },
          {
            src: "assets/icon-512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable"
          }
        ],
        screenshots: [
          {
            src: "assets/screenshots/screenshots_1.png",
            sizes: "1600x664",
            type: "image/png",
            form_factor: "wide"
          },
          {
            src: "assets/screenshots/screenshots_2.png",
            sizes: "1600x726",
            type: "image/png",
            form_factor: "wide"
          },
          {
            src: "assets/screenshots/screenshots_3.png",
            sizes: "600x1304",
            type: "image/png",
            form_factor: "narrow"
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,svg,ico}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/rasa-kata-7ca6a75a895b\.herokuapp\.com\/.+/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60, // 1 day
              },
              networkTimeoutSeconds: 10, // Retry after 10 seconds if offline
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.+/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.+/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            }
          }
        ]
      }
    })] : [])
  ],
})
