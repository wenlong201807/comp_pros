<template>
  <div>
    <a-card>
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>
          车辆预警监测
        </span>
      </template>
      <template slot="extra">
        <a-tooltip title="自定义设置">
          <a-button style="margin-right:8px;" size="small" type="primary" icon="edit" @click="showDialog"></a-button>
        </a-tooltip>
        <a-tooltip title="已处理告警信息详情">
          <a-button style="margin-right:8px;" size="small" type="primary" icon="alert" @click="showDialog1"></a-button>
        </a-tooltip>

        <a-dropdown>
          <a-menu slot="overlay" style="padding:8px 12px;">
            <a-checkbox-group @change="onCheckBoxChange" :defaultValue="[
              'rn',
              'brand',
              'vin',
              'sendtime',
              'typename',
              'drivermotorstatus',
              'controllertemperature',
              'motortemperature',
              'inputvoltage',
              'controllercurrent',
              'positioningstatus',
              'enginestate',
              'speed',
              'totalvoltage',
              'totalcurrent',
              'soc',
              'dcdcstate',
              'insulationresistance',
              'voltagehighestvalue',
              'voltageminimum',
              'maximumtemperature',
              'minimumtemperature',
              'status'
            ]">
              <a-row>
                <a-col v-for="item in finallyColumns" :key="item.dataIndex">
                  <a-checkbox v-if="item.dataIndex !== 'operation'" :value="item.dataIndex">{{
                    item.title
                  }}</a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-menu>
          <a-button size="small">
            <a-icon type="appstore" />
          </a-button>
        </a-dropdown>
      </template>
      <a-table rowKey="rn" :scroll="{ x: true }" bordered :columns="columns" :dataSource="tableData"
               :pagination="pagination" @change="handleTableChange" :loading="loading">
        <template slot="status" slot-scope="text">
          <span v-if="text === '0'">未处理</span>
          <span v-if="text === '1'" style="color:#d9534f;">处理中...</span>
        </template>
        <template slot="operation" slot-scope="text, record">
          <a-dropdown v-if="!record.editable">
            <a-menu slot="overlay">
              <a-menu-item key="4" @click.self="handleMenuClick(text, record,'4','人工忽略')">人工忽略</a-menu-item>
              <a-menu-item key="1" @click.self="handleMenuClick(text, record,'1','人工确认')">人工确认</a-menu-item>
              <a-menu-item key="2" @click.self="handleMenuClick(text, record,'2','邮件提示')"> 邮件提示</a-menu-item>
              <a-menu-item key="3" @click.self="handleMenuClick(text, record,'3','短信提示')">短信提示</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px" type="primary">
              人工忽略
              <a-icon type="down" />
            </a-button>
          </a-dropdown>
          <a-button v-if="record.editable " @click.self="handleMenuClick(text, record,'','确认处理完成')">确认处理完成</a-button>

        </template>
        <template v-for=" col in inlineEditCol" :slot="col" slot-scope="text, record">
          <div :key="col">
            <span v-if="searchParams[col] && !record.editable">
              <template v-for="(fragment, i) in text
                .toString()
                .split(new RegExp(`(?<=${searchParams[col]})|(?=${searchParams[col]})`, 'i'))">
                <mark v-if="fragment.toLowerCase() === searchParams[col].toLowerCase()" :key="i" class="highlight">{{
                  fragment
                }}</mark>
                <template v-else>{{ fragment }}</template>
              </template>
            </span>
            <template v-else>{{ text }}</template>
          </div>
        </template>
        <a-icon slot="filterIcon" slot-scope="filtered" type="search"
                :class="filtered ? 'ant-pro-active-icon' : undefined" />

        <a-icon slot="filterIcon" slot-scope="filtered" type="search"
                :class="filtered ? 'ant-pro-active-icon' : undefined" />
        <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
             style="padding: 8px">
          <a-input v-ant-ref="c => (searchInput = c)" :placeholder="`搜索 ${column.title}`"
                   v-model="searchText[column.dataIndex]"
                   @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                   @pressEnter="() => handleSearch(confirm, column.dataIndex)"
                   style="width: 188px; margin-bottom: 8px; display: block;" />
          <a-button type="primary" @click="() => handleSearch(confirm, column.dataIndex)" icon="search" size="small"
                    style="width: 90px; margin-right: 8px">搜索</a-button>
          <a-button @click="() => handleReset(clearFilters, column.dataIndex)" size="small" style="width: 90px">重置
          </a-button>
        </div>
      </a-table>
    </a-card>
    <a-modal title="自定义预警设置" :visible="visible1" @ok="handleOkSelect" :confirmLoading="confirmLoading"
             @cancel="handleCancel" :width="900">
      <a-card title="自定义预警选项" style="text-align:center;font-size:26px;"></a-card>
      <a-card>
        <template slot="title">
          <span style="margin-left: 12px">
            <div class="titleFlag"></div>
            驱动电机数据
          </span>
        </template>
        <a-list itemLayout="horizontal">
          <a-list-item>
            <a-col :span="8">
              <a-switch v-model="DRIVERMOTORSTATUS.STATUS" @change="onChange" />
              <span class="fontCss">驱动电机状态</span>
            </a-col>
            <a-col :span="16">
              <a-checkbox-group :options="plainOptions" :defaultValue="DRIVERMOTORSTATUSList"
                                @change="onChangeDRIVERMOTORSTATUSList" />
            </a-col>
            <!-- <a-col :span="4">
              <a-checkbox-group :options="plainOptions1" :defaultValue="DRIVERMOTORSTATUSsStatus"
                @change="onChangeDRIVERMOTORSTATUSsStatus" />
            </a-col> -->
          </a-list-item>
          <a-list-item>
            <a-col :span="8">
              <a-switch defaultChecked v-model="CONTROLLERTEMPERATURE.STATUS" />
              <span class="fontCss">驱动电机控制器温度</span>
            </a-col>
            <a-col :span="12">
              <a-input-number size="small" v-model="CONTROLLERTEMPERATURE.MIN" :min="1" :max="100000"
                              placeholder="最小值" />
              <a-input-number size="small" v-model="CONTROLLERTEMPERATURE.MAX" :min="1" :max="100000" placeholder="最大值"
                              style="margin-left:140px;" />
            </a-col>
            <a-col :span="4">
              <a-checkbox-group :options="plainOptions1" :defaultValue="CONTROLLERTEMPERATURESSTATUS"
                                @change="onChangeCONTROLLERTEMPERATURESSTATUS" />
            </a-col>
          </a-list-item>
          <a-list-item>
            <a-col :span="8">
              <a-switch defaultChecked v-model="MOTORTEMPERATURE.STATUS" />
              <span class="fontCss">驱动电机温度</span>
            </a-col>
            <a-col :span="12">
              <a-input-number size="small" v-model="MOTORTEMPERATURE.MIN" :min="1" :max="100000" placeholder="最小值"
                              @change="onChange" />
              <a-input-number size="small" v-model="MOTORTEMPERATURE.MAX" :min="1" :max="100000" placeholder="最大值"
                              style="margin-left:140px;" @change="onChange" />
            </a-col>
            <a-col :span="4">
              <a-checkbox-group :options="plainOptions1" :defaultValue="MOTORTEMPERATURESTATUS"
                                @change="onChangeMOTORTEMPERATURESTATUS" />
            </a-col>
          </a-list-item>
          <a-list-item>
            <a-col :span="8">
              <a-switch defaultChecked v-model="INPUTVOLTAGE.STATUS" @change="onChange" />
              <span class="fontCss">电机控制器输入电压</span>
            </a-col>
            <a-col :span="12">
              <a-input-number size="small" v-model="INPUTVOLTAGE.MIN" :min="1" :max="100000" placeholder="最小值"
                              @change="onChange" />
              <a-input-number size="small" v-model="INPUTVOLTAGE.MAX" :min="1" :max="100000" placeholder="最大值"
                              style="margin-left:140px;" @change="onChange" />
            </a-col>
            <a-col :span="4">
              <a-checkbox-group :options="plainOptions1" :defaultValue="INPUTVOLTAGESTATUS"
                                @change="onChangeINPUTVOLTAGESTATUS" />
            </a-col>
          </a-list-item>
          <a-list-item>
            <a-col :span="8">
              <a-switch defaultChecked v-model="CONTROLLERCURRENT.STATUS" @change="onChange" />
              <span class="fontCss">电机控制器直流母线电流</span>
            </a-col>
            <a-col :span="12">
              <a-input-number size="small" v-model="CONTROLLERCURRENT.MIN" :min="1" :max="100000" placeholder="最小值"
                              @change="onChange" />
              <a-input-number size="small" v-model="CONTROLLERCURRENT.MAX" :min="1" :max="100000" placeholder="最大值"
                              style="margin-left:140px;" @change="onChange" />
            </a-col>
            <a-col :span="4">
              <a-checkbox-group :options="plainOptions1" :defaultValue="CONTROLLERCURRENTSTATUS"
                                @change="onChangeCONTROLLERCURRENTSTATUS" />
            </a-col>
          </a-list-item>
        </a-list>
      </a-card>

      <a-card>
        <template slot="title">
          <span style="margin-left: 12px">
            <div class="titleFlag"></div>
            车辆位置数据
          </span>
        </template>
        <a-list itemLayout="horizontal">
          <a-list-item>
            <a-col :span="8">
              <a-switch defaultChecked v-model="POSITIONINGSTATUS1.STATUS" @change="onChange" />
              <span class="fontCss">定位状态</span>
            </a-col>
            <a-col :span="16">
              <a-checkbox-group :options="plainOptions2" :defaultValue="POSITIONINGSTATUSSSTATUS"
                                @change="onChangePOSITIONINGSTATUSSSTATUS" />
            </a-col>
          </a-list-item>
        </a-list>
      </a-card>
      <a-card>
        <template slot="title">
          <span style="margin-left: 12px">
            <div class="titleFlag"></div>
            发动机数据
          </span>
        </template>
        <a-list itemLayout="horizontal">
          <a-list-item>
            <a-col :span="8">
              <a-switch defaultChecked v-model="ENGINESTATE.STATUS" @change="onChange" />
              <span class="fontCss">驱动电机状态</span>
            </a-col>
            <a-col :span="16">
              <a-checkbox-group :options="plainOptions3" :defaultValue="ENGINESTATESSTATUS"
                                @change="onChangeENGINESTATESSTATUS" />
            </a-col>
            <!-- <a-col :span="4">
              <a-checkbox-group :options="plainOptions1" :defaultValue="ENGINESTATESSTATUSList"
                @change="onChangeENGINESTATESSTATUSList" />
            </a-col> -->
          </a-list-item>
        </a-list>
      </a-card>
      <a-card>
        <template slot="title">
          <span style="margin-left: 12px">
            <div class="titleFlag"></div>
            整车数据
          </span>
        </template>
        <a-list itemLayout="horizontal">
          <a-list-item>
            <a-col :span="8">
              <a-switch defaultChecked v-model="SPEED.STATUS" @change="onChange" />
              <span class="fontCss">车速</span>
            </a-col>
            <a-col :span="12">
              <a-input-number size="small" v-model="SPEED.MIN" :min="1" :max="100000" placeholder="最小值"
                              @change="onChange" />
              <a-input-number size="small" :min="1" :max="100000" placeholder="最大值" v-model="SPEED.MAX"
                              style="margin-left:140px;" @change="onChange" />
            </a-col>
            <a-col :span="4">
              <a-checkbox-group :options="plainOptions1" :defaultValue="SPEEDSTATUS" @change="onChangeSPEEDSTATUS" />
            </a-col>
          </a-list-item>
          <a-list-item>
            <a-col :span="8">
              <a-switch defaultChecked v-model="TOTALVOLTAGE.STATUS" @change="onChange" />
              <span class="fontCss">总电压</span>
            </a-col>
            <a-col :span="12">
              <a-input-number size="small" v-model="TOTALVOLTAGE.MIN" :min="1" :max="100000" placeholder="最小值"
                              @change="onChange" />
              <a-input-number size="small" v-model="TOTALVOLTAGE.MAX" :min="1" :max="100000" placeholder="最大值"
                              style="margin-left:140px;" @change="onChange" />
            </a-col>
            <a-col :span="4">
              <a-checkbox-group :defaultValue="TOTALVOLTAGESTATUS" :options="plainOptions1"
                                @change="onChangeTOTALVOLTAGESTATUS" />
            </a-col>
          </a-list-item>
          <a-list-item>
            <a-col :span="8">
              <a-switch defaultChecked v-model="TOTALCURRENT.STATUS" @change="onChange" />
              <span class="fontCss">总电流</span>
            </a-col>
            <a-col :span="12">
              <a-input-number size="small" v-model="TOTALCURRENT.MIN" :min="1" :max="100000" placeholder="最小值"
                              @change="onChange" />
              <a-input-number size="small" v-model="TOTALCURRENT.MAX" :min="1" :max="100000" placeholder="最大值"
                              style="margin-left:140px;" @change="onChange" />
            </a-col>
            <a-col :span="4">
              <a-checkbox-group :defaultValue="TOTALCURRENTSSTATUS" :options="plainOptions1"
                                @change="onChangeTOTALCURRENTSSTATUS" />
            </a-col>
          </a-list-item>
          <a-list-item>
            <a-col :span="8">
              <a-switch defaultChecked v-model="SOC.STATUS" @change="onChange" />
              <span class="fontCss">SOC</span>
            </a-col>
            <a-col :span="12">
              <a-input-number size="small" :min="1" v-model="SOC.MIN" :max="100000" placeholder="最小值"
                              @change="onChange" />
              <a-input-number size="small" v-model="SOC.MAX" :min="1" :max="100000" placeholder="最大值"
                              style="margin-left:140px;" @change="onChange" />
            </a-col>
            <a-col :span="4">
              <a-checkbox-group :options="plainOptions1" :defaultValue="SOCSSTATUS" @change="onChangeSOCSSTATUS" />
            </a-col>
          </a-list-item>
          <a-list-item>
            <a-col :span="8">
              <a-switch defaultChecked v-model="DCDCSTATE.STATUS" @change="onChange" />
              <span class="fontCss">DC-DC状态</span>
            </a-col>
            <a-col :span="16">
              <a-checkbox-group :options="plainOptions4" :defaultValue="DCDCSTATESTATUS"
                                @change="onChangeDCDCSTATESTATUS" />
            </a-col>
            <!-- <a-col :span="4">
              <a-checkbox-group :options="plainOptions1" :defaultValue="DCDCSTATEList"
                @change="onChangeDCDCSTATEList" />
            </a-col> -->
          </a-list-item>
          <a-list-item>
            <a-col :span="8">
              <a-switch defaultChecked v-model="INSULATIONRESISTANCE.STATUS" @change="onChange" />
              <span class="fontCss">绝缘电阻</span>
            </a-col>
            <a-col :span="12">
              <a-input-number size="small" v-model="INSULATIONRESISTANCE.MIN" :min="1" :max="100000" placeholder="最小值"
                              @change="onChange" />
              <a-input-number size="small" v-model="INSULATIONRESISTANCE.MAX" :min="1" :max="100000" placeholder="最大值"
                              style="margin-left:140px;" @change="onChange" />
            </a-col>
            <a-col :span="4">
              <a-checkbox-group :options="plainOptions1" :defaultValue="INSULATIONRESISTANCESSTATUS"
                                @change="onChangeINSULATIONRESISTANCESSTATUS" />
            </a-col>
          </a-list-item>
        </a-list>
      </a-card>
      <a-card>
        <template slot="title">
          <span style="margin-left: 12px">
            <div class="titleFlag"></div>
            极值数据
          </span>
        </template>
        <a-list itemLayout="horizontal">
          <a-list-item>
            <a-col :span="8">
              <a-switch defaultChecked v-model="VOLTAGEHIGHESTVALUE.STATUS" @change="onChange" />
              <span class="fontCss">电池单体电压最高值</span>
            </a-col>
            <a-col :span="16">
              <a-checkbox-group :options="plainOptions" :defaultValue="VOLTAGEHIGHESTVALUESSTATUS"
                                @change="onChangeVOLTAGEHIGHESTVALUESSTATUS" />
            </a-col>
            <!-- <a-col :span="4">
              <a-checkbox-group :options="plainOptions1" :defaultValue="VOLTAGEHIGHESTVALUEList"
                @change="onChangeVOLTAGEHIGHESTVALUEList" />
            </a-col> -->
          </a-list-item>
          <a-list-item>
            <a-col :span="8">
              <a-switch defaultChecked v-model="VOLTAGEMINIMUM.STATUS" @change="onChange" />
              <span class="fontCss">电池单体电压最低值</span>
            </a-col>
            <a-col :span="12">
              <a-input-number size="small" v-model="VOLTAGEMINIMUM.MIN" :min="1" :max="100000" placeholder="最小值"
                              @change="onChange" />
              <a-input-number size="small" v-model="VOLTAGEMINIMUM.MAX" :min="1" :max="100000" placeholder="最大值"
                              style="margin-left:140px;" @change="onChange" />
            </a-col>
            <a-col :span="4">
              <a-checkbox-group :options="plainOptions1" :defaultValue="VOLTAGEMINIMUMList"
                                @change="onChangeVOLTAGEMINIMUMList1" />
            </a-col>
          </a-list-item>
          <a-list-item>
            <a-col :span="8">
              <a-switch defaultChecked v-model="MAXIMUMTEMPERATURE.STATUS" @change="onChange" />
              <span class="fontCss">最高温度值</span>
            </a-col>
            <a-col :span="12">
              <a-input-number size="small" v-model="MAXIMUMTEMPERATURE.MIN" :min="1" :max="100000" placeholder="最小值"
                              @change="onChange" />
              <a-input-number size="small" v-model="MAXIMUMTEMPERATURE.MAX" :min="1" :max="100000" placeholder="最大值"
                              style="margin-left:140px;" @change="onChange" />
            </a-col>
            <a-col :span="4">
              <a-checkbox-group :options="plainOptions1" :defaultValue="MAXIMUMTEMPERATURESSTATUS"
                                @change="onChangeMAXIMUMTEMPERATURESSTATUS" />
            </a-col>
          </a-list-item>
          <a-list-item>
            <a-col :span="8">
              <a-switch defaultChecked v-model="MINIMUMTEMPERATURE.STATUS" @change="onChange" />
              <span class="fontCss">最低温度值</span>
            </a-col>
            <a-col :span="12">
              <a-input-number size="small" v-model="MINIMUMTEMPERATURE.MIN" :min="1" :max="100000" placeholder="最小值"
                              @change="onChange" />
              <a-input-number size="small" :min="1" v-model="MINIMUMTEMPERATURE.MAX" :max="100000" placeholder="最大值"
                              style="margin-left:140px;" @change="onChange" />
            </a-col>
            <a-col :span="4">
              <a-checkbox-group :options="plainOptions1" :defaultValue="MINIMUMTEMPERATURESSTATUS"
                                @change="onChangeMINIMUMTEMPERATURESSTATUS" />
            </a-col>
          </a-list-item>
        </a-list>
      </a-card>
    </a-modal>

    <a-modal title="已处理告警信息详情查看" :visible="visible2" @ok="handleOkSelect" :confirmLoading="confirmLoading"
             @cancel="handleCancel" :width="1400" :footer="null">
      <a-card>
        <template slot="extra">
          <template slot="title">
            <span style="margin-left: 12px">
              <div class="titleFlag"></div>
              车辆预警监测
            </span>
            <a-select defaultValue="lucy" style="width: 120px" @change="handleChange">
              <a-select-option value="jack">Jack</a-select-option>
              <a-select-option value="lucy">Lucy</a-select-option>
              <a-select-option value="disabled" disabled>Disabled</a-select-option>
              <a-select-option value="Yiminghe">yiminghe</a-select-option>
            </a-select>
          </template>

          <a-tooltip title="导出表格">
            <a-button style="margin-right:8px;" size="small" type="primary" icon="download" @click="exportTable">
            </a-button>
          </a-tooltip>
          <a-dropdown>
            <a-menu slot="overlay" style="padding:8px 12px;">
              <a-checkbox-group @change="onCheckBoxChange1"
                                :defaultValue="['rn', 'brand', 'vin', 'typename', 'sendtime', 'handletime', 'handletype', 'handler']">
                <a-row>
                  <a-col v-for="item in finallyColumns1" :key="item.dataIndex">
                    <a-checkbox v-if="item.dataIndex !== 'operation'" :value="item.dataIndex">{{
                      item.title
                    }}</a-checkbox>
                  </a-col>
                </a-row>
              </a-checkbox-group>
            </a-menu>
            <a-button size="small">
              <a-icon type="appstore" />
            </a-button>
          </a-dropdown>
        </template>

        <a-table rowKey="rn" :scroll="{ x: true }" bordered :columns="columns1" :dataSource="tableData1"
                 :pagination="pagination" @change=" handleTableChange1" :loading="loading1">
          <template v-for="col in inlineEditCol" :slot="col" slot-scope="text, record">
            <div :key="col">
              <span v-if="searchParams[col] && !record.editable">
                <template v-for="(fragment, i) in text
                  .toString()
                  .split(new RegExp(`(?<=${searchParams[col]})|(?=${searchParams[col]})`, 'i'))">
                  <mark v-if="fragment.toLowerCase() === searchParams[col].toLowerCase()" :key="i" class="highlight">{{
                    fragment
                  }}</mark>
                  <template v-else>{{ fragment }}</template>
                </template>
              </span>
              <template v-else>{{ text }}</template>
            </div>
          </template>
          <a-icon slot="filterIcon" slot-scope="filtered" type="search"
                  :class="filtered ? 'ant-pro-active-icon' : undefined" />

          <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
               style="padding: 8px">
            <a-input v-ant-ref="c => (searchInput = c)" :placeholder="`搜索 ${column.title}`"
                     v-model="searchParams[column.dataIndex]"
                     @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                     @pressEnter="() => handleSearch(confirm, column.dataIndex)"
                     style="width: 188px; margin-bottom: 8px; display: block;" />
            <a-button type="primary" @click="() => handleSearch(confirm, column.dataIndex)" icon="search" size="small"
                      style="width: 90px; margin-right: 8px">搜索</a-button>
            <a-button @click="() => handleReset(clearFilters, column.dataIndex)" size="small" style="width: 90px">重置
            </a-button>
          </div>
          <a-icon slot="filterIcon" slot-scope="filtered" type="search"
                  :class="filtered ? 'ant-pro-active-icon' : undefined" />
          <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
               style="padding: 8px">
            <a-input v-ant-ref="c => (searchInput = c)" :placeholder="`搜索 ${column.title}`"
                     v-model="searchParams[column.dataIndex]"
                     @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                     @pressEnter="() => handleSearch(confirm, column.dataIndex)"
                     style="width: 188px; margin-bottom: 8px; display: block;" />
            <a-button type="primary" @click="() => handleSearch(confirm, column.dataIndex)" icon="search" size="small"
                      style="width: 90px; margin-right: 8px">搜索</a-button>
            <a-button @click="() => handleReset(clearFilters, column.dataIndex)" size="small" style="width: 90px">重置
            </a-button>
          </div>
        </a-table>
      </a-card>
    </a-modal>

  </div>
</template>

<script>
import { filter } from 'minimatch'
export default {
  data () {
    return {
      company1: '',
      vechileType1: '',
      loading: false,
      loading1: false,
      filters: null,
      areaCode: this.$ls.get('areaCode'),
      company: '',
      vechileType: '',
      vin: '',

      nowState: '',
      MINIMUMTEMPERATURESSTATUS: [],
      MAXIMUMTEMPERATURESSTATUS: [],
      VOLTAGEMINIMUMList: [],
      caoZuoValue: '0',
      optionNow: '0', // 当前表格的操作状态
      // 过滤条件
      searchText: {
        brand: null,
        typename: null,
        vin: null
      },
      selectCar: null, // 选中的汽车牌子
      visible2: false,
      plainOptions: [
        { label: '耗电', value: '1' },
        { label: '发电', value: '2' },
        { label: '关闭状态', value: '3' },
        { label: '准备状态', value: '4' },
        { label: '异常', value: '254' },
        { label: '无效', value: '255' }
      ],
      plainOptions1: [
        { label: '异常', value: '254' },
        { label: '无效', value: '255' }
      ],
      plainOptions3: [
        { label: '启动状态', value: '1' },
        { label: '关闭状态', value: '2' },
        { label: '异常', value: '254' },
        { label: '无效', value: '255' }
      ],
      plainOptions4: [
        { label: '工作', value: '1' },
        { label: '断开', value: '2' },
        { label: '异常', value: '254' },
        { label: '无效', value: '255' }
      ],
      plainOptions2: [
        { label: ' 无效定位', value: '1357' },
        { label: '北纬东经', value: '0' },
        { label: '南纬东经', value: '2' },
        { label: '北纬西经', value: '4' },
        { label: '南纬西经', value: '6' }
      ],
      checkedList: [], // 自定义预警驱动电机状态checkBox
      visible1: false, // 自定义预警弹窗
      confirmLoading: false, // 自定义预警弹窗内容加载
      // 表格Loading
      tableLoading: false,
      sStatus: ['1', '2'],
      searchInput: null,
      // 行内编辑的字段
      inlineEditCol: ['stationName'],
      tableData: [],
      customSettings: [],
      DRIVERMOTORSTATUSsStatus: [],
      DRIVERMOTORSTATUSList: [],
      DRIVERMOTORSTATUS: {
        STATUS: true,
        CNAME: '驱动电机状态',
        MIN: '',
        MAX: '',
        SSTATUS: '',
        NAME: 'DRIVERMOTORSTATUS'
      },
      CONTROLLERTEMPERATURESSTATUS: [],
      CONTROLLERTEMPERATURE: {
        STATUS: false,
        CNAME: '驱动电机控制器温度',
        MIN: '1',
        MAX: '2',
        SSTATUS: '',
        NAME: 'CONTROLLERTEMPERATURE'
      },
      MOTORTEMPERATURESTATUS: [],
      MOTORTEMPERATURE: {
        STATUS: false,
        CNAME: '驱动电机温度',
        MIN: '3',
        MAX: '4',
        SSTATUS: '',
        NAME: 'MOTORTEMPERATURE'
      },
      INPUTVOLTAGESTATUS: [],
      INPUTVOLTAGE: {
        STATUS: false,
        CNAME: '电机控制器输入电压',
        MIN: '5',
        MAX: '6',
        SSTATUS: '',
        NAME: 'INPUTVOLTAGE'
      },
      CONTROLLERCURRENTSTATUS: [],
      CONTROLLERCURRENT: {
        STATUS: false,
        CNAME: '电机控制器直流母线电流',
        MIN: '7',
        MAX: '8',
        SSTATUS: '',
        NAME: 'CONTROLLERCURRENT'
      },
      POSITIONINGSTATUSSSTATUS: [],
      POSITIONINGSTATUS1: {
        STATUS: false,
        CNAME: '定位状态',
        MIN: '',
        MAX: '',
        SSTATUS: '',
        NAME: 'POSITIONINGSTATUS'
      },
      ENGINESTATESSTATUS: [],
      ENGINESTATESSTATUSList: [],
      ENGINESTATE: {
        STATUS: false,
        CNAME: '发动机状态',
        MIN: '',
        MAX: '',
        SSTATUS: '',
        NAME: 'ENGINESTATE'
      },
      SPEEDSTATUS: [],
      SPEED: {
        STATUS: false,
        CNAME: '车速',
        MIN: '',
        MAX: '1',
        SSTATUS: '',
        NAME: 'SPEED'
      },
      TOTALVOLTAGESTATUS: [],
      TOTALVOLTAGE: {
        STATUS: false,
        CNAME: '总电压',
        MIN: '1',
        MAX: '',
        SSTATUS: '',
        NAME: 'TOTALVOLTAGE'
      },
      TOTALCURRENTSSTATUS: [],
      TOTALCURRENT: {
        STATUS: false,
        CNAME: '总电流',
        MIN: '',
        MAX: '',
        SSTATUS: '',
        NAME: 'TOTALCURRENT'
      },
      SOCSSTATUS: [],
      SOC: {
        STATUS: false,
        CNAME: 'SOC',
        MIN: '',
        MAX: '',
        SSTATUS: '',
        NAME: 'SOC'
      },
      DCDCSTATESTATUS: [],
      DCDCSTATEList: [],
      DCDCSTATE: {
        STATUS: false,
        CNAME: 'DC-DC状态',
        MIN: '',
        MAX: '',
        SSTATUS: '',
        NAME: 'DCDCSTATE',
        DCDCSTATEList: ''
      },
      INSULATIONRESISTANCESSTATUS: [],
      INSULATIONRESISTANCE: {
        STATUS: false,
        CNAME: '绝缘电阻',
        MIN: '',
        MAX: '',
        SSTATUS: '',
        NAME: 'INSULATIONRESISTANCE'
      },
      VOLTAGEHIGHESTVALUESSTATUS: [],
      VOLTAGEHIGHESTVALUEList: [],
      VOLTAGEHIGHESTVALUE: {
        STATUS: false,
        CNAME: '电池单体电压最高值',
        MIN: '',
        MAX: '',
        SSTATUS: '',
        NAME: 'VOLTAGEHIGHESTVALUE',
        VOLTAGEHIGHESTVALUEList: []
      },
      onChangeVOLTAGEMINIMUMList: [],
      VOLTAGEMINIMUM: {
        STATUS: false,
        CNAME: '电池单体电压最低值',
        MIN: '',
        MAX: '',
        SSTATUS: '',
        NAME: 'VOLTAGEMINIMUM'
      },
      MAXIMUMTEMPERATURE: {
        STATUS: false,
        CNAME: '最高温度值',
        MIN: '',
        MAX: '',
        SSTATUS: '',
        NAME: 'MAXIMUMTEMPERATURE'
      },
      MINIMUMTEMPERATURE: {
        STATUS: false,
        CNAME: '最低温度值',
        MIN: '',
        MAX: '',
        SSTATUS: '',
        NAME: 'MINIMUMTEMPERATURE'
      },

      tableData1: [],
      columns1: [
        {
          title: '序号',
          dataIndex: 'rn'
        },
        {
          title: '车企',
          dataIndex: 'brand',
          filters: [],
          filterMultiple: false,
          sorter: true
        },
        {
          title: 'VIN',
          dataIndex: 'vin',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'vin'
          },
          sorter: true
        },

        {
          title: '车辆类型',
          dataIndex: 'typeName',
          sorter: true
        },
        {
          title: '报警时间',
          dataIndex: 'sendTime',
          sorter: true
        },
        {
          title: '处理时间',
          dataIndex: 'handleTime',
          sorter: true
        },
        {
          title: '处理类型',
          dataIndex: 'handleType',
          filters: [],
          filterMultiple: false,
          sorter: true
        },
        {
          title: '处理人',
          dataIndex: 'handler',
          sorter: true
        }
      ],
      finallyColumns1: [
        {
          title: '序号',
          dataIndex: 'rn'
        },
        {
          title: '车企',
          dataIndex: 'brand',
          filters: [],
          filterMultiple: false,
          sorter: true
        },
        {
          title: 'VIN',
          dataIndex: 'vin',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'vin'
          },
          sorter: true
        },

        {
          title: '车辆类型',
          dataIndex: 'typeName',
          sorter: true
        },
        {
          title: '报警时间',
          dataIndex: 'sendTime',
          sorter: true
        },
        {
          title: '处理时间',
          dataIndex: 'handleTime',
          sorter: true
        },
        {
          title: '处理类型',
          dataIndex: 'handleType',
          filters: [],
          filterMultiple: false,
          sorter: true
        },
        {
          title: '处理人',
          dataIndex: 'handler',
          sorter: true
        }
      ],
      // 列
      columns: [
        {
          title: '序号',
          dataIndex: 'rn'
        },
        {
          title: '车企',
          dataIndex: 'brand',

          filters: [],
          filterMultiple: false,
          sorter: true
        },
        {
          title: 'VIN',
          dataIndex: 'vin',
          sorter: true
        },
        {
          title: '报警时间',
          dataIndex: 'sendTime',
          sorter: true
        },
        {
          title: '车辆类型',
          dataIndex: 'typeName',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'brandName'
          },
          sorter: true
        },

        {
          title: '驱动电机控制器温度',
          dataIndex: 'controllerTemperature',
          sorter: true
        },
        {
          title: '驱动电机温度',
          dataIndex: 'motorTemperature',
          sorter: true
        },
        {
          title: '电机控制器输入电压',
          dataIndex: 'inputVoltage',
          sorter: true
        },
        {
          title: '电机控制器直流母线电流',
          dataIndex: 'controllerCurrent',
          sorter: true
        },

        {
          title: '处理状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
          sorter: true
        },
        {
          title: '处理操作',
          dataIndex: 'handleType',
          fixed: 'right',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      // 列内容常量
      finallyColumns: [
        {
          title: '序号',
          dataIndex: 'rn'
        },
        {
          title: '车企',
          dataIndex: 'brand',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'stationName'
          },
          filters: [],
          filterMultiple: false,
          sorter: true
        },
        {
          title: 'VIN',
          dataIndex: 'vin',
          sorter: true
        },
        {
          title: '报警时间',
          dataIndex: 'sendtime',
          sorter: true
        },
        {
          title: '车辆类型',
          dataIndex: 'typename',
          sorter: true
        },

        {
          title: '驱动电机控制器温度',
          dataIndex: 'controllertemperature',
          sorter: true
        },
        {
          title: '驱动电机温度',
          dataIndex: 'motortemperature',
          sorter: true
        },
        {
          title: '电机控制器输入电压',
          dataIndex: 'inputvoltage',
          sorter: true
        },
        {
          title: '电机控制器直流母线电流',
          dataIndex: 'controllercurrent',
          sorter: true
        },

        {
          title: '处理状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
          sorter: true
        },
        {
          title: '处理操作',
          dataIndex: ''
        }
      ],
      // 分页组件
      pagination: {
        onChange: page => {
          this.pagination.current = page
        },
        pageSize: 10,
        total: 0,
        showTotal: total => `共 ${this.pagination.total} 条`,
        current: 1
      },
      carData: [],
      lightData: [],
      // 单选框条件
      searchRadio: {
        brand: null,
        handleType: null
      },
      searchParams: {
        typename: null,
        vin: null
      }
    }
  },
  created () {
    var that = this
    // 车企下拉
    const areaParams = [
      {
        field: 'areaCode',
        value: this.$ls.get('areaCode')
      }
    ]
    this.$store.dispatch('GroupStatisticsByFactory', areaParams).then(res => {
      that.carData = res
      that.columns.forEach((item, index, arr) => {
        if (arr[index].dataIndex === 'brand') {
          res.forEach(item => {
            arr[index].filters.push({
              text: item.name,
              value: item.name
            })
          })
        }
      })
      that.columns1.forEach((item, index, arr) => {
        if (arr[index].dataIndex === 'brand') {
          res.forEach(item => {
            arr[index].filters.push({
              text: item.name,
              value: item.name
            })
          })
        }
      })
    })
    // 数据传输情况监测
    this.$store.dispatch('AlarmTypeList').then(res => {
      that.lightData = res
      that.columns.forEach((item, index, arr) => {
        if (arr[index].dataIndex === 'lamp') {
          res.forEach(item => {
            arr[index].filters.push({
              text: item,
              value: item
            })
          })
        }
      })
      // 处理操作
      that.columns1.forEach((item, index, arr) => {
        if (arr[index].dataIndex === 'lamp') {
          res.forEach(item => {
            arr[index].filters.push({
              text: item,
              value: item
            })
          })
        }
      })
    })
    // 处理类型
    this.$store.dispatch('HandleTypeList').then(res => {
      that.typeData = res
      that.columns1.forEach((item, index, arr) => {
        if (arr[index].dataIndex === 'handleType') {
          res.forEach(item => {
            arr[index].filters.push({
              text: item,
              value: item
            })
          })
        }
      })
    })

    // 初始化表格数据
    this.handleTableChange()
    this.handleTableChange1()
    this.initWarningData()
  },
  methods: {
    postExcelFile (params, url) {
      // params是post请求需要的参数，url是请求url地址
      var form = document.createElement('form')
      form.style.display = 'none'
      form.action = url
      form.method = 'post'
      document.body.appendChild(form)
      // 动态创建input并给value赋值
      for (var key in params) {
        var input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = params[key]
        form.appendChild(input)
      }

      form.submit()
      form.remove()
    },
    // exportTable() {
    //   var that = this
    //   const url =
    //     window.gurl.SERVICE_CONTEXT_PATH + 'vehicle/export/forewaringList'
    //   this.postExcelFile(
    //     {areaCode:this.$ls.get('areaCode'), company: that.company, vechileType: that.vechileType, vin: that.vin },
    //     url
    //   )
    // },
    exportTable () {
      var that = this
      const params = [
        {
          field: 'areaCode',
          value: this.$ls.get('areaCode')
        }
      ]
      Object.keys(this.searchParams).forEach(item => {
        if (this.searchParams[item]) {
          params.push({
            field: item,
            value: `%${this.searchParams[item]}%`
          })
        }
      })
      Object.keys(this.searchRadio).forEach(item => {
        if (this.filters != undefined) {
          Object.keys(this.filters).forEach(itemn => {
            if (itemn == item) {
              if (this.filters[item][0] != undefined) {
                params.push({
                  field: itemn,
                  value: this.filters[item][0]
                })
              }
            }
          })
        }
      })
      this.$store
        .dispatch('ForewaringList', params)
        .then(res => {
          const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
          const fileName = ' 已处理告警信息详情档案.xls'
          const link = document.createElement('a')
          link.download = fileName
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          document.body.appendChild(link)
          link.click()
          URL.revokeObjectURL(link.href)
          document.body.removeChild(link)
        })
        .catch(error => {
          console.log(error)
        })
    },

    handleOkSelect () {
      var obj = []

      obj.push(this.DRIVERMOTORSTATUS)
      obj.push(this.CONTROLLERTEMPERATURE)
      obj.push(this.MOTORTEMPERATURE)
      obj.push(this.INPUTVOLTAGE)
      obj.push(this.CONTROLLERCURRENT)
      obj.push(this.POSITIONINGSTATUS1)
      obj.push(this.ENGINESTATE)
      obj.push(this.SPEED)
      obj.push(this.TOTALVOLTAGE)
      obj.push(this.TOTALCURRENT)
      obj.push(this.SOC)
      obj.push(this.DCDCSTATE)
      obj.push(this.INSULATIONRESISTANCE)
      obj.push(this.VOLTAGEHIGHESTVALUE)
      obj.push(this.VOLTAGEMINIMUM)
      obj.push(this.MAXIMUMTEMPERATURE)
      obj.push(this.MINIMUMTEMPERATURE)
      const Params = {
        data: obj
      }
      this.$store.dispatch('AddCondition', Params).then(res => {
        this.$message.success('保存成功！')
        this.visible1 = false
      })
    },
    handleMenuClick (text, record, value, state) {
      var that = this

      if (value === '1') {
        this.$confirm({
          title: '是否进行人工确认？',

          onOk () {
            that.nowState = '人工确认'
            that.changeBtn(record.vin, record, state)
          },
          onCancel () {
            that.nowState = ''
          },
          class: 'test'
        })
      } else if (value === '2') {
        this.$confirm({
          title: '是否进行邮件提示？',

          onOk () {
            that.nowState = '邮件提示'
            that.changeBtn(record.vin, record, state)
          },
          onCancel () {
            that.nowState = ''
          },
          class: 'test'
        })
      } else if (value === '3') {
        this.$confirm({
          title: '是否进行短信提示？',

          onOk () {
            that.nowState = '短信提示'
            that.changeBtn(record.vin, record, state)
          },
          onCancel () {
            that.nowState = ''
          },
          class: 'test'
        })
      } else if (value === '4') {
        this.$confirm({
          title: '是否进行人工忽略？',

          onOk () {
            that.nowState = '人工忽略'
            that.changeBtn(record.vin, record, state)
          },
          onCancel () {
            that.nowState = ''
          },
          class: 'test'
        })
      }
      if (state === '确认处理完成') {
        that.nowState = ''
        const Params = {
          vin: record.vin
        }

        this.$store.dispatch('ConfirmOperator', Params).then(res => {
          this.$message.success('操作成功！')
          // this.handleTableChange()
          const newData1 = [...this.tableData]

          const target1 = newData1.filter(item => Params.vin === item.vin)[0]
          if (target1) {
            target1.editable = false
            target1.status = '0'
            this.tableData = newData1
          }
        })
      }
    },

    changeBtn (key, record, state) {
      const newData = [...this.tableData]

      const target = newData.filter(item => key === item.vin)[0]

      if (target && state != '人工忽略') {
        target.editable = true
        target.status = '1'
        this.tableData = newData
      } else if (target && state === '人工忽略') {
        target.status = '1'
        this.tableData = newData
      }

      const Params = {
        vin: record.vin,
        handleType: state,
        userName: this.$store.state.user.info.username
      }

      this.$store.dispatch('UpdateStatus', Params).then(res => {
        // this.$message.warning('正在处理中！')
        this.$confirm({
          title: state + `正在处理中！`,
          cancelButtonProps: {
            props: { disabled: true }
          },

          onOk () {},

          class: 'test'
        })
        if (state === '人工忽略') {
          this.handleTableChange()
        }
      })
    },

    onChangeMINIMUMTEMPERATURESSTATUS (value) {
      this.MINIMUMTEMPERATURE.SSTATUS = value.toString()
    },
    onChangeMAXIMUMTEMPERATURESSTATUS (value) {
      this.MAXIMUMTEMPERATURE.SSTATUS = value.toString()
    },
    onChangeVOLTAGEMINIMUMList1 (value) {
      this.VOLTAGEMINIMUM.SSTATUS = value.toString()
    },
    onChangeVOLTAGEHIGHESTVALUESSTATUS (value) {
      this.VOLTAGEHIGHESTVALUE.SSTATUS = value.toString()
    },

    onChangeINSULATIONRESISTANCESSTATUS (value) {
      this.INSULATIONRESISTANCE.SSTATUS = value.toString()
    },

    onChangeDCDCSTATESTATUS (value) {
      this.DCDCSTATE.SSTATUS = value.toString()
    },
    onChangeSOCSSTATUS (value) {
      this.SOC.SSTATUS = value.toString()
    },
    onChangeTOTALCURRENTSSTATUS (value) {
      this.TOTALCURRENT.SSTATUS = value.toString()
    },
    onChangeTOTALVOLTAGESTATUS (value) {
      this.TOTALVOLTAGE.SSTATUS = value.toString()
    },
    onChangeSPEEDSTATUS (value) {
      this.SPEED.SSTATUS = value.toString()
    },

    onChangeENGINESTATESSTATUS (value) {
      this.ENGINESTATE.SSTATUS = value.toString()
    },
    onChangePOSITIONINGSTATUSSSTATUS (value) {
      this.POSITIONINGSTATUS1.SSTATUS = value.toString()
    },
    onChangeCONTROLLERCURRENTSTATUS (value) {
      this.CONTROLLERCURRENT.SSTATUS = value.toString()
    },
    onChangeINPUTVOLTAGESTATUS (value) {
      this.INPUTVOLTAGE.SSTATUS = value.toString()
    },
    onChangeMOTORTEMPERATURESTATUS (value) {
      this.MOTORTEMPERATURE.SSTATUS = value.toString()
    },
    onChangeCONTROLLERTEMPERATURESSTATUS (value) {
      this.CONTROLLERTEMPERATURE.SSTATUS = value.toString()
    },

    onChangeDRIVERMOTORSTATUSList (value) {
      this.DRIVERMOTORSTATUS.SSTATUS = value.toString()
    },

    initWarningData () {
      var that = this

      this.$store.dispatch('CustomSettingList1').then(res => {
        const data = res
        data.forEach(item => {
          item.STATUS === '0' ? (item.STATUS = false) : (item.STATUS = true)
          if (item.NAME === 'DRIVERMOTORSTATUS') {
            var SSTATUS = item.SSTATUS.split(',')
            this.DRIVERMOTORSTATUSList = SSTATUS
            this.DRIVERMOTORSTATUS = item

            // this.DRIVERMOTORSTATUSsStatus = SSTATUS.slice(-1)
          }
          if (item.NAME === 'CONTROLLERTEMPERATURE') {
            this.CONTROLLERTEMPERATURE = item
            // this.CONTROLLERTEMPERATURE.status = Boolean(item.STATUS)

            this.CONTROLLERTEMPERATURESSTATUS = item.SSTATUS.split(',')
          }
          if (item.NAME === 'MOTORTEMPERATURE') {
            this.MOTORTEMPERATURE = item
            this.MOTORTEMPERATURE.status = Boolean(item.STATUS)

            this.MOTORTEMPERATURESTATUS = item.SSTATUS.split(',')
          }
          if (item.NAME === 'INPUTVOLTAGE') {
            this.INPUTVOLTAGE = item
            this.INPUTVOLTAGE.status = Boolean(item.STATUS)

            this.INPUTVOLTAGESTATUS = item.SSTATUS.split(',')
          }
          if (item.NAME === 'CONTROLLERCURRENT') {
            this.CONTROLLERCURRENT = item
            this.CONTROLLERCURRENT.status = Boolean(item.STATUS)

            this.CONTROLLERCURRENTSTATUS = item.SSTATUS.split(',')
          }
          if (item.NAME === 'POSITIONINGSTATUS') {
            // console.log('POSITIONINGSTATUS' + JSON.stringify(item))
            this.POSITIONINGSTATUS1 = item
            // this.POSITIONINGSTATUS.status = Boolean(item.STATUS)

            this.POSITIONINGSTATUS1.SSTATUS = item.SSTATUS.split(',')
          }
          if (item.NAME === 'ENGINESTATE') {
            this.ENGINESTATE = item
            this.ENGINESTATE.status = Boolean(item.STATUS)

            this.ENGINESTATESSTATUS = item.SSTATUS.split(',')
          }
          if (item.NAME === 'SPEED') {
            this.SPEED = item
            this.SPEED.status = Boolean(item.STATUS)

            this.SPEEDSTATUS = item.SSTATUS.split(',')
          }
          if (item.NAME === 'TOTALVOLTAGE') {
            this.TOTALVOLTAGE = item
            this.TOTALVOLTAGE.status = Boolean(item.STATUS)

            this.TOTALVOLTAGESTATUS = item.SSTATUS.split(',')
          }
          if (item.NAME === 'TOTALCURRENT') {
            this.TOTALCURRENT = item
            this.TOTALCURRENT.status = Boolean(item.STATUS)

            this.TOTALCURRENTSSTATUS = item.SSTATUS.split(',')
          }
          if (item.NAME === 'TOTALCURRENT') {
            this.TOTALCURRENT = item
            this.TOTALCURRENT.status = Boolean(item.STATUS)

            this.TOTALCURRENTSSTATUS = item.SSTATUS.split(',')
          }
          if (item.NAME === 'SOC') {
            this.SOC = item
            this.SOC.status = Boolean(item.STATUS)

            this.SOCSSTATUS = item.SSTATUS.split(',')
          }
          if (item.NAME === 'DCDCSTATE') {
            this.DCDCSTATE = item
            this.DCDCSTATE.status = Boolean(item.STATUS)

            this.DCDCSTATESTATUS = item.SSTATUS.split(',')
          }
          if (item.NAME === 'INSULATIONRESISTANCE') {
            this.INSULATIONRESISTANCE = item
            this.INSULATIONRESISTANCE.status = Boolean(item.STATUS)

            this.INSULATIONRESISTANCESSTATUS = item.SSTATUS.split(',')
          }
          if (item.NAME === 'VOLTAGEHIGHESTVALUE') {
            this.VOLTAGEHIGHESTVALUE = item
            this.VOLTAGEHIGHESTVALUE.status = Boolean(item.STATUS)

            this.VOLTAGEHIGHESTVALUESSTATUS = item.SSTATUS.split(',')
          }
          if (item.NAME === 'VOLTAGEMINIMUM') {
            this.VOLTAGEMINIMUM = item
            this.VOLTAGEMINIMUM.status = Boolean(item.STATUS)

            this.VOLTAGEMINIMUMList = item.SSTATUS.split(',')
          }
          if (item.NAME === 'MAXIMUMTEMPERATURE') {
            this.MAXIMUMTEMPERATURE = item
            this.MAXIMUMTEMPERATURE.status = Boolean(item.STATUS)

            this.MAXIMUMTEMPERATURESSTATUS = item.SSTATUS.split(',')
          }
          if (item.NAME === 'MINIMUMTEMPERATURE') {
            this.MINIMUMTEMPERATURE = item
            this.MINIMUMTEMPERATURE.status = Boolean(item.STATUS)

            this.MINIMUMTEMPERATURESSTATUS = item.SSTATUS.split(',')
          }
        })
      })
    },
    handleTableChange (pagination, filters, sorter) {
      if (filters) {
        if (filters.hasOwnProperty('brand')) {
          this.company1 = filters.brand[0]
        }

        if (filters.hasOwnProperty('typeName')) {
          this.vechileType1 = filters.typeName[0]
        }
      }
      this.loading = true
      var that = this
      this.tableLoading = true
      const data = {
        basic: {
          company: this.company1,
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize,
          vechileType: this.vechileType1,
          areaCode: this.areaCode
        },
        params: {
          query: [],
          order: []
        }
      }
      // Object.keys(this.searchParams).forEach(item => {
      //   if (filters != undefined) {
      //     Object.keys(filters).forEach(itemn => {
      //       if (itemn === item) {
      //         if (filters[item][0] != undefined) {
      //           data.basic[item] = filters[item][0]
      //         }
      //       }
      //     })
      //   }
      // })
      // Object.keys(this.searchRadio).forEach(item => {
      //   if (filters != undefined) {
      //     Object.keys(filters).forEach(itemn => {
      //       if (itemn === item) {
      //         if (filters[item][0] != undefined) {
      //           data.basic[item] = filters[item][0]
      //         }
      //       }
      //     })
      //   }
      // })
      if (sorter) {
        data.params.order.push({
          field: sorter.field,
          value: sorter.order === 'ascend'
        })
      }
      this.$store.dispatch('ForewaringInspectionList', data).then(res => {
        if (this.tableData.length > 0) {
          for (let index = 0; index < this.tableData.length; index++) {
            if (this.tableData[index].hasOwnProperty('editable')) {
              res.list.forEach(item => {
                if (item.vin === this.tableData[index].vin) {
                  item.editable = this.tableData[index].editable
                }
              })
            }
          }
        }

        this.tableData = res.list
        this.initData()
        this.pagination.total = res.total
        this.loading = false
      })
    },
    handleTableChange1 (pagination, filters, sorter) {
      this.loading1 = true
      // console.log(filters)
      if (filters) {
        if (filters.hasOwnProperty('brand')) {
          console.log(filters.brand[0])
          this.brand = filters.brand[0]
          this.company = filters.brand[0]
        }
        if (filters.hasOwnProperty('handleType')) {
          this.handleType = filters.handleType[0]
          this.vechileType = filters.handleType[0]
        }
        if (filters.hasOwnProperty('vin')) {
          this.vin = filters.vin[0]
        }
      }
      this.filters = filters

      var that = this
      this.tableLoading = true
      const data = {
        basic: {
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize,
          company: this.company,

          vechileType: this.vechileType,
          vin: this.vin,
          areaCode: this.areaCode
        },
        params: {
          query: [],
          order: []
        }
      }
      // Object.keys(this.searchParams).forEach(item => {
      //   if (this.searchParams[item]) {
      //     data.basic[item] = this.searchParams[item]
      //   }
      // })
      // Object.keys(this.searchRadio).forEach(item => {
      //   if (filters != undefined) {
      //     Object.keys(filters).forEach(itemn => {
      //       if (itemn === item) {
      //         if (filters[item][0] != undefined) {
      //           data.basic[item] = filters[item][0]
      //         }
      //       }
      //     })
      //   }
      // })
      if (sorter) {
        data.params.order.push({
          field: sorter.field,
          value: sorter.order === 'ascend'
        })
      }

      this.$store.dispatch('HandleList', data).then(res => {
        this.tableData1 = res.list
        this.initData()
        this.pagination.total = res.total
        this.loading1 = false
      })
    },

    //
    optionChange (value) {
      var that = this
      if (value === '1') {
        this.state = 'artificial'
      } else if (value === '2') {
        this.state = 'artificial'
      }
    },
    getRowData (text, record, num) {
      var that = this
      // console.log(text)
      if (num === '0') {
        this.$confirm({
          title: '是否进行人工确认？',

          onOk () {
            console.log('OK')
          },
          onCancel () {
            that.caoZuoValue = '0'
          },
          class: 'test'
        })
      } else if (num === '1') {
        this.$confirm({
          title: '是否进行邮件提示？',

          onOk () {
            console.log('OK')
          },
          onCancel () {
            that.caoZuoValue = '0'
          },
          class: 'test'
        })
      } else if (num === '2') {
        this.$confirm({
          title: '是否进行短信提示？',

          onOk () {
            console.log('OK')
          },
          onCancel () {
            that.caoZuoValue = '0'
          },
          class: 'test'
        })
      }
    },
    // 筛选重置
    handleReset (filter, val) {
      filter()
      this.searchText[val] = ''
      // this.tableData()
    },
    // 筛选重置
    handleReset1 (filter, val) {
      filter()
      this.selectCar = ''

      // this.tableData()
    },
    // 查询表格
    searchResult (selectdKeys, confirm) {},
    onSelectCarChange (e) {
      const value = e
      Object.assign(this, {
        searchValue: value,
        autoExpandParent: true
      })
    },
    handleSearch (confirm, dataIndex) {
      confirm()
    },
    handleChange () {},
    showDialog1 () {
      this.visible2 = true
      this.handleTableChange1()
    },
    onChange (value) {},
    showDialog () {
      this.visible1 = true
    },
    handleOk () {},
    handleCancel () {
      this.visible1 = false
      this.visible2 = false
    },
    initData () {
      this.tableData.forEach((item, index) => {
        item.rn = index + 1
      })
      this.tableData1.forEach((item, index) => {
        item.rn = index + 1
      })
      // console.log(this.tableData)
    },
    // 自定义列事件
    onCheckBoxChange (value) {
      this.columns = this.finallyColumns.filter(item => {
        if (value.includes(item.dataIndex)) {
          return true
        }
        return false
      })
    },
    // 自定义列事件
    onCheckBoxChange1 (value) {
      this.columns1 = this.finallyColumns1.filter(item => {
        if (value.includes(item.dataIndex)) {
          return true
        }
        return false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fontCss {
  font-weight: 600;
  font-size: 18px;
  margin-left: 12px;
}
</style>
