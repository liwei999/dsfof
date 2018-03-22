var util = require('../../utils/util.js');
var rui = 'rememberUserInfo';
Page({
  data: {
    tip: '',
    userName: '载入中..',
    psw1: '',
    psw2: ''
  },
  onLoad: function () {
    util.toast(wx.getStorageSync(rui).name);
    //获取登录名
    this.setData({
      userName: wx.getStorageSync(rui).name
    })
  },
  newpassInput1: function (e) {
    this.setData({
      psw1: e.detail.value
    })
  },
  newpassInput2: function (e) {
    this.setData({
      psw2: e.detail.value
    })
  },
  ModPassWord: function ()  //修改密码
  {
    var that = this; 
    wx.showToast({
      title: '提交中...',
      icon: 'loading'
    });
    wx.request({
      url: util.urlstr + '/user/UpDatePwd.ashx',
      data: {
        PassWord: this.data.psw1
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync("sessionid")
      },
      success: function (res) {
        if (res.errMsg === 'request:ok') {
          
          if (res.data == "1")
          {
            //重置记住的密码为空
            var obj = new Object();
            obj.name = that.data.userName;
            obj.pswd ='';
            obj.rbFlag = true;
            wx.setStorageSync(rui, obj);

            console.log("重置密码成功")

            var ruiv = wx.getStorageSync(rui);
            //console.log('ruiv=', ruiv);
            //跳转到登录界面
            wx.redirectTo({
              url: '../login/login',
            });
          }
          else 
          {
            toast("修改密码失败,请重试");
          }

        }

      },
      fail: function (res) {
        wx.showToast({
          title: "网络异常，请重试！",
          icon: 'loading',
          duration: 3000
        })
      }
    })
  },

  formSubmit: function (e) {
    if (e.detail.value.newpass1.length == 0 || e.detail.value.newpass2.length == 0) {
      util.toast('新密码不能为空');
    }
    else {
      if (this.data.psw1 == this.data.psw2)
        this.ModPassWord();
    }
  },
  Reset: function () {
    this.setData({
      tip: '',
      userName: '',
      psw: ''
    })
  }
})



