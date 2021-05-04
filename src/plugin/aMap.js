import Vue from 'vue';

//高德地图
import VueMap from 'vue-amap';
Vue.use(VueMap);

VueMap.initAMapApiLoader({
  //高德key
  key: '3fc01cfacbc3f6371a33bfea1871098b',
  plugin: ['AMap.Geolocation','AMap.Walking'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4',
  uiVersion: '1.0.11'//ui版本号
})