import type { StorybookConfig } from "@storybook/react-vite"
import fs from "fs"
import path from "path"

export default {
  stories: getUiDirs().flatMap(dir => {
    return [
      `${dir}/stories/*.stories.@(js|jsx|mjs|ts|tsx)`, //
      `${dir}/stories/*.mdx`,
    ]
  }),
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "storybook-addon-react-router-v6",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
} satisfies StorybookConfig

function fullPath(dir: fs.Dirent) {
  return path.join(dir.path, dir.name)
}

// recurse through all folders  and return relative paths to all directories named "ui"
function getUiDirs(dir: string = path.join(__dirname, "../app")): string[] {
  const dirs = fs.readdirSync(dir, { withFileTypes: true }).filter(dirent => dirent.isDirectory())
  const uiDirs = dirs
    .filter(dir => dir.name === "ui")
    .map(dir => path.relative(__dirname, fullPath(dir)))
  const otherDirs = dirs.filter(dir => dir.name !== "ui")
  return uiDirs.concat(otherDirs.flatMap(subDir => getUiDirs(fullPath(subDir))))
}
