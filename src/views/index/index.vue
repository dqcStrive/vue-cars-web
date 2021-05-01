<template>
<div>

  <!-- 地图组件 -->
  <mapVue></mapVue>

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
export default {
  name: 'Index',
  components:{mapVue,carVue,navBarVue,Login},
  data(){
    return{
    }
  },
  computed:{
    show(){
      let router = this.$route;
      return router.name === "Index" ? false : true;
    }
  },
  mounted() {
    document.addEventListener('mouseup',(e) => {
      const userCon = document.getElementById("children-view");
        if(userCon && !userCon.contains(e.target)){//判断Dom元素是否包含关系
          this.$router.push({
            name: 'Index'
          })
          console.log(e.target);
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