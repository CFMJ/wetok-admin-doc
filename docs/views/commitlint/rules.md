# Rules

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

### 可用规则

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
