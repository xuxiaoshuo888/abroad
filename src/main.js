import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios'

import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配以.vue或js的正则表达式
  /\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // 剥去文件名开头的 `'./` 和结尾的扩展名
  const componentName=fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

Vue.prototype.$ajax=axios;
Vue.prototype.$proxy=process.env.VUE_APP_PROXY;
Vue.prototype.$downloadUrl='/resource/downloadFile?path=';
Vue.prototype.$showUrl='/resource/showImg?path=';
Vue.use(ElementUI);
Vue.config.productionTip = false

//获取cookie
function getCookie(name){
  let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg)){
    store.commit('setData',{
      name:'cookie',
      data:decodeURIComponent(arr[2])
    });
    return decodeURIComponent(arr[2]);
  }
  else
    return false;
}
//判断是否有token
function hasToken(){
  if(store.getters.token){
    return true;
  }
  else if(sessionStorage.getItem('token')!==null){
    store.commit('setToken',sessionStorage['token']);
    store.commit('setRole',sessionStorage['role']);
    store.commit('setRoleList',JSON.parse(sessionStorage['roleList']));
    store.commit('setUser',JSON.parse(sessionStorage['user']));
    return true
  }
  else return false
}

router.beforeEach((to,from,next)=>{
  if(hasToken()){
    next();
  }
  else{
    //模拟登陆
    // axios.post('/cas/test_login')
    //   .then(res=>{
    //     axios.post('/gettoken',{uuid:res.data.data.APP_UUID})
    //       .then(res=>{
    //         store.commit('setToken',res.data.data.token);
    //         store.commit('setRole',res.data.data.currentRole.id);
    //         store.commit('setRoleList',res.data.data.roles);
    //         store.commit('setUser',res.data.data.user);
    //         next()
    //       })
    //   })
    //生产环境登陆
    if(getCookie('APP_UUID')){
      axios.post('/gettoken',{uuid:getCookie('APP_UUID')})
        .then(res=>{
          store.commit('setToken',res.data.data.token);
          store.commit('setRole',res.data.data.currentRole.id);
          store.commit('setRoleList',res.data.data.roles);
          store.commit('setUser',res.data.data.user);
          next()
        })
    }
    else{
      axios.post('/getLoginUrl')
        .then(res=>{
          sessionStorage.clear();
          window.location.href=res.data.url;
        })
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
