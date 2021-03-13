<template>
  <el-container :class="'main'+(darkmode?' dark_mode':'')" v-loading="loading">
    <el-header>
      <div 
      :class="'header_item '+(item.enable?'enable':'disable')" 
      :style="'width:'+item.width+'px;'+item.style" 
      v-for="item in tool_bar_list" :key="item.name"
      v-show="item.show"
      >
        <div class="header_btn" v-on:click="(item.enable&&item.click())">
          <i :class="item.icon"/> {{item.title}}
        </div>
        <div class="header_name">{{item.name}}</div>
      </div>
    </el-header>
    <el-main style="height:calc(100% - 60px);padding:0px;" id="antv_container"></el-main>
    <el-card v-show="pushed_pic_config.show" class="pic_upload_board" v-loading="pushed_pic_config.loadding">
        <img id="pushed_image" :src="pushed_pic_config.base64||pushed_pic_config.url" style="width:100%;"/>  
          <p v-show="pushed_pic_config.base64=='' && pushed_pic_config.url==''  && !pushed_pic_config.pushed" style="text-align:center;">NO IMAGE!</p>   
          <!-- <el-input placeholder="照片名称" v-model="pushed_pic_config.name" v-show="!pushed_pic_config.pushed && pushed_pic_config.url.length==0">
              <el-button slot="append" icon="el-icon-upload" v-on:click="push_a_pic"></el-button>
          </el-input> -->
          <el-input placeholder="照片链接" v-model="pushed_pic_config.url" style="margin-top:10px;"></el-input>
          <div class="btn green" v-if="pushed_pic_config.url.length>0" v-on:click="__tool_add_pic_2">添加到画布</div>
    </el-card>
    <div class="first_load_cover" v-if="first_load">
      <div class="first_load_board">
      Choose a Operation:
      <div class="btn green iconfont icon-new" v-on:click="__init_a_blank_project"> Create</div>
      <div class="btn green iconfont icon-storage" v-on:click="__init_an_online_project" v-if="gitee_enable"> Open</div>
    </div>
    </div>
    <div class="config_board node_config_board" v-if="node_config.show">
      <div class="board_title">{{node_config.title}}</div>
      <el-card>
        <div slot="header" class="clearfix">
          <span>标题</span>
        </div>
        <el-input v-model="node_config.label" @change="__change_node_label" placeholder="请输入内容"></el-input>
      </el-card>
      <el-card style="margin-top:10px;">
        <div slot="header" class="clearfix">
          <span>备注</span>
        </div>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="node_config.note"
          @change="__change_node_note">
        </el-input>
      </el-card>
      <div class="color_selector_board">
        <div class="color_selector">
        <el-row>
        <el-col :span="12">
          填充颜色: 
        </el-col>
        <el-col :span="12">
        <el-color-picker
          v-model="node_config.fill"
          :predefine="predefineColors"
          @change="__change_node_fill">
        </el-color-picker></el-col></el-row>
        </div>
        <div class="color_selector">
        <el-row>
        <el-col :span="12">
          边框颜色: 
        </el-col>
        <el-col :span="12"><el-color-picker
          v-model="node_config.stroke"
          :predefine="predefineColors"
          @change="__change_node_stroke">
        </el-color-picker></el-col></el-row>
        </div>
        <div class="color_selector">
        <el-row>
        <el-col :span="12">
          文字颜色: 
        </el-col>
        <el-col :span="12">
          <el-color-picker
          v-model="node_config.text_color"
          :predefine="predefineColors"
          @change="__change_node_text_color">
        </el-color-picker>
        </el-col>
          </el-row>
        </div>
      </div>
      
      <el-row>
        <el-col :span="12">
          链接
        </el-col>
        <el-col :span="12">
          <el-switch
          v-model="node_config.can_link"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="__change_node_can_link">
        </el-switch>
        </el-col>
      </el-row>
        
        <div v-if="selected_node.store.data.idx!=0" class="btn" v-on:click="__del_node">Delete</div>
        
    </div>
    <div class="md_node_note"  v-if="node_config.show&&node_config.note!=''"  v-html="markdown.render(node_config.note)">
    </div>
    <div class="config_board edge_config_board" v-if="edge_config.show">
      <div class="board_title">{{edge_config.title}}</div>
      <el-card>
        <div slot="header" class="clearfix">
          <span>标题</span>
        </div>
        <el-input v-model="edge_config.label" @change="__change_edge_label" placeholder="请输入内容"></el-input>
      </el-card>
      <div class="btn" v-on:click="__del_edge">Delete</div>
    </div>
    <div class="config_board group_config_board" v-if="group_config.show">
      <div class="board_title">{{group_config.title}}</div>
      <div class="color_selector_board">
        <div class="color_selector">
        <el-row>
        <el-col :span="12">
          填充颜色: 
        </el-col>
        <el-col :span="12">
        <el-color-picker
          v-model="node_config.fill"
          :predefine="predefineColors"
          @change="__change_node_fill">
        </el-color-picker></el-col></el-row>
        </div>
        <div class="color_selector">
        <el-row>
        <el-col :span="12">
          边框颜色: 
        </el-col>
        <el-col :span="12"><el-color-picker
          v-model="node_config.stroke"
          :predefine="predefineColors"
          @change="__change_node_stroke">
        </el-color-picker></el-col></el-row>
        </div>
      </div>
      <div class="btn" v-on:click="__del_group">Delete</div>
    </div>
    <div class="config_board image_config_board" v-if="image_config.show">
      <div class="board_title">{{image_config.title}}</div>
      <el-card>
        <div slot="header" class="clearfix">
          <span>图片链接</span>
        </div>
        <div class="preview_pic" v-on:click="image_config.fullscreen=true" style="cursor: zoom-in;">
          <img id="pushed_image" :src="image_config.url" style="width:100%;"/>
        </div>
        <el-input v-model="image_config.url" @change="__change_image_url" placeholder="请输入内容"></el-input>
      </el-card>
      <div class="btn" v-on:click="__del_image">Delete</div>
    </div>
    <div class="config_board file_config_board" v-if="file_config.show">
      <div class="board_title">{{file_config.title}}</div>
      <div class="btn blue iconfont icon-refresh" v-on:click="this.__get_gitee_files"></div>
      <div class="file_item iconfont icon-file" v-for="item in file_config.list" :key="item.path">
        <div  style="width:calc(100% - 30px);float:right;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"  v-on:click="__load_gitee_file(item.path,item.sha)">
          {{item.path}}
        </div>
      </div>
    </div>
    <div v-if="image_config.fullscreen" class="fullscreen_image" v-on:click="image_config.fullscreen=false" :style="{backgroundImage:'url('+image_config.url+')'}">
      <!-- <img :src="image_config.url" style="width:calc(100% - 20px);"/> -->
    </div>
  </el-container>
</template>

<script>
// const $ = require("jquery");
import { Graph, DataUri} from '@antv/x6';
// import { Layout } from '@antv/layout';
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
// const dagreLayout = new Layout({
//   type: 'dagre',
//   // ranksep: 20,
//   // nodesep: 30,
//   controlPoints: true,
//   nodesepFunc:(opt)=>{
//     return parseInt(opt.width/2);
//   },
//   ranksepFunc:(opt)=>{
//     return parseInt(opt.height/2);
//   },
// })
Graph.registerEdge(
  'edge',
  {
    inherit: 'edge',
    attrs: {
      line: {
        stroke: systemDark?'#fff':"#333",
      },
    },
    connector: { name: 'rounded' },
    router: {
      name: 'manhattan',
      args: {
        startDirections: ['bottom'],
        endDirections: ['top'],
      },
  },
    defaultLabel: {
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        label: {
          fill: 'trsnaparent',
          fontSize: 14,
          textAnchor: 'middle',
          textVerticalAnchor: 'middle',
          pointerEvents: 'none',
        },
        body: {
          ref: 'label',
          fill: 'white',
          stroke: '#333',
          strokeWidth: 2,
          rx: 4,
          ry: 4,
          refWidth: '140%',
          refHeight: '140%',
          refX: '-20%',
          refY: '-20%',
        },
      },
      position: {
        distance: 0.5,
        options: {
          absoluteDistance: true,
          reverseDistance: true,
        },
      },
      
    },
  },
  true,
);
import node_option from '../node_option';
import gitee_info from '../index';
import {GiteeAPI} from "../api";
const gAPI = new GiteeAPI(gitee_info);
import "../assets/iconfont/iconfont.css"

import markdownIt from 'markdown-it'
import markdownItLatex from 'markdown-it-latex'
import 'markdown-it-latex/dist/index.css';
import '../assets/github-markdown.min.css';
const md = markdownIt()
md.use(require('markdown-it-highlightjs'),{ inline: true })
md.use(markdownItLatex)
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data:function(){
    return {
      markdown:md,
      darkmode:systemDark,
      loading:false,
      first_load:true,
      gitee_enable:gitee_info.enable,
      file_name:"untitled",
      file_sha:"null",
      file_type:"mb",
      online_file:false,
      selected_node:null,
      selected_edge:null,
      predefineColors:["#eeeeee","#ffffff","#000000","#b39ddb","#f44336","#009688","#0d47a1"],
      request_lock:false,
      zoom:0,
      tool_bar_list:[
        {
          name:"Arron Liu",
          width:100,
          style:"margin-right: 20px;padding-right: 20px;",
          enable:true,
          show:true,
          icon:"",
          title:"MindBox",
          click:()=>{this.index()},
        },
        {
          name:"文件名",
          width:200,
          style:"margin-right: 20px;padding-right: 20px;",
          enable:true,
          show:true,
          icon:"",
          title:"null",
          click:()=>{this.__file_rename()},
        },
        {
          name:"撤销",
          width:40,
          style:"",
          enable:false,
          show:true,
          icon:"iconfont icon-redo",
          title:"",
          click:()=>{this.graph.undo()},
        },
        {
          name:"重做",
          width:40,
          style:"",
          enable:false,
          show:true,
          icon:"iconfont icon-undo",
          title:"",
          click:()=>{this.graph.redo()},
        },
        {
          name:"子主题",
          width:40,
          style:"",
          enable:false,
          show:true,
          icon:"iconfont icon-create_child_node",
          title:"",
          click:()=>{this.__tool_add_child()},
        },
        {
          name:"主题",
          width:40,
          style:"",
          enable:false,
          show:true,
          icon:"iconfont icon-create_sibling_node",
          title:"",
          click:()=>{this.__tool_add_sibling()},
        },
        {
          name:"群组",
          width:40,
          style:"",
          enable:false,
          show:true,
          icon:"iconfont icon-border",
          title:"",
          click:()=>{this.__tool_add_group()},
        },
        {
          name:"放大",
          width:40,
          style:"",
          enable:true,
          show:true,
          icon:"iconfont icon-zoomin",
          title:"",
          click:()=>{this.zoom+=0.2;this.graph.zoom(0.2);},
        },
        {
          name:"复原",
          width:40,
          style:"",
          enable:true,
          show:true,
          icon:"iconfont icon-zoom",
          title:"",
          click:()=>{this.graph.zoom(-this.zoom);this.zoom=0;},
        },
        {
          name:"缩小",
          width:40,
          style:"",
          enable:true,
          show:true,
          icon:"iconfont icon-zoomout",
          title:"",
          click:()=>{this.zoom-=0.2;this.graph.zoom(-0.2);},
        },
        // {
        //   name:"排布",
        //   width:40,
        //   style:"",
        //   enable:true,
        //   show:false,
        //   icon:"iconfont icon-tree",
        //   title:"",
        //   click:()=>{this.__tool_dagre_graph()},
        // },
        {
          name:"注释",
          width:40,
          style:"",
          enable:true,
          show:true,
          icon:"iconfont icon-note",
          title:"",
          click:()=>{this.__tool_add_note()},
        },
        {
          name:"图片",
          width:40,
          style:"",
          enable:true,
          show:true,
          icon:"iconfont icon-pic",
          title:"",
          click:()=>{this.__tool_add_pic()},
        },
        {
          name:"上传",
          width:40,
          style:"",
          enable:true,
          show:true,
          icon:"iconfont icon-upload",
          title:"",
          click:()=>{this.__upload_to_gitee()},
        },
        {
          name:"PNG",
          width:40,
          style:"",
          enable:true,
          show:true,
          icon:"iconfont icon-PNG",
          title:"",
          click:()=>{this.graph.toPNG((dataUri) => {
            DataUri.downloadDataUri(dataUri, this.file_name+'.png')
          },{padding: {top: 30,right: 20,bottom: 30,left: 20,}})},
        },
        {
          name:"SVG",
          width:40,
          style:"",
          enable:true,
          show:true,
          icon:"iconfont icon-SVG",
          title:"",
          click:()=>{this.graph.toSVG((dataUri) => {
            DataUri.downloadDataUri(DataUri.svgToDataUrl(dataUri), this.file_name+'.svg')
          },{serializeImages:true,viewBox:"0"})},
        },
      ],
      tool_map:{
        "file":1,
        "undo":2,
        "redo":3,
        "child":4,
        "sibling":5,
        "group":6,
      },
      pushed_pic_config:{
        show:false,
        name:"",
        base64:"",
        pushed:false,
        raw:"",
        url:"",
      },
      node_config:{
        show:false,
        title:'编辑节点',
        label:"",
        note:"",
        fill:"",
        stroke:"",
        text_color:"",
        can_link:false,
      },
      edge_config:{
        show:false,
        title:'编辑链接',
        label:"",
        stroke:""
      },
      group_config:{
        show:false,
        title:'编辑群组',
        label:"",
        stroke:""
      },
      image_config:{
        show:false,
        title:'编辑图片',
        url:"",
        fullscreen:false,
      },
      file_config:{
        show:false,
        title:'Files',
        label:"",
        loading:false,
        list:[]
      }
    }
  },
  mounted:function(){
    
    this.__init_graph();
    
    this.__add_events();
    this.__add_keyboard_events();
  },
  methods:{ 
    index:function(){
      if(gitee_info.enable){
        this.file_config.show = !this.file_config.show;
        if(this.file_config.show==true){
          if(this.can_request()){this.__get_gitee_files();this.send_a_request()}
        }
      }
      else{alert("MindMap\nDesined by Arron Liu.")}
    },
    __init_graph:function(){
        const default_graph_option={
        container: document.getElementById('antv_container'),
        history:true,
        clipboard: {
          enabled: true,
          useLocalStorage: true,
        },
        grid: {
          size: 10,      // 网格大小 10px
          visible: true, // 渲染网格背景
        },
        resizing: {
          enabled: true,
        },
        keyboard: {
          enabled: true,
          format(key) { 
            return key
            .replace(/\s/g, '')
            .replace('cmd', 'command')
          },
        },
        selecting: {
          enabled: true,
          multiple: true,
          rubberband: false,
          movable: true,
          showNodeSelectionBox: true,
        },
        connecting: {
          allowBlank: false,
        },
        panning:true,
        background:{
          // color:"#efefef"
        }
      }
      this.graph = new Graph(default_graph_option);
    },
    send_a_request:function(){
      this.request_lock=true;
      setTimeout(()=>{
        this.request_lock=false;
      },2000)
    },
    can_request:function(){
      if(this.request_lock==true){
        this.$notify({
            title: '请求速率过快',
            message: "2s后重试"
        });
        return false;
      }
      return true;
    },
    __init_an_online_project:function(){
      this.file_config.show=true;
      this.__get_gitee_files();
      this.first_load=false;
      this.online_file=true;
    },
    __init_a_blank_project:function(){
      this.graph.fromJSON({})
      // let center_node_class = new node_option['first'].class();
      let center_node_op = node_option["first"];
      // center_node_op.html = center_node_class.node();
      // center_node_op.data.obj = center_node_class;
      console.log(center_node_op)
      console.log(this.graph.addNode(center_node_op))
      this.graph.centerContent();
      this.tool_bar_list[this.tool_map['file']].title=this.file_name;
      this.file_name = "untitled";
      this.tool_bar_list[this.tool_map['file']].title=this.file_name;
      this.first_load=false;
      this.online_file=false;
      document.getElementsByTagName('title')[0].innerText = "new file";
    },
    __extract_graph_json:function(){
        const data={nodes:[],edges:[]};
        const jsondata = this.graph.toJSON();
        console.log(jsondata)
        const ignore_data={nodes:[]}
        const children_data = {nodes:[]}
        const children_set = new Set();
        jsondata.cells.forEach(item=>{
          if("children" in item && item.children.length >0){
            item.children.forEach(c=>{children_set.add(c)})
          }
        })
        jsondata.cells.forEach(item=>{
            if(item.ignore_layout == true){
              let d = {};
              for(let k in item)d[k]=item[k];
              ignore_data.nodes.push(d)
              return
            }
            if(children_set.has(item.id)){
              if(item.shape!="edge"){
                let d = {};
                for(let k in item)d[k]=item[k];
                children_data.nodes.push(d)
                return
              }
            }
            if(item.shape=="rect"){
                let d = {};
                for(let k in item)d[k]=item[k];
                d.width = d.size.width;
                d.height = d.size.height;
                delete d.size;
                delete d.position;
                data.nodes.push(d)
            }else{
                let d = {};
                for(let k in item)d[k]=item[k];
                d.source = d.source.cell
                d.target = d.target.cell
                data.edges.push(d)
            }
        })
        return {"data":data,"ignore":ignore_data,"children":children_data};
    },
    __enable:function(name){
      this.tool_bar_list[this.tool_map[name]].enable=true;
    },
    __disable:function(name){
      this.tool_bar_list[this.tool_map[name]].enable=false;
    },
    __change_node_label:function(){
      let w = this.node_config.label.length * 16;
      let size = this.selected_node.getProp("size")
      this.selected_node.setProp("size",{width:w,height:size.height})
      this.selected_node.attr({text:{text:this.node_config.label}})
    },
    __change_node_can_link:function(){
      this.selected_node && this.selected_node.attr('body/magnet', this.node_config.can_link)
    },
    __change_node_note:function(){
      this.selected_node.updateData({note:this.node_config.note})
    },
    __change_node_fill:function(){
      this.selected_node.attr({body:{fill:this.node_config.fill}})
    },
    __change_node_stroke:function(){
      this.selected_node.attr({body:{stroke:this.node_config.stroke}})
    },
    __change_node_text_color:function(){
      this.selected_node.attr({text:{fill:this.node_config.text_color}})
    },
    __change_edge_label:function(){
      if(this.edge_config.label==''){
        this.selected_edge.setLabels({attrs:{text:{text:''}}})
      }else{
        this.selected_edge.setLabels({attrs:{text:{text:' '+this.edge_config.label+' '}}})
      }
    },
    __change_image_url:function(){
      this.selected_node.attr({image:{"xlink:href":this.image_config.url}})
    },
    __add_events:function(){
      this.graph.on('node:selected', ( args) => { 
          const cells = this.graph.getSelectedCells();
          this.selected_node = args.node;
          if(cells.length >1){
            // group
            // console.log(cells)
            this.__enable("group");
            this.__disable("child")
            this.__disable("sibling")
            this.group_config.show=false;
            this.node_config.show=false;
            this.edge_config.show=false;
            this.image_config.show = false;
            return false;
          }
          if(this.selected_node.shape=="image"){
            // console.log("image")
            this.image_config.show = true;
            this.image_config.url = this.selected_node.attr("image")["xlink:href"];
            return false;
          }
          this.node_config.label = this.selected_node.attr("text").text;
          this.node_config.fill = this.selected_node.attr("body").fill;
          this.node_config.stroke = this.selected_node.attr("body").stroke;
          this.node_config.text_color = this.selected_node.attr("text").fill;
          this.node_config.can_link = this.selected_node.attr('body/magnet');
          if(this.selected_node.store.data.idx==4){
            this.group_config.show=true;
            this.node_config.show=false;
            this.edge_config.show=false;
            this.image_config.show = false;
            return false;
          }
          this.node_config.show=true;
          this.edge_config.show=false;
          this.group_config.show=false;
          this.image_config.show = false;
          this.__disable("group");
          this.__enable("child")
          this.node_config.note = this.selected_node.store.data.data.note;
          if(this.selected_node.store.data.idx!=0){
            this.__enable("sibling")
          }
          // console.log(this.selected_node)
      })
      this.graph.on('node:unselected', ( ) => { 
          this.selected_node = null;
          this.node_config.show=false;
          this.__disable("child")
          this.__disable("sibling")
          this.__disable("group");
      })
      this.graph.on('edge:click', ( args) => { 
          this.selected_edge = args.edge;
          this.edge_config.show=true;
          this.node_config.show=false;
          this.group_config.show=false;
          // this.edge_config.stroke = this.selected_edge.store.data.attrs.path.stroke;
          try{
            this.edge_config.label = this.selected_edge.getLabels()[0].attrs.text.text.trim();
           }catch{
             this.edge_config.label = ''
            //  console.log(this.selected_edge.getLabels())
           }
          // console.log(this.selected_node)
      })
      this.graph.on('edge:connected', (args) => {
        if (args.isNew) {
        const parentid = args.edge.store.data.source.cell;
        const childid = args.edge.store.data.target.cell;
        this.graph.getCell(childid).setData({parent:parentid})
        }
      })
      this.history = this.graph.history
      this.history.on('change', () => {
        // console.log(this.tool_bar_list[this.tool_map['redo']])
          this.history.canRedo()?this.__enable("redo"):this.__disable("redo");
          this.history.canUndo()?this.__enable("undo"):this.__disable("undo");
      })
      this.graph.on('blank:click', ( ) => { 
          this.edge_config.show=false;
          this.node_config.show=false;
          this.group_config.show=false;
          this.file_config.show=false;
          this.image_config.show = false;
          this.pushed_pic_config.show = false;
      });
      this.__add_paste_event()
    },
    __add_keyboard_events:function(){
      this.graph.bindKey('enter',()=>{this.__tool_add_sibling()})
      this.graph.bindKey('ctrl+enter',()=>{this.__tool_add_child()})
      this.graph.bindKey('backspace',()=>{this.__del_node()})
      this.graph.bindKey('ctrl+c', () => {
        const cells = this.graph.getSelectedCells()
        if (cells.length) {
          const new_cells = []
          cells.forEach(cell=>{
            if(cell.store.data.idx!=0){
              new_cells.push(cell);
            }
          })
          this.graph.copy(new_cells)
        }
        return false
      })
      this.graph.bindKey('ctrl+v', () => {
          if (!this.graph.isClipboardEmpty()) {
            const cells = this.graph.paste({ offset: 32 })
            this.graph.cleanSelection()
            this.graph.select(cells)
          }
          return false
        })
      this.graph.bindKey('ctrl+z', () => {
        this.history.canUndo()?this.graph.undo():false;
      })
      this.graph.bindKey('ctrl+s', () => {
        this.__upload_to_gitee();
      })
      this.graph.bindKey('ctrl+n', () => {
        this.__init_a_blank_project();
      })

    },
    __add_paste_event:function(){
        const stopwords = ",.'\":; "
        document.addEventListener('paste', (event) =>{
            if(!this.pushed_pic_config.show){
                return;
            }
            
            var items = event.clipboardData && event.clipboardData.items;
            var file = null;
            var reader  = new FileReader();
            if (items && items.length) {
                // 检索剪切板items
                for (var i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf('image') !== -1) {
                        file = items[i].getAsFile();
                        break;
                    }
                }
            }
            var name = this.file_name.substring(0,15).toLowerCase();
            for(var w =0;w<stopwords.length;w++){
                name = name.split(stopwords[w]).join("_")
            }
            name= name+"_1.png"
            reader.onload = (event)=>{
                this.pushed_pic_config.base64 = event.target.result;
                this.pushed_pic_config.url = this.pushed_pic_config.base64;
                this.pushed_pic_config.name = name;
                this.pushed_pic_config.pushed = false;
            }
            if(file){
                reader.readAsDataURL(file)
            }
        });
    },
    __del_node:function(){
      if(this.selected_node==null || this.selected_node.store.data.idx == 0)return;
      this.graph.removeNode(this.selected_node.id);
      this.node_config.show = false;
      this.image_config.show = false;
      this.$message('删除成功');
    },
    __del_group:function(){
      if(this.selected_node==null || this.selected_node.store.data.idx != 4)return;
      this.selected_node.getChildren().forEach(child=>{
        this.selected_node.unembed(child)
      })
      this.group_config.show = false;
      this.graph.removeNode(this.selected_node.id);
      this.$message('删除成功');
    },
    __del_edge:function(){
      this.graph.removeEdge(this.selected_edge.id);
      this.edge_config.show = false;
      this.$message('删除成功');
    },
    __del_image:function(){
      if(this.selected_node==null || this.selected_node.store.data.idx == 0)return;
      this.graph.removeNode(this.selected_node.id);
      this.image_config.show = false;
      this.$message('删除成功');
    },
    __tool_add_note:function(){
      let d = {};
      for(let k in node_option['note'])d[k] = node_option['note'][k];
      let p = this.graph.pageToLocal(window.innerWidth/2,window.innerHeight/2);
      d.x = p.x;
      d.y = p.y;
      this.graph.addNode(d)
    },
    __tool_add_pic:function(){
      this.pushed_pic_config.show = !this.pushed_pic_config.show;
    },
    __tool_add_pic_2:function(){
      let d = {};
      for(let k in node_option['image'])d[k] = node_option['image'][k];
      let p = this.graph.pageToLocal(window.innerWidth/2,window.innerHeight/2);
      d.x = p.x;
      d.y = p.y;
      d.width = document.getElementById("pushed_image").offsetWidth;
      d.height = document.getElementById("pushed_image").offsetHeight;
      d.imageUrl = this.pushed_pic_config.url;
      // console.log(d)
      this.graph.addNode(d)
      this.pushed_pic_config.pushed = false;
      this.pushed_pic_config.show = false;
      this.pushed_pic_config.url = "";
      this.pushed_pic_config.name = "";
      this.pushed_pic_config.base64 = "";
    },
    __tool_add_child:function(){
        if(this.selected_node==null)return;
        let idx = this.selected_node.store.data.idx;
        let s_d ={};
        if(idx==0){
          for(let k in node_option['second'])s_d[k] = node_option['second'][k]
        }else {
          for(let k in node_option['others'])s_d[k] = node_option['others'][k]
        }
        s_d.parent=this.selected_node.id;

        let t_node = this.graph.addNode(s_d);
        t_node.setData({parent:s_d.parent})
        t_node.setProp("position",{x:this.selected_node.store.data.position.x + parseInt(Math.random()*10),y: this.selected_node.store.data.position.y + this.selected_node.store.data.size.height+40})
        let e = {};for(let k in node_option['edge'])e[k] = node_option['edge'][k]
        e.source = s_d.parent;
        e.target = t_node.id;
        this.graph.unselect(this.selected_node);
        this.graph.select(t_node)
        this.graph.addEdge(e);
        this.$message('添加子主题成功');
        // this.__tool_dagre_graph();
    },
    __tool_add_sibling:function(){
        if(this.selected_node==null)return;
        let idx = this.selected_node.store.data.idx;
        let s_d ={};
        if(idx==0)return;
        if(idx==1){
          for(let k in node_option['second'])s_d[k] = node_option['second'][k]
        }else {
          for(let k in node_option['others'])s_d[k] = node_option['others'][k]
        }
        s_d.parent=this.selected_node.getData().parent;
        let t_node = this.graph.addNode(s_d);
        t_node.setData({parent:s_d.parent})
        t_node.setProp("position",{x:this.selected_node.store.data.position.x + this.selected_node.store.data.size.width + 10,y: this.selected_node.store.data.position.y+parseInt(Math.random()*10)})
        let e = {};for(let k in node_option['edge'])e[k] = node_option['edge'][k]
        e.source = s_d.parent;
        e.target = t_node.id;
        this.graph.unselect(this.selected_node);
        this.graph.select(t_node)
        this.graph.addEdge(e);
        this.$message('添加主题成功');
        // this.__tool_dagre_graph();
    },
    __tool_add_group:function(){
        const cells = this.graph.getSelectedCells();
        const parent_option = node_option["group"];
        let padding = 10;
        if(cells.length){
          let x =0, y = 0, height = 0, width = 0;
          let parent = this.graph.addNode(parent_option);
          let all_x = [], all_y = [];
          cells.forEach(cell=>{
            all_x.push(cell.store.data.position.x - padding);
            all_y.push(cell.store.data.position.y  - padding);
            all_x.push(cell.store.data.position.x + cell.store.data.size.width  + padding);
            all_y.push(cell.store.data.position.y + cell.store.data.size.height + padding);
            parent.addChild(cell)
          })
          //compute x, y
          x = Math.min.apply(null, all_x);
          y = Math.min.apply(null,all_y);
          height = Math.max.apply(null,all_y) - y;
          width = Math.max.apply(null,all_x) - x;
          parent.setProp('size', { width: width, height: height })
          parent.setProp('position', { x: x, y: y })
        }
        return false;
    },
    // __tool_dagre_graph:function(){
    //   var data= this.__extract_graph_json();
    //   let select_id = 0;
    //   if (this.selected_node!=null)select_id=this.selected_node.id;
    //   this.graph.cleanSelection();
    //   const newdata = dagreLayout.layout(data.data)
    //   // reconstruct edges
    //   newdata.edges.forEach(rel=>{
    //       rel.source={
    //           cell:rel.source,
    //           port:"output_port"
    //       }
    //       rel.target={
    //           cell:rel.target,
    //           port:"input_port"
    //       }
    //   })
    //   newdata.nodes = newdata.nodes.concat(data.ignore.nodes).concat(data.children.nodes)
    //   // console.log(newdata)
    //   this.graph.fromJSON(newdata);
    //   if (select_id!=0)this.graph.select(select_id)
    // },
    __file_rename:function(){
      if(this.online_file){
        const file_link = "http://wykxldz.gitee.io/mindbox/?u="+gitee_info.username+"&r="+gitee_info.repos+"&s="+this.file_sha+"&n="+this.file_name+".mb"
        this.$alert('', '分享阅读链接', {
          showInput:true,
          inputValue:file_link
        });
        return;
      }
      this.$prompt('请输入文件名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^([0-9a-zA-z]{1})([\w]*)$/g,
          inputPlaceholder:this.file_name,
          inputErrorMessage: '文件格式不正确'
        }).then(({ value }) => {
          this.file_name=value;
          this.tool_bar_list[this.tool_map['file']].title=this.file_name;
          this.$message({
            type: 'success',
            message: '修改成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      
    },
    __get_gitee_files:function(){
      if(gitee_info.username == "" || gitee_info.repos == "" || gitee_info.token == "" ){
          this.$notify({
              title: ' 失败',
              message: "Gitee 信息有误"
          });
          return;
      }
      this.file_config.loading=true;
      gAPI.get_files().then(res=>{
        let tree = res.data.tree;
        this.file_config.list.splice(0,this.file_config.list.length);
        for(let i = 0; i < tree.length;i++){
          let d = tree[i].path.split(".")
          if(d[d.length-1]=="mb"){
            this.file_config.list.push(tree[i])
          }
        }
        this.file_config.loading=false;
      }).catch(()=>{
        this.file_config.loading=false;
      })
      
    },
    __load_gitee_file:function(name,sha){
      if(gitee_info.username == "" || gitee_info.repos == "" || gitee_info.token == "" ){
          this.$notify({
              title: ' 失败',
              message: "Gitee 信息有误"
          });
          return;
      }
      if(!this.can_request()){return;}
      this.send_a_request();
      this.loading=true;
      gAPI.get_file_by_sha(sha).then(res=>{
        this.graph.fromJSON(JSON.parse(this.__decode(res.data.content)))
        this.graph.centerContent();
        this.file_name = name.split(".mb")[0];
        this.file_sha = sha;
        this.tool_bar_list[this.tool_map['file']].title=this.file_name;
        this.loading=false;
        this.online_file=true;
        document.getElementsByTagName('title')[0].innerText = this.file_name;
      }).catch(()=>{
        this.loading=false;
      })
      
    },
    __upload_gitee_file:async function(name,content){ 
        return new Promise((resolve,reject)=>{
          if(gitee_info.username == "" || gitee_info.repos == "" || gitee_info.token == "" ){
              this.$notify({
                  title: ' 失败',
                  message: "Gitee 信息有误"
              });
              reject(false)
              return false;
          }
          if(!this.can_request()){reject(false);return false;}
          this.send_a_request();
          gAPI.get_file_by_path(name).then(res=>{
            if(res.data.length == 0){
              const data = {
                "content":content
              }
              gAPI.new_file(name,data).then(()=>{
                this.$notify({
                    title: '成功',
                    message: name+" 上传成功！"
                });
                resolve(res.data)
              }).catch((err)=>{
                this.$notify({
                    title: ' 失败',
                    message: err.data.responseJSON.message
                });
                reject(err.data)
              })
            }
            else{
              this.$alert('是否替换'+name, '替换', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                const data ={
                  "content":content,
                  "sha":res.data.sha
                }
                gAPI.update_file(name,data).then(()=>{
                  this.$notify({
                      title: '成功',
                      message: name+" 替换成功！"
                  });
                  resolve(res.data)
                }).catch((err)=>{
                  this.$notify({
                    title: ' 失败',
                    message: err.data.responseJSON.message
                  });
                  reject(err.data)
                })
              }).catch(()=>{
                this.$notify({
                  title: '取消替换',
                  message: ''
                });
              })
            }
          }).catch(()=>{
            this.$notify({
                title: ' 失败',
                message: '请求出错'
            });
          })
        })
        
    },
    __upload_to_gitee:function(){
      const content = this.__encode(JSON.stringify(this.graph.toJSON()));
      const name = this.file_name+'.'+this.file_type;
      this.loading=true;
      this.__upload_gitee_file(name,content).then(()=>{
        this.loading=false;
      }).catch(()=>{
        this.loading=false;
      })
    },
    push_a_pic:function(){
      const content = this.pushed_pic_config.base64.substring(22)
      const name = this.pushed_pic_config.name;
      this.pushed_pic_config.loading=true;
      this.__upload_gitee_file(name,content).then((res)=>{
        this.pushed_pic_config.url = res.download_url;
        this.pushed_pic_config.pushed = true;
        this.pushed_pic_config.loading=false;
      }).catch(()=>{
        this.pushed_pic_config.loading=false;
      })
    },
    __encode:function(str) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
    },
    __decode:function(str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.main{
  position:fixed;
  top:0px;
  left: 0px;
  height:100%;
  width:100%;
}
.header_item{
  height: 60px;
  width: 60px;
  font-weight: bold;
  float:left;
  .header_btn{
    height: 30px;
    width: calc(100% - 10px);
    text-align: center;
    border-radius: 5px;
    border: 1px solid #ddd;
    line-height: 30px;
    box-shadow: 0px 2px 10px -2px rgba(0,0,0,.2);
    transition: ease .5s;
    margin: 5px;
    padding: 0px 5px;
    box-sizing: border-box;
    white-space: nowrap;overflow: hidden;text-overflow: ellipsis;
  }
  .header_name{
    height:15px;
    width: 100%;
    text-align: center;
    line-height: 15px;
    font-size: .5em;
  }
}
.header_item .header_btn:hover{
  box-shadow: 0px 2px 10px -4px rgba(0,0,0,.4);
}
.header_item.enable{
  cursor: pointer;
}
.header_item.disable{
  cursor:not-allowed;
  color:#aaa;
}
.config_board{
  height: calc(100% - 60px);
    width: 30%;
    min-width: 200px;
    position: fixed;
    right: 0px;
    top: 60px;
    background: rgba(255,255,255,.75);
    box-shadow: 0px 0px 10px rgba(0,0,0,.2);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    backdrop-filter: saturate(180%) blur(20px);
    padding: 10px;
    box-sizing: border-box;
}
.board_title{
    font-size: 1.2em;
    font-weight: bold;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
    margin-bottom: 10px;
}
.btn{
    background: #f44336;
    margin: 10px 0px;
    color: white;
    border-radius: 5px;
    padding: 10px;
    font-weight: bold;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    transition:ease .5s;
    cursor: pointer;
    display: flex;
    justify-content: space-around;
    height:20px;
    line-height: 20px;
}
.btn:hover{
  box-shadow: 0 5px 12px -2px rgba(0,0,0,.3);
}
.btn.green{
    background: #009688;
}
.btn.blue{
    background: #0d47a1;
}
.file_config_board{
  height: calc(100% - 60px);
    width: 30%;
    min-width: 200px;
    position: fixed;
    left: 0px;
    top: 60px;
    background: rgba(255,255,255,.75);
    box-shadow: 0px 0px 10px rgba(0,0,0,.2);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    backdrop-filter: saturate(180%) blur(20px);
        padding: 10px;
    box-sizing: border-box;
    .file_item{
          height: 50px;
      line-height: 50px;
      margin:5px;
      background: white;
      border-radius: 5px;
      border: 1px solid #ddd;
      text-align: left;
      text-indent: 10px;
    }

}
.first_load_cover{
      position: fixed;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    background: transparent;
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    backdrop-filter: saturate(180%) blur(20px);
    .first_load_board{
      padding: 20px 10px;
    position: fixed;
    width: 200px;
    top: 30%;
    left: calc(50% - 100px);
    z-index: 100;
    background: white;
    border-radius: 5px;
    box-shadow: 0px 3px 10px rgba(0,0,0,.1);
}
}
.color_selector_board{
  .color_selector{
        line-height: 40px;
    margin: 5px;
  }
}
.pic_upload_board{
  position: absolute;
    top:70px;
    width:400px;
    right:20px;
    z-index: 100;
}

.fullscreen_image{
  position: fixed;
  z-index: 10;
  top:0px;
  left:0px;
  height: 100vh;
  width: 100vw;
  background: rgba(0,0,0,.5);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
    backdrop-filter: saturate(180%) blur(20px);
      background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: zoom-out;
}
.md_node_note{
      position: absolute;
        max-height: calc(80% - 60px);
    max-width: 30%;
    top: calc(10% + 60px);
    left: 10px;
    box-shadow: 10px 10px 20px -5px  rgba(0,0,0,.1);
    background: white;
    border-radius: 10px;
    text-align: justify;
    padding: 20px 20px;
    box-sizing: border-box;
    // text-indent: 20px;
    word-wrap: break-word;
    word-break: normal;
    border:2px solid white;
    overflow: auto;
}
.dark_mode{
  background:#333;
  .header_btn{
    background: #444;
    color:white;
    border: 1px solid #666;
  }
  .header_name{
    color: white;
  }
  .header_item.disable{
    .header_btn{
      border: 1px solid #444;
      color:#666;
    }
    .header_name{
      color: #666;
    }
  }
  #antv_container{
    background: #222 !important;
  }
  .config_board{
    background:rgba(0,0,0,.75);
    color:white;
    .el-input{
      ::v-deep input{
        background: #666;
        border: 1px solid #444;
        color: white;
      }
    }
    .el-textarea{
      ::v-deep textarea{
        background: #666;
        border: 1px solid #444;
        color: white;
      }
    }
    .board_title{
      color:white;
      border-bottom: 1px solid #444;
    }
    .el-card{
      border:1px solid #444;
      ::v-deep .el-card__header{
        background: #333;
        border-bottom: 1px solid #444;
        color:white;
      }
      ::v-deep .el-card__body{
        background: #333;
        color:white;
      }
    }
  }
  .file_config_board .file_item{
    background: #333;
    border:1px solid #444;
  }
  .md_node_note{
        background: #333;
    color: white;
    border-color: #333;
  }
  svg g path{
    stroke:white !important;
  }
}
</style>
