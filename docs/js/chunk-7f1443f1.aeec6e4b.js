(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7f1443f1"],{2909:function(e,t,l){"use strict";function a(e){if(Array.isArray(e)){for(var t=0,l=new Array(e.length);t<e.length;t++)l[t]=e[t];return l}}function r(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function s(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function o(e){return a(e)||r(e)||s()}l.d(t,"a",function(){return o})},3307:function(e,t,l){"use strict";var a=l("af5e"),r=l.n(a);r.a},af5e:function(e,t,l){},e3a6:function(e,t,l){"use strict";l.r(t);var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"project"},[e._m(0),l("el-card",[l("header",{attrs:{slot:"header"},slot:"header"},[e._v("立项")]),l("el-form",{ref:"form",staticClass:"form-inline",attrs:{inline:"",size:"medium",model:e.form,rules:e.rules,"label-width":"110px"}},[l("el-form-item",{staticClass:"block",attrs:{label:"项目名称",prop:"xmmc"}},[l("el-input",{staticClass:"name",model:{value:e.form.xmmc,callback:function(t){e.$set(e.form,"xmmc",t)},expression:"form.xmmc"}})],1),l("el-form-item",{staticClass:"block",attrs:{label:"出国（境）",prop:"typeid"}},[l("el-select",{attrs:{placeholder:"请选择"},on:{change:e.changeType},model:{value:e.form.typeid,callback:function(t){e.$set(e.form,"typeid",t)},expression:"form.typeid"}},e._l(e.placeList,function(e){return l("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),l("el-form-item",{attrs:{label:"立项单位",prop:"lxdwid"}},[l("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:e.form.lxdwid,callback:function(t){e.$set(e.form,"lxdwid",t)},expression:"form.lxdwid"}},e._l(e.deptList,function(e){return l("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),l("el-form-item",{attrs:{label:"项目负责人",prop:"xmfzr"}},[l("el-input",{staticClass:"select",model:{value:e.form.xmfzr,callback:function(t){e.$set(e.form,"xmfzr",t)},expression:"form.xmfzr"}})],1),l("el-form-item",{attrs:{label:"单位负责人",prop:"lxdwfzr"}},[l("el-input",{staticClass:"select",model:{value:e.form.lxdwfzr,callback:function(t){e.$set(e.form,"lxdwfzr",t)},expression:"form.lxdwfzr"}})],1),l("el-form-item",{attrs:{label:"负责人电话",prop:"xmfzrdh"}},[l("el-input",{staticClass:"select",model:{value:e.form.xmfzrdh,callback:function(t){e.$set(e.form,"xmfzrdh",t)},expression:"form.xmfzrdh"}})],1),l("el-form-item",{staticClass:"block",attrs:{label:"经费来源",prop:"jfly"}},[l("el-select",{model:{value:e.form.jfly,callback:function(t){e.$set(e.form,"jfly",t)},expression:"form.jfly"}},e._l(e.fundsList,function(e){return l("el-option",{key:e.id,attrs:{label:e.value,value:e.id}})})),l("el-input",{directives:[{name:"show",rawName:"v-show",value:"101002007"===e.form.jfly,expression:"form.jfly==='101002007'"}],staticClass:"other",attrs:{placeholder:"输入其他专项具体内容"},model:{value:e.form.jflyqt,callback:function(t){e.$set(e.form,"jflyqt",t)},expression:"form.jflyqt"}})],1),l("el-form-item",{staticClass:"block",attrs:{label:"名额限制",prop:"mexz"}},[l("el-input-number",{model:{value:e.form.mexz,callback:function(t){e.$set(e.form,"mexz",t)},expression:"form.mexz"}})],1),l("el-form-item",{staticClass:"block",attrs:{label:"项目类别",prop:"xmlbList"}},[l("el-cascader",{attrs:{options:e.typeList,props:e.props},model:{value:e.form.xmlbList,callback:function(t){e.$set(e.form,"xmlbList",t)},expression:"form.xmlbList"}}),l("el-input",{directives:[{name:"show",rawName:"v-show",value:"101001001004"===e.form.xmlbList[1]||"101001002005"===e.form.xmlbList[1],expression:"form.xmlbList[1]==='101001001004'||form.xmlbList[1]==='101001002005'"}],staticClass:"other",attrs:{placeholder:"输入其他专项具体内容"},model:{value:e.form.xmlbqt,callback:function(t){e.$set(e.form,"xmlbqt",t)},expression:"form.xmlbqt"}})],1),l("el-form-item",{staticClass:"block",attrs:{label:"学生层次要求",prop:"xsccyq"}},[l("el-checkbox-group",{attrs:{size:"small"},model:{value:e.form.xsccyq,callback:function(t){e.$set(e.form,"xsccyq",t)},expression:"form.xsccyq"}},[l("el-checkbox",{attrs:{label:"本科生",border:""}}),l("el-checkbox",{attrs:{label:"硕士生",border:""}}),l("el-checkbox",{attrs:{label:"博士生",border:""}})],1)],1),l("el-form-item",{attrs:{label:"国家（地区）",prop:"jhgj"}},[l("el-select",{attrs:{multiple:"",filterable:"",placeholder:"选择交换/交流国家（地区）"},model:{value:e.form.jhgj,callback:function(t){e.$set(e.form,"jhgj",t)},expression:"form.jhgj"}},e._l(e.countryList,function(e){return l("el-option",{key:e.id,attrs:{label:e.value,value:e.id}})}))],1),l("el-form-item",{attrs:{label:"院校/教育机构",prop:"jyjg"}},[l("el-input",{staticClass:"select",model:{value:e.form.jyjg,callback:function(t){e.$set(e.form,"jyjg",t)},expression:"form.jyjg"}})],1),l("el-form-item",{staticClass:"block",attrs:{label:"项目活动时间",prop:"daterange"}},[l("el-date-picker",{attrs:{"unlink-panels":"",type:"daterange","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.daterange,callback:function(t){e.daterange=t},expression:"daterange"}}),l("el-input",{staticStyle:{width:"90px","text-align":"center","margin-left":"20px"},attrs:{disabled:"",placeholder:"项目天数"},model:{value:e.form.xmts,callback:function(t){e.$set(e.form,"xmts",t)},expression:"form.xmts"}})],1),l("el-form-item",{staticClass:"block",attrs:{label:"经费组成"}},[l("el-input",{staticClass:"complex",attrs:{placeholder:"金额"},model:{value:e.form.dwzz,callback:function(t){e.$set(e.form,"dwzz",e._n(t))},expression:"form.dwzz"}},[l("template",{slot:"prepend"},[e._v("单位资助")]),l("el-select",{attrs:{slot:"append",placeholder:"请选择"},slot:"append",model:{value:e.form.dwzzlx,callback:function(t){e.$set(e.form,"dwzzlx",t)},expression:"form.dwzzlx"}},[l("el-option",{attrs:{label:"元",value:"1"}}),l("el-option",{attrs:{label:"元/人",value:"2"}})],1)],2),l("el-input",{staticClass:"complex",attrs:{placeholder:"金额"},model:{value:e.form.xxjl,callback:function(t){e.$set(e.form,"xxjl",e._n(t))},expression:"form.xxjl"}},[l("template",{slot:"prepend"},[e._v("学校奖励")]),l("template",{slot:"append"},[e._v("元/人")])],2),l("el-input",{staticClass:"complex",attrs:{placeholder:"金额"},model:{value:e.form.xszc,callback:function(t){e.$set(e.form,"xszc",e._n(t))},expression:"form.xszc"}},[l("template",{slot:"prepend"},[e._v("学生自筹")]),l("el-select",{attrs:{slot:"append",placeholder:"请选择"},slot:"append",model:{value:e.form.xszclx,callback:function(t){e.$set(e.form,"xszclx",t)},expression:"form.xszclx"}},[l("el-option",{attrs:{label:"元",value:"1"}}),l("el-option",{attrs:{label:"元/人",value:"2"}})],1)],2)],1),l("el-form-item",{staticClass:"block",attrs:{label:"立项理由"}},[l("el-input",{attrs:{type:"textarea",autosize:{minRows:4},placeholder:"请填写项目立项理由及主要内容（2000字以内）"},model:{value:e.form.xmlxly,callback:function(t){e.$set(e.form,"xmlxly",t)},expression:"form.xmlxly"}})],1),l("el-form-item",{staticClass:"block",attrs:{label:"行程安排"}},[l("el-input",{attrs:{type:"textarea",autosize:{minRows:4},placeholder:"请填写项目行程安排（1000字以内）"},model:{value:e.form.xmxcap,callback:function(t){e.$set(e.form,"xmxcap",t)},expression:"form.xmxcap"}})],1),l("el-form-item",{staticClass:"block",attrs:{label:"资格要求"}},[l("el-input",{attrs:{type:"textarea",autosize:{minRows:4},placeholder:"请填写学生申请本项目的资格要求（1000字以内）"},model:{value:e.form.xszgyq,callback:function(t){e.$set(e.form,"xszgyq",t)},expression:"form.xszgyq"}})],1),l("el-form-item",{staticClass:"block",attrs:{label:"其他说明"}},[l("el-input",{attrs:{type:"textarea",autosize:{minRows:4},placeholder:"可填写项目的其他说明（1000字以内）"},model:{value:e.form.xmqtsm,callback:function(t){e.$set(e.form,"xmqtsm",t)},expression:"form.xmqtsm"}})],1),l("el-form-item",{staticClass:"block",attrs:{label:"经费预算明细"}},[l("el-table",{staticClass:"detailTable",attrs:{data:e.tableData,border:"","empty-text":"暂无明细"}},[l("el-table-column",{attrs:{type:"index",width:"50"}}),l("el-table-column",{attrs:{prop:"detail",label:"支出明细描述"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-input",{model:{value:t.row.detail,callback:function(l){e.$set(t.row,"detail",l)},expression:"scope.row.detail"}})]}}])}),l("el-table-column",{attrs:{prop:"money",label:"金额（元）",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-input",{model:{value:t.row.money,callback:function(l){e.$set(t.row,"money",l)},expression:"scope.row.money"}})]}}])}),l("el-table-column",{attrs:{align:"center",width:"100"},scopedSlots:e._u([{key:"header",fn:function(t){return[l("el-button",{attrs:{plain:"",size:"mini",type:"primary"},on:{click:function(l){e.addDetail(t.row)}}},[e._v("新增")])]}},{key:"default",fn:function(t){return[l("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(l){e.handleDelete(t.$index,e.tableData)}}},[e._v("删除")])]}}])})],1)],1),l("el-form-item",{attrs:{label:"项目材料上传"}},[l("el-upload",{attrs:{action:e.$proxy+"/upload/uploadFile","on-remove":e.handleRemove,"on-success":e.handleSuccess}},[l("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-upload"}},[e._v("点击上传")]),l("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传doc/docx文件，且不超过2M")])],1)],1),l("el-form-item",{staticClass:"submit"},[l("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("form")}}},[e._v("确认提交")]),l("el-button",{on:{click:function(t){e.resetForm("form")}}},[e._v("重置内容")])],1)],1)],1)],1)},r=[function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("fieldset",[l("legend",[e._v("专项项目")])])}],s=(l("7f7f"),l("2909")),o={name:"project",data:function(){return{placeList:[],deptList:[],fundsList:[],typeList:[],props:{value:"id",label:"value",children:"sonList"},daterange:[],countryList:[],tableData:[],fileList:[],archiveFileList:[],form:{xmmc:"",typeid:"",sfzx:"101",lxdwid:"",lxdwmc:"",lxdwfzr:"",xmfzr:"",xmfzrdh:"",jfly:"",jflyqt:"",mexz:0,xmlbList:[],xmlb:"",xmlbx:"",xmlbqt:"",xsccyq:[],jhgj:[],jyjg:"",daterange:[],xmkssj:"",xmzzsj:"",xmts:"",dwzz:"",dwzzlx:"1",xxjl:"",xszc:"",xszclx:"1",xndwzz:0,xndwzzlx:"1",xwdwzz:0,xwdwzzlx:"1",xmlxly:"",xmxcap:"",xszgyq:"",xmjfys:0,xmjfysmx:"",fj:"",xmqtsm:""},rules:{xmmc:[{required:!0,message:"请输入项目名称",trigger:"blur"}],typeid:[{required:!0,message:"请选择出国/出境",trigger:"change"}],lxdwid:[{required:!0,message:"请选择立项单位",trigger:"change"}],xmfzr:[{required:!0,message:"请填写项目负责人",trigger:"blur"}],lxdwfzr:[{required:!0,message:"请填写立项单位负责人",trigger:"blur"}],xmfzrdh:[{required:!0,message:"请输入项目负责人联系电话",trigger:"blur"}],jfly:[{required:!0,message:"请选择经费来源",trigger:"change"}],mexz:[{required:!0,message:"请输入名额限制",trigger:"blur"}],xmlbList:[{required:!0,message:"请选择项目类别",trigger:"change"}],xsccyq:[{required:!0,message:"请至少选择一项层次",trigger:"change"}],jhgj:[{required:!0,message:"可多选",trigger:"change"}],jyjg:[{required:!0,message:"请输入",trigger:"blur"}],daterange:[{required:!0,message:"请选择项目活动时间",trigger:"change"}]}}},computed:{role:function(){return this.$store.state.role}},watch:{daterange:function(e){console.log(e),null!==e?(this.form.daterange=Object(s["a"])(e),this.form.xmts=parseInt(Math.abs(new Date(e[1])-new Date(e[0]))/1e3/60/60/24)+1):(this.form.xmts="",this.form.daterange=[])}},created:function(){this.getList()},methods:{changeType:function(e){var t=this;this.$ajax.post("/code/findCodeAndSonCode",{id:this.form.sfzx,typeid:e}).then(function(e){t.typeList=e.data.data.data})},getList:function(){var e=this;this.$ajax.post("/projectType/list").then(function(t){e.placeList=t.data.data.data}),this.$ajax.post("/dept/list").then(function(t){e.deptList=t.data.data.data}),this.$ajax.post("/code/findJfly",{id:this.form.sfzx}).then(function(t){e.fundsList=t.data.data.data}),this.$ajax.post("/code/findCodeAndSonCode",{id:this.form.sfzx,typeid:this.form.typeid}).then(function(t){e.typeList=t.data.data.data}),this.$ajax.post("/code/findCountries").then(function(t){e.countryList=t.data.data.data})},addDetail:function(){this.tableData.push({detail:"",money:""})},handleDelete:function(e,t){this.$confirm("是否删除该项?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.splice(e,1)}).catch(function(){})},handleRemove:function(e,t){var l=this,a=e.url?e.url:e.response.path;this.$ajax.post("/resource/deleteFile",{path:a}).then(function(e){"0"===e.data.errcode?l.fileList=t:l.$message.error(e.data.errmsg)})},handleSuccess:function(e,t,l){"0"===e.errcode?this.fileList=l:this.$message.error(e.errmsg)},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.form.xmlb=t.form.xmlbList[0],t.form.xmlbx=t.form.xmlbList[1],t.form.xmjfysmx=JSON.stringify(t.tableData),t.form.xmkssj=t.daterange[0],t.form.xmzzsj=t.daterange[1],t.archiveFileList=[];for(var l=0;l<t.fileList.length;l++)t.fileList[l].response?t.archiveFileList.push({url:t.fileList[l].response.path,name:t.fileList[l].name}):t.archiveFileList.push({url:t.fileList[l].url,name:t.fileList[l].name});t.archiveFileList.length>0&&(t.form.fj=JSON.stringify(t.archiveFileList)),t.$ajax.post("/project/add",t.form).then(function(e){"0"===e.data.errcode&&(t.$message.success("申请已提交"),"SYS_DEPT"===t.role||"SYS_LXDW"===t.role?t.$router.push("/project/list/my"):t.$router.push("/project/list/special"))})})},resetForm:function(e){this.$refs[e].resetFields()}}},i=o,n=(l("3307"),l("2877")),c=Object(n["a"])(i,a,r,!1,null,null,null);c.options.__file="special.vue";t["default"]=c.exports}}]);
//# sourceMappingURL=chunk-7f1443f1.aeec6e4b.js.map