import { defineConfig } from 'vite'
// import styleImport from "vite-plugin-style-import";
export default defineConfig({
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  ssr: {
    // 解决：SyntaxError: Cannot use import statement outside a module
    // https://github.com/vuejs/vitepress/issues/476
    noExternal: ['element-plus/lib/locale/lang/zh-cn'],
  },
})
