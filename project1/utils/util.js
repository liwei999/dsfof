//格式化时间
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//接口地址
const urlstr = "https://vojs.dsfof.com.cn/";

//暴露接口
module.exports = {
  formatTime: formatTime,
  urlstr: urlstr,
  toast: toast
}

//显示提示
function toast(toast) {
  wx.showToast({
    title: toast,
    duration: 2000
  })
}

