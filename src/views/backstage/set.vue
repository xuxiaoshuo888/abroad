<template>
    <div class="set">
        <fieldset>
            <legend>设置</legend>
        </fieldset>
        <el-card>
            <header slot="header">基本設置</header>
            <el-form label-width="150px">
                <el-form-item label="网站名称">
                    <el-input
                            placeholder="请输入内容"
                            v-model="form.siteName"
                            clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="出国项目描述说明">
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 4}"
                            placeholder="请输入内容"
                            v-model="form.abroadDes">
                    </el-input>
                </el-form-item>
                <el-form-item label="出境项目描述说明">
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 4}"
                            placeholder="请输入内容"
                            v-model="form.exitDes">
                    </el-input>
                </el-form-item>
                <el-form-item label="版权信息">
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 4}"
                            placeholder="请输入内容"
                            v-model="form.copyright">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确认保存</el-button>
                    <el-button type="primary" @click="test1">更新数据</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
  export default {
    name: "set",
    data() {
      return {
        form:{
          siteName:'',
          abroadDes:'',
          exitDes:'',
          copyright:''
        }
      }
    },
    created(){
      this.getData();
    },
    methods: {
      getData(){
        this.$ajax.post('/projectType/list')
          .then(res=>{
            if(res.data.errcode==='0'){
              this.form.abroadDes=res.data.data.data[0].content;
              this.form.exitDes=res.data.data.data[1].content;
            }
          })
      },
      onSubmit() {
        this.$ajax.post('/projectType/update',this.form)
          .then(res=>{
            this.$message.success(res.data.errmsg);
          })
      },
      test1(){
        this.$ajax.post('/config/updateSj')
            .then(res=>{})
      }
    }
  }
</script>

<style lang="scss">
    .set{
        @extend %width;
    }
</style>