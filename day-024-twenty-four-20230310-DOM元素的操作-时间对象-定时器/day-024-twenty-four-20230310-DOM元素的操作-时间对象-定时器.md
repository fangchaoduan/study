# day-024-twenty-four-20230310-DOM元素的操作-时间对象-定时器

## 复习

- 获取元素
  - id
    - document.getElementById()
  - 类名
    - document.getElementsByClassName()
  - 标签名
    - document.getElementsByTagName()
  - name属性
    - document.getElementsByName()
  - 选择器
    - document.querySelector()
    - document.querySelectorAll()
  - 简写
    - document.documentElement
    - document.head
    - document.body
- 获取屏幕宽高
  - screenWidth = document.documentElement.clientWidth||document.body.clientWidth
  - screenHeight = document.documentElement.clientHeight||document.body.clientHeight
- 节点类型
  - 元素节点
    - 节点名称  ->大写的标签名
    - 节点类型  ->1
    - 节点值    ->null
  - 属性节点
    - 节点名称  ->'属性名'
    - 节点类型  ->2
    - 节点值    ->'属性值'
  - 文本节点
    - 节点名称  ->#text
    - 节点类型  ->3
    - 节点值    ->'文本内容'
  - 注释节点
    - 节点名称  ->#comment
    - 节点类型  ->8
    - 节点值    ->'注释内容'
  - 文档节点
    - 节点名称  ->#document
    - 节点类型  ->9
    - 节点值    ->null
- 节点与元素节点是不一样的
- 获取关联节点
  - parentNode 父节点 节点只可能是元素节点
  - childNodes 子节点
  - children 子元素节点
  - firstChild 第一个子节点
  - firstElementChild 第一个子元素节点
  - lastChild 最后一个子节点
  - lastElementChild 最后一个子元素节点
  - previousSibling 上一个兄弟节点
  - previousElementSibling 上一个兄弟元素节点
  - nextSibling 下一个兄弟节点
  - nextElementSibling 下一个兄弟元素节点

## 如果一个属性名称或方法单词拼写忘记了

- 直接用dir打印出该对象，看它身上的属性，得大概知道那个属性或方法的样子
- 打开MDN文档查看一下该方法或属性，得大概知道它的开头

## DOM

- 增删改
  - document.createElement(tagName) 创建元素节点
  - document.createTextNode(textContent) 创建文本节点
- 节点插入
  - 父节点.appendChild(当前节点)
  - 父节点.insertBefore(当前节点, 后方参照节点)

      ```js
      var  insertedNode = parentNode.insertBefore(newNode, referenceNode)
      //newNode：将要插入的节点
      //referenceNode：被参照的节点（即要插在该节点之前）
      //insertedNode：插入后的节点
      //parentNode：父节点
      ```

- 创建了DOM元素，如果没插入到页面，那么页面上就不会显示

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>DOM元素增删改</title>
      </head>
      <body>
        <div class="box">box</div>
      </body>
    </html>

    <script>
      //创建一个元素节点
      var elementNode = document.createElement("div");
      console.dir(elementNode);
      //创建一个文本节点
      var textNode = document.createTextNode("文本节点");
      console.dir(textNode);

      //将新目标节点插入到父元素的末尾
      const box = document.getElementsByClassName("box")[0];
      box.appendChild(elementNode);
      box.appendChild(textNode);

      //在于父元素中的后方参照节点前面插入新目标节点
      //1.获取到父节点;
      const parentNode = document.getElementsByClassName("box")[0];
      //2.获取到后方参照节点;
      const beforeNode = elementNode;
      //3.创建p节点;
      const element1 = document.createElement("p");
      //4.创建文本节点;
      const text1 = document.createTextNode("p Text");
      // 5.将文本节点放到p标签里面
      element1.appendChild(text1);
      //6.p节点插入到div节点前面
      parentNode.insertBefore(element1, beforeNode);// 父节点.insertBefore(新节点，参照的节点)
    </script>
    ```

- DOM元素对象.innerHTML
  - 不能直接插入DOM节点对象
- DOM元素对象.innerText
  - 不能直接插入DOM节点对象

- cloneNode() 克隆节点
  - cloneNode()用于把某一个节点进行克隆
    - element.cloneNode(); 浅克隆，只是克隆了一个节点，里面的内容还有样式都没克隆
    - element.cloneNode(true); 深克隆，把节点包含的所有内容进行克隆
- removeChild() 删除节点
  - `parentNode.removeChild(item)`
- 属性节点操作属性值
  - getAttribute() 获取对应属性的属性值
    - targetElement.getAttribute('class')
  - setAttribute() 设置对应属性的属性值
    - 必须要有两个参数，只有一个参数会报错
    - targetElement.setAttribute('fang1','fangtofang1')
  - removeAttribute() 删除对应属性
    - targetElement.removeAttribute('name')
- 中括号语法操作DOM属性
  - `elementObject.fang3='fangtofang3'`或`elementObject['fang3']='fangtofang3'` 设置对应属性的属性值
  - `elementObject.fang3`或`elementObject['fang3']` 获取对应属性的属性值
  - `delete elementObject.fang4`或`delete elementObject['fang3']`
- 属性节点操作与中括号语法操作有区别，不能混用
  - 属性节点的操作是放在标签身上的
    - 基于`Attribute dom方法`增删改，是修改`html结构`来完成的（此种方法设置的属性在`html结构`上可以看到）
  - 中括号语法的操作是放在DOM元素对象上的
    - 基于键值对方式 增删改：修改`当前对象的堆内存空间`完成的（在`堆内存空间`可以看到）
  - 以上两种方式不能混用

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>复习</title>
  </head>
  <body>
    <div class="box" name="fang">
      box原生内容
      <p class="item">box原生子元素</p>
    </div>
  </body>
</html>

<script>
  const box = document.getElementsByClassName("box")[0];
  const shallowCloning = box.cloneNode();
  console.log(shallowCloning,'默认浅克隆');
  const deepCloning = box.cloneNode(true);
  console.log(deepCloning,'传了true，就是深克隆');

  const item = document.getElementsByClassName("item")[0];
  const parentNode = document.getElementsByClassName("box")[0];
  parentNode.removeChild(item)

  const targetElement = document.getElementsByClassName('box')[0]
  const attributeValue = targetElement.getAttribute('class')
  console.log(attributeValue,'获取的是对应属性的属性值')
  const idAttribute = targetElement.getAttribute('id')
  console.log(idAttribute,'不存在的属性是null')
  targetElement.setAttribute('fang1','fangtofang1')
  // targetElement.setAttribute('fang2')//报错 必须要有两个参数
  targetElement.removeAttribute('name')
  console.log([targetElement],'setAttribute只是设置在标签上，对应对象上并没有设置')
  console.log(targetElement.fang1,'中括号语法拿不到用setAttribute()设置的自定义属性')

  const elementObject = document.getElementsByClassName('box')[0]
  elementObject.fang3 = 'fangtofang3'
  const fang3 = elementObject.fang3
  elementObject.fang3 = 'fang'
  elementObject.fang4 = 'fangtofang4'
  delete elementObject.fang4
  console.dir(elementObject)
</script>
```

### 案例

- 利用`a标签`上的`search属性`与`hash属性`来处理`url字符串`

## Date时间对象

- `时间对象`的作用
  - `Date对象`用于处理`日期`和`时间`。
- 创建`时间对象`
  - `new Date()`
  - `时间对象`是一个`对象`
- 相关方法
  - getFullYear();获取年
  - getMonth();获取月 
    - `0到11` 代表`1月`到`12月`
  - getDate();获取日期
  - getDay();星期几 （0---6）代表周日到到周六
  - getHours();时
  - getMinutes();分
  - getSeconds();秒
  - getMilliseconds();毫秒
  - getTime();获取当前日期到1970年1月1号 00：00:00 之间的毫秒差
  - toLocaleString();// 获取到的是年月日，时分秒"2019/12/25 上午10:15:50"
  - toLocaleDateString();//  获取到是字符串的年月日，例如："2019/12/25"
  - toLocaleTimeString();/ 获取到的是字符串的时分秒上午10:18:28
- 看到new就是构造函数，如果不传参数，函数的小括号可以省略。

```js
  const date = new Date();
  console.log(date, "当前时间");
  const dateType = typeof new Date();
  console.log(dateType, "时间对象的类型"); //'object'

  const dateObject = new Date(
    "Sat Jul 09 2022 01:02:03 GMT+0800 (中国标准时间)"
  );
  console.log([dateObject]); //"Sat Jul 09 2022 01:02:03 GMT+0800 (中国标准时间)";//因为调用toString()隐式转化了。
  // console.dir(dateObject)//可以看到它就是一个对象。

  console.log(dateObject.getFullYear()); //2022
  console.log(dateObject.getMonth()); //6
  console.log(dateObject.getDate()); //9

  console.log(dateObject.getDay()); //6 [0,6] [周日 到 周一 到 周六]

  console.log(dateObject.getHours()); //1
  console.log(dateObject.getMinutes()); //2
  console.log(dateObject.getSeconds()); //3
  console.log(dateObject.getMilliseconds()); //0

  console.log(dateObject.getTime()); //1657299723000
  console.log(dateObject.toLocaleString()); //2022/7/9 01:02:03
  console.log(dateObject.toLocaleDateString()); //2022/7/9
  console.log(dateObject.toLocaleTimeString()); //01:02:03
```

### 当日静态时间

```js
  function getTimeString() {
    function addZero(num) {
      return num > 9 ? num : `0${num}`;
    }
    const time = new Date();
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const milliseconds = time.getMilliseconds();

    const weekIndex = time.getDay();
    const weeksList = ["日", "一", "二", "三", "四", "五", "六"];
    const day = weeksList[weekIndex];
    const nowTime = `${addZero(year)}年${addZero(month)}月${addZero(
      date
    )}日 ${addZero(hours)}时${addZero(minutes)}分${addZero(
      seconds
    )}秒${addZero(milliseconds)} 周${day}`;
    return nowTime;
  }
  console.log(getTimeString())
```

## 定时器

- 定时器是异步任务，只要当同步代码执行完毕之后，才能执行。
- 定时器的参数说明
  - 定时器可以传递多个参数
    1. 执行的函数
    2. 时间
    3. 后面的参数就是执行函数在执行的时候传递的实参
- setInterval() 间隔多少时间后，去执行某些事情，是多次调用

    ```js
      // setInterval(function(){},1000)

      const timer1 = setInterval(() => {
        console.log("setInterval()，每过一次时间间隔就执行一次", 1);
      }, 1000);

      const theFunction = () => {
        console.log("定时器可以传递多个参数：1、执行的函数 2、时间 3、后面的参数就是执行函数在执行的时候传递的实参 定时器是有返回值的，返回值代表定时器处于当前页面中的第几个", 2);
      }
      const timer2 = setInterval(theFunction, 1000);
    ```

- setTimeout() 一定的时间后，去执行某些事情，是单次调用

    ```js
      // setTimeout(function(){},1000)

      const timer2 = setTimeout(() => {
        console.log("setTimeout()，第一次时间执行一次，之后都不再执行", 1);
      }, 1000);

      const theFunction = (arg1,arg2) => {
        console.log("定时器可以传递多个参数", arg1,arg2);//"定时器可以传递多个参数",'入参一','入参二'
      }
      const timer2 = setTimeout(theFunction, 1000,'入参一','入参二');
    ```

- 每个定时器都会返回一个定时器编号
  - 返回值代表当前定时器是当前页面中的第几个定时器
    - 定时器编号是延时定时器与重复执行定时器共用的。

      - 但清除定时器时，延时定时器与重复执行定时器都各自要调用各自对应的方法
  - 可以用对应的清理定时器的方法来清除该定时器。

      ```js
        const timer1 = setInterval(() => {
          console.log("setInterval()");
        }, 1000);

        const timer2 = setTimeout(() => {
          console.log("setTimeout()");
        }, 1000);

        console.log("timer1--->", timer1);
        console.log("timer2--->", timer2);
        clearInterval(timer1);
        clearTimeout(timer2);
      ```

- 清除定时器
  - clearInterval()
    - 用来`清除setInterval()`所生成的定时器

        ```js
          const timer1 = setInterval(() => {
            console.log("setInterval()");
          }, 1000);
          clearInterval(timer1);
        ```

  - clearTimeout()
    - 用来`清除setTimeout()`所生成的定时器

        ```js
          const timer2 = setTimeout(() => {
            console.log("setTimeout()");
          }, 1000);
          clearTimeout(timer2);
        ```

## 进阶参考

1. [async/await原理揭秘](https://juejin.cn/post/7029324739055190046)
2. [JS中attribute和property的区别 - DOM元素上的属性两种设置方法的区别](https://juejin.cn/post/6863301172606976014)
