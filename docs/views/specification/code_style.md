# 代码规范

这里介绍代码风格与流程规范

## 代码规范工具

### ESLint

```json
// package.json
//这里贴出架构中的packag.json复制进入你的依赖中,运行yarn
 "devDependencies": {
        "@vue/eslint-config-prettier": "^6.0.0",
        "@vue/eslint-config-typescript": "9.1.0",
        "eslint": "7.32.0",
        "eslint-plugin-import": "2.25.3",
        "eslint-plugin-prettier": "3.4.1",
        "eslint-plugin-vue": "7.20.0",
  }

```

配置 ESLint 配置文件 `.eslintrc.js`,参考 [ESLint Rules](https://eslint.bootcss.com/docs/rules/).

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  // 有时我们文件中有未定义，且使用了的变量，此时eslint校验就会报错，如defineExpose使用是不需要配置的
  // 此时defineExpose就要配置在这里
  globals: {
    defineEmits: true,
    document: true,
    localStorage: true,
    GLOBAL_VAR: true,
    window: true,
    defineProps: true,
    defineExpose: true,
    $ref: true,
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
    './.eslintrc-auto-import.json',
    './tests/.eslintrc-unit-test.json',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  rules: {
    //close lf error
    'import/no-unresolved': [0],
    'vue/multi-word-component-names': 'off',
    'vue/no-deprecated-router-link-tag-prop': 'off',
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
    'no-async-promise-executor': 'off',
    'import/no-extraneous-dependencies': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/html-self-closing': 'off',
    'no-console': 'off',
    'no-plusplus': 'off',
    'no-useless-escape': 'off',
    'no-bitwise': 'off',
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/ban-ts-comment': ['off'],
    'vue/no-setup-props-destructure': ['off'],
    '@typescript-eslint/no-empty-function': ['off'],
    'vue/script-setup-uses-vars': ['off'],
    //can config  to 2 if need more then required
    '@typescript-eslint/no-unused-vars': [0],
    'no-param-reassign': ['off'],
  },
}
```

在根目录下新增 `.eslintignore` 文件,表示 Eslint 检测时排除掉以下文件:

```
public
node_modules
.history
.husky
dist
*.d.ts
```

### Prettier

在 VS Code 中安装插件 [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) ,配置 Prettier 为编辑器默认格式化程序:

![默认格式化程序](https://github.com/cfmj/doc-images/blob/main/images/default-format.png?raw=true)

在 VS Code 设置中配置保存时格式化文件:

![格式化文件](https://github.com/cfmj/doc-images/blob/main/images/format.png?raw=true)

1. 安装依赖

```bash
npm i -D prettier eslint-plugin-prettier eslint-config-prettier prettier-eslint-cli
```

- prettier：prettier 插件的核心代码
- eslint-plugin-prettier：将 prettier 作为 ESLint 规范来使用
- eslint-config-prettier：解决 ESLint 中的样式规范和 prettier 中样式规范的冲突，以 prettier 的样式规范为准，使 ESLint 中的样式规范自动失效
- prettier-eslint-cli: 允许你对多个文件用 prettier-eslint 进行格式化。

2. 配置

在项目的根目录下创建 `.prettierrc.js` 或者 `.prettierrc` 文件并配置代码检查规则,下面以 `.prettierrc` 为例:

```json
// 常用的配置
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 120,
  "singleQuote": true,
  "trailingComma": "none",
  "bracketSpacing": true,
  "semi": false,
  "htmlWhitespaceSensitivity": "ignore"
}
```

::: details 配置详解:

参考 Prettier 官方配置文档: [Prettier Options](https://prettier.io/docs/en/options.html).

```json
{
  /*  prettier的配置 */
  "prettier.printWidth": 100, // 超过最大值换行
  "prettier.tabWidth": 4, // 缩进字节数
  "prettier.useTabs": false, // 缩进不使用tab，使用空格
  "prettier.semi": true, // 句尾添加分号
  "prettier.singleQuote": true, // 使用单引号代替双引号
  "prettier.proseWrap": "preserve", // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
  "prettier.arrowParens": "avoid", //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
  "prettier.bracketSpacing": true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  "prettier.disableLanguages": ["vue"], // 不格式化vue文件，vue文件的格式化单独设置
  "prettier.endOfLine": "auto", // 结尾是 \n \r \n\r auto
  "prettier.eslintIntegration": false, //是否让prettier使用eslint的代码格式进行校验
  "prettier.htmlWhitespaceSensitivity": "ignore",
  "prettier.ignorePath": ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
  "prettier.jsxBracketSameLine": false, // 在jsx中把'>' 是否单独放一行
  "prettier.jsxSingleQuote": false, // 在jsx中使用单引号代替双引号
  "prettier.parser": "babylon", // 格式化的解析器，默认是babylon
  "prettier.requireConfig": false, // Require a 'prettierconfig' to format prettier
  "prettier.stylelintIntegration": false, //不让prettier使用stylelint的代码格式进行校验
  "prettier.trailingComma": "es5", // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  "prettier.tslintIntegration": false // 不让prettier使用tslint的代码格式进行校验
}
```

:::

加上以下 eslint 的配置，以处理 prettier 和 eslint 的冲突。

```js
// .eslintrc.js
module.exports = {
  extends: [
    //继承 vue 的标准特性
    'plugin:vue/essential',
    'eslint:recommended',
    'prettier',
  ],
  // 其他配置不变
}
```

eslint 和 prettier 安装配置完之后，接下来配置 husky + lint-staged, 给 commit 操作添加前置钩子，实现 commit 提交代码前自动执行 代码检查 和 代码格式化 操作,详见 [husky](./git.html#husky) 和 [lint-staged](./git.html#lint-staged).
