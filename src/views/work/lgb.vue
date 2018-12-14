<template>
    <div class="work">
        <fieldset>
            <legend>我的工作台</legend>
        </fieldset>
        <el-card shadow="hover">
            <h4>项目立项审批状态</h4>
            <el-table :data="tableData1" size="medium" border @row-dblclick="rowDblclick1">
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
                <el-table-column prop="xmfzr" label="项目负责人" width="80" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="xmfzrdh" label="联系电话" width="80" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="mexz" label="名额" width="50" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="xxjl" label="学校奖励" width="60" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column label="操作" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button @click="handleApprove1(scope.row)" type="primary" size="mini" plain>审批</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="more_div">
                <router-link class="work_more" to="/project/list/special">更多>>></router-link>
            </div>

            <h4>学生申请项目待审批</h4>
            <el-table :data="tableData2" size="medium" border @row-dblclick="rowDblclick2">
                <el-table-column prop="std_xh" label="学号" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="std_xm" label="姓名" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="std_xy" label="学院" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="std_pycc" label="培养层次" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="lxdwmc" label="立项单位" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="cgjname" label="出国（境）" width="80" show-overflow-tooltip
                                 align="center"></el-table-column>
                <el-table-column prop="jflyname" label="经费来源" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="xmlbxname" label="项目类别" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                        {{scope.row.xmlbname}}/{{scope.row.xmlbxname}}
                    </template>
                </el-table-column>
                <el-table-column prop="sfzxname" label="是否专项" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="lxdh" label="学生联系电话" width="80" show-overflow-tooltip
                                 align="center"></el-table-column>
                <el-table-column prop="when_created" label="学生申请时间" width="80" show-overflow-tooltip
                                 align="center"></el-table-column>
                <el-table-column label="操作" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button @click="handleApprove(scope.row)" type="primary" size="mini" plain>审批</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="more_div">
                <router-link class="work_more" to="/project/apply/examine">更多>>></router-link>
            </div>

            <h4>奖学金待审批</h4>
            <el-table :data="tableData3" size="medium" border @row-dblclick="rowDblclick3">
                <el-table-column prop="name" label="奖学金名称" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="nd" label="奖学金年度" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="pc" label="奖学金批次" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column label="申请起止时间" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                        {{scope.row.sqkssj}}至{{scope.row.sqjzsj}}
                    </template>
                </el-table-column>
                <el-table-column label="开放状态" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status==='0'">未开放</el-tag>
                        <el-tag v-if="scope.row.status==='1'" type="success">已开放</el-tag>
                        <el-tag v-if="scope.row.status==='2'" type="info">已结束</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="申请审批" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="btnApprove(scope.row)">学生申请名单</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="more_div">
                <router-link class="work_more" to="/award/list/examine">更多>>></router-link>
            </div>
        </el-card>

        <!--项目立项审批状态双击弹出框-->
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
  import projectForm from '../project/add/form'

  export default {
    name: 'lgb',
    components: {
      projectForm
    },
    data() {
      return {
        tableData1: [],
        row: {},
        dialogVisible: false,//弹框是否显示
        dialogName: '',//弹框名
        disable: true,//彈出表单是否不可填
        tableData2: [],
        tableData3: []
      }
    },
    created() {
      this.getTableData1()
      this.getTableData2()
      this.getTableData3()
    },
    computed: {
      role() {
        return this.$store.state.role
      }
    },
    methods: {
      //第一个表格
      //获取表格1数据
      getTableData1() {
        console.log(this.role)
        this.$ajax.post('/project/approvePage', {roleId: this.role,status: '1'})
            .then(res => {
              this.tableData1 = res.data.data.data.rows.splice(0, 2);
            })
      },
      //表格行双击
      rowDblclick1(row) {
        this.row = {...row};
        console.log(this.row);
        this.dialogVisible = true;
        this.disable = true;
        this.dialogName = '详情';
      },
      //操作按钮
      //审批
      handleApprove1(row){
        this.row={...row};
        this.dialogVisible=true;
        this.disable=true;
        this.dialogName='审批';
      },
      sonApprove(res) {
        this.getTableData1();
        this.dialogVisible = false;
        this.$message.success(res.data.errmsg);
      },
      sonRelease(res) {
        this.getTableData1();
        this.dialogVisible = false;
        this.$message.success(res.data.errmsg);
      },
      sonEdit(res) {
        this.getTableData1();
        this.dialogVisible = false;
        this.$message.success(res.data.errmsg);
      },
      //弹窗关闭
      dialogClose() {
        this.dialogVisible = false;
      },

      //第二个表格
      getTableData2() {
        this.$ajax.post('/projectApprove/page', {roleId: this.role, status: "0"})
            .then(res => {
              this.tableData2 = res.data.data.data.rows.splice(0, 2);
            })
      },
      //表格行双击
      rowDblclick2(row){
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

      //第三个表格
      getTableData3() {
        this.$ajax.post('/jxjPc/page', {roleId: this.role})
            .then(res => {
              this.tableData3 = res.data.data.data.rows.splice(0, 1);
            })
      },
      btnApprove(row) {
        console.log(row);
        this.$store.commit('setData', {
          name: 'awardData',
          data: row,
        });
        this.$router.push('/award/apply/list');
      },
      rowDblclick3(row){
        this.$store.commit('setData',{
          name:'awardName',
          data:'详情',
        });
        this.$store.commit('setData',{
          name:'awardData',
          data:row,
        });
        this.$router.push('/award/detail');
      }
    },
  }
</script>

<style scoped>

</style>