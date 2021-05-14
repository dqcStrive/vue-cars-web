<template>
    <div class="user-container">
        <Back />
        <ul class="menu">
            <li :class="{current: type === 'identity'}" @click="tab('identity')">身份证上传</li>
            <li :class="{current: type === 'drive'}" @click="tab('drive')">驾驶证上传</li>
        </ul>
        <div class="upload-wrap" v-for="item in upload_item" :key="item.label">
            <UploadVue :imgUrl="upload_data[item.prop]" :value.sync="upload_data[item.prop]" :requestFlag="item.requestFlag" />
            <p class="text">{{item.label}}</p>
        </div>

        <div class="blank-40"></div>
        <el-button type="primary" class="button-block" round>提交认证</el-button>
    </div>
</template>
<script>
import UploadVue from "@/components/upload";
export default {
    name: "User",
    components: { UploadVue },
    data(){
        return {
            type: "identity",
            upload_item:[],
            // 身份证
            cards_item:[
              { 
                type: "upload", 
                label: "身份证正面", 
                prop: "cardPhotoFace",
                requestFlag:true
              },
              { 
                type: "upload", 
                label: "身份证反面", 
                prop: "cardPhotoBack",
                requestFlag:true
              },
              { 
                type: "upload", 
                label: "手持免冠", 
                prop: "carsPhotoBareheaded",
                requestFlag:true
              },
            ],
             drive_item:[
              { 
                type: "upload", 
                label: "驾驶证正面", 
                prop: "cardPhotoFace",
                requestFlag:true
              },
              { 
                type: "upload", 
                label: "驾驶证反面", 
                prop: "cardPhotoBack",
                requestFlag:true
              },
            ],
            upload_data:{
              cardPhotoFace:"",
              cardPhotoBack:"",
              carsPhotoBareheaded:"",
            },
        }
    },
    methods: {
        tab(type){
          this.type = type;

          this.upload_item = this.type === 'identity' ?  this.cards_item : this.drive_item

        }
    },
    mounted() {
      this.upload_item = this.cards_item;
    },
}
</script>
<style lang="scss">
.menu {
    text-align: center;
    margin-bottom: 40px;
    li {
        display: inline-block;
        position: relative;
        font-size: 14px;
        opacity: .5;
        padding: 0 40px 15px;
        color: #fff;
        cursor: pointer;
        &.current {
            opacity: 1;
            &::before {
                content: "";
                position: absolute;
                bottom: 0;
                left: 50%;
                margin-left: -15px;
                width: 30px;
                height: 4px;
                border-radius: 10px;
                background-color: #00a3ff;
            }
        }
    }
}
.upload-wrap {
    .text {
        padding: 15px 0;
        color: #fff;
        opacity: .5;
        text-align: center;
    }
}
</style>