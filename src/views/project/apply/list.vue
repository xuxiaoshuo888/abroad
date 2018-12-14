<template>
    <div class="project">
        <fieldset>
            <legend>我的申请记录</legend>
        </fieldset>
        <el-card shadow="hover">
            <el-table :data="tableData" size="medium" border @row-dblclick="rowDblclick">
                <el-table-column prop="project.xmmc" label="项目名称" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="project.lxdwmc" label="立项单位" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="project.typeId" label="出国（境）" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                        {{scope.row.project.typeId==='1'?'出国':'出境'}}
                    </template>
                </el-table-column>
                <el-table-column prop="project.jflyname" label="经费来源" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="xmlbxname" label="项目类别" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                        {{scope.row.project.xmlbname}}/{{scope.row.project.xmlbxname}}
                    </template>
                </el-table-column>
                <el-table-column prop="time" label="项目起止时间" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                        {{scope.row.project.xmkssj}}至{{scope.row.project.xmzzsj}}
                    </template>
                </el-table-column>
                <el-table-column prop="project.xsccyq" label="层次要求" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="project.sfzxname" label="是否专项" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="spyj0" label="学院意见" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="spyj1" label="立项单位意见" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="spyj2" label="学校意见" show-overflow-tooltip align="center"></el-table-column>
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
            <project-form :row="row" :disable="disable" :name="dialogName" :sfzx="formSearch.sfzx"
                          @submit-reg="sonReg">
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
      this.getTableData();
    },
    methods: {
      //获取表格数据
      getTableData(){
        this.$ajax.post('/projectApply/myPage',this.formSearch)
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
          name:'applyId',
          data:row.projectApply.id,
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
      //登记
      handleReg(row){
        this.row={...row};
        this.dialogVisible=true;
        this.disable=true;
        this.dialogName='登记';
      },
      sonReg(res){
        this.handleCurrentChange(1);
        this.dialogVisible=false;
        this.$message.success(res.data.errmsg);
      },
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