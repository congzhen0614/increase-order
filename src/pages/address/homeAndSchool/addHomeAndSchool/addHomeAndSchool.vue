<template>
  <div class="add-home-school">
    <ul class="address-list">
      <li class="input">
        <span class="lable">收件人</span>
        <input type="text" placeholder="请输入收件人姓名" />
      </li>
      <li class="input">
        <span class="lable">手机</span>
        <input type="text" placeholder="请输入收件人手机号" />
      </li>
      <li class="select">
        <span class="lable">省市区</span>
        <img src="../../../../assets/link-icon.png" />
        <p class="like-input">浙江省杭州市西湖区</p>
      </li>
      <li class="address">
        <span class="lable">地址</span>
        <p contenteditable="true" ref="textarea"></p>
      </li>
    </ul>
    <ul class="school-list">
      <li class="input">
        <span class="lable">学生姓名</span>
        <input type="text" placeholder="请输入收件人姓名" />
      </li>
      <li class="select">
        <span class="lable">地区</span>
        <img src="../../../../assets/link-icon.png" />
        <p class="like-input">浙江省杭州市西湖区</p>
      </li>
      <li class="select">
        <span class="lable">学校</span>
        <img src="../../../../assets/link-icon.png" />
        <p class="like-input">浙江二小学军中学</p>
      </li>
      <li class="select">
        <span class="lable">年级</span>
        <img src="../../../../assets/link-icon.png" />
        <p class="like-input">1年级</p>
      </li>
      <li class="class-name">
        <span class="lable">选填班级</span>
        <img v-if="!isSelectClass" class="select-icon" src="../../../../assets/check-icon.png" @click="isSelectClass = !isSelectClass" />
        <img v-if="isSelectClass" class="select-icon" src="../../../../assets/checked-icon.png" @click="isSelectClass = !isSelectClass" />
        <img class="link-icon" src="../../../../assets/link-icon.png" />
        <p class="like-input">3班</p>
      </li>
      <li class="class-name">
        <span class="lable">自填班级</span>
        <img v-if="isSelectClass" class="select-icon" src="../../../../assets/check-icon.png" @click="isSelectClass = !isSelectClass" />
        <img v-if="!isSelectClass" class="select-icon" src="../../../../assets/checked-icon.png" @click="isSelectClass = !isSelectClass" />
        <input type="text" placeholder="请输入班级名称" />
      </li>
    </ul>
    <div class="footer">
      <span class="cancel" @click="onCancel">取消</span>
      <span class="submit" @click="onSubmit">完成</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'add-home-school',
  data () {
    return {
      isSelectClass: true
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    onCancel () {
      this.$router.go(-1)
    },
    onSubmit () {}
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './addHomeAndSchool.styl'
</style>
