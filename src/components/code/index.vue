<template>
  <el-form-item prop="code" :rules="rules">
    <el-button :loading="loading" class="button-code" :disabled="disabled" @click="handlerCode">{{button_text}}</el-button>
    <el-input v-model="code" placeholder="验证码" v-on:input="enterInput" ></el-input>
  </el-form-item>
</template>

<script>
import {GetCode} from "@/api/account";
export default {
  name: "Code",
  props:{
    username:{
      type: String,
      default: ""
    },
  },
  data(){
    return{
      // 验证码
      code: "",
      // 获取验证码
      button_text:"获取验证码",
      // 按钮状态
      disabled: true,
      // 定时器
      timer: null,
      // 按钮加载
      loading:false,
      // 校验规则
      rules:[
        {required: true,message:"验证码不能为空",trigger:"blur"},
        {min:6,max:6,message:"请输入6位验证码",trigger:"change"},
      ]
    }
  },
  methods:{
    handlerCode(){
      const requestData = {
        username: this.username,
        module:"register"
      }
      this.loading = true;
      GetCode(requestData).then(res => {
        this.loading = false;
        this.$message({
          message:res.message,
          type:"success"
        })
        this.countDown();
      })
    },
    // 倒计时
    countDown(){
      let second = 60;
      this.button_text = `倒计时${second}秒`;
      // 禁用按钮
      this.disabled = true;
      this.timer = setInterval(()=>{
        second--;
        this.button_text = `倒计时${second}秒`;
        if(second == 0){
          this.button_text = "重新获取";
          this.disabled = false;
          clearInterval(this.timer);
        }
      },1000)
    },
    enterInput(){
      this.$emit("update:value",this.code);
    }
      
  },
  watch:{
    username:{
      handler(newValue){
        this.disabled = newValue ? false : true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>