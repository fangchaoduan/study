# day-021-twenty-one-20230306-数组去重-冒泡排序-递归-快速排序-Math.floor

## 复习

要记参数，记方法没什么用。

- ary.push(40,50)
- ary.pop()
- ary.unshift(-10,0)
- ary.shift()
- ary.reverse()
- ary.sort()
- ary.splice(ary.length,0,40,50)
- ary.slice(0,ary.length)
- ary.toString()
- ary.concat(10,[20,30],40)
- ary.join(',')
- ary.indexOf(10,0)
  - 查找第一次出现的位置
  - 第二个参数是开始查找的位置
- ary.laseIndexOf(10,3)
  - 查找最后一次出现的位置
  - 第二个参数是结束查找的位置
- ary.includes(10)

- 所有负值，都可以认为加上一次数组长度length;

## 基础算法

### 数组去重

- 做两个for循环，依次拿出数组的中的每一项，和后面的所有项进行比较，如果有相同的就删除。
  - 第一个for循环取出一个值，用于比对。
  - 第二个for循环从第一个for循环索引的后一项开始，依次遍历。
  - 第一个for循环中的每一项与第二个for循环的每一项分别进行比对，如果有相同的就删除。
    - 由于删除时，会改变原数组，需要修复原数组的角标。

          ```js
            const ary = [0,1,1,1,2,,2,2,3,4,4,4,4,5,5,,5];
            const deweightingArray = function (theArray = []) {
              for (let i = 0; i < theArray.length; i++) {
                const getItem = theArray[i]//第一个for循环取出一个值，用于比对。

                //第二个for循环从第一个for循环索引的后一项开始，依次遍历。
                for (let j = i + 1; j < theArray.length; j++) {

                  const remainItem = theArray[j]

                  //第一个for循环中的每一项与第二个for循环的每一项分别进行比对，如果有相同的就删除。
                  if (getItem === remainItem) {
                    theArray.splice(j, 1);


                    //由于删除时，会改变原数组，需要修复原数组的角标。
                    j=j-1; 
                  }
                }
              }
              return theArray;
            };
            console.log(deweightingArray(ary));
          ```

- 利用对象属性名不重复的思想，先建立一个空对象，然后依次循环数组中的每一项，把此项作为obj对象的属性名和属性值，在添加的时候，如果这个属性名对应的值已经存在，说明此项重复，删除掉此项
  - 先建立一个`空对象obj`
  - 依次循环`数组`中的每一项，做一个判断`该空对象obj`是否存在`与该数组项值一样的属性名`
    - 如果不存在，把`该数组项值`作为`该空对象`的`属性名`,`该空对象`的`属性值`只要不为`undefined`就可以了
    - 如果存在，在`数组`删除掉`该数组项`

          ```js
            const ary = [0, 1, 1, 1, 2, , 2, 2, 3, 4, 4, 4, 4, 5, 5, , 5];
            const deweightingArray = function (theArray = []) {
              const obj = Object.create(null);
              for (let i = 0; i < theArray.length; i++) {
                if (obj[theArray[i]] === undefined) {
                  obj[theArray[i]] = i;
                } else {
                  theArray.splice(i, 1);
                  i = i - 1;
                }
              }
              return theArray;
            };
            console.log(deweightingArray(ary));
          ```

    - 使用splice()删除了某些角标对应的数组项，会导致数组塌陷。
      - 对于数组塌陷，数组中后面所有项的角标都要依次改变。

    - 对于数组塌陷，数组中后面所有项的角标都要依次改变，这样比较耗性能，怎么优化呢？
      - 可以让后面的索引值不变，这样就可以省性能。
          1. 把最后一项的值拿过来，占位到塌陷的此项。
          2. 把最后一项删除。
          3. 此时当前项的值变成了最后一项的值。
        - 如果在循环中，最后一项也需要比较所以还需要循环的角标位置进行减1。
        - 如果在判断语句中，当前项的值也需要进行一次处理。
      - 或者是当前项处理设置为undefined等不影响数组的占位。
    - 优化示例:

          ```js
            const ary = [0, 1, 1, 1, 2, , 2, 2, 3, 4, 4, 4, 4, 5, 5, , 5];
            const deweightingArray = function (theArray = []) {
              const obj = Object.create(null);
              for (let i = 0; i < theArray.length; i++) {
                if (obj[theArray[i]] !== undefined) {
                  // theArray.splice(i, 1, theArray[theArray.length - 1]);
                  theArray[i] = theArray[theArray.length - 1];//当前项是重复项，本来需要删除。但如果删除了之后，它后面每一项的角标都会改变。所以就把最后一项的值放到当前项里。 
                  theArray.length = theArray.length - 1;// 最后一项的值已经放到当前项里了。最后一项已经变得多余，所以删除掉最后一项。

                  i = i - 1;// 此时占位的这一项的值已经变成了之前最后一项的值，导致还没有通过上方的if语句进行比较，所以需要i--,再重新比较一次。
                  continue;//已经删除了，所以跳过本轮循环，进行下一轮。
                }

                obj[theArray[i]] = i;
              }
              return theArray;
            };
            console.log(deweightingArray(ary));
          ```

- 数组的indexOf()等方法
  - 思路: 创建一个新数组，遍历原数组，如果新数组中没有那一项的话，就把它push()进去。结束遍历原数组之后，新数组就有了去重后的新数组。

        ```js
          const ary = [0, 1, 1, 1, 2, 3, undefined, 2, 3, 4, 4, 4, 4, 5, 5, , 5];
          const deweightingArray = function (theArray = []) {
            const newArray = [];
            for (let i = 0; i < theArray.length; i++) {
              if (!newArray.includes(theArray[i])) {
                newArray.push(theArray[i]);
              }
            }
            return newArray;
          };
          console.log(deweightingArray(ary));
        ```

### 冒泡排序

- 思路: 用两个for循环，第一个for循环用于得到从最后开始第length-1-i项为本轮次遍历过的最大的值。第二个for循环依次拿出数组中的每一项给后面的一项做对比,如果当前项比后面的项大就交换位置，之后用后方位置的那一项来对比。

      ```js
      const array = [4, 3, 2, 1];
      const bubbleSort = (array = []) => {
        console.log(`开始 = ${array}`)
        for (let i = 0; i < array.length; i++) {
          for (let j = 0; j < array.length - 1; j++) {
            if (array[j] > array[j + 1]) {
              const max = array[j];
              array[j] = array[j + 1];
              array[j + 1] = max;
            }
            console.log(`i:${i}-j:${j} = ${array}`)
          }
          
          console.log(`第${i+1}外轮 = ${array}`)
        }
        console.log(`结束 = ${array}`)
        return array;
      };
      console.log(bubbleSort(array));
      ```

  - 优化:
    - 第一轮for循环，`最后一轮i=array.length-1`必定已经是从小到大了。
    - 第二轮for循环，`数组`里从`倒数第array.length - 1-i项`已经是之前冒泡过了的，故而可以忽略不用再进行比对。

          ```js
          const array = [4, 3, 2, 1];
          const bubbleSort = (array = []) => {
            console.log(`开始 = ${array}`)
            for (let i = 0; i < array.length-1; i++) {
              for (let j = 0; j < array.length - 1-i; j++) {
                if (array[j] > array[j + 1]) {
                  const max = array[j];
                  array[j] = array[j + 1];
                  array[j + 1] = max;
                }
                console.log(`i:${i}-j:${j} = ${array}`)
              }
              console.log(`第${i+1}外轮 = ${array}`)
            }
            console.log(`结束 = ${array}`)
            return array;
          };
          console.log(bubbleSort(array));
          ```

### 递归

- 定义: 函数内部自己调用自己

      ```js
      function fn(num){
        fn(num-1)
      }
      fn(10)
      ```

  - 示例:
    - 打印1到10

          ```js
          function fn(num){
              if(num>10){
                  return 
              }
              console.log(num); 
              fn(num+1);  
          }
          fn(1)
          ```

    - 求一个1到100的所有数之和

          ```js
            function add(num) {
              if (num <= 0) {
                return 0;
              }
              return num + add(num - 1);
            }
            console.log(add(10));
          ```

      - 优化

            ```js
            function add(num, start = 0) {
              if (start >= num) {
                return 0;
              }
              const next = start + 1;
              return console.log(55555), start + add(num, next);
            }
            console.log(add(11));
            ```

    - 求1到100中同时能被2整除又能被3整除的所有数之和

          ```js
          function sumFunction(min, max) {
            let sum = 0;
            for (let i = 0; i <= max; i++) {
              if (i % 2 === 0 && i % 3 === 0) {
                sum = sum + i;
              }
            }
            return sum;
          }
          console.log(sumFunction(1, 100));
          ```

          ```js
          function recursion(min = 0, max = 100) {
            if (min > max) {
              return 0;
            }

            if (min % 2 === 0 && min % 3 === 0) {
              return min + recursion(min + 1);
            }

            return 0 + recursion(min + 1);
          }
          console.log(recursion(1));
          ```

### 快速排序

- 先拿出中间项，然后把此项从数组中删除掉，让数组中的剩余项一一跟这个中间项做比较，新建两个左右数组，如果大的项就放到右数组，如果小的项就放到数组。从左到右返回`递归存放大数的右数组的返回值`用`concat()`把`中间项`及`递归存放小数的左数组的返回值`。
  - 先确定递归的结束条件。
  - 拿出中间项，然后把此项从数组中删除掉。
    - 新建两个左右数组。
    - 让数组中的剩余项一一跟这个中间项做比较。
      - 如果大的项就放到右数组。
      - 如果小的项就放到左数组。
    - `从左到右`返回`递归存放大数的右数组的返回值`用`concat()`把`中间项`及`递归存放小数的左数组的返回值`。

          ```js
            const ary = [5, 4, 3, 2, 1];
            function quicksort(array = []) {
              if (array.length <= 1) {
                return array;
              }

              const centerIndex = Math.floor(array.length / 2);
              const centerItem = array.splice(centerIndex, 1)[0];
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

## Math.floor()

- Math.floor() 函数总是返回小于等于一个给定数字的最大整数。

      ```js
      console.log(Math.floor(5.95));//5

      console.log(Math.floor(5.05));//5

      console.log(Math.floor(5));//5

      console.log(Math.floor(-5.05));//-6
      ```

## 进阶参考

1. [{}、new Object()、Object.Create(null) 创建对象的区别](https://blog.csdn.net/alokka/article/details/110523850)
2. [和女生聊天话题100句 - 聊天语料构造思路](http://www.cengji.com/a/nt/254.html)
