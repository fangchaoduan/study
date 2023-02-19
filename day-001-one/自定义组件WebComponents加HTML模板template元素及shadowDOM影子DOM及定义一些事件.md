# 自定义组件WebComponents加HTML模板template元素及shadowDOM影子DOM及定义一些事件

- `Web Components` 自定义组件，可以自定义一个类似于div的元素，里面的事件可以自定义。
- `template元素` HTML模板，可以把一堆的DOM元素放到一起。
- `shadow DOM` 影子DOM，可以在一个元素内放置独属于自己的元素，可配合slot标签做插槽。
  - `shadowRoot`相当于一个阉割的`document`，但它只有独立的`css作用域`而没有独立的`js作用域`。

## 加了一些事件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>WebComponents浏览器原生组件</title>
  </head>
  <body>
    <template id="outTemplate">
      <div>位于自定义组外的HTML无主模版1</div>
      <div>div2</div>
    </template>

    <my-web-component fang="test">
      自定义组件默认插槽内容

      <template> 默认插槽内容 </template>

      <template id="innerTemplate">
        <p>位于自定义组件中的HTML无主模版2</p>
        <div>div2</div>
      </template>

      <template slot="name2-slot">
        <span>name2-slot插槽内容</span>
      </template>

      <h3 slot="name1-slot">name1-slot插槽内容</h3>
    </my-web-component>
    <div>原生div元素</div>
    <span>原生span元素</span>
  </body>

  <script>
    //初始化自定义组件的值。
    class MyWebComponent extends HTMLElement {
      constructor() {
        super();

        this.组件自定义变量 = "初始值";
        console.log("在自定义组件整个生命周期中只会被触发一次。", this);

        this.num = 0;
        //监听事件，并修改自定义事件。实际上可以创建生命周期函数。
        this.addEventListener("click", () => {
          this.num++;
          console.log(this.num);
        });

        this.自定义组件私有方法 = (event) => {
          console.log("自定义组件私有方法", event);
        };
        //设置影子DOM
        const js写的HTML模板 = document.createDocumentFragment(); //手动创建一个template元素。
        js写的HTML模板.appendChild(document.createElement("div"));
        js写的HTML模板.querySelector("div").innerHTML = `
          <p>p1</p>
          <p>自定义组件中用js写的自定义HTML模板中插入的p元素中文本</p>
        `;
        console.log("js写的HTML模板-->", js写的HTML模板);

        const 影子DOM根节点open型 = this.attachShadow({ mode: "open" }); //获取open型的当前组件的影子DOM根节点。
        影子DOM根节点open型.innerHTML = `
          <h1 onclick="console.log('点击了影子DOM中的标题',[this],[event.target],[event])">影子DOM中的标题</h1>

          <p onclick="event.target.getRootNode().host.自定义组件私有方法(event)">直接在dom中调用自定义组件私有方法-影子DOM中的p元素</p>
          <div class="slot">
            <span>默认插槽1</span>
            <slot>默认插槽slot空的默认值</slot>
          </div>
          <div class="name1-slot">
            <span>具名插槽1</span>
            <slot name="name1-slot">具名插槽slot name="name1-slot"的默认值</slot>
          </div>

          <div class="default-slot">
            <span>默认插槽2</span>
            <slot name="default">默认插槽slot name="default"的默认值</slot>
          </div>
          <div class="name2-slot">
            <span>具名插槽2</span>
            <slot name="name2-slot">具名插槽slot name="name2-slot"的默认值</slot>
          </div>

          <div onclick="自定义组件私有方法(event.target,'点击了影子DOM中的div元素1')">影子DOM中的div元素1</div>

          <div class="last-div">影子DOM中的div元素2</div>

          <style>
            div{border: 1px solid rgb(255,255,0);}
            p{font-size:20px;font-weight:100;}
            .slot{color:red}
            .default-slot{color:green}
            .name1-slot{color:blue}
            .name2-slot{color:pink}
            .last-div{cursor:pointer}
          </style>

          <script>
            //不执行这些代码
            var 影子DOM内自定义方法 = (event,说明=''){
              console.log(说明, event)
            }
            影子DOM内自定义方法('影子DOM内自定义方法')
          <\/script>
        `;
        this.shadowRoot.appendChild(js写的HTML模板); //设置了this.attachShadow()后this.shadowRoot才有值。
        const 影子DOM事件方法 = (event) => {
          console.log("自定义组件专属函数", event);
        };
        this.shadowRoot
          .querySelector(".last-div")
          .addEventListener("click", 影子DOM事件方法);
        console.log("影子DOM根节点open型-->", 影子DOM根节点open型);
      }

      自定义组件上的自定义方法(event, 说明 = "") {
        console.log(说明, event);
      }

      connectedCallback(event) {
        console.log("组件被加到DOM上或在节点树中移动时触发。", event);
      }
      disconnectedCallback(event) {
        console.log("当组件被从DOM上移除时触发。", event);
      }
      adoptedCallback(event) {
        console.log("组件被document.adoptNode()移动到新文档时触发", event);
      }
      attributeChangedCallback(name, oldValue, newValue) {
        console.log("当组件的attribute改变时触发", name, oldValue, newValue);
      }

      observedAttributes(value) {
        console.log("observedAttributes()，在这里返回自定义元素的属性", value);
        console.log("this.组件自定义变量--->", this.组件自定义变量);
        return ["fang"];
      }

      get fang() {
        console.log(value, "get fang()", this.组件自定义变量);
        this.getAttribute("fang") || "";
      }
      set fang(value) {
        console.log(value, "get fang()", this.组件自定义变量);
        this.组件自定义变量 = "初始值" + value;
        this.setAttribute("fang", value);
      }
    }

    //注册自定义组件;
    window.customElements.define("my-web-component", MyWebComponent);
  </script>
</html>

```

## 参考

1. [Web组件API -- 自定义组件要看](https://blog.csdn.net/weixin_46215920/article/details/121312340)
2. [原生js也可以自定义组件](https://www.cnblogs.com/yuwenxiang/p/14345325.html)
3. [深入理解Web Components](https://blog.csdn.net/qwe435541908/article/details/117133943)
4. [Web Components-MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)
5. [HTML Imports - 在当前文档中导入html文档并使用其中的一部分](https://www.cnblogs.com/zoucaitou/p/4377763.html)
6. [利用废弃的html rel import实现页面include功能 - 就是用自定义组件来实现](https://www.zhangxinxu.com/wordpress/2021/07/html-rel-import-include/)
7. [HTMLUnknownElement与HTML5自定义元素的故事 - 自定义组件的来源](https://www.zhangxinxu.com/wordpress/2018/03/htmlunknownelement-html5-custom-elements/)
8. [HTMLUnknownElement - 无效的HTML元素 - MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLUnknownElement)
9. [影子DOM v1: 自足的Web组件 - 关于一个web组件的详细讲解](https://juejin.cn/post/6870078647416553479)
10. [`<slot>` - MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/slot)
11. [把富文本封装在 shadow DOM 中，要注意些啥？ - shadowRoot 相当于一个阉割的 document，但它只有独立的 css 作用域而没有独立的 js 作用域](https://juejin.cn/post/6999854478778171405)
12. [使用 shadow DOM - MDN](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_shadow_DOM)
13. [html通过模板字符串写入script标签](https://blog.csdn.net/q879936814/article/details/121161567)
14. [原生js绑定事件的方法和dom操作](https://blog.csdn.net/weixin_58385666/article/details/126850874)
15. [shadow DOM的介绍和使用](http://qiutianaimeili.com/html/page/2020/12/2053mnie8tf0ofe.html)
16. [影子节点ShadowDOM  -- 自定义组件要看](https://juejin.cn/post/6844903506801852429)
