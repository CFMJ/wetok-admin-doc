# 文档相关

本文档基于 `vitepress` 构建.

- [vitepress 官方文档](https://vitepress.vuejs.org/)

## 文档自动部署

介绍 doc 配置 GitHub Pages 和 GitHub Actions 自动化部署,GitLab Pages 和 GitLab CI 自动化部署.

### GitHub Pages and GitHub Actions

<!-- - 设置 Deploy Key 以及 Secrets

自动部署需要将构建后的代码推送到代码仓库,所以需要 Git 的秘钥

```shell
ssh-keygen -t rsa -C '邮箱地址'
```

生成的密钥存放在`C:\Users\<用户名>\.ssh`, `id_rsa` 为私钥,`id_rsa.pub`为公钥.
生成后，打开 Git 项目的设置 `Settings`，选择 `Deploy keys` 点击 `Add deploy key` 新建 deploy key，将公钥的内容填入:

> 此处应有图片

再选择 `Secrets` 选项下的 `Actions`，新建私钥，将私钥内容填入:

> 此处应有图片-->

- 创建 Actions Secrets

创建一个 `personal access token`,参考 [github token](https://github.blog/changelog/2021-07-26-expiration-options-for-personal-access-tokens/).

![New personal access token](https://github.com/cfmj/doc-images/blob/main/images/github-pages/token-create.gif?raw=true)

生成后，打开 Git 项目的设置 `Settings`，选择 `Secrets` 选项下的 `Actions` 新建 Actions secrets，将生成的 token 内容填入:

![create-actions-secrets](https://github.com/cfmj/doc-images/blob/main/images/github-pages/create-actions-secrets.png?raw=true)

- 新建 Action

  关于部署 pages 的配置方法,参考 vitepress 官网 [github-pages](https://vitepress.vuejs.org/guide/deploy.html#github-pages).

1. 在 doc 代码的 `docs/.vitepress/config.js` 中设置正确的 `base` 选项。

   如果你准备发布到 `https://<USERNAME>.github.io/` ，你可以省略这一步，因为 `base` 默认就是 `"/"` 。

   如果你准备发布到 `https://<USERNAME>.github.io/<REPO>/` ，也就是说你的仓库地址是 `https://github.com/<USERNAME>/<REPO>` ，则将 `base` 设置为 `"/<REPO>/"`。

2. 在项目根目录下的 `.github/workflows` 目录（没有的话，请手动创建一个）下创建一个 `.yml` 或者 `.yaml` 文件，如: `vuepress-deploy.yml` ,参考[vuepress](https://v2.vuepress.vuejs.org/zh/guide/deployment.html#github-pages) 和 [GitHub Actions](https://github.com/features/actions).

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
          # 打包目录,默认目录为docs/.vitepress/dist
          build_dir: docs/.vitepress/dist
        env:
          # @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret

          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

> `secrets.GITHUB_TOKEN` 是 上一步创建的 `Actions Secrets` 密钥.

每当 `git push`成功时,Github Actions 会自动执行脚本,自动打包部署最新的代码,发布到你的 Github Page 上.

可以在 `Settings`的`Pages`选项中,查看文档链接地址.

### GitLab Pages and GitLab CI

1. 在 `docs/.vuepress/config.js` 中设置正确的 `base`。

如果你打算发布到 `https://<USERNAME or GROUP>.gitlab.io/`，则可以省略这一步，因为 `base` 默认即是 `"/"`。

如果你打算发布到 `https://<USERNAME or GROUP>.gitlab.io/<REPO>/`（也就是说你的仓库在 `https://gitlab.com/<USERNAME>/<REPO>`），则将 `base` 设置为 `"/<REPO>/"`。

2. 在 `.vuepress/config.js `中将 `dest` 设置为 `public`。

3. 在你项目的根目录下创建一个名为 `.gitlab-ci.yml` 的文件，无论何时你提交了更改，它都会帮助你自动构建和部署：

```yml
image: node:16.5.0
pages:
  stage: deploy
  cache:
    paths:
      - node_modules/
  script:
    - yarn install # npm install
    - yarn docs:build # npm run docs:build
  artifacts:
    paths:
      - public
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
```

参考 [vitepress gitlab-pages](https://vitepress.vuejs.org/guide/deploy.html#gitlab-pages-and-gitlab-ci) ,同样每当 `git push`成功时,GitLab CI 会自动执行脚本,自动打包部署最新的代码,发布到你的 GitLab Page 上.

可以在 `Settings`的`Pages`选项中,查看文档链接地址.
