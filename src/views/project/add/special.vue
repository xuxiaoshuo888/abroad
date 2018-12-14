<template>
    <div class="project">
        <fieldset>
            <legend>专项项目</legend>
        </fieldset>
        <el-card>
            <header slot="header">立项</header>
            <el-form inline size="medium" :model="form" :rules="rules" ref="form" label-width="110px" class="form-inline">
                <el-form-item label="项目名称" class="block" prop="xmmc">
                    <el-input v-model="form.xmmc" class="name"></el-input>
                </el-form-item>
                <el-form-item label="出国（境）" class="block" prop="typeid">
                    <el-select v-model="form.typeid" placeholder="请选择" @change="changeType">
                        <el-option
                                v-for="item in placeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="立项单位" prop="lxdwid">
                    <el-select v-model="form.lxdwid" filterable placeholder="请选择">
                        <el-option
                                v-for="item in deptList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目负责人" prop="xmfzr">
                    <el-input class="select" v-model="form.xmfzr"></el-input>
                </el-form-item>
                <el-form-item label="单位负责人" prop="lxdwfzr">
                    <el-input class="select" v-model="form.lxdwfzr"></el-input>
                </el-form-item>
                <el-form-item label="负责人电话" prop="xmfzrdh">
                    <el-input class="select" v-model="form.xmfzrdh"></el-input>
                </el-form-item>
                <el-form-item label="经费来源" class="block" prop="jfly">
                    <el-select v-model="form.jfly">
                        <el-option
                                v-for="item in fundsList"
                                :key="item.id"
                                :label="item.value"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-input class="other" v-model="form.jflyqt" v-show="form.jfly==='101002007'" placeholder="输入其他专项具体内容"></el-input>
                </el-form-item>
                <el-form-item label="名额限制" class="block" prop="mexz">
                    <el-input-number v-model="form.mexz"></el-input-number>
                </el-form-item>
                <el-form-item label="项目类别" class="block" prop="xmlbList">
                    <el-cascader v-model="form.xmlbList" :options="typeList" :props="props"></el-cascader>
                    <el-input class="other" v-model="form.xmlbqt" v-show="form.xmlbList[1]==='101001001004'||form.xmlbList[1]==='101001002005'" placeholder="输入其他专项具体内容"></el-input>
                </el-form-item>
                <el-form-item label="学生层次要求" class="block" prop="xsccyq">
                    <el-checkbox-group v-model="form.xsccyq" size="small">
                        <el-checkbox label="本科生" border></el-checkbox>
                        <el-checkbox label="硕士生" border></el-checkbox>
                        <el-checkbox label="博士生" border></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="国家（地区）" prop="jhgj">
                    <el-select v-model="form.jhgj" multiple filterable placeholder="选择交换/交流国家（地区）">
                        <el-option
                                v-for="item in countryList"
                                :key="item.id"
                                :label="item.value"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="院校/教育机构" prop="jyjg">
                    <el-input class="select" v-model="form.jyjg"></el-input>
                </el-form-item>
                <el-form-item label="项目活动时间" class="block" prop="daterange">
                    <el-date-picker
                            unlink-panels
                            v-model="daterange"
                            type="daterange"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                    <el-input v-model="form.xmts" disabled placeholder="项目天数" style="width: 90px;text-align:center;margin-left: 20px"></el-input>
                </el-form-item>

                <el-form-item label="经费组成" class="block">
                    <el-input class="complex" placeholder="金额" v-model.number="form.dwzz">
                        <template slot="prepend">单位资助</template>
                        <el-select v-model="form.dwzzlx" slot="append" placeholder="请选择">
                            <el-option label="元" value="1"></el-option>
                            <el-option label="元/人" value="2"></el-option>
                        </el-select>
                    </el-input>
                    <el-input class="complex" placeholder="金额" v-model.number="form.xxjl">
                        <template slot="prepend">学校奖励</template>
                        <template slot="append">元/人</template>
                    </el-input>
                    <el-input class="complex" placeholder="金额" v-model.number="form.xszc">
                        <template slot="prepend">学生自筹</template>
                        <el-select v-model="form.xszclx" slot="append" placeholder="请选择">
                            <el-option label="元" value="1"></el-option>
                            <el-option label="元/人" value="2"></el-option>
                        </el-select>
                    </el-input>
                </el-form-item>

                <el-form-item label="立项理由" class="block">
                    <el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.xmlxly" placeholder="请填写项目立项理由及主要内容（2000字以内）"></el-input>
                </el-form-item>
                <el-form-item label="行程安排" class="block">
                    <el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.xmxcap" placeholder="请填写项目行程安排（1000字以内）"></el-input>
                </el-form-item>
                <el-form-item label="资格要求" class="block">
                    <el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.xszgyq" placeholder="请填写学生申请本项目的资格要求（1000字以内）"></el-input>
                </el-form-item>
                <el-form-item label="其他说明" class="block">
                    <el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.xmqtsm" placeholder="可填写项目的其他说明（1000字以内）"></el-input>
                </el-form-item>

                <el-form-item label="经费预算明细" class="block">
                    <el-table :data="tableData" border empty-text="暂无明细" class="detailTable">
                        <el-table-column type="index" width="50">
                        </el-table-column>
                        <el-table-column prop="detail" label="支出明细描述">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.detail"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="money" label="金额（元）" width="100">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.money"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" width="100">
                            <template slot="header" slot-scope="scope">
                                <el-button plain
                                        size="mini"
                                        type="primary"
                                        @click="addDetail(scope.row)">新增</el-button>
                            </template>
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, tableData)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>

                <el-form-item label="项目材料上传">
                    <el-upload :action="$proxy+'/upload/uploadFile'" :on-remove="handleRemove" :on-success="handleSuccess">
                        <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传doc/docx文件，且不超过2M</div>
                    </el-upload>
                </el-form-item>

                <el-form-item class="submit">
                    <el-button type="primary" @click="submitForm('form')">确认提交</el-button>
                    <el-button @click="resetForm('form')">重置内容</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
  export default {
    name: "project",
    data() {
      return {
        placeList:[],//出国出境列表
        deptList:[],//单位部门列表
        fundsList:[],//经费来源
        typeList:[],//类型级联列表
        props:{
          value:'id',
          label:'value',
          children:'sonList',
        },
        daterange:[],//项目时间原始选择项
        countryList:[],//国家列表
        tableData:[],//预算明细表格
        fileList:[],//upload本身上传文件
        archiveFileList:[],//附件所需结构
        form:{
          xmmc:'',//项目名称
          typeid:'',//出国出境
          sfzx:'101',//是否专项
          lxdwid:'',//立项单位ID
          lxdwmc:'',//立项单位名称
          lxdwfzr:'',//立项单位负责人
          xmfzr:'',//项目负责人
          xmfzrdh:'',//项目负责人联系电话
          jfly:'',//经费来源
          jflyqt:'',//经费来源其它手动输入
          mexz:0,//名额限制
          xmlbList:[],//项目类别原始选择项
          xmlb:'',//项目类别
          xmlbx:'',//项目类别项
          xmlbqt:'', //项目类别项其它手动输入
          xsccyq:[],//学生层次要求
          jhgj:[],//交换/交流国家（地区）
          jyjg:'',//大学或教育机构
          daterange:[],
          xmkssj:'',//项目开始时间
          xmzzsj:'',//项目终止时间
          xmts:'',//项目天数
          dwzz:'',//单位资助
          dwzzlx:'1',//单位资助类型
          xxjl:'',//学校奖励
          xszc:'',//学生自筹
          xszclx:'1',//学生自筹类型
          xndwzz:0,//校内单位资助
          xndwzzlx:'1',//校内单位资助类型
          xwdwzz:0,//校外单位资助
          xwdwzzlx:'1',//校外单位资助类型,1表示总金额，2表示人均
          xmlxly:'',//项目立项理由及主要内容
          xmxcap:'',//项目行程安排
          xszgyq:'',//学生申请本项目的资格要求
          xmjfys:0,//项目经费预算
          xmjfysmx:'',//项目经费预算明细
          fj:'',//附件
          xmqtsm:'',//项目其他说明
        },
        rules: {
          xmmc: [
            { required: true, message: '请输入项目名称', trigger: 'blur' },
          ],
          typeid: [
            { required: true, message: '请选择出国/出境', trigger: 'change' }
          ],
          lxdwid: [
            { required: true, message: '请选择立项单位', trigger: 'change' }
          ],
          xmfzr: [
            { required: true, message: '请填写项目负责人', trigger: 'blur' },
          ],
          lxdwfzr: [
            { required: true, message: '请填写立项单位负责人', trigger: 'blur' },
          ],
          xmfzrdh: [
            { required: true, message: '请输入项目负责人联系电话', trigger: 'blur' },
          ],
          jfly:[
            { required: true, message: '请选择经费来源', trigger: 'change' },
          ],
          mexz: [
            { required: true, message: '请输入名额限制', trigger: 'blur' },
          ],
          xmlbList:[
            { required: true, message: '请选择项目类别', trigger: 'change' },
          ],
          xsccyq: [
            { required: true, message: '请至少选择一项层次', trigger: 'change' }
          ],
          jhgj:[
            { required: true, message: '可多选', trigger: 'change' },
          ],
          jyjg:[
            { required: true, message: '请输入', trigger: 'blur'}
          ],
          daterange: [
            { required: true, message: '请选择项目活动时间', trigger: 'change' }
          ],
        }
      };
    },
    computed: {
      role () {
        return this.$store.state.role
      }
    },
    watch:{
      daterange(val){
        console.log(val);
        if(val!==null){
          this.form.daterange=[...val];
          this.form.xmts=parseInt(Math.abs(new Date(val[1]) - new Date(val[0])) / 1000 / 60 / 60 /24)+1;
        }
        else{
          this.form.xmts='';
          this.form.daterange=[];
        }
      }
    },
    created(){
      this.getList();
    },
    methods: {
      changeType(val){
        //项目类别列表
        this.$ajax.post('/code/findCodeAndSonCode',{id:this.form.sfzx,typeid:val})
          .then(res=>{
            this.typeList=res.data.data.data;
          });
      },
      //获取下拉列表
      getList(){
        //出国出境
        this.$ajax.post('/projectType/list')
          .then(res=>{
            this.placeList=res.data.data.data;
          });
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
        this.$ajax.post('/code/findCodeAndSonCode',{id:this.form.sfzx,typeid:this.form.typeid})
          .then(res=>{
            this.typeList=res.data.data.data;
          });
        //国家列表
        this.$ajax.post('/code/findCountries')
          .then(res=>{
            this.countryList=res.data.data.data;
          })
      },
      //增加明细表
      addDetail() {
        this.tableData.push({
          detail: '',
          money: '',
        });
      },
      //删除明细表
      handleDelete(index, rows){
        this.$confirm('是否删除该项?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rows.splice(index, 1);
        }).catch(() => {});
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
        }
        else{
          this.$message.error(res.errmsg);
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.form.xmlb=this.form.xmlbList[0];
            this.form.xmlbx=this.form.xmlbList[1];
            this.form.xmjfysmx=JSON.stringify(this.tableData);
            this.form.xmkssj=this.daterange[0];
            this.form.xmzzsj=this.daterange[1];
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
              this.form.fj=JSON.stringify(this.archiveFileList);
            }
            this.$ajax.post('/project/add',this.form)
              .then(res=>{
                if(res.data.errcode==='0'){
                  this.$message.success('申请已提交');
                  if(this.role==='SYS_DEPT'||this.role==='SYS_LXDW'){
                    this.$router.push('/project/list/my')
                  }
                  else{
                    this.$router.push('/project/list/special');
                  }
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