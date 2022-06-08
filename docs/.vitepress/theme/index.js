// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
//  自定义css
import './custom.css'

//  element-plus
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css' // 暗黑模式
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus, { locale: zhCn })
  },
}
