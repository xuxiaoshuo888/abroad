(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-649da1c8"],{"2e49":function(e,a,t){"use strict";var l=t("3b72"),i=t.n(l);i.a},"3b72":function(e,a,t){},"7c4f":function(e,a,t){"use strict";t.r(a);var l=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"user"},[e._m(0),t("el-card",{staticClass:"header-search"},[t("div",{staticClass:"btn-group"},[t("el-button-group",[t("el-button",{attrs:{size:"medium",type:"primary"},on:{click:e.add}},[e._v("新增")]),t("el-button",{attrs:{size:"medium",type:"primary"},on:{click:e.edit}},[e._v("修改")])],1),t("el-button-group",[t("el-button",{attrs:{size:"medium",type:"primary"},on:{click:e.grant}},[e._v("分配用户")])],1)],1),t("el-table",{attrs:{data:e.tableData},on:{"selection-change":e.handleSelectionChange}},[t("el-table-column",{attrs:{type:"selection",width:"55"}}),t("el-table-column",{attrs:{prop:"id",label:"ID","min-width":"100"}}),t("el-table-column",{attrs:{prop:"name",label:"角色","min-width":"150"}})],1),t("el-pagination",{staticClass:"pagination",attrs:{"current-page":e.formSearch.page,"page-sizes":[10,20,50,100,200,500],"page-size":e.formSearch.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"current-change":e.handleCurrentChange,"size-change":e.handleSizeChange}})],1),t("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(a){e.dialogVisible=a}}},[t("header",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(e.dialogName))]),t("el-form",{ref:"dialogForm",attrs:{model:e.dialogForm,rules:e.rules,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"角色",prop:"name"}},[t("el-input",{attrs:{placeholder:"请输入",clearable:""},model:{value:e.dialogForm.name,callback:function(a){e.$set(e.dialogForm,"name",a)},expression:"dialogForm.name"}})],1)],1),t("footer",{attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(a){e.dialogVisible=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:function(a){e.submitForm("dialogForm")}}},[e._v("确 定")])],1)],1),t("el-dialog",{attrs:{visible:e.dialogVisibleUser},on:{"update:visible":function(a){e.dialogVisibleUser=a}}},[t("header",{attrs:{slot:"title"},slot:"title"},[e._v("分配用户")]),t("el-tabs",{attrs:{"tab-position":"left"},on:{"tab-click":e.handleTab},model:{value:e.tabValue,callback:function(a){e.tabValue=a},expression:"tabValue"}},[t("el-tab-pane",{attrs:{label:"已分配",name:"has"}},[t("el-form",{attrs:{inline:"",size:"mini"}},[t("el-form-item",{attrs:{label:"用户名"}},[t("el-input",{attrs:{placeholder:"请输入"},model:{value:e.dialogTableSearch.username,callback:function(a){e.$set(e.dialogTableSearch,"username",a)},expression:"dialogTableSearch.username"}})],1),t("el-form-item",{attrs:{label:"姓名"}},[t("el-input",{attrs:{placeholder:"请输入"},model:{value:e.dialogTableSearch.truename,callback:function(a){e.$set(e.dialogTableSearch,"truename",a)},expression:"dialogTableSearch.truename"}})],1),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(a){e.handleCurrentChangeDialog(1)}}},[e._v("查询")])],1)],1),t("el-table",{attrs:{data:e.dialogTableHas,border:"",size:"small"},on:{"selection-change":e.handleSelectionChangeHas}},[t("el-table-column",{attrs:{type:"selection",width:"55"}}),t("el-table-column",{attrs:{prop:"username",label:"用户名","min-width":"180"}}),t("el-table-column",{attrs:{prop:"truename",label:"姓名","min-width":"150"}})],1),t("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.dialogTableTotal>e.dialogTableSearch.limit,expression:"dialogTableTotal>dialogTableSearch.limit"}],staticClass:"pagination",attrs:{small:"","current-page":e.dialogTableSearch.page,"page-size":e.dialogTableSearch.limit,layout:"prev, pager, next",total:e.dialogTableTotal},on:{"current-change":e.handleCurrentChangeDialog}})],1),t("el-tab-pane",{attrs:{label:"可分配",name:"not"}},[t("el-form",{attrs:{inline:"",size:"mini"}},[t("el-form-item",{attrs:{label:"用户名"}},[t("el-input",{attrs:{placeholder:"请输入"},model:{value:e.dialogTableSearch.username,callback:function(a){e.$set(e.dialogTableSearch,"username",a)},expression:"dialogTableSearch.username"}})],1),t("el-form-item",{attrs:{label:"姓名"}},[t("el-input",{attrs:{placeholder:"请输入"},model:{value:e.dialogTableSearch.truename,callback:function(a){e.$set(e.dialogTableSearch,"truename",a)},expression:"dialogTableSearch.truename"}})],1),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(a){e.handleCurrentChangeDialog(1)}}},[e._v("查询")])],1)],1),t("el-table",{attrs:{data:e.dialogTableNot,border:"",size:"small"},on:{"selection-change":e.handleSelectionChangeNot}},[t("el-table-column",{attrs:{type:"selection",width:"55"}}),t("el-table-column",{attrs:{prop:"username",label:"用户名","min-width":"180"}}),t("el-table-column",{attrs:{prop:"truename",label:"姓名","min-width":"150"}})],1),t("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.dialogTableTotalNot>e.dialogTableSearch.limit,expression:"dialogTableTotalNot>dialogTableSearch.limit"}],staticClass:"pagination",attrs:{small:"","current-page":e.dialogTableSearch.page,"page-size":e.dialogTableSearch.limit,layout:"prev, pager, next",total:e.dialogTableTotalNot},on:{"current-change":e.handleCurrentChangeDialog}})],1)],1),t("footer",{attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(a){e.dialogVisibleUser=!1}}},[e._v("取 消")]),t("el-button",{directives:[{name:"show",rawName:"v-show",value:"has"===e.tabValue,expression:"tabValue==='has'"}],attrs:{type:"primary"},on:{click:e.submitUserDel}},[e._v("移 除")]),t("el-button",{directives:[{name:"show",rawName:"v-show",value:"not"===e.tabValue,expression:"tabValue==='not'"}],attrs:{type:"primary"},on:{click:e.submitUserAdd}},[e._v("分 配")])],1)],1)],1)},i=[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("fieldset",[t("legend",[e._v("角色")])])}],o=t("be94"),n={name:"user",data:function(){return{formSearch:{page:1,limit:10},total:1,tableData:[],multipleSelection:[],dialogVisible:!1,dialogName:"",dialogForm:{name:""},rules:{name:[{required:!0,message:"角色名不能为空",trigger:"blur"}]},dialogVisibleUser:!1,tabValue:"has",dialogTableHas:[],has:[],dialogTableNot:[],not:[],dialogTableSearch:{page:1,limit:10,roleId:"",username:"",truename:""},dialogTableTotal:1,dialogTableTotalNot:1}},created:function(){this.getTableData()},methods:{getTableData:function(){var e=this;this.$ajax.post("/role/page",this.formSearch).then(function(a){e.total=a.data.data.records,e.tableData=a.data.data.data})},handleSelectionChange:function(e){this.multipleSelection=e},add:function(){for(var e in this.dialogForm)delete this.dialogForm[e];this.dialogVisible=!0,this.dialogName="添加"},edit:function(){0===this.multipleSelection.length?this.$message.warning("请选择数据"):this.multipleSelection.length>1?this.$message.warning("只能选择一项编辑"):(this.dialogForm=Object(o["a"])({},this.multipleSelection[0]),this.dialogVisible=!0,this.dialogName="编辑")},submitForm:function(e){var a=this,t="添加"===this.dialogName?"/role/add":"/role/edit";this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;console.log(a.dialogForm),a.$ajax.post(t,a.dialogForm).then(function(e){a.handleCurrentChange(1),a.dialogVisible=!1,a.$message.success(e.data.errmsg)})})},grant:function(){0===this.multipleSelection.length?this.$message.warning("请选择数据"):this.multipleSelection.length>1?this.$message.warning("只能选择一项分配"):(this.dialogTableSearch.roleId=this.multipleSelection[0].id,this.tabValue="has",this.getHas(),this.getNot(),this.dialogVisibleUser=!0)},getHas:function(){var e=this;this.$ajax.post("/role/getPagerByRole",this.dialogTableSearch).then(function(a){e.dialogTableTotal=a.data.data.records,e.dialogTableHas=a.data.data.data})},getNot:function(){var e=this;this.$ajax.post("/role/getUsersPage",this.dialogTableSearch).then(function(a){e.dialogTableTotalNot=a.data.data.records,e.dialogTableNot=a.data.data.data})},handleSelectionChangeHas:function(e){this.has=e},handleSelectionChangeNot:function(e){this.not=e},handleTab:function(){this.dialogTableSearch.page=1,this.dialogTableSearch.truename="",this.dialogTableSearch.username=""},submitUserAdd:function(){var e=this,a=[];for(var t in this.not)a.push(this.not[t].id);this.$ajax.post("/role/addUser",{roleId:this.dialogTableSearch.roleId,userids:a}).then(function(a){e.handleCurrentChangeDialog(1),e.dialogVisibleUser=!1,e.$message.success(a.data.errmsg)})},submitUserDel:function(){var e=this,a=[];for(var t in this.has)a.push(this.has[t].id);this.$ajax.post("/role/removeRoleUsers",{roleId:this.dialogTableSearch.roleId,userids:a}).then(function(a){e.handleCurrentChangeDialog(1),e.dialogVisibleUser=!1,e.$message.success(a.data.errmsg)})},handleSizeChange:function(e){this.formSearch.limit=e,this.formSearch.page=1,this.getTableData()},handleCurrentChange:function(e){this.formSearch.page=e,this.getTableData()},handleCurrentChangeDialog:function(e){this.dialogTableSearch.page=e,console.log(this.tabValue),"has"===this.tabValue?this.getHas():this.getNot()}}},r=n,s=(t("2e49"),t("2877")),c=Object(s["a"])(r,l,i,!1,null,null,null);c.options.__file="role.vue";a["default"]=c.exports},be94:function(e,a,t){"use strict";function l(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function i(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{},i=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.forEach(function(a){l(e,a,t[a])})}return e}t.d(a,"a",function(){return i})}}]);
//# sourceMappingURL=chunk-649da1c8.b09a098c.js.map