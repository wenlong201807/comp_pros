<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="20">
      <a-col :md="24" :lg="8" :xxl="7">
        <a-card :bordered="false">
          <div id="create-post" class="account-center-avatarHolder">
            <div class="avatar">
              <div class="ant-upload-preview" @click="$refs.modal.edit(avatar())" >
                <div class="mask">
                  <a-icon type="plus" />
                </div>
                <img :src="avatar()"/>
              </div>
            </div>
            <div class="username">{{ nickname() }}</div>
            <div class="bio">{{ bio[parseInt(Math.random()*bio.length)] }}</div>
          </div>
          <div class="account-center-detail">
            <p class="overTextP">
              <a-icon type="user" class="formIcon"/>
              <a-row>
                <a-col :span="16">
                  <a-input size="small" v-if="displayNameEdit" style="margin: -5px 0" :value="userInfo.displayName" @change="handleChange"/>
                  <span v-else>{{ userInfo.displayName }}</span>
                </a-col>
                <a-col :span="8">
                  <a style="float:right;" v-if="displayNameEdit" @click="displayNameEdit = false">取消</a>
                  <a style="float:right;" @click="edit">{{ displayNameEdit ? '保存' : '修改' }}&nbsp;&nbsp;</a>
                </a-col>
              </a-row>
            </p>
            <p class="overTextP">
              <a-icon type="link" class="formIcon"/>{{ userInfo.username }}
            </p>
            <p class="overTextP" v-if="userInfo.orgName">
              <a-icon type="cluster" class="formIcon"/>{{ userInfo.orgName }}
            </p>
          </div>
          <a-divider/>
          <div class="account-center-tags">
            <div class="tagsTitle">安全</div>
            <div class="account-center-detail">
              <p><a-icon type="safety" class="formIcon"/>密码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;******<a style="float:right;">修改密码</a></p>
              <p class="overTextP">
                <span>
                  <a-icon type="key"/>密码强度&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <a-tooltip placement="top">
                    <template slot="title"><span>建议使用数字、大小写英文字母和特殊符号组成的8-12字符！</span></template>
                    <a-rate v-model="safeLevel" :count="rateCount" disabled/>
                  </a-tooltip>
                </span>
              </p>
              <p class="overTextP">
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
              <p class="overTextP">
                <span>
                  <a-icon type="clock-circle"/>账号失效时间&nbsp;&nbsp;
                  <span style="color: #52c41a" v-if="moment().isBefore(userInfo.expiryDate)">{{ userInfo.expiryDate }}&nbsp;&nbsp;<span class="momentCalc">{{ moment(userInfo.expiryDate).fromNow(true) }}后失效</span></span>
                  <span style="color: #f5222d" v-else-if="moment().isAfter(userInfo.expiryDate)">{{ userInfo.expiryDate }}&nbsp;&nbsp;<span class="momentCalc">{{ moment(userInfo.expiryDate).fromNow(true) }}前失效</span></span>
                  <span style="color: #f5222d" v-else-if="moment().isSame(userInfo.expiryDate)">{{ userInfo.expiryDate }}&nbsp;&nbsp;<span class="momentCalc">{{ moment(userInfo.expiryDate).fromNow(true) }}前失效</span></span>
                  <span v-else>无</span>
                </span>
              </p>
              <p class="overTextP">
                <span>
                  <a-icon type="calendar"/>密码失效时间&nbsp;&nbsp;
                  <span style="color: #52c41a" v-if="moment().isBefore(userInfo.passwordExpiryDate)">{{ userInfo.passwordExpiryDate }}&nbsp;&nbsp;<span class="momentCalc">{{ moment(userInfo.passwordExpiryDate).fromNow(true) }}后失效</span></span>
                  <span style="color: #f5222d" v-else-if="moment().isAfter(userInfo.passwordExpiryDate)">{{ userInfo.passwordExpiryDate }}&nbsp;&nbsp;<span class="momentCalc">{{ moment(userInfo.passwordExpiryDate).fromNow(true) }}前失效</span></span>
                  <span style="color: #f5222d" v-else-if="moment().isSame(userInfo.passwordExpiryDate)">{{ userInfo.passwordExpiryDate }}&nbsp;&nbsp;<span class="momentCalc">{{ moment(userInfo.passwordExpiryDate).fromNow(true) }}前失效</span></span>
                  <span v-else>无</span>
                </span>
              </p>
              <p class="overTextP">
                <a-icon type="laptop"/>
                本次登陆IP&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style="color:red;">192.168.100.123&nbsp;&nbsp;
                  <a-tooltip placement="top">
                    <template slot="title">
                      <span>非常用IP登陆，建议修改密码！</span>
                    </template>
                    <a-icon type="warning" style="position: static"/>
                  </a-tooltip>
                </span>
              </p>
              <p class="overTextP">上次登录IP&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>192.168.100.73</span>
              </p>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="16" :xxl="17">
        <a-card :bordered="false" :tabList="tabListNoTitle" :activeTabKey="noTitleKey" @tabChange="key => handleTabChange(key, 'noTitleKey')">
          <base-setting v-if="noTitleKey === 'basic'"></base-setting>
          <personalise-setting v-else-if="noTitleKey === 'personalise'"></personalise-setting>
          <login-log v-else-if="noTitleKey === 'loginLog'"></login-log>
        </a-card>
      </a-col>
    </a-row>
    <avatar-modal ref="modal">
    </avatar-modal>
  </div>
</template>

<script>
import { PageView, RouteView } from '@/layouts'
import BaseSetting from '../settings/BaseSetting'
import AvatarModal from '../settings/AvatarModal'
import LoginLog from '../settings/LoginLog'
import PersonaliseSetting from '@/components/SettingDrawer/PersonaliseSetting'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  components: {
    RouteView,
    AvatarModal,
    BaseSetting,
    PageView,
    LoginLog,
    PersonaliseSetting
  },
  data () {
    return {
      driver: null,
      // 自勉
      bio: [
        '海纳百川，有容乃大。',
        '人善我，我亦善人，人不善我，我亦善之。',
        '以大度兼容，则万物兼济。',
        '他山之石，可以攻玉。',
        '业精于勤，荒于嬉。',
        '行成于思，毁于随。',
        '知之者不如好之者，好之者不如乐之者。',
        '学而不思则罔，思而不学则殆。',
        '唯书籍不朽。',
        '内外相应，言行相称。',
        '动则生，静则乐。',
        '知错能改，善莫大焉。',
        '有则改之，无则加勉。',
        '以人为镜，可以明得失。',
        '改过不吝。',
        '己所不欲，勿施于人。',
        '天行健，君子以自强不息 。',
        '知人者智，自知者明。'],
      displayNameEdit: false,
      passwordEdit: false,
      tagInputVisible: false,
      tagInputValue: '',
      safeLevel: 2,
      rateCount: 3,
      tabListNoTitle: [
        {
          key: 'personalise',
          tab: '个性化'
        },
        {
          key: 'loginLog',
          tab: '登陆日志'
        }
      ],
      noTitleKey: 'personalise',
      userInfo: this.$store.state.user.info
    }
  },
  methods: {
    moment,
    ...mapGetters(['nickname', 'avatar']),
    handleChange (e) {
      console.log(e)
    },
    edit () {
      this.displayNameEdit = false
    },
    handleTabChange (key, type) {
      this[type] = key
    }
  }
}
</script>

<style lang="less" scoped>
  .overTextP{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .page-header-wrapper-grid-content-main {
    width: 100%;
    margin-bottom: 24px;
    transition: 0.3s;

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
  }
  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0,0,0,0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>
