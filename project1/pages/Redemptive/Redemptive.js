var util = require("../../utils/util.js");
Page({
  data: {
    leftVolume:'',   //可用份额
    Volume:null,  //赎回份额
    Memo: '',
    F_Jysdm: null,     //基金代码
    F_Name: null       //基金名称
  },
  onLoad: function (options) {
    var parm=JSON.parse(options.parm)
    //设置传入的参数
    this.setData({
      F_Jysdm: parm.f_jysdm,
      F_Name:parm.f_name,
      leftVolume: parm.f_volume
    })
  },
  //判断购买金额是否大于可用份额
  InpuVolume: function (e) {
    this.setData({
      Volume: e.detail.value
    })
  },
  //备注
  InpuBz: function (e) {
    this.setData({
      Memo: e.detail.value
    })
  },

  //发送赎回数据
  SendData: function () 
  {
    //获取页面栈
    var pages = getCurrentPages();
    var prePage = pages[pages.length - 2];

    var that = this;
    wx.showToast({
      title: '提交中...',
      icon: 'loading'
    });
   wx.request({
      url: util.urlstr + '/Ashx/AddAuditTradeList.ashx',
      data: {
        F_Jysdm: that.data.F_Jysdm,
        Volume: that.data.Volume,
        Devi_Type: 1,
        Trade_Type: 5,
        Memo: that.data.Memo.replace(/\s+/g, ''),
        otype: 'insert',
        Account_Id: wx.getStorageSync("accountid")
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync("sessionid")
      },
      success: function (res) {
        if (res.errMsg === 'request:ok') {
          if (res.data == "4") {
            //执行上一页的重载方法
            prePage.ReloadData();
            //后退
            wx.navigateBack({
              delta: -1
            });
          }
          else {
            toast("数据提交失败,请重试");
          }
        }

      },
      fail: function (res) {
        wx.showToast({
          title: "网络异常，请重试!",
          icon: 'loading',
          duration: 3000
        })
      }
    })
  }
})