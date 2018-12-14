<template>
    <div class="project">
        <fieldset>
            <legend>回国（入境）登记</legend>
        </fieldset>
        <el-card shadow="hover">
            <el-table :data="tableData" size="medium" border @row-dblclick="rowDblclick">
                <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="lxdwmc" label="立项单位" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="typeid" label="出国（境）" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                        {{scope.row.typeId==='1'?'出国':'出境'}}
                    </template>
                </el-table-column>
                <el-table-column prop="jflyname" label="经费来源" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="xmlbxname" label="项目类别" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                        {{scope.row.xmlbname}}/{{scope.row.xmlbxname}}
                    </template>
                </el-table-column>
                <el-table-column prop="time" label="项目起止时间" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                        {{scope.row.xmkssj}}至{{scope.row.xmzzsj}}
                    </template>
                </el-table-column>
                <el-table-column prop="xsccyq" label="层次要求" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="sfzxname" label="是否专项" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="xmfzr" label="项目负责人" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="xmfzrdh" label="联系电话" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="sfhgdj" label="状态" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column label="操作" width="150px" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.sfhgdj==='未登记'||scope.row.sfhgdj==='延期'">
                            <el-button @click="handleReg(scope.row)" type="primary" size="mini" plain>登记</el-button>
                            <el-button @click="handleRegAbnormal(scope.row)" type="warning" size="mini" plain>异动</el-button>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
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
        <el-dialog :visible.sync="dialogVisible">
            <header slot="title">{{dialogName}}</header>
            <el-form size="medium">
                <el-form-item label="异动类型" :disabled="disable">
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
                    <el-upload :action="$proxy+'/upload/uploadFile'" :on-remove="handleRemove" :on-success="handleSuccess">
                        <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传doc/docx文件，且不超过2M</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label=" " class="block">
                    <el-button type="primary" @click="submitForm()">确认提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "project",
    data() {
      return {
        deptList:[],//单位部门列表
        fundsList:[],//经费来源
        typeList:[],//类型级联列表
        props:{
          value:'id',
          label:'value',
          children:'sonList',
        },
        formSearch: {
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
        abnormal:{
          id:'',//return登记表id
          applyId:'',//申请登记id
          projectId:'',//项目id
          studentId:'',  //学生id
          ydlx:'',
          yqsj:'',
          ydyy:'',
          ydcl:'',
          status:'',
        },
        fileList:[],//upload本身上传文件
        archiveFileList:[],//附件所需结构
      }
    },
    computed: {
      role () {
        return this.$store.state.role
      }
    },
    created(){
      this.getTableData();
    },
    methods: {
      //获取表格数据
      getTableData(){
        this.$ajax.post('/projectReturn/expirePage',this.formSearch)
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
        this.$store.commit('setData',{
          name:'regId',
          data:row.id,
        });
        this.$store.commit('setData',{
          name:'regName',
          data:'详情',
        });
        this.$router.push('/project/reg/normal');
        // this.row={...row};
        // console.log(this.row);
        // this.dialogVisible=true;
        // this.disable=true;
        // this.dialogName='详情';
      },
      //操作按钮
      //登记
      handleReg(row){
        this.$store.commit('setData',{
          name:'regId',
          data:row.id,
        });
        this.$store.commit('setData',{
          name:'regName',
          data:'登记',
        });
        this.$router.push('/project/reg/normal');
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
      //异动
      handleRegAbnormal(row){
        this.row={...row};
        this.dialogVisible=true;
        this.disable=false;
        this.dialogName='异动';
        console.log(row);
      },
      //提交异动
      submitForm() {
        this.$ajax.post('/projectReturn/queryResult',{proResId:this.row.id})
          .then(res=>{
            if(res.data.data.data.projectReturn.return===null){
              this.abnormal.id='';
            }
            else{
              this.abnormal.id=res.data.data.data.projectReturn.return.id;
            }
            this.abnormal.applyId=res.data.data.data.projectResult.id;
            this.abnormal.studentId=res.data.data.data.student.id;
            this.abnormal.projectId=res.data.data.data.project.sqlRow.id;
            this.abnormal.status=this.abnormal.ydlx;
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
              this.abnormal.ydcl=JSON.stringify(this.archiveFileList);
            }
            this.$ajax.post('/projectReturn/checkIn',this.abnormal)
              .then(res=>{
                if(res.data.errcode==='0'){
                  this.handleCurrentChange(1);
                  this.dialogVisible=false;
                  this.$message.success('异动已提交');
                }
                else this.$message.error(res.data.errmsg);
              })
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
        .pagination{
            margin-top: 10px;
        }
    }
</style>