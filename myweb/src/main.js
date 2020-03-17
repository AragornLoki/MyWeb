import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import {getToken} from "@/tools/app.js"


Vue.prototype.$http = axios;
Vue.use(ElementUI);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    
    document.title = to.meta.title;
  } else {
    document.title = '登陆';
  }



  if(to.matched.length!==1){
    console.log('1')
    next('/403')
  }else if(getToken()){
    next();
  }else if(to.path === '/login'){
    next();
  }else if(to.meta.requireAuth) {
    next('/login');
  }

})



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

