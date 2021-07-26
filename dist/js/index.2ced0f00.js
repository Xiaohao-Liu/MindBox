(function(e){function t(t){for(var i,s,r=t[0],l=t[1],c=t[2],_=0,h=[];_<r.length;_++)s=r[_],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&h.push(o[s][0]),o[s]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);d&&d(t);while(h.length)h.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],i=!0,r=1;r<n.length;r++){var l=n[r];0!==o[l]&&(i=!1)}i&&(a.splice(t--,1),e=s(s.s=n[0]))}return e}var i={},o={index:0},a=[];function s(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=i,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(n,i,function(t){return e[t]}.bind(null,i));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=t,r=r.slice();for(var c=0;c<r.length;c++)t(r[c]);var d=l;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"51f5":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),o=n("5c96"),a=n.n(o),s=(n("0fae"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("MindMap",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)}),r=[],l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:"main"+(e.darkmode?" dark_mode":""),attrs:{id:"app_"}},[n("div",{class:e.position_mode?"position_mode":"",attrs:{id:"main"}},[n("el-container",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[n("el-header",e._l(e.tool_bar_list,(function(t){return n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"item.show"}],key:t.name,class:"header_item "+(t.enable?"enable":"disable"),style:"width:"+t.width+"px;"+t.style},[n("div",{staticClass:"header_btn",on:{click:function(e){t.enable&&"btn"!=t.type&&t.click()}}},[n("i",{class:t.icon}),e._v(" "+e._s(t.title)+" "),"btn"==t.type?n("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:function(e){return t.click()}},model:{value:t.enable,callback:function(n){e.$set(t,"enable",n)},expression:"item.enable"}}):e._e()],1),n("div",{staticClass:"header_name"},[e._v(e._s(t.name))])])})),0),n("el-main",{staticStyle:{height:"calc(100vh - 60px)",padding:"0px"},attrs:{id:"antv_container"}}),n("el-card",{directives:[{name:"show",rawName:"v-show",value:e.pushed_pic_config.show,expression:"pushed_pic_config.show"},{name:"loading",rawName:"v-loading",value:e.pushed_pic_config.loadding,expression:"pushed_pic_config.loadding"}],staticClass:"pic_upload_board"},[n("img",{staticStyle:{width:"100%"},attrs:{id:"pushed_image",src:e.pushed_pic_config.base64||e.pushed_pic_config.url}}),n("p",{directives:[{name:"show",rawName:"v-show",value:""==e.pushed_pic_config.base64&&""==e.pushed_pic_config.url&&!e.pushed_pic_config.pushed,expression:"pushed_pic_config.base64=='' && pushed_pic_config.url==''  && !pushed_pic_config.pushed"}],staticStyle:{"text-align":"center"}},[e._v("NO IMAGE!")]),n("el-input",{staticStyle:{"margin-top":"10px"},attrs:{placeholder:"照片链接"},model:{value:e.pushed_pic_config.url,callback:function(t){e.$set(e.pushed_pic_config,"url",t)},expression:"pushed_pic_config.url"}}),e.pushed_pic_config.url.length>0?n("div",{staticClass:"btn green",on:{click:e.__tool_add_pic_2}},[e._v("添加到画布")]):e._e()],1),e.first_load?n("div",{staticClass:"first_load_cover"},[n("div",{staticClass:"first_load_board"},[e.read_mode?n("div",[e._v(" "+e._s(e.cover_msg)+" ")]):n("div",[e._v(" Choose a Operation: "),n("div",{staticClass:"btn green iconfont icon-new",on:{click:e.__init_a_blank_project}},[e._v(" Create")]),e.gitee_enable?n("div",{staticClass:"btn green iconfont icon-storage",on:{click:e.__init_an_online_project}},[e._v(" Open")]):e._e()])])]):e._e(),!e.read_mode&&e.node_config.show?n("div",{staticClass:"config_board node_config_board"},[n("div",{staticClass:"board_title"},[e._v(e._s(e.node_config.title)),e.markdown_mode?n("div",{staticClass:"btn green",staticStyle:{position:"absolute",top:"0px",right:"10px"},on:{click:function(t){e.markdown_mode=!1}}},[e._v("X")]):e._e()]),n("el-card",[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[e._v("标题")])]),n("el-input",{attrs:{placeholder:"请输入内容"},on:{change:e.__change_node_label},model:{value:e.node_config.label,callback:function(t){e.$set(e.node_config,"label",t)},expression:"node_config.label"}})],1),n("el-card",{staticStyle:{"margin-top":"10px"}},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[e._v("备注 "),n("el-button",{staticStyle:{background:"transparent",border:"0px"},attrs:{plain:"",icon:"el-icon-edit"},on:{click:function(t){e.markdown_mode=!0}}})],1)]),n("el-input",{class:e.markdown_mode?"markdown_mode":"",attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入内容"},on:{change:e.__change_node_note},model:{value:e.node_config.note,callback:function(t){e.$set(e.node_config,"note",t)},expression:"node_config.note"}})],1),n("div",{staticClass:"color_selector_board"},[n("div",{staticClass:"color_selector"},[n("el-row",[n("el-col",{attrs:{span:12}},[e._v(" 填充颜色: ")]),n("el-col",{attrs:{span:12}},[n("el-color-picker",{attrs:{predefine:e.predefineColors},on:{change:e.__change_node_fill},model:{value:e.node_config.fill,callback:function(t){e.$set(e.node_config,"fill",t)},expression:"node_config.fill"}})],1)],1)],1),n("div",{staticClass:"color_selector"},[n("el-row",[n("el-col",{attrs:{span:12}},[e._v(" 边框颜色: ")]),n("el-col",{attrs:{span:12}},[n("el-color-picker",{attrs:{predefine:e.predefineColors},on:{change:e.__change_node_stroke},model:{value:e.node_config.stroke,callback:function(t){e.$set(e.node_config,"stroke",t)},expression:"node_config.stroke"}})],1)],1)],1),n("div",{staticClass:"color_selector"},[n("el-row",[n("el-col",{attrs:{span:12}},[e._v(" 文字颜色: ")]),n("el-col",{attrs:{span:12}},[n("el-color-picker",{attrs:{predefine:e.predefineColors},on:{change:e.__change_node_text_color},model:{value:e.node_config.text_color,callback:function(t){e.$set(e.node_config,"text_color",t)},expression:"node_config.text_color"}})],1)],1)],1)]),n("el-row",[n("el-col",{attrs:{span:12}},[e._v(" 链接 ")]),n("el-col",{attrs:{span:12}},[n("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:e.__change_node_can_link},model:{value:e.node_config.can_link,callback:function(t){e.$set(e.node_config,"can_link",t)},expression:"node_config.can_link"}})],1)],1),0!=e.selected_node.store.data.idx?n("div",{staticClass:"btn",on:{click:e.__del_node}},[e._v("Delete")]):e._e()],1):e._e(),e.node_config.show&&""!=e.node_config.note?n("div",{class:"md_node_note"+(e.markdown_mode?" markdown_mode":""),attrs:{id:"node_note"}},[n("div",{class:"btn green "+(e.node_note_raw_text?"el-icon-tickets":"el-icon-notebook-2"),staticStyle:{width:"20px","border-radius":"20px"},on:{click:function(t){e.node_note_raw_text=!e.node_note_raw_text}}}),e.node_note_raw_text?n("textarea",{staticStyle:{width:"30vw",border:"0px",height:"50vh","border-radius":"5px",padding:"5px"},domProps:{value:e.node_config.note}}):n("div",{domProps:{innerHTML:e._s(e.markdown.render(e.node_config.note))}})]):e._e(),e.image_config.show&&""!=e.image_config.url?n("img",{staticClass:"preview_pic_note",staticStyle:{cursor:"zoom-in"},attrs:{id:"pushed_image",src:e.image_config.url},on:{click:function(t){e.image_config.fullscreen=!0}}}):e._e(),!e.read_mode&&e.edge_config.show?n("div",{staticClass:"config_board edge_config_board"},[n("div",{staticClass:"board_title"},[e._v(e._s(e.edge_config.title))]),n("el-card",[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[e._v("标题")])]),n("el-input",{attrs:{placeholder:"请输入内容"},on:{change:e.__change_edge_label},model:{value:e.edge_config.label,callback:function(t){e.$set(e.edge_config,"label",t)},expression:"edge_config.label"}})],1),n("div",{staticClass:"btn",on:{click:e.__del_edge}},[e._v("Delete")])],1):e._e(),!e.read_mode&&e.group_config.show?n("div",{staticClass:"config_board group_config_board"},[n("div",{staticClass:"board_title"},[e._v(e._s(e.group_config.title))]),n("div",{staticClass:"color_selector_board"},[n("div",{staticClass:"color_selector"},[n("el-row",[n("el-col",{attrs:{span:12}},[e._v(" 填充颜色: ")]),n("el-col",{attrs:{span:12}},[n("el-color-picker",{attrs:{predefine:e.predefineColors},on:{change:e.__change_node_fill},model:{value:e.node_config.fill,callback:function(t){e.$set(e.node_config,"fill",t)},expression:"node_config.fill"}})],1)],1)],1),n("div",{staticClass:"color_selector"},[n("el-row",[n("el-col",{attrs:{span:12}},[e._v(" 边框颜色: ")]),n("el-col",{attrs:{span:12}},[n("el-color-picker",{attrs:{predefine:e.predefineColors},on:{change:e.__change_node_stroke},model:{value:e.node_config.stroke,callback:function(t){e.$set(e.node_config,"stroke",t)},expression:"node_config.stroke"}})],1)],1)],1)]),n("div",{staticClass:"btn",on:{click:e.__del_group}},[e._v("Delete")])]):e._e(),!e.read_mode&&e.image_config.show?n("div",{staticClass:"config_board image_config_board"},[n("div",{staticClass:"board_title"},[e._v(e._s(e.image_config.title))]),n("el-card",[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[e._v("图片链接")])]),n("el-input",{attrs:{placeholder:"请输入内容"},on:{change:e.__change_image_url},model:{value:e.image_config.url,callback:function(t){e.$set(e.image_config,"url",t)},expression:"image_config.url"}})],1),n("div",{staticClass:"btn",on:{click:e.__del_image}},[e._v("Delete")])],1):e._e(),!e.read_mode&&e.file_config.show?n("div",{staticClass:"config_board file_config_board"},[n("div",{staticClass:"board_title"},[e._v(e._s(e.file_config.title))]),n("div",{staticClass:"btn blue iconfont icon-refresh",on:{click:this.__get_gitee_files}}),e._l(e.file_config.list,(function(t){return n("div",{key:t.path,staticClass:"file_item iconfont icon-file"},[n("div",{staticStyle:{width:"calc(100% - 30px)",float:"right","white-space":"nowrap",overflow:"hidden","text-overflow":"ellipsis"},on:{click:function(n){return e.__load_gitee_file(t.path,t.sha)}}},[e._v(" "+e._s(t.path)+" ")])])}))],2):e._e(),e.image_config.fullscreen?n("div",{staticClass:"fullscreen_image",style:{backgroundImage:"url("+e.image_config.url+")"},on:{click:function(t){e.image_config.fullscreen=!1}}}):e._e()],1)],1),n("div",{class:e.position_mode?"position_mode":"",attrs:{id:"center"},on:{click:function(t){e.position_mode=!1}}}),n("div",{class:e.position_mode?"position_mode":"",attrs:{id:"right"}},[e._l(e.positions,(function(t){return n("div",{key:t.name,staticClass:"btn green",staticStyle:{height:"40px","line-height":"40px",padding:"0px",width:"calc(100% - 40px)",overflow:"hidden"}},[n("div",{staticStyle:{width:"calc(100% - 40px)",background:"transparent"},attrs:{title:t.name},on:{click:function(n){return e.to_position(t)}}},[e._v(e._s(t.name))]),e.read_mode?e._e():n("i",{staticClass:"el-icon-close close-btn",staticStyle:{width:"40px","line-height":"40px"},on:{click:function(n){return e.delte_position(t)}}})])})),0==e.positions.length?n("span",{staticStyle:{position:"absolute",top:"20px",left:"0px",width:"100%"}},[e._v("No Locations")]):e._e()],2),e.read_mode?e._e():n("div",{class:e.position_mode?"position_mode":"",attrs:{id:"bottom"}},[n("div",{staticClass:"btn blue",staticStyle:{width:"100px"},on:{click:e.add_position}},[n("i",{staticClass:"el-icon-add-location"}),e._v(" 添加定位")])])])},c=[],d=(n("99af"),n("cb29"),n("4160"),n("c975"),n("a15b"),n("d81d"),n("fb6a"),n("a434"),n("b0c0"),n("a9e3"),n("d3b7"),n("ac1f"),n("25f0"),n("6062"),n("3ca3"),n("5319"),n("841c"),n("1276"),n("498a"),n("159b"),n("ddb0"),n("bf19"),n("96cf"),n("1da1")),_=n("5728"),h=n("8647"),f=n.n(h),g=n("b635"),p=n.n(g),u=n("d722"),m=(n("be35"),n("d4cd")),b=n.n(m),v=n("5710"),w=n.n(v),k=(n("dd49"),n("c4b1"),window.matchMedia("(prefers-color-scheme: dark)").matches);_["b"].registerEdge("edge",{inherit:"edge",attrs:{line:{strokeWidth:2}},connector:{name:"rounded"},router:{name:"manhattan",args:{startDirections:["bottom","left","right"],endDirections:["top"]}},defaultLabel:{markup:[{tagName:"rect",selector:"body"},{tagName:"text",selector:"label"}],attrs:{label:{fill:"trsnaparent",fontSize:14,textAnchor:"middle",textVerticalAnchor:"middle",pointerEvents:"none"},body:{ref:"label",fill:"white",stroke:"#333",strokeWidth:2,rx:4,ry:4,refWidth:"140%",refHeight:"140%",refX:"-20%",refY:"-20%"}},position:{distance:.5,options:{absoluteDistance:!0,reverseDistance:!0}}}},!0);var y=b()();y.use(n("b792"),{inline:!0}),y.use(w.a);var x={name:"HelloWorld",props:{msg:String},data:function(){var e=this;return{gitee_info:p.a,server_mode:!1,read_mode:!1,position_mode:!1,cover_msg:"加载中...",markdown:y,node_note_raw_text:!1,darkmode:k,loading:!1,first_load:!0,gitee_enable:p.a.enable,file_name:"untitled",file_sha:"null",file_type:"mb",graph:null,online_file:!1,selected_node:null,selected_edge:null,predefineColors:["#eeeeee","#ffffff","#000000","#b39ddb","#f44336","#009688","#0d47a1"],request_lock:!1,zoom:0,tool_bar_list:[{name:"Xiaohao Liu",width:100,style:"margin-right: 20px;padding-right: 20px;",enable:!0,show:!0,icon:"",title:"MindBox",click:function(){e.index()}},{name:"文件名",width:200,style:"margin-right: 20px;padding-right: 20px;",enable:!0,show:!0,icon:"",title:"null",click:function(){e.__file_share_link()}},{name:"撤销",width:40,style:"",enable:!1,show:!0,icon:"iconfont icon-redo",title:"",click:function(){e.graph.undo()}},{name:"重做",width:40,style:"",enable:!1,show:!0,icon:"iconfont icon-undo",title:"",click:function(){e.graph.redo()}},{name:"子主题",width:40,style:"",enable:!1,show:!0,icon:"iconfont icon-create_child_node",title:"",click:function(){e.__tool_add_child()}},{name:"主题",width:40,style:"",enable:!1,show:!0,icon:"iconfont icon-create_sibling_node",title:"",click:function(){e.__tool_add_sibling()}},{name:"群组",width:40,style:"",enable:!1,show:!0,icon:"iconfont icon-border",title:"",click:function(){e.__tool_add_group()}},{name:"放大",width:40,style:"",enable:!0,show:!0,icon:"iconfont icon-zoomin",title:"",click:function(){e.zoom+=.2,e.graph.zoom(.2)}},{name:"复原",width:40,style:"",enable:!0,show:!0,icon:"iconfont icon-zoom",title:"",click:function(){e.graph.zoom(-e.zoom),e.zoom=0}},{name:"缩小",width:40,style:"",enable:!0,show:!0,icon:"iconfont icon-zoomout",title:"",click:function(){e.zoom-=.2,e.graph.zoom(-.2)}},{name:"注释",width:40,style:"",enable:!0,show:!0,icon:"iconfont icon-note",title:"",click:function(){e.__tool_add_note()}},{name:"图片",width:40,style:"",enable:!0,show:!0,icon:"iconfont icon-pic",title:"",click:function(){e.__tool_add_pic()}},{name:"上传",width:40,style:"",enable:!0,show:!0,icon:"iconfont icon-upload",title:"",click:function(){e.__upload_to_gitee()}},{name:"PNG",width:40,style:"",enable:!0,show:!0,icon:"iconfont icon-PNG",title:"",click:function(){e.graph.toPNG((function(t){_["a"].downloadDataUri(t,e.file_name+".png")}),{padding:{top:30,right:20,bottom:30,left:20}})}},{name:"SVG",width:40,style:"",enable:!0,show:!0,icon:"iconfont icon-SVG",title:"",click:function(){e.graph.toSVG((function(t){_["a"].downloadDataUri(_["a"].svgToDataUrl(t),e.file_name+".svg")}),{serializeImages:!0,viewBox:"0"})}},{name:"深色模式",width:100,style:"",enable:this.darkmode,show:!0,type:"btn",icon:"",title:"",click:function(){e.darkmode=!e.darkmode,e.tool_bar_list[e.tool_map["darkmode"]].enable=e.darkmode}},{name:"定位",width:40,style:"",enable:!0,show:!0,icon:"el-icon-place",title:"",click:function(){e.position_mode=!0}}],tool_map:{file:1,undo:2,redo:3,child:4,sibling:5,group:6,darkmode:15},read_mode_bar:new Set([0,1,2,3,7,8,9,15,16]),pushed_pic_config:{show:!1,name:"",base64:"",pushed:!1,raw:"",url:""},node_config:{show:!1,title:"编辑节点",label:"",note:"",fill:"",stroke:"",text_color:"",can_link:!1},edge_config:{show:!1,title:"编辑链接",label:"",stroke:""},group_config:{show:!1,title:"编辑群组",label:"",stroke:""},image_config:{show:!1,title:"编辑图片",url:"",fullscreen:!1},file_config:{show:!1,title:"Files",label:"",loading:!1,list:[]},positions:[],markdown_mode:!1}},mounted:function(){var e=this;Object(u["getGiteeInfo"])().then((function(t){e.server_mode=!0,e.gitee_info=t.data,e.gitee_enable=e.gitee_info.enable})).catch((function(e){console.log(e)})).finally((function(){e.__init_read_mode(),e.__init_graph(),e.__add_events(),e.__add_keyboard_events(),e.read_mode&&e.__load_online_file()}))},methods:{index:function(){!this.read_mode&&this.gitee_info.enable?(this.file_config.show=!this.file_config.show,1==this.file_config.show&&this.can_request()&&(this.__get_gitee_files(),this.send_a_request())):alert("MindMap\nDesined by Xiaohao Liu.\nGithub: WYKXLDZ")},__init_read_mode:function(){var e=this;this.gitee_info.enable||(this.read_mode=!0);var t={};window.location.search.substring(1).split("&").forEach((function(e){var n=e.split("=");t[n[0]]=n[1]}));try{var n={enable:!0,username:t["u"],repos:t["r"],token:""};this.file_sha=t["s"],this.file_name=t["n"].split(".mb")[0],this.read_mode=!0,this.gAPI=new u["GiteeAPI"](n),this.gitee_info=n,this.tool_bar_list.forEach((function(t,n){e.read_mode_bar.has(n)||(t.show=!1)}))}catch(i){return this.read_mode?void(this.cover_msg="参数错误！"):void(this.gAPI=new u["GiteeAPI"](this.gitee_info))}},__load_online_file:function(){var e=this;this.can_request()&&(this.send_a_request(),this.loading=!0,this.gAPI.get_file_by_sha(this.file_sha).then((function(t){e.jsondata=JSON.parse(e.__decode(t.data.content)),"graph"in e.jsondata?(e.grpahsource=e.jsondata["graph"],e.positions=e.jsondata["positions"]):e.grpahsource=e.jsondata,e.graph.fromJSON(e.grpahsource),e.graph.centerContent(),e.tool_bar_list[e.tool_map["file"]].title=e.file_name,e.loading=!1,e.online_file=!0,e.first_load=!1,document.getElementsByTagName("title")[0].innerText=e.file_name})).catch((function(t){e.cover_msg="Wrong\n"+t,console.log("wrong:",t),e.loading=!1})))},__init_graph:function(){var e=this;this.tool_bar_list[this.tool_map["darkmode"]].enable=this.darkmode;var t={container:document.getElementById("antv_container"),history:!0,clipboard:{enabled:!this.read_mode,useLocalStorage:!this.read_mode},grid:{size:10,visible:!0},resizing:{enabled:!this.read_mode},keyboard:{enabled:!this.read_mode,format:function(e){return e.replace(/\s/g,"").replace("cmd","command")}},selecting:{className:"select_box",enabled:!0,modifiers:"shift",multiple:!0,rubberband:!0,strict:!0,movable:!0,showNodeSelectionBox:!0},connecting:{allowBlank:!1,allowNode:!this.read_mode,allowMulti:!this.read_mode,allowLoop:!this.read_mode,allowEdge:!1,allowPort:!1,highlight:!0,snap:!0,createEdge:function(){return e.graph.createEdge({attrs:{line:{strokeWidth:2,connector:{name:"rounded"},targetMarker:{name:"block",args:{size:"6"}}}}})}},panning:!0,background:{}};this.graph=new _["b"](t)},send_a_request:function(){var e=this;this.request_lock=!0,setTimeout((function(){e.request_lock=!1}),2e3)},can_request:function(){return 1!=this.request_lock||(this.$notify({title:"请求速率过快",message:"2s后重试"}),!1)},__init_an_online_project:function(){this.file_config.show=!0,this.__get_gitee_files(),this.first_load=!1,this.online_file=!0},__init_a_blank_project:function(){this.graph.fromJSON({}),this.graph.centerContent(),this.tool_bar_list[this.tool_map["file"]].title=this.file_name,this.file_name="untitled",this.tool_bar_list[this.tool_map["file"]].title=this.file_name,this.first_load=!1,this.online_file=!1,document.getElementsByTagName("title")[0].innerText="new file"},__extract_graph_json:function(){var e={nodes:[],edges:[]},t=this.graph.toJSON(),n={nodes:[]},i={nodes:[]},o=new Set;return t.cells.forEach((function(e){"children"in e&&e.children.length>0&&e.children.forEach((function(e){o.add(e)}))})),t.cells.forEach((function(t){if(1!=t.ignore_layout)if(o.has(t.id)&&"edge"!=t.shape){var a={};for(var s in t)a[s]=t[s];i.nodes.push(a)}else if("rect"==t.shape){var r={};for(var l in t)r[l]=t[l];r.width=r.size.width,r.height=r.size.height,delete r.size,delete r.position,e.nodes.push(r)}else{var c={};for(var d in t)c[d]=t[d];c.source=c.source.cell,c.target=c.target.cell,e.edges.push(c)}else{var _={};for(var h in t)_[h]=t[h];n.nodes.push(_)}})),{data:e,ignore:n,children:i}},__enable:function(e){this.tool_bar_list[this.tool_map[e]].enable=!0},__disable:function(e){this.tool_bar_list[this.tool_map[e]].enable=!1},__change_node_label:function(){this.selected_node.attr({text:{text:this.node_config.label}});var e=this.getElementsByAttr("g","data-cell-id",this.selected_node.id).getElementsByTagName("text")[0].getBBox().width+20,t=this.selected_node.getProp("size");this.selected_node.setProp("size",{width:e,height:t.height})},__change_node_can_link:function(){this.selected_node&&this.selected_node.attr("body/magnet",this.node_config.can_link)},__change_node_note:function(){this.selected_node.updateData({note:this.node_config.note})},__change_node_fill:function(){this.selected_node.attr({body:{fill:this.node_config.fill}});var e=this.colorRgb(this.node_config.fill).substring(4);e=e.substring(0,e.length-1).split(",");var t=[];e.forEach((function(e){e=parseInt(e),255==e?e=0:(e*=1.4,e=parseInt(e)),e>255&&(e=255),t.push(e)})),t="rgb("+t.join(",")+")",this.node_config.stroke=this.colorHex(t),this.selected_node.attr({body:{stroke:this.node_config.stroke}})},__change_node_stroke:function(){this.selected_node.attr({body:{stroke:this.node_config.stroke}})},__change_node_text_color:function(){this.selected_node.attr({text:{fill:this.node_config.text_color}})},__change_edge_label:function(){""==this.edge_config.label?this.selected_edge.setLabels({attrs:{text:{text:""}}}):this.selected_edge.setLabels({attrs:{text:{text:" "+this.edge_config.label+" "}}})},__change_image_url:function(){this.selected_node.attr({image:{"xlink:href":this.image_config.url}})},__add_events:function(){var e=this;this.graph.on("node:selected",(function(t){var n=e.graph.getSelectedCells();return e.selected_node=t.node,n.length>1?(e.__enable("group"),e.__disable("child"),e.__disable("sibling"),e.group_config.show=!1,e.node_config.show=!1,e.edge_config.show=!1,e.image_config.show=!1,!1):"image"==e.selected_node.shape?(e.image_config.show=!0,e.image_config.url=e.selected_node.attr("image")["xlink:href"],!1):(e.node_config.label=e.selected_node.attr("text").text,e.node_config.fill=e.selected_node.attr("body").fill,e.node_config.stroke=e.selected_node.attr("body").stroke,e.node_config.text_color=e.selected_node.attr("text").fill,e.node_config.can_link=e.selected_node.attr("body/magnet"),4==e.selected_node.store.data.idx?(e.group_config.show=!0,e.node_config.show=!1,e.edge_config.show=!1,e.image_config.show=!1,!1):(e.node_config.show=!0,e.edge_config.show=!1,e.group_config.show=!1,e.image_config.show=!1,e.__disable("group"),e.__enable("child"),e.node_config.note=e.selected_node.store.data.data.note,void(0!=e.selected_node.store.data.idx&&e.__enable("sibling"))))})),this.graph.on("node:unselected",(function(){e.selected_node=null,e.node_config.show=!1,e.__disable("child"),e.__disable("sibling"),e.__disable("group")})),this.graph.on("edge:click",(function(t){e.selected_edge=t.edge,e.edge_config.show=!0,e.node_config.show=!1,e.group_config.show=!1;try{e.edge_config.label=e.selected_edge.getLabels()[0].attrs.text.text.trim()}catch(n){e.edge_config.label=""}})),this.graph.on("edge:connected",(function(t){if(t.isNew){var n=t.edge.store.data.source.cell,i=t.edge.store.data.target.cell;e.graph.getCell(i).setData({parent:n})}})),this.history=this.graph.history,this.history.on("change",(function(){e.history.canRedo()?e.__enable("redo"):e.__disable("redo"),e.history.canUndo()?e.__enable("undo"):e.__disable("undo")})),this.graph.on("blank:click",(function(){e.edge_config.show=!1,e.node_config.show=!1,e.group_config.show=!1,e.file_config.show=!1,e.image_config.show=!1,e.pushed_pic_config.show=!1,e.markdown_mode=!1})),this.__add_paste_event()},__add_keyboard_events:function(){var e=this;this.graph.bindKey("enter",(function(){e.__tool_add_sibling()})),this.graph.bindKey("ctrl+enter",(function(){e.__tool_add_child()})),this.graph.bindKey("backspace",(function(){e.__del_node()})),this.graph.bindKey("ctrl+c",(function(){var t=e.graph.getSelectedCells();if(t.length){var n=[];t.forEach((function(e){0!=e.store.data.idx&&n.push(e)})),e.graph.copy(n)}return!1})),this.graph.bindKey("ctrl+v",(function(){if(!e.graph.isClipboardEmpty()){var t=e.graph.paste({offset:32});e.graph.cleanSelection(),e.graph.select(t)}return!1})),this.graph.bindKey("ctrl+z",(function(){e.history.canUndo()&&e.graph.undo()})),this.graph.bindKey("ctrl+s",(function(){e.__upload_to_gitee()})),this.graph.bindKey("ctrl+n",(function(){e.__init_a_blank_project()}))},__add_paste_event:function(){var e=this,t=",.'\":; ";document.addEventListener("paste",(function(n){if(e.pushed_pic_config.show){var i=n.clipboardData&&n.clipboardData.items,o=null,a=new FileReader;if(i&&i.length)for(var s=0;s<i.length;s++)if(-1!==i[s].type.indexOf("image")){o=i[s].getAsFile();break}for(var r=e.file_name.substring(0,15).toLowerCase(),l=0;l<t.length;l++)r=r.split(t[l]).join("_");r+="_1.png",a.onload=function(t){e.pushed_pic_config.base64=t.target.result,e.pushed_pic_config.url=e.pushed_pic_config.base64,e.pushed_pic_config.name=r,e.pushed_pic_config.pushed=!1},o&&a.readAsDataURL(o)}}))},__del_node:function(){null!=this.selected_node&&0!=this.selected_node.store.data.idx&&(this.graph.removeNode(this.selected_node.id),this.node_config.show=!1,this.image_config.show=!1,this.$message("删除成功"))},__del_group:function(){var e=this;null!=this.selected_node&&4==this.selected_node.store.data.idx&&(this.selected_node.getChildren().forEach((function(t){e.selected_node.unembed(t)})),this.group_config.show=!1,this.graph.removeNode(this.selected_node.id),this.$message("删除成功"))},__del_edge:function(){this.graph.removeEdge(this.selected_edge.id),this.edge_config.show=!1,this.$message("删除成功")},__del_image:function(){null!=this.selected_node&&0!=this.selected_node.store.data.idx&&(this.graph.removeNode(this.selected_node.id),this.image_config.show=!1,this.$message("删除成功"))},__tool_add_note:function(){var e={};for(var t in f.a["note"])e[t]=f.a["note"][t];var n=this.graph.pageToLocal(window.innerWidth/2,window.innerHeight/2);e.x=n.x,e.y=n.y,this.graph.addNode(e)},__tool_add_pic:function(){this.pushed_pic_config.show=!this.pushed_pic_config.show},__tool_add_pic_2:function(){var e={};for(var t in f.a["image"])e[t]=f.a["image"][t];var n=this.graph.pageToLocal(window.innerWidth/2,window.innerHeight/2);e.x=n.x,e.y=n.y,e.width=document.getElementById("pushed_image").offsetWidth,e.height=document.getElementById("pushed_image").offsetHeight,e.imageUrl=this.pushed_pic_config.url,this.graph.addNode(e),this.pushed_pic_config.pushed=!1,this.pushed_pic_config.show=!1,this.pushed_pic_config.url="",this.pushed_pic_config.name="",this.pushed_pic_config.base64=""},__tool_add_child:function(){if(null!=this.selected_node){var e=this.selected_node.store.data.idx,t={};if(0==e)for(var n in f.a["second"])t[n]=f.a["second"][n];else for(var i in f.a["others"])t[i]=f.a["others"][i];t.parent=this.selected_node.id;var o=this.graph.addNode(t);o.setData({parent:t.parent}),o.setProp("position",{x:this.selected_node.store.data.position.x+parseInt(10*Math.random()),y:this.selected_node.store.data.position.y+this.selected_node.store.data.size.height+40});var a={};for(var s in f.a["edge"])a[s]=f.a["edge"][s];a.source=t.parent,a.target=o.id,this.graph.unselect(this.selected_node),this.graph.select(o),this.graph.addEdge(a),this.$message("添加子主题成功")}},__tool_add_sibling:function(){if(null!=this.selected_node){var e=this.selected_node.store.data.idx,t={};if(0!=e){if(1==e)for(var n in f.a["second"])t[n]=f.a["second"][n];else for(var i in f.a["others"])t[i]=f.a["others"][i];t.parent=this.selected_node.getData().parent;var o=this.graph.addNode(t);o.setData({parent:t.parent}),o.setProp("position",{x:this.selected_node.store.data.position.x+this.selected_node.store.data.size.width+10,y:this.selected_node.store.data.position.y+parseInt(10*Math.random())});var a={};for(var s in f.a["edge"])a[s]=f.a["edge"][s];a.source=t.parent,a.target=o.id,this.graph.unselect(this.selected_node),this.graph.select(o),this.graph.addEdge(a),this.$message("添加主题成功")}}},__tool_add_group:function(){var e=this.graph.getSelectedCells(),t=f.a["group"],n=10;if(e.length){var i=0,o=0,a=0,s=0,r=this.graph.addNode(t),l=[],c=[];e.forEach((function(e){l.push(e.store.data.position.x-n),c.push(e.store.data.position.y-n),l.push(e.store.data.position.x+e.store.data.size.width+n),c.push(e.store.data.position.y+e.store.data.size.height+n),r.addChild(e)})),i=Math.min.apply(null,l),o=Math.min.apply(null,c),a=Math.max.apply(null,c)-o,s=Math.max.apply(null,l)-i,r.setProp("size",{width:s,height:a}),r.setProp("position",{x:i,y:o})}return!1},add_position:function(){var e=this;this.$prompt("请输入位置名称","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then((function(t){var n=t.value;e.positions.push({name:n,x:e.graph.coord.options.x,y:e.graph.coord.options.y}),e.$message({type:"success",message:"新建位置成功："+n})})).catch((function(){e.$message({type:"info",message:"取消输入"})}))},delte_position:function(e){for(var t=0;t<this.positions.length;t++)if(JSON.stringify(this.positions[t])==JSON.stringify(e)){this.positions.splice(t,1);break}},to_position:function(e){this.graph.translate(e.x,e.y)},__file_share_link:function(){var e=this;if(this.online_file){var t="http://wykxldz.gitee.io/mindbox/?u="+this.gitee_info.username+"&r="+this.gitee_info.repos+"&s="+this.file_sha+"&n="+this.file_name+".mb";this.$alert("","分享阅读链接",{showInput:!0,inputValue:t})}else this.$prompt("请输入文件名称","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/^([0-9a-zA-z]{1})([\w]*)$/g,inputPlaceholder:this.file_name,inputErrorMessage:"文件格式不正确"}).then((function(t){var n=t.value;e.file_name=n,e.tool_bar_list[e.tool_map["file"]].title=e.file_name,e.$message({type:"success",message:"修改成功"})})).catch((function(){e.$message({type:"info",message:"取消输入"})}))},__get_gitee_files:function(){var e=this;""!=this.gitee_info.username&&""!=this.gitee_info.repos&&""!=this.gitee_info.token?(this.file_config.loading=!0,this.gAPI.get_files().then((function(t){var n=t.data.tree;e.file_config.list.splice(0,e.file_config.list.length);for(var i=0;i<n.length;i++){var o=n[i].path.split(".");"mb"==o[o.length-1]&&e.file_config.list.push(n[i])}e.file_config.loading=!1})).catch((function(){e.file_config.loading=!1}))):this.$notify({title:" 失败",message:"Gitee 信息有误"})},__load_gitee_file:function(e,t){var n=this;""!=this.gitee_info.username&&""!=this.gitee_info.repos&&""!=this.gitee_info.token?this.can_request()&&(this.send_a_request(),this.loading=!0,this.file_config.show=!1,this.gAPI.get_file_by_sha(t).then((function(i){n.jsondata=JSON.parse(n.__decode(i.data.content)),"graph"in n.jsondata?(n.grpahsource=n.jsondata["graph"],n.positions=n.jsondata["positions"]):n.grpahsource=n.jsondata,n.graph.fromJSON(n.grpahsource),n.graph.centerContent(),n.file_name=e.split(".mb")[0],n.file_sha=t,n.tool_bar_list[n.tool_map["file"]].title=n.file_name,n.loading=!1,n.online_file=!0,document.getElementsByTagName("title")[0].innerText=n.file_name})).catch((function(){n.loading=!1}))):this.$notify({title:" 失败",message:"Gitee 信息有误"})},__upload_gitee_file:function(){var e=Object(d["a"])(regeneratorRuntime.mark((function e(t,n){var i=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,o){return""==i.gitee_info.username||""==i.gitee_info.repos||""==i.gitee_info.token?(i.$notify({title:" 失败",message:"Gitee 信息有误"}),o(!1),!1):i.can_request()?(i.send_a_request(),void i.gAPI.get_file_by_path(t).then((function(a){if(0==a.data.length){var s={content:n};i.gAPI.new_file(t,s).then((function(n){i.$notify({title:"成功",message:t+" 上传成功！"}),i.file_sha=n.data.content.sha,i.file_name=n.data.content.name,e(n.data)})).catch((function(e){i.$notify({title:" 失败",message:e.data.responseJSON.message}),o(e.data)}))}else i.$alert("是否替换"+t,"替换",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var s={content:n,sha:a.data.sha};i.gAPI.update_file(t,s).then((function(n){i.$notify({title:"成功",message:t+" 替换成功！"}),console.log(n.data),i.file_sha=n.data.content.sha,i.file_name=n.data.content.name,e(n.data)})).catch((function(e){i.$notify({title:" 失败",message:e.data.responseJSON.message}),o(e.data)}))})).catch((function(e){i.$notify({title:"取消替换",message:""}),o(e.data)}))})).catch((function(){i.$notify({title:" 失败",message:"请求出错"})}))):(o(!1),!1)})));case 1:case"end":return e.stop()}}),e)})));function t(t,n){return e.apply(this,arguments)}return t}(),__upload_to_gitee:function(){var e=this,t=JSON.stringify({graph:this.graph.toJSON(),positions:this.positions}),n=this.__encode(t),i=this.file_name+"."+this.file_type;this.loading=!0,this.__upload_gitee_file(i,n).then((function(){e.loading=!1})).catch((function(){e.loading=!1}))},push_a_pic:function(){var e=this,t=this.pushed_pic_config.base64.substring(22),n=this.pushed_pic_config.name;this.pushed_pic_config.loading=!0,this.__upload_gitee_file(n,t).then((function(t){e.pushed_pic_config.url=t.download_url,e.pushed_pic_config.pushed=!0,e.pushed_pic_config.loading=!1})).catch((function(){e.pushed_pic_config.loading=!1}))},__encode:function(e){return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g,(function(e,t){return String.fromCharCode("0x"+t)})))},__decode:function(e){return decodeURIComponent(atob(e).split("").map((function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)})).join(""))},colorHex:function(e){var t=/^(rgb|RGB)/;if(t.test(e)){for(var n="#",i=e.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(","),o=0;o<i.length;o++){var a=Number(i[o]).toString(16);"0"===a&&(a+=a),n+=a}return n}return String(e)},colorRgb:function(e){var t=/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;if(e=e.toLowerCase(),t.test(e)){if(4===e.length){for(var n="#",i=1;i<4;i+=1)n+=e.slice(i,i+1).concat(e.slice(i,i+1));e=n}for(var o=[],a=1;a<7;a+=2)o.push(parseInt("0x"+e.slice(a,a+2)));return"RGB("+o.join(",")+")"}return e},getElementsByAttr:function(e,t,n){for(var i=document.getElementsByTagName(e),o=0;o<=i.length;o++)if(i[o].getAttribute(t)==n)return i[o]}}},C=x,S=(n("d5c6"),n("b93b"),n("2877")),z=Object(S["a"])(C,l,c,!1,null,"19caf10a",null),N=z.exports,j={name:"App",components:{MindMap:N}},$=j,E=(n("034f"),Object(S["a"])($,s,r,!1,null,null,null)),I=E.exports;i["default"].use(a.a),new i["default"]({el:"#app",render:function(e){return e(I)}})},"85ec":function(e,t,n){},8647:function(e,t){e.exports={first:{width:120,height:60,attrs:{body:{stroke:"black",fill:"white",rx:10,ry:10},text:{text:"中心主题",fill:"black",fontSize:"18",fontWeight:"bold"}},data:{note:""},zIndex:10,ignore_layout:!1,idx:0},second:{width:100,height:40,attrs:{body:{stroke:"black",fill:"white",rx:10,ry:10},text:{text:"分支主题",fill:"black",fontSize:"16"}},data:{note:""},idx:1,zIndex:10,ignore_layout:!1},others:{width:80,height:20,attrs:{body:{stroke:"black",fill:"white",rx:5,ry:5},text:{text:"子主题",fill:"black"}},data:{note:""},idx:2,zIndex:10,ignore_layout:!1},note:{width:100,height:40,attrs:{body:{stroke:"black",fill:"white",rx:5,ry:5},text:{text:"注释",fill:"black",fontSize:"14"}},data:{note:""},zIndex:10,idx:3,ignore_layout:!0},edge:{source:"",target:"",connector:{name:"rounded"},zIndex:10},group:{width:100,height:40,label:"",attrs:{body:{stroke:"black",fill:"#eee",strokeDasharray:5,rx:5,ry:5}},data:{note:""},zIndex:1,idx:4},image:{shape:"image",x:null,y:null,height:null,width:null,imageUrl:null}}},b635:function(e,t){e.exports={enable:!1,username:"",repos:"",token:""}},b93b:function(e,t,n){"use strict";n("c9a1")},be35:function(e,t,n){},c4b1:function(e,t,n){},c9a1:function(e,t,n){},d5c6:function(e,t,n){"use strict";n("51f5")},d722:function(e,t,n){n("96cf");var i=n("c973"),o=n("bc3a").default;function a(e){this.username=e.username,this.token=e.token,this.repos=e.repos}function s(){return r.apply(this,arguments)}function r(){return r=i(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",o({method:"get",url:"/api/giteeinfo",responseType:"json"}));case 1:case"end":return e.stop()}}),e)}))),r.apply(this,arguments)}a.prototype={get_files:function(){var e=i(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",o({method:"get",url:"https://gitee.com/api/v5/repos/"+this.username+"/"+this.repos+"/git/trees/master",responseType:"json",headers:{Authorization:"token "+this.token}}));case 1:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),get_file_by_sha:function(){var e=i(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",o({method:"get",url:"https://gitee.com/api/v5/repos/"+this.username+"/"+this.repos+"/git/blobs/"+t,responseType:"json",headers:{Authorization:"token "+this.token}}));case 1:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),get_file_by_path:function(){var e=i(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",o({method:"get",url:"https://gitee.com/api/v5/repos/"+this.username+"/"+this.repos+"/contents/"+t,responseType:"json",headers:{Authorization:"token "+this.token}}));case 1:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),new_file:function(){var e=i(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n={access_token:this.token,owner:this.username,repo:this.repos,path:t,message:"[new file] "+t,content:n.content},e.abrupt("return",o({method:"post",url:"https://gitee.com/api/v5/repos/"+this.username+"/"+this.repos+"/contents/"+t,responseType:"json",headers:{Authorization:"token "+this.token},data:n}));case 2:case"end":return e.stop()}}),e,this)})));function t(t,n){return e.apply(this,arguments)}return t}(),update_file:function(){var e=i(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n={access_token:this.token,owner:this.username,repo:this.repos,path:t,message:"[update file] "+t,content:n.content,sha:n.sha},e.abrupt("return",o({method:"put",url:"https://gitee.com/api/v5/repos/"+this.username+"/"+this.repos+"/contents/"+t,responseType:"json",headers:{Authorization:"token "+this.token},data:n}));case 2:case"end":return e.stop()}}),e,this)})));function t(t,n){return e.apply(this,arguments)}return t}()},e.exports={GiteeAPI:a,getGiteeInfo:s}}});
//# sourceMappingURL=index.2ced0f00.js.map