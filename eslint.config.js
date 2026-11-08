// Плоский конфіг ESLint. У проєкті його не було: скрипт `lint` існував, а сам ESLint — ні.
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // essential — лише правила, що ловлять помилки. Оформлення (recommended) не вмикаємо:
  // інакше довелося б переформатувати весь чужий код заради 110 попереджень про відступи.
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  {
    languageOptions: { globals: { ...globals.browser } },
    rules: {
      // Login, Register, Welcome, Wishlists — сторінки маршрутизатора, а не компоненти в розмітці:
      // правило захищає від збігу з HTML-тегами, а такого збігу тут немає.
      'vue/multi-word-component-names': 'off',
    },
  },
)
