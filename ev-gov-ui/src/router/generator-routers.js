// eslint-disable-next-line
import * as loginService from '@/api/login'
import config from '@/config/system.config'
// eslint-disable-next-line
import {
  BasicLayout,
  RouteView,
  BlankLayout,
  PageView
} from '@/layouts'

// 前端路由表
const constantRouterComponents = {
  // 基础页面 layout 必须引入
  BasicLayout: BasicLayout,
  BlankLayout: BlankLayout,
  RouteView: RouteView,
  PageView: PageView,
  // 权限管理
  'UserManage': () => import('@/views/upms/User'),
  'RoleManage': () => import('@/views/upms/Role'),
  'AppManage': () => import('@/views/upms/App'),
  'ResourceManage': () => import('@/views/upms/Resource'),
  'OrgManage': () => import('@/views/upms/Org'),
  // 流程图模型管理

  // 'MISGModelManage': () => import('@/views/misg/Model'),
  // 'RQTDFlow': () => import('@/views/misg/Qrtd'),
  // 'EntrustManage': () => import('@/views/misg/Entrust'),

  '403': () => import(/* webpackChunkName: "error" */ '@/views/exception/403'),
  '404': () => import(/* webpackChunkName: "error" */ '@/views/exception/404'),
  '500': () => import(/* webpackChunkName: "error" */ '@/views/exception/500'),

  // gov
  'CarEnterprise': () => import('@/views/gov/chongqing/carEnterprise'),
  'ChargeTimeAction': () => import('@/views/gov/chongqing/chargeTimeAction'),
  'CBHabit': () => import('@/views/gov/chongqing/cbHabit'),
  'CBOnceDriver': () => import('@/views/gov/chongqing/cbOnceDriver'),
  'CBSOC': () => import('@/views/gov/chongqing/cbSoc'),
  'CBVehicleOneDay': () => import('@/views/gov/chongqing/cbVehicleOneDay'),
  'ChargeAndCapacity': () => import('@/views/gov/chongqing/chargeAndCapacity'),
  'SROperation': () => import('@/views/gov/chongqing/srOperation'),
  'SROperationArea': () => import('@/views/gov/chongqing/srOperationArea'),
  'StakeArchive': () => import('@/views/gov/chongqing/stakeArchive'),
  'StakeOperatorArchive': () => import('@/views/gov/chongqing/stakeOperatorArchive'),
  'StakeStatusNumByMerchant': () => import('@/views/gov/chongqing/stakeStatusNumByMerchant'),
  'StationArchive': () => import('@/views/gov/chongqing/stationArchive'),
  // 'VehicleCompeteAnalysis': () => import('@/views/gov/chongqing/vehicleCompeteAnalysis'),
  'VsDistributionAnalysis': () => import('@/views/gov/chongqing/vsDistributionAnalysis'),
  // 总体概况
  'CompeteAnalysis': () => import('@/views/gov/chongqing/vehicleCompeteAnalysis'),
  'DataOverview': () => import('@/views/gov/chongqing/dataOverview'),
  'DataTransmission': () => import('@/views/gov/chongqing/dataTransmission'),
  'VehicleOverrview': () => import('@/views/gov/chongqing/vehicleOverview'),
  'StakeMonitor': () => import('@/views/gov/chongqing/stakeMonitor'),
  'ChargeFaility': () => import('@/views/gov/chongqing/chargeFaility'),
  'VehicleStakeMonitor': () => import('@/views/gov/chongqing/vehicleStakeMonitor'),
  // 首页
  'CQHome': () => import('@/views/gov/chongqing/cqhome'),
  // 新能汽车统计分析
  'VrRunning': () => import('@/views/gov/chongqing/vrRunning'),
  'AlarmInfo': () => import('@/views/gov/chongqing/alarmInfo'),
  'VrElectricity': () => import('@/views/gov/chongqing/vrElectricity'),
  // 充电设施云检测
  'TestDataStatistics': () => import('@/views/gov/chongqing/testDataStatistics'),
  'TargetStatisticsAnalysis': () => import('@/views/gov/chongqing/targetStatisticsAnalysis'),
  // 预警及报警监测
  'VehicleWarning': () => import('@/views/gov/chongqing/vehicleWarning'),
  'DataTransferDecation': () => import('@/views/gov/chongqing/dataTransferDecation'),
  // 新能源汽车监测
  'VInfo': () => import('@/views/gov/chongqing/vInfo'),
  'AlarmHistoryArchive': () => import('@/views/gov/chongqing/alarmHistoryArchive'),
  'OneCar': () => import('@/views/gov/chongqing/oneCar'),
  'VehicleOnlineStatus': () => import('@/views/gov/chongqing/vehicleOnlineStatus'),
  'VehicleOnlineStatistics': () => import('@/views/gov/chongqing/vehicleOnlineStatistics'),
  'OneCarMiliage': () => import('@/views/gov/chongqing/oneCarMiliage'),
  'OneCarBattery': () => import('@/views/gov/chongqing/oneCarBattery'),
  'Vbattery': () => import('@/views/gov/chongqing/vbattery'),
  'VehicleDistributionDensity': () => import('@/views/gov/chongqing/vehicleDistributionDensity'),
  'VehicleCanData': () => import('@/views/gov/chongqing/vehicleCanData'),
  'VehicleMiliage': () => import('@/views/gov/chongqing/vehicleMiliage'),
  'VehicleNumByMiliage': () => import('@/views/gov/chongqing/vehicleNumByMiliage'),
  'VehicleHistory': () => import('@/views/gov/chongqing/vehicleHistory'),
  'OnlineMonitor': () => import('@/views/gov/chongqing/onlineMonitor'),
  // 数据质量管理
  'QualityOperator': () => import('@/views/gov/chongqing/qualityOperator'),
  'QualityStation': () => import('@/views/gov/chongqing/qualityStation'),
  'QualityStake': () => import('@/views/gov/chongqing/qualityStake'),
  'QualityConnector': () => import('@/views/gov/chongqing/qualityConnector'),
  // 反馈管理
  'InformationCorrection': () => import('@/views/gov/chongqing/informationCorrection'),
  'FeedBack': () => import('@/views/gov/chongqing/feedBack'),
  'EvaluationAudit': () => import('@/views/gov/chongqing/evaluationAudit'),
  // 运营商平台ope - 产业发展概况
  'OpeChargeFaility': () => import('@/views/ope/chongqingOpe/chargeFaility'),
  'OpeStakeMonitor': () => import('@/views/ope/chongqingOpe/stakeMonitor'),
  // 运营商平台ope - 充电设施建设统计
  'OpeStakeArchive': () => import('@/views/ope/chongqingOpe/stakeArchive'),
  'OpeStationArchive': () => import('@/views/ope/chongqingOpe/stationArchive'),
  // 运营商平台ope - 充电设施运营统计
  'OpeStationManager': () => import('@/views/ope/chongqingOpe/stationManager'),
  'OpeTradingOrder': () => import('@/views/ope/chongqingOpe/tradingOrder'),
  'OpeSrOperationArea': () => import('@/views/ope/chongqingOpe/srOperationArea'),
  'OpeStakeServiceRadius': () => import('@/views/ope/chongqingOpe/stakeServiceRadius'),
  'OpeStakeHeatMap': () => import('@/views/ope/chongqingOpe/stakeHeatMap'),
  // 运营商平台ope - 运营商信息填报
  'OpeInformation': () => import('@/views/ope/chongqingOpe/operatorInformation')
}

// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: '*',
  redirect: '/404',
  hidden: true
}
const exceptionRouter = {
  path: '/exception',
  component: RouteView,
  name: 'exception',
  hidden: true,
  meta: {
    title: '错误页',
    show: false,
    keepAlive: true
  },
  children: [{
    path: '/exception/404',
    name: '404',
    component: constantRouterComponents['404'],
    meta: {
      title: '404',
      keepAlive: true
    }
  },
  {
    path: '/exception/403',
    name: '403',
    component: constantRouterComponents['403'],
    meta: {
      title: '403',
      keepAlive: true
    }
  },
  {
    path: '/exception/500',
    name: '500',
    component: constantRouterComponents['500'],
    meta: {
      title: '500',
      keepAlive: true
    }
  }
    // {
    //   path: '/designs',
    //   name: 'design',
    //   component: () => import('@/views/flowEditor/design.vue')
    // },
    // {
    //   path: '/processCheck',
    //   name: 'process',
    //   component: () => import('@/views/flowEditor/processCheck.vue')
    // }
  ]
}
const basicRouter = {
  path: '/account',
  component: RouteView,
  redirect: '/account/center',
  name: 'account',
  hidden: true,
  meta: {
    title: '个人页',
    show: false,
    icon: 'user',
    keepAlive: true,
    permission: ['user']
  },
  children: [{
    path: '/account/center',
    name: 'center',
    component: () => import('@/views/account/center/Index'),
    meta: {
      title: '个人中心',
      keepAlive: true,
      permission: ['user']
    }
  },
  {
    path: '/account/settings',
    name: 'settings',
    component: () => import('@/views/account/settings/Index'),
    meta: {
      title: '个人设置',
      hideHeader: true,
      permission: ['user']
    },
    redirect: '/account/settings/base',
    hideChildrenInMenu: true,
    children: [{
      path: '/account/settings/base',
      name: 'BaseSettings',
      component: () => import('@/views/account/settings/BaseSetting'),
      meta: {
        title: '基本设置',
        hidden: true,
        permission: ['user']
      }
    },
    {
      path: '/account/settings/security',
      name: 'SecuritySettings',
      component: () => import('@/views/account/settings/Security'),
      meta: {
        title: '安全设置',
        hidden: true,
        keepAlive: true,
        permission: ['user']
      }
    },
    {
      path: '/account/settings/custom',
      name: 'CustomSettings',
      component: () => import('@/views/account/settings/Custom'),
      meta: {
        title: '个性化设置',
        hidden: true,
        keepAlive: true,
        permission: ['user']
      }
    },
    {
      path: '/account/settings/binding',
      name: 'BindingSettings',
      component: () => import('@/views/account/settings/Binding'),
      meta: {
        title: '账户绑定',
        hidden: true,
        keepAlive: true,
        permission: ['user']
      }
    },
    {
      path: '/account/settings/notification',
      name: 'NotificationSettings',
      component: () => import('@/views/account/settings/Notification'),
      meta: {
        title: '新消息通知',
        hidden: true,
        keepAlive: true,
        permission: ['user']
      }
    }
    ]
  }
  ]
}
// 根级菜单
const rootRouter = {
  key: '',
  name: 'index',
  path: '',
  component: 'BasicLayout',
  redirect: config.homePage,
  meta: {
    title: '首页'
  },
  children: []
}

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = (token) => {
  return new Promise((resolve, reject) => {
    loginService.getCurrentUserNav(token).then(res => {
      const result = res
      const menuNav = []
      //      后端数据, 根级树数组,  根级 PID
      rootRouter.children = result
      menuNav.push(rootRouter)
      const routers = generator(menuNav)
      // 添加基础路由
      routers[0].children.push(basicRouter)
      routers[0].children.push(exceptionRouter)
      routers.push(notFoundRouter)
      resolve(routers)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent) => {
  return routerMap.map(item => {
    const {
      title,
      show,
      description,
      permission,
      type,
      hideChildren,
      hiddenHeaderContent,
      icon,
      metadata
    } = item.meta || {}
    const currentRouter = {
      // 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.path || `${parent && parent.path || ''}/${item.key}`,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      // 该路由对应页面的 组件 :方案1
      component: constantRouterComponents[item.component || item.key],
      // 该路由对应页面的 组件 :方案2 (动态加载)
      // component: () => import(`@/views/${item.component}`),

      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: title,
        icon: icon || undefined,
        hiddenHeaderContent: hiddenHeaderContent,
        permission: permission,
        description: description,
        type: type,
        other: metadata
      }
    }
    // 是否设置了隐藏菜单
    if (type === 3) {
      currentRouter.hidden = true
    }
    // 是否设置了隐藏子菜单
    if (hideChildren) {
      currentRouter.hideChildrenInMenu = true
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }
    return currentRouter
  })
}

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
/* const listToTree = (list, tree, parentId) => {
  list.forEach(item => {
    // 判断是否为父级菜单
    if (item.parentId === parentId) {
      const child = {
        ...item,
        key: item.key || item.name,
        children: []
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, item.id)
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children
      }
      // 加入到树中
      tree.push(child)
    }
  })
} */
