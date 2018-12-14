<template>
    <div class="user">
        <fieldset>
            <legend>角色</legend>
        </fieldset>
        <el-card class="header-search">
            <div class="btn-group">
                <el-button-group>
                    <el-button size="medium" type="primary" @click="add">新增</el-button>
                    <el-button size="medium" type="primary" @click="edit">修改</el-button>
                </el-button-group>
                <el-button-group>
                    <el-button size="medium" type="primary" @click="grant">分配用户</el-button>
                </el-button-group>
            </div>
            <el-table :data="tableData" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="id" label="ID" min-width="100"></el-table-column>
                <el-table-column prop="name" label="角色" min-width="150"></el-table-column>
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
            <el-form :model="dialogForm" :rules="rules" ref="dialogForm" label-width="100px">
                <el-form-item label="角色" prop="name">
                    <el-input v-model="dialogForm.name" placeholder="请输入" clearable></el-input>
                </el-form-item>
            </el-form>
            <footer slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('dialogForm')">确 定</el-button>
            </footer>
        </el-dialog>

        <el-dialog :visible.sync="dialogVisibleUser">
            <header slot="title">分配用户</header>
            <el-tabs v-model="tabValue" tab-position="left" @tab-click="handleTab">
                <el-tab-pane label="已分配" name="has">
                    <el-form inline size="mini">
                        <el-form-item label="用户名">
                            <el-input v-model="dialogTableSearch.username" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名">
                            <el-input v-model="dialogTableSearch.truename" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleCurrentChangeDialog(1)">查询</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="dialogTableHas" border size="small" @selection-change="handleSelectionChangeHas">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="username" label="用户名" min-width="180"></el-table-column>
                        <el-table-column prop="truename" label="姓名" min-width="150"></el-table-column>
                    </el-table>
                    <el-pagination class="pagination" small v-show="dialogTableTotal>dialogTableSearch.limit"
                                   @current-change="handleCurrentChangeDialog"
                                   :current-page="dialogTableSearch.page"
                                   :page-size="dialogTableSearch.limit"
                                   layout="prev, pager, next"
                                   :total="dialogTableTotal">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="可分配" name="not">
                    <el-form inline size="mini">
                        <el-form-item label="用户名">
                            <el-input v-model="dialogTableSearch.username" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名">
                            <el-input v-model="dialogTableSearch.truename" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleCurrentChangeDialog(1)">查询</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="dialogTableNot" border size="small" @selection-change="handleSelectionChangeNot">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="username" label="用户名" min-width="180"></el-table-column>
                        <el-table-column prop="truename" label="姓名" min-width="150"></el-table-column>
                    </el-table>
                    <el-pagination class="pagination" small v-show="dialogTableTotalNot>dialogTableSearch.limit"
                                   @current-change="handleCurrentChangeDialog"
                                   :current-page="dialogTableSearch.page"
                                   :page-size="dialogTableSearch.limit"
                                   layout="prev, pager, next"
                                   :total="dialogTableTotalNot">
                    </el-pagination>
                </el-tab-pane>
            </el-tabs>
            <footer slot="footer">
                <el-button @click="dialogVisibleUser = false">取 消</el-button>
                <el-button v-show="tabValue==='has'" type="primary" @click="submitUserDel">移 除</el-button>
                <el-button v-show="tabValue==='not'" type="primary" @click="submitUserAdd">分 配</el-button>
            </footer>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "user",
    data() {
      return {
        //搜索
        formSearch:{
          //分页
          page:1,//当前
          limit:10,
        },
        total:1,
        //表格
        tableData: [],
        multipleSelection: [],//多选
        //弹框增改
        dialogVisible:false,//弹框是否显示
        dialogName:'',//弹框名
        dialogForm:{
          name:'',
        },
        rules:{
          name:[{required: true, message: '角色名不能为空', trigger: 'blur'}],
        },
        //弹框用户
        dialogVisibleUser:false,
        tabValue:'has',
        dialogTableHas:[],//已分配用户表格
        has:[],//选择项
        dialogTableNot:[],//未分配用户表格
        not:[],//选择项
        dialogTableSearch:{
          page:1,//当前
          limit:10,
          roleId:'',
          username:'',
          truename:'',
        },
        dialogTableTotal:1,
        dialogTableTotalNot:1
      }
    },
    created(){
      this.getTableData();
    },
    methods: {
      //获取表格数据
      getTableData(){
        this.$ajax.post('/role/page',this.formSearch)
          .then(res=>{
            this.total=res.data.data.records;
            this.tableData=res.data.data.data;
          })
      },
      //多选
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      add(){
        for(let key in this.dialogForm){
          delete this.dialogForm[key];
        }
        this.dialogVisible=true;
        this.dialogName='添加';
      },
      edit(){
        if(this.multipleSelection.length===0){
          this.$message.warning('请选择数据');
        }
        else if(this.multipleSelection.length>1){
          this.$message.warning('只能选择一项编辑');
        }
        else{
          this.dialogForm={...this.multipleSelection[0]};
          this.dialogVisible=true;
          this.dialogName='编辑';
        }
      },
      //提交
      submitForm(formName) {
        let url=this.dialogName==='添加'?'/role/add':'/role/edit';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.dialogForm)
            this.$ajax.post(url,this.dialogForm)
              .then(res=>{
                this.handleCurrentChange(1);
                this.dialogVisible=false;
                this.$message.success(res.data.errmsg);
              })
          }
          else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //分配
      grant(){
        if(this.multipleSelection.length===0){
          this.$message.warning('请选择数据');
        }
        else if(this.multipleSelection.length>1){
          this.$message.warning('只能选择一项分配');
        }
        else{
          this.dialogTableSearch.roleId=this.multipleSelection[0].id;
          this.tabValue='has';
          this.getHas();
          this.getNot();
          this.dialogVisibleUser=true;
        }
      },
      //获取已分配用户表格
      getHas(){
        this.$ajax.post('/role/getPagerByRole',this.dialogTableSearch)
          .then(res=>{
            this.dialogTableTotal=res.data.data.records;
            this.dialogTableHas=res.data.data.data;
          })
      },
      //获取未分配用户表格
      getNot(){
        this.$ajax.post('/role/getUsersPage',this.dialogTableSearch)
          .then(res=>{
            this.dialogTableTotalNot=res.data.data.records;
            this.dialogTableNot=res.data.data.data;
          })
      },
      //监听表格选中
      handleSelectionChangeHas(val) {
        this.has = val;
      },
      handleSelectionChangeNot(val) {
        this.not = val;
      },
      //切换tab
      handleTab(){
        this.dialogTableSearch.page=1;
        this.dialogTableSearch.truename='';
        this.dialogTableSearch.username='';
      },
      submitUserAdd(){
        let userids=[];
        for(let i in this.not){
          userids.push(this.not[i].id);
        }
        this.$ajax.post('/role/addUser',{roleId:this.dialogTableSearch.roleId,userids:userids})
          .then(res=>{
            this.handleCurrentChangeDialog(1);
            this.dialogVisibleUser=false;
            this.$message.success(res.data.errmsg)
          })
      },
      submitUserDel(){
        let userids=[];
        for(let i in this.has){
          userids.push(this.has[i].id);
        }
        this.$ajax.post('/role/removeRoleUsers',{roleId:this.dialogTableSearch.roleId,userids:userids})
          .then(res=>{
            this.handleCurrentChangeDialog(1);
            this.dialogVisibleUser=false;
            this.$message.success(res.data.errmsg)
          })
      },
      //分页
      handleSizeChange(val) {
        this.formSearch.limit=val;
        this.formSearch.page=1;
        this.getTableData();
      },
      handleCurrentChange(val) {
        this.formSearch.page=val;
        this.getTableData();
      },
      handleCurrentChangeDialog(val){
        this.dialogTableSearch.page=val;
        console.log(this.tabValue);
        if(this.tabValue==='has'){
          this.getHas();
        }
        else {
          this.getNot();
        }
      },
    }
  }
</script>

<style lang="scss">
    .user{
        @extend %width;
        .el-checkbox-group{
            @include flex(space-between);
            flex-flow: wrap;
            .el-checkbox+.el-checkbox{
                margin-left: 0;
            }
            .el-checkbox{
                margin-bottom: 5px;
                .el-checkbox__label{
                    font-size: 15px;
                }
            }
        }
        .el-tabs__item{
            padding: 0 20px 0 0;
        }
        .el-tabs--left .el-tabs__header.is-left{
            margin-right: 15px;
        }
    }
</style>