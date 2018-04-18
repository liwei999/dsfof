var util = require('../../utils/util.js');
Page({
  data: {
    leftMoney:"",   //可用余额
    buyMoney:"",
    Memo:'' ,
    inputVal: "",//基金文本框内容，
    jysdm:"",
    fundList:[],
    showlist:false
  },
  onLoad:function(options){
    this.get_information();
  }
  ,
  /**
   * 设置输入值 基金代码或者基金名称
   */
  inputTyping: function (e) {
   
    if (e.detail.value.length>0)
    {
      this.setData({
        inputVal: e.detail.value,
        showlist:true
      });
      this.getFundData(e.detail.value);
    }
    else
    {
      this.setData({
        inputVal: e.detail.value,
        showlist: false
      });
    }
  },
  /**
   * 获得筛选结果
   */
  getFundData:function(key){
    var that = this;
    wx.request({
      url: util.urlstr + 'MobileAspx/SearchCodeByKey.aspx?key='+key,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        var tempdata = res.data.data;
        if (tempdata.length>0)
        {
        that.setData({ fundList: []});  
        that.setData({ fundList: that.data.fundList.concat(tempdata)});
        }
        else{
          that.setData({ showlist: false });  
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
  clickFund:function(e){
    var that=this;
    
    that.setData({ showlist: false, jysdm: e.currentTarget.dataset.fundcode, inputVal: e.currentTarget.dataset.fundname});
  },
  //判断购买金额是否大于可用余额
  InpuBuyMoney: function (e) {
    console.log(e.detail.value ,this.data.leftMoney);
    if (parseFloat(e.detail.value) > parseFloat(this.data.leftMoney))
    {
      util.toast("没有足够的资金购买!");
      this.setData({
        buyMoney: ""
      });   
    }
    else
    {
      this.setData({
        buyMoney: e.detail.value
      })  ; 
    }
    
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
    var pages = getCurrentPages();
    var prePage = pages[pages.length - 2];
    var that = this;
    if (that.data.jysdm=="")
    {
      util.toast("请选择基金！")
      return ;
    }
    if (that.data.buyMoney<1000)
    {
      util.toast("金额小于1000")
      return;
    }
    wx.showToast({
      title: '提交中...',
      icon: 'loading'
    });
    wx.request({
      url: util.urlstr + '/Ashx/AddAuditTradeList.ashx',
      data: {
        F_Jysdm: that.data.jysdm,
        Amount: that.data.buyMoney,
        Devi_Type:1,
        Trade_Type:1,
        Memo: that.data.Memo.replace(/\s+/g, ''),
        otype:'insert',
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
            prePage.get_information();
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

  //获得理财师信息 可用资金
  get_information: function () {
    //console.log(5);
    var that = this;
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
        if (tempdata.length > 0) {
          that.setData({leftMoney:tempdata[0].Left_Amount});
        }

      },
      fail: function (res) {

      },
      complete: function (res) {

      }
    });
  },

})
