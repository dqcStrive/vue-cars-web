<template>
  <div class="header-back">
    <div class="back">
      <i class="icon"></i>
      <h4 class="title">{{column}}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name:"HeaderBack",
  props:{
    column:{
      type: String,
      default: '',
    }
  }
}
</script>

<style lang="scss" scoped>
  .header-back{
    position: relative;
    padding-bottom: 147px;
  }
  .back{
    position: absolute;
    top: 21px;
    left: 0;
    right: 0;
    height: 40px;
    line-height: 40px;
  }
  .title{
    font-size: 16px;
    color: #fff;
    margin-left: 33px;
  }
  .icon{
    position: absolute;
    width: 40px;
    height: 40px;
    left: 0;
    top: 0;

    &:after{
      content: '';
      position: absolute;
      left: 0;
      top: 10px;
      display: block;
      width: 12px;
      height: 12px;
      border-left: 2px solid #00a3ff;
      border-top: 2px solid #00a3ff;
      @include webkit(transform,rotate(-45deg));
      cursor: pointer;
    }
  }
</style>