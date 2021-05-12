<template>
  <div class="user-container">
    <HeaderBack>
      <template v-slot:navHeaderRight>
        <router-link to="/register" class="color-white opacity-4"
          >注册</router-link
        >
      </template>
    </HeaderBack>
    <div class="car-form-ui">
      <el-form ref="form" :model="form">
        <UsernameVue :value.sync="form.username"></UsernameVue>

        <PasswordVue
          :passwordConfirm="form.password_confirm"
          :value.sync="form.password"
        ></PasswordVue>

        <el-form-item prop="">
          <el-button
            type="primary"
            class="button-block"
            @click="onSubmit()"
            style="width: 100%"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div inline>
      <router-link to="/forget" class="color-white opacity-4 pull-right"
        >忘记密码</router-link
      >
    </div>
  </div>
</template>

<script>
import UsernameVue from "@c/account/username";
import PasswordVue from "@c/account/password";
import PasswordConfirmVue from "@c/account/passwordConfirm";
import CodeVue from "@c/code";
import HeaderBack from "@c/back/back";
import sha1 from "js-sha1";
//cookies
export default {
  name: "Login",
  components: {
    UsernameVue,
    CodeVue,
    HeaderBack,
    PasswordVue,
    PasswordConfirmVue,
  },
  data() {
    return {
      form: {
        username: "",
        code: "",
        password: "",
        password_confirm: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    login() {
      const requestData = {
        username: this.form.username,
        password: sha1(this.form.password),
      };

      this.$store.dispatch("account/loginAction",requestData).then(res => {
        this.$message({
          message:res.message,
          type:"success"
        })
         this.$router.replace({
          name:"Index"
        })
      }).catch(err => {})
    },
  },
};
</script>

<style lang="scss" scoped></style>
