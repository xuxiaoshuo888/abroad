<template>
    <div class="project">
        <fieldset>
            <legend>奖学金列表</legend>
        </fieldset>
        <el-card shadow="hover">
            <el-tabs v-model="formSearch.status" @tab-click="getTableData">
                <el-tab-pane label="可申请" name="0">
                    <el-table :data="tableData" size="medium" border @row-dblclick="rowDblclick">
                        <el-table-column prop="name" label="奖学金名称" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="nd" label="奖学金年度" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="pc" label="奖学金批次" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="sqzg" label="资格要求" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column label="申请起止时间" show-overflow-tooltip align="center">
                            <template slot-scope="scope">
                                {{scope.row.sqkssj}}至{{scope.row.sqjzsj}}
                            </template>
                        </el-table-column>
                        <el-table-column label="开放状态" width="100" show-overflow-tooltip align="center">
                            <template slot-scope="scope">
                                <el-tag v-if="scope.row.status==='0'">未开放</el-tag>
                                <el-tag v-if="scope.row.status==='1'" type="success">已开放</el-tag>
                                <el-tag v-if="scope.row.status==='2'" type="info">已结束</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="80" align="center">
                            <template slot-scope="scope">
                                <el-button @click="handleApply(scope.row)" type="primary" size="mini" plain>申请</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="已申请" name="1">
                    <el-table :data="tableData" size="medium" border @row-dblclick="rowDblclick">
                        <el-table-column prop="name" label="奖学金名称" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="nd" label="奖学金年度" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="pc" label="奖学金批次" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="sqzg" label="资格要求" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column label="申请起止时间" show-overflow-tooltip align="center">
                            <template slot-scope="scope">
                                {{scope.row.sqkssj}}至{{scope.row.sqjzsj}}
                            </template>
                        </el-table-column>
                        <el-table-column label="开放状态" width="100" show-overflow-tooltip align="center">
                            <template slot-scope="scope">
                                <el-tag v-if="scope.row.sfsq==='1'">已申请</el-tag>
                            </template>
                        </el-table-column>
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
          status:'0',
          //分页
          page:1,//当前
          limit:10,
        },
        total:1,//总页数
        tableData: [],

        dialogVisible:false,//弹框是否显示
        dialogName:'',//弹框名
        disable:true,//彈出表单是否不可填
        row:{},//弹框数据
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
        this.$ajax.post('/jxjApply/page',this.formSearch)
          .then(res=>{
            this.total=res.data.data.data.records;
            this.tableData=res.data.data.data.rows;
          })
      },
      //表格行双击
      rowDblclick(row){
        this.$store.commit('setData',{
          name:'awardName',
          data:'详情',
        });
        this.$store.commit('setData',{
          name:'awardData',
          data:row,
        });
        //查看申请详情时需要带上学生基本信息，
        this.$router.push('/award/list/stdAwardDetail');
      },
      //操作按钮
      //状态切换
      handleToggle(row){
        let status=row.status==='0'?'1':'0';
        this.$ajax.post('/jxjPc/status',{id:row.id,status:status})
          .then(res=>{
            if(res.data.errcode==='0'){
              this.handleCurrentChange(1);
              this.$message.success(res.data.errmsg);
            }
            else this.$message.error(res.data.errmsg);
          })
      },
      //编辑
      handleEdit(row){
        this.$store.commit('setData',{
          name:'awardName',
          data:'编辑',
        });
        this.$store.commit('setData',{
          name:'awardData',
          data:row,
        });
        this.$router.push('/award/detail');
      },
      //删除
      handleDel(row){
        this.$ajax.post('/jxjPc/remove',{id:row.id})
          .then(res=>{
            if(res.data.errcode==='0'){
              this.handleCurrentChange(1);
              this.$message.success(res.data.errmsg);
            }
            else this.$message.error(res.data.errmsg);
          })
      },
      //申请
      handleApply(row){
        this.$ajax.post('/jxjApply/checkStudent',{id:row.id})
          .then(res=>{
            if(res.data.errcode==='0'){
              console.log(res.data.data)
              this.$store.commit('setData',{
                name:'awardData',
                data:row,
              });
              this.$store.commit('setData',{
                name:'stdInfo1',
                data:res.data.data,
              });
              this.$router.push('/award/apply');
            }
            else this.$message.error(res.data.errmsg);
          })
      },
      sonApply(res){
        this.handleCurrentChange(1);
        this.dialogVisible=false;
        this.$message.success(res.data.errmsg);
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