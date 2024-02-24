import { vitePlugin as remix } from "@remix-run/dev"
import autoImport from "unplugin-auto-import/vite"
import iconsResolver from "unplugin-icons/resolver"
import icons from "unplugin-icons/vite"
import { defineConfig } from "vite"
import { VitePWA, type VitePWAOptions } from "vite-plugin-pwa"
import topLevelAwait from "vite-plugin-top-level-await"
import wasm from "vite-plugin-wasm"
import tsconfigPaths from "vite-tsconfig-paths"

const pwaOptions: Partial<VitePWAOptions> = {
  includeAssets: ["favicon.ico"],
  srcDir: "app",
  filename: "sw.ts",
  registerType: "autoUpdate",
  strategies: "injectManifest",
  injectManifest: { globPatterns: ["**/*.{js,css,html,ico,wasm}"] },
  manifest: {
    name: "XDev",
    short_name: "XDev",
    description: "DevResults local-first team app",
    theme_color: "#ffffff",
    background_color: "#FFFFFF",
    display: "standalone",
    icons: [
      { src: "icon-128x128.png", sizes: "128x128", type: "image/png", purpose: "any maskable" },
      { src: "icon-192x192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
      { src: "icon-256x256.png", sizes: "256x256", type: "image/png", purpose: "any maskable" },
      { src: "icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
    ],
  },
  devOptions: {
    enabled: false,
    type: "module",
    navigateFallback: "index.html",
  },
}

export default defineConfig({
  plugins: [
    remix({ ssr: false }), // SPA mode
    tsconfigPaths(),
    wasm(),
    topLevelAwait(),
    VitePWA(pwaOptions),
    autoImport({
      dts: false,
      resolvers: [
        iconsResolver({
          prefix: false,
          extension: "jsx",
          enabledCollections: ["tabler"],
          alias: { icon: "tabler" },
        }),
      ],
    }),
    icons({ compiler: "jsx", jsx: "react" }),
  ],

  worker: {
    format: "es",
    plugins: () => [wasm(), topLevelAwait()],
  },

  optimizeDeps: {
    // This is necessary because otherwise `vite dev` includes two separate versions of the JS
    // wrapper. This causes problems because the JS wrapper has a module-level variable to track JS
    // side heap allocations, and initializing this twice breaks things.
    exclude: ["@automerge/automerge-wasm/bundler/bindgen_bg.wasm", "@syntect/wasm"],
  },

  server: {
    fs: {
      strict: false,
    },
  },
})
