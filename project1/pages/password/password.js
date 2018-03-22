var util = require('../../utils/util.js');
Page({
  data: {
    tip: '',
    userName: '',
    psw1: '',
    psw2: ''
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
  formSubmit: function (e) {
    
    if (e.detail.value.newpass1.length == 0 || e.detail.value.newpass2.length == 0) {
      util.toast('新密码不能为空');
      this.setData({
        tip: '提示：密码不能为空！',
        userName: '',
        psw: ''
      })
    } else {
      
      var that = this;
      if (this.data.psw1 == this.data.psw2)
          util.toast('修改成功');
      
    }
  },
  Reset: function () {
    this.setData({
      tip: '',
      userName: '',
      psw: ''
    })
  }

});

