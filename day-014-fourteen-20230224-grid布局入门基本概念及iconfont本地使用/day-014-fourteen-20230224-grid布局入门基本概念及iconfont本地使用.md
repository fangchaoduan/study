# day-014-fourteen-20230224-`grid布局`入门基本概念及`iconfont`本地使用

## `grid布局`

`grid网格布局`引入了`二维网格布局系统`，可用于布局`页面主要的区域布局`或`小型组件`。是`2022年里css`唯一的`二维布局`。

### `grid布局`基本概念

- `grid容器`
  - 设置了`display: grid;`的元素就是`grid容器`
- `grid内容`
- `grid项目`
  - `grid容器的所有直系子元素`就是`grid项目`
- `行`
  - `grid容器`的从左到右`横向排序的一行`就是`一行`。
- `列`
  - `grid容器`的从上往下`纵向排序的一列`就是`一列`。
- `网格线`
  - 从左到右`每一列起点与终点`形成了`竖线`，`这些竖线`是`竖网格线`。
  - 从上往下`每一行起点与终点`形成了`横线`，`这些横线`是`横网格线`。
  - `所有的竖网格线和横网格线`组成了`网格线`。
- `单元格`(`网格轨道`)
  - `两条竖网格线`和`两条横网格`之间的`格子`就是`单元格`，一般就是在里面放置`内容`的。
- `间距`
  - 两个`网格单元`之间的`间隙`，不能向里面插入任何`内容`。

### `grid布局`的基本使用

- 触发`grid布局`
  - `display: grid;`
  - `display: inline-grid;`
- 划分行和列
  - `grid-template-rows` 设置`每一行的高度`。
    - `像素px`
      - `grid-template-columns:100px 100px 100px;`
      - 表示一共三行，第一行高度100px，第二行高度100px，第三行高度100px。
    - `百分比%`
    - `重复函数repeat`(`重复次数`, `要重复的字符串`)
      - `重复时`可以理解为它会在`字符串前后`分别加上`空格`，之后重复`指定的次数`。
      - `重复次数`可以使用`auto-fill`，它会`一直重复`，直到`放不下对应的行`
    - `片段fr`
      - `fraction`的缩写
        - `grid-template-rows：1fr 2fr 3fr;`
          - 表示一共3行，第一行占`1/6剩余空间`，第二行占`2/6剩余空间`,第三行占`3/6剩余空间`
    - `自动auto`
      - `grid-template-rows:auto 100px 100px`
        - 表示一共3行，第二行第三行都是`100px`，第一行就是`剩余所有`
      - 个人感觉类似于只有`它对应的那行设置了1fr，其它列都是写好了固定长度`的情况。
    - `最大最小函数minmax`(最小值,最大值)
      - 如果`空间足够`的话，就使用`最大值`，如果`放不下最大`，刚好又可以`显示最小`，那就`最小`
      - 如果`剩余空间`在`最大和最小之间`，那就是`中间值`
  - `grid-template-columns` 设置`每一列的长度`。
- 调整`行列之间的间距`
  - `grid-row-gap` 行间距属性，`上单元格行底`与`下单元格行顶之间的间距`
  - `grid-column-gap` 列间距属性，`左单元格列右侧`与`右单元格列左侧`之间的间距
  - `grid-gap` 复合属性，第一个值表示`grid-row-gap`，第二个值表示`grid-column-gap`
- 调整`项目排序顺序`
  - `grid-auto-flow`
    - `row` 默认，项目`先从左到右`，之后`再从上到下`
    - `column` 项目`先再从上到下`，之后`再从左到右`
- 调整`容器内以行或列为单位`的`对齐方式`
  - `justify-content` 水平方向对齐属性，即`所有列`与`容器`的`水平对齐`。
  - `align-content` 垂直方向对齐属性，即`所有行`与`容器`的`垂直对齐`。
  - `place-content` 复合属性
  - 属性值
    - `start`
    - `end`
    - `center`
    - `space-between`
    - `space-around`
    - `space-evenly`
- 调整`所有单元格内项目`在`该单元格内`的`对齐方式`
  - `justify-items` 水平方向对齐属性，即`项目`在`单元格中`的`水平方向对齐`
  - `align-items` 垂直方向对齐属性，即`项目`在`单元格中`的`垂直方向对齐`
  - `place-items` 复合属性
  - 属性值
    - `start`
    - `end`
    - `center`
    - `stretch`
- 调整`单个项目所占的单元格大小`，一般用于`合并单元格`
  - 设置在项目上
  - `grid-column-start` 纵向网格线开始占位
  - `grid-column-end` 纵向网格线结束占位
  - `grid-row-start` 横向网格线开始占位
  - `grid-row-end` 横向网格线结束占位
  - `grid-column` 复合属性 纵向网格线的开始及结束占位
    - `grid-column: 1/3;`表示`grid-column-start: 1;grid-column-end: 3;`
  - `grid-row` 复合属性 横向网格线的开始及结束占位
    - `grid-row: 1/4;`表示`grid-row-start: 1;grid-row-end: 4;`

## `iconfont本地引入`和`iconfont使用`

### `iconfont本地引入`

1. 将图标下载到本地并解压，之后将里面的`iconfont.css`与`iconfont.ttf`与`iconfont.woff`与`iconfont.woff2`放到css目录下自己创建的名叫`iconfont`的文件夹里。
    - `iconfont`这个文件夹名自己可自定义，但一般习惯直接叫`iconfont`。
    - `iconfont.css`与`iconfont.ttf`与`iconfont.woff`与`iconfont.woff2`要放在同一级目录里，因为`iconfont.css`内部会引用它们。
2. 页面通过`<link/>标签`等方式引入`iconfont.css`文件。

### `iconfont本地使用`

实际上的原理都是通过`font-family: "iconfont" !important;`这行代码来引入自定义字体的。

1. 通过`Unicode`使用图标

    - 在`html标签`中使用`Unicode编码`

        ```html
        <div class="iconfont">unicode引入 &#xe63f; unicode引入</div>
        ```

    - 在`自定义类的::after伪元素`中使用`Unicode编码`

        ```html
        <style>
          .实际类名::after {
            content: "\e63f";
          }
        </style>
        <div class="iconfont 实际类名">unicode引入----用::after伪元素引入</div>
        ```

    - 在`<input/>标签中的placeholder提示文本`中使用`Unicode编码`

        ```html
        <input type="text" placeholder="unicode引入---&#xe63f; 提示文案中使用" class="iconfont" />
        ```

2. 通过类名使用

    - 通过`iconfont类名`并配合`iconfont默认类名`使用

        ```html
        <div class="iconfont icon-gouwuche">类名引入--图标类名引入</div
        ```

    - 通过`自定义类名`并配合`自定义类名对应DOM元素的::before伪元素`使用

        ```html
        <style>
        .自定义类名 {
          font-family: "iconfont" !important;
          font-size: 16px;
          font-style: normal;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .自定义类名::before {
          content: "\e63f";
        }
        </style>
        <div class="自定义类名">自定义类名引入 </div>
        ```

    - 通过`自定义类名`并在`html标签`中使用`Unicode编码`

        ```html
        <style>
        .自定义类方 {
          color: red;
          font-family: "iconfont" !important;/* 引入字体图标，用于补充Unicode */
        }
        </style>
        <div class="自定义类方">自定义类名引入 &#xe63f; + unicode的组合  &nbsp;</div>
        ```

## 进阶参考

1. [现代Web布局 - 掘金小册-需要付费 - 可以看grid布局相关的内容](https://juejin.cn/book/7161370789680250917)
2. [Grid](https://developer.mozilla.org/zh-CN/docs/Glossary/Grid)
3. [网格布局的基本概念](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout)
4. [iconfont 的 Web 端使用](https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d8cf4382a&helptype=code)
