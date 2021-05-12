<template>
  <div class="user-container">
    <HeaderBack>
      <template v-slot:navHeaderRight>
        <router-link to="/login" class="color-white opacity-4">登录</router-link>
      </template>
    </HeaderBack>
    <div class="car-form-ui">
      <el-form ref="form" :model="form" >
          <UsernameVue :value.sync="form.username"></UsernameVue>

          <PasswordVue :passwordConfirm="form.password_confirm" :value.sync="form.password"  :placeholder="'新密码'"></PasswordVue>
          <PasswordConfirmVue :password="form.password" :value.sync="form.password_confirm"></PasswordConfirmVue>

         <CodeVue :username="form.username" :value.sync="form.code">}</CodeVue>

        <el-form-item prop="">
          <el-button type="primary" class="button-block" @click="onSubmit()" style="width:100%">修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import sha1 from "js-sha1";
import UsernameVue from "@c/account/username";
import PasswordVue from "@c/account/password";
import PasswordConfirmVue from "@c/account/passwordConfirm";
import CodeVue from "@c/code";
import HeaderBack from "@c/back/back"
// API
import {Forget} from "@/api/account";
export default {
  name: "Forget",
  components:{UsernameVue,CodeVue,HeaderBack,PasswordVue,PasswordConfirmVue},
  data() {
    return {
      form:{
        username: "",
        code:"",
        password:"",
        password_confirm:"",
      },
    };
  },
    methods:{
    onSubmit(){
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.forgetPassword()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    forgetPassword(){
      const requestData = {
        username: this.form.username,
        code:this.form.code,
        password:sha1(this.form.password),
        password_confirm: sha1(this.form.password_confirm),
      }
      this.$store.dispatch("account/forgetAction",requestData).then(res => {
        this.$message({
          message:res.message,
          type:"success"
        })
        this.$router.push({
          name:"Login"
        })
      }).catch(err => {})
    }
  }
};
</script>

<style lang="scss" scoped></style>
