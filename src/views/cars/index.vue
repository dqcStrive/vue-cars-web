<template>
  <div class="cars-wrap" v-if="carsList && carsList.length>0">
    <div class="cars-swiper-wrap">
      <swiper ref="mySwiper" :options="swiperOption">
        <swiper-slide v-for="item in carsList" :key="item.id">
          <CarList :data="item"></CarList>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev" slot="button-prev" @click="prev"></div>
      <div class="swiper-button-next" slot="button-next" @click="next"></div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle";
import "swiper/swiper-bundle.css";
import { GetCarsList } from "@/api/cars";
import CarList from "./component/index";
export default {
  name: "Cars",
  components: { Swiper, SwiperSlide, CarList },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween:50,
        navigation: {
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        },
      },
      carsList:[],
    };
  },
  methods: {
    user() {
      this.$router.push({
        name: "User",
      });
    },
    prev() {
      this.swiper.slidePrev();
    },
    next() {
      this.swiper.slideNext();
    },
    getCarsList(parkingId) {

      GetCarsList({ parkingId }).then((res) => {
        const data = res.data.data;
        data && (this.carsList = data)
        // 还原状态
        this.$store.commit("app/SET_CARS_LIST_REQUEST",false);
      });
    },
  },
  computed:{
    swiper(){
      return this.$refs.mySwiper.$swiper
    }
  },
  watch:{
    "$store.state.app.isClickCarsList":{
      handler(newVal){
        if(!newVal){this.carsList = [];}
        this.$store.commit("app/SET_CARS_LIST_STATUS",true)
      }
    }
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>