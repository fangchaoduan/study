# day03学习

## 思考

### 关于列表布局

如果遇到类似于item的，最好优先使用列表布局，如ul>li与ol>li与dl>dt/dd这类，或者直接全部div。

### 布局结构

- margin : `margin-top`,`margin-right`,`margin-bottom`,`margin-left`;
- border : `border-top`,`border-right`,`border-bottom`,`border-left`;
- padding : `padding-top`,`padding-right`,`padding-bottom`,`padding-left`;
- width与height : 里面包含内容区，内容区包含多行行间元素(行内元素及行内块元素);

### 元素之间的间隙

元素之间的间隙实际上是源代码中换行符在浏览器中显示为换行符，而换行符在浏览器中会显示为空白字符。

- 解决方式，在父级上设置font-size为0，之后在元素自身设置字体真正的font-size。

### white-space文字是否换行

### overflow内容溢出内容区后如何处理

overflow设置了元素溢出时所需的行为——即当元素的内容太大而无法适应它的块级格式化上下文时。

### visilibity是否隐藏

### opacity透明度

### css选择器

在style样式里，大括号前面的都叫选择器

#### 基础选择器

##### 通配符选择器

- `*{}`，表示所有的元素。

##### 标签选择器

- `标签名{}`，表示标签名对应的元素。

##### 类选择器

- `.类名{}`，class中包含该类名的元素。

- 与标签的关系是多对多。
- 标签class属性中多个类名之间用空格隔开。

##### id选择器

- `#id名{}`，id属性为该id名的元素。

- 具有唯一性，如果有同名id，那么仅会在第一个id时生效。

##### 属性选择器

- [属性名]，如：[id]，只要有id属性就能选中。
- [属性名="属性值"]，如：[id="fang"]，只要有id属性就能选中。

#### 复杂选择器

##### 子代选择器

- 父代>自己标识{}

##### 后代选择器

- 直系祖先 自己标识{}

##### 下面相邻兄弟选择器

前置兄弟+自己标识{}

##### 通用兄弟选择器

前置兄弟+自己标识{}

##### 群组选择器

又叫逗号选择器或和选择器。

- 选择器A,选择器B,选择器C{}

##### 交集选择器

选择器A选择器B{}

#### 伪类选择器

##### a标签相关

- `a:link` 有href属性并且该href属性并没有被访问过。
- `a:hover` 鼠标悬浮到元素上面时的状态，这个不只a标签可以用。
- `a:visited` 链接访问过后的状态。
- `a:active` 被激活状态。

#### 其它常见伪类

- `div:hover` 鼠标悬浮到元素上面时的状态。
- `input:focus` 元素自身获取到焦点后的状态，此伪类仅适用于焦点元素本身。

#### CSS样式的优先级

- 同一个选择器权重相同，下面的覆盖掉上面的，层叠性。
- 不同选择器权重不同时，以权重高的为准。
  - `浏览器默认自带值`<`继承`<`通配符选择器*`<`标签选择器`、`伪元素选择器`<`类选择器`、`属性选择器`、`伪类选择器`<`ID选择器`<`行内式`<`!important`。

#### 继承性

### 常用类型

#### cursor设置光标的类型

- 设置自定义图标。

  ```css
  .class3{
    cursor: pointer;
  }
  ```

- 引入第三方图标。

  ```css
  .class3{
    cursor: url(./arrow.cur) 6 9, pointer;/* 这个arrow.cur是从网上找的，浏览器一般仅支持cur或svg。 */
  }
  ```

#### user-select元素内文本是否可选中

- user-select元素内文本是否可选中

## 进阶参考

1. [利用Css3样式属性Cursor来更换自定义个性化鼠标指针(光标)](https://juejin.cn/post/6844904102124584967)
2. [CSS样式优先级](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity#%E4%BC%98%E5%85%88%E7%BA%A7%E6%98%AF%E5%A6%82%E4%BD%95%E8%AE%A1%E7%AE%97%E7%9A%84%EF%BC%9F)
