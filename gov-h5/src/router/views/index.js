import Layout from 'src/views/main/pagesContainer'
const _import_ = file => () => import('src/views/' + file + '.vue')
export default [
  {
    path: '/home',
    component: _import_('home/home'),
    name: '首页',
    meta: {
      keepAlive: true,
      isAuth: false
    }
  },
  {
    path: '/homeDetail',
    component: _import_('home/detail'),
    name: 'homeDetail',
    meta: {
      keepAlive: true,
      isAuth: false
    }
  },
  {
    path: '/login',
    component: () => import('src/components/Login/index'),
    name: 'login',
    meta: {
      keepAlive: false,
      isAuth: false
    }
  },
  /* 列表页 */
  {
    path: '/stationList',
    component: _import_('pages/stationList'),
    name: 'stationList',
    meta: {
      keepAlive: false,
      isAuth: false
    }
  },
  /* 站点详情 */
  {
    path: '/stationDetails',
    component: _import_('pages/stationDetails'),
    name: 'stationDetails',
    meta: {
      keepAlive: false,
      isAuth: false
    }
  },
  /* 搜索页 */
  {
    path: '/search',
    component: _import_('pages/search'),
    name: 'search',
    meta: {
      keepAlive: false,
      isAuth: false
    }
  },
  /* 收藏中心 */
  {
    path: '/collection',
    component: _import_('pages/collection'),
    name: 'collection',
    meta: {
      keepAlive: false,
      isAuth: false
    }
  },
  // 注册页
  {
    path: '/register',
    name: 'register',
    component: _import_('register/register'),
    meta: {
      keepAlive: false,
      isAuth: false
    }

  },
  // 忘记密码
  {
    path: '/changePassWord',
    name: 'changePassWord',
    component: _import_('changePassword/changePassWord'),
    meta: {
      keepAlive: false,
      isAuth: false
    }

  },
  // 参与评价
  {
    path: '/evaluate',
    name: 'evaluate',
    component: _import_('evaluate/evaluate'),
    meta: {
      keepAlive: false,
      isAuth: false
    }

  },
  // 电价详情
  {
    path: '/electrovalence',
    name: 'electrovalence',
    component: _import_('electrovalence/electrovalence'),
    meta: {
      keepAlive: false,
      isAuth: false
    }

  },
  {
    path: '/feedback',
    component: _import_('pages/feedback'),
    name: '意见反馈',
    meta: {
      keepAlive: false,
      isAuth: false
    }
  },
  // 资讯
  {
    path: '/information',
    component: _import_('personal/information'),
    name: 'information',
    meta: {
      keepAlive: true,
      isAuth: false
    }
  },
  {
    path: '/infoDetail',
    component: _import_('personal/informationContent'),
    name: 'infoDetail',
    meta: {
      keepAlive: false,
      isAuth: false
    }
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/test/test1',
    children: [{
      meta: {
        keepAlive: false,
        isAuth: false
      },
      path: 'test1',
      name: '测试1',
      component: _import_('test/test1')
    },
    {
      meta: {
        keepAlive: false,
        isAuth: false
      },
      path: 'test2',
      name: '测试2',
      component: _import_('test/test2')
    }
    ]
  },
  {
    path: '/test2',
    component: () => import('src/views/test2/test2'),
    name: 'test2',
    meta: {
      keepAlive: false,
      isAuth: false
    }
  },
  // 个人资料和设置相关
  {
    path: '/menterInfo',
    component: Layout,
    redirect: '/menterInfo/index',
    children: [{
      meta: {
        keepAlive: false,
        isAuth: true
      },
      path: 'index',
      name: '个人资料',
      component: _import_('menterInfo/index')
    },
    {
      meta: {
        keepAlive: false,
        isAuth: true
      },
      path: 'editName',
      name: '修改昵称',
      component: _import_('menterInfo/editName')
    },
    {
      meta: {
        keepAlive: false,
        isAuth: true
      },
      path: 'editSign',
      name: '修改个性签名',
      component: _import_('menterInfo/editSign')
    }
    ]
  },
  {
    path: '/memberSetting',
    component: Layout,
    redirect: '/memberSetting/index',
    children: [{
      meta: {
        keepAlive: false,
        isAuth: false
      },
      path: 'index',
      name: '设置',
      component: _import_('memberSetting/index')
    },
    {
      meta: {
        keepAlive: false,
        isAuth: false
      },
      path: 'aboutUs',
      name: '关于我们',
      component: _import_('memberSetting/aboutUs')
    },
    {
      meta: {
        keepAlive: true,
        isAuth: false
      },
      path: 'serviceAgreement',
      name: '服务协议',
      component: _import_('memberSetting/serviceAgreement')
    },
    {
      meta: {
        keepAlive: true,
        isAuth: false
      },
      path: 'privacyGuide',
      name: '隐私指南',
      component: _import_('memberSetting/privacyGuide')
    }
    ]
  },
  // 车企
  {
    path: '/roleCar/index',
    component: _import_('roleCar/index'),
    name: '车企首页',
    meta: {
      keepAlive: true,
      isAuth: true
    }
  },
  // 车 统计信息-1
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleCarCountInfo1',
    name: 'roleCarCountInfo1',
    component: _import_('roleCar/roleCarCountInfo1')
  },
  // 车 统计信息-2
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleCarCountInfo2',
    name: 'roleCarCountInfo2',
    component: _import_('roleCar/roleCarCountInfo2')
  },
  // 车 统计信息-3
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleCarCountInfo3',
    name: 'roleCarCountInfo3',
    component: _import_('roleCar/roleCarCountInfo3')
  },
  // 车 统计信息-4
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleCarCountInfo4',
    name: 'roleCarCountInfo4',
    component: _import_('roleCar/roleCarCountInfo4')
  },
  // 车 基础信息-1
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleCarBasicInfo1',
    name: 'roleCarBasicInfo1',
    component: _import_('roleCar/roleCarBasicInfo1')
  },
  // 车 基础信息-2
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleCarBasicInfo2',
    name: 'roleCarBasicInfo2',
    component: _import_('roleCar/roleCarBasicInfo2')
  },
  // 车 基础信息-3
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleCarBasicInfo3',
    name: 'roleCarBasicInfo3',
    component: _import_('roleCar/roleCarBasicInfo3')
  },
  // 车 基础信息-4
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleCarBasicInfo4',
    name: 'roleCarBasicInfo4',
    component: _import_('roleCar/roleCarBasicInfo4')
  },
  // 桩企
  {
    path: '/roleStake/index',
    component: _import_('roleStake/index'),
    name: '桩企首页',
    meta: {
      keepAlive: true,
      isAuth: true
    }
  },
  // 桩 统计信息-1
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleStakeCountInfo1',
    name: 'roleStakeCountInfo1',
    component: _import_('roleStake/roleStakeCountInfo1')
  },
  // 桩 统计信息-2
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleStakeCountInfo2',
    name: 'roleStakeCountInfo2',
    component: _import_('roleStake/roleStakeCountInfo2')
  },
  // 桩 统计信息-3
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleStakeCountInfo3',
    name: 'roleStakeCountInfo3',
    component: _import_('roleStake/roleStakeCountInfo3')
  },
  // 桩 统计信息-4
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleStakeCountInfo4',
    name: 'roleStakeCountInfo4',
    component: _import_('roleStake/roleStakeCountInfo4')
  },
  // 桩 基础信息-1
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleStakeBasicInfo1',
    name: 'roleStakeBasicInfo1',
    component: _import_('roleStake/roleStakeBasicInfo1')
  },
  // 桩 基础信息-2
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleStakeBasicInfo2',
    name: 'roleStakeBasicInfo2',
    component: _import_('roleStake/roleStakeBasicInfo2')
  },
  // 桩 基础信息-3
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleStakeBasicInfo3',
    name: 'roleStakeBasicInfo3',
    component: _import_('roleStake/roleStakeBasicInfo3')
  },
  // 桩 基础信息-4
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleStakeBasicInfo4',
    name: 'roleStakeBasicInfo4',
    component: _import_('roleStake/roleStakeBasicInfo4')
  },

  // 政府
  /* -----------------------------------------政府start---------------------------------------------------------- */
  {
    path: '/roleGov/index',
    component: _import_('roleGov/index'),
    name: '政府首页',
    meta: {
      keepAlive: true,
      isAuth: true
    }
  },
  // 车企总体概况
  {
    path: '/roleGov/carBasicInfo1',
    component: _import_('roleGov/carBasicInfo1'),
    name: 'carBasicInfo1',
    meta: {
      keepAlive: true,
      isAuth: false
    }
  },
  // 车辆分布
  {
    path: '/roleGov/carBasicInfo2',
    component: _import_('roleGov/carBasicInfo2'),
    name: 'carBasicInfo2',
    meta: {
      keepAlive: true,
      isAuth: false
    }
  },
  {
    path: '/roleGov/carBasicInfo3',
    component: _import_('roleGov/carBasicInfo3'),
    name: '车企排行',
    meta: {
      keepAlive: true,
      isAuth: false
    }
  },
  // 接入车企
  {
    path: '/roleGov/carBasicInfo4',
    component: _import_('roleGov/carBasicInfo4'),
    name: 'carBasicInfo4',
    meta: {
      keepAlive: true,
      isAuth: false
    }
  },
  // 桩企总体概况
  {
    path: '/roleGov/stakeBasicInfo1',
    component: _import_('roleGov/stakeBasicInfo1'),
    name: 'stakeBasicInfo1',
    meta: {
      keepAlive: true,
      isAuth: false
    }
  },
  // 桩企分布
  {
    path: '/roleGov/stakeBasicInfo2',
    component: _import_('roleGov/stakeBasicInfo2'),
    name: 'stakeBasicInfo2',

    meta: {
      keepAlive: true,
      isAuth: false
    }
  },
  // 桩企排行
  {
    path: '/roleGov/stakeBasicInfo3',
    component: _import_('roleGov/stakeBasicInfo3'),
    name: 'stakeBasicInfo3',
    meta: {
      keepAlive: true,
      isAuth: false
    }
  },
  // 桩企接入桩企
  {
    path: '/roleGov/stakeBasicInfo4',
    component: _import_('roleGov/stakeBasicInfo4'),
    name: 'stakeBasicInfo4',

    meta: {
      keepAlive: false,
      isAuth: false
    }
  },
  // 车 统计信息-当前现状
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleGov/carCountInfo2',
    name: 'carCountInfo2',
    component: _import_('roleGov/carCountInfo2')
  },
  // 车 统计信息-行驶分析
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleGov/carCountInfo3',
    name: 'carCountInfo3',
    component: _import_('roleGov/carCountInfo3')
  },
  // 车 统计信息-习惯分析
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleGov/carCountInfo4',
    name: 'carCountInfo4',
    component: _import_('roleGov/carCountInfo4')
  },
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleGov/carCountInfo',
    name: 'carCountInfo',
    component: _import_('roleGov/carCountInfo')
  },
  /* 充电统计 */
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleGov/carCountInfo1',
    name: 'carCountInfo1',
    component: _import_('roleGov/carCountInfo1')
  },
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleGov/stakeCountInfo2',
    name: 'stakeCountInfo2',
    component: _import_('roleGov/stakeCountInfo2')
  },
  /* 运行情况 */
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleGov/stakeCountInfo1',
    name: 'stakeCountInfo1',
    component: _import_('roleGov/stakeCountInfo1')
  },
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleGov/stakeCountInfo3',
    name: 'stakeCountInfo3',
    component: _import_('roleGov/stakeCountInfo3')
  },
  /* 运行情况 */
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleGov/stakeCountInfo4',
    name: 'stakeCountInfo4',
    component: _import_('roleGov/stakeCountInfo4')
  },
  /* 热力图分布密度 */
  {
    meta: {
      keepAlive: true,
      isAuth: false
    },
    path: '/roleGov/hotmapPage',
    name: 'hotmapPage',
    component: _import_('roleGov/hotmapPage')
  }
  /* ------------------------政府end----------------------------- */
]
