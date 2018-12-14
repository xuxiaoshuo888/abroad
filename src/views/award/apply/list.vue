<template>
    <div class="project">
        <fieldset>
            <legend>学生申请名单</legend>
        </fieldset>
        <el-card shadow="hover">
            <el-tabs v-model="formSearch.status" @tab-click="handleClick">
                <el-tab-pane label="待审批" name="0">
                    <el-table :data="tableData" size="medium" border @row-dblclick="rowDblclick">
                        <el-table-column prop="std_xh" label="学号" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="std_xm" label="姓名" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="std_xy" label="学院" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="std_zy" label="专业" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="std_pycc" label="培养层次" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="std_xslb" label="学生类别" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="lxdh" label="联系电话" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="lxdwmc" label="立项单位" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="xmlbxname" label="项目起止时间" show-overflow-tooltip align="center">
                            <template slot-scope="scope">
                                {{scope.row.xmkssj.substring(0,10)}} 至 {{scope.row.xmjssj.substring(0,10)}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="lxfsname" label="留学方式" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="when_created" label="学生申请时间" width="80" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column label="操作" width="80" align="center">
                            <template slot-scope="scope">
                                <el-button @click="handleApprove(scope.row)" type="primary" size="mini" plain>审批</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="已通过" name="1">
                    <el-table :data="tableData" size="medium" border @row-dblclick="rowDblclick">
                        <el-table-column prop="std_xh" label="学号" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="std_xm" label="姓名" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="std_xy" label="学院" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="std_zy" label="专业" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="std_pycc" label="培养层次" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="std_xslb" label="学生类别" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="lxdh" label="联系电话" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="lxdwmc" label="立项单位" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="xmlbxname" label="项目起止时间" show-overflow-tooltip align="center">
                            <template slot-scope="scope">
                                {{scope.row.xmkssj.substring(0,10)}} 至 {{scope.row.xmjssj.substring(0,10)}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="lxfsname" label="留学方式" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="when_created" label="学生申请时间" width="80" show-overflow-tooltip align="center"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="未通过" name="9">
                    <el-table :data="tableData" size="medium" border @row-dblclick="rowDblclick">
                        <el-table-column prop="std_xh" label="学号" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="std_xm" label="姓名" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="std_xy" label="学院" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="std_zy" label="专业" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="std_pycc" label="培养层次" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="std_xslb" label="学生类别" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="lxdh" label="联系电话" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="lxdwmc" label="立项单位" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="xmlbxname" label="项目起止时间" show-overflow-tooltip align="center">
                            <template slot-scope="scope">
                                {{scope.row.xmkssj.substring(0,10)}} 至 {{scope.row.xmjssj.substring(0,10)}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="lxfsname" label="留学方式" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="when_created" label="学生申请时间" width="80" show-overflow-tooltip align="center"></el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
            <el-pagination class="pagination"
                           @current-change="handleCurrentChange"
                           :current-page="formSearch.page"
                           @size-change="handleSizeChange"
                           :page-sizes="[10, 20, 50, 100, 200, 500]"
                           :page-size="formSearch.limit"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total">
            </el-pagination>
        </el-card>
        <el-dialog :visible.sync="dialogVisible" width="80%">
            <!--<header slot="title">{{dialogName}}</header>-->
            <el-card shadow="never">
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
                        <el-date-picker class="select" v-model="form.sqkssj" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="申请结束时间" prop="sqjzsj">
                        <el-date-picker class="select" v-model="form.sqjzsj" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="关联项目名称">
                        <el-tag v-for="i in form.projectlist" :key="i.id" type="success" style="margin-right: 10px">{{i.xmmc}}</el-tag>

                    </el-form-item>
                    <el-form-item label="申请对象" class="block">
                        <el-input type="textarea" :autosize="{ minRows: 2}" v-model="form.sqdx" placeholder="请填写申请对象"></el-input>
                    </el-form-item>
                    <el-form-item label="资助范围和额度" class="block">
                        <el-input type="textarea" :autosize="{ minRows: 2}" v-model="form.zzfwed" placeholder="请填写资助范围和额度"></el-input>
                    </el-form-item>
                    <el-form-item label="申请资格" class="block">
                        <el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.sqzg" placeholder="请填写学生申请本项目的资格要求"></el-input>
                    </el-form-item>
                    <el-form-item label="咨询电话" prop="zxdh">
                        <el-input class="select" v-model="form.zxdh"></el-input>
                    </el-form-item>
                    <el-form-item label="项目材料上传" class="block">
                        <a class="download" v-for="i in JSON.parse(form.fjzl)" :key="i.id" :href="$proxy+$downloadUrl+i.url">{{i.name}}</a>
                    </el-form-item>
                </el-form>
            </el-card>
            <el-card shadow="never">
                <header slot="header">学生基本信息</header>
                <el-form disabled inline size="mini" label-width="110px" class="form-inline">
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
                <el-form disabled inline size="medium" label-width="110px" class="form-inline">
                    <el-form-item label="关联项目" class="block tag-margin">
                        <el-tag size="medium">项目类别:{{apply.xmlbname}}</el-tag>
                        <el-tag type="success" size="medium">经费类型:{{apply.jflyname}}</el-tag>
                        <el-tag type="info" size="medium">项目起止时间:{{apply.xmkssj}} 至 {{apply.xmjssj}}</el-tag>
                    </el-form-item>
                    <el-form-item label="国家（地区）">
                        <el-select v-model="apply.gjdq" filterable placeholder="选择交换/交流国家（地区）">
                            <el-option
                                    v-for="item in countryList"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="院校/教育机构" prop="jyjg">
                        <el-input class="select" v-model="apply.jyjg"></el-input>
                    </el-form-item>
                    <el-form-item label="留学方式">
                        <el-select v-model="apply.lxfs" filterable placeholder="请选择">
                            <el-option
                                    v-for="item in abroadWayList"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学习交流情况" class="block">
                        <el-input type="textarea" :autosize="{ minRows: 4}" v-model="apply.xxjlqk" placeholder="请填写在海外学习交流的主要内容和活动（300字以内）"></el-input>
                    </el-form-item>
                    <el-form-item label="获得的课程证明">
                        <el-upload class="img-upload" :action="$proxy+'/upload/uploadFile'" :show-file-list="false">
                            <img v-if="apply.kczm" :src="$proxy+imgUrl+apply.kczm" class="img">
                            <i v-else class="el-icon-plus icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="学分证明">
                        <el-upload class="img-upload" :action="$proxy+'/upload/uploadFile'" :show-file-list="false">
                            <img v-if="apply.xfzm" :src="$proxy+imgUrl+apply.xfzm" class="img">
                            <i v-else class="el-icon-plus icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="证书">
                        <el-upload class="img-upload" :action="$proxy+'/upload/uploadFile'" :show-file-list="false">
                            <img v-if="apply.zs" :src="$proxy+imgUrl+apply.zs" class="img">
                            <i v-else class="el-icon-plus icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="评语">
                        <el-upload class="img-upload" :action="$proxy+'/upload/uploadFile'" :show-file-list="false">
                            <img v-if="apply.py" :src="$proxy+imgUrl+apply.py" class="img">
                            <i v-else class="el-icon-plus icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="成绩单">
                        <el-upload class="img-upload" :action="$proxy+'/upload/uploadFile'" :show-file-list="false">
                            <img v-if="apply.cjd" :src="$proxy+imgUrl+apply.cjd" class="img">
                            <i v-else class="el-icon-plus icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="交流报告总结" class="block">
                        <a class="download" :href="$proxy+$downloadUrl+apply.xxjlzj" target="_blank">《华中师范大学学生海外学习交流总结报告》</a>
                    </el-form-item>
                    <el-form-item label="审核状况" class="block step">
                        <el-steps :active="apply.xl" finish-status="success" :space="400">
                            <el-step v-for="i in apply.processdatalist" :key="i.id" :description="i.spyj">
                                <template slot="title">
                                    <span v-if="i.status==='0'">{{i.step_name}}待审核</span>
                                    <span v-else-if="i.status==='1'">{{i.step_name}}审核通过</span>
                                    <span v-else-if="i.status==='9'">{{i.step_name}}审核不通过</span>
                                </template>
                            </el-step>
                        </el-steps>
                    </el-form-item>
                </el-form>
            </el-card>
            <el-card shadow="hover" v-if="!disable">
                <header slot="header">审批</header>
                <el-form :disabled="disable" inline size="medium" label-width="110px" class="form-inline">
                    <el-form-item label="审批">
                        <el-radio-group v-model="examine.status">
                            <el-radio-button label="1">通过</el-radio-button>
                            <el-radio-button label="9">不通过</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="审批意见">
                        <el-input type="textarea" v-model="examine.spyj"></el-input>
                    </el-form-item>
                    <el-form-item label=" " class="block">
                        <el-button type="primary" @click="submitApprove()">确认提交</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-dialog>
    </div>
</template>

<script>

  export default {
    name: "project",
    data() {
      return {
        ndList:[],//奖学金年度
        countryList:[],//国家列表
        abroadWayList:[],//留学方式列表
        studentInfo:'',
        apply:{
          pcId:'',//奖学金批次id
          projectId:'',//项目id
          lxdh:'', //联系电话
          email:'', //电子邮箱
          jkzk:'', //健康状况
          gjdq:'',//'国家（地区）'
          jyjg:'',//'院校/教育机构'
          lxfs:'',//'留学方式：学校选派/学院选派/自主出国'
          xxjlqk:'',//'学习交流情况：介绍申请人在海外学习交流的主要内容和活动（不超过300字）'
          kczm:'',//'获得的课程证明（上传照片）'
          xfzm:'',//'学分证明（上传照片）'
          zs:'',//'证书（上传照片）'
          py:'',//'评语（上传照片）'
          cjd:'',//'成绩单（上传照片）'
          xxjlzj:'',//'学习交流总结报告'
        },
        imgUrl:'/resource/showImg?path=',

        deptList:[],//单位部门列表
        fundsList:[],//经费来源
        typeList:[],//类型级联列表
        props:{
          value:'id',
          label:'value',
          children:'sonList',
        },
        formSearch: {
          roleId:"",
          status:'0',
          //分页
          page:1,//当前
          limit:10,
        },
        tableData: [],
        row:{},
        total:1,//总页数

        dialogVisible:false,//弹框是否显示
        dialogName:'',//弹框名
        disable:true,//彈出表单是否不可填
        //审批提交信息
        examine:{
          roleId:'',
          id:'',
          spyj:'',
          status:'',
        }
      }
    },
    computed: {
      role () {
        return this.$store.state.role
      },
      form(){
        return this.$store.state.awardData
      }
    },
    created(){
      if(this.form.id){
        this.getTableData();
      }
      else this.$router.push('/award/list/examine')
    },
    methods: {
      //获取表格数据
      getTableData(){
        this.formSearch.roleId=this.role;
        this.formSearch.pcId=this.form.id;
        this.$ajax.post('/jxjApprove/page',this.formSearch)
          .then(res=>{
            if(res.data.errcode==='0'){
              this.total=res.data.data.data.records;
              this.tableData=res.data.data.data.rows;
            }
            else this.$message.error(res.data.errmsg);
          })
      },
      //表格行双击
      rowDblclick(row){
        this.apply={...row};
        this.$ajax.post('/student/getInfoById',{studentId:row.student_id})
          .then(res=>{
            this.studentInfo={...res.data.data.data};
          })
        this.dialogVisible=true;
        this.disable=true;
        this.dialogName='详情';
      },
      //tab切换
      handleClick() {
        this.getTableData();
      },
      //操作按钮
      //审批
      handleApprove(row){
        this.apply={...row};
        this.$ajax.post('/student/getInfoById',{studentId:row.student_id})
          .then(res=>{
            this.studentInfo={...res.data.data.data};
          })
        this.dialogVisible=true;
        this.disable=false;
        this.dialogName='详情';
      },
      submitApprove(){
        this.examine.roleId=this.role;
        this.examine.id=this.apply.id;
        this.$ajax.post('/jxjApprove/approve',this.examine)
          .then(res=>{
            this.handleCurrentChange(1);
            this.dialogVisible=false;
            this.$message.success(res.data.errmsg);
          })
      },
      //分页
      //每页条数改变
      handleSizeChange(val) {
        this.formSearch.limit=val;
        this.formSearch.page=1;
        this.getTableData();
      },
      //当前页改变
      handleCurrentChange(val) {
        this.formSearch.page=val;
        this.getTableData();
      }
    }
  }
</script>

<style lang="scss">
    .project{
        .el-badge__content.is-fixed{//标记位置
            top: 8px;
        }
        .el-tabs__header{//tab头部下margin
            margin-bottom: 25px;
        }
        @extend %width;
        .tag-margin{
            .el-tag{
                margin-right: 10px;
            }
        }
        .step{//审核状况即步骤条显示问题
            .el-form-item__content{
                line-height: normal;
                width: 800px;
            }
        }
        .pagination{
            margin-top: 10px;
        }
    }
</style>