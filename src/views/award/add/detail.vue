<template>
    <div class="project">
        <fieldset>
            <legend>奖学金批次{{awardName}}</legend>
        </fieldset>
        <el-card>
            <header slot="header">设置</header>
            <el-form :disabled="awardName==='详情'" inline size="medium" :model="form" ref="form" label-width="110px" class="form-inline">
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
                    <el-tag v-for="i in multipleSelection" :key="i.id" type="success" style="margin-right: 10px">{{i.xmmc}}</el-tag>
                    <el-button size="small" type="primary" icon="el-icon-document" @click="chooseProject">管理可参申本奖学金的项目</el-button>
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
                    <el-upload :action="$proxy+'/upload/uploadFile'" :on-remove="handleRemove" :on-success="handleSuccess" :file-list="fjList">
                        <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传doc/docx文件，且不超过2M</div>
                    </el-upload>
                </el-form-item>
                <el-form-item class="submit" v-if="awardName==='编辑'">
                    <el-button type="primary" @click="submitForm('form')">确认提交</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-dialog title="选择项目" :visible="dialogVisible" width="1200px" :show-close="false">
            <el-form inline :model="formSearch" size="mini" class="form-inline-search">
                <el-form-item label="项目名称">
                    <el-input v-model="formSearch.name" placeholder="项目名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="项目单位">
                    <el-select v-model="formSearch.lxdwId" filterable placeholder="请选择">
                        <el-option
                                v-for="item in deptList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目类别">
                    <el-cascader v-model="formSearch.xmlbList" :options="typeList" :props="props"></el-cascader>
                </el-form-item>
                <el-form-item label="经费来源">
                    <el-select v-model="formSearch.jfly">
                        <el-option
                                v-for="item in fundsList"
                                :key="item.id"
                                :label="item.value"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker v-model="formSearch.xmkssj" type="date" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker v-model="formSearch.xmjssj" type="date" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
                <el-form-item label="项目天数">
                    <el-row>
                        <el-col :span="10"><el-input v-model="formSearch.minDay" clearable></el-input></el-col>
                        <el-col :span="4">—</el-col>
                        <el-col :span="10"><el-input v-model="formSearch.maxDay" clearable></el-input></el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getTableData('search')">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table ref="multipleTable"
                      :data="tableData" :row-key="getRowKeys"
                      size="medium" border @selection-change="handleSelectionChange">
                <el-table-column
                        reserve-selection
                        type="selection" width="50" align="center">
                </el-table-column>
                <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="lxdwmc" label="立项单位" show-overflow-tooltip align="center"></el-table-column>
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
                <el-table-column prop="sfzxname" label="是否专项" width="100" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="xmfzr" label="项目负责人" width="80" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="xmfzrdh" label="联系电话" width="80" show-overflow-tooltip align="center"></el-table-column>
            </el-table>
            <footer slot="footer" class="dialog-footer">
                <el-button type="primary" @click="chooseSure">确 定</el-button>
            </footer>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "project",
    data() {
      return {
        ndList:[],//奖学金年度
        false:false,
        dialogVisible:false,//弹框是否显示
        formSearch: {//项目表格搜索条件
          roleId:'',
          sfzx:'',
          name:'',
          lxdwId:'',
          xmlbList:[],
          xmlb:'',
          xmlbx:'',
          jfly:'',
          xmkssj:'',
          xmjssj:'',
          minDay:'',
          maxDay:'',
          status:'8',
          //分页
          page:1,//当前
          limit:1000,
        },
        total:1,//总页数
        tableData: [],//项目表格数据
        // 获取row的key值
        getRowKeys(row) {
          return row.id;
        },
        row:{},//行数据
        multipleSelection: [],
        chooseCount:0,

        deptList:[],//单位部门列表
        fundsList:[],//经费来源
        typeList:[],//类型级联列表
        props:{
          value:'id',
          label:'value',
          children:'sonList',
        },

        fileList:[],//upload本身上传文件
        archiveFileList:[],//附件所需结构

        form:{
          roleId:'',
          projectIds:[],//项目id数组
          name:'',//
          nd:'',//学年
          pc:'',//春季/秋季
          sqkssj:'',//申请开始时间
          sqjzsj:'',//申请截止时间
          sqdx:'',//申请对象（本、硕、博）
          zzfwed:'',//资助范围和额度
          sqzg:'',//申请资格
          zxdh:'',//咨询电话
          fjzl:'',//附件资料
        },
        fjList:[],//附件列表
      };
    },
    computed: {
      role () {
        return this.$store.state.role
      },
      awardData () {
        return this.$store.state.awardData
      },
      awardName () {
        return this.$store.state.awardName
      },
    },
    created(){
      if(this.awardData.id){
        this.form={...this.awardData};
        if(this.form.fjzl){
          this.fjList=JSON.parse(this.form.fjzl);
        }
        this.multipleSelection=[...this.form.projectlist];
        if(this.awardName==='编辑'){
          //奖学金年度列表
          this.$ajax.post('/code/xn')
            .then(res=>{
              this.ndList=res.data.data.data;
            })
        }
      }
      else this.$router.push('/award/list')
    },
    methods: {
      //获取下拉列表
      getList(){
        //部门列表
        this.$ajax.post('/dept/list')
          .then(res=>{
            this.deptList=res.data.data.data;
          });
        //经费来源列表
        this.$ajax.post('/code/findJfly',{id:this.form.sfzx})
          .then(res=>{
            this.fundsList=res.data.data.data;
          });
        //项目类别列表
        this.$ajax.post('/code/findCodeAndSonCode',{id:this.form.sfzx})
          .then(res=>{
            this.typeList=res.data.data.data;
          });
      },
      //获取项目表格数据
      getTableData(type){
        this.getList();
        this.formSearch.roleId=this.role;
        this.formSearch.xmlb=this.formSearch.xmlbList[0];
        this.formSearch.xmlbx=this.formSearch.xmlbList[1];
        this.$ajax.post('/project/approvePage',this.formSearch)
          .then(res=>{
            this.total=res.data.data.data.records;
            this.tableData=res.data.data.data.rows;
          })
          .then(()=>{
            if(type!=='search'){
              this.tableData.filter(item=> this.multipleSelection.some(select=>select.id===item.id)).forEach(row=>{
                this.$refs.multipleTable.toggleRowSelection(row);
              });
            }
          })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;

      },
      chooseProject(){
        this.chooseCount++;
        if(this.chooseCount===1){
          this.getTableData()
        }
        this.dialogVisible=true;
      },
      chooseSure(){
        this.dialogVisible=false;
      },
      //附件上传
      //删除
      handleRemove(file,fileList){
        let path=file.url?file.url:file.response.path;
        this.$ajax.post('/resource/deleteFile',{path:path})
          .then(res=>{
            if(res.data.errcode==='0'){
              this.fileList=fileList;
            }
            else{
              this.$message.error(res.data.errmsg);
            }
          });
      },
      //上传成功
      handleSuccess(res,file,fileList){
        if(res.errcode==='0'){
          this.fileList=fileList;
          console.log(this.fileList)
        }
        else{
          this.$message.error(res.errmsg);
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            // this.form.projectIds=this.multipleSelection.map(select=>select.id);
            console.log(this.form.projectIds)
            // for(let i in this.multipleSelection){
            //   this.form.projectIds.push(this.multipleSelection[i].id)
            // }
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
              this.form.fjzl=JSON.stringify(this.archiveFileList);
            }
            this.$ajax.post('/jxjPc/edit',this.form)
              .then(res=>{
                if(res.data.errcode==='0'){
                  this.$message.success('修改成功');
                  this.$router.push('/award/list');
                }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
        .other{//经费来源其他
            width: $form-line-base-width;
            margin-left: 10px;
        }
        .el-radio{
            margin-bottom: 5px;
        }
        .complex{//复杂组合按钮
            width: 280px;
            margin-right: 10px;
            .el-select{
                width: 90px;
            }
            .el-input-group__append{
                background: #fff;
            }
        }
        .detailTable{//支出明细表格
            width: $form-line-full-width;
            .el-input__inner{
                border: none;
            }
        }
        .detail{//支出明细
            width: 80%;
            margin-right: 10px;
        }
    }
</style>