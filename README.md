
#### 样式布局
样式布局尽可能使用flex，flex相关的样式在 app.less 中已经写好

使用姿势：
```html
  <view class="flex f-jc-c f-ai-c">
    <view class="flex f-jc-fs f-ai-s"></view>
    <view class="flex f-jc-fs f-ai-s"></view>
  </view>
```

#### 静态文件

除了页面底部的tabbar需要的icon，其他的图片都上传cdn，不要放在项目里面
- https://www.shenfu.online/pic/

iconfont 根据需求协调UI在阿里icon上下载


** tabbar相关配置在 `app.config.json` 中 **


#### 开发前看看

新建项目的时候选择了 TypeScript 支持，鼓励但不强制使用它。但这是一次实践 TS 的好机会。


#### 父子组件传参

父组件中定义事件名称，子组件绑定 `tap` 事件，触发父组件声明的事件即可。(click 不可以)

父组件
```html
  <view :eventName="eventHandler"></view>
```

```js
export default{
  name: 'father',
  methods:{
    childEvent(param){
      this.eventName && this.eventName(param)
    }
  }
}
```

子组件

```html
  <view @tap="childEvent(parma)"></view>
```

```js
  export default{
    name: 'child',
    methods:{
      childEvent(param){
        this.eventName && this.eventName(param)
      }
    }
  }
```