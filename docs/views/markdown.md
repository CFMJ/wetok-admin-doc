---
# sidebar: auto
---

# markdown

这里提供一些常用的 markdown/vp 拓展的 markdown 语法,用来快速编写想要的文档页面

## 语法示例

### 排序和加粗

排序和加粗

#### 语法

```
# - 为无序列表
# ** 为加粗 **
- 打包大小减少 41%
- **使用 Proxy 代替 defineProperty 实现数据响应式**
- **重写虚拟 DOM 的实现和 Tree-Shaking**
```

#### 效果

- 打包大小减少 41%
- **使用 Proxy 代替 defineProperty 实现数据响应式**
- **重写虚拟 DOM 的实现和 Tree-Shaking**

### 表格

表格

#### 语法

```
| WeChart| AliPay |
| :-: | :-: |
| WeChart | AliPay |
```

#### 效果

| WeChart | AliPay |
| :-----: | :----: |
| WeChart | AliPay |

### 自定义容器

自定义容器

#### 语法

```
::: tip 阅读提示
阅读提示
:::
::: warning 阅读提示
阅读提示
:::
::: danger 阅读提示
阅读提示
:::
::: details 阅读提示
这是一个详情块，在 IE / Edge 中不生效
:::
```

#### 效果

::: tip 阅读提示
阅读提示
:::
::: warning 阅读提示
阅读提示
:::
::: danger 阅读提示
阅读提示
:::
::: details 阅读提示
这是一个详情块，在 IE / Edge 中不生效
:::

### 代码块

代码块

#### 语法

````
# 代码块
```js
console.log('你好,世界!')
```
# 行内代码块
::: v-pre
someting...
:::
`带有灰色背景`
````

#### 效果

```js
console.log('你好,世界!')
```

`带有灰色背景`

### 备注

备注

#### 语法

```
> 备注
```

#### 效果

> 备注

### 链接

链接

#### 语法

```
[百度](https://baidu.com)
![图片链接](https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png)
```

#### 效果

[百度](https://baidu.com)

![图片链接](https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png)

### 内部链接

网站内部的链接，将会被转换成`<router-link>`用于 SPA 导航。同时，站内的每一个文件夹下的 `README.md` 或者 `index.md` 文件都会被自动编译为 `index.html`，对应的链接将被视为`/`。

以如下的文件结构为例：

#### 语法

```
.
├─ README.md
├─ foo
│  ├─ README.md
│  ├─ one.md
│  └─ two.md
└─ bar
   ├─ README.md
   ├─ three.md
   └─ four.md
```

假设你现在在 foo/one.md 中：

```markdown
<!--
页面内跳转 #代码块
[Home](/) <!-- 跳转到根部的 README.md -->

[foo](/foo/) <!-- 跳转到 foo 文件夹的 index.html -->
[foo heading](./#heading) <!-- 跳转到 foo/index.html 的特定标题位置 -->
[bar - three](../bar/three.md) <!-- 具体文件可以使用 .md 结尾（推荐） -->
[bar - four](../bar/four.html) <!-- 也可以用 .html -->
-->

# 示例

[跳转到代码块](#代码块)
```

#### 效果

[跳转到代码块](#代码块)
