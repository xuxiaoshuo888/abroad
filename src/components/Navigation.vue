<template>
  <div id="nav">
    <div class="content">
      <router-link to="/" class="title"><img class="logo" src="logo.png"/></router-link>
<!--      学生出国（境）学习管理系统-->
      <el-menu class="menu"
              :default-active="$route.path"
              mode="horizontal"
               background-color="#1390d3"
               text-color="#fff"
               active-text-color="#ffd04b">
          <el-menu-item index="4" @click="toWork(newRole)">我的工作台</el-menu-item>
        <el-submenu index="project">
          <template slot="title">项目管理</template>
          <el-menu-item index="/project/add/special" v-if="role!=='SYS_STUDENT'"><router-link to="/project/add/special">专项项目申请</router-link></el-menu-item>
          <el-menu-item index="/project/list/special" v-if="role==='SYS_LGB'||role==='SYS_GATB'"><router-link to="/project/list/special">专项项目管理</router-link></el-menu-item>
          <el-menu-item index="/project/add/unspecial" v-if="role==='SYS_DEPT'||role==='SYS_LXDW'"><router-link to="/project/add/unspecial">非专项项目备案</router-link></el-menu-item>
          <el-menu-item index="/project/list/unspecial" v-if="role==='SYS_LGB'||role==='SYS_GATB'"><router-link to="/project/list/unspecial">非专项项目管理</router-link></el-menu-item>

          <el-menu-item index="/project/list/student" v-if="role==='SYS_STUDENT'"><router-link to="/project/list/student">已发布项目</router-link></el-menu-item>
          <el-menu-item index="/project/list/my" v-if="role==='SYS_DEPT'||role==='SYS_LXDW'"><router-link to="/project/list/my">我申请的项目</router-link></el-menu-item>

          <el-menu-item index="/project/apply/list" v-if="role==='SYS_STUDENT'"><router-link to="/project/apply/list">我的申请记录</router-link></el-menu-item>
          <el-menu-item index="/project/reg/list" v-if="role==='SYS_STUDENT'"><router-link to="/project/reg/list">回国登记</router-link></el-menu-item>

          <el-menu-item index="/project/apply/examine" v-if="role!=='SYS_STUDENT'"><router-link to="/project/apply/examine">学生申请审批</router-link></el-menu-item>
        </el-submenu>
        <el-submenu index="award">
          <template slot="title">奖学金管理</template>
          <el-menu-item index="/award/add" v-if="role==='SYS_LGB'||role==='SYS_GATB'"><router-link to="/award/add">批次设置</router-link></el-menu-item>
          <el-menu-item index="/award/list" v-if="role==='SYS_LGB'||role==='SYS_GATB'"><router-link to="/award/list">奖学金管理</router-link></el-menu-item>
          <el-menu-item index="/award/list/examine" v-if="role!=='SYS_STUDENT'"><router-link to="/award/list/examine">奖学金审批</router-link></el-menu-item>
          <el-menu-item index="/award/list/student" v-if="role==='SYS_STUDENT'"><router-link to="/award/list/student">申请奖学金</router-link></el-menu-item>

          <el-menu-item index="/award/apply/manange" v-if="role!=='SYS_STUDENT'"><router-link to="/award/apply/manange">奖学金名单管理</router-link></el-menu-item>
        </el-submenu>
        <el-submenu index="bs" v-if="role==='SYS_ADMIN'">
          <template slot="title">系统管理</template>
          <el-menu-item index="/bs/set"><router-link to="/bs/set">基础设置</router-link></el-menu-item>
          <el-menu-item index="/bs/user"><router-link to="/bs/user">用户管理</router-link></el-menu-item>
          <el-menu-item index="/bs/role"><router-link to="/bs/role">角色管理</router-link></el-menu-item>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">{{user.truename}}</template>
          <el-menu-item index="7-1" @click="switchRole">切换角色</el-menu-item>
          <el-menu-item index="7-2" @click="logout">注销</el-menu-item>
            <el-menu-item index="7-3" @click="toHelp">帮助</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <el-dialog class="switch" :visible.sync ="dialogVisible" width="30%">
      <header slot="title">切换角色</header>
      <el-select v-model="newRole" placeholder="请选择">
        <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
        </el-option>
      </el-select>
      <footer slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRole">确 定</el-button></footer>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Navigation",
    data(){
      return{
        dialogVisible:false,
        newRole:this.role,
      }
    },
    computed:{
      role() {//用户角色
        return this.$store.state.role
      },
      roleList(){
        return this.$store.state.roleList
      },
      user() {//用户信息
        return this.$store.state.user
      },
    },
    watch:{
      role(val){
        this.newRole=val;
      }
    },
    created(){
      this.newRole=this.role;
      console.log(this.role)
    },
    methods:{
      delCookie(name) {
        document.cookie = name + '=;  expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      },
      toWork(url){//根据不同身份跳转到我的工作台
        if(url === "SYS_STUDENT"){//学生
          this.$router.push({path:"/work/student"})
        }else if(url === "SYS_DEPT" || url === "SYS_LXDW"){//院系管理员、立项单位
          this.$router.push({path:"/work/xy"})
        }else if(url === "SYS_ADMIN" || url === "SYS_LGB" || url === "SYS_GATB"){//系统管理员、留管办、港澳台办
          this.$router.push({path:"/work/lgb"})
        }
      },
      logout(){
        console.log('123')
        this.$ajax.post('/logoutApi')
          .then(res=>{
            this.delCookie('APP_UUID');
            sessionStorage.clear();
            window.location.href=res.data.data.url;
          })
      },
      switchRole(){
        this.dialogVisible=true;
      },
      submitRole(){
        this.$store.commit('setRole',this.newRole);
        this.dialogVisible=false;
        this.$router.push('/');
      },
      toHelp(){
        this.$router.push({path:'help'})
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #nav{
    background: #1390d3;
    .content{
      @include flex(space-between);
      @extend %width;
      .title{
        @include flex;
        img.logo{
          width: 225px;
          margin-right: 50px;
        }
      }
      .menu{
        height: 90px;
        color: white;
        .el-menu-item{
          height: 90px;
          line-height: 90px;
          /*padding: 0 50px;*/
        }
        .el-submenu{
          height: 90px;
          line-height: 90px;
          /*padding: 0 50px;*/
          .el-submenu__title{
            height: 90px;
            line-height: 90px;
            i{
              color: white;
            }
          }
        }
      }
    }
    .switch{
      .el-select{
        display: block;
        width: 70%;
        margin: 0 auto;
      }
    }

  }
</style>
