<template>
  <div class="user-container">
    <Back column="安全设置"></Back>
    <ul class="group-links">
      <router-link to="/password" tag="li" class="arrow">
        修改登录密码
      </router-link>
      <router-link to="aa" tag="li" class="arrow">
        设置资金密码
      </router-link>
      <router-link to="aa" tag="li" class="arrow">
        绑定手机号
      </router-link>
      <router-link to="aa" tag="li" class="arrow">
        绑定银行卡
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "User",
};
</script>

<style lang="scss" scoped>
</style>