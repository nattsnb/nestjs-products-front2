import globals from "globals";
import reactEslintPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import sonarjs from "eslint-plugin-sonarjs";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react: reactEslintPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      sonarjs,
    },
    rules: {
      ...reactEslintPlugin.configs.recommended.rules,
      ...sonarjs.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      "import/prefer-default-export": "off",
      "object-curly-newline": "off",
      "react/prop-types": "off",
      "no-param-reassign": [
        "error",
        { props: true, ignorePropertyModificationsFor: ["state"] },
      ],
      "react/react-in-jsx-scope": "off",
    },
  },
];
