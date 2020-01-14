<template>
  <div style="position: relative;">
    <Map></Map>
    <a-popover placement="left"
               trigger="click"
               style="position: absolute; right: 0; top: 20px; height: 200px;">
      <template slot="content">
        <a-row class="map_box">
          <a-col :span="3">
            <a-icon type="api"
                    theme="twoTone" />
          </a-col>
          <a-col :span="10">车辆总数</a-col>
          <a-col :span="8">{{ vehivleData.vehicleNum }}</a-col>
          <a-col :span="3">辆</a-col>
        </a-row>
        <a-row class="map_box">
          <a-col :span="3">
            <a-icon type="car"
                    theme="twoTone" />
          </a-col>
          <a-col :span="10">在线车辆</a-col>
          <a-col :span="8">{{ vehivleData.onlineNum }}</a-col>
          <a-col :span="3">辆</a-col>
        </a-row>
        <a-row class="map_box">
          <a-col :span="3">
            <a-icon type="thunderbolt"
                    theme="twoTone" />
          </a-col>
          <a-col :span="10">充电车辆</a-col>
          <a-col :span="8">{{ vehivleData.chargingNum }}</a-col>
          <a-col :span="3">辆</a-col>
        </a-row>
        <a-row class="map_box">
          <a-col :span="3">
            <a-icon type="disconnect" />
          </a-col>
          <a-col :span="10">离线车辆</a-col>
          <a-col :span="8">{{ vehivleData.offLineNum }}</a-col>
          <a-col :span="3">辆</a-col>
        </a-row>
        <a-row class="map_box">
          <a-col :span="3">
            <a-icon type="key" />
          </a-col>
          <a-col :span="10">未激活车辆</a-col>
          <a-col :span="8">{{ vehivleData.unActivatedNum }}</a-col>
          <a-col :span="3">辆</a-col>
        </a-row>
      </template>
      <a-button class="map_right_title"
                type="primary">
        <div>车</div>
        <div>辆</div>
        <div>动</div>
        <div>态</div>
        <div>数</div>
        <div>据</div>
      </a-button>
    </a-popover>
    <a-popover placement="left"
               trigger="click"
               style="position: absolute; right: 0; top: 240px; height: 200px;">
      <template slot="content">
        <a-row class="map_box_2">
          <a-col :span="14">实时占用功率</a-col>
          <a-col :span="6">{{ stakeData.realtimePower }}</a-col>
          <a-col :span="4">千瓦</a-col>
        </a-row>
        <a-row class="map_box_2">
          <a-col :span="14">充电桩占用(充电中)</a-col>
          <a-col :span="6">{{ stakeData.charge }}</a-col>
          <a-col :span="4">个</a-col>
        </a-row>
        <a-row class="map_box_2">
          <a-col :span="14">充电桩占用(未充电)</a-col>
          <a-col :span="6">{{ stakeData.uncharge }}</a-col>
          <a-col :span="4">个</a-col>
        </a-row>
        <a-row class="map_box_2">
          <a-col :span="14">充电桩占用(预约锁定)</a-col>
          <a-col :span="6">{{ stakeData.lockCharge }}</a-col>
          <a-col :span="4">个</a-col>
        </a-row>
        <a-row class="map_box_2">
          <a-col :span="14">充电桩离网</a-col>
          <a-col :span="6">{{ stakeData.offline }}</a-col>
          <a-col :span="4">个</a-col>
        </a-row>
        <a-row class="map_box_2">
          <a-col :span="14">充电桩空闲</a-col>
          <a-col :span="6">{{ stakeData.free }}</a-col>
          <a-col :span="4">个</a-col>
        </a-row>
        <a-row class="map_box_2">
          <a-col :span="14">充电桩故障</a-col>
          <a-col :span="6">{{ stakeData.break }}</a-col>
          <a-col :span="4">个</a-col>
        </a-row>
      </template>
      <a-button class="map_right_title"
                type="primary">
        <div>充</div>
        <div>电</div>
        <div>桩</div>
        <div>数</div>
        <div>据</div>
      </a-button>
    </a-popover>
    <a-popover placement="left"
               trigger="click"
               style="position: absolute; right: 0; top: 460px; height: 200px;">
      <template slot="content">
        <div style="height:175px;width:250px;">
          <a-carousel vertical
                      :autoplay="true"
                      :dots="false">
            <div v-for="item in arrList"
                 :key="item"
                 style="height:175px;width:250px;">
              <a-row class="map_box_3">
                <a-col :span="8">报警车牌：</a-col>
                <a-col :span="16">{{ item.vehicleNo }}</a-col>
              </a-row>
              <a-row class="map_box_3">
                <a-col :span="8">报警等级：</a-col>
                <a-col :span="16">{{ item.alarmLevel }}</a-col>
              </a-row>
              <a-row class="map_box_3">
                <a-col :span="8">报警时间：</a-col>
                <a-col :span="16">{{ item.startTime }}</a-col>
              </a-row>
              <a-row class="map_box_3">
                <a-col :span="8">报警类型：</a-col>
                <a-col :span="16">{{ item.alarmType }}</a-col>
              </a-row>
              <a-row class="map_box_3">
                <a-col :span="8">报警详情：</a-col>
                <a-col :span="16">{{ item.alarmDetail }}</a-col>
              </a-row>
            </div>
          </a-carousel>
        </div>
      </template>
      <a-button class="map_right_title"
                type="primary">
        <div>车</div>
        <div>辆</div>
        <div>报</div>
        <div>警</div>
        <div>信</div>
        <div>息</div>
      </a-button>
    </a-popover>
    <a-modal title="CAN数据详情"
             v-model="visible1"
             :footer="null"
             width="1330px"
             @ok="handleOk1">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="通用报警"
                    key="1">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-list bordered>
                <a-list-item>
                  <a-list-item-meta description="SOC低报警:"></a-list-item-meta>
                  <div>{{ allCanData.A1 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="SOC过高报警:"></a-list-item-meta>
                  <div>{{ allCanData.A2 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="电池高温报警:"></a-list-item-meta>
                  <div>{{ allCanData.A3 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="车载储能装置类型欠压报警:"></a-list-item-meta>
                  <div>{{ allCanData.A4 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="驱动电机控制器温度报警:"></a-list-item-meta>
                  <div>{{ allCanData.A5 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="可充电储能系统不匹配报警:"></a-list-item-meta>
                  <div>{{ allCanData.A6 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="车载储能装置类型过充:"></a-list-item-meta>
                  <div>{{ allCanData.A7 }}</div>
                </a-list-item>
              </a-list>
            </a-col>
            <a-col :span="8">
              <a-list bordered>
                <a-list-item>
                  <a-list-item-meta description="单体电池过压报警:"></a-list-item-meta>
                  <div>{{ allCanData.A8 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="最高报警等级:"></a-list-item-meta>
                  <div>{{ allCanData.A9 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="制动系统报警:"></a-list-item-meta>
                  <div>{{ allCanData.A10 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="DC-DC温度报警:"></a-list-item-meta>
                  <div>{{ allCanData.A11 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="高压互锁状态报警:"></a-list-item-meta>
                  <div>{{ allCanData.A12 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="电池单体一致性差报警:"></a-list-item-meta>
                  <div>{{ allCanData.A13 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="温度差异报警:"></a-list-item-meta>
                  <div>{{ allCanData.A14 }}</div>
                </a-list-item>
              </a-list>
            </a-col>
            <a-col :span="8">
              <a-list bordered>
                <a-list-item>
                  <a-list-item-meta description="单体电池欠压报警:"></a-list-item-meta>
                  <div>{{ allCanData.A15 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="DC-DC状态报警:"></a-list-item-meta>
                  <div>{{ allCanData.A16 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="车载储能装置类型过压报警:"></a-list-item-meta>
                  <div>{{ allCanData.A17 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="SOC跳变报警:"></a-list-item-meta>
                  <div>{{ allCanData.A18 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="驱动电机温度报警:"></a-list-item-meta>
                  <div>{{ allCanData.A19 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="绝缘报警:"></a-list-item-meta>
                  <div>{{ allCanData.A20 }}</div>
                </a-list-item>
              </a-list>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane tab="电池类"
                    key="2"
                    forceRender>
          <a-row :gutter="24">
            <a-col :span="8">
              <a-list bordered>
                <a-list-item>
                  <a-list-item-meta description="最高温度子系统号:"></a-list-item-meta>
                  <div>{{ allCanData.B1 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="氢系统中最高温度探针代号:"></a-list-item-meta>
                  <div>{{ allCanData.B2 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="最高电压电池子系统号:"></a-list-item-meta>
                  <div>{{ allCanData.B3 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="最低电压电池单体代号:"></a-list-item-meta>
                  <div>{{ allCanData.B4 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="电池总电流:"></a-list-item-meta>
                  <div>{{ allCanData.B5 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="电池总电压:"></a-list-item-meta>
                  <div>{{ allCanData.B6 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="最低温度探针子系统代号:"></a-list-item-meta>
                  <div>{{ allCanData.B7 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="燃料电池温度探针总数:"></a-list-item-meta>
                  <div>{{ allCanData.B8 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="电池单体电压最高值:"></a-list-item-meta>
                  <div>{{ allCanData.B9 }}</div>
                </a-list-item>
              </a-list>
            </a-col>
            <a-col :span="8">
              <a-list bordered>
                <a-list-item>
                  <a-list-item-meta description="氢气最高浓度传感器代号:"></a-list-item-meta>
                  <div>{{ allCanData.B10 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="氢系统中最高温度:"></a-list-item-meta>
                  <div>{{ allCanData.B11 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="氢气最高压力传感器代号:"></a-list-item-meta>
                  <div>{{ allCanData.B12 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="最低电压电池子系统号:"></a-list-item-meta>
                  <div>{{ allCanData.B13 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="最低温度值:"></a-list-item-meta>
                  <div>{{ allCanData.B14 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="最低温度子系统号:"></a-list-item-meta>
                  <div>{{ allCanData.B15 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="探针温度值:"></a-list-item-meta>
                  <div>{{ allCanData.B16 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="电池单体电压最低值:"></a-list-item-meta>
                  <div>{{ allCanData.B17 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="燃料电池电压:"></a-list-item-meta>
                  <div>{{ allCanData.B18 }}</div>
                </a-list-item>
              </a-list>
            </a-col>
            <a-col :span="8">
              <a-list bordered>
                <a-list-item>
                  <a-list-item-meta description="氢气最高浓度:"></a-list-item-meta>
                  <div>{{ allCanData.B19 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="最高电压电池单体代号:"></a-list-item-meta>
                  <div>{{ allCanData.B20 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="氢气最高压力:"></a-list-item-meta>
                  <div>{{ allCanData.B21 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="电池电量(SOC):"></a-list-item-meta>
                  <div>{{ allCanData.B22 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="最高温度值:"></a-list-item-meta>
                  <div>{{ allCanData.B23 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="最高温度探针单体代号:"></a-list-item-meta>
                  <div>{{ allCanData.B24 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="燃料消耗率:"></a-list-item-meta>
                  <div>{{ allCanData.B25 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="绝缘电阻值:"></a-list-item-meta>
                  <div>{{ allCanData.B26 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="燃料电池电流:"></a-list-item-meta>
                  <div>{{ allCanData.B27 }}</div>
                </a-list-item>
              </a-list>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane tab="电子控制单元类"
                    key="3">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-list bordered>
                <a-list-item>
                  <a-list-item-meta description="累计里程:"></a-list-item-meta>
                  <div>{{ allCanData.C1 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="纬度:"></a-list-item-meta>
                  <div>{{ allCanData.C2 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="经度:"></a-list-item-meta>
                  <div>{{ allCanData.C3 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="档位:"></a-list-item-meta>
                  <div>{{ allCanData.C4 }}</div>
                </a-list-item>
              </a-list>
            </a-col>
            <a-col :span="8">
              <a-list bordered>
                <a-list-item>
                  <a-list-item-meta description="车辆状态:"></a-list-item-meta>
                  <div>{{ allCanData.C5 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="定位状态:"></a-list-item-meta>
                  <div>{{ allCanData.C6 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="运行模式:"></a-list-item-meta>
                  <div>{{ allCanData.C7 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="DC-DC状态:"></a-list-item-meta>
                  <div>{{ allCanData.C8 }}</div>
                </a-list-item>
              </a-list>
            </a-col>
            <a-col :span="8">
              <a-list bordered>
                <a-list-item>
                  <a-list-item-meta description="充电状态:"></a-list-item-meta>
                  <div>{{ allCanData.C9 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="方向:"></a-list-item-meta>
                  <div>{{ allCanData.C10 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="车速:"></a-list-item-meta>
                  <div>{{ allCanData.C11 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="高压DC/DC状态:"></a-list-item-meta>
                  <div>{{ allCanData.C12 }}</div>
                </a-list-item>
              </a-list>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane tab="电机类"
                    key="4">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-list bordered>
                <a-list-item>
                  <a-list-item-meta description="燃料消耗率:"></a-list-item-meta>
                  <div>{{ allCanData.D1 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="驱动电机序号:"></a-list-item-meta>
                  <div>{{ allCanData.D2 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="驱动电机个数:"></a-list-item-meta>
                  <div>{{ allCanData.D3 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="驱动电机温度:"></a-list-item-meta>
                  <div>{{ allCanData.D4 }}</div>
                </a-list-item>
              </a-list>
            </a-col>
            <a-col :span="8">
              <a-list bordered>
                <a-list-item>
                  <a-list-item-meta description="驱动电机转矩:"></a-list-item-meta>
                  <div>{{ allCanData.D5 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="曲轴转速:"></a-list-item-meta>
                  <div>{{ allCanData.D6 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="电机控制器输入电压:"></a-list-item-meta>
                  <div>{{ allCanData.D7 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="驱动电机转速:"></a-list-item-meta>
                  <div>{{ allCanData.D8 }}</div>
                </a-list-item>
              </a-list>
            </a-col>
            <a-col :span="8">
              <a-list bordered>
                <a-list-item>
                  <a-list-item-meta description="驱动电机状态:"></a-list-item-meta>
                  <div>{{ allCanData.D9 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="发动机状态:"></a-list-item-meta>
                  <div>{{ allCanData.D10 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="电机母线电流:"></a-list-item-meta>
                  <div>{{ allCanData.D11 }}</div>
                </a-list-item>
                <a-list-item>
                  <a-list-item-meta description="电机控制器温度(℃):"></a-list-item-meta>
                  <div>{{ allCanData.D12 }}</div>
                </a-list-item>
              </a-list>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane tab="探针温度"
                    key="5">
          <a-row :gutter="24">
            <a-col :span="24">
              <a-list bordered>
                <a-list-item>
                  <a-list-item-meta description="暂无数据"></a-list-item-meta>
                </a-list-item>
              </a-list>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </a-modal>
    <a-modal title="单车页面详情"
             v-model="visible2"
             :footer="null"
             @ok="handleOk2">
      <a-list bordered>
        <a-list-item>
          <a-list-item-meta description="车牌号:"></a-list-item-meta>
          <div>{{ vehicleData.vehicleNo }}</div>
        </a-list-item>
        <a-list-item>
          <a-list-item-meta description="VIN码:"></a-list-item-meta>
          <div>{{ vehicleData.vin }}</div>
        </a-list-item>
        <a-list-item>
          <a-list-item-meta description="引擎编号:"></a-list-item-meta>
          <div>{{ vehicleData.engineNo }}</div>
        </a-list-item>
        <a-list-item>
          <a-list-item-meta description="车机编号:"></a-list-item-meta>
          <div>{{ vehicleData.tboxId }}</div>
        </a-list-item>
        <a-list-item>
          <a-list-item-meta description="车系名称:"></a-list-item-meta>
          <div>{{ vehicleData.vehicleSeriesName }}</div>
        </a-list-item>
        <a-list-item>
          <a-list-item-meta description="车型名称:"></a-list-item-meta>
          <div>{{ vehicleData.vehicleTypeName }}</div>
        </a-list-item>
        <a-list-item>
          <a-list-item-meta description="生产厂家:"></a-list-item-meta>
          <div>{{ vehicleData.manufacturerAbbr }}</div>
        </a-list-item>
        <a-list-item>
          <a-list-item-meta description="额定电流:"></a-list-item-meta>
          <div>{{ vehicleData.ratedCurrent }}</div>
        </a-list-item>
        <a-list-item>
          <a-list-item-meta description="额定电压:"></a-list-item-meta>
          <div>{{ vehicleData.ratedVoltage }}</div>
        </a-list-item>
        <a-list-item>
          <a-list-item-meta description="额定功率:"></a-list-item-meta>
          <div>{{ vehicleData.ratedPower }}</div>
        </a-list-item>
        <a-list-item>
          <a-list-item-meta description="电池容量:"></a-list-item-meta>
          <div>{{ vehicleData.batteryCapacity }}</div>
        </a-list-item>
        <a-list-item>
          <a-list-item-meta description="车辆类型:"></a-list-item-meta>
          <div>{{ vehicleData.powerResource }}</div>
        </a-list-item>
        <a-list-item>
          <a-list-item-meta description="车辆类别:"></a-list-item-meta>
          <div>{{ vehicleData.vehicleCatagory }}</div>
        </a-list-item>
        <a-list-item>
          <a-list-item-meta description="车辆用途:"></a-list-item-meta>
          <div>{{ vehicleData.vehiclePurpose }}</div>
        </a-list-item>
      </a-list>
    </a-modal>
    <a-modal title="报警信息详情"
             v-model="visible3"
             :footer="null"
             width="75%"
             @ok="handleOk3">
      <div style="height: 30px; text-align: center; font-size: 18px;">车辆实时数据</div>
      <a-divider />
      <a-statistic title="最高温度（摄氏度）"
                   :value="vehicleBatteryData.maxTemp"
                   style="background: #ed5565;"
                   class="battery-data">
        <template slot="prefix">
          <a-icon type="bar-chart"
                  class="battery-icon"
                  style="color:#ffffff" />
        </template>
      </a-statistic>
      <a-statistic title="最低温度（摄氏度）"
                   :value="vehicleBatteryData.minTemp"
                   style="background: #1ab394;"
                   class="battery-data">
        <template slot="prefix">
          <a-icon type="bar-chart"
                  class="battery-icon"
                  style="color:#ffffff" />
        </template>
      </a-statistic>
      <a-statistic title="最高电压（伏特）"
                   :value="vehicleBatteryData.maxVoltage"
                   style="background: #23c6c8"
                   class="battery-data">
        <template slot="prefix">
          <a-icon type="bar-chart"
                  class="battery-icon"
                  style="color:#ffffff" />
        </template>
      </a-statistic>
      <a-statistic title="最低电压（伏特）"
                   :value="vehicleBatteryData.minVoltage"
                   style="margin-right: 0px; background: #ed5565"
                   class="battery-data">
        <template slot="prefix">
          <a-icon type="bar-chart"
                  class="battery-icon"
                  style="color:#ffffff" />
        </template>
      </a-statistic>
      <a-divider />
      <div style="width: 100%; height: 280px; position: relative;">
        <a-statistic title="今日行驶里程（千米）"
                     :value="vehicleBatteryData.todayRunMileage"
                     style="background: #f8ac59; width: 30%; position: absolute; top: 40px; margin-right: 0px;"
                     class="battery-data">
          <template slot="prefix">
            <a-icon type="bar-chart"
                    class="battery-icon"
                    style="color:#ffffff" />
          </template>
        </a-statistic>
        <div id="vehicleSpeed"
             style="width: 35%; height: 100%; margin: 0 auto;"></div>
        <a-statistic title="今日行驶时长（小时）"
                     :value="vehicleBatteryData.todayRunHours"
                     style="background: #23c6c8; width: 30%; position: absolute; top: 40px; right: 0; margin-right: 0px;"
                     class="battery-data">
          <template slot="prefix">
            <a-icon type="bar-chart"
                    class="battery-icon"
                    style="color:#ffffff" />
          </template>
        </a-statistic>
      </div>
      <a-table bordered
               :columns="columns"
               :dataSource="tableData"
               :loading="tableLoading">
      </a-table>
    </a-modal>
  </div>
</template>

<script>
import Map from '@/components/amap/amap'
import moment from 'moment'
export default {
  components: {
    Map
  },
  data () {
    return {
      map: null,
      markers: [],
      clusterMarkers: [],
      cluster: null,
      idArr: [],
      infoWindow: null,
      statusContent: '',
      tableContent: '',

      carClusterMarkers: [],
      carCluster: null,
      // 车辆数据
      vehivleData: {
        drivingNum: 0,
        unActivatedNum: 0,
        chargingNum: 0,
        onlineNum: 0,
        offLineNum: 0,
        activatedNum: 0,
        vehicleNum: 0
      },
      // 充电桩数据
      stakeData: {
        charge: 0,
        uncharge: 0,
        lockCharge: 0,
        free: 0,
        break: 0,
        offline: 0,
        other: 0,
        realtimePower: 0
      },
      // 报警信息
      startTime: '',
      endTime: '',
      arrList: [],
      carIdArr: [],
      carMarkers: [],
      speed: '',
      maxTemp: '',
      minTemp: '',
      carInfoWindow: null,
      visible1: false,
      visible2: false,
      visible3: false,
      // 车辆CAN数据
      allCanData: {},
      vehicleData: {},
      vehicleBatteryData: {
        minTemp: 0,
        maxTemp: 0,
        minVoltage: 0,
        maxVoltage: 0,
        todayRunMileage: 0,
        todayRunHours: 0,
        speed: 0
      },
      columns: [
        {
          title: '序号',
          dataIndex: 'rn'
        },
        {
          title: '车牌号',
          dataIndex: 'vehicleNo'
        },
        {
          title: 'VIN',
          dataIndex: 'vin'
        },
        {
          title: '生产厂家',
          dataIndex: 'company'
        },
        {
          title: '报警类型',
          dataIndex: 'alarmType'
        },
        {
          title: '报警等级',
          dataIndex: 'alarmLevel'
        },
        {
          title: '故障说明',
          dataIndex: 'alarmDetail'
        },
        {
          title: '开始时间',
          dataIndex: 'startTime'
        },
        {
          title: '结束时间',
          dataIndex: 'endTime'
        }
      ],
      tableData: [],
      tableLoading: false,
      carTimeQuery: null
    }
  },
  created () {
    this.startTime = moment(new Date()).subtract(3, 'days').format('YYYY-MM-DD')
    this.endTime = moment(new Date()).format('YYYY-MM-DD')
    var that = this
    const params = [
      {
        field: 'areaCode',
        value: this.$ls.get('areaCode')
      }
    ]
    this.$store.dispatch('RunStatus', params).then(res => {
      that.vehivleData = res
      that.vehivleData.vehicleNum = Number(res.activatedNum) + Number(res.unActivatedNum)
    })
    this.$store.dispatch('StakeUsePower', params).then(res => {
      that.stakeData.realtimePower = res[0].value
    })
    this.$store.dispatch('StakeStatusNumber', params).then(res => {
      for (var i in res) {
        if (res[i].NAME === '空闲') {
          that.stakeData.free = res[i].value
        } else if (res[i].NAME === '故障') {
          that.stakeData.break = res[i].value
        } else if (res[i].NAME === '离网') {
          that.stakeData.offline = res[i].value
        } else if (res[i].NAME === '占用(未充电)') {
          that.stakeData.uncharge = res[i].value
        } else if (res[i].NAME === '占用(充电中)') {
          that.stakeData.charge = res[i].value
        } else if (res[i].NAME == null) {
          that.stakeData.other = res[i].value
        }
        that.stakeData.free += that.stakeData.other
      }
    })
    const alarmData = {
      areaCode: this.$ls.get('areaCode'),
      startTime: that.startTime,
      endTime: that.endTime,
      pageNum: 1,
      pageSize: 15
    }
    this.$store.dispatch('HistoryWarningListByPage', alarmData).then(res => {
      this.arrList = res.list
    })
  },
  mounted () {
    this.map = this.$store.getters.getMap
    this.initMap()
    this.initClusteMap()
    this.initCarClusteMap()
  },
  beforeDestroy () {
    var that = this
    clearInterval(that.carTimeQuery)
    that.carTimeQuery = null
  },
  methods: {
    handleTableChange (vin) {
      var that = this
      this.tableLoading = true
      var data = {
        areaCode: this.$ls.get('areaCode'),
        startTime: that.startTime,
        endTime: that.endTime,
        pageSize: 100,
        vin: vin
      }
      this.$store.dispatch('HistoryWarningListByPage', data).then(res => {
        this.tableData = res.list
        this.tableLoading = false
      })
    },
    initChart (speed) {
      var that = this
      this.$nextTick(() => {
        that.speedEchart = that.$echarts.init(
          document.getElementById('vehicleSpeed')
        )
        this.speedEchart.setOption({
          tooltip: {
            formatter: function (param) {
              return '时速：' + param.value[0] + '千米/小时'
            }
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: { show: true }
            }
          },
          series: [
            {
              name: '时速',
              type: 'gauge',
              detail: { formatter: '{value}' },
              data: [{ value: speed, name: '时速\n（千米/小时）' }]
            }
          ]
        })
      })
    },
    handleOk1 (e) {
      this.visible1 = false
    },
    handleOk2 (e) {
      this.visible2 = false
    },
    handleOk3 (e) {
      this.visible3 = false
    },
    openChart1 (vin) {
      var that = this
      var params = {
        vin: vin
      }
      this.$store.dispatch('VehicleGetCanData', params).then(res => {
        that.allCanData = res
        that.visible1 = true
      })
    },
    openChart2 (vin) {
      var that = this
      var params = {
        basic: {
          isQueryMileage: false
        },
        params: {
          query: [
            {
              field: 'vin',
              value: vin
            },
            {
              field: 'areaCode',
              value: this.$ls.get('areaCode')
            }
          ]
        }
      }
      this.$store.dispatch('VehicleList', params).then(res => {
        that.vehicleData = res.list[0]
        that.visible2 = true
      })
    },
    openChart3 (vin) {
      var that = this
      var params = {
        vin: vin
      }
      that.handleTableChange(vin)
      this.$store.dispatch('VehicleDetailData', params).then(res => {
        that.vehicleBatteryData = res
        that.visible3 = true
        that.initChart(that.vehicleBatteryData.speed)
      })
    },
    carMarkerWindow (e) {
      var that = this
      window.carContentObj = {
        openChart1: that.openChart1,
        openChart2: that.openChart2,
        openChart3: that.openChart3
      }
      var params = {
        vin: e.target.Je.vin
      }
      this.$store.dispatch('CarDetailData', params).then(res => {
        that.minTemp = res.minTemp
        that.maxTemp = res.maxTemp
        that.speed = res.speed
        var carContent = `
          <div>车牌号：${e.target.Je.vehicleNo || ''}</div> 
          <div>VIN码：${e.target.Je.vin || ''}</div>
          <div>车系名称：${e.target.Je.vehicleSeriesName || ''}</div>
          <div>车型名称：${e.target.Je.vehicleTypeName || ''}</div>
          <div>生产厂家：${e.target.Je.manufacturerAbbr || ''}</div>
          <div>车辆类型：${e.target.Je.powerResource || ''}</div>
          <div>车辆用途：${e.target.Je.vehiclePurpose || ''}</div>
          <div>当前时速：${that.speed || ''}公里/小时</div>
          <div>电池温度：${that.minTemp || ''}℃~${that.maxTemp || ''}℃</div>
          </b>
          <div align='center' style='display:flex;height: 60px;text-align: center;margin: 10px auto;'>
          <div style='flex:1;text-align: center;width: 60px;height: 50px;float: left;margin: 0px auto'>
          <span><a onclick=carContentObj.openChart1("${e.target.Je.vin}")><img src='/imageUrl/mapOperatorIcon/canshuju.png'/></a></span>
          <p>CAN数据<p/>
          </div>
          <div style='flex:1;text-align: center;width: 60px;height: 50px;float: left;margin: 0px auto'>
          <span><a onclick=carContentObj.openChart2("${e.target.Je.vin}")><img src='/imageUrl/mapOperatorIcon/dc.png'/></a></span>
          <p>单车页面<p/>
          </div>
          <div style='flex:1;text-align: center;width: 60px;height: 50px;float: left;margin: 0px auto'> 
          <span><a onclick=carContentObj.openChart3("${e.target.Je.vin}")><img src='/imageUrl/mapOperatorIcon/bj.png'/></a></span>
          <p>实时监控<p/>
          </div>
          </div>
          `
        that.carInfoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -10) })
        that.carInfoWindow.setContent(carContent)
        that.carInfoWindow.open(that.map, e.target.getPosition())
      }).catch(error => {
        console.log(error)
      })
    },
    initCarClusteMap () {
      var that = this
      var carParsms = {
        areaCode: this.$ls.get('areaCode')
      }
      this.$store.dispatch('GetVehicleLocationStatus', carParsms).then(res => {
        for (var i = 0; i < res.length; i += 1) {
          that.carClusterMarkers.push(new AMap.Marker({
            position: [res[i].longitude, res[i].latitude],
            content: '<div style="background-color: hsla(180, 100%, 35%,0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;text-align:center;font-weight:600;line-height:22px;">1</div>',
            offset: new AMap.Pixel(-15, -15)
          }))
        }
        that.carCluster = new AMap.MarkerClusterer(that.map, that.carClusterMarkers, { gridSize: 80 })
      }).catch(error => {
        console.log(error)
      })
    },
    // 打开信息窗口
    markerWindow (e) {
      var that = this
      var parsms = {
        basic: {
          stationid: e.target.Je.stationid
        },
        params: [
          {
            'field': '',
            'value': ''
          }
        ]
      }
      this.$store.dispatch('AllStakeInfo', parsms).then(res => {
        var result = res.list
        var z = result.length
        var offline = 0
        var free = 0
        var Zuser = 0
        var ZNuser = 0
        var ZYuser = 0
        var breakN = 0
        var table =
          "<div style='overflow-x: auto; overflow-y: auto; height: 150px; width:100%;'><table border='1' align='center' width='100%'><tr style='background-color:#00caaf;color:white;border-bottom:1px solid black'><td align='center' style='width:50%;'>桩编号</td><td align='center' style='border-left: 1px solid black;'>桩状态</td></tr>"
        var table2 = ''
        for (var i = 0; i < result.length; i++) {
          if (result[i].statusName === '离网') {
            offline += 1
            table =
              table +
              "<tr><td align='center'><font color='#616161'>" +
              (result[i].equipmentname || '未命名') +
              "</font></td><td align='center'><font color='#616161'>" +
              result[i].statusName +
              '</font></td></tr>'
          } else if (result[i].statusName === '空闲') {
            free += 1
            table =
              table +
              "<tr><td align='center'><font color='#1296DB'>" +
              (result[i].equipmentname || '未命名') +
              "</font></td><td align='center'><font color='#1296DB'>" +
              result[i].statusName +
              '</font></td></tr>'
          } else if (result[i].statusName === '占用(充电中)') {
            Zuser += 1
            table =
              table +
              "<tr><td align='center'><font color='#125D04'>" +
              (result[i].equipmentname || '未命名') +
              "</font></td><td align='center'><font color='#125D04'>" +
              result[i].statusName +
              '</font></td></tr>'
          } else if (result[i].statusName === '占用(未充电)') {
            ZNuser += 1
            table =
              table +
              "<tr><td align='center'><font color='#125D04'>" +
              (result[i].equipmentname || '未命名') +
              "</font></td><td align='center'><font color='#125D04'>" +
              result[i].statusName +
              '</font></td></tr>'
          } else if (result[i].statusName === '占用(预约锁定)') {
            ZYuser += 1
            table =
              table +
              "<tr><td align='center'><font color='#125D04'>" +
              (result[i].equipmentname || '未命名') +
              "</font></td><td align='center'><font color='#125D04'>" +
              result[i].statusName +
              '</font></td></tr>'
          } else if (result[i].statusName === '故障') {
            breakN += 1
            table =
              table +
              "<tr><td align='center'><font color='#E64340'>" +
              (result[i].equipmentname || '未命名') +
              "</font></td><td align='center'><font color='#E64340'>" +
              result[i].statusName +
              '</font></td></tr>'
          } else {
            table =
              table +
              "<tr><td align='center'><font color='#444444'>" +
              (result[i].equipmentname || '未命名') +
              "</font></td><td align='center'><font color='#444444'>" +
              '其他' +
              '</font></td></tr>'
          }
        }
        var zzr =
          "<div style='display:inline-block;width:35%;padding-right:10%'><img src='/imageUrl/mapOperatorIcon/charge1.png' style='width:20px;height:20px;margin-right:7px;'>占用（充电中）:<span style='float: right'>" +
          Zuser +
          '/' +
          z +
          '</span></div>' +
          "<div style='display:inline-block;width:35%;padding-right:10%'><img src='/imageUrl/mapOperatorIcon/charge2.png' style='width:20px;height:20px;margin-right:7px;'>占用（未充电）:<span style='float: right'>" +
          ZNuser +
          '/' +
          z +
          '</span></div>' +
          "<div style='display:inline-block;width:35%;padding-right:10%'><img src='/imageUrl/mapOperatorIcon/ineed.png' style='width:20px;height:20px;margin-right:7px;'>占用（预约锁定）:<span style='float: right'>" +
          ZYuser +
          '/' +
          z +
          '</span></div>' +
          "<div style='display:inline-block;width:35%;padding-right:10%'><img src='/imageUrl/mapOperatorIcon/free.png' style='width:20px;height:20px;margin-right:7px;'>空闲:<span  style='float: right'>" +
          free +
          '/' +
          z +
          '</span></div>' +
          "<div style='display:inline-block;width:35%;padding-right:10%'><img src='/imageUrl/mapOperatorIcon/offline.png' style='width:20px;height:20px;margin-right:7px;'>离网:<span  style='float: right'>" +
          offline +
          '/' +
          z +
          '</span></div>' +
          "<div style='display:inline-block;width:35%;padding-right:10%'><img src='/imageUrl/mapOperatorIcon/break.png' style='width:20px;height:20px;margin-right:7px;'>故障:<span  style='float: right'>" +
          breakN +
          '/' +
          z +
          '</span></div>'
        that.statusContent = '<div>' + zzr + '</div>'
        table2 = table + '</table></div>'
        that.tableContent = table2
        var electricityfee, servicefee
        if (e.target.Je.electricityfee) {
          electricityfee = e.target.Je.electricityfee.split(',').join('\n')
        } else {
          electricityfee = ''
        }
        if (e.target.Je.servicefee) {
          servicefee = e.target.Je.servicefee.split(',').join('\n')
        } else {
          servicefee = ''
        }
        var windowContent = `
          <div style='font-weight:bold;padding:2px;width:700px;'>充电站基础信息：</div>
          <div style='padding:2px;'><img src='/imageUrl/mapOperatorIcon/name.png' style='width:20px;height:20px;margin-right:7px;'>站名称：${e.target.Je.stationname || ''}</div>
          <div style='padding:2px;'><img src='/imageUrl/mapOperatorIcon/address.png' style='width:20px;height:20px;margin-right:7px;'>运营商：${e.target.Je.merchantName || ''}</div>
          <div style='padding:2px;'><img src='/imageUrl/mapOperatorIcon/address.png' style='width:20px;height:20px;margin-right:7px;'>站地址：${e.target.Je.address || ''}</div>
          <div style='width:50%;display:inline-block;float:left;padding:2px;'><img src='/imageUrl/mapOperatorIcon/status.png' style='width:20px;height:20px;margin-right:7px;'>站状态：${e.target.Je.stationstatusName || ''}</div>
          <div style='width:50%;display:inline-block;float:right;padding:2px;'><img src='/imageUrl/mapOperatorIcon/stopCar.png' style='width:20px;height:20px;margin-right:7px;'>停车费：${e.target.Je.parkfee || ''}</div>
          <div style='width:50%;display:inline-block;float:left;padding:2px;'><img src='/imageUrl/mapOperatorIcon/eleFee.png' style='width:20px;height:20px;margin-right:7px;'>电费：${electricityfee}</div>
          <div style='width:50%;display:inline-block;float:right;padding:2px;'><img src='/imageUrl/mapOperatorIcon/serviceFee.png' style='width:20px;height:20px;margin-right:7px;'>服务费：${servicefee}</div>
          <div style='font-weight:bold;padding:2px;'>充电桩状态占比情况：</div>
          ${that.statusContent}
          <div style='font-weight:bold;padding:2px;'>本站充电桩详情：</div>
          ${that.tableContent}
        `
        that.infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -10) })
        that.infoWindow.setContent(windowContent)
        that.infoWindow.open(that.map, e.target.getPosition())
      }).catch(error => {
        console.log(error)
      })
    },
    // 聚合图
    initClusteMap () {
      var that = this
      var parsms = [
        {
          field: '',
          value: ''
        }
      ]
      this.$store.dispatch('Allstation', parsms).then(res => {
        for (var i = 0; i < res.list.length; i += 1) {
          that.clusterMarkers.push(new AMap.Marker({
            position: [res.list[i].stationlng, res.list[i].stationlat],
            content: '<div style="background-color: hsla(180, 100%, 35%,0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;text-align:center;font-weight:600;line-height:22px;">1</div>',
            offset: new AMap.Pixel(-15, -15)
          }))
        }
        that.cluster = new AMap.MarkerClusterer(that.map, that.clusterMarkers, { gridSize: 80 })
      }).catch(error => {
        console.log(error)
      })
    },
    // 地图的拖动缩放等判断
    initMap () {
      var that = this
      that.map.on('zoomend', e => {
        var mapZoom = that.map.getZoom()
        if (that.carTimeQuery) {
          clearInterval(that.carTimeQuery)
        }
        if (mapZoom > 14) {
          that.cluster.removeMarkers(that.clusterMarkers)
          that.map.add(that.markers)
          that.map.on('dragend', that.mapDrag, that.mapDrag())
        } else {
          that.map.clearInfoWindow()
          that.map.remove(that.markers)
          that.cluster.addMarkers(that.clusterMarkers)
          that.map.off('dragend', that.mapDrag)
        }
        if (mapZoom > 16) {
          that.carCluster.removeMarkers(that.carClusterMarkers)
          that.map.add(that.carMarkers)
          that.map.on('dragend', that.mapCarDrag, that.mapCarDrag())
        } else {
          that.carCluster.addMarkers(that.carClusterMarkers)
          that.map.remove(that.carMarkers)
          that.map.off('dragend', that.mapCarDrag)
        }
      })
    },
    // 画车的点
    mapCarDrag () {
      var that = this
      that.carIdArr = []
      var bounds = that.map.getBounds()
      var carParsms = {
        areaCode: this.$ls.get('areaCode'),
        leftUpLocation: bounds.southwest.lng + ',' + bounds.northeast.lat,
        rightDownLocation: bounds.northeast.lng + ',' + bounds.southwest.lat
      }
      this.$store.dispatch('GetVehicleLocationStatus', carParsms).then(res => {
        for (var k in that.carMarkers) {
          that.carIdArr.push(that.carMarkers[k].Je.carId)
        }
        for (var i = 0, marker; i < res.length; i++) {
          if (that.carIdArr.indexOf(res[i].id) < 0) {
            marker = new AMap.Marker({
              map: that.map,
              position: [res[i].longitude, res[i].latitude],
              icon: 'https://webapi.amap.com/images/car.png',
              carId: res[i].id,
              offset: new AMap.Pixel(-26, -13),
              autoRotation: true,
              angle: -90,
              lineArr: [[res[i].longitude, res[i].latitude]],
              vehicleNo: res[i].vehicleNo,
              vin: res[i].vin,
              vehicleSeriesName: res[i].vehicleSeriesName,
              vehicleTypeName: res[i].vehicleTypeName,
              manufacturerAbbr: res[i].manufacturerAbbr,
              powerResource: res[i].powerResource,
              vehiclePurpose: res[i].vehiclePurpose
            })
            marker.on('click', that.carMarkerWindow)
            that.carMarkers.push(marker)
          }
          for (var l in that.carMarkers) {
            if (that.carMarkers[l].Je.carId === res[i].id && that.carMarkers[l].Je.lineArr.length === 2) {
              that.carMarkers[l].Je.lineArr.shift(1)
              that.carMarkers[l].Je.lineArr.push([res[i].longitude, res[i].latitude])
              that.carMarkers[l].moveAlong(that.carMarkers[l].Je.lineArr, 200)
            } else if (that.carMarkers[l].Je.carId === res[i].id) {
              that.carMarkers[l].Je.lineArr.push([res[i].longitude, res[i].latitude])
              that.carMarkers[l].moveAlong(that.carMarkers[l].Je.lineArr, 200)
            }
          }
        }
      })
      if (that.carTimeQuery) {
        clearInterval(that.carTimeQuery)
      }
      that.carTimeQuery = setInterval(() => {
        var that = this
        that.carIdArr = []
        var bounds = that.map.getBounds()
        var carParsms = {
          areaCode: this.$ls.get('areaCode'),
          leftUpLocation: bounds.southwest.lng + ',' + bounds.northeast.lat,
          rightDownLocation: bounds.northeast.lng + ',' + bounds.southwest.lat
        }
        this.$store.dispatch('GetVehicleLocationStatus', carParsms).then(res => {
          for (var k in that.carMarkers) {
            that.carIdArr.push(that.carMarkers[k].Je.carId)
          }
          var icon
          for (var i = 0, marker; i < res.length; i++) {
            if (res.list[i].status === '行驶') {
              icon = '/imageUrl/mapOperatorIcon/xingshi.png'
            } else if (res.list[i].status === '充电') {
              icon = '/imageUrl/mapOperatorIcon/chong_dian.png'
            } else if (res.list[i].status === '离线') {
              icon = '/imageUrl/mapOperatorIcon/lixian.png'
            } else if (res.list[i].status === '未激活') {
              icon = '/imageUrl/mapOperatorIcon/weijihuo.png'
            }
            if (that.carIdArr.indexOf(res[i].id) < 0) {
              marker = new AMap.Marker({
                map: that.map,
                position: [res[i].longitude, res[i].latitude],
                icon: icon,
                carId: res[i].id,
                offset: new AMap.Pixel(-26, -13),
                autoRotation: true,
                angle: -90,
                lineArr: [[res[i].longitude, res[i].latitude]],
                vehicleNo: res[i].vehicleNo,
                vin: res[i].vin,
                vehicleSeriesName: res[i].vehicleSeriesName,
                vehicleTypeName: res[i].vehicleTypeName,
                manufacturerAbbr: res[i].manufacturerAbbr,
                powerResource: res[i].powerResource,
                vehiclePurpose: res[i].vehiclePurpose
              })
              marker.on('click', that.carMarkerWindow)
              that.carMarkers.push(marker)
            }
            for (var l in that.carMarkers) {
              if (that.carMarkers[l].Je.carId === res[i].id && that.carMarkers[l].Je.lineArr.length === 2) {
                that.carMarkers[l].Je.lineArr.shift(1)
                that.carMarkers[l].Je.lineArr.push([res[i].longitude, res[i].latitude])
                that.carMarkers[l].moveAlong(that.carMarkers[l].Je.lineArr, 200)
              } else if (that.carMarkers[l].Je.carId === res[i].id) {
                that.carMarkers[l].Je.lineArr.push([res[i].longitude, res[i].latitude])
                that.carMarkers[l].moveAlong(that.carMarkers[l].Je.lineArr, 200)
              }
            }
          }
        })
      }, 10000)
    },
    // 画区域点
    mapDrag () {
      var that = this
      that.idArr = []
      // that.map.remove(that.markers)
      var bounds = that.map.getBounds()
      var parsms = [
        {
          field: 'stationlng',
          value: bounds.southwest.lng + '_x_' + bounds.northeast.lng
        },
        {
          field: 'stationlat',
          value: bounds.southwest.lat + '_x_' + bounds.northeast.lat
        }
      ]
      this.$store.dispatch('Allstation', parsms).then(res => {
        for (var k in that.markers) {
          that.idArr.push(that.markers[k].Je.stationid)
        }
        var icon
        for (var i = 0, marker; i < res.list.length; i++) {
          if (res.list[i].eleStatus === 0 || res.list[i].eleStatus === 1) {
            icon = '/imageUrl/mapOperatorIcon/normal_' + res.list[i].operatorid + '.png'
          } else if (res.list[i].eleStatus === 255) {
            icon = '/imageUrl/mapOperatorIcon/break_' + res.list[i].operatorid + '.gif'
          } else {
            icon = '/imageUrl/mapOperatorIcon/charge_' + res.list[i].operatorid + '.gif'
          }
          if (that.idArr.indexOf(res.list[i].stationid) < 0) {
            marker = new AMap.Marker({
              map: that.map,
              position: [res.list[i].stationlng, res.list[i].stationlat],
              icon: icon,
              stationid: res.list[i].stationid,
              stationname: res.list[i].stationname,
              merchantName: res.list[i].merchantName,
              address: res.list[i].address,
              stationstatusName: res.list[i].stationstatusName,
              parkfee: res.list[i].parkfee,
              electricityfee: res.list[i].electricityfee,
              servicefee: res.list[i].servicefee,
              offset: new AMap.Pixel(-13, -30)
            })
            marker.on('click', that.markerWindow)
            // marker.emit('click', { target: marker }) // 默认打开信息窗口,有bug
            that.markers.push(marker)
          }
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.navCar {
  display: inline-block;
  padding-left: 80px;
  width: 170px;
}
.navNum {
  display: inline-block;
  width: 70px;
}
.navPile {
  display: inline-block;
  width: 20px;
}
.navCar1 {
  background: url(/imageUrl/car.png) no-repeat 16px 11px;
  background-size: 32px;
}
.navCar2 {
  background: url(/imageUrl/run.png) no-repeat 17px 7px;
  background-size: 32px;
}
.navCar3 {
  background: url(/imageUrl/charge.png) no-repeat 17px 8px;
  background-size: 32px;
}
.navCar4 {
  background: url(/imageUrl/no.png) no-repeat 17px 7px;
  background-size: 32px;
}
.navCar5 {
  background: url(/imageUrl/offline.png) no-repeat 18px 6px;
  background-size: 32px;
}
.dw1 > ul > li {
  height: 35px;
  line-height: 35px;
}
.dw2 > ul > li {
  height: 25px;
  line-height: 25px;
}
.battery-data {
  text-align: right;
  display: inline-block;
  position: relative;
  width: calc(25% - 15px);
  height: 100px;
  padding: 12px 24px 12px 120px;
  border-radius: 10px;
  margin-right: 20px;
  color: #ffffff;
}
.battery-icon {
  font-size: 80px;
  position: absolute;
  bottom: 10px;
  left: 30px;
}
.map_right_title {
  padding: 0px 10px;
  font-weight: bold;
}
.map_box {
  width: 200px;
  height: 35px;
  line-height: 35px;
  font-weight: bold;
}
.map_box_2 {
  width: 250px;
  height: 25px;
  line-height: 25px;
  font-weight: bold;
}
.map_box_3 {
  width: 250px;
  height: 35px;
  line-height: 35px;
  font-weight: bold;
}
</style>
