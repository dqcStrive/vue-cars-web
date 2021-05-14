<template>
  <el-form-item prop="password_confirm" :rules="[{ required: true,validator:validatePassword,trigger: 'change'}]">
    <el-input type="password" v-model="password_confirm" :placeholder="placeholder" v-on:input="enterInput"></el-input>
  </el-form-item>
</template>

<script>
import {validate_password} from "@/utils/validate";
export default {
  name: "PasswordConfirm",
  props:{
    placeholder:{
      type: String,
      default: "确认密码"
    },
    password:{
      type:String,
      default:""
    }
  },
  data(){
    return {
      password_confirm:"",
    }
  },
  methods:{
    validatePassword(rule,value,callback){
      // 密码为空时，直接校验成功
      if(!this.password || this.password == ""){return callback()}
      if(!this.password_confirm || this.password_confirm == ""){
        return callback(new Error("确认密码不能为空"))
      }else if(!validate_password(this.password_confirm)){
        return callback(new Error("密码位6-20位英文数字组合"))
      }else if(this.password_confirm != this.password){
        return callback(new Error("两次输入密码不一致"))
      }else{
        callback();
      }

    },
    enterInput(){
      this.$emit("update:value",this.password_confirm);
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>
