import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token:'',
    role:'',//当前用户角色
    roleList:'',//用户所有角色表
    user:'',//用户信息
    applyProject:'',//当前申请项目
    applyId:'',//学生申请表id
    applyName:'',//申请表名（详情/审批）
    regId:'',//登记id
    regName:'',//登记表名（详情/登记）
    awardData:'',//奖学金data
    awardName:'',//奖学金表名（详情/编辑）
    stdInfo1:'',//学生奖学金附带的信息，电话，邮箱，健康状况
  },
  getters:{
    token:state=>{return state.token},
    role:state=>{return state.role},
    roleList:state=>{return state.roleList},
    user:state=>{return state.user},
  },
  mutations: {
    //设置数据
    //data{name,data}
    setData(state,data){
      state[data.name]=data.data;
    },
    //设置token
    setToken(state,token){
      state.token=token;
      sessionStorage['token']=token;
    },
    setRole(state,role){
      state.role=role;
      sessionStorage['role']=role;
    },
    setRoleList(state,roleList){
      state.roleList=roleList;
      sessionStorage['roleList']=JSON.stringify(roleList);
    },
    setUser(state,user){
      state.user=user;
      sessionStorage['user']=JSON.stringify(user);
    },
    setStdInfo1(state,stdInfo1){
      state.stdInfo1 = stdInfo1;
      sessionStorage['stdInfo1']=stdInfo1;
    }
  },
  actions: {}
});
