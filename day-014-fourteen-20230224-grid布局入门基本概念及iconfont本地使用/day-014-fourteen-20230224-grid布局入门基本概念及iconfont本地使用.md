# day-014-fourteen-20230224-grid布局入门基本概念及iconfont本地使用

## grid布局

grid网格布局引入了二维网格布局系统，可用于布局页面主要的区域布局或小型组件。是2022年里css唯一的二维布局。

### grid布局基本概念

- grid容器
  - 设置了`display: grid;`的元素就是`grid容器`
- grid内容
- grid项目
  - `grid容器`的所有直系子元素就是`grid项目`
- 行
  - `grid容器`的从左到右横向排序的一行就是一行。
- 列
  - `grid容器`的从上往下纵向排序的一列就是一列。
- 网格线
  - 从左到右每一列起点与终点形成了竖线，这些竖线是竖网格线。
  - 从上往下每一列起点与终点形成了横线，这些横线是横网格线。
  - 所有的竖网格线和横网格线组成了网格线。
- 单元格(网格轨道)
  - 两条竖网格线和两条横网格之间的格子就是单元格，一般就是在里面放置内容的。
- 间距
  - 两个网格单元之间的间隙，不能向里面插入任何内容。

### grid布局的基本使用

- 触发grid布局
  - `display: grid;`
  - `display: inline-grid;`
- 划分行和列
  - grid-template-rows 设置每一行的高度。
    - 像素px
      - grid-template-columns:100px 100px 100px;
      - 表示一共三列，第一列宽度100px，第二列宽度100px，第三列宽度100px。
    - 百分比%
    - 重复函数repeat(重复次数, 要重复的字符串)
      - 重复时可以理解为它会在前后分别加上空格，之后遍历指定的次数。
      - 重复次数可以使用`auto-fill`，它会一直重复，直到放不下对应的列
    - 片段fr
      - fraction的缩写
    - 自动auto
    - 最大最小函数minmax(最小值,最大值)
      - 如果空间足够的话，就使用最大值，如果放不下最大，刚好又是可以显示最小，那就最小
      - 如果剩余空间在最大和最小之间，那就是中间值
  - grid-template-columns 设置每一列的长度。
- 调整行列之间的间距
  - grid-row-gap 行间距属性，上下单元格之间行与行的间距
  - grid-column-gap 列间距属性，左右单元格之间列与列的间距
  - grid-gap 复合属性，第一个值表示grid-row-gap，第二个值表示grid-column-gap
- 调整项目排序顺序
  - grid-auto-flow
    - row 默认，项目先从左到右，之后再从上到下
    - column 项目先再从上到下，之后从左到右
- 调整容器内以行或列为单位的对齐方式
  - justify-content 水平方向对齐属性，即所有列与容器的水平对齐。
  - align-content 垂直方向对齐属性，即所有行与容器的垂直对齐。
  - place-content 复合属性
  - 属性值
    - start
    - end
    - center
    - space-between
    - space-around
    - space-evenly
- 调整所有单元格内项目在该单元格内的对齐方式
  - justify-items 水平方向对齐属性，即项目在单元格中的水平方向对齐
  - align-items 垂直方向对齐属性，即项目在单元格中的垂直方向对齐
  - place-items 复合属性
  - 属性值
    - start
    - end
    - center
    - stretch
- 调整单个项目所占的单元格大小，一般用于合并单元格
  - 设置在项目上
  - grid-column-start 纵向网格线开始占位
  - grid-column-end 纵向网格线结束占位
  - grid-row-start 横向网格线开始占位
  - grid-row-end 横向网格线结束占位
  - grid-column 复合属性
    - `grid-column: 1/3;`表示`grid-column-start: 1;grid-column-end: 3;`
  - grid-row 复合属性
    - `grid-row: 1/4;`表示`grid-row-start: 1;grid-row-end: 4;`

## iconfont本地引入和使用

### iconfont本地引入

将图标下载到本地并解压，之后将里面的`iconfont.css`与`iconfont.ttf`与`iconfont.woff`与`iconfont.woff2`放到css目录下自己创建的名叫`iconfont`的文件夹里。

- `iconfont`这个文件夹名自己可自定义，但一般习惯直接叫`iconfont`。
- `iconfont.css`与`iconfont.ttf`与`iconfont.woff`与`iconfont.woff2`要放在同一级目录里，因为`iconfont.css`内部会引用它们。
页面通过link标签等方式引入`iconfont.css`文件。

### iconfont本地使用

实际上的原理都是通过`font-family: "iconfont" !important;`这行代码来引入自定义字体的。

1. 通过Unicode使用图标

    ```html
    <div class="iconfont">unicode引入 &#xe63f; unicode引入</div>
    ```

    或

    ```html
    <style>
      .实际类名::after {
        content: "\e63f";
      }
    </style>
    <div class="iconfont 实际类名">unicode引入----用::after伪类引入</div>
    ```

    或

    ```html
    <input type="text" placeholder="unicode引入---&#xe63f; 提示文案中使用" class="iconfont" />
    ```

2. 通过类名使用

  ```html
  <div class="iconfont icon-gouwuche">类名引入--图标类名引入</div
  ```

  或

  ```html
  <style>
  .自定义类名 {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .自定义类名:before {
    content: "\e63f";
  }
  </style>
  <div class="自定义类名">自定义类名引入 </div>
  ```

  或

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
