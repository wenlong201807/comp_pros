<template>
  <div>
    <a-card>
      <template slot="title">
        <span style="margin-left: 12px"><div class="titleFlag"></div>用户管理</span>
      </template>
      <template slot="extra">
        <template v-if="view === 'tableView'">
          <a-tooltip title="新增应用">
            <a-button size="small" style="margin-right:8px;" type="primary" icon="plus" @click="addUserClick"></a-button>
          </a-tooltip>
          <a-tooltip title="授权">
            <a-button v-show="selectedRowKeys.length > 0" @click="batchAuthClick" size="small" style="margin-right:8px;" icon="share-alt"></a-button>
          </a-tooltip>
          <a-popconfirm title="确认删除?" @confirm="deleteBatch" okText="是" cancelText="否">
            <a-tooltip :title="selectedRowKeys.length>1?'删除多个应用':'删除应用'">
              <a-button v-show="selectedRowKeys.length > 0" size="small" style="margin-right:8px;" type="danger" icon="delete"></a-button>
            </a-tooltip>
          </a-popconfirm>
          <a-dropdown>
            <a-menu slot="overlay" style="padding:8px 12px;">
              <a-checkbox-group @change="onCheckBoxChange" :defaultValue="['avatar','username','displayName','availableFlag','expiryDate','passwordExpiryDate','createTime','modifyTime']">
                <a-row>
                  <a-col v-for="item in finallyColumns" :key="item.dataIndex">
                    <a-checkbox
                      v-if="item.dataIndex !=='operation'"
                      :value="item.dataIndex"
                    >{{ item.title }}</a-checkbox>
                  </a-col>
                </a-row>
              </a-checkbox-group>
            </a-menu>
            <a-button size="small" style="margin-right: 8px;">
              <a-icon type="appstore"/>
            </a-button>
          </a-dropdown>
        </template>
        <a href="#" @click="view === 'cardView' ? view = 'tableView': view = 'cardView'">切换</a>
      </template>
      <template v-if="view === 'cardView'">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="24">
              <a-col :md="12" :xl="8" :sm="24">
                <a-form-item label="昵称">
                  <a-input placeholder="请输入昵称" v-model="queryParam.displayName"/>
                </a-form-item>
              </a-col>
              <a-col :md="12" :xl="8":sm="24">
                <a-form-item label="用户名">
                  <a-input placeholder="请输入用户名" v-model="queryParam.username"/>
                </a-form-item>
              </a-col>
              <a-col :md="12" :xl="8" :sm="24" v-if="advanced">
                <a-form-item label="账号状态">
                  <a-select mode="tags" placeholder="请选择账号状态" :maxTagCount="1" v-model="queryParam.availableFlag">
                    <a-select-option value="0">禁用</a-select-option>
                    <a-select-option value="1">正常</a-select-option>
                    <a-select-option value="2">未激活</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <template v-if="advanced">
                <a-col :md="12" :xl="8" :sm="24">
                  <a-form-item label="组织机构">
                    <a-cascader v-model="queryParam.orgId" :fieldNames="{ label: 'abbrName', value: 'id', children: 'children' }" placeholder="请选择组织机构" :options="options" changeOnSelect />
                  </a-form-item>
                </a-col>
                <a-col :md="12" :xl="8" :sm="24">
                  <a-form-item label="账号失效时间">
                    <a-range-picker v-model="queryParam.expiryDate" format="YYYY-MM-DD" style="width:100%"></a-range-picker>
                  </a-form-item>
                </a-col>
                <a-col :md="12" :xl="8" :sm="24">
                  <a-form-item label="密码失效时间">
                    <a-range-picker v-model="queryParam.passwordExpiryDate" format="YYYY-MM-DD" style="width: 100%"></a-range-picker>
                  </a-form-item>
                </a-col>
              </template>
              <a-col :md="!advanced && 8 || 24" :sm="24">
                <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                  <a-button type="primary" @click="listByPage">查询</a-button>
                  <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
                  <a @click="toggleAdvanced" style="margin-left: 8px">
                    {{ advanced ? '收起' : '展开' }}
                    <a-icon :type="advanced ? 'up' : 'down'"/>
                  </a>
                </span>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <a-list itemLayout="vertical" size="large" :pagination="pagination" :loading="searchLoading" :dataSource="listData" :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, xxl: 4 }">
          <a-list-item slot="renderItem" slot-scope="item">
            <template v-if="item.id === null">
              <a-button class="new-btn" @click="addUserClick()" type="dashed">
                <a-icon type="plus"/>
                新增用户
              </a-button>
            </template>
            <a-card hoverable v-else>
              <template class="ant-card-actions" slot="actions">
                <a-popconfirm title="确认重置密码?" @confirm="resetPassworkdConfirm(item)" @cancel="cancel" okText="是" cancelText="否">
                  <a-tooltip title="重置密码">
                    <a-icon @click.stop type="sync" style="padding: 0px 12px"/>
                  </a-tooltip>
                </a-popconfirm>
                <a-tooltip title="编辑用户" v-if="permission.includes('USER_UPDATE')">
                  <a-icon type="edit" @click.stop="edit(item)" style="padding: 0px 12px"/>
                </a-tooltip>
                <a-popconfirm title="确认删除?" @confirm="deleteUserConfirm(item)" @cancel="cancel" okText="是" cancelText="否" v-if="permission.includes('USER_DELETE')">
                  <a-tooltip title="删除用户">
                    <a-icon @click.stop type="delete" style="padding: 0px 12px"/>
                  </a-tooltip>
                </a-popconfirm>
              </template>
              <a-tooltip :mouseEnterDelay="0.7">
                <template slot="title" v-if="permission.includes('USER_GET')">
                  <span>点击查看详情</span>
                </template>
                <a-card-meta @click="permission.includes('USER_GET')?cardClick(item):null">
                  <a-avatar :size="48" slot="avatar" :src="item.avatar"/>
                  <template slot="title">
                    {{ item.displayName }}<span style="font-size:12px;color:rgba(0,0,0,0.65)">@{{ item.username }}</span>
                  </template>
                  <template slot="description">
                    <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;margin-bottom:0px;">
                      账号状态：
                      <a-badge v-if="item.availableFlag === 1" status="success" text="正常" :numberStyle="{ verticalAlign: 'inherit' }"/>
                      <a-badge v-else-if="item.availableFlag === 2" status="default" text="未激活" :numberStyle="{ verticalAlign: 'inherit' }"/>
                      <a-badge v-else status="error" text="禁用" :numberStyle="{ verticalAlign: 'inherit' }"/>
                    </p>
                    <p style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;margin-bottom:0px;height:30px;">
                      角色列表：
                      <span v-if="item.roles === null||item.roles.length === 0">未授权角色</span>
                      <a-tag v-if="item.roles" style="margin-bottom:8px;" :key="index" v-for="(tag, index) in item.roles" :color="tagColor[index%7]">{{ tag.name }}</a-tag>
                    </p>
                  </template>
                </a-card-meta>
              </a-tooltip>
            </a-card>
          </a-list-item>
        </a-list>
      </template>
      <template v-if="view === 'tableView'">
        <a-table rowKey="id" :dataSource="listData" :customRow="customRow" :columns="columns" :pagination="pagination" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
          <template slot="avatar" slot-scope="text">
            <a-avatar :size="24" slot="avatar" :src="text"/>
          </template>
          <template slot="availableFlag" slot-scope="text">
            <a-badge v-if="text === 1" status="success" text="正常" :numberStyle="{ verticalAlign: 'inherit' }"/>
            <a-badge v-else-if="text === 2" status="default" text="未激活" :numberStyle="{ verticalAlign: 'inherit' }"/>
            <a-badge v-else status="error" text="禁用" :numberStyle="{ verticalAlign: 'inherit' }"/>
          </template>
          <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }" class="custom-filter-dropdown">
            <div v-if="column.dataIndex==='availableFlag'" style="padding: 8px;">
              <a-checkbox-group v-model="queryParam.availableFlag" style="width: 90px;">
                <a-col :span="24" style="padding-left:0px;margin-bottom:8px;"><a-checkbox value="1"><a-badge status="success" text="正常" :numberStyle="{ verticalAlign: 'inherit' }"/></a-checkbox></a-col>
                <a-col :span="24" style="padding-left:0px;margin-bottom:8px;"><a-checkbox value="2"><a-badge status="default" text="未激活" :numberStyle="{ verticalAlign: 'inherit' }"/></a-checkbox></a-col>
                <a-col :span="24" style="padding-left:0px;margin-bottom:4px;"><a-checkbox value="0"><a-badge status="error" text="禁用" :numberStyle="{ verticalAlign: 'inherit' }"/></a-checkbox></a-col>
              </a-checkbox-group>
              <div style="text-align: center">
                <a-button type="primary" @click="() => searchResult(selectedKeys, confirm)" icon="search" size="small" style="width: 90px; ">搜索</a-button><br>
                <a-button @click="() => handleReset(clearFilters,column)" size="small" style="width: 90px;margin-top:8px;">重置</a-button>
              </div>
            </div>
            <div v-else style="padding: 8px;">
              <a-input v-if="column.dataIndex!=='loginStatus'" v-ant-ref="c => searchInput = c" :placeholder="`请输入${column.title}`" v-model="queryParam[column.dataIndex]" @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])" @pressEnter="() => searchResult(column.dataIndex, confirm)" style="width: 188px; margin-bottom: 8px; display: block;"></a-input>
              <div style="text-align: center" v-if="column.dataIndex!=='loginStatus'">
                <a-button type="primary" @click="() => searchResult(selectedKeys, confirm)" icon="search" size="small" style="width: 90px;margin-right:8px;">搜索</a-button>
                <a-button @click="() => handleReset(clearFilters,column)" size="small" style="width: 90px;">重置</a-button>
              </div>
            </div>
          </div>
          <template slot="operator" slot-scope="text,record">
            <a @click="edit(record)" style="margin-right: 8px;">编辑</a>
            <a @click="cardClick(record)">查看详情</a>
          </template>
          <a-icon slot="filterIcon" slot-scope="filtered" type="filter" :class="filtered ? 'ant-pro-active-icon' : undefined"/>
          <a-icon slot="displayNameSearchIcon" type="search" :class="queryParam.displayName ? 'ant-pro-active-icon' : undefined"/>
          <a-icon slot="usernameSearchIcon" type="search" :class="queryParam.username ? 'ant-pro-active-icon' : undefined"/>
          <template v-for="col in searchColumn" :slot="col" slot-scope="text">
            <div :key="col" v-if="queryParam[col]">
              <span>
                <template v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${queryParam[col]})|(?=${queryParam[col]})`, 'i'))">
                  <mark v-if="fragment.toLowerCase() === queryParam[col].toLowerCase()" :key="i" class="highlight">{{ fragment }}</mark>
                  <template v-else>{{ fragment }}</template>
                </template>
              </span>
            </div>
            <template v-else>{{ text }}</template>
          </template>
        </a-table>
      </template>
    </a-card>
    <a-drawer placement="right" :closable="false" @close="onClose" width="350" :visible="visible">
      <template slot="title">
        {{ userInfo.displayName }}<span style="font-size:12px;color:rgba(0,0,0,0.65)">@{{ userInfo.username }}</span>
      </template>
      <p style="text-align: center"><a-avatar icon="loading" :size="128" slot="avatar" :src="userInfo.avatar"/></p>
      <p style="text-align: center">
        <a-tag v-if="userInfo.roles" style="margin-bottom:8px;" :key="index" v-for="(tag, index) in userInfo.roles" :color="tagColor[index%7]">{{ tag.name }}</a-tag>
      </p>
      <a-divider/>
      <div class="account-center-detail">
        <p>
          <a-icon type="user" class="formIcon"/>{{ userInfo.displayName }}
        </p>
        <p>
          <a-icon type="link" class="formIcon"/>{{ userInfo.username }}
        </p>
        <p v-if="userInfo.orgName">
          <a-icon type="cluster" class="formIcon"/>{{ userInfo.orgName }}
        </p>
      </div>
      <a-divider/>
      <div class="account-center-tags">
        <div class="tagsTitle">安全</div>
        <div class="account-center-detail">
          <p><a-icon type="key" class="formIcon"/>密码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;******</p>
          <p>
            <span>
              <a-icon type="pushpin" class="formIcon"/>账号状态&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span v-if="userInfo.availableFlag === 1">
                <a-icon type="smile" twoToneColor="#52c41a" theme="twoTone" style="position: static;"/>&nbsp;&nbsp;正常
              </span>
              <span v-if="userInfo.availableFlag === 0">
                <a-icon type="frown" twoToneColor="#f5222d" theme="twoTone" style="position: static;"/>&nbsp;&nbsp;禁用
              </span>
              <span v-if="userInfo.availableFlag === 2">
                <a-icon type="meh" twoToneColor="#aaa" theme="twoTone" style="position: static;"/>&nbsp;&nbsp;未激活
              </span>
            </span>
          </p>
          <p>
            <span>
              <a-icon type="clock-circle" class="formIcon"/>账号失效时间&nbsp;&nbsp;
              <span v-if="moment().isBefore(userInfo.expiryDate)">{{ userInfo.expiryDate }}&nbsp;&nbsp;<span class="momentCalc">{{ moment(userInfo.expiryDate).fromNow(true) }}后失效</span></span>
              <span v-else-if="moment().isAfter(userInfo.expiryDate)">{{ userInfo.expiryDate }}&nbsp;&nbsp;<span class="momentCalc">{{ moment(userInfo.expiryDate).fromNow(true) }}前失效</span></span>
              <span v-else-if="moment().isSame(userInfo.expiryDate)">{{ userInfo.expiryDate }}&nbsp;&nbsp;<span class="momentCalc">{{ moment(userInfo.expiryDate).fromNow(true) }}前失效</span></span>
              <span v-else>无</span>
            </span>
          </p>
          <p>
            <span>
              <a-icon type="calendar" class="formIcon"/>密码失效时间&nbsp;&nbsp;
              <span v-if="moment().isBefore(userInfo.passwordExpiryDate)">{{ userInfo.passwordExpiryDate }}&nbsp;&nbsp;<span class="momentCalc">{{ moment(userInfo.passwordExpiryDate).fromNow(true) }}后失效</span></span>
              <span v-else-if="moment().isAfter(userInfo.passwordExpiryDate)">{{ userInfo.passwordExpiryDate }}&nbsp;&nbsp;<span class="momentCalc">{{ moment(userInfo.passwordExpiryDate).fromNow(true) }}前失效</span></span>
              <span v-else-if="moment().isSame(userInfo.passwordExpiryDate)">{{ userInfo.passwordExpiryDate }}&nbsp;&nbsp;<span class="momentCalc">{{ moment(userInfo.passwordExpiryDate).fromNow(true) }}前失效</span></span>
              <span v-else>无</span>
            </span>
          </p>
        </div>
      </div>
      <a-divider/>
      <div class="account-center-tags">
        <div class="tagsTitle">其他</div>
        <div class="account-center-detail">
          <p>
            <a-icon type="ordered-list" class="formIcon"/>排序&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {{ userInfo.serialIndex }}
          </p>
          <p v-if="userInfo.createTime">
            <a-icon type="contacts" class="formIcon"/>账号创建时间&nbsp;&nbsp;
            <span>{{ userInfo.createTime }}</span>
          </p>
          <p v-if="userInfo.modifyTime">
            <a-icon type="carry-out" class="formIcon"/>账号修改时间&nbsp;&nbsp;
            <span>{{ userInfo.modifyTime }}</span>
          </p>
        </div>
      </div>
    </a-drawer>
    <a-drawer placement="right" :closable="false" @close="onClose" width="450" :visible="editFormVisible">
      <template slot="title">
        {{ editForm.getFieldsValue().displayName }}<span style="font-size:12px;color:rgba(0,0,0,0.65)">@{{ editForm.getFieldsValue().username }}</span>
      </template>
      <p style="text-align: center">
        <a-avatar icon="loading" :size="128" slot="avatar" :src="editOtherContent.avatar"/>
        <a style="display: block;margin-top:8px;" @click="resetAvatar">重置头像</a>
      </p>
      <p style="text-align: center">
        <a-tag v-if="editOtherContent.roles" style="margin-bottom:8px;" :key="index" v-for="(tag, index) in editOtherContent.roles" :color="tagColor[index%7]">{{ tag.name }}</a-tag>
        <a-tag @click="roleListEditVisible = true" style="background: #fff; borderStyle: dashed;">
          <a-icon type="plus"/> 添加角色
        </a-tag>
      </p>
      <a-form :form="editForm">
        <a-form-item label="昵称" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
          <a-input placeholder="请输入昵称" v-decorator="['displayName', {rules: [{ required: true, message: '昵称不能为空' },{ max: 32, message: '账号长度不能超过32位' },{pattern: '^[A-Za-z0-9_\\-\u4e00-\u9fa5]+', message: '账号只能包含汉字、大小字母、数字、下划线和减号' }] }]"/>
        </a-form-item>
        <a-form-item label="账号" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
          <a-input placeholder="请输入账号" disabled v-decorator="['username', {rules: [{ required: true, message: '账号不能为空' },{ max: 32, min: 4, message: '账号长度应在4至32位之间' },{ pattern: '^[A-Za-z0-9_]+$', message: '账号只能包含大小写字母、数字和下划线' }]}]"/>
        </a-form-item>
        <a-form-item label="组织机构" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
          <a-cascader :fieldNames="{ label: 'abbrName', value: 'id', children: 'children' }" v-decorator="['orgId']" :options="options" changeOnSelect placeholder="请选择组织机构"/>
        </a-form-item>
        <a-form-item label="账号失效时间" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
          <a-date-picker format="YYYY-MM-DD" :disabledDate="disabledDate" placeholder="请选择账号失效时间" style="width:100%" v-decorator="['expiryDate']"></a-date-picker>
        </a-form-item>
        <a-form-item label="密码失效时间" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
          <a-date-picker :disabledDate="disabledDate" placeholder="请选择密码失效时间" style="width:100%" v-decorator="['passwordExpiryDate']" format="YYYY-MM-DD" ></a-date-picker>
        </a-form-item>
        <a-form-item label="是否可用" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
          <a-radio-group buttonStyle="solid" v-decorator="['availableFlag', {initialValue: '2'}]">
            <a-radio-button value="1">正常</a-radio-button>
            <a-radio-button value="0">禁用</a-radio-button>
            <a-radio-button value="2">未激活</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="排序" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
          <a-input-number :min="0" :step="0.1" v-decorator="['serialIndex']"/>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 16, offset:7 }">
          <a-button type="primary" html-type="submit" @click="updateEditForm" :loading="editLoading">保存</a-button>
        </a-form-item>
      </a-form>
      <a-drawer title="角色列表" width="320" :closable="false" @close="roleListOnClose" :visible="roleListEditVisible">
        <role-tree :roles="editOtherContent.roles" @listenToRole="listenToEditRole"></role-tree>
      </a-drawer>
    </a-drawer>
    <a-drawer placement="right" :closable="false" @close="onClose" width="450" :visible="addFormVisible">
      <template slot="title">
        新增用户
      </template>
      <p style="text-align: center"><a-avatar :size="128" slot="avatar" :src="createUser.avatar"/></p>
      <p style="text-align: center">
        <a-tag v-if="createUser.roles" style="margin-bottom:8px;" :key="index" v-for="(tag, index) in createUser.roles" :color="tagColor[index%7]">{{ tag.name }}</a-tag>
        <a-tag @click="roleListCreateVisible = true" style="background: #fff; borderStyle: dashed;">
          <a-icon type="plus"/> 添加角色
        </a-tag>
      </p>
      <a-form :form="addForm">
        <a-form-item label="昵称" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-input placeholder="请输入昵称" v-decorator="['displayName', {rules: [{ required: true, message: '昵称不能为空' },{ max: 32, message: '账号长度不能超过32位' },{pattern: '^[A-Za-z0-9_\\-\u4e00-\u9fa5]+', message: '账号只能包含汉字、大小字母、数字、下划线和减号' }] }]"/>
        </a-form-item>
        <a-form-item label="账号" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-input placeholder="请输入账号" v-decorator="['username', {rules: [{ required: true, message: '账号不能为空' },{ max: 32, min: 4, message: '账号长度应在4至32位之间' },{ pattern: '^[A-Za-z0-9_]+$', message: '账号只能包含大小写字母、数字和下划线' }]}]"/>
        </a-form-item>
        <a-form-item label="密码" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-input-password placeholder="请输入密码" v-decorator="['password', {rules: [{ required: true, message: '密码不能为空' },{ max: 16, min: 1, message: '密码长度应在4至16位之间' }, {pattern: '^.*(?=.*\\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,}).*$', message: '密码必须包含大小写字母和数字'}] }]"/>
        </a-form-item>
        <a-form-item label="组织机构" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-cascader :fieldNames="{ label: 'abbrName', value: 'id', children: 'children' }" v-decorator="['orgId']" :options="options" changeOnSelect placeholder="请选择组织机构"/>
        </a-form-item>
        <a-form-item label="账号失效时间" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-date-picker format="YYYY-MM-DD" :disabledDate="disabledDate" placeholder="请选择账号失效时间" style="width:100%" v-decorator="['expiryDate']"></a-date-picker>
        </a-form-item>
        <a-form-item label="密码失效时间" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-date-picker :disabledDate="disabledDate" placeholder="请选择密码失效时间" style="width:100%" v-decorator="['passwordExpiryDate']" format="YYYY-MM-DD" ></a-date-picker>
        </a-form-item>
        <a-form-item label="是否可用" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-radio-group buttonStyle="solid" v-decorator="['availableFlag', {initialValue: '2'}]">
            <a-radio-button value="1">正常</a-radio-button>
            <a-radio-button value="0">禁用</a-radio-button>
            <a-radio-button value="2">未激活</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="排序" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-input-number :min="0" :step="0.1" v-decorator="['serialIndex']"/>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 16, offset:6 }">
          <a-button type="primary" html-type="submit" @click="save()" :loading="addLoading">保存</a-button>
        </a-form-item>
      </a-form>
      <a-drawer
        title="角色列表"
        width="320"
        :closable="false"
        @close="roleListOnClose"
        :visible="roleListCreateVisible"
      >
        <role-tree :roles="createUser.roles" @listenToRole="listenToRole"></role-tree>
      </a-drawer>
    </a-drawer>
    <a-drawer placement="right" :closable="false" @close="onClose" width="350" :visible="batchAuthVisible">
      <a-input-search style="margin-bottom: 8px" placeholder="搜索角色" @change="onChange" />
      <a-alert message="该操作将会覆盖用户原有角色" type="warning" closable/>
      <a-tree :selectable="false" v-model="checkedKeys" showLine defaultExpandAll checkable @expand="onExpand" :expandedKeys="expandedKeys" :autoExpandParent="autoExpandParent" :treeData="roleTreeData">
        <template slot="title" slot-scope="{title}">
          <span v-if="title.indexOf(searchValue) > -1">
            {{ title.substr(0, title.indexOf(searchValue)) }}
            <span class="font-color">{{ searchValue }}</span>
            {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
          </span>
          <span v-else>{{ title }}</span>
        </template>
      </a-tree>
      <a-col style="text-align: center;margin-top:24px;">
        <a-button type="primary" html-type="submit" @click="batchAuth" :loading="authLoading">保存</a-button>
      </a-col>
    </a-drawer>
  </div>
</template>
<script>
import { mixinDevice } from '@/utils/mixin'
import RoleTree from './modules/RoleTree'
import moment from 'moment'

export default {
  mixins: [mixinDevice],
  components: { RoleTree },
  data () {
    return {
      // 查询按钮loading
      searchLoading: false,
      // 本页面的授权按钮
      authLoading: false,
      // 确定按钮loading
      addLoading: false,
      // 编辑按钮loading
      editLoading: false,
      // 权限
      permission: this.$route.meta.permission,
      // 编辑表单
      editForm: this.$form.createForm(this),
      // 新增表单
      addForm: this.$form.createForm(this),
      // 高级搜索 展开/关闭
      advanced: false,
      // tag颜色
      tagColor: ['green', 'pink', 'red', 'cyan', 'blue', 'orange', 'purple'],
      // 表格视图/卡片视图
      view: 'tableView', // cardView -- 卡片视图 tableView --- 列表视图
      // 查询条件
      queryParam: {
        availableFlag: [],
        orgId: null,
        passwordExpiryDate: null,
        expiryDate: null,
        displayName: null,
        username: null
      },
      // 组织机构
      options: [],
      // 详情抽屉
      visible: false,
      // 添加抽屉
      addFormVisible: false,
      // 编辑抽屉
      editFormVisible: false,
      batchAuthVisible: false,
      // 角色列表抽屉
      roleListCreateVisible: false,
      roleListEditVisible: false,
      // 编辑表单需要的其他内容
      editOtherContent: {
        avatar: null,
        roles: [],
        id: null
      },
      // 卡片/表格内容
      listData: [],
      // 分页组件
      pagination: {
        onChange: (page) => {
          this.pagination.current = page
        },
        pageSize: 16,
        total: 0,
        showTotal: total => `共 ${this.pagination.total} 条`,
        current: 1
      },
      // 当前点击的用户
      userInfo: {},
      // 新增用户
      createUser: {
        avatar: null,
        roles: []
      },
      selectedRowKeys: [],
      searchColumn: ['username', 'displayName'],
      expandedKeys: [],
      searchValue: '',
      checkedKeys: [],
      autoExpandParent: true,
      roleTreeData: [],
      roleList: [],
      columns: [
        {
          title: '头像',
          dataIndex: 'avatar',
          key: 'avatar',
          scopedSlots: {
            customRender: 'avatar'
          }
        },
        {
          title: '账号',
          dataIndex: 'username',
          key: 'username',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'usernameSearchIcon',
            customRender: 'username'
          }
        },
        {
          title: '昵称',
          dataIndex: 'displayName',
          key: 'displayName',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'displayNameSearchIcon',
            customRender: 'displayName'
          }
        },
        {
          title: '账号状态',
          dataIndex: 'availableFlag',
          key: 'availableFlag',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'availableFlag'
          }
        },
        {
          title: '账号失效时间',
          dataIndex: 'expiryDate',
          key: 'expiryDate'
        },
        {
          title: '密码失效时间',
          dataIndex: 'passwordExpiryDate',
          key: 'passwordExpiryDate'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime'
        },
        {
          title: '修改时间',
          dataIndex: 'modifyTime',
          key: 'modifyTime'
        },
        {
          title: '操作',
          dataIndex: 'operator',
          width: 50,
          key: 'operator',
          scopedSlots: {
            customRender: 'operator'
          }
        }
      ],
      finallyColumns: []
    }
  },
  watch: {
    view: {
      handler (val) {
        if (this.listData.length > 0 && this.listData[0].id === null) {
          this.listData.shift()
        } else {
          if (this.permission.includes('USER_ADD')) {
            this.listData = [{ id: null }, ...this.listData]
            this.searchLoading = false
          }
        }
      }
    }
  },
  mounted () {
    if (!this.permission.includes('USER_LIST')) {
      this.$router.push({ path: '/exception/403' })
    }
    this.finallyColumns = [...this.columns]
    // 有新增权限分页设置为15，没有设置为16
    this.pagination.pageSize = this.permission.includes('USER_ADD') ? 15 : 16
    // 分页查询
    this.listByPage()
    // 组织机构树查询
    this.getOrgTree()
    this.$store.dispatch('GetRoleTree').then(response => {
      this.roleTreeData = response
      this.roleTreeData.forEach(fItem => {
        fItem.scopedSlots = { title: 'title' }
        if (fItem.children) {
          fItem.children.forEach(sItem => {
            sItem.scopedSlots = { title: 'title' }
            if (sItem.children) {
              sItem.children.forEach(tItem => {
                tItem.scopedSlots = { title: 'title' }
              })
            }
          })
        }
      })
      this.generateList(this.roleTreeData)
    })
  },
  methods: {
    moment,
    batchAuth () {
      this.authLoading = true

      this.$store.dispatch('UserRole', { userIds: this.selectedRowKeys, roleIds: this.onCheck(this.checkedKeys) }).then((res) => {
        this.$message.success('授权成功')
        this.onClose()
        this.authLoading = false
      }).catch((error) => {
        this.$message.error(error.response.data.message || '新增失败')
      })
    },
    batchAuthClick () {
      this.batchAuthVisible = true
    },
    // 自定义列事件
    onCheckBoxChange (value) {
      this.columns = this.finallyColumns.filter(item => {
        if (value.includes(item.key)) {
          return true
        }
        return false
      })
    },
    getParentKey (key, tree) {
      let parentKey
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        if (node.children) {
          if (node.children.some(item => item.key === key)) {
            parentKey = node.key
          } else if (this.getParentKey(key, node.children)) {
            parentKey = this.getParentKey(key, node.children)
          }
        }
      }
      return parentKey
    },
    generateList (data) {
      for (let i = 0; i < data.length; i++) {
        const node = data[i]
        const key = node.key
        if (node.children) {
          this.roleList.push({ key, title: node.title, isLeaf: false })
        } else {
          this.roleList.push({ key, title: node.title, isLeaf: true })
        }
        if (node.children) {
          this.generateList(node.children, node.key)
        }
      }
    },
    onCheck (checkedKeys) {
      this.$emit('listenToRole', [])
      const selectRoles = []
      this.roleList.forEach(item => {
        if (checkedKeys.includes(item.key) && item.isLeaf) {
          selectRoles.push(item.key)
        }
      })
      return selectRoles
    },
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onChange (e) {
      const value = e.target.value
      const expandedKeys = this.roleList
        .map(item => {
          if (item.title.indexOf(value) > -1) {
            return this.getParentKey(item.key, this.roleTreeData)
          }
          return null
        })
        .filter((item, i, self) => item && self.indexOf(item) === i)
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      })
    },
    handleReset (filter, val) {
      filter()
      this.queryParam[val.key] = ''
      this.listByPage()
    },
    // 查询表格
    searchResult (selectdKeys, confirm) {
      confirm()
      this.listByPage()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
    },
    // 行属性
    customRow (record, index) {
      return {
        on: {
          // 行单击事件
          click: (event) => {
            // 排除点击功能键不选中行
            if (event.target.nodeName === 'DIV' || event.target.nodeName === 'TD' || event.target.nodeName === 'IMG') {
              if (this.selectedRowKeys.includes(record.id)) {
                this.selectedRowKeys = this.selectedRowKeys.filter(item => {
                  return item !== record.id
                })
              } else {
                this.selectedRowKeys.push(record.id)
              }
            }
          }
        }
      }
    },
    // 监听新增的角色
    listenToRole (data) {
      this.createUser.roles = data
    },
    // 监听编辑的角色
    listenToEditRole (data) {
      this.editOtherContent.roles = data
    },
    // 新增用户打开
    addUserClick () {
      this.addFormVisible = true
      const rm = parseInt(Math.random() * 6)
      this.createUser.avatar = rm === 0 ? '../avatar/default_avatar.png' : '../avatar/preset_avatar' + rm + '.png'
    },
    // 编辑框重置头像
    resetAvatar () {
      const rm = parseInt(Math.random() * 6)
      this.editOtherContent.avatar = rm === 0 ? '../avatar/default_avatar.png' : '../avatar/preset_avatar' + rm + '.png'
    },
    // 新增保存
    save () {
      this.addForm.validateFields((err, values) => {
        if (!err) {
          this.addLoading = true
          const param = this.addForm.getFieldsValue()
          param.expiryDate = param.expiryDate == null ? null : param.expiryDate.format('YYYY-MM-DD')
          param.passwordExpiryDate = param.passwordExpiryDate == null ? null : param.passwordExpiryDate.format('YYYY-MM-DD')
          param.orgId = param.orgId ? param.orgId[param.orgId.length - 1] : null
          param.autoHideHeader = '0'
          param.avatar = this.createUser.avatar
          param.colorWeak = '0'
          param.contentWidth = 'Fixed'
          param.fixedHeader = '0'
          param.fixedSiderBar = '0'
          param.layout = 'sidemenu'
          param.navTheme = 'dark'
          param.primaryColor = '#1890FF'
          param.roleIds = []
          this.createUser.roles.forEach(item => {
            param.roleIds.push(item.id)
          })
          // 新增用户
          this.$store.dispatch('SaveUser', param).then((res) => {
            this.$message.success('新增成功')
            this.addLoading = false
            this.listByPage()
            this.onClose()
          }).catch((error) => {
            this.$message.error(error.response.data.message || '新增失败')
            this.addLoading = false
          })
        }
      })
    },
    // 获取组织机构树
    getOrgTree () {
      this.$store.dispatch('GetOrgTree').then((res) => {
        this.options = res
      })
    },
    // 更新
    updateEditForm () {
      this.editForm.validateFields((err, values) => {
        if (!err) {
          this.addLoading = true
          const param = this.editForm.getFieldsValue()
          param.expiryDate = param.expiryDate == null ? null : param.expiryDate.format('YYYY-MM-DD')
          param.passwordExpiryDate = param.passwordExpiryDate == null ? null : param.passwordExpiryDate.format('YYYY-MM-DD')
          param.id = this.editOtherContent.id
          param.avatar = this.editOtherContent.avatar
          param.orgId = param.orgId ? param.orgId[param.orgId.length - 1] : null
          param.roleIds = []
          this.editOtherContent.roles.forEach(item => {
            param.roleIds.push(item.id)
          })
          this.$store.dispatch('UpdateUser', param).then((res) => {
            this.$message.success('保存成功')
            this.addLoading = false
            this.listByPage()
            this.onClose()
          }).catch((error) => {
            this.$message.error(error.response.data.message || '保存失败')
            this.addLoading = false
          })
        }
      })
    },
    // 编辑打开
    edit (obj) {
      this.editFormVisible = true
      this.editRoles = obj.roles
      this.editOtherContent.avatar = obj.avatar
      this.editOtherContent.roles = obj.roles
      // 递归查询ORG树
      const orgArray = []
      if (obj.orgId) {
        const treeArray = this.familyTree(this.options, obj.orgId)
        treeArray.reverse().forEach(item => {
          orgArray.push(item.id)
        })
      }
      this.$nextTick(() => {
        this.editForm.setFieldsValue({
          displayName: obj.displayName,
          username: obj.username,
          passwordExpiryDate: obj.passwordExpiryDate == null ? null : moment(obj.passwordExpiryDate),
          expiryDate: obj.expiryDate == null ? null : moment(obj.expiryDate),
          orgId: orgArray.length > 0 ? orgArray : null,
          serialIndex: obj.serialIndex,
          availableFlag: obj.availableFlag + ''
        })
        this.editOtherContent.id = obj.id
      })
    },
    // 递归查询组织机构树某个节点的所有父节点
    familyTree (orgData, id) {
      var temp = []
      var forFn = function (arr, id) {
        for (var i = 0; i < arr.length; i++) {
          var item = arr[i]
          if (item.id === id) {
            temp.push(item)
            forFn(orgData, item.parentId)
            break
          } else {
            if (item.children) {
              forFn(item.children, id)
            }
          }
        }
      }
      forFn(orgData, id)
      return temp
    },
    // 分页查询
    listByPage () {
      this.searchLoading = true
      const data = {
        basic: {
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize
        },
        params: {
          query: []
        }
      }
      Object.keys(this.queryParam).forEach(item => {
        if (this.queryParam[item]) {
          switch (item) {
            case 'username':
            case 'displayName':
              if (this.queryParam[item] !== '' && this.queryParam[item] !== null) {
                data.params.query.push({ field: item, value: `%${this.queryParam[item]}%` })
              }
              break
            case 'orgId':
              if (this.queryParam[item] !== '' && this.queryParam[item] !== null && this.queryParam[item].length !== 0) {
                data.params.query.push({ field: item, value: `${this.queryParam[item][this.queryParam[item].length - 1]}` })
              }
              break
            case 'passwordExpiryDate':
            case 'expiryDate':
              if (this.queryParam[item].length !== 0) {
                data.params.query.push({ field: item, value: `${this.queryParam[item][0].format('YYYY-MM-DD')}_x_${this.queryParam[item][1].format('YYYY-MM-DD')}]` })
              }
              break
            case 'availableFlag':
              if (this.queryParam[item].length > 0) {
                let statusStr = ''
                this.queryParam[item].forEach(item => {
                  statusStr = statusStr + item + ','
                })
                data.params.query.push({ field: item, value: statusStr })
              }
              break
          }
        }
      })
      this.$store.dispatch('ListByPageForUser', data).then(res => {
        this.listData = res.list
        this.pagination.total = res.total
        if (this.view === 'cardView') {
          if (this.permission.includes('USER_ADD')) {
            this.listData = [{ id: null }, ...this.listData]
            this.searchLoading = false
          }
        }
      })
    },
    // 搜索条件展开/关闭
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    // 删除用户
    deleteUserConfirm: function (obj) {
      this.$store.dispatch('DeleteUser', { ids: obj.id }).then((response) => {
        this.$message.success('删除成功')
        this.listByPage()
      }).catch((error) => {
        this.$message.error(error.response.data.message || '删除失败')
      })
    },
    // 删除用户
    deleteBatch: function () {
      this.$store.dispatch('DeleteUser', { ids: this.selectedRowKeys }).then((response) => {
        this.$message.success('删除成功')
        this.listByPage()
      }).catch((error) => {
        this.$message.error(error.response.data.message || '删除失败')
      })
    },
    // 取消
    cancel: function () {
    },
    // 重置密码
    resetPassworkdConfirm: function (item) {
      console.log(item)
    },
    // 关闭抽屉
    onClose: function () {
      this.visible = false
      this.editFormVisible = false
      this.addFormVisible = false
      this.batchAuthVisible = false
      setTimeout(() => {
        this.editOtherContent.avatar = null
        this.editOtherContent.roles = []
        this.editOtherContent.id = null
        this.userInfo = {}
        this.editForm.resetFields()
        this.addForm.resetFields()
      }, 500)
    },
    // 角色列表关闭
    roleListOnClose: function () {
      this.roleListCreateVisible = false
      this.roleListEditVisible = false
    },
    // 卡片点击
    cardClick (obj) {
      this.userInfo = obj
      let orgNameArray = ''
      if (obj.orgId) {
        const treeArray = this.familyTree(this.options, obj.orgId)
        treeArray.reverse().forEach(item => {
          orgNameArray = orgNameArray + item.abbrName + ' / '
        })
      }
      this.userInfo.orgName = orgNameArray.substr(0, orgNameArray.length - 2)
      this.visible = true
    },
    // 失效日期选择区间限值
    disabledDate (current) {
      return current < moment().endOf('day').add(-1, 'days')
    }
  }
}
</script>

<style scoped lang="less">
  .momentCalc {
    font-size: 12px;
    color: rgba(0,0,0,0.45);
  }
  .new-btn {
    background-color: #fff;
    border-radius: 2px;
    width: 100%;
    height: 173px;
  }
  .ant-form-item-label{
    line-height: 39px!important;
  }
  .account-center-avatarHolder {
    text-align: center;
    margin-bottom: 24px;

    & > .avatar {
      margin: 0 auto;
      width: 104px;
      height: 104px;
      margin-bottom: 20px;
      border-radius: 50%;
      overflow: hidden;

      img {
        height: 100%;
        width: 100%;
      }
    }

    .username {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 4px;
    }
  }

  .account-center-detail {
    p {
      margin-bottom: 8px;
      padding-left: 26px;
      position: relative;
      line-height: 30px;
    }

    i {
      position: absolute;
      height: 14px;
      width: 14px;
      left: 0;
      top: 4px;
      line-height: 26px;
    }

    .title {
      background-position: 0 0;
    }

    .group {
      background-position: 0 -22px;
    }

    .address {
      background-position: 0 -44px;
    }
  }

  .account-center-tags {
    .ant-tag {
      margin-bottom: 8px;
    }
  }

  .account-center-team {
    .members {
      a {
        display: block;
        margin: 12px 0;
        line-height: 24px;
        height: 24px;

        .member {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 24px;
          max-width: 100px;
          vertical-align: top;
          margin-left: 12px;
          transition: all 0.3s;
          display: inline-block;
        }

        &:hover {
          span {
            color: #1890ff;
          }
        }
      }
    }
  }

  .tagsTitle,
  .teamTitle {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 12px;
  }
  .formIcon{
    margin-right:8px;
  }
</style>
