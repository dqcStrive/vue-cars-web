<template>
  <el-form-item prop="password" :rules="[{ required: true,validator:validatePassword,trigger: 'change'}]">
    <el-input type="password" v-model="password" :placeholder="placeholder" v-on:input="enterInput"></el-input>
  </el-form-item>
</template>

<script>
import {validate_password} from "@/utils/validate";
export default {
  name: "Password",
  props:{
    placeholder:{
      type: String,
      default: "密码"
    },
    passwordConfirm:{
      type:String,
      default: ""
    }
  },
  data(){
    return {
      password:"",
    }
  },
  methods:{
    validatePassword(rule,value,callback){
      // 确认密码为空时
      if(!this.password || this.password == ""){
        return callback(new Error("密码不能为空"))
      }else if(!validate_password(this.password)){
        return callback(new Error("密码位6-20位英文数字组合"))
      }else{
        callback();
      }
    },
    enterInput(){
      this.$emit("update:value",this.password);
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>
