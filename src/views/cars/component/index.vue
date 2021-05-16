<template>
  <div>
    <section class="cars-item" @click="getCarsInfo">
      <header>
        <h4 class="cars-logo">
          <img :src="data.imgUrl" :alt="data.carsMode" />
          <span class="name">{{ data.carsMode }}</span>
        </h4>
        <p class="cars-attr">
          <span>{{ data.carsAttr | energyType }}</span>
          <span>{{ data.carsAttr | seat_number }}座</span>
        </p>
      </header>

      <div class="cars-content">
        <div class="info">
          <div>
            <h4 class="car-number">{{ data.carsNumber }}</h4>
            <div>
              <ul
                class="car-electric"
                :class="
                  data.electric != 0 ? data.electric : data.oil | electricNumber
                "
              >
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
                <strong>{{ data.countKm }}</strong>
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
    <section
      class="cars-item cars-detailed"
      :style="'height:' + cars_info_height"
      v-if="cars_info_show"
    >
      <div class="scroll">
        <h4 class="colum">
          {{ data.parkingName }}
          <i class="close" @click="closeCarsInfo"></i>
        </h4>
        <header>
          <h4 class="cars-logo">
            <img :src="data.imgUrl" :alt="data.carsMode" />
            <span class="name">{{ data.carsMode }}</span>
          </h4>
          <p class="cars-attr">
            <span
              >{{ data.carsAttr | energyType }}
              {{ data.carsAttr | seat_number }}座</span
            >
          </p>
        </header>
        <img :src="data.carsImg" alt="" width="100% " />
        <div class="clearfix">
          <div class="pull-left fs-24">{{ data.carsNumber }}</div>
          <p class="distance pull-right">
            <sub>约</sub>
            <strong>{{ data.countKm }}</strong>
            <sub>KM</sub>
          </p>
        </div>

        <div class="cars-electric-box">
          <div class="p-r">
            <span
              class="e-hight"
              style="width: 80%"
              :style="`width: ${Math.floor((data.oil / 10) * 10)}%`"
            ></span>
            <span class="e-bg"></span>
          </div>
        </div>
        <p class="info color-main text-center">驱车支付12.0元车费</p>

        <ul class="car-type-list">
          <li
            @click="selectLeaseType(item)"
            :class="item.carsLeaseTypeId == lease_type_id ? 'current' : ''"
            v-for="item in leaseList_data"
            :key="item.carsLeaseTypeId"
          >
            <h4 class="name">{{ item.carsLeaseTypeName }}</h4>
            <span class="price">￥ {{ item.price }}</span>
          </li>
        </ul>

        <div class="clause-dec">
          <span class="pull-left">参保服务</span>
          <i class="current"></i>
        </div>
      </div>

      <a href="javascript:void(0)" class="select-car-btn" @click="confirmCars"
        >预约车辆</a
      >
    </section>
  </div>
</template>

<script>
import { getCarsAttrKey } from "@/utils/format";
import { GetLeaseList, ConfirmCars } from "@/api/cars";
export default {
  name: "CarList",
  filters: {
    electricNumber(val) {
      const number = Math.floor(val / 10);
      return ` active-li-${number}`;
    },
    energyType(val) {
      return getCarsAttrKey({
        data: val,
        parerntKey: "basics",
        childKey: "energy_type",
      });
    },
    seat_number(val) {
      return getCarsAttrKey({
        data: val,
        parerntKey: "basics",
        childKey: "seat",
      });
    },
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      cars_info_show: false,
      // 车辆信息弹窗高度
      cars_info_height: 0,
      // 定时器
      timer: null,
      //租赁类型
      leaseList_data: [],
      // 租赁类型ID
      lease_type_id: "",
      // token
      token: this.$store.state.account.token,
      // 校验提示
      message_item: this.$store.state.config.message_item,
      // 临时使用
      backup_key: "",
      // 用户审核
      audio_status: [
        "check_real_name",
        "check_cars",
        "gilding",
        "illegalAmount",
      ],
    };
  },
  methods: {
    // 预约用车
    confirmCars() {
      //判断用户是否登录
      if (!this.token) {
        this.$router.push({
          name: "Login",
        });
        return false;
      }
      if (!this.lease_type_id) {
        this.$message({
          message: "请选择租车类型",
          type: "error",
        });
        return false;
      }
      const requestDate = {
        cars_id: this.data.id,
        cars_lease_type_id: this.lease_type_id,
      };
      ConfirmCars(requestDate)
        .then((res) => {
          if(res.resCode == 0){
            this.$message({
              message: res.message,
              type: "success",
            });
            this.$router.replace({
              name: "Order",
            });
            return false;
          }
          const data = res.data;
          const key = Object.keys(data); //获取key

          if (key && key.length > 0) {
            if (this.audio_status.includes(key[0])) {
              //实名认证
              if (
                !data.check_real_name ||
                !data.check_cars ||
                !data.gilding ||
                !data.illegalAmount
              ) {
                let message = "";
                //匹配 message
                this.backup_key = key[0]; //临时存储
                let msg = this.message_item[key[0]].msg;
                msg && (message = msg);
                //弹窗提示
                this.$confirm(message, "提示", {
                  confirmButtonText: "确定",
                  canaelButtonText: "取消",
                  type: "warning",
                }).then(() => {
                  let router = this.message_item[this.backup_key].router;
                  if (router) {
                    this.$router.push({
                      path: router,
                      query: {
                        type: this.message_item[this.backup_key].type,
                      },
                    });
                  }
                });
                return false;
              }
            } else {
              let msg = this.message_item[key[0]].msg;
              this.$message({
                message: msg,
                type: "error",
              });
              return false;
            }
          }

        })
        .catch((err) => {});
    },
    getCarsInfo() {
      this.openCarsInfo();
    },
    // 打开弹窗
    openCarsInfo() {
      //高度计算
      const viewHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      const height = viewHeight - 145;
      // 打开信息
      this.cars_info_show = true;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.cars_info_height = `${height}px`;
        clearTimeout(this.timer);
      }, 10);

      this.getLeaseList();
    },
    // 选择租赁类型
    selectLeaseType(data) {
      this.lease_type_id = data.carsLeaseTypeId;
    },
    // 获取租赁列表
    getLeaseList() {
      if (this.leaseList_data && this.leaseList_data.length > 0) return false;
      GetLeaseList({ carsId: this.data.id }).then((res) => {
        const data = res.data.data;
        if (data) {
          this.leaseList_data = data;
        }
      });
    },
    // 关闭弹窗
    closeCarsInfo() {
      this.cars_info_show = false;
      this.cars_info_height = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>