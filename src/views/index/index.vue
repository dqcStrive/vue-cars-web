<template>
<div>

  <!-- 地图组件 -->
  <mapVue ref="map" @callbackComponent="callbackComponent"></mapVue>

  <!-- cars dom渲染 -->
  <!-- <carVue></carVue> -->

  <!-- 导航 -->
  <navBarVue></navBarVue>
  <!-- 会员 -->
  <div id="children-view" :class="{open:show}" >
    <router-view></router-view>
  </div>
  <!-- login -->
  <Login></Login>

</div>
</template>

<script>
import mapVue from '../amap/index';
import carVue from '../cars/index';
import navBarVue from '@c/navbar/index';
import Login from "./login";
import {Parking} from "@/api/parking";
export default {
  name: 'Index',
  components:{mapVue,carVue,navBarVue,Login},
  data(){
    return{
    }
  },
  methods:{
    callbackComponent(params){
      params.function && this[params.function](params.data);
    },
    // 地图初始化回调
    loadMap(){
      this.getParking();
    },
    // 获取停车场
    getParking(){
      Parking().then(res => {
        const data = res.data.data;
        data.forEach(item => {
          item.position = item.lnglat.split(",");
          item.content = "<img src='"+require('@/assets/images/parking_location.png')+"' >";
          item.offset = [-25,-60];
          item.offsetText = [-30,-60];
          item.text = `<div style="width: 60px;height:60px;font-size: 20px;color: #fff; text-align: center; line-height:50px">${item.carsNumber}</div>`;
          item.events = {
            click: (e) => this.distance(e)
          }
        });
        this.$refs.map.getParkingData(data);
      })
    },
    distance(e){
      const data = e.target.getExtData();//获取用户自定义属性
      this.$refs.map.saveData({
        key:"parkingData",
        value:data,
      });
      this.$refs.map.handlerWalking(data.lnglat.split(","));
    }
  },
  computed:{
    show(){
      let router = this.$route;
      return router.name === "Index" ? false : true;
    },

  },
  mounted() {
    document.addEventListener('mouseup',(e) => {
      const userCon = document.getElementById("children-view");
        if(userCon && !userCon.contains(e.target)){//判断Dom元素是否包含关系
          const routerName = this.$route.name;
          if(routerName === "Index") return false;
          this.$router.push({
            name: 'Index'
          })
        }
    })
  },
  watch:{
  }
}
</script>

<style lang="scss" scoped>
#children-view{
  position: fixed;
  top: 0;
  bottom: 0;
  right: -500px;
  z-index: 101;
  width: 418px;
  background-color: #34393f;
  @include webkit(transition,all .3s ease 0s);
  @include webkit(box-shadow, -5px 0 38px 0 rgba(0,0,0,.4));
  &.open{
    right: 0px
  }
}
</style>