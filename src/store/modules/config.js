const state = {
  // 校验提示
  message_item:{
    check_real_name:{
      msg:"您未实名认证，请先实名认证",
      router: "/authentication",
      type:"identity"
    },
    check_cars:{
      msg:"您未上传驾驶证，请先上传驾驶证，审核通过后便可租车",
      router:"/authentication",
      type:"drive"
    },
    gilding:{
      msg:"您还没交押金，请先交押金哦",
      router: "/rechange",
      type:"gilding"
    },
    illegalAmount:{
      msg:"您的预售金额小于200元，请先预缴违章金额",
      router: "/rechange",
      type:"illegal"
    },
    blank:{
      msg:"请先绑定银行卡",
      router: "/authentication"
    }
  }
}
const mutations = {

}
const actions = {}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}