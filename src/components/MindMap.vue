<template>
  <div id="app_" :class="'main'+(darkmode?' dark_mode':'')">
    <div id="main" :class="position_mode?'position_mode':''">
      <el-container v-loading="loading">
        <el-header>
          <div 
          :class="'header_item '+(item.enable?'enable':'disable')" 
          :style="'width:'+item.width+'px;'+item.style" 
          v-for="item in tool_bar_list" :key="item.name"
          v-show="item.show"
          >
            <div class="header_btn" v-on:click="(item.enable&&item.type!='btn'&&item.click())">
              <i :class="item.icon"/> {{item.title}}
              <el-switch v-if="item.type=='btn'"
                v-model="item.enable"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="item.click()">
              </el-switch>
            </div>
            <div class="header_name">{{item.name}}</div>
          </div>
        </el-header>
        <el-main style="height:calc(100vh - 60px);padding:0px;" id="antv_container"></el-main>
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
            <div v-if="read_mode">
              {{cover_msg}}
            </div>
            <div v-else>
              Choose a Operation:
              <div class="btn green iconfont icon-new" v-on:click="__init_a_blank_project"> Create</div>
              <div class="btn green iconfont icon-storage" v-on:click="__init_an_online_project" v-if="gitee_enable"> Open</div>
            </div>
          </div>
        </div>
        <div class="config_board node_config_board" v-if="!read_mode&&node_config.show">
          <div class="board_title">{{node_config.title}}<div class="btn green" v-if="markdown_mode" @click="markdown_mode=false;" style="position:absolute;top:0px;right:10px;">X</div></div>
          <el-card>
            <div slot="header" class="clearfix">
              <span>标题</span>
            </div>
            <el-input v-model="node_config.label" @change="__change_node_label" placeholder="请输入内容"></el-input>
          </el-card>
          <el-card style="margin-top:10px;">
            <div slot="header" class="clearfix">
              <span>备注 <el-button style="background:transparent;border:0px;" plain icon="el-icon-edit" @click="markdown_mode=true"></el-button></span>
            </div>
            <el-input
              type="textarea"
              :class="(markdown_mode?'markdown_mode':'')"
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
        <div id="node_note" :class="'md_node_note'+(markdown_mode?' markdown_mode':'')"  v-if="node_config.show&&node_config.note!=''">
        <div :class="'btn green '+(node_note_raw_text?'el-icon-tickets':'el-icon-notebook-2')" style="width:20px;border-radius:20px;"  @click="node_note_raw_text=!node_note_raw_text"></div>
        <textarea style="width: 30vw;border: 0px;height: 50vh;border-radius: 5px;padding: 5px;" v-if="node_note_raw_text" :value="node_config.note"></textarea>
        <div v-else v-html="markdown.render(node_config.note)"></div>
        
        </div>
        
        <img id="pushed_image"  class="preview_pic_note"  v-if="image_config.show&&image_config.url!=''" v-on:click="image_config.fullscreen=true" style="cursor: zoom-in;" :src="image_config.url"/>
        
        <div class="config_board edge_config_board" v-if="!read_mode&&edge_config.show">
          <div class="board_title">{{edge_config.title}}</div>
          <el-card>
            <div slot="header" class="clearfix">
              <span>标题</span>
            </div>
            <el-input v-model="edge_config.label" @change="__change_edge_label" placeholder="请输入内容"></el-input>
          </el-card>
          <div class="btn" v-on:click="__del_edge">Delete</div>
        </div>
        <div class="config_board group_config_board" v-if="!read_mode&&group_config.show">
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
        <div class="config_board image_config_board" v-if="!read_mode&&image_config.show">
          <div class="board_title">{{image_config.title}}</div>
          <el-card>
            <div slot="header" class="clearfix">
              <span>图片链接</span>
            </div>
            <el-input v-model="image_config.url" @change="__change_image_url" placeholder="请输入内容"></el-input>
          </el-card>
          <div class="btn" v-on:click="__del_image">Delete</div>
        </div>
        <div class="config_board file_config_board" v-if="!read_mode&&file_config.show" v-loading="file_config.loading">
          <div class="board_title">{{file_config.title}}</div>
          <div style="display:flex;">
            <div class="btn blue iconfont icon-refresh" v-on:click="__get_gitee_files"></div>
            <div class="btn blue iconfont icon-new" v-on:click="__add_file_group"></div>
            <div class="btn green iconfont icon-upload" v-on:click="__upload_file_group"></div>
          </div>
          <div class="group_item" v-for="group, idx in file_config.groups" :key="group.name">
            <p style="font-size:1.2rem;font-weight:bold;line-height:20px;margin:5px 0px;">{{group.name}}</p>
            <div class="btn red" style="width:calc(100% - 30px);" v-show="group.list.length<=0" v-on:click="__delete_file_group(idx)">Delete Group</div>
            <draggable
              class="list-group"
              :list="group.list"
              group="files"
            >
              <div class="file_item list-group-item" v-for="item in group.list" :key="item.path">
                <div  style="width:calc(100% - 30px);float:right;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"  v-on:click="__load_gitee_file(item.path,item.sha);">
                  <i class="el-icon-document"/>{{item.path}}
                </div>
              </div>
            </draggable>
          </div>
        </div>
        <div v-if="image_config.fullscreen" class="fullscreen_image" v-on:click="image_config.fullscreen=false" :style="{backgroundImage:'url('+image_config.url+')'}">
        </div>
      </el-container>
    </div>
    <div id="center" :class="position_mode?'position_mode':''" @click="position_mode=false;"></div>
    <div id="right"  :class="position_mode?'position_mode':''">
      <!-- <el-tag
      v-for="position in positions"
      :key="position.name"
      closable
      @click="to_position(position)"
      @close="delte_position(position)">
      {{position.name}}
    </el-tag> -->
    <div class="btn green" style="height:40px;line-height:40px;padding:0px;width:calc(100% - 40px);overflow:hidden;" v-for="position in positions" :key="position.name">
      <div style="width:calc(100% - 40px);background:transparent" @click="to_position(position)" :title="position.name">{{position.name}}</div>
      <i v-if="!read_mode" class="el-icon-close close-btn" style="width:40px;line-height:40px;" @click="delte_position(position)"></i>
    </div>
    <span v-if="positions.length==0" style="position:absolute;top:20px;left:0px;width:100%;">No Locations</span>

    </div>
    <div v-if="!read_mode" id="bottom" :class="position_mode?'position_mode':''">
      <div class="btn blue" style="width:100px" @click="add_position"><i class="el-icon-add-location"></i> 添加定位</div>
    </div>
  </div>
</template>

<script>
import { Graph, DataUri} from '@antv/x6';
import draggable from "vuedraggable";
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

Graph.registerEdge(
  'edge',
  {
    inherit: 'edge',
    attrs: {
      line: {
        strokeWidth:2,
      },
    },
    connector: { name: 'rounded' },
    router: {
      name: 'manhattan',
      args: {
        startDirections: ['bottom','left','right'],
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
import {getGiteeInfo, GiteeAPI, removeToken} from "../api";
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
    // msg: String
  },
  components: {draggable},
  data:function(){
    return {
      gitee_info: {enable:false, username:"",repos:"",token:""},
      server_mode:false,
      read_mode:false,
      position_mode:false,
      cover_msg:"加载中...",
      markdown:md,
      node_note_raw_text:false,
      darkmode:systemDark,
      loading:false,
      first_load:true,
      gitee_enable:false,
      file_name:"untitled",
      file_sha:"null",
      file_type:"mb",
      graph:null,
      online_file:false,
      selected_node:null,
      selected_edge:null,
      predefineColors:["#eeeeee","#ffffff","#000000","#b39ddb","#f44336","#009688","#0d47a1"],
      request_lock:false,
      zoom:0,
      tool_bar_list:[
        {
          name:"Xiaohao Liu",
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
          click:()=>{this.__file_share_link()},
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
        {
          name:"深色模式",
          width:100,
          style:"",
          enable:this.darkmode,
          show:true,
          type:'btn',
          icon:"",
          title:"",
          click:()=>{this.darkmode = !this.darkmode;this.tool_bar_list[this.tool_map['darkmode']].enable=this.darkmode;},
        },
        {
          name:"定位",
          width:40,
          style:"",
          enable:true,
          show:true,
          icon:"el-icon-place",
          title:"",
          click:()=>{this.position_mode = true;},
        },
        {
          name:"登出",
          width:60,
          style:"",
          enable:true,
          show:true,
          icon:"el-icon-coffee-cup",
          title:"",
          click:()=>{removeToken();this.$router.push("/login")},
        },
      ],
      tool_map:{
        "file":1,
        "undo":2,
        "redo":3,
        "child":4,
        "sibling":5,
        "group":6,
        "darkmode":15,
      },
      read_mode_bar:new Set([0,1,2,3,7,8,9,15,16]),
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
        groups:[
          
        ],
        files:new Set()
      },
      positions:[],
      markdown_mode:false
    }
  },
  mounted:function(){
    getGiteeInfo().then(res=>{
      this.server_mode = true;
      this.gitee_info = res;
      this.gitee_enable = this.gitee_info.enable;
    }).catch(err=>{
      console.log(err)
    }).finally(()=>{
      this.__init_read_mode();
      this.__init_graph();
      
      this.__add_events();
      this.__add_keyboard_events();
      if(this.read_mode){this.__load_online_file()}
    })
    
  },
  methods:{ 
    index:function(){
      if(!this.read_mode&&this.gitee_enable){
        this.file_config.show = !this.file_config.show;
        if(this.file_config.show==true){
          if(this.can_request()){this.__get_gitee_files();this.send_a_request()}
        }
      }
      else{
        alert("MindMap\nDesined by Xiaohao Liu.\nGithub: WYKXLDZ");
        }
    },
    __init_read_mode:function(){
      if(!this.gitee_enable)this.read_mode=true;
      const location_parames = {}
      window.location.search.substring(1).split("&").forEach(ele=>{
        let i = ele.split("=");
        location_parames[i[0]] = i[1]
      })
      try{
        let gitee_info={
          enable:true,
          username:location_parames['u'],
          repos: location_parames['r'],
          token:"",
        }
        
        this.file_sha = location_parames['s']
        this.file_name = location_parames['n'].split(".mb")[0]
        
        this.read_mode=true;
        // console.log(this.gitee_info)
        this.gAPI = new GiteeAPI(gitee_info);
        this.gitee_info = gitee_info
        this.tool_bar_list.forEach((ele,idx)=>{
          if(this.read_mode_bar.has(idx))return;
          ele.show=false;
        })
      }catch{
        if(!this.read_mode){this.gAPI = new GiteeAPI(this.gitee_info);return;}
        else{
          this.cover_msg="参数错误！"
        }
        return;
      }
    },
    __load_online_file:function(){
      if(!this.can_request()){return;}
      this.send_a_request();
      this.loading=true;
      this.gAPI.get_file_by_sha(this.file_sha).then(res=>{
        this.jsondata = JSON.parse(this.__decode(res.data.content))
        if('graph' in this.jsondata){
          this.grpahsource = this.jsondata['graph']
          this.positions = this.jsondata['positions']
        }
        else{this.grpahsource = this.jsondata}
        this.graph.fromJSON(this.grpahsource)
        this.graph.centerContent();
        this.tool_bar_list[this.tool_map['file']].title=this.file_name;
        this.loading=false;
        this.online_file=true;
        this.first_load=false;
        document.getElementsByTagName('title')[0].innerText = this.file_name;
      }).catch((err)=>{
        this.cover_msg="Wrong\n" + err
        console.log("wrong:", err)
        this.loading=false;
      })
      
    },
    __init_graph:function(){
        // darkmode
        this.tool_bar_list[this.tool_map['darkmode']].enable=this.darkmode;
        const default_graph_option={
        container: document.getElementById('antv_container'),
        history:true,
        clipboard: {
          enabled: this.read_mode?false:true,
          useLocalStorage: this.read_mode?false:true,
        },
        grid: {
          size: 10,      // 网格大小 10px
          visible: true, // 渲染网格背景
        },
        resizing: {
          enabled: this.read_mode?false:true,
        },
        keyboard: {
          enabled: this.read_mode?false:true,
          format(key) { 
            return key
            .replace(/\s/g, '')
            .replace('cmd', 'command')
          },
        },
        selecting: {
          className:"select_box",
          enabled: true,
          modifiers:'shift',
          multiple: true,
          rubberband: true,
          strict:true,
          movable: true,
          showNodeSelectionBox: true,
        },
        connecting: {
          allowBlank: false,
          allowNode: this.read_mode?false:true,
          allowMulti: this.read_mode?false:true,
          allowLoop: this.read_mode?false:true,
          allowEdge: false,
          allowPort: false,
          highlight: true,
          snap:true,
          createEdge:() =>{
          return this.graph.createEdge({
            attrs: {
              line: {
                strokeWidth: 2,
                connector: { name: 'rounded' },
                targetMarker: {
                  name: 'block',
                  args: {
                    size: '6',
                  },
                },
              },
            },
          })
        },
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
      // let center_node_op = node_option["first"];
      // center_node_op.html = center_node_class.node();
      // center_node_op.data.obj = center_node_class;
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
      
      
      this.selected_node.attr({text:{text:this.node_config.label}});
      let w = this.getElementsByAttr("g","data-cell-id", this.selected_node.id).getElementsByTagName("text")[0].getBBox().width + 20
      let size = this.selected_node.getProp("size")

      this.selected_node.setProp("size",{width:w,height:size.height})
    },
    __change_node_can_link:function(){
      this.selected_node && this.selected_node.attr('body/magnet', this.node_config.can_link)
    },
    __change_node_note:function(){
      this.selected_node.updateData({note:this.node_config.note})
    },
    __change_node_fill:function(){
      this.selected_node.attr({body:{fill:this.node_config.fill}})
      let rgb = this.colorRgb(this.node_config.fill).substring(4)
      rgb = rgb.substring(0,rgb.length-1).split(",");
      let strokergb=[]
      rgb.forEach(c=>{
        c = parseInt(c);
        if (c == 255){
          c=0;}
        else{
          c*=1.4;c=parseInt(c);}
        if (c > 255){
          c=255;}
          strokergb.push(c)
      })
      strokergb ="rgb("+ strokergb.join(",")+")";
      this.node_config.stroke = this.colorHex(strokergb);
      this.selected_node.attr({body:{stroke:this.node_config.stroke}})
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
           }
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
          this.markdown_mode=false;
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
    add_position:function(){
      this.$prompt('请输入位置名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.positions.push({
            name:value,
            x:this.graph.coord.options.x,
            y:this.graph.coord.options.y,
          })
          this.$message({
            type: 'success',
            message: '新建位置成功：' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    },
    delte_position:function(pos){
      for(let i = 0; i < this.positions.length; i++ ){
        if(JSON.stringify(this.positions[i])==JSON.stringify(pos)){
          this.positions.splice(i,1);
          break
        }
      }
    },
    to_position:function(pos){
      this.graph.translate(pos.x, pos.y)
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
    __file_share_link:function(){
      if(this.online_file){
        const file_link = "http://wykxldz.gitee.io/mindbox/?u="+this.gitee_info.username+"&r="+this.gitee_info.repos+"&s="+this.file_sha+"&n="+this.file_name+".mb"
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
          if(this.file_config.files.has(value)){
            this.$message({
              type: 'warning',
              message: '已存在该文件名'
            });
            return;
          }
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
      if(this.gitee_info.username == "" || this.gitee_info.repos == "" || this.gitee_info.token == "" ){
          this.$notify({
              title: ' 失败',
              message: "Gitee 信息有误"
          });
          return;
      }
      this.file_config.loading=true;
      this.gAPI.get_files().then(res=>{
        let tree = res.data.tree;
        this.file_config.groups.splice(0,this.file_config.groups.length);
        
        for(let i = 0; i < tree.length;i++){
          if(tree[i].path=="MindBox_file_groups"){
            this.gAPI.get_file_by_sha(tree[i].sha).then(res=>{
              this.file_config.groups = JSON.parse(this.__decode(res.data.content))
            }).catch(()=>{
              this.file_config.groups.push({
                name: "files",
                list: []
              })
            }).finally(()=>{
              let s = new Set();
              let s_ = new Set();
              let s_map = {}
              for(let i = 1; i< this.file_config.groups.length; i++){
                this.file_config.groups[i].list.forEach((ele)=>{
                  s.add(ele.path.split('.'+this.file_type)[0])
                })
              }
              this.file_config.groups[0].list.splice(0,this.file_config.groups[0].list.length)
              for(let i = 0; i < tree.length;i++){
                let d = tree[i].path.split(".")
                if(d[d.length-1]==this.file_type ){
                  let name = tree[i].path.split('.'+this.file_type)[0]
                  this.file_config.files.add(name)
                  if(s.has(name)){
                    s_.add(name);s_map[name] = tree[i]
                  }
                  else this.file_config.groups[0].list.push(tree[i]);
                }
              }
              // delete the files that not exist
              function difference(setA, setB) {
                  let _difference = new Set(setA);
                  for (let elem of setB) {
                      _difference.delete(elem);
                  }
                  return _difference;
              }
              let d_ = difference(s,s_)
              for(let i = 1; i< this.file_config.groups.length; i++){
                this.file_config.groups[i].list.forEach((ele,idx)=>{
                  let name = ele.path.split('.'+this.file_type)[0]
                  if(d_.has(name)){
                    this.file_config.groups[i].list.splice(idx,idx+1)
                  }
                  if(s_.has(name)){
                    for(let j in ele){ele[j] = s_map[name][j]}
                  }
                })
              }
              this.file_config.loading=false;
            })
            break;
          }
        }
        this.file_config.groups.push({name:"Files",list:[]})
        for(let i = 0; i < tree.length;i++){
          let d = tree[i].path.split(".")
          if(d[d.length-1]==this.file_type ){
              this.file_config.groups[0].list.push(tree[i]);
          }
        }
        this.file_config.loading=false
        
      }).catch(()=>{
        this.file_config.loading=false;
      })
      
    },
    __load_gitee_file:function(name,sha){
      if(this.gitee_info.username == "" || this.gitee_info.repos == "" || this.gitee_info.token == "" ){
          this.$notify({
              title: ' 失败',
              message: "Gitee 信息有误"
          });
          return;
      }
      if(!this.can_request()){return;}
      this.send_a_request();
      this.loading=true;
      this.file_config.show=false;
      this.gAPI.get_file_by_sha(sha).then(res=>{
        this.jsondata = JSON.parse(this.__decode(res.data.content))
        if('graph' in this.jsondata){
          this.grpahsource = this.jsondata['graph']
          this.positions = this.jsondata['positions']
        }
        else{this.grpahsource = this.jsondata}
        
        this.graph.fromJSON(this.grpahsource)
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
          if(this.gitee_info.username == "" || this.gitee_info.repos == "" || this.gitee_info.token == "" ){
              this.$notify({
                  title: ' 失败',
                  message: "Gitee 信息有误"
              });
              reject(false)
              return false;
          }
          if(!this.can_request()){reject(false);return false;}
          this.send_a_request();
          this.gAPI.get_file_by_path(name).then(res=>{
            if(res.data.length == 0){
              const data = {
                "content":content
              }
              this.gAPI.new_file(name,data).then((res)=>{
                this.$notify({
                    title: '成功',
                    message: name+" 上传成功！"
                });
                this.file_sha = res.data.content.sha
                this.file_name = res.data.content.name.split(".mb")[0]
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
                this.gAPI.update_file(name,data).then((res)=>{
                  this.$notify({
                      title: '成功',
                      message: name+" 替换成功！"
                  });
                  console.log(res.data)
                  this.file_sha = res.data.content.sha
                  this.file_name = res.data.content.name.split(".mb")[0]
                  resolve(res.data)
                }).catch((err)=>{
                  this.$notify({
                    title: ' 失败',
                    message: err.data.responseJSON.message
                  });
                  reject(err.data)
                })
              }).catch((err)=>{
                this.$notify({
                  title: '取消替换',
                  message: ''
                });
                reject(err.data)
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
      const data = JSON.stringify({
        graph:this.graph.toJSON(),
        positions: this.positions
      })
      const content = this.__encode(data);
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
    __open_file_group:function(idx){
      
      if(idx<this.file_config.list.groups.length)
      {this.file_config.group.idx = idx;this.file_config.group.show = true;}
      
    },
    __upload_file_group:function(){
      let content = this.__encode(JSON.stringify(this.file_config.groups));
        let name = "MindBox_file_groups";
        return new Promise((resolve,reject)=>{
          if(this.gitee_info.username == "" || this.gitee_info.repos == "" || this.gitee_info.token == "" ){
              this.$notify({
                  title: ' 失败',
                  message: "Gitee 信息有误"
              });
              reject(false)
              return false;
          }
        this.file_config.loading = true;
          if(!this.can_request()){reject(false);return false;}
          this.send_a_request();
          this.gAPI.get_file_by_path(name).then(res=>{
            if(res.data.length == 0){
              const data = {
                "content":content
              }
              this.gAPI.new_file(name,data).then((res)=>{
                this.$notify({
                    title: '成功',
                    message: name+" 上传成功！"
                });
                this.file_config.loading = false;
                resolve(res.data)
              }).catch((err)=>{
                this.$notify({
                    title: ' 失败',
                    message: err.data.responseJSON.message
                });
                this.file_config.loading = false;
                reject(err.data)
              })
            }
            else{
                const data ={
                  "content":content,
                  "sha":res.data.sha
                }
                this.gAPI.update_file(name,data).then((res)=>{
                  this.$notify({
                      title: '成功',
                      message: name+" 替换成功！"
                  });
                  this.file_config.loading = false;
                  resolve(res.data)

              }).catch((err)=>{
                this.$notify({
                  title: '取消',
                  message: ''
                });
                this.file_config.loading = false;
                reject(err.data)
              })
            }
          }).catch(()=>{
            this.$notify({
                title: ' 失败',
                message: '请求出错'
            });
            this.file_config.loading = false;
          })
        })
    },
     __delete_file_group:function(idx){
      console.log(idx)
      this.file_config.groups.splice(idx,idx+1);
    },
    __add_file_group:function(){
      this.$prompt('请输入群组名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w]+/,
          inputErrorMessage: '格式不正确'
        }).then(({ value }) => {
          this.file_config.groups.push({
            name:value,
            list:[]
          })
          this.$message({
            type: 'success',
            message: '新建群组: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
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
    },
    colorHex:function(color){
      var reg = /^(rgb|RGB)/;
      if (reg.test(color)) {
        var strHex = "#";
        // 把RGB的3个数值变成数组
        var colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        // 转成16进制
        for (var i = 0; i < colorArr.length; i++) {
          var hex = Number(colorArr[i]).toString(16);
          if (hex === "0") {
            hex += hex;
          }
          strHex += hex;
        }
        return strHex;
      } else {
        return String(color);
      }
    },
    colorRgb:function (color) {
      // 16进制颜色值的正则
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      // 把颜色值变成小写
      color = color.toLowerCase();
      if (reg.test(color)) {
        // 如果只有三位的值，需变成六位，如：#fff => #ffffff
        if (color.length === 4) {
          var colorNew = "#";
          for (let i = 1; i < 4; i += 1) {
            colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
          }
          color = colorNew;
        }
        // 处理六位的颜色值，转为RGB
        var colorChange = [];
        for (let i = 1; i < 7; i += 2) {
          colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
        }
        return "RGB(" + colorChange.join(",") + ")";
      } else {
        return color;
      }
    },
    getElementsByAttr: function(tagname, attrname, value) {
      let eles = document.getElementsByTagName(tagname)
      for(let i = 0; i <= eles.length; i ++){
        if(eles[i].getAttribute(attrname)==value){
          return eles[i]
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#app_{
  background:#EEE;
  position: absolute;
  height:100vh;
  width:100vw;
  overflow: hidden;
  #main{
    position: absolute;
    height: 100%;
    background:white;
    width: 100%;
    transition:ease all .5s;
  }
  #main.position_mode{
    transform: scale(0.85) translate(-7%, -7%);
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0,0,0,.1);
  }
  #center{
    height:90vh;
    width:90vw;
    position: absolute;
    top:0px;
    left:0px;
    background:transparent;
    z-index: 2;
    display: none;
  }
  #center.position_mode{
    display: block;
  }
  #right{
        height: 100vh;
      width: 10vw;
      background: transparent;
      position: absolute;
      right: -10vw;
      top: 0px;
      z-index: 2;
      transition:ease all .5s;
      .el-tag{
        font-size: 1.2rem;
        text-align: right;
        width: calc(100% - 10px) ;
        margin:5px 0px;
        ::v-deep .el-tag__close{
          
        }
      }
  }
  #right.position_mode{
    right:0px;
  }
  #bottom{
      height: 10vh;
      width: 90vw;
      background: transparent;
      position: absolute;
      left: 0px;
      bottom: -10vh;
      z-index: 2;
      transition:ease all .5s;
      padding: 0px 20px;
  }
  #bottom.position_mode{
    bottom:0px;
  }
}
.close-btn:hover{
  background-color: #f56c6c;
}
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
    line-height: 26px;
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
    height: calc(100% - 70px);
    width: 30%;
    min-width: 200px;
    position: fixed;
    right: 5px;
    top: 65px;
    border-radius: 10px;
    background: rgba(255,255,255,.75);
    box-shadow: 0px 0px 10px rgba(0,0,0,.2);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    backdrop-filter: saturate(180%) blur(20px);
    padding: 10px;
    box-sizing: border-box;
    overflow: auto;
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
    justify-content: space-evenly;
    height:20px;
    line-height: 20px;
}
.btn:hover{
  box-shadow: 0 5px 12px -2px rgba(0,0,0,.3);
}
.btn.green{
    background: #009688;
}
.btn.green:hover{
  box-shadow: 0 5px 20px -10px #009688;
}
.btn.blue{
    background: #0d47a1;
}
.btn.blue:hover{
  box-shadow: 0 5px 20px -10px #0d47a1;
}
.file_config_board{
    left: 5px;
    width: calc(100% - 10px);
    background: rgba(255,255,255,.75);
    box-shadow: 0px 0px 10px rgba(0,0,0,.2);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    backdrop-filter: saturate(180%) blur(20px);
    padding: 10px;
    box-sizing: border-box;
    .btn{
      width: 50px;
      margin: 5px;
    }
    .list-group{
      min-height: 20px;
    }
    .file_group_details{
          position: absolute;
    height: 50%;
    width: calc(100% - 20px);
    min-width: 400px;
    background: white;
    z-index: 2;
    top: calc(20%);
    left: 10px;
    margin: auto;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 0px 5px 20px -3px rgb(0 0 0 / 20%);
    }
    .group_item,
    .file_item{
      width: calc(100% - 10px);
        float:left;
          height: 50px;
          line-height: 50px;
          margin:5px;
          background: white;
          border-radius: 5px;
          border: 1px solid #ddd;
          text-align: left;
          text-indent: 10px;
          transition: ease .5s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
      font-weight: bold;
          i{
            position: absolute;
            font-size: 5rem;
            color: rgba(0, 0, 0, 0.2);
            z-index: 0;
            right: 0;
        }
    }
    .file_item:hover{
      box-shadow: 0px 2px 20px -5px rgba(0,0,0,.2);
      border-color: #EEE;
    }
    .group_item{
      width: calc(25% - 12px);
      background: white;
      height: auto;
      padding: 5px;
      box-shadow: 0px 2px 20px -5px rgba(0,0,0,.2);
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
    max-width: 40%;
    top: calc(10% + 60px);
    left: 10px;
    box-shadow: 10px 10px 20px -5px rgb(0 0 0 / 10%);
    background: white;
    border-radius: 10px;
    text-align: justify;
    padding: 5px 10px;
    box-sizing: border-box;
    word-wrap: break-word;
    word-break: normal;
    overflow: auto;
    border: 1px solid #eee;
    padding-bottom: 20px;
    font-family: 'KaTeX_Main';
}

.md_node_note.markdown_mode{
      width: calc(35% - 20px);
    max-width: calc(35% - 20px);
    top: 70px;
    height: calc(100% - 80px);
    max-height: calc(100% - 80px);
    overflow: scroll;
}
.preview_pic_note{
    position: absolute;
    max-height: calc(80% - 60px);
    max-width: 30%;
    top: calc(10% + 60px);
    left: 10px;
    box-shadow: 10px 10px 20px -5px  rgba(0,0,0,.1);
    background: white;
    border-radius: 10px;
    text-align: justify;
    padding: 0px;
    box-sizing: border-box;
    // text-indent: 20px;
    word-wrap: break-word;
    word-break: normal;
}
.el-textarea.markdown_mode{
      position: fixed;
    top: 50px;
    right: 0px;
    width: 100%;
    height: calc(100% - 50px);
    z-index:2;
    ::v-deep .el-textarea__inner{
      height: 100% !important;
      overflow: scroll;
    }
}
.dark_mode{
  background:#333 !important;
  #main{
    background:#222 !important;
  }
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
  // #antv_container{
  //   background: #222 !important;
  // }
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
<style lang="scss" rel="stylesheet/scss">
.x6-node *{font-family: 'KaTeX_Main';}
.x6-widget-selection-box{
    border-radius: 10px;
    border-color: #f56c6c;
    box-shadow: 0px 5px 10px rgba(0,0,0,.2);
}
.x6-widget-transform{
  border-color: transparent;
}
.x6-widget-transform > div{
  border-color: #f56c6c;
}
.x6-widget-selection-inner{
    margin-top: -20px;
    margin-left: -20px;
    padding-right: 40px;
    padding-bottom: 40px;
    border: 2px solid #f56c6c;
    border-radius:10px;
}
.x6-widget-selection-rubberband{
  background:#f56c6c;
  border-radius:10px;
  border-color:red;
}
.x6-cell.x6-edge path[marker-end]{
  stroke:#333;
}
marker path{
    stroke:#333;
    fill:#333;
  }
.dark_mode{
  marker path{
    stroke:white;
    fill:white;
  }
  .x6-cell.x6-edge path[marker-end]{
    stroke:white;
  }
  .el-loading-mask{
    background-color: rgba(0,0,0,.9);
  }
}

.md_node_note{
thead th{
    background: transparent !important;
    color: black !important;
    font-weight: bold;
    border: 0px !important;
    /* border-top: 1px solid black; */
    border-bottom: 1px solid black !important;
    padding: 5px 20px;
    margin-bottom: 5px;
}
tbody td{
    background: transparent !important;
    color: black !important;
    border: 0px !important;
    border-top: 1px solid black !important;
    /* border-bottom: 1px solid black; */
    padding: 5px 20px;
    margin-bottom: 5px;
}
thead th:nth-child(1){
    border-right:1px solid black !important;
}
tbody td:nth-child(1){
    border-right:1px solid black !important;
}
}
.dark_mode{
  .md_node_note{
thead th{
    color: white !important;
    border-bottom: 1px solid white !important;
}
tbody td{
    color: white !important;
    border-top: 1px solid white !important;
}
thead th:nth-child(1){
    border-right:1px solid white !important;
}
tbody td:nth-child(1){
    border-right:1px solid white !important;
}
}
}
</style>
