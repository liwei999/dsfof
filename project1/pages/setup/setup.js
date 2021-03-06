
Page({
  data: {
    cache: '10.24M',
    QQ: '1994037118',
    version: 'service@dsfof.com'
  },
  onLoad: function() {
    // body...
  },
  netSwitchChange: function(e) {
    console.log(e);
  },
  clearCache: function(e) {
    this.setData({
      cache: '0M'
    });
    wx.showToast({
      title: '缓冲已清除',
      icon: 'success'
    })
  },

  unsubscribeEvent: function (e) {
    var _this = this;
    console.log(e);
    var idx = e.currentTarget.dataset.idx;
    wx.showModal({
      title: '提示',
      content: '确定退出当前账号登录？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
         
          //设置重新载入标记
          var app = getApp();
          getApp().globalData.reload='1'

          wx.redirectTo({
            url: '../login/login',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})