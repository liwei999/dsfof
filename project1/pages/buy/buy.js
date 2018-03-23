var util = require('../../utils/util.js');
Page({
  data: {
    leftMoney:10000,   //可用余额
    buyMoney:0,
    Memo:''     
  },
  //判断购买金额是否大于可用余额
  InpuBuyMoney: function (e) {
    this.setData({
      buyMoney: e.detail.value 
    })   
  },
  //备注
  InpuBz: function (e) {
    this.setData({
      Memo: e.detail.value
    })
  },
  //发送购买数据
  SendData: function ()  //修改密码
  {
    var that = this;
    wx.showToast({
      title: '提交中...',
      icon: 'loading'
    });
    wx.request({
      url: util.urlstr + '/Ashx/AddAuditTradeList.ashx',
      data: {
        F_Jysdm:'000477',
        Amount: this.data.buyMoney,
        Devi_Type:1,
        Trade_Type:1,
        Memo: this.data.Memo,
        otype:'insert',
        Account_Id:'2407'
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync("sessionid")
      },
      success: function (res) {
        if (res.errMsg === 'request:ok') {
          if (res.data == "4") {
            //关闭窗口，更新主界面数据
            wx.redirectTo({
              url: '../login/login',
            });
          }
          else {
            toast("数据提交失败,请重试");
          }
        }

      },
      fail: function (res) {
        wx.showToast({
          title: "网络异常，请重试",
          icon: 'loading',
          duration: 3000
        })
      }
    })
  },

})
