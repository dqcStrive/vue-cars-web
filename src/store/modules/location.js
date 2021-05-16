const state = {
  selfLocation: true,
  // 停车场id
  parking_id: []
}
const mutations = {
  SELF_LOCATION(state){
    state.selfLocation = !state.selfLocation;
  },
  SET_PARKING_ID(state,value){
    state.parking_id = value;
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