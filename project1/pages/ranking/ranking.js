var util=require("../../utils/util.js");

Page({
  data:{ 
    winWidth: 0,
    winHeight: 0,
    // tab�л�  
    currentTab: 0,
    hiddenLoading: true,//ҳ�����loading true����ʾ
    LCSRankingList: [],//���ʦ��
    MSGTRankingList:[],//��ʦ��ͽ��
    Account_Type:0//���а���� 0���ʦ�� 1��ʦ��ͽ��
    },
  /** 
   * �����л�tab 
   */
  bindChange: function (e) {

    var that = this;
    that.setData({ 
      currentTab: e.detail.current,
      Account_Type: e.detail.current
       });
    if ((that.data.Account_Type == 0 && that.data.LCSRankingList.length == 0) || (that.data.Account_Type == 1 && that.data.MSGTRankingList.length == 0)) {
        that.getdata()
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
   * �������ں���--����ҳ�����
   */
  onLoad: function (options) {
    var that = this;

    /** 
     * ��ȡϵͳ��Ϣ 
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
    })

  },

  /** 
   * ���tab�л� 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        Account_Type: e.target.dataset.current
      });
      if ((that.data.Account_Type == 0 && that.data.LCSRankingList.length == 0) || (that.data.Account_Type == 1 && that.data.MSGTRankingList.length == 0))
      {
        that.getdata()
      }
     
    }
  },

});