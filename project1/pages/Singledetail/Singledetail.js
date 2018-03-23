// pages/Singledetail/Singledetail.js
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,
    fundDetailsList:[],
    hiddenLoading: false//页面加载loading true不显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
  //that.setData({ hiddenLoading: false });
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winHeight: res.windowHeight,
        });

      }

    }); 

    that.getdata(options.accountid) ;
  },

  /**
 * 获得数据
 */
  getdata: function (acc_id) {
    //console.log(acc_id)
    var that = this;
    that.setData({ hiddenLoading: false });
    wx.request({
      url: util.urlstr + '/Ashx/GetAccountTradeList.ashx?otype=1&Account_Id=' + acc_id + '&_search=false&nd=' + parseInt(1000 * Math.random())+'&rows=100&page=1&sidx=f_jysdm&sord=asc&json=1',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        
        var tempdata = res.data.data;
        if (tempdata.length>0)
        {
          for (var i = 0; i < tempdata.length; i++) {
            if (tempdata[i].Created_Time!="")
            {
              var time = (tempdata[i].Created_Time).split(" ");
              tempdata[i].year = time[0];
              tempdata[i].times = time[1];
            }
            if (tempdata[i].Audited_Status=="2")
            {
              tempdata[i].Audited_type ="确认中";
            }
            else if (tempdata[i].Audited_Status == "1")
            {
              tempdata[i].Audited_type = "已确认";
            }
            else
            {
              tempdata[i].Audited_type = "待确认";
            }
          }
          console.log(tempdata)
          that.setData({ fundDetailsList: that.data.fundDetailsList.concat(tempdata), hiddenLoading: true });

        }
       
      }
      ,
      fail: function (res) {
        that.setData({ hiddenLoading: true });
      },
      complete: function (res) {
        that.setData({ hiddenLoading: true });
      }
    })

  }
  ,

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