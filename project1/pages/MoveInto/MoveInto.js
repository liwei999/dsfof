// pages/MoveInto/MoveInto.js
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    F_Jysdm:'',//基金代码
    F_Name: '',//基金名称
    MaximumVolume: '',//可转最大份额
    intoMoney: '',//转出份额
    Memo:'',//操作备注
    funds: [],//转投基金
    fundIndex:0//转投基金下标
  },
  //判断转出份额是否大于最大份额
  InpuVolume: function (e) {
    console.log(e.detail.value, this.data.MaximumVolume);
    
    if (parseFloat(e.detail.value) > parseFloat(this.data.MaximumVolume)) {
      // wx.showToast({
      //   title: '不能超过最大可转份额!',
      // });
      this.setData({
        intoMoney: ""
      });
    }
    else {
      this.setData({
        intoMoney: e.detail.value
      });
    }

  },
  //备注
  InpuBz: function (e) {
    this.setData({
      Memo: e.detail.value
    })
  },
  //绑定转投基金
  bindfund:function(e)
  {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      fundIndex: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var parm = JSON.parse(options.parm)
    this.setData({
      F_Jysdm: parm.f_jysdm,
      F_Name: parm.f_name,
      MaximumVolume: parm.f_volume,
      funds:[]
    });
    this.getFundData(parm.f_jysdm);
  },
  /**
   * 获得转投基金
   */
  getFundData: function (f_jysdm) {
    var that = this;
    wx.request({
      url: util.urlstr + 'ashx/GetCompanyFundList.ashx?f_jysdm='+f_jysdm+'&dt=' + parseInt(1000 * Math.random()) +'&json=1&isMobile=1',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        var tempdata = res.data.data;
        if (tempdata.length > 0) {
          that.setData({ funds: that.data.funds.concat(tempdata) });
        }
      }
      ,
      fail: function (res) {
        util.toast("请求失败！");
      },
      complete: function (res) {

      }
    });

  },

  //发送购买数据
  SendData: function ()  //修改密码
  {
    var pages = getCurrentPages();
    var prePage = pages[pages.length - 2];
    var that = this;
    if (that.data.intoMoney == "") {
      util.toast("请输入转出份额！");
      return;
    }
    if (parseFloat(that.data.intoMoney) <= 0) {
      util.toast("转出份额不能小于或者等于0!");
      return;
    }
    wx.showToast({
      title: '提交中...',
      icon: 'loading'
    });
    wx.request({
      url: util.urlstr + '/Ashx/AddAuditTradeList.ashx',
      data: {
        F_Jysdm: that.data.F_Jysdm,
        F_ToJysdm: that.data.funds[that.data.fundIndex].F_JYSDM,
        Volume: that.data.intoMoney,
        Devi_Type: 1,
        Trade_Type: 11,
        Memo: that.data.Memo,
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
            //关闭窗口，更新主界面数据
            util.toast("添加成功");
            //执行上一页的重载方法
            prePage.ReloadData();
            //后退
            wx.navigateBack({
              delta: -1
            });
            // that.get_information();
            // that.setData({ buyMoney: "", Memo: '', inputVal: "", jysdm: "", fundList: []});
          }
          else {
            util.toast("数据提交失败,请重试");
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})