import axios from "axios"
import { removeToken, setToken, getToken } from "@/tools/app.js"
import store from "../store";
//import { format } from "url";

var service = axios.create({
  baseURL: 'https://legolasljy.tk/',
  //timeout: 2000
});


service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
    // 判断是否存在token，如果存在的话，则每个http header都加上token
  let token = getToken();
  if (!config.headers.hasOwnProperty('token') && token) {
    config.headers.token = token;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么\


  //console.log(response);
  return response;
}, function (error) {
  // 对响应错误做点什么
  if(error.response.status === 403){
    removeToken();
    //console.log(getToken());
  };
  return Promise.reject(error);
});






export default service;