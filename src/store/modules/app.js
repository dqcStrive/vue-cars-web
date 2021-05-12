const state = {
  // 是否点击了车辆列表
  isClickCarsList: true,
  // 是否请求车辆列表
  isRequestCarsList: false,
  // 路由名称
  routerName:""
}
const mutations = {
  SET_CARS_LIST_STATUS(state,value){
    state.isClickCarsList = value
  },
  SET_CARS_LIST_REQUEST(state,value){
    state.isRequestCarsList = value
  },
  SET_ROUTERNAME(STATE,value){
    STATE.routerName = value;
  }
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