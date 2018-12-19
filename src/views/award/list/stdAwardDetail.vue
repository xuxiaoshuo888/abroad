<template>
    <div class="project">
        <fieldset>
            <legend>奖学金申请表详情</legend>
        </fieldset>
        <el-card shadow="hover">
            <header slot="header">奖学金信息</header>
            <el-form disabled inline size="medium" :model="form" ref="form" label-width="110px" class="form-inline">
                <el-form-item label="奖学金名称" class="block" prop="name">
                    <el-input v-model="form.name" class="name"></el-input>
                </el-form-item>
                <el-form-item label="奖学金年度" prop="nd">
                    <el-select v-model="form.nd" placeholder="请选择">
                        <el-option
                                v-for="item in ndList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="奖学金批次" prop="pc">
                    <el-select v-model="form.pc" placeholder="请选择">
                        <el-option label="春季" value="春季"></el-option>
                        <el-option label="秋季" value="秋季"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请开始时间" prop="sqkssj">
                    <el-date-picker class="select" v-model="form.sqkssj" type="date"
                                    value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="申请结束时间" prop="sqjzsj">
                    <el-date-picker class="select" v-model="form.sqjzsj" type="date"
                                    value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="关联项目名称" class="block">
                    <el-tag v-for="i in form.projectlist" :key="i.id" type="success" style="margin-right: 10px">
                        {{i.xmmc}}
                    </el-tag>
                </el-form-item>
                <el-form-item label="申请对象" class="block">
                    <el-input type="textarea" :autosize="{ minRows: 2}" v-model="form.sqdx"
                              placeholder="请填写申请对象"></el-input>
                </el-form-item>
                <el-form-item label="资助范围和额度" class="block">
                    <el-input type="textarea" :autosize="{ minRows: 2}" v-model="form.zzfwed"
                              placeholder="请填写资助范围和额度"></el-input>
                </el-form-item>
                <el-form-item label="申请资格" class="block">
                    <el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.sqzg"
                              placeholder="请填写学生申请本项目的资格要求"></el-input>
                </el-form-item>
                <el-form-item label="咨询电话" prop="zxdh">
                    <el-input class="select" v-model="form.zxdh"></el-input>
                </el-form-item>
                <el-form-item label="项目材料上传" class="block">
                    <!--<a class="download" v-for="i in JSON.parse(form.fjzl)" :key="i.id" :href="$proxy+$downloadUrl+i.url">{{i.name}}</a>-->
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
                <el-form-item label="培养层次">
                    <el-input v-model="studentInfo.pycc" disabled></el-input>
                </el-form-item>
                <el-form-item label="学生类别">
                    <el-input v-model="studentInfo.xxlb" disabled></el-input>
                </el-form-item>
                <el-form-item label="政治面貌">
                    <el-input v-model="studentInfo.zzmm" disabled></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                    <el-input v-model="studentInfo.zjlx" disabled></el-input>
                </el-form-item>
                <el-form-item label="证件号码">
                    <el-input v-model="studentInfo.zjhm" disabled></el-input>
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
                <el-form-item label="关联项目" class="block">
                    <el-select disabled v-model="apply.projectId" placeholder="请选择" @change="changeProject">
                        <el-option
                                v-for="item in awardProject"
                                :key="item.id"
                                :label="item.xmmc"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label=" " class="block tag-margin" v-if="awardProjectSelect.xmlbname">
                    <el-tag size="medium">项目类别:{{awardProjectSelect.xmlbname}}</el-tag>
                    <el-tag type="success" size="medium">经费类型:{{awardProjectSelect.jflyname}}</el-tag>
                    <el-tag type="info" size="medium">项目起止时间:{{awardProjectSelect.xmkssj.substring(0,10)}} 至
                        {{awardProjectSelect.xmzzsj.substring(0,10)}}
                    </el-tag>
                </el-form-item>
                <el-form-item label="国家（地区）">
                    <el-select disabled v-model="apply.gjdq" filterable placeholder="选择交换/交流国家（地区）">
                        <el-option
                                v-for="item in countryList"
                                :key="item.id"
                                :label="item.value"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="院校/教育机构" prop="jyjg">
                    <el-input disabled class="select" v-model="apply.jyjg"></el-input>
                </el-form-item>
                <el-form-item label="留学方式">
                    <el-select disabled v-model="apply.lxfs" filterable placeholder="请选择">
                        <el-option
                                v-for="item in abroadWayList"
                                :key="item.id"
                                :label="item.value"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学习交流情况" class="block">
                    <el-input disabled type="textarea" :autosize="{ minRows: 4}" v-model="apply.xxjlqk"
                              placeholder="请填写在海外学习交流的主要内容和活动（300字以内）"></el-input>
                </el-form-item>
                <el-form-item label="获得的课程证明">
                    <el-upload disabled class="img-upload" :action="$proxy+'/upload/uploadFile'" :show-file-list="false"
                               :on-success="handleSuccess1">
                        <img v-if="apply.kczm" :src="$proxy+imgUrl+apply.kczm" class="img">
                        <i v-else class="el-icon-plus icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="学分证明">
                    <el-upload disabled class="img-upload" :action="$proxy+'/upload/uploadFile'" :show-file-list="false"
                               :on-success="handleSuccess2">
                        <img v-if="apply.xfzm" :src="$proxy+imgUrl+apply.xfzm" class="img">
                        <i v-else class="el-icon-plus icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="证书">
                    <el-upload disabled class="img-upload" :action="$proxy+'/upload/uploadFile'" :show-file-list="false"
                               :on-success="handleSuccess3">
                        <img v-if="apply.zs" :src="$proxy+imgUrl+apply.zs" class="img">
                        <i v-else class="el-icon-plus icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="评语">
                    <el-upload disabled class="img-upload" :action="$proxy+'/upload/uploadFile'" :show-file-list="false"
                               :on-success="handleSuccess4">
                        <img v-if="apply.py" :src="$proxy+imgUrl+apply.py" class="img">
                        <i v-else class="el-icon-plus icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="成绩单">
                    <el-upload disabled class="img-upload" :action="$proxy+'/upload/uploadFile'" :show-file-list="false"
                               :on-success="handleSuccess5">
                        <img v-if="apply.cjd" :src="$proxy+imgUrl+apply.cjd" class="img">
                        <i v-else class="el-icon-plus icon"></i>
                    </el-upload>
                </el-form-item>
                <!--<el-form-item label="交流报告总结" class="block">-->
                    <!--<el-upload disabled :action="$proxy+'/upload/uploadFile'"-->
                               <!--:limit="1" :on-success="handleSuccess0" :file-list="zjList">-->
                        <!--<el-button size="small" type="primary" icon="el-icon-upload">选择上传</el-button>-->
                        <!--<div slot="tip" class="el-upload__tip">※ 学生自主完成，必交材料</div>-->
                    <!--</el-upload>-->
                <!--</el-form-item>-->
                <!--<el-form-item class="submit">-->
                    <!--<el-button type="primary" @click="submitForm()">确认提交</el-button>-->
                <!--</el-form-item>-->
            </el-form>
        </el-card>
    </div>
</template>

<script>
  export default {
    name: "stdAwardDetail",
    data() {
      return {
        ndList: [],//奖学金年度
        form: {//奖学金信息表单
          roleId: '',
          projectlist: [],//项目列表
          name: '',//
          nd: '',//学年
          pc: '',//春季/秋季
          sqkssj: '',//申请开始时间
          sqjzsj: '',//申请截止时间
          sqdx: '',//申请对象（本、硕、博）
          zzfwed: '',//资助范围和额度
          sqzg: '',//申请资格
          zxdh: '',//咨询电话
          fjzl: '',//附件资料
        },

        placeList: [],
        deptList: [],

        studentInfo: '',//学生基本信息

        awardProject: [],//学生满足奖学金的项目列表
        awardProjectSelect: {},//学生满足奖学金的项目选择项

        countryList: [],//国家列表
        abroadWayList: [],//留学方式列表
        apply: {
          pcId: '',//奖学金批次id
          projectId: '',//项目id
          lxdh: '', //联系电话
          email: '', //电子邮箱
          jkzk: '', //健康状况
          gjdq: '',//'国家（地区）'
          jyjg: '',//'院校/教育机构'
          lxfs: '',//'留学方式：学校选派/学院选派/自主出国'
          xxjlqk: '',//'学习交流情况：介绍申请人在海外学习交流的主要内容和活动（不超过300字）'
          kczm: '',//'获得的课程证明（上传照片）'
          xfzm: '',//'学分证明（上传照片）'
          zs: '',//'证书（上传照片）'
          py: '',//'评语（上传照片）'
          cjd: '',//'成绩单（上传照片）'
          xxjlzj: '',//'学习交流总结报告'
        },
        imgUrl: '/resource/showImg?path=',
        fileList: [],//upload本身上传文件
        archiveFileList: [],//附件所需结构

        zjList: [],//获取的登记总结


        //后来添加的申请表的信息
        glxm: '',//关联项目
      };
    },
    computed: {
      role() {
        return this.$store.state.role
      },
      awardData() {
        console.log(this.$store.state.awardData)
        return this.$store.state.awardData
      },
      stdInfo1() {
        return this.$store.state.stdInfo1
      }
    },
    created() {
      console.log(this.$store.state.awardData)
      console.log(this.$store.state.stdInfo1)
      if (!this.awardData.id) {
        this.$router.push('/award/list/student');
      }
      else {
        this.form = {...this.awardData};
        this.getInfo();
        this.getList();
      }
    },
    mounted() {
      if (this.stdInfo1) {
        this.apply.lxdh = this.stdInfo1.data.lxdh
        this.apply.jkzk = this.stdInfo1.data.jkzk
        this.apply.email = this.stdInfo1.data.email
      }
      this.getApplyInfo()
    },
    methods: {
      //获取已填写的申请表单的信息
      getApplyInfo() {
        this.$ajax.post('/jxjApply/toView', {id: this.awardData.applyid})
            .then(res => {
              // this.countryList=res.data.data.data;
              console.log(res.data.data.data)
              this.apply = res.data.data.data.apply
              this.glxm = res.data.data.data
            });
      },
      //获取下拉列表
      getList() {
        //国家列表
        this.$ajax.post('/code/findCountries')
            .then(res => {
              this.countryList = res.data.data.data;
            });
        //留学方式
        this.$ajax.post('/code/findSonCode', {fatherId: '405'})
            .then(res => {
              this.abroadWayList = res.data.data.data;
            })
      },
      //获取信息
      getInfo() {
        this.$ajax.post('/student/getInfo')
            .then(res => {
              this.studentInfo = res.data.data.data;
              // this.apply.email = res.data.data.data.email
              // this.apply.lxdh = res.data.data.data.lxdh
              // this.apply.jkzk = res.data.data.data.jkzk
            })
        this.$ajax.post('/jxjApply/toAdd', {id: this.awardData.id})
            .then(res => {
              this.awardProject = res.data.data.data.jPcProjectList;
            })
      },
      //关联项目改变
      changeProject(val) {
        for (let i = 0; i < this.awardProject.length; i++) {
          if (this.awardProject[i].id === val) {
            this.awardProjectSelect = this.awardProject[i];
          }
        }
        this.$ajax.post('/projectReturn/getJlbg', {id: val})
            .then(res => {
              if (res.data.errcode === '0') {
                this.zjList = [{name: '登记总结', url: res.data.data.data.hgzj}];
                this.apply.xxjlzj = res.data.data.data.hgzj;
              }
              else this.$message.error(res.data.errmsg);
            })
      },
      //附件上传
      //图片
      handleSuccess1(res) {
        if (res.errcode === '0') {
          this.apply.kczm = res.path;
        }
        else {
          this.$message.error(res.errmsg);
        }
      },
      handleSuccess2(res) {
        if (res.errcode === '0') {
          this.apply.xfzm = res.path;
        }
        else {
          this.$message.error(res.errmsg);
        }
      },
      handleSuccess3(res) {
        if (res.errcode === '0') {
          this.apply.zs = res.path;
        }
        else {
          this.$message.error(res.errmsg);
        }
      },
      handleSuccess4(res) {
        if (res.errcode === '0') {
          this.apply.py = res.path;
        }
        else {
          this.$message.error(res.errmsg);
        }
      },
      handleSuccess5(res) {
        if (res.errcode === '0') {
          this.apply.cjd = res.path;
        }
        else {
          this.$message.error(res.errmsg);
        }
      },
      handleSuccess0(res) {
        if (res.errcode === '0') {
          this.apply.xxjlzj = res.path;
        }
        else {
          this.$message.error(res.errmsg);
        }
      },

      //提交
      submitForm() {
        this.apply.pcId = this.awardData.id;
        this.$ajax.post('/jxjApply/add', this.apply)
            .then(res => {
              if (res.data.errcode === '0') {
                this.$message.success('申请已提交');
                this.$router.push('/award/list/student');
              }
              else this.$message.error(res.data.errmsg);
            })
      },
    }
  }
</script>

<style lang="scss">
    .project {
        @extend %width;
        .name { //项目名称长度
            width: 554px
        }
        .tag-margin {
            .el-tag {
                margin-right: 10px;
            }
        }
    }
</style>