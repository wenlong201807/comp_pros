/* eslint-disable */
// WGS-84：是国际标准，GPS坐标（Google Earth使用、或者GPS模块）
// GCJ-02：中国坐标偏移标准，Google Map、高德、腾讯使用
// BD-09：百度坐标偏移标准，Baidu Map使用
var GPS = {
  PI: 3.14159265358979324,
  x_pi: 3.14159265358979324 * 3000.0 / 180.0,
  delta: function (lat, lon) {
    // Krasovsky 1940
    //
    // a = 6378245.0, 1/f = 298.3
    // b = a * (1 - f)
    // ee = (a^2 - b^2) / a^2;
    var a = 6378245.0
    var ee = 0.00669342162296594323
    var dLat = this.transformLat(lon - 105.0, lat - 35.0)
    var dLon = this.transformLon(lon - 105.0, lat - 35.0)
    var radLat = lat / 180.0 * this.PI
    var magic = Math.sin(radLat)
    magic = 1 - ee * magic * magic
    var sqrtMagic = Math.sqrt(magic)
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI)
    dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI)
    return { 'lat': dLat, 'lon': dLon }
  },
  // WGS-84 to GCJ-02
  gcj_encrypt: function (wgsLat, wgsLon) {
    if (this.outOfChina(wgsLat, wgsLon)) { return { 'lat': wgsLat, 'lon': wgsLon } }

    var d = this.delta(wgsLat, wgsLon)
    return { 'lat': wgsLat + d.lat, 'lon': wgsLon + d.lon }
  },
  // GCJ-02 to WGS-84
  gcj_decrypt: function (gcjLat, gcjLon) {
    if (this.outOfChina(gcjLat, gcjLon)) { return { 'lat': gcjLat, 'lon': gcjLon } }

    var d = this.delta(gcjLat, gcjLon)
    return { 'lat': gcjLat - d.lat, 'lon': gcjLon - d.lon }
  },
  // GCJ-02 to WGS-84 exactly
  gcj_decrypt_exact: function (gcjLat, gcjLon) {
    var initDelta = 0.01
    var threshold = 0.000000001
    var dLat = initDelta; var dLon = initDelta
    var mLat = gcjLat - dLat; var mLon = gcjLon - dLon
    var pLat = gcjLat + dLat; var pLon = gcjLon + dLon
    var wgsLat; var wgsLon; var i = 0
    while (1) {
      wgsLat = (mLat + pLat) / 2
      wgsLon = (mLon + pLon) / 2
      var tmp = this.gcj_encrypt(wgsLat, wgsLon)
      dLat = tmp.lat - gcjLat
      dLon = tmp.lon - gcjLon
      if ((Math.abs(dLat) < threshold) && (Math.abs(dLon) < threshold)) { break }

      if (dLat > 0) pLat = wgsLat; else mLat = wgsLat
      if (dLon > 0) pLon = wgsLon; else mLon = wgsLon

      if (++i > 10000) break
    }
    // console.log(i);
    return { 'lat': wgsLat, 'lon': wgsLon }
  },
  // GCJ-02 to BD-09
  bd_encrypt: function (gcjLat, gcjLon) {
    var x = gcjLon; var y = gcjLat
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi)
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi)
    // eslint-disable-next-line no-undef
    var bdLon = z * Math.cos(theta) + 0.0065
    // eslint-disable-next-line no-undef
    var bdLat = z * Math.sin(theta) + 0.006
    return { 'lat': bdLat, 'lon': bdLon }
  },
  // BD-09 to GCJ-02
  bd_decrypt: function (bdLat, bdLon) {
    var x = bdLon - 0.0065; var y = bdLat - 0.006
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi)
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi)
    var gcjLon = z * Math.cos(theta)
    var gcjLat = z * Math.sin(theta)
    return { 'lat': gcjLat, 'lon': gcjLon }
  },
  distance: function (latA, logA, latB, logB) {
    var earthR = 6371000
    var x = Math.cos(latA * Math.PI / 180) * Math.cos(latB * Math.PI / 180) * Math.cos((logA - logB) * Math.PI / 180)
    var y = Math.sin(latA * Math.PI / 180) * Math.sin(latB * Math.PI / 180)
    var s = x + y
    if (s > 1) { s = 1 }
    if (s < -1) { s = -1 }
    var alpha = Math.acos(s)
    var distance = alpha * earthR
    return distance
  },
  outOfChina: function (lat, lon) {
    if (lon < 72.004 || lon > 137.8347) { return true }
    if (lat < 0.8293 || lat > 55.8271) { return true }
    return false
  },
  transformLat: function (x, y) {
    var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x))
    ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0
    ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0
    ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0
    return ret
  },
  transformLon: function (x, y) {
    var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x))
    ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0
    ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0
    ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0
    return ret
  }
}

function openNavigation (curLngLat, address) {
  const locationLng = localStorage.getItem('location-lng')
  const locationLat = localStorage.getItem('location-lat')
  console.log('目的地经纬度-->', curLngLat.lng, curLngLat.lat)
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-undef
  var dst = new plus.maps.Point(curLngLat.lng, curLngLat.lat) // 目标位置
  // eslint-disable-next-line no-undef
  var src = new plus.maps.Point(locationLng, locationLat) // 起始位置
  // 坐标转换
  var dstWGS = GPS.gcj_decrypt_exact(curLngLat.lat, curLngLat.lng)
  console.log('转换后的目的地经纬度-->', dstWGS['lon'], dstWGS['lat'])
  // eslint-disable-next-line no-undef
  var dstWGSPoint = new plus.maps.Point(dstWGS['lon'], dstWGS['lat'])
  // console.log("目的-->",dst);
  var btnArray = [{
    title: '高德地图'
  }, {
    title: '百度地图'
  }]
  // eslint-disable-next-line no-undef
  plus.nativeUI.actionSheet({
    title: '请选择地图',
    cancel: '取消',
    buttons: btnArray
  }, function (e) {
    var index = e.index
    if (index === 1) {
      // 高德地图
      openAmap(dstWGSPoint, address, src)
    } else if (index === 2) {
      // 百度地图
      openBmap(dstWGSPoint, address, src)
    } else {
      // 腾讯地图
      //			openTmap(dst, dstaddress, src);
    }
  })

  // let isExsit = plus.runtime.isApplicationExist({pname:'com.autonavi.minimap',action:'iosamap://'});
  //    console.log("手机上是否有高德地图:",isExsit);
  // if(isExsit){
  //     if ( plus.os.name == "Android" ) {
  //         //坐标转换
  //         var dstWGS=GPS.gcj_decrypt_exact(curLngLat.lat,curLngLat.lng);
  //         console.log("转换后的目的地经纬度-->",dstWGS['lon'],dstWGS['lat']);
  //         var dstWGSPoint = new plus.maps.Point(dstWGS['lon'],dstWGS['lat']);
  //         plus.maps.openSysMap(dstWGSPoint, address, src);
  //     }else{
  //         plus.maps.openSysMap(dst, address, src);
  //     }

  // }else{
  //     if(window.confirm("您未安装高德地图, 是否前往安装高德地图?点击'确定'前往安装")){
  //         window.location.href = "http://daohang.amap.com/index.php";
  //     }
  // }
}
function openAmap (dst, dstaddress, src) {
  console.log('打开高德地图.........')
  // 打开高德地图
  // 传pname和action是分别对应android和ios的判断
  // eslint-disable-next-line no-undef
  if (plus.runtime.isApplicationExist({
    pname: 'com.autonavi.minimap',
    action: 'iosamap://'
  })) {
    var url = ''
    /***
		 * dev=1,此参数非常重要，因为传进来的是wgps-84（国际的没有国密的）的，而高德时国密的，所以要1，他自己进行加密
		 */
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line eqeqeq
    if (plus.os.name === 'Android') {
      // android平台
      url = 'amapuri://route/plan/?sid=BGVIS1&slat=&slon=&sname=&did=BGVIS2&dlat=' + dst.latitude + '&dlon=' + dst.longitude + '&dname=' + dstaddress + '&dev=1&t=0'
    } else if (plus.os.name === 'iOS') {
      // ios平台
      url = 'iosamap://path?sourceApplication=applicationName&sid=BGVIS1&slat=&slon=&sname=&did=BGVIS2&dlat=' + dst.latitude + '&dlon=' + dst.longitude + '&dname=' + dstaddress + '&dev=1&t=0'
      url = encodeURI(url)
    } else {
      // 暂无
    }
    console.log(url)
    plus.runtime.openURL(url)
  } else {
    mui.alert('高德地图未安装')
  }
}

function openBmap (dst, dstaddress, src) {
  console.log('打开百度地图..........')
  // 打开百度地图
  if (plus.runtime.isApplicationExist({
    pname: 'com.baidu.BaiduMap',
    action: 'baidumap://'
  })) {
    var url = ''
    if (plus.os.name == 'Android') {
      url = 'bdapp://map/direction?origin=&destination=name:' + dstaddress + '|latlng:' + dst.latitude + ',' + dst.longitude + '&coord_type=wgs84&mode=driving&src=andr.baidu.openAPIdemo'
    } else if (plus.os.name = 'iOS') {
      url = 'baidumap://map/direction?origin=&destination=name:' + dstaddress + '|latlng:' + dst.latitude + ',' + dst.longitude + '&coord_type=wgs84&mode=driving&src=ios.baidu.openAPIdemo'
      url = encodeURI(url)
    } else {
      // 暂无
    }
    plus.runtime.openURL(url)
  } else {
    mui.alert('百度地图未安装')
  }
}
function calculateDistance (dstLng, dstLat, unitType) {
  let unit = ''
  if (unitType === 'CN') {
    unit = '公里'
  // eslint-disable-next-line eqeqeq
  } else if (unitType === 'EN') {
    unit = 'km'
  }
  var ori = [localStorage.getItem('location-lng'), localStorage.getItem('location-lat')]
  var dst = [dstLng, dstLat]
  // eslint-disable-next-line no-undef
  var distance = Number(AMap.GeometryUtil.distance(ori, dst) / 1000).toFixed(1) + unit
  return distance
}
export default {
  openNavigation,
  calculateDistance
}
