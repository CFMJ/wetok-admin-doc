import { defineConfig } from 'vitepress'
import nav from './config/nav'
import sidebar from './config/sidebar'
export default defineConfig({
  base: '/wetok-admin-doc/', // 网站基本路径
  title: 'WeTok Admin 中文文档', // 网站的标题。这将是所有页面标题的后缀，并显示在导航栏中
  titleTemplate: 'Constructed by vitepress',
  description: 'WeTok Admin 开发文档', // 首页的描述
  // appearance: true,
  lastUpdated: true,
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.png' }]],
  outDir: '../public', // 指定 vitepress build 的输出目录 默认docs/.vitepress/dist
  // 这将在 HTML 页面中呈现为一个 <HTML lang="en-us"> 标记。
  locales: {
    // '/en/': {
    //   lang: 'en-US'
    // },
    '/': {
      lang: 'zh-CN',
    },
  },
  themeConfig: {
    logo: '/logo.png',
    /* 
    docsDir 废弃
    项目中放置文档文件夹的名称*/
    //docsDir: 'docs',
    /* 
    docsBranch 废弃
    项目在GitHub仓库的分支，也是用来配置所有页面中底部导航的帮助我们编辑GitHub修改跳转功能的必须项 */
    // docsBranch: 'master',
    /* 
    editLink
    编辑链接可让您显示链接以编辑 Git 管理服务（例如 GitHub 或 GitLab）上的页面。*/
    editLink: {
      pattern: 'http://gitlab.us168168.com/web_group/wetok-admin-doc/',
      text: '欢迎帮助我们改善页面!(编辑页面有bug 等待vitepress更新)',
    },
    /* 
    右下角显示最近更新时间文案。 */
    lastUpdatedText: '最近更新',
    // 底部描述
    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © 2022-present cfmj',
    },
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      { icon: 'twitter', link: '...' },
      { icon: 'slack', link: '...' },
    ],
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
        sidebar: sidebar,
      },
    },
    algolia: {
      appId: '176Y9V7LED',
      apiKey: '925411d8d3d357516c0e3a3aa2c4f292',
      indexName: 'wetok-admin',
    },
  },
})
