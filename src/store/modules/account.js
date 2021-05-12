// API
import {Register,Login} from "@/api/account";
import { setToken, setUsername,removeToken, removeUsername,getToken,getUsername } from "@/utils/cookiesCars";
import {Forget} from "@/api/account";
const state = {
  token: getToken() || "" ,
  username: getUsername() || ""
}
const mutations = {
  SET_TOKEN(state,value){
    state.token = value;
  },
  SET_USERNAME(state,value){
    state.username = value;
  }
}
const actions = {
  reisterAction(context,requestData){
    return new Promise((resolve,reject) => {
      Register(requestData).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  },
  loginAction(context,requestData){
    return new Promise((resolve,reject) => {
      Login(requestData).then(res => {
        const data = res.data;
        context.commit("SET_TOKEN",data.token);
        context.commit("SET_USERNAME",data.username);
        setToken(data.token);
        setUsername(data.username);
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  },
  forgetAction(context,requestData){
    return new Promise((resolve,reject) => {
      Forget(requestData).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  },
  logoutAction(context,requestData){
    return new Promise((resolve,reject) => {
      removeToken();
      removeUsername();
      resolve()
    })
  },
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}