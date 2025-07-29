import ts from "typescript-eslint";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

// Note the `/flat` suffix here, the difference from default entry is that
// `/flat` added `name` property to the exported object to improve
// [config-inspector](https://eslint.org/blog/2024/04/eslint-config-inspector/) experience.
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const config = defineConfig([
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { ts },
    extends: ["ts/recommended"],
    languageOptions: { globals: globals.browser },
  },
  pluginReact.configs.flat.recommended,
]);

export default [
  ...config,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
];
