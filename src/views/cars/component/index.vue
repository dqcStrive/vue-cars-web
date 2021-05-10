<template>
  <div>
    <section class="cars-item" @click="getCarsInfo">
      <header>
        <h4 class="cars-logo">
          <img :src="data.imgUrl" :alt="data.carsMode" />
          <span class="name">{{data.carsMode}}</span>
        </h4>
        <p class="cars-attr">
          <span>{{data.carsAttr | energyType}}</span> 
          <span>{{data.carsAttr | seat_number}}座</span>
        </p>
      </header>

      <div class="cars-content">
        <div class="info">
          <div>
            <h4 class="car-number">{{data.carsNumber}}</h4>
            <div>
              <ul class="car-electric " :class="data.electric != 0 ? data.electric:data.oil | electricNumber">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <p class="distance">
                <sub>约</sub>
                <strong>{{data.countKm}}</strong>
                <sub>KM</sub>
              </p>
            </div>
          </div>
        </div>
        <img :src="data.carsImg" alt="" />
      </div>

      <footer>
        <a href="javascript:void(0)" class="car-parking">停车场</a>
      </footer>
    </section>
    <section class="cars-item cars-detailed" :style="'height:' + cars_info_height" v-if="cars_info_show">
      <div class="scroll">
        <h4 class="colum">
          {{data.parkingName}}
          <i class="close" @click="closeCarsInfo"></i>
        </h4>
        <header>
          <h4 class="cars-logo">
            <img :src="data.imgUrl" :alt="data.carsMode" />
            <span class="name">{{data.carsMode}}</span>
          </h4>
          <p class="cars-attr">
            <span>{{data.carsAttr | energyType}} {{data.carsAttr | seat_number}}座</span>
          </p>
        </header>
        <img :src="data.carsImg" alt="" width="100% " />
        <div class="clearfix">
          <div class="pull-left fs-24">{{data.carsNumber}}</div>
          <p class="distance pull-right">
            <sub>约</sub>
            <strong>{{data.countKm}}</strong>
            <sub>KM</sub>
          </p>
        </div>

        <div class="cars-electric-box">
          <div class="p-r">
            <span class="e-hight" style="width: 80%" :style="`width: ${Math.floor(data.oil /10 * 10)}%`"></span>
            <span class="e-bg"></span>
          </div>
        </div>
        <p class="info color-main text-center">驱车支付12.0元车费</p>

        <ul class="car-type-list">
          <li @click="selectLeaseType(item)" :class="item.carsLeaseTypeId == lease_type_id ? 'current' : ''" v-for="item in leaseList_data" :key="item.carsLeaseTypeId">
            <h4 class="name">{{item.carsLeaseTypeName}}</h4>
            <span class="price">￥ {{item.price}}</span>
          </li>
        </ul>

        <div class="clause-dec">
          <span class="pull-left">参保服务</span>
          <i class="current"></i>
        </div>
        

      </div>

      <a href="javascript:void(0)" class="select-car-btn">预约车辆</a>
    </section>
  </div>
</template>

<script>
import {getCarsAttrKey} from "@/utils/format";
import {GetLeaseList} from "@/api/cars";
export default {
  name: "CarList",
  filters:{
    electricNumber(val){
      const number = Math.floor(val /10);
      return ` active-li-${number}`
    },
    energyType(val){
      return getCarsAttrKey({
        data: val,
        parerntKey: "basics",
        childKey: "energy_type"
      });
    },
    seat_number(val){
       return getCarsAttrKey({
        data: val,
        parerntKey: "basics",
        childKey: "seat"
      });
    },
  },
  props: {
    data:{
      type:Object,
      default: () => ({})
    }
  },
  data(){
    return{
      cars_info_show: false,
      // 车辆信息弹窗高度
      cars_info_height: 0,
      // 定时器
      timer: null,
      //租赁类型
      leaseList_data:[],
      // 租赁类型ID
      lease_type_id:"",
    }
  },
  methods: {
    getCarsInfo(){
      this.openCarsInfo();
    },
    // 打开弹窗
    openCarsInfo(){
      //高度计算 
      const viewHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const height = viewHeight - 145;
      // 打开信息
      this.cars_info_show = true;
      if(this.timer){clearTimeout(this.timer)}
      this.timer = setTimeout(()=>{
        this.cars_info_height = `${height}px`;
        clearTimeout(this.timer)
      },10)

      this.getLeaseList();
    },
    // 选择租赁类型
    selectLeaseType(data){
      this.lease_type_id = data.carsLeaseTypeId;
    },
    // 获取租赁列表
    getLeaseList(){
      if(this.leaseList_data && this.leaseList_data.length > 0)return false;
      GetLeaseList({carsId: this.data.id}).then(res=>{
        const data = res.data.data;
        if(data){
          this.leaseList_data = data
        }
      })
    },
    // 关闭弹窗
    closeCarsInfo(){
      this.cars_info_show = false;
      this.cars_info_height = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>