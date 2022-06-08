// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
//  自定义css
import './custom.css'

//  element-plus
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'


export default {
  ...DefaultTheme,
  enhanceApp ({ app }) {
    app.use(ElementPlus, { locale: zhCn })
  },
}