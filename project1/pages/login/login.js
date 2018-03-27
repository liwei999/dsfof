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

  onLoad: function (options) {
    // 判断是否记住密码
    try {
      rbFlag = wx.getStorageSync(rui).rbFlag;
      
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
    //console.log(userName, passWd, rbFlag);

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

    // if (userName == "wuc" && passWd=="123")
    // {
    //   var obj = new Object();
    //   obj.name = userName;
    //   obj.pswd = passWd;
    //   obj.rbFlag = rbFlag;
    //   // obj.phone = userPhone;
    //   console.log('obj', obj);
    //   wx.setStorageSync(rui, obj);
    //   wx.switchTab({
    //     url: '../main/main',
    //   })
    // }
    // else
    // {
    //   toast('用户名密码错误');
    //   this.setData({
    //     passWd: ""
    //   })
    //   var obj = new Object();
    //   obj.name = userName;
    //   obj.pswd = "";
    //   obj.rbFlag = rbFlag;
    //   // obj.phone = userPhone;
    //   console.log('obj', obj);
    //   wx.setStorageSync(rui, obj);
    //   return;
    // }
    // if (request) {
    //   wx.navigateTo({
    //     url: "../index/index?" +
    //     "userName=" + userName + "&" +
    //     "passWd=" + passWd + "&" +
    //     "userPhone=" + userPhone,
    //     success: function (res) {

    //     },
    //     fail: function (res) {
    //       // fail
    //     },
    //     complete: function (res) {
    //       // complete
    //     }
    //   })
    // }

    // 发送网络请求
    // wx.request({
    //   url: XXX,XXX,XXX,
    //   data: { AGENTID: userName, PSWD: Md5(passWd), PHONE: userPhone, target: 1 },
    //   method: 'POST',
    //   header: {
    //     "content-type": "application/x-www-form-urlencoded"
    //   },
    //   success: function (res) {
    //     // success
    //     var loginInfo = res.data
    //     console.log(loginInfo);
    //     if (loginInfo.code == 1) {
    //     console.log(res.data);
    // 记住密码
    //     var obj = new Object();
    //     obj.name = userName;
    //     obj.pswd = passWd;
    //     obj.phone = userPhone;
    //     console.log('obj', obj);
    //     that.setSaveData(rui, obj);
    //       // 登录记录
    //       var logs = wx.getStorageSync(loginList) || []
    //       logs.unshift(Date.now())
    //       wx.setStorageSync(loginList, logs)

    //       // 至主页
    //       wx.switchTab({ url: "../home/home" });
    //       toast(loginInfo.msg);
    //     } else {
    //       var msg = loginInfo.msg;
    //       toast(loginInfo.msg);
    //     }
    //   },
    //   fail: function (res) {
    //     // fail
    //     toast('登录失败,请重试');
    //     console.log('登录失败:', res);
    //   },
    //   complete: function () {
    //     // complete
    //     console.log('comlete');
    //   }
    // })
  },


})
function toast(toast) {
  wx.showToast({
    title: toast,
    duration: 2000
  })
}
