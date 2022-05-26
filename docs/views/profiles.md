---
# sidebar: auto
---

# 简介

项目使用了 vite + ts + vue3 技术,之后将更新更加实用性的解决不同方向问题的脚手架搭配，

::: tip tips
pnpm `>=7.0.0` node`>=16.15.0`
:::

## 开始

```shell
# pnpm address https://pnpm.io/zh/motivation
# 安装依赖(建议用pnpm)
# 你可以使用 "npm -g i pnpm" 去安装pnpm
pnpm i
# 启动服务
pnpm run dev
```

## 使用

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
```

为了学习知识和快速接入脚手架集！🎉
