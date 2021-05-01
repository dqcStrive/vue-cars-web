<template>
  <div>
    <section class="cars-item">
      <header>
        <h4 class="cars-logo">
          <img src="../../assets/images/carlogo.png" alt="Mustang 2019款" />
          <span class="name">Mustang 2019款</span>
        </h4>
        <p class="cars-attr">
          <span>新能源汽车 5座</span>
        </p>
      </header>

      <div class="cars-content">
        <div class="info">
          <div>
            <h4 class="car-number">粤 B9FB7G</h4>
            <div>
              <ul class="car-electric active-li-6">
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
                <strong>600</strong>
                <sub>KM</sub>
              </p>
            </div>
          </div>
        </div>
        <img src="../../assets/images/car.png" alt="" />
      </div>

      <footer>
        <a href="javascript:void(0)" class="car-parking">停车场</a>
      </footer>
    </section>
    <section class="cars-item cars-detailed" :style="'height:' + height">
      <div class="scroll">
        <h4 class="colum">
          停车场
          <i class="close"></i>
        </h4>
        <header>
          <h4 class="cars-logo">
            <img src="../../assets/images/carlogo.png" alt="Mustang 2019款" />
            <span class="name">Mustang 2019款</span>
          </h4>
          <p class="cars-attr">
            <span>新能源汽车 5座</span>
          </p>
        </header>
        <img src="../../assets/images/car.png" alt="" width="100% " />
        <div class="clearfix">
          <div class="pull-left fs-24">粤 hga78h</div>
          <p class="distance pull-right">
            <sub>约</sub>
            <strong>600</strong>
            <sub>KM</sub>
          </p>
        </div>

        <div class="cars-electric-box">
          <div class="p-r">
            <span class="e-hight" style="width: 80%"></span>
            <span class="e-bg"></span>
          </div>
        </div>
        <p class="info color-main text-center">驱车支付12.0元车费</p>

        <ul class="car-type-list">
          <li class="current">
            <h4 class="name">日租车</h4>
            <span class="price">￥ 300/1天</span>
          </li>
          <li>
            <h4 class="name">日租车</h4>
            <span class="price">￥ 300/1天</span>
          </li>
          <li>
            <h4 class="name">日租车</h4>
            <span class="price">￥ 300/1天</span>
          </li>
          <li>
            <h4 class="name">日租车</h4>
            <span class="price">￥ 300/1天</span>
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
export default {
  name: "CarList",
  props: {
    height: {
      type: String,
      default: "257px",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>