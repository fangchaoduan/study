# JavaScript的引入并执行-包含动态引入与静态引入

## JavaScript引入方式

html文件需要引入JavaScript代码，才能在页面里使用JavaScript代码。

### `静态引入`

1. `行内式` 直接在`DOM标签`上使用

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>JavaScript引入方式</title>
    </head>
    <body>
      <div onclick="alert(1111)">行内式</div>
    </body>
    </html>
    ```

2. `内嵌式` 写在`script标签`内

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>JavaScript引入方式</title>
    </head>
    <body>
    </body>
      <script>
        alert('内嵌式')
      </script>
    </html>
    ```

3. `外链式` 通过`script标签`引入`js文件`

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>JavaScript引入方式</title>
    </head>
    <body>
    </body>
    <script src="./index.js"></script>
    </html>
    ```

    与`html文件`同一目录下的`./index.js`:

    ```js
    alert('外链式')
    ```

### `动态引入`

1. 在js运行过程中，构建script标签并插入到DOM文档中，或者通过引用链接，把已经写好的js文件通过script标签并插入到DOM文档。

    - 使用`原生JavaScript`中提供的动态加载`<script>元素`的方法，可以创建 `<script>元素`，并将其添加到 `HTML文档`中，以动态加载`JS文件`或`代码`。
      - 添加方法可以使用
        - `document.body.appendChild(script标签元素);`
        - `document.write()` 如`document.write('<script src="https://example.com/example.js"></script>');`;

      - 手写的js代码

          ```js
          const script = document.createElement("script");
          script.innerHTML = 'console.log("DOM动态创建并运行脚本+预加载优化");';//这些代码可以手动写，也可以用ajax请求并使用。
          document.body.appendChild(script);
          ```

      - 引入外链js代码

          ```js
          setTimeout(() => {
            console.log(1, window.fang);//1 undefined;
            const script = document.createElement("script");
            script.src = "./动态js文件.js";
            document.body.appendChild(script);
            console.log(2, window.fang);//2 undefined;
          }, 0);
          setTimeout(() => {
            console.log(3, fang);//{fang: '方一'};
          }, 3000);
          ```

          同一目录下`动态js文件.js`

          ```js
          console.log("这个就是动态js文件");
          var fang = { fang: "方一" };//{fang: '方一'};
          ```

2. 通过`import()`动态模块。

    - 使用`ES6`中引入的`import()`方法动态加载`JS模块`，该方法可以`在运行时动态地`加载`JS模块`。
      - 引入外链js代码

        ```js
        async function loadJSModule() {
          const module = await import("./动态js模块.js");
          //console.log("module--->", module);
          // 加载成功后可以使用该模块
          module.fang.theFunction();//Symbol(动态js模块里的东西);
        }

        loadJSModule();
        ```

        同一目录下`动态js模块.js`

        ```js
        console.log("这个就是动态js模块");//这个就是动态js模块
        const theSymbol = Symbol("动态js模块里的东西");
        let fang = {
          fang1: "方一",
          theFunction: () => {
            console.log(theSymbol);
          },
        };
        export { fang };
        ```

3. 使用`AJAX技术`加载`JS代码`，可以通过`XMLHttpRequest`或`fetch方法`动态加载`JS代码`，并使用`eval()`或`Function()`方法执行代码。

    - 引入外链js代码

      ```js
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "./动态js文件.js");
      xhr.onload = function () {
        if (xhr.status !== 200) {
          return;
        }
        eval(xhr.responseText);
        //(new Function(xhr.responseText))()
        console.log(3, fang); //{fang: '方一'};
      };
      xhr.send();
      ```

      同一目录下`动态js文件.js`

      ```js
      console.log("这个就是动态js文件");
      var fang = { fang: "方一" };//{fang: '方一'};
      ```
