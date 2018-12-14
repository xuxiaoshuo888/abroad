<template>
    <div class="project">
        <!--<fieldset>-->
            <!--<legend>专项项目审批</legend>-->
        <!--</fieldset>-->
        <el-card shadow="hover" class="card-search">
            <header slot="header">我的项目</header>
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
                    <el-button type="primary" @click="getTableData">查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card shadow="hover">
            <el-table :data="tableData" size="medium" border @row-dblclick="rowDblclick">
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
                <el-table-column prop="xmts" label="天数" width="50" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="xmfzr" label="项目负责人" width="80" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="xmfzrdh" label="联系电话" width="80" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="mexz" label="名额" width="50" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column label="状态" width="80" align="center">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status==='1'" size="medium">待审核</el-tag>
                        <el-tag v-else-if="scope.row.status==='2'" size="medium" type="warning">已通过</el-tag>
                        <el-tag v-else-if="scope.row.status==='8'" size="medium" type="success">已发布</el-tag>
                        <el-tag v-else size="medium" type="info">未通过</el-tag>
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
        <el-dialog :visible.sync="dialogVisible" width="80%">
            <header slot="title">{{dialogName}}</header>
            <project-form :row="row" :disable="disable" :name="dialogName"
                    @submit-approve="sonApprove"
                    @submit-release="sonRelease" @submit-edit="sonEdit" @dialog-close='dialogClose'>
            </project-form>
        </el-dialog>
    </div>
</template>

<script>
  import projectForm from '../add/form'
  export default {
    name: "project",
    components:{
      projectForm
    },
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
          status:'',
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
      }
    },
    computed: {
      role () {
        return this.$store.state.role
      }
    },
    created(){
      this.getList();
      this.getTableData();
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
        this.$ajax.post('/code/findJfly',{id:this.formSearch.sfzx})
          .then(res=>{
            this.fundsList=res.data.data.data;
          });
        //项目类别列表
        this.$ajax.post('/code/findCodeAndSonCode',{id:this.formSearch.sfzx})
          .then(res=>{
            this.typeList=res.data.data.data;
          });
      },
      //获取表格数据
      getTableData(){
        this.formSearch.roleId=this.role;
        this.formSearch.xmlb=this.formSearch.xmlbList[0];
        this.formSearch.xmlbx=this.formSearch.xmlbList[1];
        this.$ajax.post('/project/myPage',this.formSearch)
          .then(res=>{
            this.total=res.data.data.data.records;
            this.tableData=res.data.data.data.rows;
          })
      },
      //表格行双击
      rowDblclick(row){
        this.row={...row};
        console.log(this.row);
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
        this.row={...row};
        this.dialogVisible=true;
        this.disable=true;
        this.dialogName='审批';
      },
      sonApprove(res){
        this.handleCurrentChange(1);
        this.dialogVisible=false;
        this.$message.success(res.data.errmsg);
      },
      //编辑
      handleEdit(row){
        if(this.formSearch.status==='8'){
          this.$confirm('该项目已发布, 是否继续修改?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log(row.xmmc);
            this.row={...row};
            this.dialogVisible=true;
            this.disable=false;
            this.dialogName='编辑';
          }).catch(() => {});
        }
        else{
          console.log(row.xmmc);
          this.row={...row};
          this.dialogVisible=true;
          this.disable=false;
          this.dialogName='编辑';
        }
      },
      sonEdit(res){
        this.handleCurrentChange(1);
        this.dialogVisible=false;
        this.$message.success(res.data.errmsg);
      },
      //发布
      handleRelease(row){

        this.row={...row};
        this.dialogVisible=true;
        this.disable=true;
        this.dialogName='发布';
      },
      sonRelease(res){
        this.handleCurrentChange(1);
        this.dialogVisible=false;
        this.$message.success(res.data.errmsg);
      },
      //删除
      handleDel(row){
        this.$ajax.post('/project/remove',{id:row.id})
          .then(res=>{
            if(res.data.errcode==='0'){
              this.$message.success(res.data.errmsg)
            }
            else{
              this.$message.error(res.data.errmsg)
            }
          })
      },
      //弹窗关闭
      dialogClose(){
        this.dialogVisible=false;
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