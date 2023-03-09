# day-011-eleven-20230220-@media媒体查询

## @media媒体查询

### 语法

在`媒体查询条件外面`写，`不管什么情况下`都会`生效`，只是`同优先级的媒体查询条件`下优先生效

```css
默认条件下生效的选择器 {
  样式名: 样式值;
}
@media 媒体类型 逻辑运算符1 (查询条件1) 逻辑运算符2 (查询条件2) {
  媒体查询条件下生效的选择器 {
    样式名: 样式值;
  }
}
```

### 示例

- 最小宽度`min-width`

    ```css
    div {
      width: 200px;
      height: 200px;
    }
    @media screen and (min-width: 1200px) {
      div{
        background-color: skyblue;
      }
    }
    ```

- 最大宽度`max-width`

    ```css
    div {
      width: 200px;
      height: 200px;
    }
    @media screen and (max-width:800px) {
      div{
        background-color: green;
      }
    }
    ```

- 中间区间宽度

    ```css
    div {
      width: 200px;
      height: 200px;
    }
    @media screen and (min-width:801px) and (max-width:1199px) {
      div{
        background-color: yellow;
      }
    }
    ```

- 在`查询条件语句外面`写的`css样式`，`不管什么尺寸`都会生效

    ```html
    <style>
    /* 媒体查询没定义到时默认的样式。 */
    div {
      width: 200px;
      height: 200px;
    }

    /* 屏幕最小宽度为1200px时的样式，即屏幕宽度大于等于1200px时生效的样式 */
    @media screen and (min-width: 1200px) {
      div {
        width: 300px;
        height: 300px;
        background-color: skyblue;
      }
    }

    /* `屏幕最小宽度为801px`并且`最大宽度为1199px`时的样式，即`屏幕宽度>=801px`并且`屏幕宽度<=1199px`时生效的样式 */
    @media screen and (min-width: 801px) and (max-width: 1199px) {
      div {
        background-color: yellow;
      }
    }

    /* `最大宽度为800px`时的样式，即`屏幕宽度<=800px`时生效的样式 */
    @media screen and (max-width: 800px) {
      div {
        background-color: green;
      }
    }
    </style>
    <div>1</div>
    ```

### 说明

- `写的样式`如果`什么尺寸`都有，那就放`查询条件语句外面`写
- `写的样式`如果`在某个尺寸`没有，就放在`查询条件语句`里面写

## 进阶参考

1. [@media - MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media)
2. [响应式布局之 @media 媒体查询](https://juejin.cn/post/7021398878461100040)
