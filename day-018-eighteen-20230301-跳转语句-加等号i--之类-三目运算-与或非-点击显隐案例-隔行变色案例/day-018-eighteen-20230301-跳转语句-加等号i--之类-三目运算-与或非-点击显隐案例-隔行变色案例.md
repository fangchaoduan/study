# day-018-eighteen-20230301-跳转语句-加等号i--之类-三目运算-与或非-点击显隐案例-隔行变色案例

## 跳转语句

- `return` 函数内使用，结束`当前函数`
- `continue`
  - 结束`当前循环体中的本轮次循环`，继续`下一轮次循环`

      ```js
        for(var i =0;i<5;i++){
          //i => 0 => 1 => 2 => 3 => 4
          console.log('for内开始',i)//0 1 2 3 4
          if(i===3){
            continue //结束当前for循环中的本轮循环，继续下一轮次
          }
          //i => 0 => 1 => 2 => 4 => 5
          console.log('for内最后',i)//0 1 2 4
        }
        console.log('for外continue',i)//5
      ```

- `break`
  - 结束`当前循环`。即结束`当前循环中的所有轮次循环`

      ```js
      for(var i =0;i<5;i++){
        //i => 0 => 1 => 2 => 3
        console.log('for内开始',i)//0 1 2 3
        if(i===3){
          break  //结束当前for循环。即结束当前for循环中的所有轮次循环
        }
        //i => 0 => 1 => 2 
        console.log('for内最后',i)//0 1 2
      }
      console.log('for外break',i)//3
      ```

### 标记语句可以和 break 或 continue 语句一起使用。标记就是在一条语句前面加个可以引用的标识符

标签语句用于给语句加标签，语法如下：

```javascript
label: statement
```

下面是一个例子：

```javascript
start: for (let i = 0; i < count; i++) {
  console.log(i);
}
```

在这个例子中，start是一个标签，可以在后面通过break或continue语句引用。标签语句的典型应用场景是嵌套循环。

### label语句只在以下场景中使用

`for语句`
`do-while语句`
`while语句`
`for-in语句`
`for-of语句`
也可以在代码块中使用
在非严格模式中,也可以标记非生成器函数

### label语句需要配合break 或者 continue使用

JavaScript 没有 `goto语句`，标记只能和 break 或 continue 一起使用。`return语句`不能与标签语句联合使用。

目前`label语句`主要在`嵌套循环`的场景下使用，其它场景目前没发现。

`break语句`和 `continue语句`都可以与标签语句联合使用，返回代码中的特定位置。虽然与 break 和 continue 联合使用的标签语句非常强大，但是过度使用它们会给调试代码带来麻烦。

要确保使用的标签具有说明性，同时不要嵌套太多层循环。

## 备注

`i+=2;`等价于`i=i+2;`
`i-=2;`等价于`i=i-2;`
`i*=2;`等价于`i=i*2;`
`i/=2;`等价于`i=i/2;`

## i++与++i

1. `++`
    - `++`在后面，`加1`之后是`留给下一次用`

        ```js
        var num = 5;
        //num=   5    +   6     +    7   
        num = num++ + num++ + num++;
        console.log(num);//18
        ```

        ```js
        var num = 5;
        //num=   5    +   6     +    7   
        num = (num++) + (num++) + (num++);
        console.log(num);//18
        ```

    - `++`在前，`立马就加`，`立即使用`

        ```js
        var num = 5;
        //num=   6  +   7   +    8  
        num = ++num + ++num + ++num;
        console.log(num);//21
        ```

2. `--`
    - `--`在后面，减1之后是留给下一次用
    - `--`在前，立马就减，立即使用

3. 示例:

      ```js
      var num = 3;
      //num=   3  +     3 +     2 +    2  +   3   
      num = num++ + --num + --num + num++ + num++;
      console.log(num);//13
      ```

## 三目运算

所有的`if`与`if-else`都可以转成`三目运算`。

`条件?true执行这里的语句:否则执行这里的语句`

- 占位  
  - 如果没有`else`，用`null`/`undefined`/`void 0`占位

      ```js
      var num = 3;
      num > 5 ? num++ : null;
      num > 5 ? num++ : undefined;
      num > 5 ? num++ : void 0;
      ```

- 如果有多条语句，用`括号()`括起来，用`逗号,`分隔

    ```js
    var num = 3;
    if (num > 5) {
      num++;
      console.log(num);
    } else {
      num--;
    }
    // @2 如果有多条语句
    num > 5 ? (num++, console.log(num)) : num--;
    ```

- `if嵌套`

    ```js
    if (num > 5) {
      num++;
      if (num == 2) {
        console.log(num);
      }
    } else {
      num--;
    }
    num > 5 ? (num++, (num == 2 ? console.log(num) : null)) : num--;
    ```

  1. 先写简单的，遇到复杂的就先用括号占一下位
     - `num > 5 ? () : num--;`
  2. 写完简单的，再写括号里的。
      - 括号里遇到嵌套的if，用括号包起来占一下位
      - 遇到多行的，用`逗号,`代替`分号;`来分隔`不同行的代码`
        - `num > 5 ? (num++, ()) : num--;`
  3. 按之前步骤依次写完括号里的。
     - `num > 5 ? (num++, (num == 2 ? console.log(num) : null)) : num--;`

- 一般只有一个`if`或`if-else`，并且`条件语句内代码块`只有`一两行代码`才使用`三目运算符`。

## 与或非

- `!` `非`，将`!后面的`先转`布尔值`，再`取反`
- `&&` `与`、`并且`，`找false`的过程
  - `值`不一定为`布尔值`，只有`两边都是条件语句`时，才会是`布尔值`
    - `(9<6)&&''//false`
    - `''&&0//''`
  - `true&&false` `false对应的具体值`
  - `true&&true` `后面true对应的具体值`
  - `false&&false` `前面false对应的具体值`
- `||` `或`、`或者`，`找true`的过程
  - `值`不一定为`布尔值`，只有`两边都是条件语句`时，才会是`布尔值`
  - `false||true` `true对应的具体值`
    - `0||9//9`
  - `true||true` `前面true对应的具体值`
    - `9||6//9`
  - `false||false` `后面false对应的具体值`
    - `0||''//''`
- 在条件语句里面:
  - `&&`必须左右两边都是`true`，才能进入`代码块`执行代码
  - `||`只要有一个为`true`，就能进入`代码块`执行代码

## 开关灯铺垫知识

- 在body之前写的js代码，里面的代码在执行时，会获取不到后面dom标签，因为此时js代码执行时，dom标签还没执行到，没生成DOM元素。

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>开关灯</title>
        <script src="">
          //在body之前写的js代码，里面的代码在执行时，会获取不到后面dom标签，因为此时js代码执行时，dom标签还没执行到，没生成DOM元素。
          console.log(document.getElementById("box"));
        </script>
      </head>
      <body>
        <div id="box" class="box">点击</div>
      </body>
    </html>
    ```

  - 解决办法

    1. script标签放在body后面

        ```html
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <title>开关灯</title>
          </head>
          <body>
            <div id="box" class="box">点击</div>
          </body>
          <script src="">
            console.log(document.getElementById("box"));
          </script>
        </html>
        ```

    2. 使用window.onload

        - window是一个对象，onload是window上的一个属性，它接受一个函数。
        - 当页面加载完毕，才会执行window.onload的值的里面代码。

          ```html
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <title>开关灯</title>
              <script src="">
                //当页面加载完毕，才会执行里面代码;//window是一个对象，onload是window上的一个属性，它接受一个函数。
                //当页面加载完毕，才会执行window.onload的值的里面代码。
                window.onload = function(){
                  console.log(document.getElementById("box"));
                };
              </script>
            </head>
            <body>
              <div id="box" class="box">点击</div>
            </body>
          </html>
          ```

- 获取div元素

  1. 通过id获取div元素。
      - `document.getElementById()`//document是一个对象，getElementById是对象上的一个属性，它是一个方法。
      - 标签是一个dom对象，它会包含一些键值对。
        - 使用console.dir()可以看到DOM元素的具体信息。

            ```js
                //@1 通过id获取div。
                //document.getElementById()//document是一个对象，getElementById是对象上的一个属性，它是一个方法。
                //标签是一个dom对象，它会包含一些键值对。
                var ele = document.getElementById("box")
                console.log(ele);//只会看到一个DOM标签。
                console.dir(ele);//使用console.dir()可以看到DOM元素的具体信息。
            ```

  2. 通过类名获取div元素集合。
     - `document.getElementsByClassName()`

        ```js
            //@2 通过类名获取div。document.getElementsByClassName()获取到的是一个dom集合。
            var classList = document.getElementsByClassName('box')// 获取到的是一个dom集合;
            console.log("classList--->", classList)
            var ele = classList[0]
            console.log("ele--->", ele)
        ```

  3. 通过标签名获取div元素集合。

     - `document.getElementsByTagName()`

        ```js
            //@3 通过标签名获取div。document.getElementsByTagName()获取到的是一个dom集合。
            var tagList = document.getElementsByTagName('div')
            console.log("tagList--->", tagList)
            var ele = tagList[0]
            console.log("ele--->", ele)
        ```

  4. 有s的一般拿到的是一个dom对象集合，没s则是单个dom对象。

- 拿到标签上属性值
  - 获取到DOM元素对象后，可以通过点语法或中括号语法访问DOM元素对象上的属性值。

      ```js
      var ele = document.getElementById("box");
      console.log(ele.innerHTML);//元素内的标签字符串。
      ```

    - 元素包含的常用属性:
      - `className`: 存储的是字符串，代表当前元素的类名
      - `id`:     存储的是字符串，代表当前元素的id名
      - `innerHTML`: 存储当前元素的所有内容，包含标签
      - `innerText`: 存储当前元素的文本内容
      - `style`: 存贮当前元素的所有行内样式
        - `CSS`中用分隔线隔开的属性，在js中都要用驼峰命名法。如`'background-color'`变成`'backgroundColor'`。
          - `DOM元素对象变量.style.backgroundColor='pink'` 设置`DOM元素对象变量`的`背景颜色`变为`'pink'`。
      - `onclick`: 点击事件属性
      - `onmouseover`: 鼠标滑过事件
      - `onmouseout`: 鼠标离开事件
  - 示例:
    - 点击改文本

        ```html
        <div id="box" class="box">
          隐藏
        </div>
        <script>
          var ele = document.getElementById('box');
          ele.onclick = function () {
            // 点击时触发的代码
            if (ele.innerText === '隐藏') {
              ele.innerText = '显示';
            } else {
              ele.innerText = '隐藏';
            }
          }
        </script>
        ```

    - 点击加一个背景颜色

        ```html
        <div id="box" class="box">
          隐藏
        </div>
        <script>
          var ele = document.getElementById('box');
          // 点击的时候加一个背景颜色
          ele.onclick=()=>{
            ele.style.backgroundColor='pink'//css中用分隔线隔开的属性，在js中都要用驼峰命名法。如'background-color'变成'backgroundColor'。
          }
        </script>
        ```

    - 鼠标移入移出

        ```html
        <div id="box" class="box">
          隐藏
        </div>
        <script>
          var ele = document.getElementById('box');
          ele.onmouseover = () => {
            console.log("鼠标移入");
          };
          ele.onmouseout = () => {
            console.log("鼠标移出");
          };
        </script>
        ```

### 查看事件

1. 查看点击事件是否成功，在点击事件第一行打印出一行字。

- 打印出来，代表绑定事件成功了。
- 没打印出来，代表绑定事件失败了，说明可能onclick事件名写错了。或者是变量弄错了。

### 同步异步代码

- 同步代码 必须一行一行执行，不能跨域
- 异步代码 先保存先，后面再执行

### DOM元素对象

DOM元素对象也是一个对象，它可以自定义键值对。

可以认为DOM元素对象默认是有一些内置属性的，并且改动这些内置属性，会改变对应DOM元素的样式及内容。

DOM对象其实就类似于对象，也可以在它身上通过自定义属性的方式来存一些变量值和一些信息，之后通过this来访问到这些自定义的属性。

### 函数的this指向

`function`定义的函数，`this`指向的是`当前调用的对象`。即`当前函数前面的点.的对象`。

### 隔行变色

1. 隔行变色纯css

      ```html
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Document</title>
        <style>
          ul{
            width: 800px;
            margin: 50px auto;
          }
          ul>li{
            width: 200px;
            border: 1px solid gray;
          }

          li:nth-child(3n){
            background-color: skyblue;
          }
          li:nth-child(3n+1){
            background-color: pink;
          }
          li:nth-child(3n+2){
            background-color: yellow;
          }

        </style>
      </head>
      <body>
        <ul>
          <li>第1item</li>
          <li>第2item</li>
          <li>第3item</li>
          <li>第4item</li>
          <li>第5item</li>
          <li>第6item</li>
          <li>第7item</li>
          <li>第8item</li>
          <li>第9item</li>
          <li>第10item</li>
        </ul>
      </body>
      </html>
      ```

2. 隔行变色js加style

      ```html
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Document</title>
          <style>
            ul {
              width: 800px;
              margin: 50px auto;
              list-style: none;
            }
            ul > li {
              width: 200px;
              border: 1px solid gray;
            }
          </style>
        </head>
        <body>
          <ul>
            <li>第1item</li>
            <li>第2item</li>
            <li>第3item</li>
            <li>第4item</li>
            <li>第5item</li>
            <li>第6item</li>
            <li>第7item</li>
            <li>第8item</li>
            <li>第9item</li>
            <li>第10item</li>
          </ul>
        </body>
        <script>
          const theList = document.getElementsByTagName("li");
          for (let i = 0; i < theList.length; i++) {
            const nowEle = theList[i]
            if (i % 2 === 0) {
              nowEle.style.backgroundColor = "pink";
            } else {
              nowEle.style.backgroundColor = "skyblue";
            }

            nowEle.onmouseover = function () {
              this.myColor = this.style.backgroundColor;//this指向的是当前调用当前函数的对象。
              this.style.backgroundColor = "yellow";
            };
            nowEle.onmouseout = function () {
              this.style.backgroundColor = this.myColor;
            };
          }
        </script>
      </html>
      ```

3. 隔行变色js加className

      ```html
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Document</title>
          <style>
            ul {
              width: 800px;
              margin: 50px auto;
              list-style: none;
            }
            ul > li {
              width: 200px;
              border: 1px solid gray;
            }

            .sky {
              background-color: skyblue;
            }
            .pink {
              background-color: pink;
            }
            .gray {
              background-color: gray;
            }
          </style>
        </head>
        <body>
          <ul>
            <li>第1item</li>
            <li>第2item</li>
            <li>第3item</li>
            <li>第4item</li>
            <li>第5item</li>
            <li>第6item</li>
            <li>第7item</li>
            <li>第8item</li>
            <li>第9item</li>
            <li>第10item</li>
          </ul>
        </body>
        <script>
          const theList = document.getElementsByTagName("li");
          for (let i = 0; i < theList.length; i++) {
            const nowEle = theList[i];
            if (i % 2 === 0) {
              nowEle.className = "pink";
            } else {
              nowEle.className = "sky";
            }

            nowEle.onmouseover = function () {
              this.myColor = this.className; //this指向的是当前调用当前函数的对象。
              this.className = "gray";
            };
            nowEle.onmouseout = function () {
              this.className = this.myColor;
            };
          }
        </script>
      </html>

      ```

## 进阶参考

1. [2022-04-26 跳出特定for循环，JavaScript中的label语法](https://blog.csdn.net/seetoyou/article/details/124424807)
