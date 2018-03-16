//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  onLoad: function () {
    setTimeout(function(){
      wx.redirectTo({
        url: '../login/login',
      })
    },1000)
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
