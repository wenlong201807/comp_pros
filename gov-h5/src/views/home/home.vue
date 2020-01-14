<template>
  <div style="font-size: 0.32rem; height: 100%; position: relative; overflow: hidden;"
       class="homeContent">
    <img v-if="isShowLocation"
         src="home/dw4.png"
         style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 666">
    <!-- <van-overlay :show="overlayShow"
                 z-index="10000">
      <div class="wrapper"
           @click.stop>
        <van-loading type="spinner" />
      </div>
    </van-overlay> -->
    <Map :style="mapHeight"></Map>
    <van-search v-model="searchContent"
                placeholder="搜索充电站、充电桩"
                shape="round"
                v-if="!detailShow"
                style="position: absolute; top: 0.8rem; right: 2.5%; width: 95%; border-radius: 5px; padding: 5px; z-index: 999; box-shadow: 0 0 5px #999;"
                @focus="focusSearch"
                @search="onSearch">
      <van-image round
                 slot="left-icon"
                 width="30px"
                 height="30px"
                 class="imagePhoto"
                 :src="photoSrc"
                 @click="showPopup" />
      <div slot="right-icon">
        <img src="./../../assets/home/lists3x.png"
             @click="showList"
             style="display: inline-block; margin-right: 0.5rem; width:0.4rem; height:0.4rem;" />
        <img src="./../../assets/home/duihua3x.png"
             @click="showInformation"
             style="display: inline-block; width:0.4rem; height:0.4rem;" />
      </div>
    </van-search>
    <template v-if="userType===2">
      <div class="changeGov"
           @click="changeGovButton"></div>
    </template>
    <template v-else-if="userType===3">
      <div class="carUser"
           @click="carUserButton"></div>
    </template>
    <template v-else-if="userType===4">
      <div class="changeCompany"
           @click="changeCompanyButton"></div>
    </template>
    <div v-if="!stationList.length && stationListShow"
         style="height: 130px; position: absolute; bottom: 0.6rem; left: 10%; width: 80%; z-index: 1999; background-color: #fff; border-radius: 8px; box-shadow: 0 0 5px #aaa; line-height: 130px; text-align: center;">
      周围暂无充电站
    </div>
    <!-- 注释掉是因为1,数据bug; 2,样式有问题,需要整改; 3,牵扯到点击地图上的点展示的问题,需要改js问题 -->
    <!-- <div v-if="stationList.length === 1"
         style="height: 130px; position: absolute; bottom: 0.6rem; left: 10%; width: 80%; z-index: 1999; background-color: #fff; border-radius: 8px; box-shadow: 0 0 5px #aaa; line-height: 130px; text-align: center;">
      <div style="font-size: 18px; margin-bottom: 0.1rem;">
        <div style="display: inline-block; font-weight:600; line-height: 30px;">
          <img :src="opeImgSrc(singleStation.operatorId)"
               onerror="javascript:this.src='home/operator/operator_default.png';"
               style="width: 0.35rem; height: 0.35rem; display: inline-block; vertical-align: middle; margin-right: 0.2rem;">
          <span style=" display: inline-block; vertical-align: middle; width: 3rem; "
                class="van-ellipsis">{{ singleStation.stationName }}</span>
        </div>
        <div style="position: absolute; top: 0.25rem; right: 0.4rem; font-size: 12px; color: #999;">
          <img style="width: 0.18rem; height: 0.18rem;"
               src="home/operator/go.png">
          距离:{{ singleStation.distance }}km
        </div>
      </div>
      <div style="font-size: 12px; margin-bottom: 0.2rem; color: #999; width: 90%; margin-left: 0.55rem;"
           class="van-ellipsis">{{ singleStation.address }}</div>
      <div style="margin-bottom: 0.2rem; font-size: 12px; margin-left: 0.55rem;">
        <span style="display: inline-block; vertical-align: middle;">{{ singleStation.operatorName || '暂无信息' }}</span>
        <span style="margin: 0 0.3rem; display: inline-block; vertical-align: middle;">丨</span>
        <img src="../../assets/operator/star_percent.png"
             style="width: 12px; height: 12px; display: inline-block; vertical-align: middle; margin-right: 0.1rem;">
        <span style="display: inline-block; vertical-align: middle;">{{ singleStation.grade }}分</span>
      </div>
      <div style="margin-left: 0.55rem; font-size: 12px;">
        <div style="display: inline-block; width: 100px; border: 1px solid #e97a00; height: 22px; line-height: 20px; border-radius: 2px; margin-right: 0.2rem;">
          <div style="display: inline-block; background-color: #e97a00; color: #fff; width: 20px; height: 20px; line-height: 20px; text-align: center; border-radius: 1px;">
            直
          </div>
          <div style="display: inline-block; width: 78px; text-align: center; color:#999;">
            空闲<span style="color: #e97a00;">{{ singleStation.dirFree }}</span>/{{ singleStation.dirNum }}
          </div>
        </div>
        <div style="display: inline-block; width: 100px; border: 1px solid #01b032; height: 22px; line-height: 20px; border-radius: 2px;">
          <div style="display: inline-block; background-color: #01b032; color: #fff; width: 20px; height: 20px; line-height: 20px; text-align: center; border-radius: 1px;">
            交
          </div>
          <div style="display: inline-block; width: 78px; text-align: center; color:#999;">
            空闲<span style="color: #01b032;">{{ singleStation.comFree }}</span>/{{ singleStation.comNum }}
          </div>
        </div>
      </div>
    </div> -->
    <swiper :options="swiperOption"
            v-if="stationList.length && stationListShow"
            ref="mySwiper"
            style="height: 130px; position: absolute; bottom: 0.6rem; width: 100%; z-index: 999;">
      <swiper-slide v-for="(item, index) in stationList"
                    style="padding: 0.1rem 0.25rem; background-color: #fff; border-radius: 8px; box-shadow: 0 0 5px #aaa;"
                    :key="index">
        <div style="font-size: 18px; margin-bottom: 0.1rem;">
          <div style="display: inline-block; font-weight:600; line-height: 30px;">
            <img :src="opeImgSrc(item.operatorId)"
                 onerror="javascript:this.src='home/operator/operator_default.png';"
                 style="width: 0.35rem; height: 0.35rem; display: inline-block; vertical-align: middle; margin-right: 0.2rem;">
            <span style=" display: inline-block; vertical-align: middle; width: 3rem; "
                  class="van-ellipsis">{{ item.stationName }}</span>
          </div>
          <div style="position: absolute; top: 0.25rem; right: 0.4rem; font-size: 12px; color: #999;">
            <img style="width: 0.18rem; height: 0.18rem;"
                 src="home/operator/go.png">
            距离:{{ item.distance }}km
          </div>
        </div>
        <div style="font-size: 12px; margin-bottom: 0.2rem; color: #999; width: 90%; margin-left: 0.55rem;"
             class="van-ellipsis">{{ item.address }}</div>
        <div style="margin-bottom: 0.2rem; font-size: 12px; margin-left: 0.55rem;">
          <span style="display: inline-block; vertical-align: middle;">{{ item.operatorName || '暂无信息' }}</span>
          <span style="margin: 0 0.3rem; display: inline-block; vertical-align: middle;">丨</span>
          <img src="../../assets/operator/star_percent.png"
               style="width: 12px; height: 12px; display: inline-block; vertical-align: middle; margin-right: 0.1rem;">
          <span style="display: inline-block; vertical-align: middle;">{{ item.grade }}分</span>
        </div>
        <div style="margin-left: 0.55rem; font-size: 12px;">
          <div style="display: inline-block; width: 100px; border: 1px solid #e97a00; height: 22px; line-height: 20px; border-radius: 2px; margin-right: 0.2rem;">
            <div style="display: inline-block; background-color: #e97a00; color: #fff; width: 20px; height: 20px; line-height: 20px; text-align: center; border-radius: 1px;">
              直
            </div>
            <div style="display: inline-block; width: 78px; text-align: center; color:#999;">
              空闲<span style="color: #e97a00;">{{ item.dirFree }}</span>/{{ item.dirNum }}
            </div>
          </div>
          <div style="display: inline-block; width: 100px; border: 1px solid #01b032; height: 22px; line-height: 20px; border-radius: 2px;">
            <div style="display: inline-block; background-color: #01b032; color: #fff; width: 20px; height: 20px; line-height: 20px; text-align: center; border-radius: 1px;">
              交
            </div>
            <div style="display: inline-block; width: 78px; text-align: center; color:#999;">
              空闲<span style="color: #01b032;">{{ item.comFree }}</span>/{{ item.comNum }}
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <van-button type="info"
                :loading="dwloading"
                loading-text="加载中..."
                @click="navigation"
                style="position: absolute; left: 50%; bottom: 170px; width: 2rem; height: 0.8rem; transform: translate(-50%, 0); border-radius: 1rem; z-index: 999; line-height: 1;">
      <img src="../../assets/detail/line.png"
           style="height: 0.26rem;" />
      导航
    </van-button>
    <van-popup v-model="show1"
               round=""
               position="bottom"
               :style="{ height: '40%' }">
      <van-row class="mapWrap">
        <p class="mapTitle">选择第三方地图跳转</p>
        <p class="mapName"
           @click="toMapApp">高德地图</p>
        <p class="mapName"
           @click="toMapApp">百度地图</p>
      </van-row>
      <div class="mapBorder"></div>
      <van-row class="mapWrap">
        <p class="cancelBtn"
           @click="show1 = false">取消</p>
      </van-row>
    </van-popup>

    <van-popup v-model="show"
               closeable
               close-icon="arrow-left"
               position="left"
               :style="{ height: '100%' }">
      <van-row class="popTop">
        <van-image round
                   class="photo"
                   :src="photoSrc"
                   @click="toEdit" />
      </van-row>
      <van-row class="photoText">
        <p class="photoName"
           @click="toEdit">{{ loginPersonName }}</p>

      </van-row>
      <p v-if="signature===null"
         class="editText">
        <i class="editIcon"
           @click="toEdit"></i>编辑此处设置您的个性签名</p>
      <p v-else
         class="editText">
        {{ signature }}</p>
      <van-row class="functionList">
        <ul>
          <!-- <li class="listItem"
              @click="RouterToPage('资讯')">
            <van-col span="8"><span class="listText msg">资讯</span></van-col>
            <van-col span="2"
                     offset="14">
              <van-icon name="arrow" />
            </van-col>
          </li> -->
          <li class="listItem"
              @click="RouterToPage('收藏')">
            <van-col span="8"><span class="listText collection">收藏</span></van-col>
            <van-col span="2"
                     offset="14">
              <van-icon name="arrow" />
            </van-col>
          </li>
          <li class="listItem"
              @click="RouterToPage('反馈')">
            <van-col span="8"><span class="listText feedback">反馈</span></van-col>
            <van-col span="2"
                     offset="14">
              <van-icon name="arrow" />
            </van-col>
          </li>
          <li class="listItem"
              @click="RouterToPage('安全')">
            <van-col span="8"><span class="listText safe">安全</span></van-col>
            <van-col span="2"
                     offset="14">
              <van-icon name="arrow" />
            </van-col>
          </li>
          <li class="listItem"
              @click="RouterToPage('设置')">
            <van-col span="8"><span class="listText setUp">设置</span></van-col>
            <van-col span="2"
                     offset="14">
              <van-icon name="arrow" />
            </van-col>
          </li>
        </ul>
      </van-row>
      <div class="logOut">
        <van-button class="login"
                    @click="logOut"
                    :disabled="state.loginBtn">退出登录</van-button>
      </div>
      <van-row class="edition">
        <span>当前版本 v1.01</span>
      </van-row>
    </van-popup>
    <loadingStatus :content="content"
                   :loadingStatus="showLoading"></loadingStatus>
    <loadingStatus :content="content1"
                   :loadingStatus="showLoading1"></loadingStatus>
    <div @click="backToLocation"
         style="width: 0.8rem; height: 0.8rem; position: absolute; left: 3%; bottom: 170px; background-color: #fff; box-shadow: 0 0 5px #aaa; border-radius: 0.1rem; z-index: 999;">
      <img src="../../assets/home/dw3x.png"
           style="height: 0.8rem; width: 0.8rem;">
    </div>
    <div @click="showListWeb"
         style="width: 0.8rem; height: 0.8rem; position: absolute; right: 3%; bottom: 170px; background-color: #fff; box-shadow: 0 0 5px #aaa; border-radius: 0.1rem; z-index: 999;">
      <img src="../../assets/home/list3x.png"
           style="height: 0.35rem; width: 0.35rem; position: absolute; top: 0.22rem; left:0.22rem;">
    </div>
    <van-popup v-model="detailShow"
               :overlay="false"
               style="height: 78%; box-shadow: 0 0 2px #bbb; overflow: visible;"
               position="bottom">
      <div @click="hideDetail"
           v-if="detailShow"
           style="position: absolute; top: -0.25rem; width: 0.8rem; height: 0.6rem; background: #fff; z-index: 2030; left: calc(50% - 0.4rem); box-shadow: 0 0 5px #222; border-radius: 0.4rem 0.4rem 0 0;"></div>
      <div @click="hideDetail"
           style="position: absolute; top: 0.1rem; width: 1rem; height: 0.4rem; background: #fff; z-index: 2090; left: calc(50% - 0.5rem);">
        <img src="../../assets/detail/down.png"
             style="height: 1rem; width: 1rem; position: absolute; top: -0.4rem;">
      </div>
      <div class="main">
        <van-tabs v-model="activeName"
                  color="#000000"
                  swipeable>
          <van-tab title="充电站"
                   class="main_tab"
                   name="a">
            <div class="main_title"></div>
            <div class="main_main">
              <div class="main_img">
                <img class="main_img_style"
                     :src="opeImgSrc(stationDetail.operatorId)"
                     onerror="javascript:this.src='home/operator/operator_default.png';">
              </div>
              <div class="main_box">
                <div class="box_title">
                  <div class="box_title_left van-ellipsis">{{ stationDetail.stationName || '' }}</div>
                  <div class="box_title_right">
                    <img class="box_title_right_img"
                         src="home/operator/go.png">
                    <span class="box_title_right_txt">距离{{ stationDetail.distance || 0 }}km</span>
                  </div>
                </div>
                <div class="box_address">{{ stationDetail.address || '' }}</div>
                <div class="box_station">
                  <div class="station_left">
                    <div class="station_left_img">
                      <img class="station_img"
                           src="home/operator/DC_station.png"
                           alt="">
                    </div>
                    <div class="station_right_txt">
                      <div class="station_txt_top">
                        <span class="station_top_num">{{ stationDetail.dirFree || 0 }}</span>
                        <span class="station_top_span">空闲</span>
                      </div>
                      <div class="station_txt_bottom">共{{ stationDetail.dirNum || 0 }}个直流桩</div>
                    </div>
                  </div>
                  <div class="station_mid"></div>
                  <div class="station_right">
                    <div class="station_left_img">
                      <img class="station_img"
                           src="home/operator/AC_station.png"
                           alt="">
                    </div>
                    <div class="station_right_txt">
                      <div class="station_txt_top">
                        <span class="station_top_num">{{ stationDetail.comFree || 0 }}</span>
                        <span class="station_top_span">空闲</span>
                      </div>
                      <div class="station_txt_bottom">共{{ stationDetail.comNum || 0 }}个交流桩</div>
                    </div>
                  </div>
                </div>
                <div class="main_content">
                  <div class="content_left">运营商</div>
                  <div class="content_right">{{ stationDetail.operatorName || '' }}</div>
                </div>
                <div class="main_content">
                  <div class="content_left">电站状态</div>
                  <div class="content_right">营业中</div>
                </div>
                <div class="main_content">
                  <div class="content_left">营业时间</div>
                  <div class="content_right">{{ stationDetail.busineHours || '' }}</div>
                </div>
                <div class="main_content">
                  <div class="content_left">地址</div>
                  <div class="content_right">{{ stationDetail.address || '' }}</div>
                </div>
                <div class="main_content">
                  <div class="content_left">充电桩数量</div>
                  <div class="content_right">{{ stationDetail.stakeNum || 0 }}</div>
                </div>
                <div class="main_content">
                  <div class="content_left">交流桩数量</div>
                  <div class="content_right">{{ stationDetail.comNum || 0 }}</div>
                </div>
                <div class="main_content">
                  <div class="content_left">直流桩数量</div>
                  <div class="content_right">{{ stationDetail.dirNum || 0 }}</div>
                </div>
                <div class="main_content">
                  <div class="content_left">一体桩数量</div>
                  <div class="content_right">{{ stationDetail.otherNum || 0 }}</div>
                </div>
                <div class="main_content">
                  <div class="content_left">当前电价</div>
                  <div class="content_right">{{ stationDetail.eleFee || 0 }}</div>
                </div>
                <div class="main_content">
                  <div class="content_left">停车费</div>
                  <div class="content_right">{{ stationDetail.parkFee || 0 }}</div>
                </div>
                <div class="main_content">
                  <div class="content_left">服务费</div>
                  <div class="content_right">{{ stationDetail.serviceFee || 0 }}</div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="站内桩"
                   class="main_tab"
                   name="b">
            <div class="main_title"></div>
            <div class="main_stake">
              <div class="stake_title">
                <div class="stake_btn"
                     :class="(this.stakeFlag === 0 ? 'stake_btn_checked' : '')"
                     @click="stakeChange(0)">全部</div>
                <div class="stake_btn"
                     :class="(this.stakeFlag === 3 ? 'stake_btn_checked' : '')"
                     @click="stakeChange(3)">空闲</div>
                <div class="stake_btn"
                     :class="(this.stakeFlag === 1 ? 'stake_btn_checked' : '')"
                     @click="stakeChange(1)">直流</div>
                <div class="stake_btn"
                     :class="(this.stakeFlag === 2 ? 'stake_btn_checked' : '')"
                     @click="stakeChange(2)">交流</div>
              </div>
              <div class="stake_main">
                <van-row>
                  <van-col class="stake_box"
                           :span="12"
                           v-for="item in stakeArr"
                           :key="item">
                    <div class="stake_left">
                      <div class="stake_left_div">
                        <img class="stake_left_img"
                             :src="stakeSrc(item.statusName)"
                             alt="">
                      </div>
                      <div class="stake_left_bottom">
                        <div :class="stakeClass(item.statusName)">{{ item.statusName.substr(0,2) }}</div>
                      </div>
                    </div>
                    <div class="stake_right">
                      <div class="stake_right1">
                        <img class="stake_right1_img"
                             :src="acdcSrc(item.equipmenttype)">
                        <span class="stake_right1_txt">{{ item.equipmentmodel }}</span>
                      </div>
                      <div class="stake_right_normal">
                        <span class="stake_right_normal1">接口</span>
                        <span class="stake_right_normal2">{{ item.equipmenttype }}</span>
                      </div>
                      <div class="stake_right_normal">
                        <span class="stake_right_normal1">功率</span>
                        <span class="stake_right_normal2">{{ item.powerinf }}kW</span>
                      </div>
                      <div class="stake_right_normal">
                        <span class="stake_right_normal1">电压</span>
                        <span class="stake_right_normal2">220V</span>
                      </div>
                    </div>
                  </van-col>
                </van-row>
              </div>
            </div>
          </van-tab>
          <van-tab title="评价"
                   class="main_tab"
                   name="c">
            <div class="main_title"></div>
            <div class="main_eva">
              <div class="eva_title">
                <div class="eva_title_left">
                  <span class="eva_title_span1">3.9</span>
                  <van-rate v-model="starVal"
                            size="16"
                            allow-half
                            readonly
                            void-icon="star"
                            void-color="#eee" />
                  <span class="eva_title_span2">129人评价</span>
                </div>
                <div class="eva_title_right"
                     @click="joinEvaluate">
                  <img class="eva_title_img"
                       src="home/operator/edit.png">
                  <span class="eva_title_txt">参与评价</span>
                </div>
              </div>
              <div class="eva_nav">
                <div class="eva_btn"
                     :class="(this.evaFlag === 0 ? 'eva_btn_checked' : '')"
                     @click="evaChange(0)">全部179</div>
                <div class="eva_btn"
                     :class="(this.evaFlag === 3 ? 'eva_btn_checked' : '')"
                     @click="evaChange(3)">好评157</div>
                <div class="eva_btn"
                     :class="(this.evaFlag === 2 ? 'eva_btn_checked' : '')"
                     @click="evaChange(2)">差评12</div>
                <div class="eva_btn"
                     :class="(this.evaFlag === 1 ? 'eva_btn_checked' : '')"
                     @click="evaChange(1)">有图26</div>
              </div>
              <scroller :on-refresh="refresh"
                        :on-infinite="infinite"
                        ref="my_scroller"
                        style="position:inherit;">
                <div class="eva_box"
                     v-for="item in arr"
                     :key="item.evaluationid">
                  <div class="eva_left">
                    <img class="eva_left_img"
                         src="home/operator/headimg.jpg">
                  </div>
                  <div class="eva_right">
                    <div class="eva_head">
                      <div class="eva_head_left">{{ item.evaluationid }}</div>
                      <div class="eva_head_right">{{ item.evaluationtime }}</div>
                    </div>
                    <div class="eva_head_star">
                      <van-rate v-model="item.evaluationgrade"
                                size="12"
                                allow-half
                                readonly
                                void-icon="star"
                                void-color="#eee" />
                    </div>
                    <div class="eva_box_main">{{ item.evaluationcontent }}</div>
                    <div class="eva_bottom">
                      <div class="eva_slider_left">
                        <img class="eva_slider_left_img"
                             src="home/operator/up.png">
                        <span class="eva_slider_left_txt">550</span>
                      </div>
                      <div class="eva_slider_mid">
                        <van-slider bar-height="10"
                                    v-model="value"
                                    :min="-50"
                                    :max="50"
                                    disabled
                                    inactive-color="#4a80fe"
                                    active-color="#fd6d2e">
                          <div slot="button"
                               class="custom-button"></div>
                        </van-slider>
                      </div>
                      <div class="eva_slider_right">
                        <img class="eva_slider_right_img"
                             src="home/operator/down.png"
                             alt="">
                        <span class="eva_slider_right_txt">240</span>
                      </div>
                    </div>
                  </div>
                </div>
              </scroller>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <div class="bottom">
        <div class="bottom_main_left">
          <div class="bottom_box">
            <img class="bottom_img_left"
                 v-if="isCollect === false"
                 src="home/operator/collection.png"
                 @click="startButton">
            <img class="bottom_img_left"
                 v-else
                 src="home/operator/collected.png"
                 @click="startYellowButton">
            <span class="bottom_txt">收藏</span>
          </div>
          <!-- <div class="bottom_box">
            <img class="bottom_img_left"
                 src="home/operator/share.png"
                 alt="">
            <span class="bottom_txt">分享</span>
          </div> -->
        </div>
        <div class="bottom_main_mid"></div>
        <div class="bottom_main_right">
          <div class="bottom_box_left"
               @click="callPhone(stationDetail.serviceTel)"
               :style="{ visibility:(stationDetail.serviceTel === '' ?'hidden':'visible')}">
            <img class="bottom_img_left"
                 src="home/operator/phone.png">
            <span class="bottom_txt">电话</span>
          </div>
          <div class="bottom_box_right"
               @click="toMapApp()">
            <img class="bottom_img_left"
                 src="home/operator/line.png"
                 alt="">
            <span class="bottom_txt">导航</span>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
// eslint-disable-next-line semi
import { setStore, getStore } from 'src/utils/store'
import Map from '@/components/amap/amap'
export default {
  name: 'Home',
  components: {
    Map
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  inject: ['reload'],
  data () {
    var that = this
    return {
      userInfoAll: null,
      photoSrc: require('../../../public/home/operator/operator_default.png'),
      loginPersonName: null,
      signature: null,
      map: null,
      searchContent: '',
      show: false,
      show1: false,
      markers: [],
      stationList: [],
      stationList1: [],
      stationListId: [],
      idArr: [],
      state: 'isNoEdit',
      infoWindow: null,
      detailShow: false,
      mapHeight: 'height: 100%',
      // overlayShow: false,
      userType: null,
      userSpecific: null,
      swiperOption: {
        loop: true,
        on: {
          tap () {
            var index
            if (this.activeIndex === 0) {
              index = that.stationList.length
            } else if (this.activeIndex - that.stationList.length === 1) {
              index = 1
            } else {
              index = this.activeIndex
            }
            that.getDetail(that.stationList[index - 1])
          },
          slideChangeTransitionEnd () {
            var index
            if (this.activeIndex === 0) {
              index = that.stationList.length
            } else if (this.activeIndex - that.stationList.length === 1) {
              index = 1
            } else {
              index = this.activeIndex
            }
            that.changeSwipe(index - 1)
          }
        }
      },
      content: '退出登录中...',
      content1: '加载中...',
      showLoading: false,
      showLoading1: false,
      stationListShow: true,

      // 详情相关
      activeName: 'a',
      starVal: 5,
      stakeFlag: 0,
      evaFlag: 0,
      value: 0,
      stationDetail: {
        stationName: '',
        distance: 0,
        address: '',
        dirFree: 0,
        dirNum: 0,
        comFree: 0,
        comNum: 0,
        operatorName: '',
        busineHours: '',
        stakeNum: 0,
        otherNum: 0,
        parkFee: 0,
        serviceFee: 0,
        eleFee: 0,
        operatorId: '',
        serviceTel: ''
      },
      // singleStation: {
      //   stationName: '',
      //   distance: 0,
      //   address: '',
      //   dirFree: 0,
      //   dirNum: 0,
      //   comFree: 0,
      //   comNum: 0,
      //   operatorName: '',
      //   busineHours: '',
      //   stakeNum: 0,
      //   otherNum: 0,
      //   parkFee: 0,
      //   serviceFee: 0,
      //   eleFee: 0,
      //   operatorId: '',
      //   serviceTel: ''
      // },
      lng: null,
      lat: null,
      stationDescip: null,

      stakeArr: [],
      stakeStationId: '',
      noDate: false,
      arr: [],
      page: 1,
      isShowLocation: false,
      opeImgArr: [
        '05170119X',
        '074782068',
        '174294168',
        '208307036',
        '208551282',
        '304927913',
        '313744932',
        '321895837',
        '395815801',
        '459290930',
        '581464144',
        '709374798',
        '771794240',
        '781559527',
        '903923316',
        'MA002TMQX',
        'MA5U73PQ1',
        'MA5U99RX9',
        'MA5UM90X8',
        'MA5UN4H83',
        'MA5UT67F5',
        'MA5YU02A5',
        'MA5YU3XL0',
        'MA5YYH8K3',
        'MA60C6KH6'
      ],
      isCollect: false,
      userId: null,
      dwloading: true,

      geolocation: null,
      geolocationPoint: []
    }
  },
  activated () {
    this.userSpecific = getStore('userSpecific')
    this.detailShow = getStore('key')
    this.userType = ''
    if (this.userSpecific !== null && this.userSpecific !== undefined && this.userSpecific !== '') {
      this.userType = this.userSpecific.usertype
      // console.log(this.userType)
    }
    this.initLoginMsg()
    this.show = false
  },
  mounted () {
    var that = this
    this.map = this.$store.getters.getMap
    // eslint-disable-next-line
    // that.map = new AMap.Map('iCenter')
    that.map.plugin('AMap.Geolocation', function () {
      // eslint-disable-next-line
      that.geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
        timeout: 10000, // 超过10秒后停止定位，默认：无穷大
        maximumAge: 0, // 定位结果缓存0毫秒，默认：0
        convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: false, // 显示定位按钮，默认：true
        buttonPosition: 'LB', // 定位按钮停靠位置，默认：'LB'，左下角
        // eslint-disable-next-line
        buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: false // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      })
      that.map.setZoom(14)
      that.map.addControl(that.geolocation)
      that.geolocation.getCurrentPosition()
      // eslint-disable-next-line
      AMap.event.addListener(that.geolocation, 'complete', that.onComplete)
      // eslint-disable-next-line
      AMap.event.addListener(that.geolocation, 'error', that.onError)
    })
    this.initMap()
    this.initLoginMsg()
    if (getStore('userInfoAll')) {
      this.userInfoAll = getStore('userInfoAll')
      this.userId = this.userInfoAll.id
    }
  },
  methods: {
    joinEvaluate () {
      var that = this
      setStore('key', that.detailShow)
      this.$router.push({ path: '/evaluate', query: {} })
    },
    callPhone (serviceTel) {
      this.$utils.callPhone(serviceTel)
    },
    onComplete (data) {
      var str = []
      str.push(data.position.getLat())
      str.push(data.position.getLng())
      localStorage.setItem('location-lng', data.position.getLng())
      localStorage.getItem('location-lat', data.position.getLat())
      this.geolocationPoint = [data.position.getLng(), data.position.getLat()]
      this.mapDrag(data.position.getLng(), data.position.getLat())
    },
    onError (data) {
      this.$notify('定位失败')
    },
    startButton () {
      var that = this
      if (!getStore('userInfoAll')) {
        setStore('key', that.detailShow)
        this.$router.push('/login')
      } else {
        const params = {
          userId: this.userId,
          collectionId: this.stationId,
          collectionType: 1
        }
        this.$store.dispatch('AppAddCollection', params).then(res => {
          that.isCollect = true
          this.$notify({ type: 'success', message: '收藏成功！', duration: 700 })
        }).catch(err => console.log(err))
      }
    },
    startYellowButton () {
      var that = this
      const params = {
        userId: this.userId,
        collectionId: this.stationId,
        collectionType: 1
      }
      this.$store.dispatch('AppDeleteCollection', params).then(res => {
        that.isCollect = false
        this.$notify({ type: 'success', message: '取消收藏成功！', duration: 700 })
      }).catch(err => console.log(err))
    },
    toMapApp () {
      const dstLngLat = {}
      dstLngLat.lng = this.lng
      dstLngLat.lat = this.lat
      // console.log(this.stationDescip)
      // console.log(dstLngLat)
      this.$beginNavi.openNavigation(dstLngLat, this.stationDescip)
    },
    refresh () {
      var that = this
      this.page = 1
      this.noDate = false
      setTimeout(function () {
        this.getData().then(res => {
          that.$refs.my_scroller.finishPullToRefresh(true)
        })
      }.bind(this), 1700)
    },
    navigation () {
      this.show1 = false
      this.toMapApp()
    },
    stakeChange (e) {
      this.stakeFlag = e
      const params = {
        selectType: this.stakeFlag,
        stationId: this.stakeStationId
      }
      this.$store.dispatch('AppMapstake', params).then(res => {
        this.stakeArr = res.list
      }).catch(err => { console.log(err) })
    },
    evaChange (e) {
      this.evaFlag = e
      this.getData()
    },
    getData () {
      var that = this
      return new Promise((resolve, reject) => {
        const params = {
          pageNum: that.page,
          // stationId: that.stationId,
          stationId: '110',
          pageSize: 10,
          type: that.evaFlag
        }
        that.$store.dispatch('AppEvaluationGrade', params).then(res => {
          if (res.pages === that.page || res.pages < that.page) {
            that.noDate = true
            if (res.pages === 1 || res.pages === 0) {
              that.arr = res.list
            }
          } else {
            if (that.page === 1) {
              that.arr = res.list
            } else {
              that.arr = that.arr.concat(res.list)
            }
          }
          resolve(res)
        }).catch(error => {
          console.log(error)
        })
      })
    },
    showListWeb () {
      this.$router.push('/stationList')
    },
    backToLocation () {
      this.isShowLocation = false
      this.map.panTo(this.geolocationPoint)
      this.map.setZoom(14)
    },
    initLoginMsg () {
      if (!getStore('userSpecific')) {
        this.photoSrc = require('../../../public/home/operator/operator_default.png')
      } else {
        this.userSpecific = getStore('userSpecific')
        this.loginPersonName = this.userSpecific.displayName
        // console.log(this.userSpecific)
        this.photoSrc = this.userSpecific.headPortrait ? this.userSpecific.headPortrait : require('../../../public/home/operator/operator_default.png')
        // console.log(this.photoSrc)
        this.signature = this.userSpecific.signature
      }
    },
    initMap () {
      var that = this
      that.map.on('dragstart', e => {
        that.isShowLocation = true
      })
      that.map.on('dragend', e => {
        var mapZoom = that.map.getZoom()
        if (mapZoom > 13) {
          that.map.clearInfoWindow()
          that.map.on('dragend', that.mapDrag())
        }
      })
      that.map.on('zoomend', e => {
        var mapZoom = that.map.getZoom()
        if (mapZoom > 13) {
          // that.map.add(that.markers)
        } else {
          // that.map.clearInfoWindow()
          // that.map.remove(that.markers)
          that.map.off('dragend', that.mapDrag)
        }
      })
    },
    mapDrag (lng, lat) {
      var that = this
      that.idArr = []
      that.stationList = []
      that.stationListId = []
      var icon
      var center = that.map.getCenter() // 获取当前地图中心位置
      var parsms
      if (lng && lat) {
        parsms = {
          lngLat: lng + ',' + lat,
          distance: 2500,
          orderType: 2
        }
      } else {
        parsms = {
          lngLat: center.lng + ',' + center.lat,
          distance: 2500,
          orderType: 2
        }
      }
      // that.overlayShow = true
      this.showLoading1 = true
      that.stationListShow = false
      this.$store.dispatch('MapStation', parsms).then(res => {
        this.dwloading = false
        this.showLoading1 = false
        that.stationListShow = true
        if (res.length > 0) {
          this.lng = res[0].lng
          this.lat = res[0].lat
          this.stationDescip = res[0].stationName
          // that.overlayShow = false
          for (var k in that.markers) {
            that.idArr.push(that.markers[k].Le.stationId)
          }

          // if (that.opeImgArr.indexOf(res[0].operatorId) > 0) {
          //   icon = '/home/' + res[0].operatorId + '.png'
          // } else {
          //   icon = '/home/000000000.png'
          // }

          // eslint-disable-next-line
          var showMarker = new AMap.Marker({
            // map: that.map,
            position: [res[0].lng, res[0].lat],
            // icon: icon,
            // eslint-disable-next-line
            offset: new AMap.Pixel(-25, -30)
          })
          showMarker.content = `
          <div style="height: 22px; line-height: 20px; margin-bottom: 0.2rem; margin-left: 8px;">
            <div style="display: inline-block; background-color: #e97a00; color: #fff; width: 20px; height: 20px; line-height: 20px; text-align: center; border-radius: 3px;">
              直
            </div>
            <div style="display: inline-block; min-width: 140px; text-align: center;">
              空闲<span style="color: #e97a00;">&nbsp;${res[0].dirFree}</span>/总桩数&nbsp;${res[0].dirNum}
            </div>
          </div>
          <div style="height: 22px; line-height: 20px; margin-left: 8px;">
            <div style="display: inline-block; background-color: #01b032; color: #fff; width: 20px; height: 20px; line-height: 20px; text-align: center; border-radius: 3px;">
              交
            </div>
            <div style="display: inline-block; min-width: 140px; text-align: center;">
              空闲<span style="color: #01b032;">&nbsp;${res[0].comFree}</span>/总桩数&nbsp;${res[0].comNum}
            </div>
          </div>`
          showMarker.on('click', that.markerWindow1)
          showMarker.emit('click', { target: showMarker })

          res = res.reverse()
          // if (res.length === 0) {
          //   that.singleStation = res[0]
          // }
          for (var i = 0, marker; i < res.length; i++) {
            that.stationListId.unshift(res[i].stationId)
            that.stationList.unshift(res[i])
            if (that.opeImgArr.indexOf(res[i].operatorId) > 0) {
              icon = 'home/' + res[i].operatorId + '.png'
            } else {
              icon = 'home/000000000.png'
            }
            // that.stationList[i].eleFee = res[i].eleFee.split('元')[0]
            if (that.idArr.indexOf(res[i].stationId) < 0) {
              // eslint-disable-next-line
              marker = new AMap.Marker({
                map: that.map,
                position: [res[i].lng, res[i].lat],
                lat: res[i].lat,
                lng: res[i].lng,
                icon: icon,
                stationId: res[i].stationId,
                stationName: res[i].stationName,
                distance: res[i].distance,
                address: res[i].address,
                operatorName: res[i].operatorName,
                grade: res[i].grade,
                busineHours: res[i].busineHours,
                dirFree: res[i].dirFree,
                dirNum: res[i].dirNum,
                comFree: res[i].comFree,
                comNum: res[i].comNum, // eslint-disable-next-line
                offset: new AMap.Pixel(-25, -30)
              })
              that.markers.push(marker)
              marker.content = `
              <div style="height: 22px; line-height: 20px; margin-bottom: 0.2rem; margin-left: 8px;">
                <div style="display: inline-block; background-color: #e97a00; color: #fff; width: 20px; height: 20px; line-height: 20px; text-align: center; border-radius: 3px;">
                  直
                </div>
                <div style="display: inline-block; min-width: 140px; text-align: center;">
                  空闲<span style="color: #e97a00;">&nbsp;${res[i].dirFree}</span>/总桩数&nbsp;${res[i].dirNum}
                </div>
              </div>
              <div style="height: 22px; line-height: 20px; margin-left: 8px;">
                <div style="display: inline-block; background-color: #01b032; color: #fff; width: 20px; height: 20px; line-height: 20px; text-align: center; border-radius: 3px;">
                  交
                </div>
                <div style="display: inline-block; min-width: 140px; text-align: center;">
                  空闲<span style="color: #01b032;">&nbsp;${res[i].comFree}</span>/总桩数&nbsp;${res[i].comNum}
                </div>
              </div>`
              marker.on('click', that.markerWindow)
            }
          }
        }
      }).catch(() => {
        this.showLoading1 = false
        this.$notify({ type: 'danger', message: '获取数据失败!' })
      })
    },
    markerWindow (e) {
      var that = this
      this.lng = e.target.Le.lng
      this.lat = e.target.Le.lat
      this.stationDescip = e.target.Le.stationName
      if (that.stationListId.indexOf(e.target.Le.stationId) < 0) {
        that.stationListShow = false
        that.stationListId.unshift(e.target.Le.stationId)
        that.stationList.unshift({
          stationId: e.target.Le.stationId,
          stationName: e.target.Le.stationName,
          distance: e.target.Le.distance,
          address: e.target.Le.address,
          operatorName: e.target.Le.operatorName,
          grade: e.target.Le.grade,
          dirFree: e.target.Le.dirFree,
          dirNum: e.target.Le.dirNum,
          comFree: e.target.Le.comFree,
          comNum: e.target.Le.comNum,
          lat: e.target.Le.lat,
          lng: e.target.Le.lng,
          busineHours: e.target.Le.busineHours
        })
        setTimeout(() => {
          that.stationListShow = true
        }, 100)
      } else {
        // 这里swiper没参数了,不知道什么bug
        if (that.stationListId.indexOf(e.target.Le.stationId) + 1 === that.stationList.length) {
          this.swiper.slideTo(0, 1000, false)
        } else {
          this.swiper.slideTo(that.stationListId.indexOf(e.target.Le.stationId) + 1, 1000, false)
        }
      }
      // eslint-disable-next-line
      that.infoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(-10, -30)  // eslint-disable-line
      })
      that.infoWindow.setContent(e.target.content)
      that.infoWindow.open(that.map, e.target.getPosition())
    },
    markerWindow1 (e) {
      var that = this
      that.infoWindow = new AMap.InfoWindow({  // eslint-disable-line
        offset: new AMap.Pixel(-10, -30)  // eslint-disable-line
      })
      that.infoWindow.setContent(e.target.content)
      that.infoWindow.open(that.map, e.target.getPosition())
    },
    changeSwipe (index) {
      var that = this
      that.lng = that.stationList[index].lng
      that.lat = that.stationList[index].lat
      // that.map.panTo([that.stationList[index].lng, that.stationList[index].lat])
      that.stationDescip = that.stationList[index].stationName
      var content = `
      <div style="height: 22px; line-height: 20px; margin-bottom: 0.2rem; margin-left: 8px;">
        <div style="display: inline-block; background-color: #e97a00; color: #fff; width: 20px; height: 20px; line-height: 20px; text-align: center; border-radius: 3px;">
          直
        </div>
        <div style="display: inline-block; min-width: 140px; text-align: center;">
          空闲<span style="color: #e97a00;">&nbsp;${that.stationList[index].dirFree}</span>/总桩数&nbsp;${that.stationList[index].dirNum}
        </div>
      </div>
      <div style="height: 22px; line-height: 20px; margin-left: 8px;">
        <div style="display: inline-block; background-color: #01b032; color: #fff; width: 20px; height: 20px; line-height: 20px; text-align: center; border-radius: 3px;">
          交
        </div>
        <div style="display: inline-block; min-width: 140px; text-align: center;">
          空闲<span style="color: #01b032;">&nbsp;${that.stationList[index].comFree}</span>/总桩数&nbsp;${that.stationList[index].comNum}
        </div>
      </div>`
      var point = {
        P: that.stationList[index].lat,
        Q: that.stationList[index].lng,
        lat: that.stationList[index].lat,
        lng: that.stationList[index].lng
      }
      that.infoWindow = new AMap.InfoWindow({  // eslint-disable-line
        offset: new AMap.Pixel(-10, -30) // eslint-disable-line
      })
      that.infoWindow.setContent(content)
      that.infoWindow.open(that.map, point)
    },
    getDetail (detail) {
      var that = this
      console.log(detail)
      if (detail.busineHours.indexOf('营业结束时间') > -1) {
        detail.busineHours = detail.busineHours.replace('营业结束时间', '\n营业结束时间')
      }
      that.activeName = 'a'
      that.stationDetail = detail
      that.mapHeight = {
        height: '30%'
      }
      that.map.setZoom(14)
      that.map.panTo([detail.lng, detail.lat])
      that.stationDescip = detail.stationName
      that.stakeStationId = detail.stationId
      that.starVal = detail.grade
      that.lng = detail.lng
      that.lat = detail.lat
      that.stakeChange(0)
      that.evaChange(0)
      that.detailShow = true
    },
    hideDetail () {
      var that = this
      that.mapHeight = {
        height: '100%'
      }
      that.detailShow = false
    },
    RouterToPage (name) {
      name === '资讯' && this.$router.push('/information')
      name === '收藏' && this.$router.push({ path: '/collection', query: { lng: this.geolocationPoint[0], lat: this.geolocationPoint[1] } })
      name === '反馈' && this.$router.push('/feedback')
      name === '安全' && this.$router.push('/changepassword')
      name === '设置' && this.$router.push('/memberSetting')
    },
    toEdit () {
      this.$router.push('/menterInfo')
    },
    showPopBottom () {
      this.show1 = true
    },
    showPopup () {
      if (!getStore('userSpecific')) {
        this.$router.push('/login')
      } else {
        this.userSpecific = getStore('userSpecific')
        this.userInfoAll = getStore('userInfoAll')
        // console.log(this.userSpecific)
        this.loginPersonName = this.userInfoAll.displayName
        // this.photoSrc = this.userSpecific.headPortrait
        this.initLoginMsg()
        this.signature = this.userSpecific.signature
        this.show = true
      }
    },
    onSearch () {
      // console.log(1111)
    },
    focusSearch () {
      var that = this
      this.$router.push({ path: '/search', query: { lng: that.geolocationPoint[0], lat: that.geolocationPoint[1] } })
    },
    showList () {
      var that = this
      this.$router.push({ path: '/stationList', query: { lng: that.geolocationPoint[0], lat: that.geolocationPoint[1] } })
    },
    /* 政府点击 */
    changeGovButton () {
      setStore('key', this.detailShow)
      this.$router.push({ path: '/roleGov/index' })
    },
    /* 车企 */
    carUserButton () {
      setStore('key', this.detailShow)
      this.$router.push({ path: '/roleCar/index' })
    },
    /* 桩企业 */
    changeCompanyButton () {
      setStore('key', this.detailShow)
      this.$router.push({ path: '/roleStake/index' })
    },
    showInformation () {
      this.$router.push('/information')
    },
    logOut () {
      this.$dialog.confirm({
        title: '退出',
        message: '确认退出登录!',
        width: '5.6rem'
      }).then(() => {
        this.showLoading = true
        this.$store.dispatch('Logout').then((res) => {
          this.showLoading = false
          this.reload()
        }).catch((res) => {
          this.$notify('退出失败')
        })
      }).catch(() => {
      })
    },
    acdcSrc (rank) {
      if (rank === 1) {
        return 'home/operator/DC.png'
      } else {
        return 'home/operator/AC.png'
      }
    },
    opeImgSrc (e) {
      return 'home/operator/' + e + '.png'
    },
    stakeSrc (rank) {
      if (rank.substr(0, 2) === '空闲') {
        return 'home/operator/stake_free.png'
      } else if (rank.substr(0, 2) === '占用') {
        return 'home/operator/stake_use.png'
      } else if (rank.substr(0, 2) === '故障') {
        return 'home/operator/stake_fault.png'
      } else {
        return 'home/operator/stake_unline.png'
      }
    },
    stakeClass (rank) {
      if (rank.substr(0, 2) === '空闲') {
        return 'stake_left_btn_free'
      } else if (rank.substr(0, 2) === '占用') {
        return 'stake_left_btn_use'
      } else if (rank.substr(0, 2) === '故障') {
        return 'stake_left_btn_fault'
      } else {
        return 'stake_left_btn_unline'
      }
    },
    infinite (done) {
      var that = this
      that.getData().then(res => {
        if (that.noDate === true) {
          that.$refs.my_scroller.finishInfinite(true)
        } else {
          that.page++
          done()
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.editInput {
  border-bottom: 1px solid #cccccc;
  width: 100%;
}
.van-search__content {
  background-color: #fff;
}
.van-popup--left {
  width: 70%;
}
.popTop {
  height: 18%;
  width: 100%;
  padding: 20% 0% 0% 0%;
  display: flex;
  justify-content: center;
  position: relative;

  .name {
    font-size: 22px;
    font-weight: 800;
  }
}
.photo {
  width: 80px;
  height: 80px;
  display: block;
}
.photoText {
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}
.editText {
  text-align: center;
  width: 80%;
  font-size: 14px;
  font-weight: 600;
  color: #999999;
  position: relative;
  padding-bottom: 8%;
  margin: 0 10% 8% 10%;
  border-bottom: 1px solid #cccccc;
}
.editIcon {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 2px;
  background: url(../../assets/icon4.png) no-repeat 100% 100%;
  background-size: contain;
}
.photoName {
  margin-bottom: 4px;
}
.functionList {
  /*height: 54%;*/
  width: 100%;
  padding: 0 10%;
  .listIcon {
    display: inline-block;
    margin-top: 6px;
  }
  .listText {
    display: inline-block;
    margin-left: 20px;
    line-height: 16px;
    position: relative;
  }
  .msg::before {
    content: "";
    width: 16px;
    height: 16px;
    background: url(../../assets/icon5.png) no-repeat 100% 100%;
    background-size: contain;
    position: absolute;
    left: -20px;
  }
  .collection::before {
    content: "";
    width: 16px;
    height: 16px;
    background: url(../../assets/icon6.png) no-repeat 100% 100%;
    background-size: contain;
    position: absolute;
    left: -20px;
  }
  .feedback::before {
    content: "";
    width: 16px;
    height: 16px;
    background: url(../../assets/icon7.png) no-repeat 100% 100%;
    background-size: contain;
    position: absolute;
    left: -20px;
  }
  .safe::before {
    content: "";
    width: 16px;
    height: 16px;
    background: url(../../assets/icon7.png) no-repeat 100% 100%;
    background-size: contain;
    position: absolute;
    left: -20px;
  }
  .setUp::before {
    content: "";
    width: 16px;
    height: 16px;
    background: url(../../assets/icon8.png) no-repeat 100% 100%;
    background-size: contain;
    position: absolute;
    left: -20px;
  }
  .listItem {
    padding: 12% 4%;
  }
}
.edition {
  text-align: center;
  color: goldenrod;
}
.mapWrap {
  text-align: center;
  font-size: 14px;
  .mapTitle {
    color: #a1a1a1;
    height: 28px;
  }
  .mapName {
    font-size: 18px;
    height: 30px;
  }
  .cancelBtn {
    font-size: 18px;
    height: 30px;
  }
}
.mapBorder {
  width: 100%;
  height: 8px;
  background: #f5f5f5;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.carUser {
  background: url("../../assets/basicInfo/carUser.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  width: 56px;
  height: 53px;
  position: absolute;
  top: 130px;
  left: 10px;
}
.changeGov {
  background: url("../../assets/basicInfo/govUser.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  width: 57px;
  height: 64px;
  position: absolute;
  top: 130px;
  left: 10px;
}

.changeCompany {
  background: url("../../assets/basicInfo/companyUser.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  width: 57px;
  height: 62px;
  position: absolute;
  top: 130px;
  left: 10px;
}
.van-image--round img {
  border: 1px solid #c2c2c2;
  box-shadow: 4px 4px 10px 5px rgba(0, 0, 0, 0.9);
}
.logOut {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  .login {
    width: 80%;
    height: 40px;
    border-radius: 22px;
    line-height: 40px;
    border: none;
    background-color: #3486fe;
    font-size: 17px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 2px;
    color: #ffffff;
  }
}
.user_left_icon {
  width: 35px;
  height: 35px;
  border-radius: 35px;
}
.user_left_img {
  width: 100%;
  height: 100%;
  padding-top: 5px;
}
.bottom {
  height: 60px;
  width: 100%;
  border-top: 1px solid #dddddd;
  display: flex;
  flex-direction: row;
  .bottom_main_mid {
    width: 15%;
  }
  .bottom_main_left {
    width: 35%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    .bottom_box {
      height: 15px;
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      .bottom_img_left {
        height: 15px;
        width: 15px;
      }
      .bottom_txt {
        color: #999999;
        padding-left: 5px;
        font-size: 12px;
      }
    }
  }
  .bottom_main_right {
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    .bottom_box_right {
      height: 40px;
      padding: 15px;
      border-radius: 20px;
      background: #3486fe;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      .bottom_img_left {
        height: 15px;
        width: 15px;
      }
      .bottom_txt {
        color: #ffffff;
        padding-left: 5px;
        font-size: 14px;
      }
    }
    .bottom_box_left {
      height: 38px;
      padding: 15px;
      border-radius: 19px;
      border: 1px solid #3486fe;
      color: #3486fe;
      display: flex;
      justify-content: center;
      align-items: center;
      .bottom_img_left {
        height: 15px;
        width: 15px;
      }
      .bottom_txt {
        color: #3486fe;
        padding-left: 5px;
        font-size: 14px;
      }
    }
  }
}
.main {
  height: calc(100% - 80px);
  width: 100%;
  overflow-y: scroll;
  padding: 0px 10px;
  margin-top: 10px;
  position: relative;
  z-index: 4000;
  .main_tab {
    padding: 0px 12px;
    font-size: 12px;
    .main_title {
      height: 10px;
      background-color: #ebebeb;
      width: 100%;
      border-radius: 5px;
      margin: 15px 0px 0px;
    }
    .main_main {
      width: 100%;
      display: flex;
      flex-direction: row;
      .main_img {
        width: 10%;
        height: 100%;
        text-align: center;
        .main_img_style {
          height: 20px;
          width: 20px;
          margin-top: 20px;
        }
      }
      .main_box {
        width: 90%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .box_title {
          font-size: 16px;
          height: 24px;
          margin-top: 20px;
          font-family: PingFangSC-Semibold;
          display: flex;
          flex-direction: row;
          .box_title_left {
            font-size: 16px;
            width: 70%;
            height: 100%;
            font-weight: bold;
            justify-content: flex-start;
            align-items: center;
          }
          .box_title_right {
            width: 30%;
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .box_title_right_img {
              height: 10px;
              width: 10px;
              margin-top: 3px;
            }
            .box_title_right_txt {
              color: #999999;
              padding-left: 3px;
              height: 15px;
              font-size: 8px;
            }
          }
        }
        .box_address {
          font-size: 12px;
          font-family: PingFangSC-Regular;
          color: #999999;
          padding-top: 12px;
          height: 30px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .box_station {
          height: 84px;
          padding: 15px 0px;
          width: 100%;
          display: flex;
          flex-direction: row;
          .station_left {
            height: 54px;
            width: 50%;
            display: flex;
            flex-direction: row;
            .station_left_img {
              height: 54px;
              width: 60px;
              .station_img {
                width: 100%;
                height: 100%;
              }
            }
            .station_right_txt {
              height: 54px;
              width: 100%;
              display: flex;
              padding-left: 10px;
              flex-direction: column;
              .station_txt_top {
                height: 30px;
                width: 100%;
                display: flex;
                flex-direction: row;
                .station_top_num {
                  color: #f17c01;
                  display: flex;
                  height: 30px;
                  justify-content: flex-start;
                  align-items: center;
                  font-size: 25px;
                  font-weight: bold;
                }
                .station_top_span {
                  font-size: 10px;
                  height: 30px;
                  padding-left: 10px;
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  padding-top: 10px;
                  color: #999999;
                }
              }
              .station_txt_bottom {
                height: 20px;
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                font-size: 10px;
                color: #999999;
              }
            }
          }
          .station_mid {
            width: 1px;
            height: 54px;
            background-image: linear-gradient(
              0deg,
              #ffffff 0%,
              #999999 72%,
              #ffffff 100%
            );
          }
          .station_right {
            height: 54px;
            width: calc(50% - 1px);
            padding-left: 10px;
            display: flex;
            flex-direction: row;
            .station_left_img {
              height: 54px;
              width: 60px;
              .station_img {
                width: 100%;
                height: 100%;
              }
            }
            .station_right_txt {
              height: 54px;
              width: 100%;
              display: flex;
              padding-left: 10px;
              flex-direction: column;
              .station_txt_top {
                height: 30px;
                width: 100%;
                display: flex;
                flex-direction: row;
                .station_top_num {
                  color: #01af32;
                  display: flex;
                  height: 30px;
                  justify-content: flex-start;
                  align-items: center;
                  font-size: 25px;
                  font-weight: bold;
                }
                .station_top_span {
                  font-size: 10px;
                  height: 30px;
                  padding-left: 10px;
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  padding-top: 10px;
                  color: #999999;
                }
              }
              .station_txt_bottom {
                height: 20px;
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                font-size: 10px;
                color: #999999;
              }
            }
          }
        }
        .main_content {
          height: 30px;
          padding: 5px 0px;
          font-size: 12px;
          display: flex;
          flex-direction: row;
          .content_left {
            color: #999999;
            width: 30%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
          .content_right {
            color: #000000;
            width: 70%;
            font-weight: normal;
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
        }
      }
    }
    .main_stake {
      width: 100%;
      display: flex;
      flex-direction: column;
      .stake_title {
        height: 45px;
        padding-top: 10px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        .stake_btn {
          font-size: 12px;
          padding: 5px 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #999999;
          border: 1px solid #999999;
          background: #ffffff;
          border-radius: 5px;
        }
        .stake_btn_checked {
          color: #ffffff;
          border: 1px solid #4a80fc;
          background: #4a80fc;
        }
      }
      .stake_box {
        height: 140px;
        padding: 10px 0px;
        display: flex;
        flex-direction: row;
        .stake_left {
          height: 120px;
          width: 70px;
          display: flex;
          flex-direction: column;
          .stake_left_div {
            height: 80px;
            width: 70px;
            padding-right: 10px;
            .stake_left_img {
              height: 100%;
              width: 100%;
            }
          }
          .stake_left_bottom {
            height: 40px;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .stake_left_btn_free {
              border: 1px solid #999999;
              padding: 5px 10px;
              font-size: 12px;
              color: #999999;
              border-radius: 3px;
            }
            .stake_left_btn_use {
              border: 1px solid #4a80fc;
              padding: 5px 10px;
              font-size: 12px;
              background: #4a80fc;
              color: #ffffff;
              border-radius: 3px;
            }
            .stake_left_btn_fault {
              border: 1px solid #e93802;
              padding: 5px 10px;
              font-size: 12px;
              color: #e93802;
              border-radius: 3px;
            }
          }
        }
        .stake_right {
          height: 120px;
          width: 60%;
          display: flex;
          flex-direction: column;
          .stake_right1 {
            height: 30px;
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 5px;
            .stake_right1_img {
              height: 20px;
              width: 20px;
            }
            .stake_right1_txt {
              height: 20px;
              width: 80%;
              padding-left: 10px;
              font-size: 16px;
              font-weight: normal;
              color: #000000;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          .stake_right_normal {
            height: 20px;
            width: 100%;
            display: flex;
            flex-direction: row;
            .stake_right_normal1 {
              height: 20px;
              display: flex;
              align-items: center;
              color: #999999;
            }
            .stake_right_normal2 {
              height: 20px;
              display: flex;
              align-items: center;
              padding-left: 5px;
            }
          }
        }
      }
    }
    .main_eva {
      width: 100%;
      display: flex;
      flex-direction: column;
      .eva_title {
        height: 40px;
        padding-top: 10px;
        display: flex;
        flex-direction: row;
        .eva_title_left {
          width: 70%;
          height: 30px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .eva_title_span1 {
            font-size: 18px;
            padding-right: 5px;
            color: #fd6d2e;
          }
          .eva_title_span2 {
            color: #999999;
            font-size: 12px;
            padding-left: 5px;
          }
        }
        .eva_title_right {
          width: 30%;
          height: 30px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .eva_title_img {
            height: 12px;
            width: 12px;
          }
          .eva_title_txt {
            height: 12px;
            font-size: 12px;
            color: #3486fe;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-left: 5px;
          }
        }
      }
      .eva_nav {
        height: 35px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        .eva_btn {
          font-size: 12px;
          padding: 5px 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #999999;
          border: 1px solid #999999;
          background: #ffffff;
          border-radius: 5px;
        }
        .eva_btn_checked {
          color: #ffffff;
          border: 1px solid #4a80fc;
          background: #4a80fc;
        }
      }
      .my_scroller {
        width: 100%;
        height: calc(100% - 54px);
      }
      .eva_box {
        display: flex;
        flex-direction: row;
        .eva_left {
          width: 15%;
          text-align: center;
          .eva_left_img {
            height: 50px;
            width: 50px;
            border-radius: 50%;
          }
        }
        .eva_right {
          width: 85%;
          display: flex;
          flex-direction: column;
          .eva_head {
            height: 30px;
            padding-top: 10px;
            width: 100%;
            display: flex;
            flex-direction: row;
            .eva_head_left {
              width: 50%;
              height: 20px;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              font-size: 14px;
              font-weight: bold;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .eva_head_right {
              width: 50%;
              height: 20px;
              display: flex;
              justify-content: flex-end;
              align-items: center;
              font-size: 12px;
              color: #999999;
            }
          }
          .eva_head_star {
            height: 20px;
            padding-bottom: 5px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }
          .eva_box_main {
            font-size: 14px;
          }
          .eva_bottom {
            height: 50px;
            width: 100%;
            margin-top: 10px;
            padding-bottom: 10px;
            display: flex;
            flex-direction: row;
            border-bottom: 1px solid #eeeeee;
            .eva_slider_left {
              height: 40px;
              width: 15%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .eva_slider_left_img {
                height: 20px;
                width: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .eva_slider_left_txt {
                color: #fd6d2e;
                font-size: 12px;
              }
            }
            .eva_slider_mid {
              height: 40px;
              width: 70%;
              padding: 15px 0px;
              .custom-button {
                width: 5px;
                transform: rotate(25deg);
                background: #ffffff;
                height: 20px;
              }
            }
            .eva_slider_right {
              height: 40px;
              width: 15%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .eva_slider_right_img {
                height: 20px;
                width: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .eva_slider_right_txt {
                color: #999999;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style>
.homeContent .van-field__left-icon {
  height: 30px;
}
.homeContent .van-field__body {
  height: 30px;
  font-size: 0.3rem;
}
.homeContent .van-field__right-icon {
  height: 24px;
}
.homeContent .swiper-slide-active {
  width: 80% !important;
  margin: 0 10%;
}
.homeContent .swiper-slide-prev {
  right: -5%;
  padding-right: 5% !important;
}
.homeContent .swiper-slide-next {
  left: -5%;
  padding-left: 5% !important;
}
.amap-info-close {
  display: none;
}
.amap-info-content {
  box-shadow: 0 0 5px #999;
}
.van-slider--disabled {
  opacity: 1;
}
.homeContent .van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-width: 0;
}
.amap-logo {
  display: none !important;
}
.amap-copyright {
  display: none !important;
}
</style>
