<template>
    <div class="work">
        <fieldset>
            <legend>我的工作台</legend>
        </fieldset>
        <el-card shadow="hover">
            <h4>可申请的项目</h4>
            <el-table :data="tableData1" size="medium" border @row-dblclick="rowDblclick1">
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
                <el-table-column prop="time" label="项目起止时间" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                        {{scope.row.xmkssj}}至{{scope.row.xmzzsj}}
                    </template>
                </el-table-column>
                <el-table-column prop="xsccyq" label="层次要求" width="80" show-overflow-tooltip
                                 align="center"></el-table-column>
                <el-table-column prop="mexz" label="名额" width="50" show-overflow-tooltip
                                 align="center"></el-table-column>
                <el-table-column prop="sfzxname" label="是否专项" width="50" show-overflow-tooltip
                                 align="center"></el-table-column>
                <el-table-column prop="xssqzzsj" label="申请截止时间" width="100" show-overflow-tooltip
                                 align="center"></el-table-column>
                <el-table-column label="操作" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button @click="handleApply1(scope.row)" type="primary" size="mini" plain>申请</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="more_div">
                <router-link class="work_more" to="/project/list/student">更多>>></router-link>
            </div>

            <h4>可申请的奖学金</h4>
            <el-table :data="tableData2" size="medium" border @row-dblclick="rowDblclick2">
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
                        <el-button @click="handleApply2(scope.row)" type="primary" size="mini" plain>申请</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="more_div">
                <router-link class="work_more" to="/award/list/student">更多>>></router-link>
            </div>

            <h4>回国登记提醒（X条需及时登记）</h4>
            <el-table :data="tableData3" size="medium" border @row-dblclick="rowDblclick3">
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
                            <el-button @click="handleReg3(scope.row)" type="primary" size="mini" plain>登记</el-button>
                            <el-button @click="handleRegAbnormal3(scope.row)" type="warning" size="mini"
                                       plain>异动</el-button>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="more_div">
                <router-link class="work_more" to="/project/reg/list">更多>>></router-link>
            </div>
        </el-card>

        <!--申请项目双击弹出框-->
        <el-dialog :visible.sync="dialogVisible" width="80%">
            <header slot="title">{{dialogName}}</header>
            <project-form :row="row" :disable="disable" :name="dialogName" @submit-apply="sonApply">
            </project-form>
        </el-dialog>

        <!-- 回国登记异动弹出框-->
        <el-dialog :visible.sync="dialogVisible3">
            <header slot="title">{{dialogName3}}</header>
            <el-form size="medium">
                <el-form-item label="异动类型" :disabled="disable3">
                    <el-radio-group v-model="abnormal.ydlx">
                        <el-radio-button label="2">中止</el-radio-button>
                        <el-radio-button label="3">延期</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="延期时间" v-show="abnormal.ydlx==='3'">
                    <el-date-picker v-model="abnormal.yqsj" type="date"
                                    value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
                <el-form-item label="异动原因">
                    <el-input type="textarea" v-model="abnormal.ydyy"></el-input>
                </el-form-item>
                <el-form-item label="相关材料">
                    <el-upload :action="$proxy+'/upload/uploadFile'" :on-remove="handleRemove3"
                               :on-success="handleSuccess3">
                        <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传doc/docx文件，且不超过2M</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label=" " class="block">
                    <el-button type="primary" @click="submitForm3()">确认提交</el-button>
                </el-form-item>
            </el-form>
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
        tableData3: [],
        //第三个表格相关
        dialogVisible3: false,//弹框是否显示
        dialogName3: '',//弹框名
        disable3: true,//彈出表单是否不可填
        abnormal: {
          id: '',//return登记表id
          applyId: '',//申请登记id
          projectId: '',//项目id
          studentId: '',  //学生id
          ydlx: '',
          yqsj: '',
          ydyy: '',
          ydcl: '',
          status: '',
        },
        fileList:[],//upload本身上传文件
        archiveFileList:[],//附件所需结构
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
        this.$ajax.post('/projectApply/page', {roleId: this.role})
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
      //申请
      handleApply1(row) {
        this.$ajax.post('/projectApply/isCheck', {id: row.id})
            .then(res => {
              if (res) {
                if (res.data.errcode === '0') {
                  this.row = {...row};
                  this.dialogVisible = true;
                  this.disable = true;
                  this.dialogName = '申请';
                }
                else this.$message.error(res.data.errmsg);
              }
            })
      },
      sonApply(res) {
        this.handleCurrentChange(1);
        this.dialogVisible = false;
        this.$message.success(res.data.errmsg);
      },
      //弹窗关闭
      dialogClose() {
        this.dialogVisible = false;
      },

      //第二个表格
      getTableData2() {
        this.$ajax.post('/jxjApply/page', {status: "0"})
            .then(res => {
              this.tableData2 = res.data.data.data.rows.splice(0, 2);
            })
      },
      //表格行双击
      rowDblclick2(row) {
        this.$store.commit('setData', {
          name: 'awardName',
          data: '详情',
        });
        this.$store.commit('setData', {
          name: 'awardData',
          data: row,
        });
        this.$router.push('/award/detail');
      },
      //申请
      handleApply2(row) {
        this.$ajax.post('/jxjApply/checkStudent', {id: row.id})
            .then(res => {
              if (res.data.errcode === '0') {
                this.$store.commit('setData', {
                  name: 'awardData',
                  data: row,
                });
                this.$router.push('/award/apply');
              }
              else this.$message.error(res.data.errmsg);
            })
      },

      //第三个表格
      getTableData3() {
        this.$ajax.post('/projectReturn/expirePage')
            .then(res => {
              if (res.data.errcode === '0') {
                this.total = res.data.data.data.records;
                this.tableData3 = res.data.data.data.rows.splice(0, 1);
              }
              else this.$message.error(res.data.errmsg);
            })
      },

      rowDblclick3(row) {
        this.$store.commit('setData', {
          name: 'regId',
          data: row.id,
        });
        this.$store.commit('setData', {
          name: 'regName',
          data: '详情',
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
      handleReg3(row) {
        this.$store.commit('setData', {
          name: 'regId',
          data: row.id,
        });
        this.$store.commit('setData', {
          name: 'regName',
          data: '登记',
        });
        this.$router.push('/project/reg/normal');
      },
      //异动
      handleRegAbnormal3(row) {
        this.row = {...row};
        this.dialogVisible = true;
        this.disable = false;
        this.dialogName = '异动';
        console.log(row);
      },
      //删除
      handleRemove3(file, fileList) {
        console.log(file);
        let path = file.url ? file.url : file.response.path;
        this.$ajax.post('/resource/deleteFile', {path: path})
            .then(res => {
              if (res.data.errcode === '0') {
                this.fileList = [...fileList];
                console.log(this.fileList)
              }
              else {
                this.$message.error(res.data.errmsg);
              }
            });
      },
      //上传成功
      handleSuccess3(res, file, fileList) {
        if (res.errcode === '0') {
          this.fileList = [...fileList];
          console.log(this.fileList)
        }
        else {
          this.$message.error(res.message);
        }
      },
      //提交异动
      submitForm() {
        this.$ajax.post('/projectReturn/queryResult', {proResId: this.row.id})
            .then(res => {
              if (res.data.data.data.projectReturn.return === null) {
                this.abnormal.id = '';
              }
              else {
                this.abnormal.id = res.data.data.data.projectReturn.return.id;
              }
              this.abnormal.applyId = res.data.data.data.projectResult.id;
              this.abnormal.studentId = res.data.data.data.student.id;
              this.abnormal.projectId = res.data.data.data.project.sqlRow.id;
              this.abnormal.status = this.abnormal.ydlx;
              this.archiveFileList = [];
              for (let i = 0; i < this.fileList.length; i++) {
                if (this.fileList[i].response) {
                  this.archiveFileList.push({
                    url: this.fileList[i].response.path,
                    name: this.fileList[i].name
                  });
                }
                else this.archiveFileList.push({
                  url: this.fileList[i].url,
                  name: this.fileList[i].name
                });
              }
              if (this.archiveFileList.length > 0) {
                this.abnormal.ydcl = JSON.stringify(this.archiveFileList);
              }
              this.$ajax.post('/projectReturn/checkIn', this.abnormal)
                  .then(res => {
                    if (res.data.errcode === '0') {
                      this.handleCurrentChange(1);
                      this.dialogVisible = false;
                      this.$message.success('异动已提交');
                    }
                    else this.$message.error(res.data.errmsg);
                  })
            })
      },
    },
  }
</script>

<style scoped>

</style>