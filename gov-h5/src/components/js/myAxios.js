/* eslint-disable */
import axios from 'axios'
import protobuf from '../protobuf/protobufTool'

/**
 * 封装数据请求方法
 * @param {参数名称} paramsName
 * @param {数据} data
 * @param {请求地址} url
 * @param {then回调} thenFunc
 * @param {catch回调} catchFunc
 */
function myAxios (paramsName, data, url, thenFunc, catchFunc, ele) {
  console.log('发起请求 url=>', url, ' data=>', data)
  var bytes = protobuf.encode(data)
  const uploadDatas = new FormData()
  const self = ele
  const CancelToken = axios.CancelToken
  uploadDatas.append(paramsName, bytes)
  if (ele) {
    axios({
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream'
      },
      responseType: 'arraybuffer',
      data: uploadDatas,
      cancelToken: new CancelToken(function executor (c) {
        self.cancel = c
        // 这个参数 c 就是CancelToken构造函数里面自带的取消请求的函数，这里把该函数当参数用
      })
    }).then(res => {
      // console.log("then回调函数=>",thenFunc,"res",res);
      res = protobuf.decode(res.data)
      thenFunc(res)
    // eslint-disable-next-line handle-callback-err
    }).catch(err => {
      if (catchFunc != undefined) {
        catchFunc()
      }
    })
  } else {
    axios({
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream'
      },
      responseType: 'arraybuffer',
      data: uploadDatas
    }).then(res => {
      // console.log("then回调函数=>",thenFunc,"res",res);
      res = protobuf.decode(res.data)
      thenFunc(res)
    }).catch(err => {
      console.log(err)
      if (catchFunc != undefined) {
        catchFunc()
      }
    })
  }
  // return my_axios;
}
export default myAxios
