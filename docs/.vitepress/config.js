import { defineConfig } from 'vitepress'
import nav from './config/nav'
import sidebar from './config/sidebar'
export default defineConfig({
  base: '/wetok-admin-doc/', // 网站基本路径
  title: 'WeTok Admin 中文文档', // 网站的标题。这将是所有页面标题的后缀，并显示在导航栏中
  description: 'WeTok Admin 开发文档', // 首页的描述
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.png' }],
  ],
  outDir: '../public', // 指定 vitepress build 的输出目录 默认docs/.vitepress/dist
  // 这将在 HTML 页面中呈现为一个 <HTML lang="en-us"> 标记。
  locales: {
    // '/en/': {
    //   lang: 'en-US'
    // },
    '/': {
      lang: 'zh-CN'
    }
  },
  themeConfig: {
    logo: '/logo.png',
    /* repo
       文档项目对应的GitHub用户名/GitHub项目名 用于配置导航栏 GitHub 的跳转
       也是用来配置所有页面中底部导航 /editLinkText/ 的帮助我们编辑GitHub修改跳转功能的必须项 
       也可以改为其他git仓库,需输入完整地址
    */
    repo: 'http://gitlab.us168168.com/web_group/wetok-admin-doc',
    /* repoLabel
       用于配置导航栏 Git仓库 链接的名称，默认为 GitHub。
    */
    repoLabel: 'GitLab',
    /* 
    docsDir
    项目中放置文档文件夹的名称*/
    docsDir: 'docs',
    /* 
    docsBranch
    项目在GitHub仓库的分支，也是用来配置所有页面中底部导航的帮助我们编辑GitHub修改跳转功能的必须项 */
    docsBranch: 'master',
    /* 
    editLinks
    控制项目中给全局显示帮助我们编辑GitHub修改跳转功能,也可以在每个md文件头部各自设置editLink: true 来控制。*/
    editLinks: true,
    /* 
    帮助我们修改的文案，默认文案是Edit this page。 */
    editLinkText: '欢迎帮助我们改善页面!',
    /* 
    右下角显示最近更新时间文案，并控制显示。 */
    lastUpdated: '最近更新',
    // 启动页面丝滑滚动
    smoothScroll: true,
    search: true,
    searchMaxSuggestions: 10,
    locales: {
      '/': {
        label: '中文',
        selectText: '中文',
        nextLinks: true,
        /* 
          顶部右侧导航
          text为标题 link为地址，可以填写本地相对路径也可以填写链接 */
        nav: nav,
        sidebar: sidebar
      },
    }
  }
})
