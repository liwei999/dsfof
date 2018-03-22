var util=require("../../utils/util.js");

Page({
  data:{ 
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    hiddenLoading: true,//页面加载loading true不显示
    LCSRankingList: [],//理财师组
    MSGTRankingList:[],//名师高徒组
    Account_Type:0,//排行榜类别 0理财师组 1名师高徒组
    //temp:"团队",
    systemInfo:{}
    },
  /** 
   * 滑动切换tab 
   */
  bindChange: function (e) {

    var that = this;
    that.setData({ 
      currentTab: e.detail.current,
      Account_Type: e.detail.current,
      //temp: e.detail.current==0?'团队':'理财师'
       });
    if ((that.data.Account_Type == 0 && that.data.LCSRankingList.length == 0) || (that.data.Account_Type == 1 && that.data.MSGTRankingList.length == 0)) {
        that.getdata()
        console.log("ssssss");
      }
  },
  bindclick:function(e)
  {
    console.log(e)
    wx.navigateTo({
      url: "../fundDetails/fundDetails?name=" + e.currentTarget.dataset.name + "&accountid=" + e.currentTarget.dataset.accountid
    })
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
    that.getdata();
    

  },
  getdata:function(){
    var that =this;
    that.setData({ hiddenLoading: false});
    wx.request({
      url: util.urlstr+'/Ashx/GetIndexRank.ashx?Account_Type=' + that.data.Account_Type+'&rnddate=605&Num=10&F_date=99991231&isTeamPm=0',
      method:'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        if (that.data.Account_Type==0)
        {
        that.setData({ LCSRankingList: that.data.LCSRankingList.concat(res.data.data), hiddenLoading: true });
        }
        else
        {
          that.setData({ MSGTRankingList: that.data.MSGTRankingList.concat(res.data.data), hiddenLoading: true });

        }
      }
      ,
      fail:function(res){
        that.setData({hiddenLoading: true });
      },
      complete:function(res)
      {
        that.setData({ hiddenLoading: true });
      }
    });

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
        currentTab: e.target.dataset.current,
        Account_Type: e.target.dataset.current,
        //temp: e.detail.current == 0 ? '团队' : '理财师'
      });
      if ((that.data.Account_Type == 0 && that.data.LCSRankingList.length == 0) || (that.data.Account_Type == 1 && that.data.MSGTRankingList.length == 0))
      {
        that.getdata()
        console.log("123");
      }
     
    }
  }

});