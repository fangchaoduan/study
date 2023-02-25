# day-013-thirteen-常见布局-横向格式化-`BFC块级格式化上下文`-省略号-粘性定位

## 布局总结

- 水平居中
  - 非块元素水平居中
    1. 对父元素设置`text-align:center;`

        ```html
        <div class="行内非块元素水平居中">
          行内文本居中<br/>
          <img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" style="height:65px;background-color: pink;" ><br/>
          <span style="background-color: blue;">行内元素</span><br/>
          <div style="display: inline-block;width: 130px;height: 30px;background-color: gray;">行内块</div><br/>
        </div>
        ```

    2. 对父元素设置`display:flex;justify:center;`
  - 块级元素水平居中
    1. 对父元素设置`width`，对当前子级块元素设置具体且小于父元素内容区宽度的`width`与`margin: 0 auto;`。
    2. 对父元素设置`display:flex;justify:center;`
    3. 对父元素设置`position: relative;`，对子元素设置`--the-height:100px; width: var(--the-height); position: absolute;left: 50%; margin-left: calc(var(--the-height) / -2);`。
    4. 对父元素设置`position: relative;`，对子元素设置`position: absolute;left: 50%; transform: translateX(-50%);`。
- 垂直居中
  - 单行文本垂直居中
    - 对当前元素设置`line-height: calc(var(元素自身高度) + 0px);`，元素自身高度要大小当前元素的`font-size`。
  - 块元素垂直居中
    1. 父元素设置`display: flex;align-items: center;
    2. 父元素设置`position: relative;`，子元素设置`position: absolute;top: 50%;margin-top: calc(子元素自身高度 / -2);`
    3. 父元素设置`position: relative;`，子元素设置`position: absolute;top: 50%;transform: translateY(-50%);`
    4. 父元素设置`display: flex;align-items: center;`
- 两列布局 左列定宽，右列自适应

  1. 浮动与横向格式化属性margin-left。定宽子元素开启浮动 `float: left;`。自适应子元素设置外边距 `margin-left: 200px;`，自适应子元素默认会`width: auto;`。
  2. 浮动与BFC。定宽子元素开启浮动 `float: left;`。自适应子元素开启BFC `overflow: hidden;`，自适应子元素默认会`width: auto;`。
  3. flex布局。父元素开启flex布局 `display: flex;`。自适应子元素允许放大 `flex-grow: 1;`。
  4. 绝对或固定定位后，`上下方向为0`及`margin:auto 0`。
      - 定位后父元素height=`top` +`margin-top` +`border-top-width` +`padding-top`  +`height` +`padding-bottom` +`border-bottom-width` +`margin-bottom +bottom`
        - 四个方向设置为0，margin值为auto，会自动分配，就实现了垂直居中

## 横向格式化

因为一个块元素必定独自占据一行。

单个子元素的横向盒子属性必定等于父元素的内容区宽度。

即:
`父元素内容区宽度` = `子元素margin-left`+`子元素border-left-width`+`子元素padding-left`+`子元素width`+`子元素padding-right`+`子元素border-right-width`+`子元素margin-right`
其中:
`父元素内容区宽度`虽然也可以设置为`auto`，但可以理解为`父元素内容区宽度`在父级内容排列中早已被浏览器转化为具体的像素值了。

`子元素margin-left`可设置为`auto`，`子元素width`可设置为`auto`，`子元素margin-right`可设置为`auto`。

定:
`父元素内容区可调整宽度`
=`父元素内容区宽度`-`子元素border-left-width`-`子元素padding-left`-`子元素padding-right`-`子元素border-right-width`
=`子元素margin-left` + `子元素width` + `子元素margin-right`

1. 把margin-left和margin-right全部设为auto，width设置为具体值，这时候两个外边距的长度相等，具体表现就是元素在父元素中居中显示，也就是我们想要的水平居中效果。
2. margin-left margin-right width任意一个为auto，其他为具体值,设置auto的就  是父级容器剩余的宽度.
3. 把某一边的外边距和width设置为auto，此时设置为auto的外边距等于0，宽度根据等式计算。
4. 三个值都设置为auto,左右margin的值为0，但是还得满足那个等式，所以值为父元素的宽度。

一个auto都不设置，全部设置成具体值？这种情况在css里面被称作过约束，在这种情况下margin-right会被强制设置为auto。

可以理解为:

1. 如果`子元素width`设置了`auto`，那么`子元素width`就会占据`父元素内容区可调整宽度`。
2. 如果`子元素width`设置了`具体值`，那么`父元素内容区可调整宽度`就会让`值为auto的子元素margin-left`及`值为auto的子元素margin-right`平分。
3. 如果`子元素margin-left`与`子元素width`与`子元素margin-right`都设置了`具体值`。
    - 总体值都没超过`父元素内容区宽度`，那么`子元素margin-right`会被强制设置为`auto`，之后再重新分配宽度。
    - 总体值超过`父元素内容区宽度`，那么就按设置的来。

## BFC 块级格式化上下文 block formatting context

BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。

元素怎么开启BFC

- `float`的值不是`none`
- `display` 为 `inline-block`、`table-cells`、`flex`
- `overflow` 除了 `visible` 以外的值 (`hidden`、`auto`、`scroll`)

开启了BFC元素的特点

- 内部的Box 会在垂直方向，一个接一个的放置
- Box 垂直方向的距离由margin决定；同一个Box中的相邻Box的margin会发生重叠；
- 每个盒子（块盒与行盒）的左边距从左往右格式化，即使浮动也是如此。
- BFC的区域不会与浮动元素重叠。(两栏布局原理)
- 计算BFC元素的高度时，浮动元素也参与计算。(清除浮动原理)

## 省略号

- 单行文本省略号

    ```css
    .box {
      width: 100px;/* 0. 前提条件: 必须固定好元素的宽度 */
      height: 200px;

      white-space: nowrap;/* 1.先强制文本在一行显示，默认值是normal，自动换行，nowrap不换行 */
      overflow: hidden;/* 2.超出的部分隐藏 */
      text-overflow: ellipsis;/* 3.超出部分用省略号代替 */
    }
    ```

- 多行文本省略号

    ```css
    .box {
      width: 100px;
      height: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;/* 这个好像兼容性不太好 */
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    ```

## 粘性定位

元素根据正常文档流进行定位，然后相对它的最近滚动祖先（nearest scrolling ancestor）和 containing block（最近块级祖先 nearest block-level ancestor），包括 table-related 元素，基于 top、right、bottom 和 left 的值进行偏移。偏移值不会影响任何其他元素的位置。 该值总是创建一个新的层叠上下文（stacking context）。注意，一个 sticky 元素会“固定”在离它最近的一个拥有“滚动机制”的祖先上（当该祖先的 overflow 是 hidden、scroll、auto 或 overlay 时），即便这个祖先不是最近的真实可滚动祖先。

粘性定位可以被认为是相对定位和固定定位的混合。元素在跨越特定阈值前为相对定位，之后为固定定位。

- 粘性定位 以浏览器的窗口作为参照物，兼容性差 IE不支持

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>粘性定位</title>
  <style>
    body {
      height: 1500px;
    }
    .box {
      width: 800px;
      height: 90px;
      background-color: lavenderblush;
      margin: 0 auto;
      margin-top: 200px;

      position: sticky;
      top: 0; /* 四个方向的值必须写一个才会生效 */
    }
  </style>
</head>
<body>
  <div class="box">粘性定位 以浏览器的窗口作为参照物，兼容性差 IE不支持</div>
</body>
</html>
```

## 进阶参考

1. [10 分钟理解 BFC 原理](https://zhuanlan.zhihu.com/p/25321647)
2. [BFC特性及其简单应用](https://www.jianshu.com/p/11e764268c0d)
3. [面试官：BFC是啥 开发中有哪些应用](https://zhuanlan.zhihu.com/p/348791535)
4. [position-粘性定位](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)
