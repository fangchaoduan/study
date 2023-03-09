# day-023-twenty-three-20230308-重绘与回流-获取DOM元素-节点

## 复习

- 数组方法
  - push() 数组末尾加元素，返回结束后数组的长度
  - pop() 删除最后一项，返回最后一项
  - unshift() 数组开头加元素
  - shift() 删除开头，返回第一项
  - reverse()
  - sort()
  - splice()

  - slice()
  - indexOf()
  - lastIndexOf()
  - join()
  - concat()
  - includes()

  - forEach() 没有返回值
  - map() 有返回值
- 字符串方法
  - charAt()
  - charCodeAt()
  - slice
  - subString
  - substr
  - indexOf
  - lastIndexOf
  - split
  - toUpperCase
  - toLowerCase
  - replace
- Math方法
  - abs
  - ceil
  - floor
  - round
  - max
  - min
  - PI
  - sqrt
  - pow
  - random

### Array.forEach()内部思路

- 大概源码执行过程

    ```js
      //Array.forEach()
      function forEach(callback = () => {}) {
        for (var i = 0; i < this.length; i++) {
          callback(this[i], i, this);
        }
      }
    ```

- 发现是异步执行的，也就是说，里面并没有等待延时，没用到await。

    ```js
      var theArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      theArray.forEach((item, i, array) => {
        const randomNumber = Math.floor(Math.random() * (5 - 0 + 1) + 0)
        setTimeout((num,index) => {
          for (let i = 0; i < array.length; i++) {
            array[i] = array[i] + "-" + index;
            
          }
          console.log(index,num,array[0])
          //console.log(item, i, array);
        }, randomNumber,randomNumber,i);
      });
    ```

## 案例

### 背景切换

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>复习</title>
    <style>
      .box {
        width: 100px;
        border: 1px solid red;
        background-color: pink;
        line-height: 30px;
        border-radius: 5px;
        cursor: pointer;
        text-align: center;
        user-select: none;
      }
    </style>
  </head>
  <body>
    <div class="box">切换背景</div>
  </body>
</html>

<script>
  const box = document.getElementsByClassName("box")[0];
  const body = document.getElementsByTagName("body")[0];
  box.onclick = function () {
    const getColorNumber = () => Math.floor(Math.random() * (255 - 0 + 1) + 0);
    body.style.backgroundColor = `rgba(${getColorNumber()},${getColorNumber()},${getColorNumber()},1)`;
  };
</script>
```

### 随机验证码

```js
  var str = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  function randomCode(str = "", num = 4, repeat = false) {
    let res = "";
    for (let i = 0; i < num; i++) {
      const index = Math.floor(Math.random() * (str.length - 1 - 0 + 1) + 0);

      if (repeat) {
        res += str[index];
        continue;
      }

      if (res.includes(str[index])) {
        i--;
        continue;
      }

      res += str[index];
    }
    return res;
  }
  console.log(randomCode(str, 4));
```

```js
  var str = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  function randomCode(str = "", num = 4, isRepeat = false) {
    
    let res = "";
    for (let i = 0; i < num; i++) {
      const index = Math.floor(Math.random() * (str.length - 1 - 0 + 1) + 0);

      console.log(index);
      if (!isRepeat && res.includes(str[index])) {
        i--;
        continue;
      }

      res += str[index];
    }
    return res;
  }
  console.log(randomCode(str, 9));
```

## DOM: Document Object Model(文档对象模型)

## 重绘与回流

### 重绘(repaint)

当元素样式的改变不影响布局时，浏览器将使用重绘对元素进行更新，此时由于只需要 UI 层面的重新像素绘制，因此损耗较少。
常见的重绘操作有：

1. 改变元素颜色
2. 改变元素背景色
3. more ……

### 回流(reflow)

又叫重排（layout）。当元素的尺寸、结构或者触发某些属性时，浏览器会重新渲染页面，称为回流。此时，浏览器需要重新经过计算，计算后还需要重新页面布局，因此是较重的操作。
常见的回流操作有：

1. 页面初次渲染
2. 浏览器窗口大小改变
3. 元素尺寸/位置/内容发生改变
4. 元素字体大小变化
5. 添加或者删除可见的 DOM 元素
6. ……

### 性能

重点：回流必定会触发重绘，重绘不一定会触发回流。重绘的开销较小，回流的代价较高。

## 获取DOM元素

- 使用方法获取
  1. 通过id获取，不能改上下文 `document.getElementById('box')`
      - Element=>不带s的都是单个DOM元素
      - 只在document上能使用该方法
  2. 通过类名 `document.getElementsByClassName('box')`
      - Elements=>带s的都是数组集合（伪数组）
  3. 通过标签名 `document.getElementsByTagName('input')`
  4. 通过name属性 `document.getElementsByTagName('sexText')`
      - 建议只在input标签使用name属性
  5. 通过选择器获取
      - 获取单个 `document.querySelector('div+input')`
      - 获取多个 `document.querySelectorAll('div+input')`
- 使用属性获取
  1. 获取html `document.documentElement`
  2. 获取body `document.body`
  3. 获取head `document.head`

### 获取屏幕的宽度和高度

- `屏幕宽度=document.documentElement.clientWidth || document.body.clientWidth`
- `屏幕高度=document.documentElement.clientHeight || document.body.clientHeight`

## 节点

### 节点类型

- 文档节点
- 属性节点
- 文本节点
- 注释节点
- 元素节点

### id属性，可以它当成同名变量直接在全局作用域里使用它，该值会成为DOM元素对象

```html
<div id="app">
  div标签文本节点
  <!-- 注释节点文本 -->
  <a href="http://1996f.com">a标签文本节点</a>
</div>
<script>
  console.log(app)//如果变量app没被定义,且文档中存在id为'app'的标签。直接拿到id为'app'的DOM元素。
</script>
```

### 节点属性

- `nodeName` 节点名称
- `nodeType` 节点类型
- `nodeValue` 节点值

- `childNodes` 拿到当前节点的所有类型的所有子节点
- `getAttributeNode('属性节点名称')` 在元素节点上使用，可以拿到对应名称的属性节点。

### 节点种类

- 元素节点
- 属性节点
  - 先拿到父节点，通过`父节点的getAttributeNode('属性节点名称')`拿到。
- 注释节点
  - 先拿到父节点，通过`父节点的childNodes属性`拿到`子节点列表`，加上`中括号语法`拿到。
- 文本节点
  - 先拿到父节点，通过`父节点的childNodes属性`拿到`子节点列表`，加上`中括号语法`拿到。
- 文档节点
  - 通过document这个全局变量拿到
- 示例:

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>节点知识点</title>
      </head>
      <body>
        <div id="app" class="my-app">
          div标签文本节点
          <!-- 注释节点文本 -->
          <a href="http://1996f.com">a标签文本节点</a>
        </div>
      </body>

    <script>
      console.log("-------elementNode元素节点start-----");
      const elementNode = document.getElementById("app");
      console.log(elementNode.nodeType); //节点类型//1
      console.log(elementNode.nodeName); //节点名称//'DIV'
      console.log(elementNode.nodeValue); //节点值//null

      console.log("-------attributeNode属性节点start- getAttributeNode 拿到属性节点----");
      const attributeNode = elementNode.getAttributeNode("class");
      console.log(attributeNode.nodeType); //节点类型//2
      console.log(attributeNode.nodeName); //节点名称//'class'
      console.log(attributeNode.nodeValue); //节点值//'my-app'

      console.log("-------textNode文本节点start- childNodes 所有子节点 ----");
      const textNode = elementNode.childNodes[0];
      console.log(textNode.nodeType); //节点类型//3
      console.log(textNode.nodeName); //节点名称//'#text'
      console.log(textNode.nodeValue); //节点值//`\n      div标签文本节点\n      `//这里把拆行和空格都记录了，共计三行。不同的换行有不同的效果。

      console.log("-------annotationNode注释节点start-----");
      const annotationNode = elementNode.childNodes[1];
      console.log(annotationNode.nodeType); //节点类型//8
      console.log(annotationNode.nodeName); //节点名称//'#comment'
      console.log(annotationNode.nodeValue); //节点值//' 注释节点文本 '

      console.log("-------documentNode文档节点start-----");
      const documentNode = document
      console.log(documentNode.nodeType); //节点类型//9
      console.log(documentNode.nodeName); //节点名称//'#document'
      console.log(documentNode.nodeValue); //节点值//null
    </script>
    </html>
    ```

  - 换行也算一个文本节点。
- 常用思路
  - 拿到注释节点，在当前DOM文档树上使用。

### 子节点与子元素节点

子节点就是一个元素的直接子节点，包括文本，注释，子元素这些。
子元素节点就是一个元素的直系子元素，实际上可以理解为子元素。

### 节点之间关系的属性

- 节点类
  - parentNode 父节点
  - childNodes 所有子节点的集合
  - firstChild 第一个子节点
  - lastChild 最后一个子节点
  - previousSibling 上一个兄弟节点
  - nextSibling 下一个兄弟节点
- 元素类
  - children 所有子元素的集合
  - firstElementChild 第一个子元素
  - lastElementChild 最后一个子元素
  - previousElementSibling 上一个兄弟元素
  - nextElementSibling 下一个兄弟元素
- 如果没找到对应的元素，会返回null。

## 进阶参考

1. [网页颜色 - 维基百科](https://zh.wikipedia.org/zh-sg/网页颜色#X11名称)
2. [中国色 - 一个取中国名称颜色的网站](http://zhongguose.com/)
