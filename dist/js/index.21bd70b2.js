(function(e){function t(t){for(var n,s,r=t[0],l=t[1],c=t[2],_=0,h=[];_<r.length;_++)s=r[_],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&h.push(o[s][0]),o[s]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);d&&d(t);while(h.length)h.shift()();return a.push.apply(a,c||[]),i()}function i(){for(var e,t=0;t<a.length;t++){for(var i=a[t],n=!0,r=1;r<i.length;r++){var l=i[r];0!==o[l]&&(n=!1)}n&&(a.splice(t--,1),e=s(s.s=i[0]))}return e}var n={},o={index:0},a=[];function s(t){if(n[t])return n[t].exports;var i=n[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=e,s.c=n,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(i,n,function(t){return e[t]}.bind(null,n));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=t,r=r.slice();for(var c=0;c<r.length;c++)t(r[c]);var d=l;a.push([0,"chunk-vendors"]),i()})({0:function(e,t,i){e.exports=i("56d7")},"034f":function(e,t,i){"use strict";i("f0a0")},"2a9f":function(e,t,i){},"56d7":function(e,t,i){"use strict";i.r(t);i("31e1"),i("8d9b"),i("3b2b"),i("736a");var n=i("a593"),o=i("2763"),a=i.n(o),s=(i("ccc1"),function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"app"}},[i("MindMap",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)}),r=[],l=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{class:"main"+(e.darkmode?" dark_mode":""),attrs:{id:"app_"}},[i("div",{class:e.position_mode?"position_mode":"",attrs:{id:"main"}},[i("el-container",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[i("el-header",e._l(e.tool_bar_list,(function(t){return i("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"item.show"}],key:t.name,class:"header_item "+(t.enable?"enable":"disable"),style:"width:"+t.width+"px;"+t.style},[i("div",{staticClass:"header_btn",on:{click:function(e){t.enable&&"btn"!=t.type&&t.click()}}},[i("i",{class:t.icon}),e._v(" "+e._s(t.title)+" "),"btn"==t.type?i("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:function(e){return t.click()}},model:{value:t.enable,callback:function(i){e.$set(t,"enable",i)},expression:"item.enable"}}):e._e()],1),i("div",{staticClass:"header_name"},[e._v(e._s(t.name))])])})),0),i("el-main",{staticStyle:{height:"calc(100vh - 60px)",padding:"0px"},attrs:{id:"antv_container"}}),i("el-card",{directives:[{name:"show",rawName:"v-show",value:e.pushed_pic_config.show,expression:"pushed_pic_config.show"},{name:"loading",rawName:"v-loading",value:e.pushed_pic_config.loadding,expression:"pushed_pic_config.loadding"}],staticClass:"pic_upload_board"},[i("img",{staticStyle:{width:"100%"},attrs:{id:"pushed_image",src:e.pushed_pic_config.base64||e.pushed_pic_config.url}}),i("p",{directives:[{name:"show",rawName:"v-show",value:""==e.pushed_pic_config.base64&&""==e.pushed_pic_config.url&&!e.pushed_pic_config.pushed,expression:"pushed_pic_config.base64=='' && pushed_pic_config.url==''  && !pushed_pic_config.pushed"}],staticStyle:{"text-align":"center"}},[e._v("NO IMAGE!")]),i("el-input",{staticStyle:{"margin-top":"10px"},attrs:{placeholder:"照片链接"},model:{value:e.pushed_pic_config.url,callback:function(t){e.$set(e.pushed_pic_config,"url",t)},expression:"pushed_pic_config.url"}}),e.pushed_pic_config.url.length>0?i("div",{staticClass:"btn green",on:{click:e.__tool_add_pic_2}},[e._v("添加到画布")]):e._e()],1),e.first_load?i("div",{staticClass:"first_load_cover"},[i("div",{staticClass:"first_load_board"},[e.read_mode?i("div",[e._v(" "+e._s(e.cover_msg)+" ")]):i("div",[e._v(" Choose a Operation: "),i("div",{staticClass:"btn green iconfont icon-new",on:{click:e.__init_a_blank_project}},[e._v(" Create")]),e.gitee_enable?i("div",{staticClass:"btn green iconfont icon-storage",on:{click:e.__init_an_online_project}},[e._v(" Open")]):e._e()])])]):e._e(),!e.read_mode&&e.node_config.show?i("div",{staticClass:"config_board node_config_board"},[i("div",{staticClass:"board_title"},[e._v(e._s(e.node_config.title)),e.markdown_mode?i("div",{staticClass:"btn green",staticStyle:{position:"absolute",top:"0px",right:"10px"},on:{click:function(t){e.markdown_mode=!1}}},[e._v("X")]):e._e()]),i("el-card",[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",[e._v("标题")])]),i("el-input",{attrs:{placeholder:"请输入内容"},on:{change:e.__change_node_label},model:{value:e.node_config.label,callback:function(t){e.$set(e.node_config,"label",t)},expression:"node_config.label"}})],1),i("el-card",{staticStyle:{"margin-top":"10px"}},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",[e._v("备注 "),i("el-button",{staticStyle:{background:"transparent",border:"0px"},attrs:{plain:"",icon:"el-icon-edit"},on:{click:function(t){e.markdown_mode=!0}}})],1)]),i("el-input",{class:e.markdown_mode?"markdown_mode":"",attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入内容"},on:{change:e.__change_node_note},model:{value:e.node_config.note,callback:function(t){e.$set(e.node_config,"note",t)},expression:"node_config.note"}})],1),i("div",{staticClass:"color_selector_board"},[i("div",{staticClass:"color_selector"},[i("el-row",[i("el-col",{attrs:{span:12}},[e._v(" 填充颜色: ")]),i("el-col",{attrs:{span:12}},[i("el-color-picker",{attrs:{predefine:e.predefineColors},on:{change:e.__change_node_fill},model:{value:e.node_config.fill,callback:function(t){e.$set(e.node_config,"fill",t)},expression:"node_config.fill"}})],1)],1)],1),i("div",{staticClass:"color_selector"},[i("el-row",[i("el-col",{attrs:{span:12}},[e._v(" 边框颜色: ")]),i("el-col",{attrs:{span:12}},[i("el-color-picker",{attrs:{predefine:e.predefineColors},on:{change:e.__change_node_stroke},model:{value:e.node_config.stroke,callback:function(t){e.$set(e.node_config,"stroke",t)},expression:"node_config.stroke"}})],1)],1)],1),i("div",{staticClass:"color_selector"},[i("el-row",[i("el-col",{attrs:{span:12}},[e._v(" 文字颜色: ")]),i("el-col",{attrs:{span:12}},[i("el-color-picker",{attrs:{predefine:e.predefineColors},on:{change:e.__change_node_text_color},model:{value:e.node_config.text_color,callback:function(t){e.$set(e.node_config,"text_color",t)},expression:"node_config.text_color"}})],1)],1)],1)]),i("el-row",[i("el-col",{attrs:{span:12}},[e._v(" 链接 ")]),i("el-col",{attrs:{span:12}},[i("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:e.__change_node_can_link},model:{value:e.node_config.can_link,callback:function(t){e.$set(e.node_config,"can_link",t)},expression:"node_config.can_link"}})],1)],1),0!=e.selected_node.store.data.idx?i("div",{staticClass:"btn",on:{click:e.__del_node}},[e._v("Delete")]):e._e()],1):e._e(),e.node_config.show&&""!=e.node_config.note?i("div",{class:"md_node_note"+(e.markdown_mode?" markdown_mode":""),attrs:{id:"node_note"}},[i("div",{staticClass:"btn green el-icon-tickets",on:{click:function(t){e.node_note_raw_text=!e.node_note_raw_text}}},[e._v(e._s(e.node_note_raw_text?"Markdown":"Raw Text"))]),e.node_note_raw_text?i("textarea",{staticStyle:{width:"30vw",border:"0px",height:"50vh","border-radius":"5px",padding:"5px"},domProps:{value:e.node_config.note}}):i("div",{domProps:{innerHTML:e._s(e.markdown.render(e.node_config.note))}})]):e._e(),e.image_config.show&&""!=e.image_config.url?i("img",{staticClass:"preview_pic_note",staticStyle:{cursor:"zoom-in"},attrs:{id:"pushed_image",src:e.image_config.url},on:{click:function(t){e.image_config.fullscreen=!0}}}):e._e(),!e.read_mode&&e.edge_config.show?i("div",{staticClass:"config_board edge_config_board"},[i("div",{staticClass:"board_title"},[e._v(e._s(e.edge_config.title))]),i("el-card",[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",[e._v("标题")])]),i("el-input",{attrs:{placeholder:"请输入内容"},on:{change:e.__change_edge_label},model:{value:e.edge_config.label,callback:function(t){e.$set(e.edge_config,"label",t)},expression:"edge_config.label"}})],1),i("div",{staticClass:"btn",on:{click:e.__del_edge}},[e._v("Delete")])],1):e._e(),!e.read_mode&&e.group_config.show?i("div",{staticClass:"config_board group_config_board"},[i("div",{staticClass:"board_title"},[e._v(e._s(e.group_config.title))]),i("div",{staticClass:"color_selector_board"},[i("div",{staticClass:"color_selector"},[i("el-row",[i("el-col",{attrs:{span:12}},[e._v(" 填充颜色: ")]),i("el-col",{attrs:{span:12}},[i("el-color-picker",{attrs:{predefine:e.predefineColors},on:{change:e.__change_node_fill},model:{value:e.node_config.fill,callback:function(t){e.$set(e.node_config,"fill",t)},expression:"node_config.fill"}})],1)],1)],1),i("div",{staticClass:"color_selector"},[i("el-row",[i("el-col",{attrs:{span:12}},[e._v(" 边框颜色: ")]),i("el-col",{attrs:{span:12}},[i("el-color-picker",{attrs:{predefine:e.predefineColors},on:{change:e.__change_node_stroke},model:{value:e.node_config.stroke,callback:function(t){e.$set(e.node_config,"stroke",t)},expression:"node_config.stroke"}})],1)],1)],1)]),i("div",{staticClass:"btn",on:{click:e.__del_group}},[e._v("Delete")])]):e._e(),!e.read_mode&&e.image_config.show?i("div",{staticClass:"config_board image_config_board"},[i("div",{staticClass:"board_title"},[e._v(e._s(e.image_config.title))]),i("el-card",[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",[e._v("图片链接")])]),i("el-input",{attrs:{placeholder:"请输入内容"},on:{change:e.__change_image_url},model:{value:e.image_config.url,callback:function(t){e.$set(e.image_config,"url",t)},expression:"image_config.url"}})],1),i("div",{staticClass:"btn",on:{click:e.__del_image}},[e._v("Delete")])],1):e._e(),!e.read_mode&&e.file_config.show?i("div",{staticClass:"config_board file_config_board"},[i("div",{staticClass:"board_title"},[e._v(e._s(e.file_config.title))]),i("div",{staticClass:"btn blue iconfont icon-refresh",on:{click:this.__get_gitee_files}}),e._l(e.file_config.list,(function(t){return i("div",{key:t.path,staticClass:"file_item iconfont icon-file"},[i("div",{staticStyle:{width:"calc(100% - 30px)",float:"right","white-space":"nowrap",overflow:"hidden","text-overflow":"ellipsis"},on:{click:function(i){return e.__load_gitee_file(t.path,t.sha)}}},[e._v(" "+e._s(t.path)+" ")])])}))],2):e._e(),e.image_config.fullscreen?i("div",{staticClass:"fullscreen_image",style:{backgroundImage:"url("+e.image_config.url+")"},on:{click:function(t){e.image_config.fullscreen=!1}}}):e._e()],1)],1),i("div",{class:e.position_mode?"position_mode":"",attrs:{id:"center"},on:{click:function(t){e.position_mode=!1}}}),i("div",{class:e.position_mode?"position_mode":"",attrs:{id:"right"}},[e._l(e.positions,(function(t){return i("div",{key:t.name,staticClass:"btn green",staticStyle:{height:"40px","line-height":"40px",padding:"0px",width:"calc(100% - 40px)",overflow:"hidden"}},[i("div",{staticStyle:{width:"calc(100% - 40px)",background:"transparent"},on:{click:function(i){return e.to_position(t)}}},[e._v(e._s(t.name))]),e.read_mode?e._e():i("i",{staticClass:"el-icon-close close-btn",staticStyle:{width:"40px","line-height":"40px"},on:{click:function(i){return e.delte_position(t)}}})])})),0==e.positions.length?i("span",{staticStyle:{position:"absolute",top:"20px",left:"0px",width:"100%"}},[e._v("No Locations")]):e._e()],2),e.read_mode?e._e():i("div",{class:e.position_mode?"position_mode":"",attrs:{id:"bottom"}},[i("div",{staticClass:"btn blue",staticStyle:{width:"100px"},on:{click:e.add_position}},[i("i",{staticClass:"el-icon-add-location"}),e._v(" 添加定位")])])])},c=[],d=i("60b5"),_=(i("6a61"),i("7446"),i("27ae"),i("591f"),i("feb3"),i("3bae"),i("5b12"),i("9b5f"),i("c22d"),i("fc13"),i("c44d"),i("8c2f"),i("4200"),i("ea94"),i("1d43"),i("bf2f"),i("3337"),i("5d08"),i("d447"),i("24a8"),i("16ca"),i("e50e")),h=i("8647"),g=i.n(h),f=i("b635"),p=i.n(f),u=i("d722"),m=(i("be35"),i("eeaa")),b=i.n(m),v=i("bdac"),w=i.n(v),k=(i("4a48"),i("c4b1"),window.matchMedia("(prefers-color-scheme: dark)").matches);_["b"].registerEdge("edge",{inherit:"edge",attrs:{line:{strokeWidth:2}},connector:{name:"rounded"},router:{name:"manhattan",args:{startDirections:["bottom","left","right"],endDirections:["top"]}},defaultLabel:{markup:[{tagName:"rect",selector:"body"},{tagName:"text",selector:"label"}],attrs:{label:{fill:"trsnaparent",fontSize:14,textAnchor:"middle",textVerticalAnchor:"middle",pointerEvents:"none"},body:{ref:"label",fill:"white",stroke:"#333",strokeWidth:2,rx:4,ry:4,refWidth:"140%",refHeight:"140%",refX:"-20%",refY:"-20%"}},position:{distance:.5,options:{absoluteDistance:!0,reverseDistance:!0}}}},!0);var x=b()();x.use(i("ce77"),{inline:!0}),x.use(w.a);var y={name:"HelloWorld",props:{msg:String},data:function(){var e=this;return{gitee_info:p.a,read_mode:!1,position_mode:!1,cover_msg:"加载中...",markdown:x,node_note_raw_text:!1,darkmode:k,loading:!1,first_load:!0,gitee_enable:p.a.enable,file_name:"untitled",file_sha:"null",file_type:"mb",graph:null,online_file:!1,selected_node:null,selected_edge:null,predefineColors:["#eeeeee","#ffffff","#000000","#b39ddb","#f44336","#009688","#0d47a1"],request_lock:!1,zoom:0,tool_bar_list:[{name:"Arron Liu",width:100,style:"margin-right: 20px;padding-right: 20px;",enable:!0,show:!0,icon:"",title:"MindBox",click:function(){e.index()}},{name:"文件名",width:200,style:"margin-right: 20px;padding-right: 20px;",enable:!0,show:!0,icon:"",title:"null",click:function(){e.__file_rename()}},{name:"撤销",width:40,style:"",enable:!1,show:!0,icon:"iconfont icon-redo",title:"",click:function(){e.graph.undo()}},{name:"重做",width:40,style:"",enable:!1,show:!0,icon:"iconfont icon-undo",title:"",click:function(){e.graph.redo()}},{name:"子主题",width:40,style:"",enable:!1,show:!0,icon:"iconfont icon-create_child_node",title:"",click:function(){e.__tool_add_child()}},{name:"主题",width:40,style:"",enable:!1,show:!0,icon:"iconfont icon-create_sibling_node",title:"",click:function(){e.__tool_add_sibling()}},{name:"群组",width:40,style:"",enable:!1,show:!0,icon:"iconfont icon-border",title:"",click:function(){e.__tool_add_group()}},{name:"放大",width:40,style:"",enable:!0,show:!0,icon:"iconfont icon-zoomin",title:"",click:function(){e.zoom+=.2,e.graph.zoom(.2)}},{name:"复原",width:40,style:"",enable:!0,show:!0,icon:"iconfont icon-zoom",title:"",click:function(){e.graph.zoom(-e.zoom),e.zoom=0}},{name:"缩小",width:40,style:"",enable:!0,show:!0,icon:"iconfont icon-zoomout",title:"",click:function(){e.zoom-=.2,e.graph.zoom(-.2)}},{name:"注释",width:40,style:"",enable:!0,show:!0,icon:"iconfont icon-note",title:"",click:function(){e.__tool_add_note()}},{name:"图片",width:40,style:"",enable:!0,show:!0,icon:"iconfont icon-pic",title:"",click:function(){e.__tool_add_pic()}},{name:"上传",width:40,style:"",enable:!0,show:!0,icon:"iconfont icon-upload",title:"",click:function(){e.__upload_to_gitee()}},{name:"PNG",width:40,style:"",enable:!0,show:!0,icon:"iconfont icon-PNG",title:"",click:function(){e.graph.toPNG((function(t){_["a"].downloadDataUri(t,e.file_name+".png")}),{padding:{top:30,right:20,bottom:30,left:20}})}},{name:"SVG",width:40,style:"",enable:!0,show:!0,icon:"iconfont icon-SVG",title:"",click:function(){e.graph.toSVG((function(t){_["a"].downloadDataUri(_["a"].svgToDataUrl(t),e.file_name+".svg")}),{serializeImages:!0,viewBox:"0"})}},{name:"深色模式",width:100,style:"",enable:this.darkmode,show:!0,type:"btn",icon:"",title:"",click:function(){e.darkmode=!e.darkmode,e.tool_bar_list[e.tool_map["darkmode"]].enable=e.darkmode}},{name:"定位",width:40,style:"",enable:!0,show:!0,icon:"el-icon-place",title:"",click:function(){e.position_mode=!0}}],tool_map:{file:1,undo:2,redo:3,child:4,sibling:5,group:6,darkmode:15},read_mode_bar:new Set([0,1,2,3,7,8,9,15,16]),pushed_pic_config:{show:!1,name:"",base64:"",pushed:!1,raw:"",url:""},node_config:{show:!1,title:"编辑节点",label:"",note:"",fill:"",stroke:"",text_color:"",can_link:!1},edge_config:{show:!1,title:"编辑链接",label:"",stroke:""},group_config:{show:!1,title:"编辑群组",label:"",stroke:""},image_config:{show:!1,title:"编辑图片",url:"",fullscreen:!1},file_config:{show:!1,title:"Files",label:"",loading:!1,list:[]},positions:[],markdown_mode:!1}},mounted:function(){this.__init_read_mode(),this.__init_graph(),this.__add_events(),this.__add_keyboard_events(),this.read_mode&&this.__load_online_file(),console.log(this.graph)},methods:{index:function(){!this.read_mode&&this.gitee_info.enable?(this.file_config.show=!this.file_config.show,1==this.file_config.show&&this.can_request()&&(this.__get_gitee_files(),this.send_a_request())):alert("MindMap\nDesined by Arron Liu.")},__init_read_mode:function(){var e=this;if(this.gitee_info.enable||(this.read_mode=!0),this.read_mode){var t={};window.location.search.substring(1).split("&").forEach((function(e){var i=e.split("=");t[i[0]]=i[1]}));try{this.gitee_info={enable:!0,username:t["u"],repos:t["r"],token:""},this.file_sha=t["s"],this.file_name=t["n"].split(".mb")[0]}catch(i){return void(this.cover_msg="参数错误！")}this.gAPI=new u["GiteeAPI"](this.gitee_info),this.tool_bar_list.forEach((function(t,i){e.read_mode_bar.has(i)||(t.show=!1)}))}else this.gAPI=new u["GiteeAPI"](this.gitee_info)},__load_online_file:function(){var e=this;this.can_request()&&(this.send_a_request(),this.loading=!0,this.gAPI.get_file_by_sha(this.file_sha).then((function(t){e.jsondata=JSON.parse(e.__decode(t.data.content)),"graph"in e.jsondata?(e.grpahsource=e.jsondata["graph"],e.positions=e.jsondata["positions"]):e.grpahsource=e.jsondata,e.graph.fromJSON(e.grpahsource),e.graph.centerContent(),e.tool_bar_list[e.tool_map["file"]].title=e.file_name,e.loading=!1,e.online_file=!0,e.first_load=!1,document.getElementsByTagName("title")[0].innerText=e.file_name})).catch((function(t){e.cover_msg="Wrong\n"+t,e.loading=!1})))},__init_graph:function(){var e=this;this.tool_bar_list[this.tool_map["darkmode"]].enable=this.darkmode;var t={container:document.getElementById("antv_container"),history:!0,clipboard:{enabled:!this.read_mode,useLocalStorage:!this.read_mode},grid:{size:10,visible:!0},resizing:{enabled:!this.read_mode},keyboard:{enabled:!this.read_mode,format:function(e){return e.replace(/\s/g,"").replace("cmd","command")}},selecting:{className:"select_box",enabled:!0,modifiers:"shift",multiple:!0,rubberband:!0,strict:!0,movable:!0,showNodeSelectionBox:!0},connecting:{allowBlank:!1,allowNode:!this.read_mode,allowMulti:!this.read_mode,allowLoop:!this.read_mode,allowEdge:!1,allowPort:!1,highlight:!0,snap:!0,createEdge:function(){return e.graph.createEdge({attrs:{line:{strokeWidth:2,connector:{name:"rounded"},targetMarker:{name:"block",args:{size:"6"}}}}})}},panning:!0,background:{}};this.graph=new _["b"](t),console.log(this.graph.create)},send_a_request:function(){var e=this;this.request_lock=!0,setTimeout((function(){e.request_lock=!1}),2e3)},can_request:function(){return 1!=this.request_lock||(this.$notify({title:"请求速率过快",message:"2s后重试"}),!1)},__init_an_online_project:function(){this.file_config.show=!0,this.__get_gitee_files(),this.first_load=!1,this.online_file=!0},__init_a_blank_project:function(){this.graph.fromJSON({});var e=g.a["first"];console.log(e),console.log(this.graph.addNode(e)),this.graph.centerContent(),this.tool_bar_list[this.tool_map["file"]].title=this.file_name,this.file_name="untitled",this.tool_bar_list[this.tool_map["file"]].title=this.file_name,this.first_load=!1,this.online_file=!1,document.getElementsByTagName("title")[0].innerText="new file"},__extract_graph_json:function(){var e={nodes:[],edges:[]},t=this.graph.toJSON();console.log(t);var i={nodes:[]},n={nodes:[]},o=new Set;return t.cells.forEach((function(e){"children"in e&&e.children.length>0&&e.children.forEach((function(e){o.add(e)}))})),t.cells.forEach((function(t){if(1!=t.ignore_layout)if(o.has(t.id)&&"edge"!=t.shape){var a={};for(var s in t)a[s]=t[s];n.nodes.push(a)}else if("rect"==t.shape){var r={};for(var l in t)r[l]=t[l];r.width=r.size.width,r.height=r.size.height,delete r.size,delete r.position,e.nodes.push(r)}else{var c={};for(var d in t)c[d]=t[d];c.source=c.source.cell,c.target=c.target.cell,e.edges.push(c)}else{var _={};for(var h in t)_[h]=t[h];i.nodes.push(_)}})),{data:e,ignore:i,children:n}},__enable:function(e){this.tool_bar_list[this.tool_map[e]].enable=!0},__disable:function(e){this.tool_bar_list[this.tool_map[e]].enable=!1},__change_node_label:function(){this.selected_node.attr({text:{text:this.node_config.label}});var e=this.getElementsByAttr("g","data-cell-id",this.selected_node.id).getElementsByTagName("text")[0].getBBox().width+20,t=this.selected_node.getProp("size");this.selected_node.setProp("size",{width:e,height:t.height})},__change_node_can_link:function(){this.selected_node&&this.selected_node.attr("body/magnet",this.node_config.can_link)},__change_node_note:function(){this.selected_node.updateData({note:this.node_config.note})},__change_node_fill:function(){this.selected_node.attr({body:{fill:this.node_config.fill}});var e=this.colorRgb(this.node_config.fill).substring(4);e=e.substring(0,e.length-1).split(",");var t=[];e.forEach((function(e){e=parseInt(e),255==e?e=0:(e*=1.4,e=parseInt(e)),e>255&&(e=255),t.push(e)})),t="rgb("+t.join(",")+")",this.node_config.stroke=this.colorHex(t),this.selected_node.attr({body:{stroke:this.node_config.stroke}})},__change_node_stroke:function(){this.selected_node.attr({body:{stroke:this.node_config.stroke}})},__change_node_text_color:function(){this.selected_node.attr({text:{fill:this.node_config.text_color}})},__change_edge_label:function(){""==this.edge_config.label?this.selected_edge.setLabels({attrs:{text:{text:""}}}):this.selected_edge.setLabels({attrs:{text:{text:" "+this.edge_config.label+" "}}})},__change_image_url:function(){this.selected_node.attr({image:{"xlink:href":this.image_config.url}})},__add_events:function(){var e=this;this.graph.on("node:selected",(function(t){var i=e.graph.getSelectedCells();return e.selected_node=t.node,i.length>1?(e.__enable("group"),e.__disable("child"),e.__disable("sibling"),e.group_config.show=!1,e.node_config.show=!1,e.edge_config.show=!1,e.image_config.show=!1,!1):"image"==e.selected_node.shape?(e.image_config.show=!0,e.image_config.url=e.selected_node.attr("image")["xlink:href"],!1):(e.node_config.label=e.selected_node.attr("text").text,e.node_config.fill=e.selected_node.attr("body").fill,e.node_config.stroke=e.selected_node.attr("body").stroke,e.node_config.text_color=e.selected_node.attr("text").fill,e.node_config.can_link=e.selected_node.attr("body/magnet"),4==e.selected_node.store.data.idx?(e.group_config.show=!0,e.node_config.show=!1,e.edge_config.show=!1,e.image_config.show=!1,!1):(e.node_config.show=!0,e.edge_config.show=!1,e.group_config.show=!1,e.image_config.show=!1,e.__disable("group"),e.__enable("child"),e.node_config.note=e.selected_node.store.data.data.note,void(0!=e.selected_node.store.data.idx&&e.__enable("sibling"))))})),this.graph.on("node:unselected",(function(){e.selected_node=null,e.node_config.show=!1,e.__disable("child"),e.__disable("sibling"),e.__disable("group")})),this.graph.on("edge:click",(function(t){e.selected_edge=t.edge,e.edge_config.show=!0,e.node_config.show=!1,e.group_config.show=!1;try{e.edge_config.label=e.selected_edge.getLabels()[0].attrs.text.text.trim()}catch(i){e.edge_config.label=""}})),this.graph.on("edge:connected",(function(t){if(t.isNew){var i=t.edge.store.data.source.cell,n=t.edge.store.data.target.cell;e.graph.getCell(n).setData({parent:i})}})),this.history=this.graph.history,this.history.on("change",(function(){e.history.canRedo()?e.__enable("redo"):e.__disable("redo"),e.history.canUndo()?e.__enable("undo"):e.__disable("undo")})),this.graph.on("blank:click",(function(){e.edge_config.show=!1,e.node_config.show=!1,e.group_config.show=!1,e.file_config.show=!1,e.image_config.show=!1,e.pushed_pic_config.show=!1,e.markdown_mode=!1})),this.__add_paste_event()},__add_keyboard_events:function(){var e=this;this.graph.bindKey("enter",(function(){e.__tool_add_sibling()})),this.graph.bindKey("ctrl+enter",(function(){e.__tool_add_child()})),this.graph.bindKey("backspace",(function(){e.__del_node()})),this.graph.bindKey("ctrl+c",(function(){var t=e.graph.getSelectedCells();if(t.length){var i=[];t.forEach((function(e){0!=e.store.data.idx&&i.push(e)})),e.graph.copy(i)}return!1})),this.graph.bindKey("ctrl+v",(function(){if(!e.graph.isClipboardEmpty()){var t=e.graph.paste({offset:32});e.graph.cleanSelection(),e.graph.select(t)}return!1})),this.graph.bindKey("ctrl+z",(function(){e.history.canUndo()&&e.graph.undo()})),this.graph.bindKey("ctrl+s",(function(){e.__upload_to_gitee()})),this.graph.bindKey("ctrl+n",(function(){e.__init_a_blank_project()}))},__add_paste_event:function(){var e=this,t=",.'\":; ";document.addEventListener("paste",(function(i){if(e.pushed_pic_config.show){var n=i.clipboardData&&i.clipboardData.items,o=null,a=new FileReader;if(n&&n.length)for(var s=0;s<n.length;s++)if(-1!==n[s].type.indexOf("image")){o=n[s].getAsFile();break}for(var r=e.file_name.substring(0,15).toLowerCase(),l=0;l<t.length;l++)r=r.split(t[l]).join("_");r+="_1.png",a.onload=function(t){e.pushed_pic_config.base64=t.target.result,e.pushed_pic_config.url=e.pushed_pic_config.base64,e.pushed_pic_config.name=r,e.pushed_pic_config.pushed=!1},o&&a.readAsDataURL(o)}}))},__del_node:function(){null!=this.selected_node&&0!=this.selected_node.store.data.idx&&(this.graph.removeNode(this.selected_node.id),this.node_config.show=!1,this.image_config.show=!1,this.$message("删除成功"))},__del_group:function(){var e=this;null!=this.selected_node&&4==this.selected_node.store.data.idx&&(this.selected_node.getChildren().forEach((function(t){e.selected_node.unembed(t)})),this.group_config.show=!1,this.graph.removeNode(this.selected_node.id),this.$message("删除成功"))},__del_edge:function(){this.graph.removeEdge(this.selected_edge.id),this.edge_config.show=!1,this.$message("删除成功")},__del_image:function(){null!=this.selected_node&&0!=this.selected_node.store.data.idx&&(this.graph.removeNode(this.selected_node.id),this.image_config.show=!1,this.$message("删除成功"))},__tool_add_note:function(){var e={};for(var t in g.a["note"])e[t]=g.a["note"][t];var i=this.graph.pageToLocal(window.innerWidth/2,window.innerHeight/2);e.x=i.x,e.y=i.y,this.graph.addNode(e)},__tool_add_pic:function(){this.pushed_pic_config.show=!this.pushed_pic_config.show},__tool_add_pic_2:function(){var e={};for(var t in g.a["image"])e[t]=g.a["image"][t];var i=this.graph.pageToLocal(window.innerWidth/2,window.innerHeight/2);e.x=i.x,e.y=i.y,e.width=document.getElementById("pushed_image").offsetWidth,e.height=document.getElementById("pushed_image").offsetHeight,e.imageUrl=this.pushed_pic_config.url,this.graph.addNode(e),this.pushed_pic_config.pushed=!1,this.pushed_pic_config.show=!1,this.pushed_pic_config.url="",this.pushed_pic_config.name="",this.pushed_pic_config.base64=""},__tool_add_child:function(){if(null!=this.selected_node){var e=this.selected_node.store.data.idx,t={};if(0==e)for(var i in g.a["second"])t[i]=g.a["second"][i];else for(var n in g.a["others"])t[n]=g.a["others"][n];t.parent=this.selected_node.id;var o=this.graph.addNode(t);o.setData({parent:t.parent}),o.setProp("position",{x:this.selected_node.store.data.position.x+parseInt(10*Math.random()),y:this.selected_node.store.data.position.y+this.selected_node.store.data.size.height+40});var a={};for(var s in g.a["edge"])a[s]=g.a["edge"][s];a.source=t.parent,a.target=o.id,this.graph.unselect(this.selected_node),this.graph.select(o),this.graph.addEdge(a),this.$message("添加子主题成功")}},__tool_add_sibling:function(){if(null!=this.selected_node){var e=this.selected_node.store.data.idx,t={};if(0!=e){if(1==e)for(var i in g.a["second"])t[i]=g.a["second"][i];else for(var n in g.a["others"])t[n]=g.a["others"][n];t.parent=this.selected_node.getData().parent;var o=this.graph.addNode(t);o.setData({parent:t.parent}),o.setProp("position",{x:this.selected_node.store.data.position.x+this.selected_node.store.data.size.width+10,y:this.selected_node.store.data.position.y+parseInt(10*Math.random())});var a={};for(var s in g.a["edge"])a[s]=g.a["edge"][s];a.source=t.parent,a.target=o.id,this.graph.unselect(this.selected_node),this.graph.select(o),this.graph.addEdge(a),this.$message("添加主题成功")}}},__tool_add_group:function(){var e=this.graph.getSelectedCells(),t=g.a["group"],i=10;if(e.length){var n=0,o=0,a=0,s=0,r=this.graph.addNode(t),l=[],c=[];e.forEach((function(e){l.push(e.store.data.position.x-i),c.push(e.store.data.position.y-i),l.push(e.store.data.position.x+e.store.data.size.width+i),c.push(e.store.data.position.y+e.store.data.size.height+i),r.addChild(e)})),n=Math.min.apply(null,l),o=Math.min.apply(null,c),a=Math.max.apply(null,c)-o,s=Math.max.apply(null,l)-n,r.setProp("size",{width:s,height:a}),r.setProp("position",{x:n,y:o})}return!1},add_position:function(){var e=this;this.$prompt("请输入位置名称","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then((function(t){var i=t.value;e.positions.push({name:i,x:e.graph.coord.options.x,y:e.graph.coord.options.y}),e.$message({type:"success",message:"新建位置成功："+i})})).catch((function(){e.$message({type:"info",message:"取消输入"})}))},delte_position:function(e){for(var t=0;t<this.positions.length;t++)if(JSON.stringify(this.positions[t])==JSON.stringify(e)){this.positions.splice(t,1);break}},to_position:function(e){this.graph.translate(e.x,e.y)},__file_rename:function(){var e=this;if(this.online_file){var t="http://wykxldz.gitee.io/mindbox/?u="+this.gitee_info.username+"&r="+this.gitee_info.repos+"&s="+this.file_sha+"&n="+this.file_name+".mb";this.$alert("","分享阅读链接",{showInput:!0,inputValue:t})}else this.$prompt("请输入文件名称","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/^([0-9a-zA-z]{1})([\w]*)$/g,inputPlaceholder:this.file_name,inputErrorMessage:"文件格式不正确"}).then((function(t){var i=t.value;e.file_name=i,e.tool_bar_list[e.tool_map["file"]].title=e.file_name,e.$message({type:"success",message:"修改成功"})})).catch((function(){e.$message({type:"info",message:"取消输入"})}))},__get_gitee_files:function(){var e=this;""!=this.gitee_info.username&&""!=this.gitee_info.repos&&""!=this.gitee_info.token?(this.file_config.loading=!0,this.gAPI.get_files().then((function(t){var i=t.data.tree;e.file_config.list.splice(0,e.file_config.list.length);for(var n=0;n<i.length;n++){var o=i[n].path.split(".");"mb"==o[o.length-1]&&e.file_config.list.push(i[n])}e.file_config.loading=!1})).catch((function(){e.file_config.loading=!1}))):this.$notify({title:" 失败",message:"Gitee 信息有误"})},__load_gitee_file:function(e,t){var i=this;""!=this.gitee_info.username&&""!=this.gitee_info.repos&&""!=this.gitee_info.token?this.can_request()&&(this.send_a_request(),this.loading=!0,this.file_config.show=!1,this.gAPI.get_file_by_sha(t).then((function(n){i.jsondata=JSON.parse(i.__decode(n.data.content)),console.log(i.jsondata),"graph"in i.jsondata?(i.grpahsource=i.jsondata["graph"],i.positions=i.jsondata["positions"]):i.grpahsource=i.jsondata,i.graph.fromJSON(i.grpahsource),i.graph.centerContent(),i.file_name=e.split(".mb")[0],i.file_sha=t,i.tool_bar_list[i.tool_map["file"]].title=i.file_name,i.loading=!1,i.online_file=!0,document.getElementsByTagName("title")[0].innerText=i.file_name})).catch((function(){i.loading=!1}))):this.$notify({title:" 失败",message:"Gitee 信息有误"})},__upload_gitee_file:function(){var e=Object(d["a"])(regeneratorRuntime.mark((function e(t,i){var n=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,o){return""==n.gitee_info.username||""==n.gitee_info.repos||""==n.gitee_info.token?(n.$notify({title:" 失败",message:"Gitee 信息有误"}),o(!1),!1):n.can_request()?(n.send_a_request(),void n.gAPI.get_file_by_path(t).then((function(a){if(0==a.data.length){var s={content:i};n.gAPI.new_file(t,s).then((function(){n.$notify({title:"成功",message:t+" 上传成功！"}),e(a.data)})).catch((function(e){n.$notify({title:" 失败",message:e.data.responseJSON.message}),o(e.data)}))}else n.$alert("是否替换"+t,"替换",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var s={content:i,sha:a.data.sha};n.gAPI.update_file(t,s).then((function(){n.$notify({title:"成功",message:t+" 替换成功！"}),e(a.data)})).catch((function(e){n.$notify({title:" 失败",message:e.data.responseJSON.message}),o(e.data)}))})).catch((function(e){n.$notify({title:"取消替换",message:""}),o(e.data)}))})).catch((function(){n.$notify({title:" 失败",message:"请求出错"})}))):(o(!1),!1)})));case 1:case"end":return e.stop()}}),e)})));function t(t,i){return e.apply(this,arguments)}return t}(),__upload_to_gitee:function(){var e=this,t=JSON.stringify({graph:this.graph.toJSON(),positions:this.positions}),i=this.__encode(t);console.log(t,i);var n=this.file_name+"."+this.file_type;this.loading=!0,this.__upload_gitee_file(n,i).then((function(){e.loading=!1})).catch((function(){e.loading=!1}))},push_a_pic:function(){var e=this,t=this.pushed_pic_config.base64.substring(22),i=this.pushed_pic_config.name;this.pushed_pic_config.loading=!0,this.__upload_gitee_file(i,t).then((function(t){e.pushed_pic_config.url=t.download_url,e.pushed_pic_config.pushed=!0,e.pushed_pic_config.loading=!1})).catch((function(){e.pushed_pic_config.loading=!1}))},__encode:function(e){return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g,(function(e,t){return String.fromCharCode("0x"+t)})))},__decode:function(e){return decodeURIComponent(atob(e).split("").map((function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)})).join(""))},colorHex:function(e){var t=/^(rgb|RGB)/;if(t.test(e)){for(var i="#",n=e.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(","),o=0;o<n.length;o++){var a=Number(n[o]).toString(16);"0"===a&&(a+=a),i+=a}return i}return String(e)},colorRgb:function(e){var t=/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;if(e=e.toLowerCase(),t.test(e)){if(4===e.length){for(var i="#",n=1;n<4;n+=1)i+=e.slice(n,n+1).concat(e.slice(n,n+1));e=i}for(var o=[],a=1;a<7;a+=2)o.push(parseInt("0x"+e.slice(a,a+2)));return"RGB("+o.join(",")+")"}return e},getElementsByAttr:function(e,t,i){for(var n=document.getElementsByTagName(e),o=0;o<=n.length;o++)if(n[o].getAttribute(t)==i)return n[o]}}},C=y,S=(i("b3ad"),i("b93b"),i("5d22")),z=Object(S["a"])(C,l,c,!1,null,"51227356",null),N=z.exports,$={name:"App",components:{MindMap:N}},j=$,A=(i("034f"),Object(S["a"])(j,s,r,!1,null,null,null)),E=A.exports;n["default"].use(a.a),new n["default"]({el:"#app",render:function(e){return e(E)}})},8647:function(e,t){e.exports={first:{width:120,height:60,attrs:{body:{stroke:"black",fill:"white",rx:10,ry:10},text:{text:"中心主题",fill:"black",fontSize:"18",fontWeight:"bold"}},data:{note:""},zIndex:10,ignore_layout:!1,idx:0},second:{width:100,height:40,attrs:{body:{stroke:"black",fill:"white",rx:15,ry:15},text:{text:"分支主题",fill:"black",fontSize:"16"}},data:{note:""},idx:1,zIndex:10,ignore_layout:!1},others:{width:80,height:20,attrs:{body:{stroke:"black",fill:"white",rx:5,ry:5},text:{text:"子主题",fill:"black"}},data:{note:""},idx:2,zIndex:10,ignore_layout:!1},note:{width:100,height:40,attrs:{body:{stroke:"black",fill:"white",rx:5,ry:5},text:{text:"注释",fill:"black",fontSize:"14"}},data:{note:""},zIndex:10,idx:3,ignore_layout:!0},edge:{source:"",target:"",connector:{name:"rounded"},zIndex:10},group:{width:100,height:40,label:"",attrs:{body:{stroke:"black",fill:"#eee",strokeDasharray:5,rx:5,ry:5}},data:{note:""},zIndex:1,idx:4},image:{shape:"image",x:null,y:null,height:null,width:null,imageUrl:null}}},"9ac1":function(e,t,i){},b3ad:function(e,t,i){"use strict";i("2a9f")},b635:function(e,t){e.exports={enable:!1,username:"",repos:"",token:""}},b93b:function(e,t,i){"use strict";i("9ac1")},be35:function(e,t,i){},c4b1:function(e,t,i){},d722:function(e,t,i){var n=i("ed75").default;i("6a61");var o=i("73ef").default;function a(e){this.username=e.username,this.token=e.token,this.repos=e.repos}a.prototype={get_files:function(){var e=n(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",o({method:"get",url:"https://gitee.com/api/v5/repos/"+this.username+"/"+this.repos+"/git/trees/master",responseType:"json",headers:{Authorization:"token "+this.token}}));case 1:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),get_file_by_sha:function(){var e=n(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",o({method:"get",url:"https://gitee.com/api/v5/repos/"+this.username+"/"+this.repos+"/git/blobs/"+t,responseType:"json",headers:{Authorization:"token "+this.token}}));case 1:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),get_file_by_path:function(){var e=n(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",o({method:"get",url:"https://gitee.com/api/v5/repos/"+this.username+"/"+this.repos+"/contents/"+t,responseType:"json",headers:{Authorization:"token "+this.token}}));case 1:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),new_file:function(){var e=n(regeneratorRuntime.mark((function e(t,i){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i={access_token:this.token,owner:this.username,repo:this.repos,path:t,message:"[new file] "+t,content:i.content},e.abrupt("return",o({method:"post",url:"https://gitee.com/api/v5/repos/"+this.username+"/"+this.repos+"/contents/"+t,responseType:"json",headers:{Authorization:"token "+this.token},data:i}));case 2:case"end":return e.stop()}}),e,this)})));function t(t,i){return e.apply(this,arguments)}return t}(),update_file:function(){var e=n(regeneratorRuntime.mark((function e(t,i){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i={access_token:this.token,owner:this.username,repo:this.repos,path:t,message:"[update file] "+t,content:i.content,sha:i.sha},e.abrupt("return",o({method:"put",url:"https://gitee.com/api/v5/repos/"+this.username+"/"+this.repos+"/contents/"+t,responseType:"json",headers:{Authorization:"token "+this.token},data:i}));case 2:case"end":return e.stop()}}),e,this)})));function t(t,i){return e.apply(this,arguments)}return t}()},e.exports={GiteeAPI:a}},f0a0:function(e,t,i){}});
//# sourceMappingURL=index.21bd70b2.js.map