<template>
  <div class="user-container">
    <HeaderBack>
      <template v-slot:navHeaderRight>
        <router-link to="/login" class="color-white opacity-4">登录</router-link>
      </template>
    </HeaderBack>
    <div class="car-form-ui">
      <el-form :label-position="labelPosition" :model="formLabelAlign">
        <el-form-item label="">
          <el-input v-model="formLabelAlign.name" placeholder="原始密码"></el-input>
        </el-form-item>

        <el-form-item label="">
          <el-input v-model="formLabelAlign.name" placeholder="新密码"></el-input>
        </el-form-item>

        <el-form-item label="">
          <el-input v-model="formLabelAlign.name" placeholder="确认密码"></el-input>
        </el-form-item>

        <el-form-item label="">
          <button type="button" class="button-vcode">获取验证码</button>
          <el-input v-model="formLabelAlign.name" placeholder="验证码"></el-input>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary" class="button-block">确定</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  name: "Password",
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
