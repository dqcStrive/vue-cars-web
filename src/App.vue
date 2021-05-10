<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default({
 name: "App",
   mounted() {
    document.addEventListener("mouseup", (e) => {
      // 获取子视图
      const userCon = document.getElementById("children-view");
      // 获取车辆列表
      const carsSwiper = document.getElementsByClassName("cars-wrap")[0];

      if (carsSwiper && !carsSwiper.contains(e.target)) {
        const isRequestCarsList = this.$store.state.app.isRequestCarsList;

        if(!isRequestCarsList){
          this.$store.commit("app/SET_CARS_LIST_STATUS",false)
        }
      }

      if (userCon && !userCon.contains(e.target)) {
        //判断Dom元素是否包含关系
        const routerName = this.$route.name;
        if (routerName === "Index") return false;
        this.$router.push({
          name: "Index",
        });
      }
    });
   }
})
</script>


<style lang="scss">
#app {}
</style>
