(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3ae1f783"],{"296c":function(e,t,a){"use strict";var l=a("cc66"),o=a.n(l);o.a},b774:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"project"},[a("el-card",{staticClass:"card-search",attrs:{shadow:"hover"}},[a("header",{attrs:{slot:"header"},slot:"header"},[e._v("已发布项目（学生）")]),a("el-form",{staticClass:"form-inline-search",attrs:{inline:"",model:e.formSearch,size:"mini"}},[a("el-form-item",{attrs:{label:"项目名称"}},[a("el-input",{attrs:{placeholder:"项目名称",clearable:""},model:{value:e.formSearch.name,callback:function(t){e.$set(e.formSearch,"name",t)},expression:"formSearch.name"}})],1),a("el-form-item",{attrs:{label:"项目单位"}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:e.formSearch.lxdwId,callback:function(t){e.$set(e.formSearch,"lxdwId",t)},expression:"formSearch.lxdwId"}},e._l(e.deptList,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),a("el-form-item",{attrs:{label:"项目类别"}},[a("el-cascader",{attrs:{options:e.typeList,props:e.props},model:{value:e.formSearch.xmlbList,callback:function(t){e.$set(e.formSearch,"xmlbList",t)},expression:"formSearch.xmlbList"}})],1),a("el-form-item",{attrs:{label:"经费来源"}},[a("el-select",{model:{value:e.formSearch.jfly,callback:function(t){e.$set(e.formSearch,"jfly",t)},expression:"formSearch.jfly"}},e._l(e.fundsList,function(e){return a("el-option",{key:e.id,attrs:{label:e.value,value:e.id}})}))],1),a("el-form-item",{attrs:{label:"开始时间"}},[a("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:e.formSearch.xmkssj,callback:function(t){e.$set(e.formSearch,"xmkssj",t)},expression:"formSearch.xmkssj"}})],1),a("el-form-item",{attrs:{label:"结束时间"}},[a("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:e.formSearch.xmjssj,callback:function(t){e.$set(e.formSearch,"xmjssj",t)},expression:"formSearch.xmjssj"}})],1),a("el-form-item",{attrs:{label:"项目天数"}},[a("el-row",[a("el-col",{attrs:{span:10}},[a("el-input",{attrs:{clearable:""},model:{value:e.formSearch.minDay,callback:function(t){e.$set(e.formSearch,"minDay",t)},expression:"formSearch.minDay"}})],1),a("el-col",{attrs:{span:4}},[e._v("—")]),a("el-col",{attrs:{span:10}},[a("el-input",{attrs:{clearable:""},model:{value:e.formSearch.maxDay,callback:function(t){e.$set(e.formSearch,"maxDay",t)},expression:"formSearch.maxDay"}})],1)],1)],1),a("el-form-item",{attrs:{label:"是否专项"}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:e.formSearch.sfzx,callback:function(t){e.$set(e.formSearch,"sfzx",t)},expression:"formSearch.sfzx"}},[a("el-option",{attrs:{label:"专项项目",value:"101"}}),a("el-option",{attrs:{label:"非专项项目",value:"102"}})],1)],1),a("el-form-item",{attrs:{label:"申请截止时间"}},[a("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:e.formSearch.sqjzsj,callback:function(t){e.$set(e.formSearch,"sqjzsj",t)},expression:"formSearch.sqjzsj"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.getTableData}},[e._v("查询")])],1)],1)],1),a("el-card",{attrs:{shadow:"hover"}},[a("el-table",{attrs:{data:e.tableData,size:"medium",border:""},on:{"row-dblclick":e.rowDblclick}},[a("el-table-column",{attrs:{prop:"xmmc",label:"项目名称","show-overflow-tooltip":"",align:"center"}}),a("el-table-column",{attrs:{prop:"lxdwmc",label:"立项单位","show-overflow-tooltip":"",align:"center"}}),a("el-table-column",{attrs:{prop:"cgjname",label:"出国（境）",width:"80","show-overflow-tooltip":"",align:"center"}}),a("el-table-column",{attrs:{prop:"jflyname",label:"经费来源","show-overflow-tooltip":"",align:"center"}}),a("el-table-column",{attrs:{prop:"xmlbxname",label:"项目类别","show-overflow-tooltip":"",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                    "+e._s(t.row.xmlbname)+"/"+e._s(t.row.xmlbxname)+"\n                ")]}}])}),a("el-table-column",{attrs:{prop:"time",label:"项目起止时间","show-overflow-tooltip":"",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                    "+e._s(t.row.xmkssj)+"至"+e._s(t.row.xmzzsj)+"\n                ")]}}])}),a("el-table-column",{attrs:{prop:"xsccyq",label:"层次要求",width:"80","show-overflow-tooltip":"",align:"center"}}),a("el-table-column",{attrs:{prop:"mexz",label:"名额",width:"50","show-overflow-tooltip":"",align:"center"}}),a("el-table-column",{attrs:{prop:"sfzxname",label:"是否专项",width:"50","show-overflow-tooltip":"",align:"center"}}),a("el-table-column",{attrs:{prop:"xssqzzsj",label:"申请截止时间",width:"100","show-overflow-tooltip":"",align:"center"}}),a("el-table-column",{attrs:{label:"操作",width:"80",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini",plain:""},on:{click:function(a){e.handleApply(t.row)}}},[e._v("申请")])]}}])})],1),a("el-pagination",{staticClass:"pagination",attrs:{"current-page":e.formSearch.page,"page-sizes":[10,20,50,100,200,500],"page-size":e.formSearch.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"current-change":e.handleCurrentChange,"size-change":e.handleSizeChange}})],1),a("el-dialog",{attrs:{visible:e.dialogVisible,width:"80%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("header",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(e.dialogName))]),a("project-form",{attrs:{row:e.row,disable:e.disable,name:e.dialogName},on:{"submit-apply":e.sonApply}})],1)],1)},o=[],r=a("be94"),s=a("9a73"),i={name:"project",components:{projectForm:s["a"]},data:function(){return{deptList:[],fundsList:[],typeList:[],props:{value:"id",label:"value",children:"sonList"},formSearch:{roleId:"",name:"",lxdwId:"",xmlbList:[],xmlb:"",xmlbx:"",jfly:"",xmkssj:"",xmjssj:"",minDay:"",maxDay:"",sfzx:"",sqjzsj:"",page:1,limit:10},total:1,tableData:[],dialogVisible:!1,dialogName:"",disable:!0,row:{}}},computed:{role:function(){return this.$store.state.role}},created:function(){this.getList(),this.getTableData()},methods:{getList:function(){var e=this;this.$ajax.post("/dept/list").then(function(t){e.deptList=t.data.data.data}),this.$ajax.post("/code/findJfly").then(function(t){e.fundsList=t.data.data.data}),this.$ajax.post("/code/findCodeAndSonCode").then(function(t){e.typeList=t.data.data.data})},getTableData:function(){var e=this;this.formSearch.roleId=this.role,this.formSearch.xmlb=this.formSearch.xmlbList[0],this.formSearch.xmlbx=this.formSearch.xmlbList[1],this.$ajax.post("/projectApply/page",this.formSearch).then(function(t){e.total=t.data.data.data.records,e.tableData=t.data.data.data.rows})},rowDblclick:function(e){this.row=Object(r["a"])({},e),console.log(this.row),this.dialogVisible=!0,this.disable=!0,this.dialogName="详情"},handleApply:function(e){var t=this;this.$ajax.post("/projectApply/isCheck",{id:e.id}).then(function(a){"0"===a.data.errcode?(t.row=Object(r["a"])({},e),t.dialogVisible=!0,t.disable=!0,t.dialogName="申请"):t.$message.error(a.data.errmsg)})},sonApply:function(e){this.handleCurrentChange(1),this.dialogVisible=!1,this.$message.success(e.data.errmsg)},dialogClose:function(){this.dialogVisible=!1},handleSizeChange:function(e){this.formSearch.limit=e,this.formSearch.page=1,this.getTableData()},handleCurrentChange:function(e){this.formSearch.page=e,this.getTableData()}}},n=i,c=(a("296c"),a("2877")),m=Object(c["a"])(n,l,o,!1,null,null,null);m.options.__file="student.vue";t["default"]=m.exports},cc66:function(e,t,a){}}]);
//# sourceMappingURL=chunk-3ae1f783.8ffc52bb.js.map