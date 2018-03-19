
Page({
  data: {
    cache: '10.24M',
    tel: '028-86263615',
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
  }
})