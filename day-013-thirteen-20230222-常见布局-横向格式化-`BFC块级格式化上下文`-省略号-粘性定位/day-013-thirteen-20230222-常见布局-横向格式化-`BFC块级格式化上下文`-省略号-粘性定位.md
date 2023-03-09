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
    1. 父元素设置`display: flex;align-items: center;`
    2. 父元素设置`position: relative;`，子元素设置`position: absolute;top: 50%;margin-top: calc(子元素自身高度 / -2);`
    3. 父元素设置`position: relative;`，子元素设置`position: absolute;top: 50%;transform: translateY(-50%);`
    4. 父元素设置`display: flex;align-items: center;`
- 两列布局 `左列定宽，右列自适应`
  1. `浮动`与`横向格式化属性margin-left`。`定宽子元素`开启浮动 `float: left;`。`自适应子元素`设置外边距 `margin-left: 200px;`，`自适应子元素`默认会`width: auto;`。
  2. `浮动`与`BFC`。`定宽子元素`开启浮动 `float: left;`。`自适应子元素`开启BFC `overflow: hidden;`，`自适应子元素`默认会`width: auto;`。
  3. `flex布局`。`父元素`开启flex布局 `display: flex;`。`自适应子元素`允许放大 `flex-grow: 1;`。
  4. 父级设置`相对定位`，`自适应子元素`设置`绝对定位`或后，`上下右方向`为`0`，`右方向`为`定宽子元素`的宽，`margin:auto 0`。
      - 定位后`父元素height`=`top`+`margin-top`+`border-top-width`+`padding-top`+`height`+`padding-bottom`+`border-bottom-width`+`margin-bottom`+`bottom`
        - `四个方向`设置为`0`，`margin`值为`auto`，会`自动分配`，就实现了`垂直居中`

            ```html
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <title>Document</title>
                <style>
                  .outer {
                    width: 100vw;
                    height: 100vh;
                    box-sizing: border-box;
                    border: 1px solid rgb(255, 255, 0);

                    position: relative;
                  }

                  .inner1 {
                    width: 200px;
                    height: 100%;
                    background-color: aqua;

                    /* position: absolute;
                    top: 0;
                    bottom: 0; */
                  }
                  .inner2 {
                    height: 100%;
                    background-color: blue;

                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 200px;
                    right: 0;
                    margin: auto 0px;
                  }
                </style>
              </head>
              <body>
                <div class="outer">
                  <div class="inner1">1111</div>
                  <div class="inner2">
                    <div style="width: 200px; height: 100px; background-color: pink">
                      222
                    </div>
                  </div>
                </div>
              </body>
            </html>

            ```

## 横向格式化

因为`一个块元素`必定`独自占据一行`。

单个`子元素`的`横向盒子属性`必定等于`父元素的内容区宽度`。

即:
`父元素内容区宽度` = `子元素margin-left`+`子元素border-left-width`+`子元素padding-left`+`子元素width`+`子元素padding-right`+`子元素border-right-width`+`子元素margin-right`
其中:
`父元素内容区宽度`虽然也可以设置为`auto`，但可以理解为`父元素内容区宽度`在`父级内容排列这一过程中`早已被`浏览器`转化为`具体的像素值`了。

`子元素margin-left`可设置为`auto`，`子元素width`可设置为`auto`，`子元素margin-right`可设置为`auto`。

定:
`父元素内容区可调整宽度`
=`父元素内容区宽度`-`子元素border-left-width`-`子元素padding-left`-`子元素padding-right`-`子元素border-right-width`
=`子元素margin-left` + `子元素width` + `子元素margin-right`

1. 把`margin-left`和`margin-right`全部设为`auto`，`width`设置为`具体值`，这时候`两个外边距的长度`相等，具体表现就是`元素`在`父元素`中`居中显示`，也就是我们想要的水平居中效果。
2. `margin-left` `margin-right` `width`任意一个为`auto`，其他为`具体值`,设置`auto`的就是`父级容器剩余的宽度`.
3. 把`某一边的外边距`和`width`设置为`auto`，此时设置为`auto的外边距`等于`0`，`宽度`根据等式计算。
4. `三个值`都设置为`auto`,`左右margin`的值为`0`，但是还得满足那个等式，所以值为`父元素的宽度`。

一个`auto`都不设置，全部设置成`具体值`？这种情况在`css`里面被称作`过约束`，在这种情况下`margin-right`会被`强制设置`为`auto`。

可以理解为:

1. 如果`子元素width`设置了`auto`，那么`子元素width`就会占据`父元素内容区可调整宽度`。
2. 如果`子元素width`设置了`具体值`，那么`父元素内容区可调整宽度`就会让`值为auto的子元素margin-left`及`值为auto的子元素margin-right`平分。
3. 如果`子元素margin-left`与`子元素width`与`子元素margin-right`都设置了`具体值`。
    - 总体值都没超过`父元素内容区宽度`，那么`子元素margin-right`会被强制设置为`auto`，之后再重新分配宽度。
    - 总体值超过`父元素内容区宽度`，那么就按设置的来。

## BFC 块级格式化上下文 block formatting context

- `BFC`就是页面上的一个`隔离的独立容器`，`容器里面的子元素`不会影响到`容器外面的元素`。

- `元素`怎么开启`BFC`
  - `float`的值不是`none`
  - `display` 为 `inline-block`、`table-cells`、`flex`
  - `overflow` 除了 `visible` 以外的值 (`hidden`、`auto`、`scroll`)

- `开启了BFC的元素`的特点
  - `内部的Box`会在垂直方向，`一个接一个`的放置
  - `Box垂直方向的距离`由`margin`决定；`同一个Box`中的`相邻Box`的`margin`会`发生重叠`；
  - 每个`盒子`（块盒与行盒）的`左边距`从左往右`格式化`，即使`浮动`也是如此。
  - `BFC的区域`不会与`浮动元素`重叠。(两栏布局原理)
  - 计算`BFC元素`的`高度`时，`浮动元素`也参与计算。(清除浮动原理)

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

元素根据`正常文档流`进行`定位`，然后相对`它的最近滚动祖先`（`nearest scrolling ancestor`）和 `containing block`（最近块级祖先 `nearest block-level ancestor`），包括 `table-related元素`，基于 `top`、`right`、`bottom` 和 `left` 的值进行偏移。偏移值不会影响任何其他元素的位置。 该值总是创建一个`新的层叠上下文`（`stacking context`）。

- 一个`sticky元素`会`固定`在`离它最近的一个拥有滚动机制的祖先`上（当该祖先的`overflow`是`hidden`、`scroll`、`auto`或`overlay`时），即便`这个祖先`不是`最近的真实可滚动祖先`。

`粘性定位`可以被认为是`相对定位`和`固定定位`的`混合`。`元素`在`跨越特定阈值`前为`相对定位`，之后为`固定定位`。

- `粘性定位` 以`浏览器的窗口`作为`参照物`，`兼容性差`，`IE不支持`。

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
