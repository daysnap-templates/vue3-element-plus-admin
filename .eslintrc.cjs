module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
    "vue/setup-compiler-macros": true
  },
  globals: {
    // defineProps: 'readonly',
    // defineEmits: 'readonly',
    // defineExpose: 'readonly',
    // withDefaults: 'readonly'
  },
  "extends": [
    "eslint:recommended",
    // "plugin:vue/vue3-essential",
    'plugin:vue/vue3-recommended',
    "plugin:@typescript-eslint/recommended",
    'plugin:prettier/recommended',
  ],
  "overrides": [
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": {
      "modules": true,
      'jsx': true
    },
    "requireConfigFile": false,
  },
  "plugins": [
    "vue",
    "@typescript-eslint"
  ],
  "rules": {
  }
}
