# day-022-twenty-two-20230307-快速排序-插入排序-字符串模版-字符串相关方法-Math相关方法-学习思路

## 快速排序

- 先拿出中间项，然后把此项从数组中删除掉，让数组中的剩余项一一跟这个中间项做比较，新建两个左右数组，如果大的项就放到右数组，如果小的项就放到数组。从左到右返回`递归存放大数的右数组的返回值`用`concat()`把`中间项`及`递归存放小数的左数组的返回值`。

    ```js
      const ary = [5, 4, 3, 2, 1];
      function quicksort(array = []) {
        //停止递归的条件 - 入参数组里面只有1项或者0项，就停止
        if (array.length <= 1) {
          return array;
        }

        //1 拿出中间项，并且删除那一项
        const centerIndex = Math.floor(array.length / 2);//中间项下标
        const centerItem = array.splice(centerIndex, 1)[0];//中间项数值

        //2 创建两个空数组，遍历剩余数组中每一项如果比中间项数值大，那就放右边，比中间项数值小放左边
        const minArray = [];
        const maxArray = [];
        for (let i = 0; i < array.length; i++) {
          const nowItem = array[i];
          if (nowItem < centerItem) {
            minArray.push(nowItem);
          } else {
            maxArray.push(nowItem);
          }
        }
        return quicksort(minArray).concat(centerItem, quicksort(maxArray));
      }
      console.log(quicksort(ary));
    ```

## 插入排序

- 新建一个数组:依次拿出原数组中的每一项往新数组里面插入，插入的时候需要遵循一个规律：
    1. 方向：从右向左
    2. 最终实现的效果，从小到大，在插入的时候，拿出的项从右向左依次比较(新数组)，如果拿出的项大（或者相等），就直接插入首次比它小的后面，
    3. 如果一直比到第一项了，条件还没满足,后面就是最小项，直接放到数组的最前面

        ```js
          // @1 创建一个空数组
          // @2 将原数组的第一项放进新数组里
          // @3 依次拿出原数组的每一项和新数组比较（从后往前比）
          // @4 如果拿出这一项比原数组的某一项（第一次出现）的大，那就放他后面
          // @5 全部比完，还没有大的，那就放在数组开头
          var ary = [11, 7, 12, 46, 35];
          function insertSort(ary) {
            var newAry = [];
            newAry.push(ary[0]);
            for (var i = 1; i < ary.length; i++) {
              var getItem = ary[i];
              for (var j = newAry.length - 1; j >= 0; j--) {
                var newAryItem = newAry[j];
                if (getItem >= newAryItem) {
                  newAry.splice(j + 1, 0, getItem);
                  break;//如果一旦找到，就停止
                }
                if (j === 0) {
                  newAry.unshift(getItem);
                }
              }
            }
            return newAry;
          }
          console.log(insertSort(ary));
        ```

## 字符串

- 用''、""、``包着的就是字符串。

    ```js
      var str1 = 'fang'
      var str2 = "fang"
      var str3 = `fang`
    ```

- 字符串拼接
  - ES6模板字符串

      ```js
        var year = 2023
        var month = 3
        var day = 7
        console.log(year+'年'+month+'月'+day+'日')
        console.log(`${year}年${month}月${day}日`)
      ```

- 字符串取字符
  - 用中括号语法去取

      ```js
      var str = "zhufeng";
      console.log(str[0]);//z
      ```

    - 但不支持用中括号语法去修改值

        ```js
        var str = "zhufeng";
        console.log(str[0]);//z
        str[0] = "c"; //不报错，但str里的值依旧是原来的。不能像数组一样去修改
        console.log(str);
        ```

      - 使用中括号语法去修改单个字符，跃然不报错，但字符串依旧是之前的，并没有被修改。

- 字符串长度
  - 字符串包装对象上有个length属性，里面表示的字符串的字符长度。

      ```js
      console.log('fangchaoduan'.length);//12
      ```

    - `字符长度`不一定等于`字符数`

        ```js
        const emoji = "😄";
        console.log(emoji.length); //2
        ```

### 字符串相关方法

- `charAt(index)` 通过下标去取字符
  - `'fang😄fang fang'.charAt(0)//'f'`
- `charCodeAt(index)` 通过下标取值对应的字符编码
  - `'fang😄fang fang'.charCodeAt(0)//102`
- `indexOf(string,index)` 通过字符片断初次开始的位置
  - `'fang方fang fang'.indexOf('fa',4)//5`
- `lastIndexOf(string,index)` 通过字符片断最后一次开始的位置
  - `'fang方fang fang'.lastIndexOf('fa',13)//10`
- `slice(start,endLength)` 查找字符串中特定位置的字符
  - `'fang方fang fang'.slice(4,-2)//'方fang fa'`
  - 字符串''在控制台选不到
  - 字符串'   '虽然看不到但可以在控制台上选到
- `substring()`
  - `'fang方fang fang'.substring(4,11)//'方fang f'`
  - `substring()`和`slice()`基本都一样，唯一不同在于，`substring()`不支持负数索引，而`slice()`支持负数索引
- `substr(n,m)` 从`索引n`开始`截取m个字符`
  - `'fang方fang fang'.substr(4,4)//'方fan'`
- `toUpperCase()` 把字符串转换为大写
  - `'fang方fang Fang'.toUpperCase()//'FANG方FANG FANG'`
- `toLowerCase()` 把字符串转换为小写
  - `'fang方fang Fang'.toLowerCase()//'fang方fang fang'`
- `replace()` 把字符串中某部分的字符替换成另一部分字符
  - `'fang方fang Fang'.replace('fang','方朝端')//'方朝端方fang Fang'`
  - 多次调用，重复替换
    - `'fang方fang Fang'.replace('fang','方朝端').replace('fang','方朝端')//'方朝端方方朝端 Fang'`
    - 链式调用
  - 配合正则去使用
- `split()` 按照指定的字符把字符串分割成数组
  - `'fang方fang Fang'.split('fa')//['', 'ng方', 'ng Fang']`

## 示例

### 字符串转化日期

```js
  var str = "2008-8-8 8:8:8";
  const transformTime = (time = "2019-8-18 12:32:18") => {
    function addZero(num) {
      return num < 10 ? "0" + num : num;
    }

    const before = time.split(" ")[0].split("-");
    const after = time.split(" ")[1].split(":");
    const res = `${before[0]}年${addZero(before[1])}月${addZero(
      before[2]
    )}日 ${addZero(after[0])}时${addZero(after[1])}分${addZero(after[2])}秒`; //2019年08月18日 12时32分18秒
    return res;
  };
  console.log(transformTime(str));
```

### 字符串转化URL

```js
  var str = "https://www.baidu.com?name=zhufeng&age=10&id=14";
  var transformUrl = (url) => {
    var queryString = url.split("?")[1];
    var queryList = queryString.split("&");
    const res = {};
    for (let i = 0; i < queryList.length; i++) {
      const query = queryList[i].split("=")
      const key = query[0];
      const value = query[1];
      res[key] = value;
    }
    return res;
  };
  console.log(transformUrl(str));
```

## Math方法

- `Math.abs(num)` num求绝对值 不管正数还是负数，结果都是对应的正数
  - Math.abs(-5.3)//5.3
- `Math.floor(num)` num向下取整，不管正数还是负数，都是取小的
  - Math.floor(5.91)//5
- `Math.ceil(num)` num向上取整，无论是正数还是负数，都取最大的值
  - Math.ceil(5.01)//6
- `Math.round(num)` num四舍五入
  - 如果是负数，小数的临界值一定要大于`0.5`才会变成`被舍入`
    - `Math.round(-1.3)//-1`
    - `Math.round(-1.5)//-1`
    - `Math.round(-1.51)//-2`
    - `Math.round(-1.6)//-2`
- `Math.sqrt(num)` num开平方，即返回值为根号num
  - `Math.sqrt(81)//9`
- `Math.pow(num,power)` num取power幂，即返回值为num的power次方
  - 只有一个入参时会返回NaN
  - 两个入参才正常显示多少次方
    - `Math.pow(4)//NaN`
    - `Math.pow(4,2)//16`
    - `Math.pow(4,3)//64`
  - ES6简写 `**`;
    - `4**2//16`
- `Math.PI` 取π值，不是一个方法，是一个属性。
- `Math.max()` 获取最大值
  - `Math.max(12,3,6,15,5,8,9)//15`
  - 配合`扩展运算符...`取数组中的最大值

- `Math.min()` 获取最小值
  - `Math.min(12,3,6,15,5,8,9)//3`
  - 配合`扩展运算符...`取数组中的最小值

- `Math.random()` 范围在`[0,1)`的`随机小数`，`包括0`但`不包含1`。
  - `min-max之间`的`随机小数`
    - `Math.random()*(max-min)+min`
      - `Math.random()*(10-5)+5//范围在[5,10)的随机小数`
  - `min-max之间`的`随机整数`
    - `Math.floor(Math.random()*(max-min+1)+min)`
      - `Math.floor(Math.random()*(10-5+1)+5)//范围在[5,10]的随机整数`

### 案例

#### 点击按钮切换背景

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

#### 得到不同的随机数验证码

每执行一次，就能得到一个四位的随机数，随机数里的字符不能重复

```js
var str = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
function randomCode(numLength = 4, string = "0123456789", isRepeat = false) {
  const chars = string.split("");

  const newList = [];
  for (; newList.length < numLength; ) {
    const num = Math.floor(Math.random() * (chars.length - 1 - 0 + 1) + 0);
    if (isRepeat || !newList.includes(chars[num])) {
      newList.push(chars[num]);
    }
  }

  let res = newList.join("");
  return res;
}
console.log(randomCode(4, str));
```

## 学习

- 理解案例
  1. 看别人写的源码，自己写注释
  2. 把别人源码去掉，留下注释，自己来写
  3. 把注释去掉，自己默写
  4. 几天之后，自己独立写

## 进阶参考

1. [Math.random()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
