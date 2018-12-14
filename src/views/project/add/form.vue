<template>
    <div>
        <el-form :disabled="disable" inline size="medium" :model="form" ref="form" label-width="110px" class="form-inline dialog-form">
            <el-form-item label="项目名称" class="block" prop="xmmc">
                <el-input v-model="form.xmmc" class="name"></el-input>
            </el-form-item>
            <el-form-item label="审批状态" class="block" v-if="row.sfzx==='101'&&role!=='SYS_STUDENT'">
                <el-tag v-if="form.status==='1'" size="medium">待审核</el-tag>
                <el-tag v-else-if="form.status==='2'" size="medium" type="warning">已通过</el-tag>
                <el-tag v-else-if="form.status==='8'" size="medium" type="success">已发布</el-tag>
                <el-tag v-else size="medium" type="info">未通过</el-tag>
            </el-form-item>
            <el-form-item label="出国/出境" class="block" prop="typeid">
                <el-select v-model="form.typeid" placeholder="请选择">
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
                <el-input class="other" v-model="form.jflyqt" v-show="form.jfly==='101002007'||form.jfly==='102002004'" placeholder="输入其他专项具体内容"></el-input>
            </el-form-item>
            <el-form-item label="名额限制" class="block" prop="mexz">
                <el-input-number v-model="form.mexz"></el-input-number>
            </el-form-item>
            <el-form-item label="项目类别" class="block" prop="xmlbList">
                <el-cascader v-model="form.xmlblist" :options="typeList" :props="props"></el-cascader>
                <el-input class="other" v-model="form.xmlbqt" v-show="form.xmlbx==='101001001004'||form.xmlbx==='101001002005'||form.xmlbx==='102001001004'||form.xmlbx==='102001002005'" placeholder="输入其他专项具体内容"></el-input>
            </el-form-item>
            <el-form-item label="学生层次要求" class="block" prop="xsccyq">
                <el-checkbox-group v-model="form.xsccyqlist" size="small">
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
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
                <el-input v-model="form.xmts" disabled placeholder="项目天数" style="width: 90px;text-align:center;margin-left: 20px"></el-input>
            </el-form-item>
            <!--非专项专有申请起止时间-->
            <template v-if="row.sfzx==='102'">
                <el-form-item label="申请开始时间">
                    <el-date-picker class="select" v-model="form.xssqkssj" type="date" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
                <el-form-item label="申请结束时间">
                    <el-date-picker class="select" v-model="form.xssqzzsj" type="date" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
            </template>
            <el-form-item label="经费组成" class="block" v-if="row.sfzx==='101'&&role!=='SYS_STUDENT'">
                <el-input class="complex" placeholder="金额" v-model.number="form.dwzz">
                    <template slot="prepend">单位资助</template>
                    <el-select v-model="form.dwzzlx" slot="append" placeholder="请选择">
                        <el-option label="元" value="1"></el-option>
                        <el-option label="元/人" value="2"></el-option>
                    </el-select>
                </el-input>
                <el-input class="complex" placeholder="金额" v-model.number="form.xxjlnew">
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
            <el-form-item label="经费组成" class="block" v-if="row.sfzx==='102'&&role!=='SYS_STUDENT'">
                <el-input class="complex" placeholder="金额" v-model.number="form.xndwzz">
                    <template slot="prepend">校内单位资助</template>
                    <el-select v-model="form.xndwzzlx" slot="append" placeholder="请选择">
                        <el-option label="元" value="1"></el-option>
                        <el-option label="元/人" value="2"></el-option>
                    </el-select>
                </el-input>
                <el-input class="complex" placeholder="金额" v-model.number="form.xszc">
                    <template slot="prepend">学生自筹</template>
                    <template slot="append">元/人</template>
                </el-input>
                <el-input class="complex" placeholder="金额" v-model.number="form.xwdwzz">
                    <template slot="prepend">校外单位资助</template>
                    <el-select v-model="form.xwdwzzlx" slot="append" placeholder="请选择">
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
            <el-form-item label="经费预算明细" class="block" v-if="row.sfzx==='101'&&role!=='SYS_STUDENT'">
                <el-table :data="form.xmjfysmxlist" border empty-text="暂无明细" class="detailTable">
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
                        <template slot="header" slot-scope="scope" v-if="name==='编辑'">
                            <el-button plain
                                       size="mini"
                                       type="primary"
                                       @click="addDetail">新增</el-button>
                        </template>
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="text"
                                    @click="handleDelete(scope.$index, form.xmjfysmxlist)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item label="项目材料上传" class="block" v-if="name==='编辑'">
                <el-upload :action="$proxy+'/upload/uploadFile'" :on-remove="handleRemove" :on-success="handleSuccess" :file-list="form.fjlist">
                    <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传doc/docx文件，且不超过2M</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="项目材料上传" class="block" v-else>
                <el-table :data="form.fjlist" border class="detailTable">
                    <el-table-column prop="name" label="文件名" width="600px"></el-table-column>
                    <el-table-column prop="url" label="文件地址">
                        <template slot-scope="scope"><a :href="$proxy+$downloadUrl+scope.row.url" class="el-icon-download">下载</a></template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item label="审批记录" class="block" v-if="form.status!=='1'">
                <el-tag type="success" size="mini">{{form.shrxm}}</el-tag> 在 <el-tag type="success" size="mini">{{form.shsj}}</el-tag> 审核通过 <span v-if="isChanged">学校奖励更改为{{form.xxjlnew}}元/人</span>
            </el-form-item>
            <el-form-item label="申请截止时间" class="block" v-if="name==='编辑'&&form.status==='8'">
                <el-date-picker v-model="form.xssqzzsj" type="date" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-form-item label=" " v-if="name==='编辑'">
                <el-button type="primary" @click="submitEdit()">确认提交</el-button>
            </el-form-item>
            <el-form-item v-if="row.status==='9'" label="审批意见" class="block">
                <el-input type="textarea" v-model="form.shyj"></el-input>
            </el-form-item>
        </el-form>
        <el-form v-if="name==='审批'" inline size="medium" label-width="110px" class="form-inline dialog-form">
            <el-form-item label="审批">
                <el-radio-group v-model="approve.type">
                    <el-radio-button label="2">通过</el-radio-button>
                    <el-radio-button label="9">不通过</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="学校奖励" v-show="approve.type==='2'">
                <el-input-number v-model="approve.money" :step="500" controls-position="right"></el-input-number>
            </el-form-item>
            <el-form-item label="审批意见" v-show="approve.type==='9'" class="block">
                <el-input type="textarea" v-model="approve.text"></el-input>
            </el-form-item>
            <el-form-item label=" " class="block">
                <el-button type="primary" @click="submitApprove()">确认提交</el-button>
            </el-form-item>
        </el-form>
        <el-form v-if="name==='发布'" inline size="medium" label-width="110px" class="form-inline dialog-form">
            <el-form-item label="申请截止时间" class="block">
                <el-date-picker v-model="release.time" type="date" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>（截止至23：59：59）
            </el-form-item>
            <el-form-item label=" " class="block">
                <el-button type="primary" @click="submitRelease()">确认提交</el-button>
            </el-form-item>
        </el-form>
        <el-form v-if="name==='登记'" inline size="medium" label-width="110px" class="form-inline dialog-form">
            <el-form-item label="登记时间">
                <el-date-picker v-model="reg.shsj" type="date" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-form-item label=" " class="block">
                <el-button type="primary" @click="submitReg()">确认提交</el-button>
            </el-form-item>
        </el-form>
        <el-form v-if="name==='申请'" inline size="medium" label-width="110px" class="form-inline dialog-form">
            <el-form-item label=" " class="block">
                <el-button type="primary" @click="applyProject()">申请该项目</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
    name: "project",
    props:{
      row:Object,//行数据
      disable:Boolean,//表单是否可填写
      name:String,//弹窗操作名
      sfzx:String,//102非专项
    },
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
        // xmlblist:[],
        // xsccyq:[],//学生层次要求
        daterange:[],//项目时间原始选择项
        countryList:[],//国家列表
        // tableData:[],//预算明细表格
        fileList:[],//upload本身上传文件
        archiveFileList:[],//附件所需结构

        form:{...this.row},
        // form:{
        //   xmmc:'',//项目名称
        //   typeid:'',//出国出境
        //   sfzx:'101',//是否专项
        //   lxdwid:'',//立项单位ID
        //   lxdwmc:'',//立项单位名称
        //   lxdwfzr:'',//立项单位负责人
        //   xmfzr:'',//项目负责人
        //   xmfzrdh:'',//项目负责人联系电话
        //   jfly:'',//经费来源
        //   jflyqt:'',//经费来源其它手动输入
        //   mexz:0,//名额限制
        //   xmlbList:[],//项目类别原始选择项
        //   xmlb:'',//项目类别
        //   xmlbx:'',//项目类别项
        //   xmlbqt:'', //项目类别项其它手动输入
        //
        //   jhgj:'',//交换/交流国家（地区）
        //   jyjg:'',//大学或教育机构
        //   daterange:[],
        //   xmkssj:'',//项目开始时间
        //   xmzzsj:'',//项目终止时间
        //   xmts:'',//项目天数
        //   dwzz:'',//单位资助
        //   dwzzlx:'1',//单位资助类型
        //   xxjl:'',//学校奖励
        //   xxjlnew:'',//学校奖励修改后
        //   xszc:'',//学生自筹
        //   xszclx:'1',//学生自筹类型
        //   xndwzz:0,//校内单位资助
        //   xndwzzlx:'1',//校内单位资助类型
        //   xwdwzz:0,//校外单位资助
        //   xwdwzzlx:'1',//校外单位资助类型,1表示总金额，2表示人均
        //   xmlxly:'',//项目立项理由及主要内容
        //   xmxcap:'',//项目行程安排
        //   xszgyq:'',//学生申请本项目的资格要求
        //   xmjfys:0,//项目经费预算
        //   xmjfysmx:'',//项目经费预算明细
        //   fj:'',//附件
        //   xmqtsm:'',//项目其他说明
        // },
        //审批
        //审批
        approve:{
          id:'',
          type:'',
          text:'',
          money:''
        },
        //发布
        release:{
          id:'',
          time:'',
        },
        //登记
        reg:{
          id:'',
          shsj:'',
        },
      };
    },
    computed: {
      role () {
        return this.$store.state.role
      },
    },
    watch:{
      row:{
        handler(val){
          console.log(val);
          this.form={...val};
        },
        deep:true
      },
      daterange(val){
        if(val!==null){
          this.form.daterange=[...val];
          this.form.xmts=parseInt(Math.abs(new Date(val[1]) - new Date(val[0])) / 1000 / 60 / 60 /24)+1;
        }
        else{
          this.form.xmts='';
          this.form.daterange=[];
        }
      },
      'form.xmlblist'(val){
        this.form.xmlbx=val[1]
      }
    },
    created(){
      this.getList();
      this.form={...this.row}
      console.log(this.form)
      this.approve.money=this.form.xxjl;
      this.daterange=[new Date(this.row.xmkssj),new Date(this.row.xmzzsj)]
    },
    methods: {
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
        this.$ajax.post('/code/findJfly',{id:this.row.sfzx})
          .then(res=>{
            this.fundsList=res.data.data.data;
          });
        //项目类别列表
        this.$ajax.post('/code/findCodeAndSonCode',{id:this.row.sfzx})
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
        this.form.xmjfysmxlist.push({
          detail: '',
          money: '',
        });
      },
      //删除明细表
      handleDelete(index, rows){
        rows.splice(index, 1);
      },
      //附件上传
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
      //提交审批
      submitApprove(){
        this.approve.id=this.row.id;
        this.$ajax.post('/project/approve',this.approve)
          .then(res=>{
            if(res.data.errcode==='0'){
              this.$emit('submit-approve',res)
            }
            else{
              this.$message.error(res.data.errmsg);
            }
          })
      },
      //提交发布
      submitRelease(){
        this.release.id=this.row.id;
        this.$ajax.post('/project/release',this.release)
          .then(res=>{
            if(res.data.errcode==='0'){
              this.$emit('submit-release',res)
            }
            else{
              this.$message.error(res.data.errmsg);
            }
          })
      },
      //提交登记
      submitReg(){
        this.reg.id=this.row.id;
        this.$ajax.post('/project/release',this.reg)
          .then(res=>{
            if(res.data.errcode==='0'){
              this.$emit('submit-reg',res)
            }
            else{
              this.$message.error(res.data.errmsg);
            }
          })
      },
      //提交编辑
      submitEdit(){
        this.form.xmlb=this.form.xmlblist[0];
        this.form.xmlbx=this.form.xmlblist[1];

        this.form.xmjfysmx=JSON.stringify(this.form.xmjfysmxlist);

        this.form.xmkssj=this.dateFormat('yyyy-MM-dd hh:mm:ss',this.daterange[0]);
        this.form.xmzzsj=this.dateFormat('yyyy-MM-dd hh:mm:ss',this.daterange[1]);
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
        this.$ajax.post('/project/update',this.form)
          .then(res=>{
            if(res.data.errcode==='0'){
              this.$emit('submit-edit',res)
            }
            else{
              this.$message.error(res.data.errmsg);
            }
          })
      },
      //申请项目
      applyProject(){
        this.$store.commit('setData',{
          name:'applyProject',
          data:{...this.row}
        });
        this.$router.push('/project/apply');
      },
      //日期格式函数
      dateFormat(fmt,date) {
        let o = {
          "M+" : date.getMonth()+1,                 //月份
          "d+" : date.getDate(),                    //日
          "h+" : date.getHours(),                   //小时
          "m+" : date.getMinutes(),                 //分
          "s+" : date.getSeconds(),                 //秒
          "q+" : Math.floor((date.getMonth()+3)/3), //季度
          "S"  : date.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
          fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(let k in o)
          if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
      },
      //新旧学校奖励金额对比
      isChanged(){
        if(this.form.xxjl && this.form.xxjlnew){
          if(this.form.xxjl == this.form.xxjlnew){//未修改
            return false
          }else{
            return true
          }
        }
      }
    }
  }
</script>

<style lang="scss">
    .dialog-form{
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