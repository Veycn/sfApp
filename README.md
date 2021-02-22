
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

iconfont 根据需求协调UI在阿里icon上下载


** tabbar相关配置在 `app.config.json` 中