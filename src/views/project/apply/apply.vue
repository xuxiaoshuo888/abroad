<template>
    <div class="project">
        <fieldset>
            <legend>学生申请表</legend>
        </fieldset>
        <el-card shadow="hover">
            <header slot="header">项目</header>
            <el-form inline size="mini" disabled label-width="110px" class="form-inline">
                <el-form-item label="项目名称" class="block" prop="xmmc">
                    <el-input v-model="applyProject.xmmc" class="name"></el-input>
                </el-form-item>
                <el-form-item label="出国/出境" prop="typeid">
                    <el-select v-model="applyProject.typeid" placeholder="请选择">
                        <el-option
                                v-for="item in placeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="立项单位" prop="lxdwid">
                    <el-select v-model="applyProject.lxdwid" filterable placeholder="请选择">
                        <el-option
                                v-for="item in deptList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目负责人" prop="xmfzr">
                    <el-input class="select" v-model="applyProject.xmfzr"></el-input>
                </el-form-item>
                <el-form-item label="负责人电话" prop="xmfzrdh">
                    <el-input class="select" v-model="applyProject.xmfzrdh"></el-input>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card shadow="hover">
            <header slot="header">学生基本信息</header>
            <el-form inline size="mini" label-width="110px" class="form-inline">
                <el-form-item label="姓名">
                    <el-input v-model="studentInfo.xm" disabled></el-input>
                </el-form-item>
                <el-form-item label="学号">
                    <el-input v-model="studentInfo.xh" disabled></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="studentInfo.xb" disabled></el-input>
                </el-form-item>
                <el-form-item label="学院">
                    <el-input v-model="studentInfo.xy" disabled></el-input>
                </el-form-item>
                <el-form-item label="专业">
                    <el-input v-model="studentInfo.zy" disabled></el-input>
                </el-form-item>
                <el-form-item label="班级">
                    <el-input v-model="studentInfo.bj" disabled></el-input>
                </el-form-item>
                <el-form-item label="培养层次">
                    <el-input v-model="studentInfo.pycc" disabled></el-input>
                </el-form-item>
                <el-form-item label="政治面貌">
                    <el-input v-model="studentInfo.zzmm" disabled></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                    <el-select v-model="apply.zjlx" placeholder="请选择">
                        <el-option label="护照" value="护照"></el-option>
                        <el-option label="身份证" value="身份证"></el-option>
                        <el-option label="台胞证" value="台胞证"></el-option>
                        <el-option label="回乡证" value="回乡证"></el-option>
                        <el-option label="港澳台居民居住证" value="港澳台居民居住证"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码">
                    <el-input v-model="apply.zjhm"></el-input>
                </el-form-item>
                <el-form-item label="外语语种">
                    <el-input v-model="apply.wyyz"></el-input>
                </el-form-item>
                <el-form-item label="外语水平">
                    <el-input v-model="apply.wysp"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="apply.lxdh"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱">
                    <el-input v-model="apply.email"></el-input>
                </el-form-item>
                <el-form-item label="健康状况">
                    <el-input v-model="apply.jkzk"></el-input>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card shadow="hover">
            <header slot="header">申请表</header>
            <el-form inline size="medium" label-width="110px" class="form-inline">
                <el-form-item label="申请理由" class="block">
                    <el-input type="textarea" :autosize="{ minRows: 4}" v-model="apply.sqly" placeholder="请填写项目申请理由（2000字以内）"></el-input>
                </el-form-item>
                <el-form-item label="计划安排" class="block">
                    <el-input type="textarea" :autosize="{ minRows: 4}" v-model="apply.jhap" placeholder="如果是长期学习交流，需要填写详细学习计划（学习/会议/比赛等的内容/计划/安排）"></el-input>
                </el-form-item>
                <el-form-item label="成绩单">
                    <el-upload class="img-upload" :action="$proxy+'/upload/uploadFile'" :show-file-list="false"
                               :on-success="handleSuccess1">
                        <img v-if="apply.cjd" :src="$proxy+imgUrl+apply.cjd" class="img">
                        <i v-else class="el-icon-plus icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="外语成绩证明">
                    <el-upload class="img-upload" :action="$proxy+'/upload/uploadFile'" :show-file-list="false"
                               :on-success="handleSuccess2">
                        <img v-if="apply.wycjzm" :src="$proxy+imgUrl+apply.wycjzm" class="img">
                        <i v-else class="el-icon-plus icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="护照首页">
                    <el-upload class="img-upload" :action="$proxy+'/upload/uploadFile'" :show-file-list="false"
                               :on-success="handleSuccess3">
                        <img v-if="apply.hzsy" :src="$proxy+imgUrl+apply.hzsy" class="img">
                        <i v-else class="el-icon-plus icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="其他材料" class="block" >
                    <el-upload :action="$proxy+'/upload/uploadFile'" :on-remove="handleRemove" :on-success="handleSuccess">
                        <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传doc/docx文件，且不超过2M</div>
                    </el-upload>
                </el-form-item>
                <el-form-item class="submit">
                    <el-button type="primary" @click="submitForm()">确认提交</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
  export default {
    name: "project",
    data() {
      return {
        placeList:[],
        deptList:[],
        studentInfo:'',//学生基本信息
        apply:{
          projectId:'',//项目id
          studentId:'',  //学生id
          zjlx:'', //证件类型
          zjhm:'', //证件号码
          wyyz:'', //外语语种
          wysp:'', //外语水平
          lxdh:'', //联系电话
          email:'', //电子邮箱
          jkzk:'', //健康状况
          sqly:'', //申请理由
          jhap:'',  // 出国（境）学习/会议/比赛等的内容/计划/安排
          cjd:'',  // 成绩单
          wycjzm:'', //外语成绩证明
          hzsy:'', //护照首页
          qtfile:'',  //其它项目申请要求材料
        },
        imgUrl:'/resource/showImg?path=',
        fileList:[],//upload本身上传文件
        archiveFileList:[],//附件所需结构
      };
    },
    computed: {
      role () {
        return this.$store.state.role
      },
      applyProject(){
        return this.$store.state.applyProject
      }
    },
    created(){
      this.getInfo();
      if(!this.applyProject.id){
        this.$router.push('/project/list/student');
      }
    },
    methods: {
      //获取信息
      getInfo(){
        this.$ajax.post('student/getInfo')
          .then(res=>{
            this.studentInfo=res.data.data.data;
          })
      },
      //附件上传
      //图片
      handleSuccess1(res,file,fileList){
        if(res.errcode==='0'){
          this.apply.cjd=res.path;
        }
        else{
          this.$message.error(res.errmsg);
        }
      },
      handleSuccess2(res,file,fileList){
        if(res.errcode==='0'){
          this.apply.wycjzm=res.path;
        }
        else{
          this.$message.error(res.errmsg);
        }
      },
      handleSuccess3(res,file,fileList){
        if(res.errcode==='0'){
          this.apply.hzsy=res.path;
        }
        else{
          this.$message.error(res.errmsg);
        }
      },
      //删除
      handleRemove(file,fileList){
        console.log(file);
        let path=file.url?file.url:file.response.path;
        this.$ajax.post('/resource/deleteFile',{path:path})
          .then(res=>{
            if(res.data.errcode==='0'){
              this.fileList=[...fileList];
              console.log(this.fileList)
            }
            else{
              this.$message.error(res.data.errmsg);
            }
          });
      },
      //上传成功
      handleSuccess(res,file,fileList){
        if(res.errcode==='0'){
          this.fileList=[...fileList];
          console.log(this.fileList)
        }
        else{
          this.$message.error(res.message);
        }
      },
      //提交
      submitForm() {
        this.apply.projectId=this.applyProject.id;
        this.archiveFileList=[];
        for(let i=0;i<this.fileList.length;i++){
          if(this.fileList[i].response){
            this.archiveFileList.push({
              url:this.fileList[i].response.path,
              name:this.fileList[i].name
            });
          }
          else this.archiveFileList.push({
            url:this.fileList[i].url,
            name:this.fileList[i].name
          });
        }
        if(this.archiveFileList.length>0){
          this.apply.qtfile=JSON.stringify(this.archiveFileList);
        }
        this.$ajax.post('/projectApply/add',this.apply)
          .then(res=>{
            if(res.data.errcode==='0'){
              this.$message.success('申请已提交');
              this.$router.push('/project/apply/list');
            }
            else this.$message.error(res.data.errmsg);
          })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss">
    .project{
        @extend %width;
        .name{//项目名称长度
            width: 554px
        }
        .img-upload{

        }
    }
</style>