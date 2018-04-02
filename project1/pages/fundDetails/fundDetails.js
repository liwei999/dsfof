// pages/fundDetails/fundDetails.js
var util=require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    fundDetailsList:[],//持有明细
    xdDetailsList:[],//下单明细
    cjDetailsList: [],//成交明细
    hiddenLoading: true,//页面加载loading true不显示
    currentTab: 0,
    accountid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);
    wx.setNavigationBarTitle({
      title: options.name+"持有的基金",
    });
    that.setData({
      accountid: options.accountid
    });
    that.getdata();
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });

        console.log(that.data.winHeight);
      }

    });
  },
/**
 * 获得数据
 */
  getdata:function(){
    //console.log(acc_id)
    var that = this;
    var otype=2;
    if (that.data.currentTab==0)
    {
      otype=3;
    }
    else if (that.data.currentTab == 1)
    {
      otype = 1;

    }
    
    that.setData({ hiddenLoading: false });
    wx.request({
      url: util.urlstr + '/Ashx/GetAccountTradeList.ashx?otype=' + otype + '&Account_Id=' + that.data.accountid + '&_search=false&nd=' + parseInt(1000 * Math.random()) +'&rows=100&page=1&sidx=f_jysdm&sord=asc&json=1',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.data)
        {
          var tempdata = res.data.data;
          if (tempdata.length>0)
            if (that.data.currentTab == 0)
            {
              that.setData({ fundDetailsList: [] });
              that.setData({ fundDetailsList: that.data.fundDetailsList.concat(tempdata), hiddenLoading: true });
            }
            else if (that.data.currentTab ==1)
            {
              for (var i = 0; i < tempdata.length; i++) {
                if (tempdata[i].Created_Time != "") {
                  var time = (tempdata[i].Created_Time).split(" ");
                  tempdata[i].year = time[0];
                  tempdata[i].times = time[1];
                }
                if (tempdata[i].Audited_Status == "2") {
                  tempdata[i].Audited_type = "确认中";
                }
                else if (tempdata[i].Audited_Status == "1") {
                  tempdata[i].Audited_type = "已确认";
                }
                else {
                  tempdata[i].Audited_type = "待确认";
                }
              }
              console.log(tempdata)
              that.setData({ xdDetailsList: [] });
              that.setData({ xdDetailsList: that.data.xdDetailsList.concat(tempdata), hiddenLoading: true });
            }
            else if (that.data.currentTab == 2)
            {
              that.setData({ cjDetailsList: []});
              that.setData({ cjDetailsList: that.data.cjDetailsList.concat(tempdata), hiddenLoading: true });
            }

        }
      else{
          wx.showToast({
            title: '暂无数据',
            icon: 'none',
            duration: 2000
          });
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
  
  },
  /** 
  * 点击tab切换 
  */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      });
      if ((e.target.dataset.current == 0 && that.data.fundDetailsList.length == 0) || (e.target.dataset.current == 1 && that.data.xdDetailsList.length == 0) || (e.target.dataset.current == 2 && that.data.cjDetailsList.length == 0))
      {
        that.getdata();
      }
     
    }
  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    
    if ((e.detail.current == 0 && that.data.fundDetailsList.length == 0) || (e.detail.current == 1 && that.data.xdDetailsList.length == 0) || (e.detail.current == 2 && that.data.cjDetailsList.length == 0)) {
      that.getdata();
    }
  },
})