import{n as r}from"./theme.BRNba-nq.js";import"./framework.ENSiYBbN.js";const t={data(){return{model:{value:""},data:[{label:"乌鲁木齐市",value:"2",children:[{label:"达坂城区",value:"7"},{label:"头屯河区",value:"8"},{label:"乌鲁木齐县",value:"9"}]}]}}};var o=function(){var e=this,l=e._self._c;return l("div",[l("el-form",{ref:"elForm",attrs:{model:e.model}},[l("el-form-item",{attrs:{prop:"value",label:"select",required:""}},[l("ElSelectTree",{attrs:{data:e.data,clearable:""},model:{value:e.model.value,callback:function(a){e.$set(e.model,"value",a)},expression:"model.value"}})],1)],1),l("el-button",{on:{click:function(a){return e.$refs.elForm.validate()}}},[e._v("Validate")])],1)},n=[],m=r(t,o,n,!1,null,null);const d=m.exports;export{d as default};