# 规范

包括代码规范和 git 规范

## 代码规范

## git 规范

### git 格式参考

git 规范参考下表

|   类型   |                    描述                    |
| :------: | :----------------------------------------: |
|   feat   |                  新增特性                  |
|   fix    |                  bug 修复                  |
|   docs   |             文档/注释相关修改              |
|  style   | 仅仅修改了代码格式,如格式缩进/添加封号等等 |
| refactor |                  代码重构                  |
|  chore   |     杂项,如依赖更新/脚手架配置修改等等     |
|   mod    |                不确定的更改                |
|   perf   |         优化相关,比如提升性能/体验         |
|  revert  |                  代码回滚                  |
|  types   |                  类型修改                  |
|   wip    |                   开发中                   |

### git 格式

```
<type>[optional scope][breaking change add !]: <description>

[optional body]

[optional footer(s)]

<类型>[可选 范围][破坏性更新加上 !]: <描述>

[可选 正文]

[可选 脚注]
```

::: tip 示例
fix(use center): fix a bug
:::
