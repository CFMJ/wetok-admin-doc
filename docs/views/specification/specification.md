# 规范

在团队多人开发中，规范的 commit message 可以快速定位代码提交历史，回溯问题根源，方便组内多人协作，提高团队效率。

目前前端主要使用到的规范技术有:

- [Eslint](https://cn.eslint.org/docs/user-guide/command-line-interface#options) 代码检查工具
- Prettier 代码风格工具
- [husky](https://github.com/typicode/husky#readme) 操作 git 钩子的工具
- lint-staged 能够让 lint 只检测暂存区的文件
- [commitlint](https://commitlint.js.org/#/) commit 校验工具
- commitizen 辅助提交工具

### husky

详情见 [husky](./git.html#husky)

### lint-staged

详情见 [lint-staged](./git.html#lint-staged)

### commitlint

详情见 [commitlint](./git.html#commitlint)

### commitizen

考虑后不使用 commitizen , commitizen 如果全局安装可以使用 `git cz` 命令代替 `git commit`,在当前项目安装则可以在 `pagkage.json` 添加脚本

```json
 "scripts": {
    "commit": "git-cz",
  }
```

然后使用 `npm run commit` 命令代替 `git commit`.

考虑 `git commit` 使用习惯,只要 git commit 钩子里做好 commitlint 效验,commitizen 不是必要的.
