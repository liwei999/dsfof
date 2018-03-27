// pages/yiwo/login/login.js

var util = require("../../utils/util.js");
//index.js
//获取应用实例
var app = getApp()

var rui = 'rememberUserInfo';
var loginList = 'loginList';
var rbFlag = "true";

Page({
  data: {
    infoMess: '',
    //userName: '13506179761',
    //passWd: 'dsjj_zgx_check',
    userName: '',
    passWd: '',
    loginToast: true,
    showTipTxt: '',
    tipHidden: true,
    image: ''
  },
  //页面载入时执行
  onLoad: function (options) {
    // 判断是否记住密码
    try {
      rbFlag = wx.getStorageSync(rui).rbFlag;
      if (options.reload)
      {
        console.log('reload', options.reload)
        this.setData({
          reload: options.reload
        });
      }

      if (rbFlag) {
        var rif = wx.getStorageSync(rui);
        console.log('rif=', rif);
        if (rui != null && rui != '') {
          var name = rif.name;
          var pswd = rif.pswd;
          console.log('name', name, 'pswd', pswd);
          this.setData({
            userName: name,
            passWd: pswd,
          })
        }
      } else {
        this.setData({
          image: '/image/no.png',
        })
      }
    } catch (e) {
      console.log('Error')
    }
  },
  //用户名，手机号，密码输入框
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },

  passWdInput: function (e) {
    this.setData({
      passWd: e.detail.value
    })
  },
  // 记住密码
  rembUser: function (e) {
    if (rbFlag) {
      this.setData({ image: '/image/no.png' })
      rbFlag = false;
      console.log('rbFlag', rbFlag);
      wx.setStorageSync(rck, rbFlag);
    } else {
      this.setData({ image: '/image/ok.png' })
      rbFlag = true;
      console.log('rbFlag', rbFlag);
      wx.setStorageSync(rck, rbFlag);
    }
  },
  //登录按钮点击事件，调用参数要用：this.data.参数；
  loginBtnClick: function () {
    console.log("点击-------------");
    var that = this;

    var userName = this.data.userName;
    var passWd = this.data.passWd;
    if (userName == '' || userName ==undefined) {
      console.log("用户名不能为空");
      toast('用户名不能为空');
      return;
    }
    if (passWd == '' || passWd == undefined) {
      console.log("密码不能为空");
      toast('密码不能为空');
      return;
    }

    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });

    // 记住密码,你也可以放到请求数据成功的里面，这样用户输错信息，就不会记住错误的密码
    // 跳转带有tab的界面使用：wx.switchTab({ url: "../home/home" });
    // 最后再进行MD5加密，这里假设数据请求成功直接跳转界面
    var request = true;

    wx.request({
      url: util.urlstr + '/Ashx/Login.ashx',
      data: {
        User_Name: this.data.userName,
        PassWord: this.data.passWd,
        rememberLogin: true,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync("sessionid")
      },
      success: function (res) {
        if (res.errMsg === 'request:ok') {
          console.log()
          if (res.data=="1")
          {
            wx.setStorageSync("sessionid", res.header["Set-Cookie"])
            var obj = new Object();
            obj.name = that.data.userName;
            obj.pswd = that.data.passWd;
            obj.rbFlag = true;
            console.log('obj', obj);
            wx.setStorageSync(rui, obj);
            //跳转到登录成功默认主页
            wx.switchTab({
              url: '../main/main',
            });
          }
          else
          {
            toast("账号或密码错误！");
          }
        }
      },
      fail: function (res) {
        wx.showToast({
          title:"登录异常，请重试！",
          icon: 'loading',
          duration: 3000
        })
      }
    })
  },
  onShow:function()
  {
    var app = getApp();
    console.log('reload=',getApp().globalData.reload);
  }
})
function toast(toast) {
  wx.showToast({
    title: toast,
    duration: 2000
  })
}
