<template>
  <wx-open-launch-weapp
      id="launch-btn"
      username="gh_xxxxx"
      path="pages/index.html"
      @launch="handleLaunchFn"
      @error="handleErrorFn"
  >
    <script type="text/wxtag-template">
      <style>.btn { display: flex;align-items: center;width: 100px;height: 100px }</style>
      <button class="btn">跳转小程序</button>
    </script>
  </wx-open-launch-weapp>
</template>

<script>
import  wx from "weixin-js-sdk";
import axios from "axios";
export default {
  name: "JumpTo",
  methods: {
    handleLaunchFn (e) {
      console.log(e)
    },
    handleErrorFn(e){
      console.log('fail', e.detail);
    },
    init(){
      // 获取密钥
      // var currentUrl = window.location.origin+window.location.path+location.query;
      let url=window.location.href
      axios.get("/api/wx/jsapi/getJsapiTicket?appId=wxa74b9eab38c273fe&url="+encodeURIComponent(url)).then(res=>{
        let {appId,nonceStr,signature,timestamp} = res.data
        wx.config({ // eslint-disable-line
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
          appId, // 必填，公众号的唯一标识
          timestamp, // 必填，生成签名的时间戳
          nonceStr, // 必填，生成签名的随机串
          signature,// 必填，签名
          jsApiList: ['updateAppMessageShareData'], // 必填，需要使用的JS接口列表
          openTagList: ['wx-open-launch-weapp'] // 可选，需要使用的开放标签列表，例如['wx-open-launch-app']
        });
        wx.ready(function () {
          console.log('微信配置成功')
          wx.updateAppMessageShareData({
            title: '分享给你的朋友吧', // 分享标题
            desc: '就这么分享的', // 分享描述
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
            success: function () {
              // 设置成功
            }
          })
        });
        wx.error(function () {
          console.log('微信配置失败')
        });
      })
    }
  },
  created() {
    this.init();
    /* const oScript = document.createElement('script');
     oScript.type = 'text/javascript';
     oScript.src = 'https://res2.wx.qq.com/open/js/jweixin-1.6.0.js';
     oScript.onload = this.wxmini
     document.body.appendChild(oScript);*/
  },
}

</script>

<style scoped>

</style>
