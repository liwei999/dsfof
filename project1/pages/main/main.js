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
    pd:-1,//0默认展开第一项
    systemInfo:{},
    hiddenLoading: false,//页面加载loading true不显示
    acc_information:{},//详细数据
    Real_Name:"",
    fundDetailsList: []
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

      }

    });  
    //获取账户id
    that.getdata();
    //console.log(2)
    //that.get_information();
    //console.log(3)
    
  
  },
//获得Account_Id
  getdata:function () {
    //console.log(4)
    var that = this;
    
    //console.log(wx.getStorageSync("sessionid")+"sssss");
    wx.request({
      url: util.urlstr + '/Ashx/GetAccountId.ashx?rnddate=' + parseInt(1000 * Math.random()),
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
          //保存accountid
          wx.setStorageSync('accountid', datatemp[0].Account_Id);
          that.setData({Real_Name:datatemp[0].Real_Name});
        }

        //获取理财师信息
        that.get_information();
      }
      ,
      fail: function (res) {
        
      },
      complete: function (res) {
        
      }
    });

  },
  //获得理财师信息
  get_information:function(){
    //console.log(5);
    var that=this;
    wx.request({
      url: util.urlstr + '/Ashx/GetAccountInfo.ashx',
      method: 'POST',
      data: {
        Account_Id: wx.getStorageSync("accountid"),
        rnddate: parseInt(1000 * Math.random())
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      
      success: function (res) {
        var tempdata = res.data.data;
        var rif = wx.getStorageSync("rememberUserInfo");
        var temp_acc_information={};
        if (tempdata.length>0)
        {
          //temp_acc_information.name = rif.name;//客户名称
          temp_acc_information.Assets = tempdata[0].Assets;//总投资
          temp_acc_information.Left_Amount = tempdata[0].Left_Amount;//可用资金
          temp_acc_information.OrderId = tempdata[0].OrderId;//排名
          temp_acc_information.Profits = tempdata[0].Profits;//总收益
          temp_acc_information.Rates = tempdata[0].Rates;//总收益率
          that.setData({ acc_information: temp_acc_information});
        }
        //获取持有基金
        that.getcydata();
      },
      fail: function (res) {
        
      },
      complete: function (res) {
       
      }
    });
  },
  /**
   * 获得数据持有明细
   */
  getcydata: function () {
    var that = this;
    that.setData({ hiddenLoading: false });
    wx.request({
      url: util.urlstr + '/Ashx/GetAccountTradeList.ashx?otype=3&Account_Id=' + wx.getStorageSync("accountid") + '&_search=false&nd=' + parseInt(1000 * Math.random()) + '&rows=100&page=1&sidx=f_jysdm&sord=asc&json=1',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.data) {
          var tempdata = res.data.data;
          if (tempdata.length > 0) {
            that.setData({ fundDetailsList: that.data.fundDetailsList.concat(tempdata), hiddenLoading: true });
          }
        } 
      }
      ,
      fail: function (res) {
      },
      complete: function (res) {
        //隐藏loading
        that.setData({ hiddenLoading: true });
      }
    })
  }
,
  /**
   * 点击显示或者隐藏
   */
  detailed_showe:function(e)
  {
    var that =this;
    var dataindex = e.currentTarget.id;
    //console.log(e)

    if (that.data.pd==dataindex)
    {
      that.setData({
        pd:-1
      });
    }
    else{
      that.setData({
        pd: dataindex
      });
    }
  },

 /**
 * 跳转购买基金1 下单明细2 成交明细为3 clicks
 */
  click_single:function(e){
    if (e.target.dataset.clicks=='1')
    {
      // wx.showToast({
      //   title: '跳转购买',
      // });
      wx.navigateTo({
        url: '../buy/buy',
      })
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
   * 跳转排行
   * 
   */
  clicktzph:function(e)
  {
    console.log(e)
    // wx.navigateTo({
    //   url: '../pages/rangking/rangking',
    // })
    wx.switchTab({
      url: '../ranking/ranking',
    });
  },
  //赎回基金
  Redemptive:function(e)
  {
    var parm = { 
      f_jysdm: e.currentTarget.dataset.jysdm, 
      f_name: e.currentTarget.dataset.name,
      f_volume: e.currentTarget.dataset.volume
    };
    wx.navigateTo({
      url: '../Redemptive/Redemptive?parm='+JSON.stringify(parm)  
    })
  },
  //转投基金
  MoveInto:function(e)
  {
    var parm = {
      f_jysdm: e.currentTarget.dataset.jysdm,
      f_name: e.currentTarget.dataset.name,
      f_volume: e.currentTarget.dataset.volume
    };
    wx.navigateTo({
      url: '../MoveInto/MoveInto?parm='+JSON.stringify(parm)  
    })
  },

  //重新载入持有基金数据
  ReloadData: function (name) {
    this.setData({
      fundDetailsList: []
    })
    this.getcydata();
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
    var app = getApp();
    if (getApp().globalData.reload=='1')
    {
      console.log('重装载入=', getApp().globalData.reload);
      //获取账户id
      this.getdata();
    }
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
