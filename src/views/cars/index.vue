<template>
  <div class="cars-wrap">
    <div class="cars-swiper-wrap">
      <swiper ref="mySwiper" :options="swiperOption">
        <swiper-slide>
          <carList height="800px"></carList>
        </swiper-slide>
        <swiper-slide>
          <carList></carList>
        </swiper-slide>
        <swiper-slide>
          <carList></carList>
        </swiper-slide>
        <swiper-slide>
          <carList></carList>
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
import carList from "@c/carsList/index";
export default {
  name: "Cars",
  components: { Swiper, SwiperSlide, carList },
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
    }
  },
  computed:{
    swiper(){
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>