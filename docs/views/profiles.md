---
# sidebar: auto
---

# 简介

项目使用了 vite + ts + vue3 技术

::: tip tips
pnpm `>=7.0.0` node`>=16.15.0`
:::

## 技术栈

项目所用到的技术栈

- [Vue3](https://v3.cn.vuejs.org/guide/introduction.html) ([从 v2 迁移](https://v3.cn.vuejs.org/guide/migration/introduction.html#%E6%A6%82%E8%A7%88))
- [Vue Router 4.x](https://router.vuejs.org/zh/)
- [Pinia](https://pinia.vuejs.org/)
- [Element Plus](https://element-plus.gitee.io/zh-CN/component/button)
- [Vite](https://vitejs.cn/)

::: warning Attention
vue3 不在支持 IE 浏览器 Modern browsers and Internet Explorer 11+.
:::

## 开发环境

- [Git](https://git-scm.com/)
- [Nodej.s](https://nodejs.org/zh-cn/)
- [pnpm](https://pnpm.io/zh/)
- [Visual Studio Code](https://code.visualstudio.com/)

::: warning 注意
Node.js 版本建议为 16.15.0

为保证代码风格一致，统一使用 Visual Studio Code 做为开发 IDE.
:::

在 VS Code 里安装好以下扩展：

- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=vue.volar)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

配置 Prettier 为编辑器默认格式化程序

![默认格式化程序](https://github.com/cfmj/doc-images/blob/main/images/default-format.png?raw=true)

再 VS Code 设置中配置保存时格式化文件

![格式化文件](https://github.com/cfmj/doc-images/blob/main/images/format.png?raw=true)

## 安装

```bash
# pnpm address https://pnpm.io/zh/motivation
# 安装依赖(建议用pnpm)
# 你可以使用 "npm -g i pnpm" 去安装pnpm
pnpm i
# 启动服务
pnpm run dev
```

或

```bash
yarn install
# 启动服务
yarn dev
```

<!-- ## 使用

```json
  "scripts": {
    "dev": "vite --mode dev --host",
    "fat": "vite --mode fat --host",
    "prod": "vite --mode prod --host",
    "build:fat": "vite build --mode fat",
    "build": "vite build --mode prod",
    "preview": "npm run build && vite preview ",
    "lint": "eslint --ext .js,.jsx,.vue,.ts,.tsx src --fix",
    "prepare": "husky install",
    "tsc-check": "tsc",
    "test:unit": "jest"
  },
``` -->
