# 简介

这里介绍主要的目录结构

## 目录结构

```js
├── .husky                     // git hook相关
├── dist                       // 打包后目录
├── mock                       // 项目mock 模拟数据
├── public                     // 存放静态资源
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── hooks                  // hook相关
│   ├── icons                  // 项目所有 svg icons
│   ├── layout                 // 页面主布局
│   ├── router                 // 路由相关
│   ├── store                  // 全局 store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── views                  // 业务页面
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化等
│   ├── mockProdServer.js      // 生产环境
│   └── permission.js          // 权限管理
│   └── settings.js            // 全局静态页面配置（是否显示侧边栏等）
├── .editorconfig              // 编辑器属性配置
├── .env.prod                  // 开发/打包时正式环境配置（可通过--mode进行指定）
├── .env.dev                   // 开发时开发环境配置（可通过--mode进行指定）
├── .env.fat                   // 开发时测试环境配置（可通过--mode进行指定）
└── .eslintignore              // eslint 忽略项
└── .eslintrc.js               // eslint 配置
└── .gitignore                 // git 忽略项
└── .prettierrc                // pretty 配置
└──  index.html                // 打包时主入口文件
└──  tsconfig.json             // 使用ts语言开发时的配置。
└──  package.json              // package.json
└──  vite.config.js            // vite 配置
```
