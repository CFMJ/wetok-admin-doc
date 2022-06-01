# git 规范

git 规范

## git 提交规范

### commit 格式

```
<type>[optional scope][breaking change add !]: <description>

[optional body]

[optional footer(s)]

<类型>[可选 范围][破坏性更新加上 !]: <描述>

[可选 正文]

[可选 脚注]
```

::: tip 示例

```bash
<type>(scope?): <subject>

fix(user center): fix a bug
```

:::

### commit type 参考

git 规范参考下表

|   类型   |                    描述                    |
| :------: | :----------------------------------------: |
|   feat   |                  新增特性                  |
|   fix    |                  bug 修复                  |
|   docs   |             文档/注释相关修改              |
|  style   | 仅仅修改了代码格式,如格式缩进/添加分号等等 |
| refactor |                  代码重构                  |
|  chore   |     杂项,如依赖更新/脚手架配置修改等等     |
|   mod    |              不确定分类的更改              |
|   perf   |         优化相关,比如提升性能/体验         |
|  revert  |                  代码回滚                  |
|  types   |                  类型修改                  |
|   wip    |                   开发中                   |

### git 常见问题解决方法

常见 git 冲突与解决方法

#### 与远程仓库冲突

![git流程](https://www.runoob.com/wp-content/uploads/2015/03/271314500648180.png)

```shell
# 1.把远程仓库master分支下载到本地并存为tmp分支
git fetch origin master:tmp
# 2、查看tmp分支与本地原有分支的不同
git diff tmp
# 3.将tmp分支和本地的master分支合并
git merge tmp
# 4.删除临时的tmp分支
git branch -d tmp
```

#### git 撤销/回退操作

工作区 -- add --> 暂存区 -- commit --> 本地仓库 -- push --> 远程仓库

- 工作区撤销(未添加到暂存区)

本地的修改，没有操作 git 命令，我们可以通过 `git diff` 来查看修改的内容
如果我们可能只是写了一些测试代码，想取消这些修改，可以通过下面命令撤销

```shell
# 全部文件撤销
git checkout -- .
# 单个文件撤销
git checkout -- [filename]
```

- 暂存区撤销(撤销 add)

本地写完代码之后，我们会通过 `git add` 添加到暂存区，此时我们想看文件的修改 `git diff` 不会输出任何东西。想查看暂存区的修改，可以执行下面命令:

```shell
# 全部文件撤销 即git add .后撤销
git reset .
# 单个文件撤销
git reset [filename]
```

- 提交到本地仓库撤销(撤销 commit)

```shell
# 提交本地仓库
git commit -m "feat: new feat"
# 查看一下操作记录 找到上次commit的记录
git log
# 找到记录的hash值
git checkout <找到记录的hash值>
# 或者
git reset --hard HEAD~1
# 如果不是想撤销最新一次的commi,想撤回之前某次的commit
git revert <找到记录的hash值>
```

- 修改 commit 的 message

```shell
# 直接键入 `:i` 或者单击 `ins` 键
# 修改完成后，按下 `Esc ` 键退出编辑模式,在键入 `:wq` 回车退出并保存修改
git commit --amend
```

或者

```shell
git commit --amend -m "修改后的msg"
```

> `--amend` 操作会改变你原来的 commit id

- 撤销 merge

```shell
# 如果git merge 分支之后有冲突，想先撤回这次merge
git merge --abort
```

## git 规范工具

使用 `husky + commitlint` 规范 commit 提交的信息

- [husky](https://github.com/typicode/husky#readme)：为 git 提供生命周期 hook，如我们可以在提交代码前做一些校验工作
- [lint-staged] 能够让 lint 只检测暂存区的文件
- [commitlint](https://commitlint.js.org/#/): commit 信息校验工具

### husky

让我们在不同的阶段,对代码进行不同的操作,控制提交到仓库的代码的规范性,

- 常用的 git 生命周期
  - pre-commit 描述: 通过钩子函数,判断提交的代码是否符合规范
  - commit-msg 描述: 通过钩子函数,判断 commit 信息是否符合规范
  - pre-push 描述: 通过钩子,执行测试,避免对以前的内容造成影响

1. 安装 husky

```bash
npm install husky --save-dev
```

2. 配置

package.json 配置 prepare 命令

prepare 脚本会在执行 npm install 之后自动执行。也就是说当我们执行 npm install 安装完项目依赖后会执行 husky install 命令。

```json
"scripts": {
      "prepare": "husky install"
  }
```

```bash
# 初始化husky,将 git hooks 钩子交由,husky执行
npm run prepare
```

3. 添加 git hooks

创建一条 pre-commit hook

```bash
npx husky add .husky/pre-commit "npm run lint"
```

执行该命令后，会看到.husky/目录下新增了一个名为 pre-commit 的 shell 脚本。

这样，在之后执行 git commit 命令时会先触发 pre-commit 这个脚本。

pre-commit 脚本内容如下：

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
# 注意：npm run lint 命令根据你自己项目中script脚本而定，eslint --ext .js,.vue src在lint脚本中
npm run lint
```

::: tip
如果 husky 不生效,删除.git 文件夹下 hooks 文件夹即可
:::

4. 规范 commit message 信息

类似的，我们也可以添加 commit-msg 钩子，来规范我们的 commit message 信息

```shell
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

### lint-staged

使用 husky 配置 git hooks，在 git commit 前执行 eslint，好像已经很好的解决了代码的检测需求。

实际使用过程中遇到了以下两个问题：

1. 如果在历史代码库检测,可能出现几百几千的报错,将会难以更改

2. 全量检测整个项目，随着代码量的增加,将会非常耗时

全量检测整个仓库，可能不是一个最现实、最高效的方法。因此我们期望每次提交只检查本次提交所修改的文件就够了
使用 lint-staged 能够让 eslint 只检测暂存区的文件

1. 安装

```bash
npm i lint-staged -D
```

2. 配置

根目录下创建 `.lintstagedrc` 文件,并写入

```json
{
  "src/**/*.{js,jsx,ts,tsx,md,html}": ["eslint --fix", "prettier --write"],
  // 如果配置了stylelint
  "src/**/*.{html,vue,css,scss,sass,less}": ["stylelint --fix"]
}
```

或者

创建 `lint-staged.config.js` 文件,并写入

```js
'use strict'
module.exports = {
  'src/**/*.{js,ts,vue}': ['eslint --fix'],
}
```

::: tip
如果需要 prettier 格式化代码,可以在规则中加入 `prettier --write`

```json
{
  "src/**/*.{js,jsx,ts,tsx,md,html}": ["eslint --fix", "prettier --write"],
  // 如果配置了stylelint
  "src/**/*.{html,vue,css,scss,sass,less}": ["prettier --write"]
}
```

:::

在 husky 中添加 pre-commit 钩子,可以在命令行运行

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

或者手动在 `.husky/pre-commit` 文件里添加 `npx lint-staged`.

3. 使用

执行 `git add .` 然后 `git commit` 的时候，就会触发 lint-stage,通过 eslint 来执行本次提交所修改的文件,如果检测不通过(以非 0 退出时),就会中断此次提交.

### commitlint

commit 信息校验工具

1. 安装与使用

```bash
# 安装
npm i @commitlint/cli @commitlint/config-conventional -D
# 配置 commitlint.config.js
echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js
```

- `@commitlint/cli` 是 commitlint 提供的命令行工具，安装后会将 cli 脚本放置在./node_modules/.bin/目录下

- `@commitlint/config-conventional` 是社区中一些共享的配置，我们可以扩展这些配置，也可以不安装这个包自定义配置

::: warning
使用 commitlint 时报错：commitlint.config.js:1 SyntaxError: Invalid or unexpected token

原因: 如果是用 powershell 里执行 `echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js` ,生成的 `commitlint.config.js` 文件是 utf-16le 格式的，将文件转成 utf8 格式的就没问题了

解法: 手动创建 `commitlint.config.js` 文件然后把 `module.exports = {extends: ['@commitlint/config-conventional']};`粘贴进去
:::

2. 可配置的 rules

::: details 展开查看 commitlint.config.js 可配置的 rules

规则由名称和配置数组组成,配置数组包含:

- **Level** `[0..2]`: `0` 禁用这条规则. `1` 将被视为警告 `2` 为错误.
- **Applicable** `always|never`: `never` 反转规则.
- **Value**: 用于此规则的值.

规则配置可以是规则 `object` 上以规则名称为键名的 `array` 类型,也可以是函数返回的 `array` 类型或者 `Promise<array>`. 这表示支持以下所有示例.

**普通数组**

```
  "rules": {
    "header-max-length": [0, "always", 72],
  }
```

**函数返回数组类型**

```
  "rules": {
    "header-max-length": () => [0, "always", 72],
  }
```

**异步函数返回数组类型**

```
  "rules": {
    "header-max-length": async () => [0, "always", 72],
  }
```

**函数返回一个 resolve 数组的 Promise**

```
  "rules": {
    "header-max-length": () => Promise.resolve([0, "always", 72]),
  }
```

#### 可用规则

---

#### body-full-stop

- **condition**: `body` ends with `value`
- **rule**: `never`
- **value**

```
'.'
```

#### body-leading-blank

- **condition**: `body` begins with blank line
- **rule**: `always`

#### body-empty

- **condition**: `body` is empty
- **rule**: `never`

#### body-max-length

- **condition**: `body` has `value` or less characters
- **rule**: `always`
- **value**

```
Infinity
```

#### body-max-line-length

- **condition**: `body` lines has `value` or less characters
- **rule**: `always`
- **value**

```
Infinity
```

#### body-min-length

- **condition**: `body` has `value` or more characters
- **rule**: `always`
- **value**

```
0
```

#### body-case

- **condition**: `body` is in case `value`
- **rule**: `always`
- **value**

```
'lower-case'
```

- **possible values**

```
[
  'lower-case', // default
  'upper-case', // UPPERCASE
  'camel-case', // camelCase
  'kebab-case', // kebab-case
  'pascal-case', // PascalCase
  'sentence-case', // Sentence case
  'snake-case', // snake_case
  'start-case' // Start Case
]
```

#### footer-leading-blank

- **condition**: `footer` begins with blank line
- **rule**: `always`

#### footer-empty

- **condition**: `footer` is empty
- **rule**: `never`

#### footer-max-length

- **condition**: `footer` has `value` or less characters
- **rule**: `always`
- **value**

```
Infinity
```

#### footer-max-line-length

- **condition**: `footer` lines has `value` or less characters
- **rule**: `always`
- **value**

```
Infinity
```

#### footer-min-length

- **condition**: `footer` has `value` or more characters
- **rule**: `always`
- **value**

```
0
```

#### header-case

- **condition**: `header` is in case `value`
- **rule**: `always`
- **value**

```
'lower-case'
```

- **possible values**

```
[
  'lower-case', // default
  'upper-case', // UPPERCASE
  'camel-case', // camelCase
  'kebab-case', // kebab-case
  'pascal-case', // PascalCase
  'sentence-case', // Sentence case
  'snake-case', // snake_case
  'start-case' // Start Case
]
```

#### header-full-stop

- **condition**: `header` ends with `value`
- **rule**: `never`
- **value**

```
'.'
```

#### header-max-length

- **condition**: `header` has `value` or less characters
- **rule**: `always`
- **value**

```
72
```

#### header-min-length

- **condition**: `header` has `value` or more characters
- **rule**: `always`
- **value**

```
0
```

#### references-empty

- **condition**: `references` has at least one entry
- **rule**: `never`

#### scope-enum

- **condition**: `scope` is found in value
- **rule**: `always`
- **value**
  ```
  []
  ```

#### scope-case

- **condition**: `scope` is in case `value`
- **rule**: `always`
- **value**

```
'lower-case'
```

- **possible values**

```
[
  'lower-case', // default
  'upper-case', // UPPERCASE
  'camel-case', // camelCase
  'kebab-case', // kebab-case
  'pascal-case', // PascalCase
  'sentence-case', // Sentence case
  'snake-case', // snake_case
  'start-case' // Start Case
]
```

#### scope-empty

- **condition**: `scope` is empty
- **rule**: `never`

#### scope-max-length

- **condition**: `scope` has `value` or less characters
- **rule**: `always`
- **value**

```
Infinity
```

#### scope-min-length

- **condition**: `scope` has `value` or more characters
- **rule**: `always`
- **value**

```
0
```

#### subject-case

- **condition**: `subject` is in one of the cases `['sentence-case', 'start-case', 'pascal-case', 'upper-case']`
- **rule**: `always`
- **value**

```
['sentence-case', 'start-case', 'pascal-case', 'upper-case']
```

- **possible values**

```
[
  'lower-case', // default
  'upper-case', // UPPERCASE
  'camel-case', // camelCase
  'kebab-case', // kebab-case
  'pascal-case', // PascalCase
  'sentence-case', // Sentence case
  'snake-case', // snake_case
  'start-case' // Start Case
]
```

#### subject-empty

- **condition**: `subject` is empty
- **rule**: `never`

#### subject-full-stop

- **condition**: `subject` ends with `value`
- **rule**: `never`
- **value**

```
'.'
```

#### subject-max-length

- **condition**: `subject` has `value` or less characters
- **rule**: `always`
- **value**

```
Infinity
```

#### subject-min-length

- **condition**: `subject` has `value` or more characters
- **rule**: `always`
- **value**

```
0
```

#### subject-exclamation-mark

- **condition**: `subject` has exclamation before the `:` marker
- **rule**: `never`

#### type-enum

- **condition**: `type` is found in value
- **rule**: `always`
- **value**
  ```
  ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'revert']
  ```

#### type-case

- **description**: `type` is in case `value`
- **rule**: `always`
- **value**
  ```
  'lower-case'
  ```
- **possible values**

```
[
  'lower-case', // default
  'upper-case', // UPPERCASE
  'camel-case', // camelCase
  'kebab-case', // kebab-case
  'pascal-case', // PascalCase
  'sentence-case', // Sentence case
  'snake-case', // snake_case
  'start-case' // Start Case
];
```

#### type-empty

- **condition**: `type` is empty
- **rule**: `never`

#### type-max-length

- **condition**: `type` has `value` or less characters
- **rule**: `always`
- **value**

```
Infinity
```

#### type-min-length

- **condition**: `type` has `value` or more characters
- **rule**: `always`
- **value**

```
0
```

#### signed-off-by

- **condition**: `message` has `value`
- **rule**: `always`
- **value**

```
'Signed-off-by:'
```

#### trailer-exists

- **condition**: `message` has trailer `value`
- **rule**: `always`
- **value**

```
'Signed-off-by:'
```

:::
