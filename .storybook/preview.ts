import type { Preview } from "@storybook/react"
import "../app/index.css"
import "@ibm/plex/css/ibm-plex.css"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
