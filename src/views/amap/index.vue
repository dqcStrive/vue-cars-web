<template>
<div id="amap-wrap">
  <el-amap vid="amapContainer" :events="events" class="amap-demo"></el-amap>
</div>

</template>

<script>
import { AMapManager, lazyAMapApiLoaderInstance} from 'vue-amap';
export default {
  name: 'Amap',
  data(){
    return{
      map: null,
      zoom: 12,//地图大小
      // center: [116.404765,39.918052],//经纬度坐标
      events:{ },
    }
  },
  mounted() {

    //地图懒加载
    lazyAMapApiLoaderInstance.load().then(() => {
      // your code ...
      this.map = new AMap.Map('amapContainer', {
        center: [116.404765,39.918052],
        zoom: this.zoom,
      });
    });
  },
}
</script>

<style lang="scss" scoped>
  #amap-wrap{
    height: 100vh;
  }
</style>