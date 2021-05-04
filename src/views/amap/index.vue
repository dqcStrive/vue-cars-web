<template>
  <div id="amap-wrap">
    <el-amap
      vid="amapContainer"
      :amap-manager="amapManager"
      :center="center"
      :zoom="zoom"
      :events="events"
      class="amap-demo"
    >
      <!-- 覆盖物 圆-->
      <el-amap-circle
        v-for="(circle, index) in circles"
        :key="index"
        :center="circle.center"
        :radius="circle.radius"
        :fillColor="circle.fillColor"
        :strokeColor="circle.fillColor"
        :strokeOpacity="circle.strokeOpacity"
        :strokeWeight="circle.strokeWeight"
      >
      </el-amap-circle>
      <!-- 覆盖物 停车场 -->
     <el-amap-marker 
     v-for="(item,index) in parkings" 
     :key="item.id" 
     :position="item.position" 
     :content="item.content" 
     :vid="index"
     :offset="item.offset">
     </el-amap-marker>
    <!-- 覆盖物 停车场 车辆 -->
    <el-amap-marker 
     v-for="(item,index) in parkings" 
     :key="item.id+index" 
     :extData="item"
     :position="item.position" 
     :content="item.text" 
     :events="item.events"
     :vid="index"
     :offset="item.offsetText">
     </el-amap-marker>
    <!-- 覆盖物 停车场 车辆 -->
    <el-amap-marker 
     v-for="(item) in parkingInfo" 
     :key="item.text" 
     :position="item.position" 
     :content="item.text" 
     zIndex="1000"
     :offset="item.offset">
     </el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
import { SelfLocation } from "./location";
import { Walking } from "./walking";
// 样式
import styleCss from "./style";
let amapManager = new AMapManager();
export default {
  name: "Amap",
  data() {
    const _this = this;
    return {
      map: null,
      self_lng:"",
      self_lat:"",
      amapManager,
      zoom: 20, //地图大小
      center: [0,0], //经纬度坐标
      events: {
        init(o) {
          // 地图懒加载
          lazyAMapApiLoaderInstance.load().then(() => {
            _this.initMap();
          });
        },
      },
      // 自身定位
      circles: [],
      // 停车场信息
      parkingInfo:[],
      // 停车场数据
      parkingData:{},
      lnglat:[],
      parkings:[],
    };
  },
  methods: {
    // 初始化地图
    initMap(o) {
      // 获取地图实例
      this.map = amapManager.getMap();
      // 地图初始化完成
      this.$emit("callbackComponent",{
        function: "loadMap"
      })
      this.selfLocation();
    },
    // 自身定位
    selfLocation(){
      // 自身定位
      SelfLocation({
        map: this.map,
        onComplete: (value) => this.selfLocationComplete(value),
      })
    },
    //自身定位 成功回调
    selfLocationComplete(value){
      this.self_lng = value.position.lng;
      this.self_lat = value.position.lat;
      const json = {
        radius: "5",
        fillColor: "#393e43",
        strokeOpacity: "0.2",
        strokeWeight: "30",
      };
      json.center = [this.self_lng,this.self_lat]
      this.circles.push(json)
    },
    // 存储数据
    saveData(params){
      if(this[params.key]){
        this[params.key] = params.value;
      }
    },
    getParkingData(data){
      this.parkings = data;
    },
    handlerWalking(lnglat){

      // 步行路线规划
      Walking({
        map: this.map,
        position_start: [this.self_lng,this.self_lat],
        position_end: lnglat,
        complete:(value) => this.handlerWalkingComlete(value)
      });
    },
    handlerWalkingComlete(value){
      this.parkingInfo = [
        {
          position: this.parkingData.lnglat.split(","),
          text:`<div style="${styleCss.parkingInfoWrap}">
          <span style="${styleCss.parkingInfoNumber}">${this.parkingData.carsNumber}</span>
          辆车<span style="${styleCss.parkingInfoLine}"></span>距离您${value.routes[0].distance}米
          </div>`,
          offset:[-20,-60],
        }
      ]
    }
  },
  mounted() {},
  watch:{
    "$store.state.location.selfLocation":{
      handler(){
        this.selfLocation()
      }
    }
  }
};
</script>

<style lang="scss">
#amap-wrap {
  height: 100vh;
}
</style>