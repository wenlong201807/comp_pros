<template>
  <div>
    <a-card style="margin-bottom:24px;">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>运营商信息
        </span>
      </template>
      <template slot="extra">
        <a-tooltip v-if="flag == false" title="提交">
          <a-button style="margin-right:8px;" size="small" type="primary" icon="check" @click="submitAll"></a-button>
        </a-tooltip>
        <a-tooltip title="编辑">
          <a-button style="margin-right:8px;" size="small" type="primary" icon="edit" @click="openEdit"></a-button>
        </a-tooltip>
      </template>
      <a-form :form="opeForm">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="地区">
              <a-input placeholder="请输入地区" :disabled="flag" v-decorator="['accessName',{rules: [{ required: true, message: '请输入地区', whitespace: true}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="组织机构号">
              <a-input placeholder="请输入组织机构号" :disabled="flag" v-decorator="['accessKeyId',{rules: [{ required: true, message: '请输入组织机构号', whitespace: true}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="运营商编号">
              <a-input placeholder="请输入运营商编号" :disabled="flag" v-decorator="['accessedKeyId',{rules: [{ required: true, message: '请输入运营商编号', whitespace: true}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="运营商名称">
              <a-input placeholder="请输入运营商名称" :disabled="flag" v-decorator="['accessedName',{rules: [{ required: true, message: '请输入运营商名称', whitespace: true}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="token密钥4">
              <a-input placeholder="请输入token密钥4" :disabled="flag" v-decorator="['tokenSecret',{rules: [{ required: true, message: '请输入token密钥4', whitespace: true}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="加密私钥6">
              <a-input placeholder="请输入加密私钥6" :disabled="flag" v-decorator="['privateKey',{rules: [{ required: true, message: '请输入加密私钥6', whitespace: true}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="加密初始向量8">
              <a-input placeholder="请输入加密初始向量8" :disabled="flag" v-decorator="['encryptIv',{rules: [{ required: true, message: '请输入加密初始向量8', whitespace: true}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="签名密钥10">
              <a-input placeholder="请输入签名密钥10" :disabled="flag" v-decorator="['signSecret',{rules: [{ required: true, message: '请输入签名密钥10', whitespace: true}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="是否可用">
              <a-select :disabled="flag" placeholder="请选择是否可用" v-decorator="[ 'en', {rules: [{ required: true, message: '请选择是否可用'}]} ]">
                  <a-select-option v-for="item in enList " :value="item.value" :key="item.value">{{ item.name }}</a-select-option>
                </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-card style="margin-bottom:24px;">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>接口信息
        </span>
      </template>
      <a-table :columns="columns" :dataSource="tableData" :pagination="false" :loading="tableLoading">
        <template v-for="col in ['interfaceInfo', 'interfaceUrl', 'state']" :slot="col" slot-scope="text, record">
          <div :key="col">
            <a-input
              v-if="record.editable && col==='interfaceUrl'"
              style="margin: -5px 0"
              :value="text"
              @change="e => handleChange(e.target.value, record.key, col)"
            />
            <a-select 
              v-else-if="record.editable && col==='interfaceInfo'"
              style="width:100%;"
              :defaultValue="text"
              @change="value => handleChange(value, record.key, col)">
              <a-select-option v-for="item in nameList" :key="item.name" :value="item.name">{{item.name}}</a-select-option>
            </a-select>
            <a-select 
              v-else-if="record.editable && col==='state'"
              style="width:100%;"
              :defaultValue="text"
              @change="value => handleChange(value, record.key, col)">
              <a-select-option v-for="item in enList" :key="item.value" :value="item.value">{{item.name}}</a-select-option>
            </a-select>
            <template v-else>{{ text }}</template>
          </div>
        </template>
        <template slot="operation" slot-scope="text, record">
          <template v-if="record.editable">
            <span v-if="record.isNew">
              <a @click="saveRow(record)">添加</a>
              <a-divider type="vertical" />
              <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
                <a>删除</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="saveRow(record)">保存</a>
              <a-divider type="vertical" />
              <a-popconfirm title="是否撤销未保存内容?" @confirm="() => cancel(record.key)">
                <a>取消</a>
              </a-popconfirm>
            </span>
          </template>
          <span v-else>
            <a @click="toggle(record.key)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
              <a>删除</a>
            </a-popconfirm>
          </span>
        </template>
      </a-table>
      <a-button v-if="flag == false" style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newMember">添加接口信息</a-button>
    </a-card>
    <a-card style="margin-bottom:24px;">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>关联关系
        </span>
      </template>
      <a-checkbox-group @change="onChangeChecked" :defaultValue="defaultCheckedData">
        <a-row :gutter="24">
          <a-col :span="6" v-for="item in merchantList" :key="item.merchantName">
            <a-checkbox :disabled="flag" :value="item.id">{{item.merchantName}}</a-checkbox>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </a-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nameList: [
        {
          name: '查询token',
          value: 1
        },{
          name: '查询站信息',
          value: 2
        },{
          name: '查询统计信息',
          value: 3
        },{
          name: '查询状态信息',
          value: 4
        },{
          name: '一代订单查询',
          value: 5
        },{
          name: '枪状态变化推送',
          value: 6
        },{
          name: '业务策略查询',
          value: 7
        }
      ],
      enList: [
        {
          name: '是',
          value: 1
        },{
          name: '否',
          value: 2
        }
      ],
      opeForm: this.$form.createForm(this),
      tableData: [],
      tableLoading: false,
      columns: [
        {
          title: '接口名称',
          key: 'interfaceInfo',
          dataIndex: 'interfaceInfo',
          scopedSlots: { customRender: 'interfaceInfo' }
        },
        {
          title: '接口地址',
          dataIndex: 'interfaceUrl',
          key: 'interfaceUrl',
          scopedSlots: { customRender: 'interfaceUrl' }
        },
        {
          title: '接口状态是否可用',
          dataIndex: 'state',
          key: 'state',
          scopedSlots: { customRender: 'state' }
        }
      ],
      // 表格源
      cacheData:[],
      // 关联设备列表
      merchantList: [],
      // 复选框默认选中数组
      defaultCheckedData: [],
      // 提交复选框数组
      checkedData: [],
      flag:true
    }
  },
  watch:{
    flag:{
      handler(val){
        if(val == false){
          this.columns.push({
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'operation' }
          })
        }else{
          this.columns.pop()
        }
      }
    }
  },
  created () {
    var that = this
    // 初始化表单数据
    this.initForm()
    // 初始化设备关联关系
    this.initGroups()
  },
  mounted () {
    
  },
  methods: {
    initForm(){
      var that = this;
      const param = this.opeForm.getFieldsValue()
      this.$store.dispatch("OpeDetailsSearch").then(res => {
        that.enList.forEach(item => {
          if(res.en == item.value){
            res.en = item.name
          }
        })
        that.tableData = res.interfaces
        that.tableData.forEach((item,index) => {
          item.key = index+1
          item.editable = false
        })
        that.tableData.forEach(item => {
          that.enList.forEach(itemn => {
            if(item.state == itemn.value){
              item.state = itemn.name
            }
          })
        })
        this.cacheData = this.tableData.map(item => ({ ...item }))
        this.opeForm.setFieldsValue(res)
      }).catch(error => {
        console.log(error)
      });
    },
    handleChange(value, key, column) {
      const newData = [...this.tableData];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.tableData = newData;
      }
    },
    newMember () {
      const length = this.tableData.length
      this.tableData.push({
        key: length === 0 ? '1' : (parseInt(this.tableData[length - 1].key) + 1).toString(),
        interfaceInfo: '',
        interfaceUrl: '',
        state: '',
        editable: true,
        isNew: true
      })
    },
    remove (key) {
      const newData = this.tableData.filter(item => item.key !== key)
      this.tableData = newData
    },
    saveRow (record) {
      var that = this
      this.tableLoading = true
      const { key, interfaceInfo, interfaceUrl, state } = record
      if (!interfaceInfo || !interfaceUrl || !state) {
        this.tableLoading = false
        this.$message.error('请填写完整信息。')
        return
      }
      // 模拟网络请求、卡顿 800ms
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ loop: false })
        }, 800)
      }).then(() => {
        const target = this.tableData.filter(item => key === item.key)[0];
        target.editable = false
        target.isNew = false
        this.tableLoading = false
        that.tableData.forEach(item => {
          that.enList.forEach(itemn => {
            if(item.state == itemn.value){
              item.state = itemn.name
            }
          })
        })
      })
      
    },
    toggle (key) {
      const newData = [...this.tableData];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target.editable = !target.editable
        this.tableData = newData;
      }
    },
    getRowByKey (key, newData) {
      const data = this.tableData
      return (newData || data).find(item => item.key === key)
    },
    cancel (key) {
      const newData = [...this.tableData];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
        delete target.editable;
        this.tableData = newData;
      }
    },
    openEdit(){
      var that = this
      if(this.flag == true){
        this.flag = false
      }else{
        this.$confirm({
          title: '是否取消编辑？',
          content: '取消将不会保存您刚才所编辑的内容。',
          onOk() {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({ loop: false })
              }, 800)
            }).then(()=>{
              that.initForm()
              that.initGroups()
              that.$message.warning('已取消！')
              that.flag = true
            }).catch((err) => console.log(err));
          },
          onCancel() {
            return
          },
        });
      }
    },
    submitAll(){
      var that = this
      const params = this.opeForm.getFieldsValue()
      that.enList.forEach(item => {
        if(item.name == params.en){
          params.en = item.value
        }
      })
      const subData = [...this.tableData]
      that.enList.forEach(item => {
        subData.forEach(itemn => {
          if(item.name == itemn.state){
            itemn.state = item.value
          }
        })
      })
      params.interfaces = subData
      this.$store.dispatch('OpeDetailsAdd', params).then(res => {
        that.$message.success('提交成功！')
        that.initForm()
        this.flag = !this.flag
      }).catch((err) => {
        this.$message.error('提交失败！')
      })
      const checkParams = {
        operatorId: this.$ls.get('merchantNo'),
        equipmentownerIds: this.checkedData
      }
      this.$store.dispatch('OpeEquipmentAdd', checkParams).then(res => {
      }).catch(err => {
        console.log(err)
      })
    },
    initGroups(){
      var that = this
      this.checkedData = []
      this.defaultCheckedData = []
      this.merchantList = []
      const params = {
        operatorId: this.$ls.get('merchantNo')
      }
      this.$store.dispatch("OpeEquipmentQuery",params).then(res => {
        that.merchantList = res
        that.merchantList.forEach(item => {
          if(item.STATUS == 1){
            that.defaultCheckedData.push(item.id)
          }
        })
      }).catch(error => {
        console.log(error)
      });
    },
    onChangeChecked(checkedValues){
      this.checkedData = checkedValues
    }
  }
}
</script>

<style lang="less" scoped>
</style>
