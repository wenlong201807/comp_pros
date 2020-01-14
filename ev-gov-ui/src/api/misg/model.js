import {
  axios
} from '@/utils/request'
import api from '../index'

export function getModel (param) {
  return axios({
    url: api.MISG.GetModelList,
    data: param.params,
    params: param.basic,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// export function delRole (param) {
//   console.log(param.params)
//   return axios({

//     url: api.UPMS.BasicRole,
//     // data: QS.stringify(param.params),
//     params: param.params,
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     },
//     paramsSerializer: params => {
//       return QS.stringify(params, {
//         indices: false
//       })
//     }
//   })
// }

// export function createNewRole (param) {
//   return axios({

//     url: api.UPMS.BasicRole,
//     data: param.params,
//     params: param.basic,
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     }
//   })
// }

// export function editRole (param) {
//   return axios({
//     url: api.UPMS.BasicRole,
//     data: param.params,
//     params: param.basic,
//     method: 'put',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     }
//   })
// }

// export function getRoleTree () {
//   return axios({
//     url: api.UPMS.GetRoleTree,
//     method: 'get'
//   })
// }
