# day-010-ten-20230218-渐变及less预处理的VSCode插件

## 渐变

`linear-gradient()`函数用于创建一个表示两种或多种颜色线性渐变的图片。其结果属于`gradient数据类型`，是一种特别的`image数据类型`。

也就是说，渐变是作用于`background-image`上的，而不是`background-color`。

### 线性渐变

语法:

```less
//linear-gradient([ <angle> | [ to [ [top | bottom] || [left | right] ],]]? <color-stop>[, <color-stop>]+);
linear-gradient(`渐变角度(可选)`, `渐变开始颜色步长`,`渐变中间颜色步长(可选多个用逗号隔开)`,`渐变结束颜色步长`);
```

- 单向线性渐变`linear-gradient()`
  - 渐变开始颜色及渐变结束颜色是必要的，如果不设置，就会导致失效。
  - 渐变角度
    - 可以用to后加关键字来做，是指的渐变开始方位。
      - 关键字可选: [`top`|`bottom`]|[`left`|`right`]。
        - to top, to bottom, to left 和 to right 这些值会被转换成角度 0 度、180 度、270 度和 90 度。
      - 最好先写上下方位，再写左右方位。
      - 一个关键字
        - `background-image: linear-gradient(to right,#000, #fff);`
      - 两个关键字
        - `background: linear-gradient(to right bottom, red, green);`
    - 可以用deg单位来设置。
      - `background: linear-gradient(90deg, red, green);`
  - 颜色步长 由一个颜色和可选的颜色结束终点位置组成
    - `background-image: linear-gradient(#333,#f00);`等价于`background-image: linear-gradient(#333 0%,#f00 100%);`
    - `background-image: linear-gradient(#333 30px,#f00 50% );`等价于`background-image: linear-gradient(#333 0%,#333 30px,#f00 50%,#f00 100%);`
    - 如果颜色步长不是从0%开始，那么就会使用第一个颜色步长的颜色设置成0%的步长。
    - 如果颜色步长不是从100%结束，那么就会使用最后一个颜色步长的颜色设置成100%处的步长。
  - 例子说明:
    - `background-image: linear-gradient(0deg,#333 30px,#f00 50%);`等价于`background-image: linear-gradient(to top,#333 0%,#333 30px,#f00 50%,#f00 100%);`
    - 颜色`从下到上`由`0%处的#333`渐变成`30px处的#333`，之后再`从下到上`由`30px处的#333`渐变成`50%处的#f00`，之后再`从下到上`由`50%处的#f00`渐变成`100%处的#f00`。
- 重复线性渐变`repeating-linear-gradient()`
  - 参数和单向线性渐变一致，不过对于颜色步长的处理有些不一样。
    - 不设置0%处的颜色步长及不设置100%处的颜色步长时，剩余的空间复制很多份中间布置过的渐变。
  - 例子说明
    - `background-image: repeating-linear-gradient(45deg, #000 0px, #000 30px, #fff 30px, #fff 60px);`

- 用处:
  - 设置斑马线

      ```html
      <style>
        .container {
          width: 600px;
          height: 200px;
          background-image: repeating-linear-gradient(90deg,#333 0px,#333 30px,#ff0 30px,#ff0 60px);
        }
      </style>
      <div class="container"></div>
      ```

  - 设置发廊灯静态

      ```html
      <style>
        .container {
          width: 600px;
          height: 200px;
          background-image: repeating-linear-gradient( 45deg, #000 0px, #000 30px, #fff 30px, #fff 60px );
        }
      </style>
      <div class="container"></div>
      ```

  - 设置发廊灯动态

      ```html
      <style>
        .container {
          width: 400px;
          height: 200px;
          border: 1px solid rgb(255,255,0);
          overflow: hidden;
        }

        .item{
          width: 1600px;
          height: 200px;
          background-image: repeating-linear-gradient( 45deg, #000 0px, #000 30px, #fff 30px, #fff 60px);

          animation: move 5s linear forwards infinite;
        }
        .item:hover{
          animation-play-state: paused;/* 鼠标移动到上面时暂停动画 */
        }

        @keyframes move{
          0%{
            background-position-x: 0;
          }
          100%{
            background-position-x: -1200px;
          }
        }
      </style>
      <div class="container">
        <div class="item"></div>
      </div>
      ```

### 径向渐变

- 单向径向渐变`radial-gradient()`
  - `gradient`属于`image类型`，`radial-gradient()`属于`gradient`。
    - 所以`radial-gradient()`可以用于任何适用于`image`的地方。
  - `radial-gradient()`不能用于`background-color`和其他属性比如`color数据类型`
  - 使用at外加坐标，可以定义中心的位置，百分比相对的是宽高，要用at加上position的值

  - 例子:
    - `background: radial-gradient(red, green);` 默认是椭圆的
    - `background: radial-gradient(circle, red, green);` 圆形的径向渐变
    - `background: radial-gradient(at 200px 100px, red, green);` 指定了圆心位置的径向渐变
- 重复径向渐变`repeating-radial-gradient();`
  - 例子`background: repeating-radial-gradient(red 0, red 30px, green 30px, green 60px);`

#### 电蚊香

```html
<style>
  div {
    width: 500px;
    height: 500px;
    background-image: repeating-radial-gradient(circle,#000000 0px,#000000 30px,#ffffff 30px,#ffffff 60px);
  }
</style>
<div></div>
```

### 好看的渐变色

## css变量

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Css变量</title>
  <style>
    html{
      --bgcolor:pink;

      --变量名:yellow;
    }
    div{
      width: 300px;
      height: 400px;
      background-color: var(--bgcolor);
      border: 10px solid var(--变量名);
    }
  </style>
</head>
<body>
  <div></div>
</body>
</html>
```

## less预处理

less是css的一门预处理的语言。

可以认为less就是就是css的加强版，可以用更少的代码实现更强大的样式。

### 步骤

1. VSCode下载Easy LESS 插件
2. 创建并写less文件，保存less之后编译成对应的css文件。
3. html引入less编译出来的css文件
    - 在less文件中新写代码并保存后，就会直接修改对应的css文件。
    - 在对应css文件中修改代码，并不会同步到less文件中。
      - 在对应css文件中修改代码会`造成在less文件修改后，重新覆盖了改动后的css文件，以至于丢失在css文件中的修改`。
      - 不要在css文件里写代码，要在less文件中写。
    - 注意: 引入的是less编译出来的css变量，而不是less源文件。
      - 因为浏览器并不识别less代码，只识别css代码。
4. 如果还需要修改css文件，直接在less源文件里改，之后它会自动修改覆盖之前自动生成的那个css文件。

### less规则

- 嵌套关系
  - 要明确写父层级
  - 嵌套是后代选择器的关系
  - &表示父级
    - `&>所要选子元素` 子代选择器
    - `所要选后代元素` 后代选择器
- less变量
- less注释
  - `// 单行注释` 不会被编译。
  - `/* 多行注释 */` 可以被编译。

### 示例

```less
@background-color: skyblue; //1. 定义变量。

// 单行注释 不会被编译。
/* 多行注释 可以被编译 */
html {
  background-color: red;

  //在父选择器里直接写的选择器可以认为前面会加一个空格，即默认用的是后代选择器
  body {
    background-color: @background-color; //2. 直接使用css变量。

    //&指的是父级;
    //&>指的就是子代选择器。
    & > div {
      //&:hover写的是当前父级元素的:hover伪类。
      &:hover {
        font-size: 40px;
      }
      color: yellow;
    }
  }
}

```

编译成:

```css
/* 多行注释 可以被编译 */
html {
  background-color: red;
}
html body {
  background-color: skyblue;
}
html body > div {
  color: yellow;
}
html body > div:hover {
  font-size: 40px;
}
```

## 华为商场

### 设置标签页

1. 查找icon图标，查看源代码，在`head标签`里看到`<link rel="shortcut icon" />`，直接复制这个html标签。
2. 把复制的link标签放在自己源代码的`head标签`里。

## 单行文本省略号

```html
<style>
  .box {
    border: 1px solid rgb(255, 255, 0);
    max-width: 200px;
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
<div class="box">uy g k yy 方一天一三辊五注哪里有 kjdkja吕中</div>
```

## 多行文本省略

```html
<style>
  .multi-line {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    border: 1px solid rgb(255, 255, 0);
    -webkit-box-orient: vertical;
  }
</style>
<div class="multi-line">CSS实现多行文本超出省略效果https://juejin.cn/post/7078467853808042015最简方案</div>
```

或

```html
<style>
.text {
  width: 300px;
  position: relative;
  
  line-height: 1.2em;/* //line-height和height要相互配合，显示多少行就省略，就是line-height多少倍数 */
  max-height: 3.6em;
  text-align: justify; /* // 设置文本向两侧对齐（最后一行无效） */
  overflow: hidden;/* // 溢出隐藏 */
}
.text:before {
  position: absolute;
  right: 0;
  bottom: 0;
  content: "...";
  
  width: 1em;/* // 省略号占据一个字符的空间 */
  height: 1.2em;/* // 与text的行高实际值保持一致 */
  background-color: #fff;/* // 设置背景和所在空间一致 */
}
.text:after {
  position: absolute;
  right: 0;
  content: "";
  
  width: 1em;/* // 和省略号宽度一致 */
  height: 1.2em;/* // 与text的行高实际值保持一致 */
  background-color: #fff;/* // 设置背景和所在空间一致 */
}
</style>
<div class="text">
  稳外贸是稳增长的重要支撑。1月28日，春节后首个工作日召开的国务院常务会议强调，提高外贸竞争力。记者近期走访了解到，不少外贸企业订单激增，中欧班列、海铁联运运量明显增加。为保障企业出口货物时效，各部门高效组织运输服务，帮助更多出口商品“小步快跑”奔向海外。
</div>
```

- 当文本没有超出的时候，伪类元素after和before会在元素text的右下角，且after会覆盖before，省略号隐藏。
- 当文本溢出的时候，由于伪类元素before设置了bottom：0，仍然会出现在右下角，而after则会被文本挤下去，省略号展示

## 进阶参考

1. [CSS实现多行文本超出省略效果-webkit-line-clamp方案](https://juejin.cn/post/7078467853808042015)
2. [css多行文本省略-伪元素定位方案](https://blog.csdn.net/tianming2018/article/details/128826091)
3. [radial-gradient()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/radial-gradient)
