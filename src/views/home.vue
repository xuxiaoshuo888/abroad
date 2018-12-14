<template>
    <div class="home">
        <template v-if="role!=='SYS_STUDENT'">
            <fieldset>
                <legend>立项须知</legend>
            </fieldset>
            <el-card class="card">
                <el-card :body-style="{ padding: '10px'}" v-for="i in text" :key="i.id">
                    <header slot="header">{{i.name}}</header>
                    <el-card :body-style="{ padding: '10px'}">
                        <el-card class="every" :body-style="{ padding: '10px'}"><p>{{i.content}}</p></el-card>
                    </el-card>
                </el-card>
            </el-card>
        </template>
        <el-card v-else :body-style="{ padding: '10px',textAlign:'center',marginTop:'20px' }" style="margin-top: 20px">
            <img src="8.jpg"/>
            <div style="padding: 14px 0 10px;">
                <span>南湖浪涌，桂香灵动</span>
                <div class="bottom">
                    <el-button type="text" class="button">百年求索路，桃红李白映苍穹</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        text:[],
      }
    },
    computed: {
      role () {
        return this.$store.state.role
      }
    },
    created(){
      this.$ajax.post('/projectType/list')
        .then(res=>{
          if(res.data.errcode==='0'){
            this.text=res.data.data.data;
          }
        })
    },
  }
</script>

<style scoped lang="scss">
    .home{
        @extend %width;
        .card .el-card__body{
            @include flex;
            .every{
                min-height: 200px;
                p{
                    text-indent: 2em;
                }
            }
        }
    }
</style>