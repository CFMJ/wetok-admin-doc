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
fix(user center): fix a bug
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

- husky：为 git 提供生命周期 hook，如我们可以在提交代码前做一些校验工作
- commitlint: commit 信息校验工具

### husky

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

```shell
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
# 注意：npm run lint 命令根据你自己项目中script脚本而定，eslint --ext .js,.vue src在lint脚本中
npm run lint
```

4. 规范 commit message 信息

类似的，我们也可以添加 commit-msg 钩子，来规范我们的 commit message 信息

```shell
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```
