/* 
    网站侧边导航栏选项，'/'代表默认匹配路径
    如不设置其他匹配默认所有页面按照'/'匹配下的侧边导航栏展示。
    text代表标题，children代表子集 
*/
const sidebar = [
  {
    text: '开始',
    children: [
      {
        text: '简介',
        link: '/views/profiles.html'
      },
      {
        text: '模板脚手架简介',
        link: '/getting/template_introduction.html'
      }
    ]
  },
  {
    text: '规范',
    link: '/views/specification.html'
  },
  {
    text: 'markdown',
    link: '/views/markdown.html'
  },
  {
    text: '相关链接',
    link: '/views/docs.html'
  },
]

export default sidebar