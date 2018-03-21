// pages/main/main.js
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
    hiddenLoading: false,//显示loading false为显示
    name:"--"//客户姓名


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
      }

    });  
    that.setData({ hiddenLoading:true});
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },

  bindChange2: function (e) {

    var that = this;
    that.setData({ currentTab2: e.detail.current });

  },
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
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  swichNav2: function (e) {

    var that = this;
    console.log(this.data.currentTab2 + "," + e.target.dataset.current)
    if (this.data.currentTab2 === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab2: e.target.dataset.current
      });
    }
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
