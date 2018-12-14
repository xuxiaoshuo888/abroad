<template>
    <div class="project">
        <!--<fieldset>-->
        <!--<legend>专项项目审批</legend>-->
        <!--</fieldset>-->
        <el-card shadow="hover" class="card-search">
            <header slot="header">学生申请审批</header>
            <el-form inline :model="formSearch" size="mini" class="form-inline-search">
                <el-form-item label="学生学号">
                    <el-input v-model="formSearch.xh" placeholder="学号" clearable></el-input>
                </el-form-item>
                <el-form-item label="学生姓名">
                    <el-input v-model="formSearch.xm" placeholder="姓名" clearable></el-input>
                </el-form-item>
                <el-form-item label="学生学院">
                    <el-select v-model="formSearch.xy" filterable placeholder="请选择">
                        <el-option
                                v-for="item in deptList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model="formSearch.xmmc" placeholder="项目名称" clearable></el-input>
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
                <el-form-item label="培养层次">
                    <el-select v-model="formSearch.pycc">
                        <el-option
                                v-for="item in fundsList"
                                :key="item.id"
                                :label="item.value"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否专项">
                    <el-select v-model="formSearch.sfzx" filterable placeholder="请选择">
                        <el-option label="专项项目" value="101"></el-option>
                        <el-option label="非专项项目" value="102"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="getTableData">查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card shadow="hover">
            <el-tabs v-model="formSearch.status" @tab-click="handleClick">
                <el-tab-pane label="待审批" name="0">
                    <el-table :data="tableData" size="medium" border @row-dblclick="rowDblclick">
                        <el-table-column prop="std_xh" label="学号" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="std_xm" label="姓名" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="std_xy" label="学院" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="std_pycc" label="培养层次" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="lxdwmc" label="立项单位" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="cgjname" label="出国（境）" width="80" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="jflyname" label="经费来源" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="xmlbxname" label="项目类别" show-overflow-tooltip align="center">
                            <template slot-scope="scope">
                                {{scope.row.xmlbname}}/{{scope.row.xmlbxname}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="sfzxname" label="是否专项" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="lxdh" label="学生联系电话" width="80" show-overflow-tooltip align="center"></el-table-column>
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
                        <el-table-column prop="std_pycc" label="培养层次" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="lxdwmc" label="立项单位" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="cgjname" label="出国（境）" width="80" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="jflyname" label="经费来源" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="xmlbxname" label="项目类别" show-overflow-tooltip align="center">
                            <template slot-scope="scope">
                                {{scope.row.xmlbname}}/{{scope.row.xmlbxname}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="sfzxname" label="是否专项" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="lxdh" label="学生联系电话" width="80" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="when_created" label="学生申请时间" width="80" show-overflow-tooltip align="center"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="未通过" name="9">
                    <el-table :data="tableData" size="medium" border @row-dblclick="rowDblclick">
                        <el-table-column prop="std_xh" label="学号" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="std_xm" label="姓名" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="std_xy" label="学院" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="std_pycc" label="培养层次" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="lxdwmc" label="立项单位" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="cgjname" label="出国（境）" width="80" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="jflyname" label="经费来源" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="xmlbxname" label="项目类别" show-overflow-tooltip align="center">
                            <template slot-scope="scope">
                                {{scope.row.xmlbname}}/{{scope.row.xmlbxname}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="sfzxname" label="是否专项" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="lxdh" label="学生联系电话" width="80" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="when_created" label="学生申请时间" width="80" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="spyj" label="不通过原因" width="80" show-overflow-tooltip align="center"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="非专项申请" name="fzxsq" v-if="role==='SYS_LGB'||role==='SYS_GATB'">
                    <el-table :data="tableData" size="medium" border @row-dblclick="rowDblclick">
                        <el-table-column prop="std_xh" label="学号" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="std_xm" label="姓名" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="std_xy" label="学院" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="std_pycc" label="培养层次" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="lxdwmc" label="立项单位" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="cgjname" label="出国（境）" width="80" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="jflyname" label="经费来源" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="xmlbxname" label="项目类别" show-overflow-tooltip align="center">
                            <template slot-scope="scope">
                                {{scope.row.xmlbname}}/{{scope.row.xmlbxname}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="sfzxname" label="是否专项" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="lxdh" label="学生联系电话" width="80" show-overflow-tooltip align="center"></el-table-column>
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
          xh:'',
          xm:'',
          xy:'',
          sfzx:'',
          xmmc:'',//项目名称
          lxdwId:'',
          xmlbList:[],
          xmlb:'',
          xmlbx:'',
          jfly:'',
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
      }
    },
    computed: {
      role () {
        return this.$store.state.role
      }
    },
    watch:{
      role(){
        this.getTableData()
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
        this.$ajax.post('/projectApprove/page',this.formSearch)
          .then(res=>{
            this.total=res.data.data.data.records;
            this.tableData=res.data.data.data.rows;
          })
      },
      //表格行双击
      rowDblclick(row){
        this.$store.commit('setData',{
          name:'applyId',
          data:row.id,
        });
        this.$store.commit('setData',{
          name:'applyName',
          data:'详情',
        });
        this.$router.push('/project/apply/detail');
        // this.row={...row};
        // console.log(this.row);
        // this.dialogVisible=true;
        // this.disable=true;
        // this.dialogName='详情';
      },
      //tab切换
      handleClick() {
        this.getTableData();
      },
      //操作按钮
      //审批
      handleApprove(row){
        this.$store.commit('setData',{
          name:'applyId',
          data:row.id,
        });
        this.$store.commit('setData',{
          name:'applyName',
          data:'审批',
        });
        this.$router.push('/project/apply/detail');
        // this.row={...row};
        // this.dialogVisible=true;
        // this.disable=true;
        // this.dialogName='审批';
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