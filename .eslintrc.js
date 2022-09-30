module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended', // 使用推荐的eslint
    'plugin:vue/vue3-recommended', // 使用插件支持vue3
    'plugin:prettier/recommended',
    'eslint-config-prettier'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      jsx: true
    },
    requireConfigFile: false,
    parser: '@babel/eslint-parser'
  },
  // eslint-plugin-vue
  plugins: [
    'eslint-plugin-vue', // 引入vue的插件 vue <==> eslint-plugin-vue
    'eslint-plugin-prettier' // 引入规范插件  prettier <==>  eslint-plugin-prettier
  ],
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off',
    'spaced-comment': 'off',
    'vue/multi-word-component-names': 'off',
    'lines-between-class-members': 'off',
    'no-unused-vars': 'off',
    'vue/comment-directive': 'off'
  }
}
