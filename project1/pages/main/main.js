// pages/main/main.js
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /** 
         * 页面配置 
         */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    currentTab2: 0,
    pd:false,
    systemInfo:{},
    hiddenLoading: true,//页面加载loading true不显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
   
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
          systemInfo: res
        });

        console.log(that.data.winHeight, that.data.systemInfo.platform);
        // wx.showToast({
        //   title: '' + that.data.winHeight,
        //   icon: 'succes',
        //   duration: 5000,
        //   mask: true
        // })
      }

    });  
    that.getdata();
  },

  getdata:function () {
    var that = this;
    that.setData({ hiddenLoading: false });
    //console.log(wx.getStorageSync("sessionid")+"sssss");
    wx.request({
      url: util.urlstr + '/Ashx/GetAccountId.ashx?rnddate=443',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie':wx.getStorageSync("sessionid")
      },
      success: function (res) {
        console.log(res.data.data);
        var datatemp = res.data.data;
        //toast(res)
        if (datatemp.length>0)
        {
          wx.setStorageSync('accountid', datatemp[0].Account_Id)
        }
        
      }
      ,
      fail: function (res) {
        that.setData({ hiddenLoading: true });
      },
      complete: function (res) {
        that.setData({ hiddenLoading: true });
      }
    });

  },

  /** 
     * 滑动切换tab 
     */
  // bindChange: function (e) {

  //   var that = this;
  //   that.setData({ currentTab: e.detail.current });

  // },

  // bindChange2: function (e) {

  //   var that = this;
  //   that.setData({ currentTab2: e.detail.current });

  // },
  /**
   * 点击显示或者隐藏
   */
  detailed_showe:function(e)
  {
    var that =this;
    if (that.data.pd)
    {
      that.setData({
        pd:false
      });
    }
    else{
      that.setData({
        pd: true
      });
    }
  },

  /** 
   * 点击tab切换 
   */
  // swichNav: function (e) {

  //   var that = this;

  //   if (this.data.currentTab === e.target.dataset.current) {
  //     return false;
  //   } else {
  //     that.setData({
  //       currentTab: e.target.dataset.current
  //     })
  //   }
  // },
//   swichNav2: function (e) {

//     var that = this;
//     console.log(this.data.currentTab2 + "," + e.target.dataset.current)
//     if (this.data.currentTab2 === e.target.dataset.current) {
//       return false;
//     } else {
//       that.setData({
//         currentTab2: e.target.dataset.current
//       });
//       if (e.target.dataset.current==1)
//       {
//         wx.navigateTo({
//           url: "../Singledetail/Singledetail?accountid=" + wx.getStorageSync("accountid")
//         });
//       }
//       else if (e.target.dataset.current == 2)
//       {
//         wx.navigateTo({
//           url: "../Dealdetail/Dealdetail?accountid=" + wx.getStorageSync("accountid")
//         });

//       }
//     }
//   }
// ,
/**
 * 跳转购买基金1 下单明细2 成交明细为3 clicks
 */
  click_single:function(e){
    if (e.target.dataset.clicks=='1')
    {
      wx.showToast({
        title: '跳转购买',
      });
    }
    else if(e.target.dataset.clicks=='2')
    {
      wx.navigateTo({
        url: "../Singledetail/Singledetail?accountid=" + wx.getStorageSync("accountid")
      });
    }
    else
    {
      wx.navigateTo({
        url: "../Dealdetail/Dealdetail?accountid=" + wx.getStorageSync("accountid")
      });
    }

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

function toast(toast) {
  wx.showToast({
    title: toast,
    duration: 2000
  })
}
