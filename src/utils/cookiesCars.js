import Cookies from "js-cookie";

const tokenKey = "carsAccountToken";
const usernameKey = "carsAccountUsername"

// 写入token
export function setToken(value){ return Cookies.set(tokenKey, value); }
// 获取token
export function getToken(value){ return Cookies.get(tokenKey); }
export function getTokenCars(value){ return Cookies.get(tokenKey); }
// 删除token
export function removeToken(value){ return Cookies.remove(tokenKey); }
// username
export function setUsername(value){ return Cookies.set(usernameKey, value); }
export function getUsername(value){ return Cookies.get(usernameKey); }
export function removeUsername(value){ return Cookies.remove(usernameKey); }