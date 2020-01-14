/* eslint-disable */
import requireJs from './RequestJs_pb'
import responseJs from './ResponseJs_pb'

// protobuf发送转码通用方法
function encode (message) {
  var requireInfo = new requireJs.RequestJs()
  // eslint-disable-next-line eqeqeq
  if (message.params != undefined) {
    requireInfo.setParams(message.params)
  }
  if (message.phoneNum != undefined) {
    requireInfo.setPhonenum(message.phoneNum)
  }
  if (message.equipmentNumber != undefined) {
    requireInfo.setEquipmentnumber(message.equipmentNumber)
  }
  if (message.phoneCode != undefined) {
    requireInfo.setPhonecode(message.phoneCode)
  }
  if (message.id != undefined) {
    requireInfo.setId(message.setId)
  }
  if (message.name != undefined) {
    requireInfo.setName(message.name)
  }
  if (message.isRepeat != undefined) {
    requireInfo.setIsrepeat(message.isRepeat)
  }
  // var bytes = requireInfo.encode(message).finish();
  // console.log("requireInfo=>",requireInfo);
  var bytes = requireInfo.serializeBinary()
  return bytes
}
// protobuf解码通用方法
function decode (message) {
  var decodeInfo = {}
  // console.log("before decodeBinary info=>",responseJs.ResponseJs.deserializeBinary(message));
  var decodeBinary = responseJs.ResponseJs.deserializeBinary(message).array
  console.log('decodeBinary info=>', decodeBinary)
  if (decodeBinary[0] != undefined) {
    decodeInfo.tag = decodeBinary[0]
  }
  if (decodeBinary[1] != undefined) {
    decodeInfo.isRepeat = decodeBinary[1]
  }
  if (decodeBinary[2] != undefined) {
    decodeInfo.msg = decodeBinary[2]
  }
  if (decodeBinary[3] != undefined) {
    decodeInfo.isLogin = decodeBinary[3]
  }
  if (decodeBinary[4] != undefined) {
    decodeInfo.sessionID = decodeBinary[4]
  }
  if (decodeBinary[5] != undefined) {
    decodeInfo.params = JSON.parse(decodeBinary[5])
  }
  if (decodeBinary[6] != undefined) {
    decodeInfo.data = JSON.parse(JSON.parse(JSON.stringify(decodeBinary[6])))
  }
  console.log('decode info=>', decodeInfo)
  return decodeInfo
}
export default {
  encode,
  decode
}
