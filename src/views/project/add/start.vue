<template>
    <div class="project">
        <fieldset>
            <legend>立项须知</legend>
        </fieldset>
        <div class="content">
            <el-card class="box-card">
                <header slot="header">出国项目</header>
                <p class="title">一、立项报批</p>
                <p>申请因公赴港澳交流，请申请人至少提前6周向港澳台事务办公室提供以下材料：</p>
                <p>1. 华中师范大学因公出国（境）申报表（分校领导、正处级、副处级、教职工、研究生、本科生六种，需学院书记或院长签字盖章；如果是涉密人员，还需报保密办登记、签字）；</p>
                <p>2. 邀请信及中文翻译件3份；</p>
                <p>……</p>
                <p>由港澳台办审核后报学校、省外办审批下发任务批件</p>
                <p class="title">二、办理赴港澳通行证及签注</p>
                <p>在获得省外办的任务批件后，港澳台事务办公室将协助代为办理因公往来香港、澳门特别行政区通行证。所需材料：</p>
                <p>1. 申请因公往来香港、澳门特别行政区通行证及签注事项表；</p>
                <p>……</p>
                <div class="center"><el-checkbox v-model="checked">已阅读并同意以上规定</el-checkbox></div>
                <div class="center"><router-link to="/form/project"><el-button type="primary">开始办理</el-button></router-link></div>
            </el-card>
            <el-card class="box-card">
                <header slot="header">出境项目</header>
            </el-card>
        </div>
    </div>
</template>

<script>
  export default {
    name: "project",
    data() {
      return {
        checked: false
      }
    }
  }
</script>

<style lang="scss">
    .project{
        .content{
            @include flex(space-around,flex-start);
            @extend %width;
            .box-card{
                width: 400px;
                header{
                    font-size: 16px;
                }
                p{
                    &.title{
                        font-size: 14px;
                    }
                    font-size: 13px;
                }
                .center{
                    text-align: center;
                    .el-checkbox{
                        margin-bottom: 8px;
                    }
                }
            }
        }
    }
</style>