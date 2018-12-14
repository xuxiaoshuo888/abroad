<template>
    <div class="project">
        <fieldset>
            <legend>详情</legend>
        </fieldset>
        <el-card shadow="hover">
            <header slot="header">项目</header>
            <el-form inline size="mini" disabled label-width="110px" class="form-inline">
                <el-form-item label="项目名称" class="block" prop="xmmc">
                    <el-input v-model="applyProject.xmmc" class="name"></el-input>
                </el-form-item>
                <el-form-item label="出国/出境" prop="typeid">
                    <el-select v-model="applyProject.typename" placeholder="请选择">
                        <el-option
                                v-for="item in placeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="立项单位" prop="lxdwid">
                    <el-select v-model="applyProject.lxdwmc" filterable placeholder="请选择">
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
            <el-form inline size="mini" disabled label-width="110px" class="form-inline">
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
            <el-form inline size="medium" disabled label-width="110px" class="form-inline">
                <el-form-item label="申请理由" class="block">
                    <el-input type="textarea" :autosize="{ minRows: 4}" v-model="apply.sqly" placeholder="请填写项目申请理由（2000字以内）"></el-input>
                </el-form-item>
                <el-form-item label="计划安排" class="block">
                    <el-input type="textarea" :autosize="{ minRows: 4}" v-model="apply.jhap" placeholder="如果是长期学习交流，需要填写详细学习计划（学习/会议/比赛等的内容/计划/安排）"></el-input>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card shadow="hover">
            <header slot="header">登记</header>
            <el-form inline size="medium" label-width="110px" :disabled="regName==='详情'" class="form-inline">
                <el-form-item label="到校报到时间" class="block">
                    <el-date-picker v-model="reg.dxbdsj" type="date" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
                <el-form-item label="总结" class="block">
                    <el-upload v-if="regName==='登记'"
                            :action="$proxy+'/upload/uploadFile'"
                            :limit="1" :on-success="handleSuccess0">
                        <el-button size="small" type="primary" icon="el-icon-upload">选择上传</el-button>
                        <div slot="tip" class="el-upload__tip">期间的学习经历、参加的学术交流活动/会议、比赛等的总结，字数不少于1500字</div>
                    </el-upload>
                    <a class="download" v-if="regName==='详情'&&reg.hgzj!==null" :href="$proxy+$downloadUrl+reg.hgzj">回国（入境）总结</a>
                </el-form-item>
                <el-form-item label="签证页">
                    <el-upload class="img-upload" :action="$proxy+'/upload/uploadFile'" :show-file-list="false"
                               :on-success="handleSuccess1">
                        <img v-if="reg.qzy" :src="$proxy+imgUrl+reg.qzy" class="img">
                        <i v-else class="el-icon-plus icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="出境页">
                    <el-upload class="img-upload" :action="$proxy+'/upload/uploadFile'" :show-file-list="false"
                               :on-success="handleSuccess2">
                        <img v-if="reg.cjy" :src="$proxy+imgUrl+reg.cjy" class="img">
                        <i v-else class="el-icon-plus icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="入境页">
                    <el-upload class="img-upload" :action="$proxy+'/upload/uploadFile'" :show-file-list="false"
                               :on-success="handleSuccess3">
                        <img v-if="reg.rjy" :src="$proxy+imgUrl+reg.rjy" class="img">
                        <i v-else class="el-icon-plus icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="其他资料或成果" class="block" >
                    <el-upload :action="$proxy+'/upload/uploadFile'" :file-list="cgzlList" :on-remove="handleRemove" :on-success="handleSuccess">
                        <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传doc/docx文件，且不超过2M</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label=" " class="block" v-show="regName==='登记'">
                    <el-button type="primary" @click="submitForm()">确认提交</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card shadow="hover" v-show="regName!=='登记'">
            <header slot="header">异动</header>
            <el-form inline size="medium" label-width="110px" :disabled="regName==='详情'" class="form-inline">
                <el-form-item label="异动类型">
                    <el-radio-group v-model="abnormal.ydlx">
                        <el-radio-button label="2">中止</el-radio-button>
                        <el-radio-button label="3">延期</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="延期时间" v-show="abnormal.ydlx==='3'">
                    <el-date-picker v-model="abnormal.yqsj" type="date" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
                <el-form-item label="异动原因">
                    <el-input type="textarea" v-model="abnormal.ydyy"></el-input>
                </el-form-item>
                <el-form-item label="相关材料">
                    <el-upload :action="$proxy+'/upload/uploadFile'" :file-list="ydclList" :on-remove="handleRemove" :on-success="handleSuccess">
                        <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传doc/docx文件，且不超过2M</div>
                    </el-upload>
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

        applyProject:'',//項目
        studentInfo:'',//学生基本信息
        apply:'',//申请信息
        returnInfo:'',//回国登记信息
        reg:{
          id:'',//return登记表id
          applyId:'',//申请登记id
          projectId:'',//项目id
          studentId:'',  //学生id
          hgzj:'',
          qzy:'',
          cjy:'',
          rjy:'',
          cgzl:'',
          dxbdsj:'',
          status:'1',
        },
        cgzlList:[],
        abnormal:{
          ydlx:'',
          yqsj:'',
          ydyy:'',
          ydcl:'',
        },
        ydclList:[],

        imgUrl:'/resource/showImg?path=',
        fileList:[],//upload本身上传文件
        archiveFileList:[],//附件所需结构
      };
    },
    computed: {
      role () {
        return this.$store.state.role
      },
      regId(){
        return this.$store.state.regId
      },
      regName(){
        return this.$store.state.regName
      },
    },
    created(){
      this.getInfo();
      if(this.regId===''){
        this.$router.push('/project/reg/list');
      }
    },
    methods: {
      //获取信息
      getInfo(){
        this.$ajax.post('/projectReturn/queryResult',{proResId:this.regId})
          .then(res=>{
            this.applyProject={...res.data.data.data.project.sqlRow};//项目信息
            this.studentInfo={...res.data.data.data.student};//学生信息
            this.apply={...res.data.data.data.projectResult};//申请信息
            if(res.data.data.data.projectReturn.return!==null&&this.regName==='详情'){
              this.reg={...res.data.data.data.projectReturn.return};//回国登记信息
              this.cgzlList=[...res.data.data.data.projectReturn.cgzlList];
              this.abnormal={...res.data.data.data.projectReturn.return};
              this.ydclList=[...res.data.data.data.projectReturn.ydclList];
            }
            if(res.data.data.data.projectReturn.return!==null&&this.regName!=='详情'){
              this.returnInfo={...res.data.data.data.projectReturn.return};//回国登记信息
            }
          })
      },
      //附件上传
      handleSuccess0(res,file,fileList){
        if(res.errcode==='0'){
          this.reg.hgzj=res.path;
        }
        else{
          this.$message.error(res.errmsg);
        }
      },
      //图片
      handleSuccess1(res,file,fileList){
        if(res.errcode==='0'){
          this.reg.qzy=res.path;
        }
        else{
          this.$message.error(res.errmsg);
        }
      },
      handleSuccess2(res,file,fileList){
        if(res.errcode==='0'){
          this.reg.cjy=res.path;
        }
        else{
          this.$message.error(res.errmsg);
        }
      },
      handleSuccess3(res,file,fileList){
        if(res.errcode==='0'){
          this.reg.rjy=res.path;
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
        this.reg.id=this.returnInfo.id;
        this.reg.applyId=this.apply.id;
        this.reg.studentId=this.studentInfo.id;
        this.reg.projectId=this.applyProject.id;
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
          this.reg.cgzl=JSON.stringify(this.archiveFileList);
        }
        this.$ajax.post('/projectReturn/checkIn',this.reg)
          .then(res=>{
            if(res.data.errcode==='0'){
              this.$message.success('登记成功');
              this.$router.push('/project/reg/list');
            }
            else this.$message.error(res.data.errmsg);
          })
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
        .step{//审核状况即步骤条显示问题
            .el-form-item__content{
                line-height: normal;
                width: 900px;
            }
        }
    }
</style>