import { flatRoutes } from "remix-flat-routes"
import { vitePlugin as remix, VitePluginConfig } from "@remix-run/dev"
import autoImport from "unplugin-auto-import/vite"
import { Options as AutoImportOptions } from "unplugin-auto-import/dist/types.d.ts"
import iconsResolver from "unplugin-icons/resolver"
import icons from "unplugin-icons/vite"
import { defineConfig } from "vite"
import { VitePWA, type VitePWAOptions } from "vite-plugin-pwa"
import topLevelAwait from "vite-plugin-top-level-await"
import wasm from "vite-plugin-wasm"
import tsconfigPaths from "vite-tsconfig-paths"

const remixOptions: VitePluginConfig = {
  // SPA mode https://remix.run/docs/en/main/future/spa-mode
  ssr: false,

  // see https://github.com/kiliman/remix-flat-routes
  ignoredRouteFiles: ["**/*"],
  routes: async defineRoutes =>
    flatRoutes("routes", defineRoutes, {
      // allow colocating route modules with their components
      ignoredRouteFiles: ["**/lib/*", "**/hooks/*", "**/context/*", "**/ui/*"],
    }),
}

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

// This is an experiment with auto-imports. Not totally sure how I feel about it yet - it's a bit magical.
// see https://github.com/unplugin/unplugin-auto-import
const autoImportOptions: AutoImportOptions = {
  imports: [
    "react",
    {
      react: ["Fragment", "createContext"],
      classnames: [["default", "cx"]],
      "@localfirst/auth": [["*", "Auth"]],
      "@automerge/automerge-repo": ["Repo"],
      "@remix-run/react": [
        "useParams",
        "useNavigate",
        "useLocation",
        "Outlet",
        "Link",
        "NavLink",
        "redirect",
      ],
      "@localfirst/auth-provider-automerge-repo": ["AuthProvider", "getShareId"],
      "@headlessui/react": [["*", "Headless"]],
    },
    {
      from: "@localfirst/auth",
      imports: ["Team", "User", "Device", "Base58", "UserWithSecrets", "DeviceWithSecrets"],
      type: true,
    },
    {
      from: "@automerge/automerge-repo",
      imports: ["DocumentId", "PeerId", "AutomergeUrl"],
      type: true,
    },
    { from: "@localfirst/auth-provider-automerge-repo", imports: ["ShareId"], type: true },
  ],
  dts: "./app/types/auto-imports.d.ts",
  resolvers: [
    iconsResolver({
      prefix: false,
      extension: "jsx",
      enabledCollections: ["tabler"],
      alias: { icon: "tabler" },
    }),
  ],
}

// Don't load remix plugin when vite is being used by storybook
// https://github.com/remix-run/remix/issues/7953#issuecomment-1805649822
const isStorybook = process.argv[1].includes("/node_modules/storybook")

export default defineConfig({
  plugins: [
    !isStorybook && remix(remixOptions),
    tsconfigPaths(),
    wasm(),
    topLevelAwait(),
    VitePWA(pwaOptions),
    autoImport(autoImportOptions),
    icons({ compiler: "jsx", jsx: "react" }),
  ],
  worker: { format: "es", plugins: () => [wasm(), topLevelAwait()] },

  optimizeDeps: {
    // without this `vite dev` includes two separate versions of the Automerge JS wrapper
    exclude: ["@automerge/automerge-wasm/bundler/bindgen_bg.wasm", "@syntect/wasm"],
  },

  server: {
    fs: {
      strict: false,
    },
  },
})
