const OFF = 0
const WARN = 1
const ERROR = 2
const NEVER = "never"
const ALWAYS = "always"

module.exports = {
  extends: ["plugin:storybook/recommended"],
  plugins: ["unused-imports"],

  // use existing prettier config
  prettier: true,

  // not bothering with config files & scripts for now
  ignore: ["*.cjs", "*.js"],

  rules: {
    // ADDED RULES

    "unused-imports/no-unused-imports": ERROR,
    "unused-imports/no-unused-vars": [
      ERROR,
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],

    // DISABLED RULES

    "@typescript-eslint/no-empty-function": OFF, // don't see the problem
    "capitalized-comments": OFF, // case in point this comment
    "n/file-extension-in-import": OFF, // duplicate of import/extensions
    "unicorn/no-array-reduce": OFF, // sometimes I like to reduce
    "unicorn/prevent-abbreviations": OFF, // gets mad about "numLikes" etc.
    "n/prefer-global/process": OFF, // not helpful for browser code

    // MODIFIED RULES

    // default makes us wrap every arrow function shorthand expression with braces,
    // which spreads a single line out to 3 lines
    "@typescript-eslint/no-confusing-void-expression": [WARN, { ignoreArrowShorthand: true }],

    // default is camelCase only. We want PascalCase for React components, and UPPER_CASE for constants.
    "@typescript-eslint/naming-convention": [
      ERROR,
      {
        selector: "variable",
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
        leadingUnderscore: "allow",
      },
    ],

    // default is to always require extensions in imports. We don't want them for .js imports,
    // but we do for everything else
    "import/extensions": [ERROR, NEVER, { ".json": ALWAYS, ".css": ALWAYS }],

    // default is kebabCase
    "unicorn/filename-case": [ERROR, { cases: { camelCase: true, pascalCase: true } }],
  },

  overrides: [],
}
