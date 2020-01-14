/* eslint-disable */
import myAxios from './myAxios';
import Exif from 'exif-js'

/**
 * 等待数据缓存
 */
function waitDataStore () {
  const storeData = new Promise((resolve, reject) => {
    if (!this.$store.getters.getStationID) {
      timerCount()
    }
  })
  return storeData
}
/**
 * 计时器
 * @param {string} store 储存
 * @param {string} router 路由
 */
function timerCount (store, router) {
  if (!store.getters.getStationID) {
    setTimeout(this.timerCount, 500)
  } else {
    var pagedata = store.getters.getData
    // let indexData = this.$store.dispatch("setDetailIndex",1);
    router.push(pagedata.PagesInfo[5].route)
  }
}
/**
 * 拨打电话
 * @param {number} phoneNumber 电话号码
 */
function callPhone(phoneNumber) {
  if (phoneNumber) {
    window.location.href = 'tel:' + phoneNumber
  } else {
    
  }
}
/**
 * 比较大小、进行从小到大排序
 * @param {array} property list数组
 */
function compare (property) {
  return function (a, b) {
    var value1 = a[property]
    var value2 = b[property]
    if (value1 < value2) {
      return -1
    } else if (value1 > value2) {
      return 1
    } else {
      return 0
    }
  }
}
/**
 * 去除字符，获取数字字符串
 * @param {string} str 字符串
 * @param {string} syboml 分隔符
 */
function getNumberStr (str, syboml) {
  var dataStr = []
  var res = '';
  dataStr = str.split(syboml)
  if (dataStr.length > 0) {
    for (let index = 0; index < dataStr.length; index++) {
      res += dataStr[index]
    }
  }
  return res
}

function getAccountInfo () {
  const userInfo = {}
  let datas = {}
  let storeData = JSON.parse(localStorage.getItem('userInfo')).data
  datas.userName = storeData.userName
  datas.phoneNum = storeData.phoneNum
  datas.password = storeData.password
  userInfo.params = JSON.stringify(datas)
  userInfo.equipmentNumber = localStorage.getItem('uuid')
  userInfo.phoneNum = storeData.phoneNum

  return userInfo
}
/**
 * 获取基本检查连接数据
 * @param {boolean}isDefault 是否使用默认参数
 * @param {string} param param参数
 * @param {number} phoneNum 电话
 * @param {string} equipmentNumber uuid
 * @param {string} phoneCode 验证码
 * @param {string} id id
 * @param {string} name 昵称
 * @param {boolean} isRepeat isRepeat
 */
function getCheckData (isDefault, param, phoneNum, phoneCode, id, name, isRepeat) {
  var datas = {}
  if (phoneNum == undefined && localStorage.getItem('userInfo') != undefined) {
    datas.phoneNum = JSON.parse(localStorage.getItem('userInfo')).phoneNum
  }
  datas.equipmentNumber = localStorage.getItem('uuid')
  if (param != undefined) {
    datas.params = param
  }
  if (!isDefault) {
    if (phoneNum != undefined) {
      datas.phoneNum = phoneNum
    }
    if (phoneCode != undefined) {
      datas.phoneCode = phoneCode
    }
    if (id != undefined) {
      datas.id = id
    }
    if (name != undefined) {
      datas.name = name
    }
    if (isRepeat != undefined) {
      datas.isRepeat = isRepeat
    }
  }
  // console.log("data after handle->",datas);
  return datas
}

function timer (totalTime, secondsFunc, timeoutFunc) {
  // var time = time;
  let seconds = totalTime
  if (seconds > totalTime) {
    if (secondsFunc) {
      secondsFunc()
    }
    seconds--
    setTimeout(this.timer, 1000)
  } else {
    if (timeoutFunc) {
      timeoutFunc()
    }
  }
}
/**
 * 检查登陆状态
 */
function checkLoginStatus () {
  const datas = getCheckData(true)
  myAxios('requestJSONs', datas, '/LUHANG/login/isLogin.do', function (res) {
    /* 不显示重新登录*/
    // debugger
    // if (!res.tag) {
    //   plus.nativeUI.alert(res.msg, function () {
    //     plus.runtime.restart();
    //   });
    // }
  })
}
/**
 * 处理接收的json数据
 * @param {jsonStr} jsonData
 * @param {回调方法} funcHandle
 */
function parseJsonToMap (jsonData, funcHandle) {
  const mapData = eval('(' + jsonData + ')')
  for (var key in mapData) {
    var value = mapData[key]
    funcHandle(key, value)
  }
}
/**
 * 获取运营商图标
 * @param {string} operatorId 运营商图标ID
 */
function getBase64Pic (operatorId) {
  let base64Pic
  let operatorData = localStorage.getItem('operatorIcons')
  if (operatorData != undefined) {
    const operatorMap = new Map(JSON.parse(operatorData))
    base64Pic = operatorMap.get(operatorId)
    if (base64Pic != undefined) {
      return base64Pic
    } else {
      return false
    }
  }
}
/**
 * 将字符串转为utf-8编码格式
 * @param {string} str 字符串
 */
function stringToUTF8 (str) {
  const encoder = new TextEncoder('utf8')
  return encoder.encode(str)
}
/**
 * 将字符串转为char
 * @param {string} str 字符串
 */
function stringToCharArray (str) {
  str = str.replace(/(^\s*)|(\s*$)/g, '')

  var _r = '';

  for (var i = 0; i < str.length; i++) {
    _r += i == 0 ? str.charCodeAt(i) : '|' + str.charCodeAt(i)

  }

  return _r
}
/**
 * 将字符串数组转为字符转
 * @param {array} obj 数组对象
 */
function arrayToStr (obj) {
  var str = ''
  if (obj.length == 1) {
    return str = obj[0]
  }
  for (let index = 0; index < obj.length; index++) {
    const element = obj[index]
    if (str != '') {
      str += ',' + element
    } else {
      str += element
    }
  }
  return str
}

/**
 * 压缩图片文件
 * @param {byte} 图片文件 图片
 * @param {Number} ratio 压缩比例
 */
function compressImg (file, callBack, ratio) {
  let Orientation
  //去获取拍照时的信息，解决拍出来的照片旋转问题
  Exif.getData(file, function () {
    Orientation = Exif.getTag(this, 'Orientation')
    console.log('Orientation==>', Orientation)
  })
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function () {
    const base64 = this.result
    console.log('base64:', base64.length)
    var img = new Image()
    img.src = base64
    img.onload = function () {
      const canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    let initSize = img.src.length  //压缩前图片大小
    let width = img.width
    let height = img.height
    console.log('imgwidth=', width, ',imgheight', height)
    canvas.width = width
    canvas.height = height
    var degree = 0
    let drawWidth = width
    let drawHeight = height
    if (Orientation != '' && Orientation != 1) {
        switch (Orientation) {
        // iphone横屏拍摄，此时home键在左侧
          case 3:
            degree = 180
          drawWidth = -width
          drawHeight = -height
          break;
          // iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
          case 6:
            canvas.width = height
          canvas.height = width
          degree = 90
          drawWidth = width
          drawHeight = -height
          break;
          // iphone竖屏拍摄，此时home键在上方
          case 8:
            canvas.width = height
          canvas.height = width
          degree = 270
          drawWidth = -width
          drawHeight = height
          break;
        }
      }

      // 铺底色
      ctx.fillStyle = '#fff';
      // 使用canvas旋转校正
      ctx.rotate(degree * Math.PI / 180)
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, drawWidth, drawHeight)
    //进行最小压缩
    ratio = ratio == undefined ? 0.1:ratio
    let ndata = canvas.toDataURL('image/jpeg', 0.1)
    console.log('*******压缩后的图片大小*******')
    // console.log(ndata)
    console.log(ndata.length)
    if (callBack) {
        callBack(ndata)
    }
      return ndata
  }
  }
}
/**
 * 重写iOS确认
 */
function rewriteiOSConfirm (message) {
  var u = navigator.userAgent;
    var app = navigator.appVersion
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //g
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
  if (isIOS) {
    // 这个是ios操作系统
    window.confirm = function (message) {
      var iframe = document.createElement('IFRAME')
      iframe.style.display = 'none';
      iframe.setAttribute('src', 'data:text/plain,')
      document.documentElement.appendChild(iframe)
      var alertFrame = window.frames[0]
      var result = alertFrame.window.confirm(message)
      iframe.parentNode.removeChild(iframe)
      return result
    };
  } else
    {return window.confirm(message);}
}
function checkExsit (data, array) {
  if (data && array) {
    array.forEach(function (item, index) {
      if (data == item) {
        return index
      }
    })
    return null
  }
}
/**
 * 检查登录状态
 */
function checkLogin () {
  var accoutInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (!accoutInfo) {
    return false
  }else {
    return true
  }
}
/**
 * 加载css
 * @param {string} url 地址链接
 */
function loadCss (url) {
  const css = document.createElement('link')
  css.href = url
  css.rel = 'stylesheet'
  css.type = 'text/css'
  document.head.appendChild(css)
}
export default {
  waitDataStore,
  callPhone,
  timerCount,
  compare,
  getNumberStr,
  getAccountInfo,
  getCheckData,
  timer,
  checkLoginStatus,
  parseJsonToMap,
  getBase64Pic,
  stringToUTF8,
  stringToCharArray,
  arrayToStr,
  compressImg,
  rewriteiOSConfirm,
  checkExsit,
  checkLogin,
  loadCss
}
