<template>
  <div>
    <a-card style="margin-bottom:24px">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>
          新能源汽车情况
        </span>
      </template>
      <a-col :md="12" :xxl="8" :sm="24" class="statisticData">
        <a-statistic :value="vehicleNum" valueStyle="font-weight:bold;font-size:36px;">
          <template slot="prefix">
            <a-icon type="api" theme="twoTone" class="statisticData-icon" />
          </template>
          <template slot="title">
            <span class="statisticData-title">接入车辆 (辆)</span>
          </template>
        </a-statistic>
      </a-col>
      <a-col :md="12" :xxl="8" :sm="24" class="statisticData">
        <a-statistic :value="brandsNum" valueStyle="font-weight:bold;font-size:36px;">
          <template slot="prefix">
            <a-icon type="copyright" theme="twoTone" class="statisticData-icon" />
          </template>
          <template slot="title">
            <span class="statisticData-title">接入车辆品牌数 (个)</span>
          </template>
        </a-statistic>
      </a-col>
      <a-col :md="12" :xxl="8" :sm="24" class="statisticData">
        <a-statistic :value="vehicleModelNum" valueStyle="font-weight:bold;font-size:36px;">
          <template slot="prefix">
            <a-icon type="appstore" theme="twoTone" class="statisticData-icon" />
          </template>
          <template slot="title">
            <span class="statisticData-title">接入车辆型号 (个)</span>
          </template>
        </a-statistic>
      </a-col>
      <a-col :md="12" :xxl="8" :sm="24" class="statisticData">
        <a-statistic :value="activeVehicle" valueStyle="font-weight:bold;font-size:36px;">
          <template slot="prefix">
            <a-icon type="key" class="statisticData-icon" style="color:#ffa932" />
          </template>
          <template slot="title">
            <span class="statisticData-title">已激活车辆 (辆)</span>
          </template>
        </a-statistic>
      </a-col>
      <a-col :md="12" :xxl="8" :sm="24" class="statisticData">
        <a-statistic :value="plateCode" valueStyle="font-weight:bold;font-size:36px;">
          <template slot="prefix">
            <a-avatar :size="60" class="statisticData-icon" style="background-color: #ffa932;font-size:36px;">重
            </a-avatar>
          </template>
          <template slot="title">
            <span class="statisticData-title">重庆牌照车辆数 (辆)</span>
          </template>
        </a-statistic>
      </a-col>
      <a-col :md="12" :xxl="8" :sm="24" class="statisticData">
        <a-statistic :value="online" valueStyle="font-weight:bold;font-size:36px;">
          <template slot="prefix">
            <a-icon type="car" theme="twoTone" class="statisticData-icon" twoToneColor="#ffa932" />
          </template>
          <template slot="title">
            <span class="statisticData-title">在线车辆 (辆)</span>
          </template>
        </a-statistic>
      </a-col>
      <a-col :md="12" :xxl="8" :sm="24" class="statisticData">
        <a-statistic :value="chargeVehicle" valueStyle="font-weight:bold;font-size:36px;">
          <template slot="prefix">
            <a-icon type="thunderbolt" theme="twoTone" class="statisticData-icon" twoToneColor="#FF6F32" />
          </template>
          <template slot="title">
            <span class="statisticData-title">正充电车辆 (辆)</span>
          </template>
        </a-statistic>
      </a-col>
      <a-col :md="12" :xxl="8" :sm="24" class="statisticData">
        <a-statistic :value="totalMileage" valueStyle="font-weight:bold;font-size:36px;">
          <template slot="prefix">
            <a-icon type="history" class="statisticData-icon" style="color:#FF6F32" />
          </template>
          <template slot="title">
            <span class="statisticData-title">累计行驶里程 (万公里)</span>
          </template>
        </a-statistic>
      </a-col>
      <a-col :md="12" :xxl="8" :sm="24" class="statisticData">
        <a-statistic :value="totalCo2" valueStyle="font-weight:bold;font-size:36px;">
          <template slot="prefix">
            <a-icon type="fork" class="statisticData-icon" style="color:#FF6F32" />
          </template>
          <template slot="title">
            <span class="statisticData-title">二氧化碳减排量 (万吨)</span>
          </template>
        </a-statistic>
      </a-col>
    </a-card>
    <a-card style="margin-bottom:24px">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>
          充电设施情况
        </span>
      </template>
      <a-col :md="12" :xxl="8" :sm="24" class="statisticData">
        <a-statistic :value="stationNum" valueStyle="font-weight:bold;font-size:36px;">
          <template slot="prefix">
            <a-icon type="api" theme="twoTone" class="statisticData-icon" />
          </template>
          <template slot="title">
            <span class="statisticData-title">接入充电站数量 (座)</span>
          </template>
        </a-statistic>
      </a-col>
      <a-col :md="12" :xxl="8" :sm="24" class="statisticData">
        <a-statistic :value="stakeNum" valueStyle="font-weight:bold;font-size:36px;">
          <template slot="prefix">
            <a-icon type="api" theme="twoTone" class="statisticData-icon" />
          </template>
          <template slot="title">
            <span class="statisticData-title">接入充电桩数量 (个)</span>
          </template>
        </a-statistic>
      </a-col>
      <a-col :md="12" :xxl="8" :sm="24" class="statisticData">
        <a-statistic :value="totalTimes" valueStyle="font-weight:bold;font-size:36px;">
          <template slot="prefix">
            <a-icon type="number" style="color:#40A8FF" class="statisticData-icon" />
          </template>
          <template slot="title">
            <span class="statisticData-title">累计充电次数 (万次)</span>
          </template>
        </a-statistic>
      </a-col>
      <a-col :md="12" :xxl="8" :sm="24" class="statisticData">
        <a-statistic :value="ratingPower" valueStyle="font-weight:bold;font-size:36px;">
          <template slot="prefix">
            <a-icon type="stock" class="statisticData-icon" style="color:#ffa932" />
          </template>
          <template slot="title">
            <span class="statisticData-title">总额定功率 (千瓦)</span>
          </template>
        </a-statistic>
      </a-col>
      <a-col :md="12" :xxl="8" :sm="24" class="statisticData">
        <a-statistic :value="nowPower" valueStyle="font-weight:bold;font-size:36px;">
          <template slot="prefix">
            <a-icon type="fund" theme="twoTone" class="statisticData-icon" twoToneColor="#ffa932" />
          </template>
          <template slot="title">
            <span class="statisticData-title">实时占用功率 (千瓦)</span>
          </template>
        </a-statistic>
      </a-col>
      <a-col :md="12" :xxl="8" :sm="24" class="statisticData">
        <a-statistic :value="ele" valueStyle="font-weight:bold;font-size:36px;">
          <template slot="prefix">
            <a-icon type="bulb" theme="twoTone" class="statisticData-icon" twoToneColor="#ffa932" />
          </template>
          <template slot="title">
            <span class="statisticData-title">累计充电量 (万千瓦时)</span>
          </template>
        </a-statistic>
      </a-col>
    </a-card>
  </div>
</template>

<script>
import ReconnectingWebSocket from 'reconnectingwebsocket'
import { ACCESS_TOKEN } from '@/store/mutation-types'
export default {
  data () {
    return {
      brandsNum: 0,
      ratingPower: 0,
      stakeNum: 0,
      stationNum: 0,
      vehicleModelNum: 0,
      vehicleNum: 0,
      activeVehicle: 0,
      chargeVehicle: 0,
      ele: 0,
      nowPower: 0,
      online: 0,
      plateCode: 0,
      totalCo2: 0,
      totalMileage: 0,
      totalTimes: 0
    }
  },
  created () {
    this.initData()
  },
  mounted () {
    var that = this
    this.ws = new ReconnectingWebSocket(`ws://47.92.138.8:11007?token=${this.$ls.get(ACCESS_TOKEN)}`, null, { reconnectInterval: 10000 })
    this.ws.onmessage = (evt) => {
      const data = JSON.parse(evt.data)
      var value = JSON.parse(data.content)
      that.totalTimes = (parseInt(value.totalTimes) / 10000).toFixed(2)
      that.ele = (parseInt(value.totalEle) / 10000).toFixed(2)
    }
  },
  methods: {
    initData () {
      this.initNumber()
      this.initRunStatus()
      this.initRunDataStatus()
      this.initGroupStatisticsByModelCount()
      this.initCountByParameter()
      this.initGroupStatisticsByBrandCount()
      this.initStatisticsEleTimes()
      this.initOperatortotalPower()
      this.initStakeUsePower()
    },
    initStatisticsEleTimes () {
      var that = this
      const params = {
        params: [
          {
            field: 'areaCode',
            value: that.$ls.get('areaCode')
          }
        ]
      }
      this.$store.dispatch('StatisticsEleTimes', params).then(res => {
        this.totalTimes = (parseInt(res[0].times) / 10000).toFixed(2)
        this.ele = (parseInt(res[0].ELE) / 10000).toFixed(2)
      })
    },
    initOperatortotalPower () {
      var that = this
      const params = [
        {
          field: 'areaCode',
          value: that.$ls.get('areaCode')
        }
      ]
      this.$store.dispatch('OperatortotalPower', params).then(res => {
        this.ratingPower = res.value
      })
    },
    initStakeUsePower () {
      var that = this
      const params = [
        {
          field: 'areaCode',
          value: that.$ls.get('areaCode')
        }
      ]
      this.$store.dispatch('StakeUsePower', params).then(res => {
        this.nowPower = res[0].value
      })
    },
    initNumber () {
      var that = this
      const params = [
        {
          field: 'areaCode',
          value: that.$ls.get('areaCode')
        }
      ]
      this.$store.dispatch('Number', params).then(res => {
        this.stakeNum = res.stakeNumber
        this.stationNum = res.stationNumber
      })
    },
    initRunStatus () {
      var that = this
      const params = [
        {
          field: 'areaCode',
          value: that.$ls.get('areaCode')
        }
      ]
      this.$store.dispatch('RunStatus', params).then(res => {
        this.activeVehicle = res.activatedNum
        this.chargeVehicle = res.chargingNum
        this.vehicleNum = Number(res.activatedNum) + Number(res.unActivatedNum)

        this.online = res.onlineNum
      })
    },
    initRunDataStatus () {
      var that = this
      const params = [
        {
          field: 'areaCode',
          value: that.$ls.get('areaCode')
        }
      ]
      this.$store.dispatch('RunDataStatus', params).then(res => {
        // console.log(res)
        // this.stationNum = res[0].num
        this.totalCo2 = (parseInt(res.co2) / 10000).toFixed(2)
        this.totalMileage = (parseInt(res.totalMileage) / 10000).toFixed(2)
      })
    },
    initGroupStatisticsByModelCount () {
      const params = [
        {
          field: 'areaCode',
          value: this.$ls.get('areaCode')
        }
      ]
      this.$store.dispatch('GroupStatisticsByModelCount', params).then(res => {
        this.vehicleModelNum = res
      })
    },
    initGroupStatisticsByBrandCount () {
      const params = [
        {
          field: 'areaCode',
          value: this.$ls.get('areaCode')
        }
      ]
      this.$store.dispatch('GroupStatisticsByBrandCount', params).then(res => {
        this.brandsNum = res
      })
    },
    initCountByParameter () {
      const params = [
        {
          field: 'areaCode',
          value: this.$ls.get('areaCode')
        }
      ]
      this.$store.dispatch('CountByParameter', params).then(res => {
        this.vehicleNum = res
      })
      const params1 = [
        {
          field: 'areaCode',
          value: this.$ls.get('areaCode')
        },
        {
          field: 'vehicleNo',
          value: '渝%'
        }
      ]
      this.$store.dispatch('CountByParameter', params1).then(res => {
        this.plateCode = res
      })
    }
  }
}
</script>

<style scoped>
.statisticData {
  text-align: left;
  padding-left: 128px;
  margin-bottom: 24px;
}
.statisticData-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.statisticData-icon {
  font-size: 60px;
  position: absolute;
  top: 10px;
  left: 40px;
}
</style>
