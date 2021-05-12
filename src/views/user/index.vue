<template>
  <div class="user-container">
    <div class="user-info">
      <img src="@/assets/images/user.jpg" alt="" />
      <div class="meta">
        <h4 class="name">{{username}}</h4>
        <span>
          文明驾驶
          <strong>0</strong>
        </span>
      </div>
    </div>
    <ul class="group-links">
      <router-link to="aa" tag="li" class="arrow">
        <i class="icon icon-user-link-1"></i>
        我的账户
      </router-link>
      <router-link to="aa" tag="li" class="arrow">
        <i class="icon icon-user-link-2"></i>
        租车订单
      </router-link>
      <router-link to="aa" tag="li" class="arrow">
        <i class="icon icon-user-link-3"></i>
        实名认证
      </router-link>
      <router-link to="/safe" tag="li" class="arrow">
        <i class="icon icon-user-link-4"></i>
        安全设置
      </router-link>
      <router-link to="aa" tag="li" class="arrow">
        <i class="icon icon-user-link-5"></i>
        帮助中心
      </router-link>
    </ul>

    <button class="logout" @click="logout">登出</button>
  </div>
</template>

<script>
export default {
  name: "User",
  data(){
    return{
      username: this.$store.state.account.username
    }
  },
  methods:{
    logout(){
      this.$store.dispatch("account/logoutAction").then(res => {
      this.$router.replace({
          name: "Login"
        })
      })
    }
  },
    mounted(){
    console.log(this.$store.state.account);
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
.logout{
  position: absolute;
  left: 50%;
  bottom: 60px;
  margin-left: -82px;
  width: 165px;
  height: 58px;
  text-align: center;
  line-height: 58px;
  color: #fff;
  font-size: 18px;
  background-color: #2d3339;
  border-radius: 58px;
  outline: none;
}
</style>