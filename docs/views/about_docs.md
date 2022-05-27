# 文档相关

文档相关

## 文档自动部署

### GitHub Pages and GitHub Actions

关于 pages 的配置方法,参考 vitepress 官网[github-pages](https://vitepress.vuejs.org/guide/deploy.html#github-pages)

- 设置 Deploy Key 以及 Secrets

自动部署需要将构建后的代码推送到代码仓库,所以需要 Git 的秘钥

```shell
ssh-keygen -t rsa -C '邮箱地址'
```

生成的密钥存放在`C:\Users\<用户名>\.ssh`, `id_rsa` 为私钥,`id_rsa.pub`为公钥.
生成后，打开 Git 项目的设置 `Settings`，选择 `Deploy keys` 点击 `Add deploy key` 新建 deploy key，将公钥的内容填入:

> 此处应有图片

再选择 `Secrets` 选项下的 `Actions`，新建私钥，将私钥内容填入:

> 此处应有图片

- 新建 Action

1. 设置正确的 `base` 选项。

   如果你准备发布到 `https://<USERNAME>.github.io/` ，你可以省略这一步，因为 `base` 默认就是 `"/"` 。

   如果你准备发布到 `https://<USERNAME>.github.io/<REPO>/` ，也就是说你的仓库地址是 `https://github.com/<USERNAME>/<REPO>` ，则将 `base` 设置为 `"/<REPO>/"`。

2. 选择你想要使用的 CI 工具。这里我们以 [GitHub Actions](https://github.com/features/actions) 为例。

   创建 `.github/workflows/docs.yml` 文件来配置工作流。
   这里参考 vuepress v2.00 的配置(https://v2.vuepress.vuejs.org/zh/guide/deployment.html#github-pages)

```yml
name: docs

on:
  # 每当 push 到 master 分支时触发部署
  push:
    branches: [master]
  # 手动触发部署
  workflow_dispatch:

jobs:
  docs:
    runs-on: ubuntu-latest
    # 执行的步骤
    steps:
      - uses: actions/checkout@v2
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          # 选择要使用的 node 版本
          node-version: '14'

      # 缓存 node_modules
      - name: Cache dependencies
        uses: actions/cache@v2
        id: yarn-cache
        with:
          path: |
            **/node_modules
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-

      # 如果缓存没有命中，安装依赖
      - name: Install dependencies
        if: steps.yarn-cache.outputs.cache-hit != 'true'
        run: yarn --frozen-lockfile

      # 运行构建脚本
      - name: Build VuePress site
        run: yarn docs:build

      # 查看 workflow 的文档来获取更多信息
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v2
        with:
          # 部署到 gh-pages 分支
          target_branch: gh-pages
          # 部署目录,默认输出目录为docs/.vitepress/dist
          build_dir: docs/.vuepress/dist
        env:
          # @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
