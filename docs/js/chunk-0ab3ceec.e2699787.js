(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0ab3ceec"],{2383:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"project"},[e._m(0),a("el-card",{attrs:{shadow:"hover"}},[a("el-table",{attrs:{data:e.tableData,size:"medium",border:""},on:{"row-dblclick":e.rowDblclick}},[a("el-table-column",{attrs:{prop:"xmmc",label:"项目名称","show-overflow-tooltip":"",align:"center"}}),a("el-table-column",{attrs:{prop:"lxdwmc",label:"立项单位","show-overflow-tooltip":"",align:"center"}}),a("el-table-column",{attrs:{prop:"typeid",label:"出国（境）","show-overflow-tooltip":"",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                    "+e._s("1"===t.row.typeId?"出国":"出境")+"\n                ")]}}])}),a("el-table-column",{attrs:{prop:"jflyname",label:"经费来源","show-overflow-tooltip":"",align:"center"}}),a("el-table-column",{attrs:{prop:"xmlbxname",label:"项目类别","show-overflow-tooltip":"",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                    "+e._s(t.row.xmlbname)+"/"+e._s(t.row.xmlbxname)+"\n                ")]}}])}),a("el-table-column",{attrs:{prop:"time",label:"项目起止时间","show-overflow-tooltip":"",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                    "+e._s(t.row.xmkssj)+"至"+e._s(t.row.xmzzsj)+"\n                ")]}}])}),a("el-table-column",{attrs:{prop:"xsccyq",label:"层次要求","show-overflow-tooltip":"",align:"center"}}),a("el-table-column",{attrs:{prop:"sfzxname",label:"是否专项","show-overflow-tooltip":"",align:"center"}}),a("el-table-column",{attrs:{prop:"xmfzr",label:"项目负责人","show-overflow-tooltip":"",align:"center"}}),a("el-table-column",{attrs:{prop:"xmfzrdh",label:"联系电话","show-overflow-tooltip":"",align:"center"}}),a("el-table-column",{attrs:{prop:"sfhgdj",label:"状态","show-overflow-tooltip":"",align:"center"}}),a("el-table-column",{attrs:{label:"操作",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return["未登记"===t.row.sfhgdj||"延期"===t.row.sfhgdj?a("span",[a("el-button",{attrs:{type:"primary",size:"mini",plain:""},on:{click:function(a){e.handleReg(t.row)}}},[e._v("登记")]),a("el-button",{attrs:{type:"warning",size:"mini",plain:""},on:{click:function(a){e.handleRegAbnormal(t.row)}}},[e._v("异动")])],1):e._e()]}}])})],1),a("el-pagination",{staticClass:"pagination",attrs:{"current-page":e.formSearch.page,"page-sizes":[10,20,50,100,200,500],"page-size":e.formSearch.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"current-change":e.handleCurrentChange,"size-change":e.handleSizeChange}})],1),a("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("header",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(e.dialogName))]),a("el-form",{attrs:{size:"medium"}},[a("el-form-item",{attrs:{label:"异动类型",disabled:e.disable}},[a("el-radio-group",{model:{value:e.abnormal.ydlx,callback:function(t){e.$set(e.abnormal,"ydlx",t)},expression:"abnormal.ydlx"}},[a("el-radio-button",{attrs:{label:"2"}},[e._v("中止")]),a("el-radio-button",{attrs:{label:"3"}},[e._v("延期")])],1)],1),a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:"3"===e.abnormal.ydlx,expression:"abnormal.ydlx==='3'"}],attrs:{label:"延期时间"}},[a("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:e.abnormal.yqsj,callback:function(t){e.$set(e.abnormal,"yqsj",t)},expression:"abnormal.yqsj"}})],1),a("el-form-item",{attrs:{label:"异动原因"}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.abnormal.ydyy,callback:function(t){e.$set(e.abnormal,"ydyy",t)},expression:"abnormal.ydyy"}})],1),a("el-form-item",{attrs:{label:"相关材料"}},[a("el-upload",{attrs:{action:e.$proxy+"/upload/uploadFile","on-remove":e.handleRemove,"on-success":e.handleSuccess}},[a("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-upload"}},[e._v("点击上传")]),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传doc/docx文件，且不超过2M")])],1)],1),a("el-form-item",{staticClass:"block",attrs:{label:" "}},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm()}}},[e._v("确认提交")])],1)],1)],1)],1)},l=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("fieldset",[a("legend",[e._v("回国（入境）登记")])])}],o=(a("7f7f"),a("be94")),n=a("2909"),i={name:"project",data:function(){return{deptList:[],fundsList:[],typeList:[],props:{value:"id",label:"value",children:"sonList"},formSearch:{page:1,limit:10},tableData:[],row:{},total:1,dialogVisible:!1,dialogName:"",disable:!0,abnormal:{id:"",applyId:"",projectId:"",studentId:"",ydlx:"",yqsj:"",ydyy:"",ydcl:"",status:""},fileList:[],archiveFileList:[]}},computed:{role:function(){return this.$store.state.role}},created:function(){this.getTableData()},methods:{getTableData:function(){var e=this;this.$ajax.post("/projectReturn/expirePage",this.formSearch).then(function(t){"0"===t.data.errcode?(e.total=t.data.data.data.records,e.tableData=t.data.data.data.rows):e.$message.error(t.data.errmsg)})},rowDblclick:function(e){this.$store.commit("setData",{name:"regId",data:e.id}),this.$store.commit("setData",{name:"regName",data:"详情"}),this.$router.push("/project/reg/normal")},handleReg:function(e){this.$store.commit("setData",{name:"regId",data:e.id}),this.$store.commit("setData",{name:"regName",data:"登记"}),this.$router.push("/project/reg/normal")},handleRemove:function(e,t){var a=this;console.log(e);var r=e.url?e.url:e.response.path;this.$ajax.post("/resource/deleteFile",{path:r}).then(function(e){"0"===e.data.errcode?(a.fileList=Object(n["a"])(t),console.log(a.fileList)):a.$message.error(e.data.errmsg)})},handleSuccess:function(e,t,a){"0"===e.errcode?(this.fileList=Object(n["a"])(a),console.log(this.fileList)):this.$message.error(e.message)},handleRegAbnormal:function(e){this.row=Object(o["a"])({},e),this.dialogVisible=!0,this.disable=!1,this.dialogName="异动",console.log(e)},submitForm:function(){var e=this;this.$ajax.post("/projectReturn/queryResult",{proResId:this.row.id}).then(function(t){null===t.data.data.data.projectReturn.return?e.abnormal.id="":e.abnormal.id=t.data.data.data.projectReturn.return.id,e.abnormal.applyId=t.data.data.data.projectResult.id,e.abnormal.studentId=t.data.data.data.student.id,e.abnormal.projectId=t.data.data.data.project.sqlRow.id,e.abnormal.status=e.abnormal.ydlx,e.archiveFileList=[];for(var a=0;a<e.fileList.length;a++)e.fileList[a].response?e.archiveFileList.push({url:e.fileList[a].response.path,name:e.fileList[a].name}):e.archiveFileList.push({url:e.fileList[a].url,name:e.fileList[a].name});e.archiveFileList.length>0&&(e.abnormal.ydcl=JSON.stringify(e.archiveFileList)),e.$ajax.post("/projectReturn/checkIn",e.abnormal).then(function(t){"0"===t.data.errcode?(e.handleCurrentChange(1),e.dialogVisible=!1,e.$message.success("异动已提交")):e.$message.error(t.data.errmsg)})})},handleSizeChange:function(e){this.formSearch.limit=e,this.formSearch.page=1,this.getTableData()},handleCurrentChange:function(e){this.formSearch.page=e,this.getTableData()}}},s=i,c=(a("3aad"),a("2877")),d=Object(c["a"])(s,r,l,!1,null,null,null);d.options.__file="list.vue";t["default"]=d.exports},2909:function(e,t,a){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}function l(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function n(e){return r(e)||l(e)||o()}a.d(t,"a",function(){return n})},"3aad":function(e,t,a){"use strict";var r=a("dc98"),l=a.n(r);l.a},be94:function(e,t,a){"use strict";function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},l=Object.keys(a);"function"===typeof Object.getOwnPropertySymbols&&(l=l.concat(Object.getOwnPropertySymbols(a).filter(function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),l.forEach(function(t){r(e,t,a[t])})}return e}a.d(t,"a",function(){return l})},dc98:function(e,t,a){}}]);
//# sourceMappingURL=chunk-0ab3ceec.e2699787.js.map