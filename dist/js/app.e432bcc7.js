(function(e){function t(t){for(var o,s,l=t[0],r=t[1],c=t[2],_=0,f=[];_<l.length;_++)s=l[_],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&f.push(i[s][0]),i[s]=0;for(o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o]);d&&d(t);while(f.length)f.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,l=1;l<n.length;l++){var r=n[l];0!==i[r]&&(o=!1)}o&&(a.splice(t--,1),e=s(s.s=n[0]))}return e}var o={},i={app:0},a=[];function s(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=o,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)s.d(n,o,function(t){return e[t]}.bind(null,o));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],r=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var d=r;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),i=n("6255"),a=n.n(i),s=(n("a675"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("MindMap",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)}),l=[],r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"main"},[n("el-header",e._l(e.tool_bar_list,(function(t){return n("div",{key:t.name,class:"header_item "+(t.enable?"enable":"disable"),style:"width:"+t.width+"px;"+t.style},[n("div",{staticClass:"header_btn",on:{click:function(e){t.enable&&t.click()}}},[n("i",{class:t.icon}),e._v(" "+e._s(t.title)+" ")]),n("div",{staticClass:"header_name"},[e._v(e._s(t.name))])])})),0),n("el-main",{staticStyle:{height:"calc(100% - 60px)",padding:"0px"},attrs:{id:"antv_container"}}),e.first_load?n("div",{staticClass:"first_load_cover"},[n("div",{staticClass:"first_load_board"},[e._v(" Choose a Operation: "),n("div",{staticClass:"btn green",on:{click:e.__init_a_blank_project}},[n("i",{staticClass:"el-icon-check"}),e._v(" Create")]),e.gitee_enable?n("div",{staticClass:"btn green",on:{click:e.__init_an_online_project}},[n("i",{staticClass:"el-icon-check"}),e._v(" Open")]):e._e()])]):e._e(),e.node_config.show?n("div",{staticClass:"node_config_board"},[n("div",{staticClass:"board_title"},[e._v(e._s(e.node_config.title))]),n("el-card",[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[e._v("Label")])]),n("el-input",{attrs:{placeholder:"请输入内容"},on:{change:e.__change_node_label},model:{value:e.node_config.label,callback:function(t){e.$set(e.node_config,"label",t)},expression:"node_config.label"}})],1),n("div",{staticClass:"color_selector_board"},[n("div",{staticClass:"color_selector"},[e._v(" Box Fill: "),n("el-color-picker",{attrs:{predefine:e.predefineColors},on:{change:e.__change_node_fill},model:{value:e.node_config.fill,callback:function(t){e.$set(e.node_config,"fill",t)},expression:"node_config.fill"}})],1),n("div",{staticClass:"color_selector"},[e._v(" Border: "),n("el-color-picker",{attrs:{predefine:e.predefineColors},on:{change:e.__change_node_stroke},model:{value:e.node_config.stroke,callback:function(t){e.$set(e.node_config,"stroke",t)},expression:"node_config.stroke"}})],1),n("div",{staticClass:"color_selector"},[e._v(" Text Color: "),n("el-color-picker",{attrs:{predefine:e.predefineColors},on:{change:e.__change_node_text_color},model:{value:e.node_config.text_color,callback:function(t){e.$set(e.node_config,"text_color",t)},expression:"node_config.text_color"}})],1)]),n("el-card",{staticStyle:{"margin-top":"10px"}},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[e._v("Note")])]),n("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入内容"},on:{change:e.__change_node_note},model:{value:e.node_config.note,callback:function(t){e.$set(e.node_config,"note",t)},expression:"node_config.note"}})],1),0!=e.selected_node.store.data.idx?n("div",{staticClass:"btn",on:{click:e.__del_node}},[e._v("Delete")]):e._e()],1):e._e(),e.edge_config.show?n("div",{staticClass:"edge_config_board"},[n("div",{staticClass:"board_title"},[e._v(e._s(e.edge_config.title))]),n("el-card",[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[e._v("Label")])]),n("el-input",{attrs:{placeholder:"请输入内容"},on:{change:e.__change_edge_label},model:{value:e.edge_config.label,callback:function(t){e.$set(e.edge_config,"label",t)},expression:"edge_config.label"}})],1),n("div",{staticClass:"btn",on:{click:e.__del_edge}},[e._v("Delete")])],1):e._e(),e.file_config.show?n("div",{staticClass:"file_config_board"},[n("div",{staticClass:"board_title"},[e._v(e._s(e.file_config.title))]),n("div",{staticClass:"btn blue iconfont icon-refresh",on:{click:this.__get_gitee_files}},[e._v(" Refresh")]),e._l(e.file_config.list,(function(t){return n("div",{key:t.path,staticClass:"file_item iconfont icon-file"},[n("div",{staticStyle:{width:"calc(100% - 30px)",float:"right","white-space":"nowrap",overflow:"hidden","text-overflow":"ellipsis"},on:{click:function(n){return e.__load_gitee_file(t.path,t.sha)}}},[e._v(" "+e._s(t.path)+" ")])])}))],2):e._e()],1)},c=[],d=(n("99af"),n("cb29"),n("4160"),n("a15b"),n("d81d"),n("fb6a"),n("a434"),n("d3b7"),n("ac1f"),n("25f0"),n("5319"),n("1276"),n("498a"),n("159b"),n("bf19"),n("8b55")),_=n("5ae7"),f=n("8647"),h=n.n(f),g=n("b635"),p=n.n(g),u=(n("be35"),n("a336")),b=new _["a"]({type:"dagre",controlPoints:!0,nodesepFunc:function(e){return parseInt(e.width/2)},ranksepFunc:function(e){return parseInt(e.height/2)}});d["a"].registerEdge("edge",{inherit:"edge",attrs:{line:{stroke:"#333"}},connector:{name:"rounded"},router:{name:"manhattan",args:{startDirections:["bottom"],endDirections:["top"]}},defaultLabel:{markup:[{tagName:"rect",selector:"body"},{tagName:"text",selector:"label"}],attrs:{label:{fill:"trsnaparent",fontSize:14,textAnchor:"middle",textVerticalAnchor:"middle",pointerEvents:"none"},body:{ref:"label",fill:"white",stroke:"#333",strokeWidth:2,rx:4,ry:4,refWidth:"140%",refHeight:"140%",refX:"-20%",refY:"-20%"}},position:{distance:.5,options:{absoluteDistance:!0,reverseDistance:!0}}}},!0);var m={name:"HelloWorld",props:{msg:String},data:function(){var e=this;return{loading:!1,first_load:!0,gitee_enable:p.a.enable,file_name:"untitled",file_type:"mb",selected_node:null,selected_edge:null,predefineColors:["#b39ddb","#f44336","#009688","#0d47a1"],tool_bar_list:[{name:"Arron Liu",width:100,style:"margin-right: 20px;border-right: 1px solid #eee;padding-right: 20px;",enable:!0,show:!0,icon:"",title:"MindBox",click:function(){e.index()}},{name:"文件名",width:200,style:"margin-right: 20px;border-right: 1px solid #eee;padding-right: 20px;",enable:!0,show:!0,icon:"",title:"null",click:function(){e.__file_rename()}},{name:"子主题",width:40,style:"",enable:!1,show:!0,icon:"iconfont icon-create_child_node",title:"",click:function(){e.__tool_add_child()}},{name:"主题",width:40,style:"",enable:!1,show:!0,icon:"iconfont icon-create_sibling_node",title:"",click:function(){e.__tool_add_sibling()}},{name:"排布",width:40,style:"",enable:!0,show:!0,icon:"iconfont icon-tree",title:"",click:function(){e.__tool_dagre_graph()}},{name:"注释",width:40,style:"",enable:!0,show:!0,icon:"iconfont icon-note",title:"",click:function(){e.__tool_add_note()}},{name:"上传",width:40,style:"",enable:!0,show:!0,icon:"iconfont icon-upload",title:"",click:function(){e.__upload_to_gitee()}}],tool_map:{file:1,child:2,sibling:3},node_config:{show:!1,title:"Node Config",label:"",note:"",fill:"",stroke:"",text_color:""},edge_config:{show:!1,title:"Edge Config",label:"",stroke:""},file_config:{show:!1,title:"Files",label:"",loading:!1,list:[]}}},mounted:function(){this.__init_graph(),this.__add_events(),this.__add_keyboard_events()},methods:{index:function(){p.a.enable?(this.file_config.show=!this.file_config.show,1==this.file_config.show&&this.__get_gitee_files()):alert("MindMap\nDesined by Arron Liu.")},__init_graph:function(){var e={container:document.getElementById("antv_container"),grid:{size:10,visible:!0},resizing:{enabled:!0},keyboard:{enabled:!0,format:function(e){return e.replace(/\s/g,"").replace("cmd","command")}},selecting:{enabled:!0,multiple:!1,rubberband:!0,movable:!0,showNodeSelectionBox:!0},connecting:{allowBlank:!1},panning:!0,background:{color:"#efefef"}};this.graph=new d["a"](e)},__init_an_online_project:function(){this.file_config.show=!0,this.__get_gitee_files(),this.first_load=!1},__init_a_blank_project:function(){this.graph.fromJSON({});var e=h.a["first"];this.graph.addNode(e),this.graph.centerContent(),this.tool_bar_list[this.tool_map["file"]].title=this.file_name,this.file_name="untitled",this.tool_bar_list[this.tool_map["file"]].title=this.file_name,this.first_load=!1},__extract_graph_json:function(){var e={nodes:[],edges:[]},t=this.graph.toJSON(),n={nodes:[]};return t.cells.forEach((function(t){if(1!=t.ignore_layout)if("rect"==t.shape){var o={};for(var i in t)o[i]=t[i];o.width=o.size.width,o.height=o.size.height,delete o.size,delete o.position,e.nodes.push(o)}else{var a={};for(var s in t)a[s]=t[s];a.source=a.source.cell,a.target=a.target.cell,e.edges.push(a)}else{var l={};for(var r in t)l[r]=t[r];n.nodes.push(l)}})),{data:e,ignore:n}},__enable:function(e){this.tool_bar_list[this.tool_map[e]].enable=!0},__disable:function(e){this.tool_bar_list[this.tool_map[e]].enable=!1},__change_node_label:function(){this.selected_node.attr({label:{text:this.node_config.label}})},__change_node_note:function(){this.selected_node.updateData({note:this.node_config.note})},__change_node_fill:function(){this.selected_node.attr({body:{fill:this.node_config.fill}})},__change_node_stroke:function(){this.selected_node.attr({body:{stroke:this.node_config.stroke}})},__change_node_text_color:function(){this.selected_node.attr({text:{fill:this.node_config.text_color}})},__change_edge_label:function(){""==this.edge_config.label?this.selected_edge.setLabels({attrs:{text:{text:""}}}):this.selected_edge.setLabels({attrs:{text:{text:" "+this.edge_config.label+" "}}})},__add_events:function(){var e=this;this.graph.on("node:selected",(function(t){e.selected_node=t.node,e.node_config.show=!0,e.edge_config.show=!1,e.node_config.label=e.selected_node.store.data.attrs.text.text,e.node_config.note=e.selected_node.store.data.data.note,e.node_config.fill=e.selected_node.store.data.attrs.body.fill,e.node_config.stroke=e.selected_node.store.data.attrs.body.stroke,e.node_config.text_color=e.selected_node.store.data.attrs.text.fill,e.__enable("child"),0!=e.selected_node.store.data.idx&&e.__enable("sibling")})),this.graph.on("node:unselected",(function(){e.selected_node=null,e.node_config.show=!1,e.__disable("child"),e.__disable("sibling")})),this.graph.on("edge:click",(function(t){e.selected_edge=t.edge,e.edge_config.show=!0,e.node_config.show=!1;try{e.edge_config.label=e.selected_edge.getLabels()[0].attrs.text.text.trim()}catch(n){e.edge_config.label=""}})),this.graph.bindKey("meta",(function(){e.selected_node&&e.selected_node.attr("body/magnet",!e.selected_node.attr("body/magnet"))})),this.graph.on("blank:click",(function(){e.edge_config.show=!1,e.node_config.show=!1}))},__add_keyboard_events:function(){var e=this;this.graph.bindKey("enter",(function(){e.__tool_add_sibling()})),this.graph.bindKey("ctrl+enter",(function(){e.__tool_add_child()})),this.graph.bindKey("backspace",(function(){e.__del_node()}))},__del_node:function(){null!=this.selected_node&&0!=this.selected_node.store.data.idx&&(this.graph.removeNode(this.selected_node.id),this.$message("删除成功"))},__del_edge:function(){this.graph.removeEdge(this.selected_edge.id),this.$message("删除成功")},__tool_add_note:function(){var e={};for(var t in h.a["note"])e[t]=h.a["note"][t];this.graph.addNode(e)},__tool_add_child:function(){if(null!=this.selected_node){var e=this.selected_node.store.data.idx,t={};if(0==e)for(var n in h.a["second"])t[n]=h.a["second"][n];else for(var o in h.a["others"])t[o]=h.a["others"][o];t.parent=this.selected_node.id;var i=this.graph.addNode(t),a={};for(var s in h.a["edge"])a[s]=h.a["edge"][s];a.source=t.parent,a.target=i.id,this.graph.unselect(this.selected_node),this.graph.select(i),this.graph.addEdge(a),this.$message("添加子主题成功"),this.__tool_dagre_graph()}},__tool_add_sibling:function(){if(null!=this.selected_node){var e=this.selected_node.store.data.idx,t={};if(0!=e){if(1==e)for(var n in h.a["second"])t[n]=h.a["second"][n];else for(var o in h.a["others"])t[o]=h.a["others"][o];t.parent=this.selected_node.store.data.parent;var i=this.graph.addNode(t),a={};for(var s in h.a["edge"])a[s]=h.a["edge"][s];a.source=t.parent,a.target=i.id,this.graph.unselect(this.selected_node),this.graph.select(i),this.graph.addEdge(a),this.$message("添加主题成功"),this.__tool_dagre_graph()}}},__tool_dagre_graph:function(){var e=this.__extract_graph_json(),t=0;null!=this.selected_node&&(t=this.selected_node.id),this.graph.cleanSelection();var n=b.layout(e.data);n.edges.forEach((function(e){e.source={cell:e.source,port:"output_port"},e.target={cell:e.target,port:"input_port"}})),n.nodes=n.nodes.concat(e.ignore.nodes),console.log(n),this.graph.fromJSON(n),0!=t&&this.graph.select(t)},__file_rename:function(){var e=this;this.$prompt("请输入文件名称","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/^([0-9a-zA-z]{1})([\w]*)$/g,inputPlaceholder:this.file_name,inputErrorMessage:"文件格式不正确"}).then((function(t){var n=t.value;e.file_name=n,e.tool_bar_list[e.tool_map["file"]].title=e.file_name,e.$message({type:"success",message:"修改成功"})})).catch((function(){e.$message({type:"info",message:"取消输入"})}))},__get_gitee_files:function(){var e=this;""!=p.a.username&&""!=p.a.repos&&""!=p.a.token?(this.file_config.loading=!0,u.ajax({url:"https://gitee.com/api/v5/repos/"+p.a.username+"/"+p.a.repos+"/git/trees/master",type:"GET",contentType:"application/json",dataType:"json",headers:{Authorization:"token "+p.a.token},success:function(t){var n=t.tree;e.file_config.list.splice(0,e.file_config.list.length);for(var o=0;o<n.length;o++){var i=n[o].path.split(".");"mb"==i[i.length-1]&&e.file_config.list.push(n[o])}},error:function(){}}),this.file_config.loading=!1):this.$notify({title:" 失败",message:"Gitee 信息有误"})},__load_gitee_file:function(e,t){var n=this;""!=p.a.username&&""!=p.a.repos&&""!=p.a.token?(this.loading=!0,u.ajax({url:"https://gitee.com/api/v5/repos/"+p.a.username+"/"+p.a.repos+"/git/blobs/"+t,type:"GET",contentType:"application/json",dataType:"json",headers:{Authorization:"token "+p.a.token},success:function(t){n.graph.fromJSON(JSON.parse(n.__decode(t.content))),n.graph.centerContent(),n.file_name=e.split(".mb")[0],n.tool_bar_list[n.tool_map["file"]].title=n.file_name,n.loading=!1},error:function(){n.loading=!1}})):this.$notify({title:" 失败",message:"Gitee 信息有误"})},__upload_to_gitee:function(){var e=this;""!=p.a.username&&""!=p.a.repos&&""!=p.a.token?(this.loading=!0,u.ajax({url:"https://gitee.com/api/v5/repos/"+p.a.username+"/"+p.a.repos+"/contents/"+this.file_name+"."+this.file_type,type:"GET",contentType:"application/json",dataType:"json",headers:{Authorization:"token "+p.a.token},success:function(t){0==t.length?u.ajax({url:"https://gitee.com/api/v5/repos/"+p.a.username+"/"+p.a.repos+"/contents/"+e.file_name+"."+e.file_type,type:"POST",contentType:"application/json",dataType:"json",data:JSON.stringify({access_token:p.a.token,owner:p.a.username,repo:p.a.repos,path:e.file_name+"."+e.file_type,message:"upload a pic named "+e.file_name+"."+e.file_type,content:e.__encode(JSON.stringify(e.graph.toJSON()))}),headers:{Authorization:"token "+p.a.token},success:function(){e.$notify({title:"成功",message:e.file_name+"."+e.file_type+" 上传成功！"}),e.loading=!1},error:function(e){this.$notify({title:" 失败",message:e.responseJSON.message}),this.loading=!1}}):e.$alert("是否替换"+e.file_name+"."+e.file_type,"替换",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){u.ajax({url:"https://gitee.com/api/v5/repos/"+p.a.username+"/"+p.a.repos+"/contents/"+e.file_name+"."+e.file_type,type:"PUT",contentType:"application/json",dataType:"json",data:JSON.stringify({access_token:p.a.token,owner:p.a.username,repo:p.a.repos,path:e.file_name+"."+e.file_type,message:"upload a pic named "+e.file_name+"."+e.file_type,content:e.__encode(JSON.stringify(e.graph.toJSON())),sha:t.sha}),headers:{Authorization:"token "+p.a.token},success:function(){e.$notify({title:"成功",message:e.file_name+"."+e.file_type+" 替换成功！"}),e.loading=!1},error:function(t){e.$notify({title:" 失败",message:t.responseJSON.message}),e.loading=!1}})})).catch((function(){e.$notify({title:"取消替换",message:""}),e.loading=!1}))},error:function(){u.ajax({url:"https://gitee.com/api/v5/repos/"+p.a.username+"/"+p.a.repos+"/contents/"+e.file_name+"."+e.file_type,type:"PUT",contentType:"application/json",dataType:"json",data:JSON.stringify({message:"upload a pic named "+e.file_name+"."+e.file_type,content:e.__encode(JSON.stringify(e.graph.toJSON()))}),headers:{Authorization:"token "+p.a.token},success:function(){e.$notify({title:"成功",message:e.file_name+"."+e.file_type+" 上传成功！"}),e.loading=!1},error:function(t){e.$notify({title:" 失败",message:t.responseJSON.message}),e.loading=!1}})}})):this.$notify({title:" 失败",message:"Gitee 信息有误"})},__encode:function(e){return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g,(function(e,t){return String.fromCharCode("0x"+t)})))},__decode:function(e){return decodeURIComponent(atob(e).split("").map((function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)})).join(""))}}},v=m,y=(n("c0a1"),n("2877")),x=Object(y["a"])(v,r,c,!1,null,"fd69fd6a",null),k=x.exports,w={name:"App",components:{MindMap:k}},C=w,j=(n("034f"),Object(y["a"])(C,s,l,!1,null,null,null)),S=j.exports;o["default"].use(a.a),new o["default"]({el:"#app",render:function(e){return e(S)}})},"7adc":function(e,t,n){},"85ec":function(e,t,n){},8647:function(e,t){e.exports={first:{width:120,height:60,attrs:{body:{stroke:"white",fill:"#b39ddb",rx:20,ry:20},text:{text:"中心主题",fill:"black",fontSize:"18",fontWeight:"bold"}},data:{note:""},ignore_layout:!1,idx:0},second:{width:100,height:40,attrs:{body:{stroke:"white",fill:"#d1c4e9",rx:15,ry:15},text:{text:"分支主题",fill:"black",fontSize:"16"}},data:{note:""},idx:1,ignore_layout:!1},others:{width:80,height:20,attrs:{body:{stroke:"white",fill:"white",rx:5,ry:5},text:{text:"子主题",fill:"black"}},data:{note:""},idx:2,ignore_layout:!1},note:{width:100,height:40,attrs:{body:{stroke:"black",fill:"white",rx:5,ry:5},text:{text:"注释",fill:"black",fontSize:"14"}},data:{note:""},idx:3,ignore_layout:!0},edge:{source:"",target:"",connector:{name:"rounded"}}}},b635:function(e,t){e.exports={enable:!0,username:"",repos:"",token:""}},be35:function(e,t,n){},c0a1:function(e,t,n){"use strict";n("7adc")}});
//# sourceMappingURL=app.e432bcc7.js.map