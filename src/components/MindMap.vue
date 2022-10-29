<template>
  <div id="app_" :class="'main'+(darkmode?' dark_mode':'') + (read_mode?' read_mode':'')">
    <div id="main" :class="position_mode?'position_mode':''">
      <el-container v-loading="loading">
        <div :class="'config_board tool_board ' + (tool_bar_show?'':'collapse')">
          <div class="btn plain menu" @click="tool_bar_show=!tool_bar_show"><i :class="(tool_bar_show?'el-icon-close':'el-icon-menu')"/></div>
        <!-- <el-header> -->
          <div 
          :class="'header_item '+(item.enable?'enable':'disable')" 
          :style="'width:'+item.width+'px;'+item.style" 
          v-for="item in tool_bar_list" :key="item.name"
          v-show="item.show"
          >
            <div class="header_btn" v-on:click="(item.enable&&item.type!='btn'&&item.click())">
              <i :class="item.icon" v-text="item.title"/> 
              <el-switch v-if="item.type=='btn'"
                v-model="item.enable"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="item.click()">
              </el-switch>
            </div>
            <div class="header_name">{{item.name}}</div>
          </div>
        <!-- </el-header> -->
        </div>
        <el-main style="height:100vh;width:100vw;border-radius:0px;padding:0px;" id="antv_container"></el-main>
        <!-- <div id="antv_minimap"></div> -->
        <div class="big_board" v-show="pushed_pic_config.show" >
          <div class="behind_" @click="pushed_pic_config.show=false"></div>
          <el-card class="edit_board" v-loading="pushed_pic_config.loading">
              <img id="pushed_image" :src="pushed_pic_config.base64||pushed_pic_config.url" style="width:100%;"/>  
                <p v-show="pushed_pic_config.base64=='' && pushed_pic_config.url==''  && !pushed_pic_config.pushed" style="text-align:center;">NO IMAGE!</p>   
                <!-- <el-input placeholder="照片名称" v-model="pushed_pic_config.name" v-show="!pushed_pic_config.pushed && pushed_pic_config.url.length==0">
                    <el-button slot="append" icon="el-icon-upload" v-on:click="push_a_pic"></el-button>
                </el-input> -->
                <el-input placeholder="Image url" v-model="pushed_pic_config.url" style="margin-top:10px;"></el-input>
                <el-input placeholder="Image url" v-model="pushed_pic_config.name" style="margin-top:10px;"></el-input>
                <div class="btn green" v-if="pushed_pic_config.url.length>0&&pushed_pic_config.name.length>0" v-on:click="__upload_pic_to_gitee_file">Upload the image</div>
                <div class="btn green" v-if="pushed_pic_config.url.length>0" v-on:click="__tool_add_pic_2">Add to canvas</div>
          </el-card>
        </div>
        <div class="big_board" v-show="secretKey_show" >
          <div class="behind_" @click="secretKey_show=false"></div>
          <el-card class="edit_board secretKeysboard" >
              <div class="line" >
                {{file_name+'.'+file_type}}: <el-input :value="secretKeys[file_name+'.'+file_type]"></el-input>
              </div>
              <div class="btn red" v-on:click="__tool_remove_secret_key" v-if="(file_name+'.'+file_type in secretKeys)">Omit</div>
                <div class="btn green" v-on:click="__tool_add_secret_key" v-else>Add</div>
                
          </el-card>
        </div>

        <div class="first_load_cover" v-if="first_load">
          <div class="first_load_board">
            <div v-if="read_mode">
              {{cover_msg}}
            </div>
            <div v-else>
              Operations:
              <div class="btn green iconfont icon-new" v-on:click="__init_a_blank_project"> Create</div>
              <div class="btn green iconfont icon-storage" v-on:click="__init_an_online_project" v-if="gitee_enable"> Open</div>
            </div>
          </div>
        </div>
        <div class="config_board node_config_board" v-if="!read_mode&&node_config.show">
          <div class="board_title">
            <el-row style="margin-top:0px;">
            <el-col :span="18">
              Node Config
            </el-col>
            <el-col :span="6">
              <!-- 🔗
              <el-switch
              v-model="node_config.can_link"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="__change_node_can_link">
            </el-switch> -->
            </el-col>
          </el-row>
            <div class="btn green" v-if="markdown_mode" @click="markdown_mode=false;" style="height:10px;width:10px;line-height:10px;border-radius:20px;position:absolute;top:0px;right:10px;font-size:14px;">X</div>
          </div>
          <el-card>
            <div slot="header" class="clearfix">
              <span>Title</span>
            </div>
            <el-input v-model="node_config.title" @change="__change_node_title" placeholder="input the title"></el-input>
          </el-card>
          <el-card>
            <div slot="header" class="clearfix">
              <span>Content <el-button style="background:transparent;border:0px;" plain icon="el-icon-edit" @click="markdown_mode=true"></el-button></span>
            </div>
            <el-input
              type="textarea"
              :class="(markdown_mode?'markdown_mode':'')"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="Input the content"
              v-model="node_config.note"
              @change="__change_node_note">
            </el-input>
          </el-card>
          <el-card>
            <div slot="header" class="clearfix">
              Style
            </div>
            <el-select v-model="node_config.style" @change="__change_node_style" placeholder="choose one">
              <el-option
                v-for="item in node_styles"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-card>
          <el-row class="line" v-if="node_config.style=='fold'">
            <el-col :span="18">Folding</el-col>
            <el-col :span="6"><el-switch
              v-model="node_config.fold"
              v-on:change="__change_node_fold" 
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch></el-col>
          </el-row>

          <el-card v-if="node_config.style=='pin'">
            <div slot="header" class="clearfix">
              <span>Pinner</span>
            </div>
            <el-input v-model="node_config.pin" @change="__change_node_pin" placeholder="input the character"></el-input>
          </el-card>

          <el-row class="line">
            <el-col :span="18">Scale</el-col>
            <el-col :span="6">
              <el-button-group>
                <el-button  icon="el-icon-plus" @click="__increase_node_scale"></el-button>
                <el-button icon="el-icon-minus" @click="__decrease_node_scale"></el-button>
              </el-button-group>
            </el-col>
          </el-row>
          <div v-if="selected_node.store.data.idx!=0" class="btn" v-on:click="__del_node">Delete</div>
            
        </div>
        <div id="node_note" :class="'md_node_note'+(markdown_mode?' markdown_mode':'')"  v-if="node_config.show&&node_config.note!=''">
        <div :class="'btn green '+(node_note_raw_text?'el-icon-tickets':'el-icon-notebook-2')" style="width:20px;border-radius:20px;height:10px;width:10px;font-size:10px; line-height:10px;"  @click="node_note_raw_text=!node_note_raw_text"></div>
        <textarea style="width: 30vw;border: 0px;height: 50vh;border-radius: 5px;padding: 5px;" v-if="node_note_raw_text" :value="node_config.note"></textarea>
        <div v-else v-html="markdown.render(node_config.note)"></div>
        
        </div>
        
        <img id="pushed_image"  class="preview_pic_note"  v-if="image_config.show&&image_config.url!=''" v-on:click="image_config.fullscreen=true" style="cursor: zoom-in;" :src="imageProxy + image_config.url"/>
        
        <div class="config_board edge_config_board" v-if="!read_mode&&edge_config.show">
          <div class="board_title">{{edge_config.title}}</div>
          <el-card>
            <div slot="header" class="clearfix">
              <span>Title</span>
            </div>
            <el-input v-model="edge_config.label" @change="__change_edge_label" placeholder="input the label"></el-input>
          </el-card>
          <div class="btn" v-on:click="__del_edge">Delete</div>
        </div>
        <div class="config_board group_config_board" v-if="!read_mode&&group_config.show">
          <div class="board_title">Edit</div>
          <el-card style="margin-top:10px;">
            <div slot="header" class="clearfix">
              Style
            </div>
            <el-select v-model="group_config.style" @change="__change_group_style" placeholder="choose one">
              <el-option
                v-for="item in group_styles"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-card>
          <div class="btn" v-on:click="__del_group">Delete</div>
        </div>
        <div class="config_board chart_config_board" v-if="!read_mode&&chart_config.show">
          <div class="board_title">Edit</div>
          <el-card style="margin-top:10px;">
            <div slot="header" class="clearfix">
              Style
            </div>
            <!-- <el-radio-group v-model="node_config.style" size="mini" :change="__change_node_style">
              <el-radio-button v-for="style in node_styles" :key="style" :label="style"></el-radio-button>
            </el-radio-group> -->
            <el-select v-model="chart_config.style" placeholder="请选择">
              <el-option
                v-for="item in chart_styles"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-card>
          <el-card style="margin-top:10px;">
            <div slot="header" class="clearfix">
              Data
            </div>
            <el-input v-model="chart_config.title"  placeholder="input the title" style="margin-bottom:10px;">
              <template slot="prepend">Title</template>
            </el-input>
            <el-input v-model="chart_config.x_axis"  placeholder="input the X-axis data (name:x1,x2,...,xn)" style="margin-bottom:10px;">
              <template slot="prepend">X Axis</template>
            </el-input>
            <el-input v-model="chart_config.y_axis"  placeholder="input the Y-axis name" style="margin-bottom:10px;">
              <template slot="prepend">Y Axis</template>
            </el-input>
            <el-input v-model="chart_config.data" placeholder="input data (d1,d2,...,dn)">
              <template slot="prepend">Data</template>
            </el-input>
          </el-card>
          <div class="btn green" v-on:click="__update_chart">Update Chart</div>
          <div class="btn" v-on:click="__del_chart">Delete</div>
        </div>
        <div class="config_board image_config_board" v-if="!read_mode&&image_config.show">
          <div class="board_title">{{image_config.title}}</div>
          <el-card>
            <div slot="header" class="clearfix">
              <span>Image Url</span>
            </div>
            <el-input v-model="image_config.url" @change="__change_image_url" placeholder="input the url"></el-input>
          </el-card>
          <div class="btn" v-on:click="__del_image">Delete</div>
        </div>
        <div class="config_board html_config_board" v-if="!read_mode&&html_config.show">
          <div class="board_title">{{html_config.title}}</div>
          <el-card>
            <div slot="header" class="clearfix">
              <span>Link Url</span>
            </div>
            <el-input v-model="html_config.url" @change="__change_html_url" placeholder="input the url"></el-input>
          </el-card>
          <div class="btn" v-on:click="__del_html">Delete</div>
        </div>
        <div class="config_board anchor_config_board" v-if="!read_mode&&anchor_config.show">
          <div class="board_title">{{anchor_config.title}}</div>
          <el-card>
            <el-select v-model="anchor_config.position" @change="__change_anchor" placeholder="choose one">
              <el-option
                v-for="item in positions"
                :key="item.name"
                :label="item.name"
                :value="item">
              </el-option>
            </el-select>
          </el-card>
          <div class="btn green" v-on:click="to_position(anchor_config.position)">Jump to {{anchor_config.position.name}}</div>
          <div class="btn" v-on:click="__del_anchor">Delete</div>
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
            <div class="btn red" style="width:calc(100% - 30px)" v-show="group.list.length<=0" v-on:click="__delete_file_group(idx)">Delete Group</div>
            <draggable
              class="list-group"
              :list="group.list"
              group="files"
            >
              <div class="file_item list-group-item" v-for="item in group.list" :key="item.path">
                <div  style="width:100%;float:right;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"  v-on:click="__load_gitee_file(item.path,item.sha);" :class="(item.path in secretKeys)?'encrypted':'open'">
                  <i class="el-icon-document"/>{{item.path.split("."+file_type)[0]}}
                </div>
              </div>
            </draggable>
          </div>
        </div>
        <div v-if="image_config.fullscreen" class="fullscreen_image" v-on:click="image_config.fullscreen=false" :style="{backgroundImage:'url('+imageProxy + image_config.url+')'}">
        </div>
      </el-container>
    </div>
    <div id="center" :class="position_mode?'position_mode':''" @click="position_mode=false;"></div>
    <div id="right"  :class="position_mode?'position_mode':''">
    <div class="btn green" style="height:40px;line-height:40px;padding:0px;width:calc(100% - 40px);overflow:hidden;" v-for="position in positions" :key="position.name">
      <div style="width:calc(100% - 40px);background:transparent" @click="to_position(position)" :title="position.name">{{position.name}}</div>
      <i v-if="!read_mode" class="el-icon-close close-btn" style="width:40px;line-height:40px;" @click="delte_position(position)"></i>
    </div>
    <span v-if="positions.length==0" style="position:absolute;top:20px;left:0px;width:100%;">No Locations</span>

    </div>
    <div v-if="!read_mode" id="bottom" :class="position_mode?'position_mode':''">
      <div class="btn blue" style="width:120px" @click="add_position"><i class="el-icon-add-location"></i> Add position</div>
    </div>
  </div>
</template>

<script>
import { Graph} from '@antv/x6';
import draggable from "vuedraggable";
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const CryptoJS = require("crypto-js");

import node_option from '../node_option';
import chart_option from '../chart_option';
import { getToken, GiteeAPI, removeToken} from "../api";
import "../assets/iconfont/iconfont.css"

// import markdownIt from 'markdown-it'
import markdownItLatex from 'markdown-it-latex'
// import markdownItMermaid from 'markdown-it-mermaid'
import 'markdown-it-latex/dist/index.css';
const md = require('markdown-it')({
  html:true,
})
  .use(require('markdown-it-highlightjs'),{ inline: true })
  .use(markdownItLatex)
  // .use(markdownItMermaid)

// import mermaid from 'mermaid';


const Echarts = require('echarts/lib/echarts');
require('echarts/lib/component/grid');
require('echarts/lib/chart/line');
require('echarts/lib/component/toolbox');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');

function refresh_chart(id, data){
  let dom = document.getElementById(id+"box").getElementsByClassName('title')[0]
  dom.innerHTML = md.render(data.title);
  let d = chart_option[data.style]
  try{
    d['xAxis']['name'] = data.x_axis.split(":")[0]
  }catch(e){
    d['xAxis']['name'] = "x"
  }
  d['xAxis']['data'] = data.x_axis.split(":")[1].split(",")
  d['yAxis']['name'] = data.y_axis
  try{
  d['series'][0]['data'] = data.data.split(",")
  }catch(e){
      return;
  }
  let c = Echarts.init(document.getElementById(id+"chart"))
  c.setOption(d)
  c.resize()
}

const default_edge = {
    inherit: 'edge',
    attrs: {
      line: {
        stroke: '#333',
        strokeWidth: 2,
        sourceMarker: {
          tagName: 'path',
          strokeWidth: 2,
          d: 'M 0 -10 L 0 10 Z',
        },
        targetMarker: {
          name: 'classic',
          width: 12,
          height: 8,
        },
      },
    },
    zIndex: 1000,
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
          fontSize: 12,
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
  }

const ports={
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#C2C8D5',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#C2C8D5',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      },
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#C2C8D5',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      },
      right: {
        position: 'right',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#C2C8D5',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      },
    },
    items:[
        {
            group: 'top',
        },
        {
            group: 'bottom',
        },
        {
            group: 'left',
        },
        {
            group: 'right',
        },
    ]
}

Graph.registerEdge('edge',default_edge,true);

const imageProxy = "" //baseURL + "/api/pic_file?url=" 

// register html component
Graph.registerHTMLComponent('first', (node) => {
  let d = node.getData()
  const wrap = document.createElement('div')
  wrap.innerHTML = "<div class='inner_text' id='"+(d['id']+"box")+"'><div class='title'>"+md.render(d['title'])+"</div></div>"
  wrap.className = "node first "+ d['style'] 
  return wrap
})
Graph.registerHTMLComponent('second', (node) => {
  let d = node.getData()
  const wrap = document.createElement('div')
  wrap.innerHTML = "<div class='inner_text'  id='"+(d['id']+"box")+"'><div class='title'>"+md.render(d['title'])+"</div></div>"
  wrap.className = "node second "+ d['style'] 
  wrap.id = d['id']
  return wrap
})
Graph.registerHTMLComponent('note', (node) => {
  let d = node.getData()
  const wrap = document.createElement('div')
  wrap.innerHTML = "<div class='inner_text'  id='"+(d['id']+"box")+"'><div class='pinner'>"+d['pin']+"</div><div class='pinner'>"+d['pin']+"</div><div class='title'>"+md.render(d['title'])+"</div><div class='content'>"+md.render(d['note'])+"</div></div>"
  wrap.className = "node note "+ d['style'] + (d['fold']?' folding':' non-folding') + (d['scale']?' '+d['scale']:'')
  wrap.id = d['id']
  return wrap
})
Graph.registerHTMLComponent('others', (node) => {
  let d = node.getData()
  const wrap = document.createElement('div')
  wrap.innerHTML = "<div class='inner_text'  id='"+(d['id']+"box")+"'><div class='title'>"+md.render(d['title'])+"</div></div>"
  wrap.className = "node others "+ d['style'] 
  wrap.id = d['id']
  return wrap
})
Graph.registerHTMLComponent('group', (node) => {
  let d = node.getData()
  const wrap = document.createElement('div')
  wrap.innerHTML = "<div class='inner_text'  id='"+(d['id']+"box")+"'></div>"
  wrap.className = "node group "+ d['style']
  wrap.id = d['id']
  return wrap
})
Graph.registerHTMLComponent('chart', (node) => {
  let d = node.getData()
  const wrap = document.createElement('div')
  wrap.innerHTML = "<div class='inner_text'  id='"+(d['id']+"box")+"'><div class='title'>"+d['title']+"</div><div class='chart_container' id='"+(d['id']+"chart")+"'></div></div>"
  wrap.className = "node chart "+ d['style']
  wrap.id = d['id']
  setTimeout(()=>{refresh_chart(d['id'], d)},1000)
  return wrap
})
Graph.registerHTMLComponent('image', (node) => {
  let d = node.getData()
  const wrap = document.createElement('img')
  wrap.className = "node image "+ d['style']
  wrap.src = imageProxy + d['src']
  wrap.id = d['id']
  return wrap
})

Graph.registerHTMLComponent('html', (node) => {
  let d = node.getData()
  const wrap = document.createElement('div')
  wrap.innerHTML = "<div class='inner_text'  id='"+(d['id']+"box")+"'><iframe class='frame' src='"+d['src']+"'></iframe></div>"
  wrap.className = "node html"
  wrap.id = d['id']
  return wrap
})

Graph.registerHTMLComponent('anchor', (node) => {
  let d = node.getData()
  const wrap = document.createElement('div')
  wrap.innerHTML = "<div class='inner_text'  id='"+(d['id']+"box")+"'><div class='position'>Go</div><div class='name'>"+(d['position'].name)+"</div></div>"
  wrap.className = "node anchor"
  wrap.id = d['id']
  return wrap
})

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
      cover_msg:"Loading...",
      markdown:md,
      secretKeys:{},
      secretKey_show:false,
      node_note_raw_text:false,
      darkmode:systemDark,
      loading:false,
      first_load:true,
      gitee_enable:false,
      file_name:"untitled",
      file_sha:"null",
      file_type:"mb",
      imageProxy: imageProxy,
      graph:null,
      online_file:false,
      selected_node:null,
      selected_edge:null,
      predefineColors:["#eeeeee","#ffffff","#000000","#b39ddb","#f44336","#009688","#0d47a1"],
      request_lock:false,
      zoom:0,
      chart_styles:['line'],
      node_styles:['fold','plain','pin','transparent','pure-green','pure-blue','pure-yellow','pure-red', 'sticky', 'emergency', 'inside', 'light','border-flash','placeholder'],
      group_styles:['plain','pure-green','pure-blue','pure-yellow','pure-red','inside', 'emergency'],
      tool_bar_show:false,
      tool_bar_list:[
        {
          name:"Xiaohao Liu",
          width:150,
          style:"",
          enable:true,
          show:true,
          icon:"mindbox-logo",
          title:"MindBox",
          click:()=>{this.index()},
        },
        {
          name:"name",
          width:200,
          style:"",
          enable:true,
          show:true,
          icon:"",
          title:"null",
          click:()=>{this.__file_share_link()},
        },
        {
          name:"group",
          width:66,
          style:"",
          enable:false,
          show:true,
          icon:"iconfont icon-border",
          title:"",
          click:()=>{this.__tool_add_group()},
        },
        {
          name:"note",
          width:66,
          style:"",
          enable:true,
          show:true,
          icon:"iconfont icon-note",
          title:"",
          click:()=>{this.__tool_add_note()},
        },
        {
          name:"chart",
          width:66,
          style:"",
          enable:true,
          show:true,
          icon:"el-icon-pie-chart",
          title:"",
          click:()=>{this.__tool_add_chart()},
        },
        {
          name:"html",
          width:66,
          style:"",
          enable:true,
          show:true,
          icon:"el-icon-news",
          title:"",
          click:()=>{this.__tool_add_html()},
        },
        {
          name:"image",
          width:66,
          style:"",
          enable:true,
          show:true,
          icon:"iconfont icon-pic",
          title:"",
          click:()=>{this.__tool_add_pic()},
        },
        {
          name:"upload",
          width:50,
          style:"",
          enable:true,
          show:true,
          icon:"iconfont icon-upload",
          title:"",
          click:()=>{this.__upload_to_gitee()},
        },
        {
          name:"anchor",
          width:66,
          style:"",
          enable:true,
          show:true,
          icon:"el-icon-news",
          title:"",
          click:()=>{this.__tool_add_anchor()}, // 8
        },
        {
          name:"undo",
          width:66,
          style:"",
          enable:false,
          show:true,
          icon:"iconfont icon-redo",
          title:"",
          click:()=>{this.graph.undo()},
        },
        {
          name:"redo",
          width:66,
          style:"",
          enable:false,
          show:true,
          icon:"iconfont icon-undo",
          title:"",
          click:()=>{this.graph.redo()},
        },
        {
          name:"child",
          width:66,
          style:"",
          enable:false,
          show:true,
          icon:"iconfont icon-create_child_node",
          title:"",
          click:()=>{this.__tool_add_child()},
        },
        {
          name:"sibling",
          width:66,
          style:"",
          enable:false,
          show:true,
          icon:"iconfont icon-create_sibling_node",
          title:"",
          click:()=>{this.__tool_add_sibling()},
        },
        {
          name:"zoom up",
          width:66,
          style:"",
          enable:true,
          show:true,
          icon:"iconfont icon-zoomin",
          title:"",
          click:()=>{this.graph.zoomTo(this.graph.zoom()*1.2)},
        },
        {
          name:"reset zoom",
          width:66,
          style:"",
          enable:true,
          show:true,
          icon:"iconfont icon-zoom",
          title:"",
          click:()=>{this.graph.zoomTo(1);},
        },
        {
          name:"zoom down",
          width:66,
          style:"",
          enable:true,
          show:true,
          icon:"iconfont icon-zoomout",
          title:"",
          click:()=>{this.graph.zoomTo(this.graph.zoom()*0.8);},
        },
        {
          name:"dark mode",
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
          name:"position",
          width:50,
          style:"",
          enable:true,
          show:true,
          icon:"el-icon-place",
          title:"",
          click:()=>{this.position_mode = true;}, // 17
        },
        {
          name:"logout",
          width:100,
          style:"",
          enable:true,
          show:true,
          icon:"el-icon-coffee-cup",
          title:"",
          click:()=>{removeToken();this.$router.push("/login")},
        },
        {
          name:"secretKey",
          width:100,
          style:"",
          enable:true,
          show:true,
          icon:"el-icon-key",
          title:"",
          click:()=>{this.secretKey_show=!this.secretKey_show},
        },
      ],
      tool_map:{
        "file":1,
        "undo":9,
        "redo":10,
        "child":11,
        "sibling":12,
        "group":2,
        "darkmode":16,
      },
      read_mode_bar:new Set([0,1,9,10,13,14,15,16,17]),
      pushed_pic_config:{
        loading:false,
        show:false,
        name:"",
        base64:"",
        pushed:false,
        raw:"",
        url:"",
      },
      node_config:{
        show:false,
        title:'Node Config',
        label:"",
        note:"",
        fill:"",
        fold:"",
        scale:"",
        stroke:"",
        style:"",
        text_color:"",
        pin:"",
        can_link:false,
      },
      edge_config:{
        show:false,
        title:'Edge Config',
        label:"",
        stroke:""
      },
      group_config:{
        show:false,
        title:'Group Config',
        label:"",
        stroke:""
      },
      chart_config:{
        show:false,
        title:'Chart Config',
        label:"",
        style:"",
        data:"",
        x_axis:"",
        y_axis:"",
      },
      image_config:{
        show:false,
        title:'Image Config',
        url:"",
        fullscreen:false,
      },
      html_config:{
        show:false,
        title:'Html Config',
        url:"",
      },
      anchor_config:{
        show:false,
        title:'Anchor Config',
        position:null
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
    
    this.server_mode = true;
    this.gitee_info = getToken();
    this.gitee_enable = this.gitee_info.enable;
    console.log(this.gitee_info);

    this.__init_read_mode();
    this.load_secretKeys()

    this.__init_graph();
    
    this.__add_events();
    this.__add_keyboard_events();
    if(this.read_mode){this.__load_online_file()}
    
  },
  methods:{ 
    load_secretKeys:function(){
      if(this.read_mode) return
      this.gAPI.get_file_by_path('mindbox.secretKeys').then(res=>{
        let data = this.__decode(res.data.content);
        if(data == "{}"){
          this.secretKeys = {}
        }else{
          this.secretKeys = JSON.parse(this.__decrypt(data, this.gitee_info.token));
          console.log(this.secretKeys)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    upload_secretKeys:async function(){
      return this.__upload_gitee_file("mindbox.secretKeys", this.__encode(this.__encrypt(JSON.stringify(this.secretKeys), this.gitee_info.token)));
    },
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
      try{
        const location_parames = {}
        window.location.hash.split("?")[1].split("&").forEach(ele=>{
          let i = ele.split("=");
          location_parames[i[0]] = i[1]
        })
        let gitee_info={
          enable:true,
          username:location_parames['u'],
          repos: location_parames['r'],
          token:"",
        }
        console.log(gitee_info)
        this.file_sha = location_parames['s']
        this.file_name = location_parames['n'].split(".mb")[0]
        if(location_parames['k']!="undefined") this.secretKeys[location_parames['n']] = location_parames['k']
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
      const name = this.file_name+"."+this.file_type;
      this.gAPI.get_file_by_sha(this.file_sha).then(res=>{
        let decrypteddata = this.__decode(res.data.content)
        if(name in this.secretKeys) this.jsondata = this.__decrypt(decrypteddata,this.secretKeys[name])
        else this.jsondata = decrypteddata
        this.jsondata = JSON.parse(this.jsondata)

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
        scroller: {
          enabled: false,
        },
        minimap: {
          enabled: false,
          width: 140,
          height: 100,
          container: document.getElementById('antv_minimap'),
        },
        translating: {
          restrict: true,
        },
        grid: {
          size: 10,      // 网格大小 10px
          visible: true, // 渲染网格背景
        },
        resizing: {
          enabled: this.read_mode?false:true,
        },
        embedding: {
          enabled: true,
          findParent({ node }) {
            const bbox = node.getBBox()
            return this.getNodes().filter((node) => {
              const data = node.getData()
              if (data && data.type=="group") {
                const targetBBox = node.getBBox()
                return bbox.isIntersectWithRect(targetBBox)
              }
              return false
            })
          },
        },
        highlighting: {
          embedding: {
            name: 'stroke',
            args: {
              padding: -1,
              attrs: {
                stroke: '#73d13d',
              },
            },
          },
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
          allowPort: this.read_mode?false:true,
          highlight: true,
          snap:true,
          snapline: true,
          router: {
            name: 'manhattan',
            args: {
              padding:20
            },
          },
          connector: {
            name: 'rounded',
            args: {
              radius: 8,
            },
          },
          createEdge:() =>{
            return this.graph.createEdge(default_edge)
          },
          // anchor: 'center',
          connectionPoint: 'anchor',
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
    generate_id:function(node_type){
      return node_type + String(new Date().getTime())
    },
    __init_a_blank_project:function(){
      this.graph.fromJSON({})
      let s_d ={};
      for(let k in node_option['first'])this.$set(s_d,k,node_option['first'][k])
      this.$set(s_d["data"],"id", this.generate_id('first'))
      this.graph.addNode(s_d)
      this.graph.centerContent();
      this.tool_bar_list[this.tool_map['file']].title=this.file_name;
      this.file_name = "untitled";
      this.tool_bar_list[this.tool_map['file']].title=this.file_name;
      this.first_load=false;
      this.online_file=false;
      document.getElementsByTagName('title')[0].innerText = "new file";
    },
    __enable:function(name){
      this.tool_bar_list[this.tool_map[name]].enable=true;
    },
    __disable:function(name){
      this.tool_bar_list[this.tool_map[name]].enable=false;
    },
    __update_chart:function(){
      this.selected_node.updateData({
        title:this.chart_config.title,
        data:this.chart_config.data,
        style:this.chart_config.style,
        x_axis:this.chart_config.x_axis,
        y_axis:this.chart_config.y_axis
        });
        let id = this.selected_node.getData()['id']
        refresh_chart(id, this.chart_config)
    },
    __change_node_title:function(){
      this.selected_node.updateData({title:this.node_config.title});
      let dom = document.getElementById(this.selected_node.getData()['id']+"box").getElementsByClassName('title')[0]
      dom.innerHTML = this.markdown.render(this.node_config.title);
      let w = document.getElementById(this.selected_node.getData()['id']).offsetWidth + 20
      let size = this.selected_node.getProp("size")
      this.selected_node.setProp("size",{width:w,height:size.height})
    },
    __change_node_can_link:function(){
      let dom = document.getElementById(this.selected_node.getData()['id']+"box")
      this.selected_node && dom.setAttribute('magnet', this.node_config.can_link)
    },
    __change_node_note:function(){
      this.selected_node.updateData({note:this.node_config.note})
      if(this.selected_node.getData()['type']=="note"){
          let dom = document.getElementById(this.selected_node.getData()['id']+"box").getElementsByClassName('content')[0]
          dom.innerHTML = this.markdown.render(this.node_config.note)
      }
    },
    __change_node_style:function(){
      // this.selected_node.updateData({style:this.node_config.style})
      let dom = document.getElementById(this.selected_node.getData()['id'])
      // let classes = dom.className.split(' ')
      dom.className = dom.className.replace(this.selected_node.getData()['style'], this.node_config.style)
      // dom.className = [classes[0],classes[1], this.node_config.style].join(" ")
      this.selected_node.updateData({style:this.node_config.style})
      if(this.node_config.style== "pin" && !('pin' in this.selected_node.getData())){
        this.selected_node.setData({pin:"📌"})
        this.node_config.pin = "📌"
        this.__change_node_pin()
      }
    },
    __change_node_pin:function(){
      this.selected_node.updateData({pin:this.node_config.pin})
      let doms = document.getElementById(this.selected_node.getData()['id']).getElementsByClassName('pinner')
      doms[0].innerHTML = this.node_config.pin.substring(0)
      doms[1].innerHTML = this.node_config.pin.substring(0)
    },
    __change_node_fold:function(){
      this.selected_node.updateData({fold:this.node_config.fold })
      let dom = document.getElementById(this.selected_node.getData()['id'])
      if(this.node_config.fold){
        dom.className = dom.className.replace('non-folding','folding')
      }else{
        dom.className = dom.className.replace('folding','non-folding')
      }
    },
    __increase_node_scale:function(){
      if(this.node_config.scale=="min"){
        this.node_config.scale="mid"
        this.___change_node_scale('min')
      }else if(this.node_config.scale=="mid"){
        this.node_config.scale="max"
        this.___change_node_scale('mid')
      }
    },
    __decrease_node_scale:function(){
      if(this.node_config.scale=="mid"){
        this.node_config.scale="min"
        this.___change_node_scale('mid')
      }else if(this.node_config.scale=="max"){
        this.node_config.scale="mid"
        this.___change_node_scale('max')
      }
    },
    ___change_node_scale:function(scale){
      let dom = document.getElementById(this.selected_node.getData()['id'])
      if(dom.className.indexOf(scale)>-1){
        dom.className = dom.className.replace(scale,this.node_config.scale)
      }
      else{
        dom.className = dom.className + ' ' + this.node_config.scale;
      }
      this.selected_node.updateData({scale:this.node_config.scale })
    },
    __change_group_style:function(){
      this.selected_node.updateData({style:this.group_config.style})
      let dom = document.getElementById(this.selected_node.getData()['id'])
      let classes = dom.className.split(' ')
      dom.className = [classes[0],classes[1], this.group_config.style].join(" ")
    },
    __change_edge_label:function(){
      if(this.edge_config.label==''){
        this.selected_edge.setLabels({attrs:{text:{text:''}}})
      }else{
        this.selected_edge.setLabels({attrs:{text:{text:' '+this.edge_config.label+' '}}})
      }
    },
    __change_image_url:function(){
      this.selected_node.attr({image:{"xlink:href": imageProxy + this.image_config.url}})
    },
    __change_html_url:function(){
      this.selected_node.updateData({src:this.html_config.url})
      let dom = document.getElementById(this.selected_node.getData()['id'])
      let frame = dom.getElementsByClassName('frame')[0]
      frame.src = this.html_config.url
    },
    __change_anchor:function(){
      this.selected_node.updateData({position:this.anchor_config.position})
      let dom = document.getElementById(this.selected_node.getData()['id'])
      dom.getElementsByClassName('name')[0].innerHTML = this.anchor_config.position.name
    },
    __add_events:function(){
      this.graph.on('node:selected', ( args) => { 
          const cells = this.graph.getSelectedCells();
          this.selected_node = args.node
          let node_data = this.selected_node.getData()
          if(cells.length >1){
            // group
            this.__enable("group");
            this.__disable("child")
            this.__disable("sibling")
            this.group_config.show=false;
            this.node_config.show=false;
            this.edge_config.show=false;
            this.chart_config.show=false;
            this.image_config.show = false;
            this.anchor_config.show = false;
            this.html_config.show = false;
            return false;
          }
          if(node_data.type=="image"){
            this.image_config.show = true;
            this.image_config.url = node_data.src;
            return false;
          }
          if(node_data.type=="html"){
            this.html_config.show = true;
            this.html_config.url = node_data.src;
            return false;
          }
          if(node_data.type=="anchor"){
            this.anchor_config.show = true;
            this.anchor_config.position = node_data.position;
            return false;
          }
          if(node_data.type =="group"){
            this.group_config.show=true;
            this.group_config.style = node_data.style
            
            return false;
          }
          if(node_data.type =="chart"){
            this.chart_config.show=true;
            this.chart_config.style = node_data.style
            this.chart_config.data = node_data.data
            this.chart_config.title = node_data.title
            this.chart_config.x_axis = node_data.x_axis
            this.chart_config.y_axis = node_data.y_axis
            return false;
          }
          // console.log(node_data)
          for(let k in node_data){
            this.node_config[k] = node_data[k]
          }
          // this.node_config = node_data
          if(document.getElementById(node_data['id']+'box').getAttribute('magnet')=="true")this.node_config.can_link = true 
          else this.node_config.can_link = false
          if(!("fold" in node_data)) {
            this.node_config.fold = false;
            this.selected_node.setData({fold:false})
          }
          if(!("scale" in node_data)) {
            this.node_config.scale = 'mid';
            this.selected_node.setData({scale:'mid'})
          }
          // console.log(node_data)
          
          this.node_config.show=true;
          this.edge_config.show=false;
          this.group_config.show=false;
          this.chart_config.show=false;
          this.image_config.show = false;
          this.html_config.show = false;
          this.anchor_config.show = false;
          this.__disable("group");
          this.__enable("child")
          this.node_config.note = this.selected_node.store.data.data.note;
          if(this.selected_node.store.data.idx!=0){
            this.__enable("sibling")
          }
      })
      this.graph.on('node:dblclick', (args)=>{
        let node_data =  args.node.getData()
        if(node_data.type=="anchor"){
          this.to_position(node_data.position)
          this.anchor_config.show = false;
        }
      })
      this.graph.on('node:unselected', ( ) => { 
          this.selected_node = null;
          this.node_config.show=false;
          this.group_config.show=false;
          this.chart_config.show=false;
          this.image_config.show = false;
          this.html_config.show = false;
          this.anchor_config.show = false;
          this.__disable("child")
          this.__disable("sibling")
          this.__disable("group");
      })
      this.graph.on('edge:click', ( args) => { 
          this.selected_edge = args.edge;
          console.log(this.selected_edge)
          this.edge_config.show=true;
          this.node_config.show=false;
          this.chart_config.show=false;
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
        // console.log(this.graph.getCell(parentid))
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
          this.chart_config.show=false;
          this.image_config.show = false;
          this.html_config.show = false;
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
      this.html_config.show = false;
      this.$notify({title: '提示',
          message:'删除成功'});
    },
    __del_group:function(){
      if(this.selected_node==null || this.selected_node.store.data.idx != 4)return;
      this.selected_node.getChildren().forEach(child=>{
        this.selected_node.unembed(child)
      })
      this.group_config.show = false;
      this.graph.removeNode(this.selected_node.id);
      this.$notify({title: '提示',
          message:'删除成功'});
    },
    __del_chart:function(){
      this.__del_node();
    },
    __del_edge:function(){
      this.graph.removeEdge(this.selected_edge.id);
      this.edge_config.show = false;
      this.$notify({title: '提示',
          message:'删除成功'});
    },
    __del_image:function(){
      this.__del_node();
    },
    __del_html:function(){
      this.__del_node();
    },
    __del_anchor:function(){
      this.__del_node();
    },
    __tool_add_secret_key:function(){
      let sKey = CryptoJS.MD5(this.file_name+this.file_type+this.gitee_info.token+ String(new Date().getTime())).toString()
      this.$set(this.secretKeys,this.file_name+'.'+this.file_type,sKey)
    },
    __tool_remove_secret_key:function(){
      let name = this.file_name+'.'+this.file_type
      if(name in this.secretKeys){
        this.$delete(this.secretKeys,name)
      }
    },
    __tool_add_note:function(){
      let d = {};
      for(let k in node_option['note'])this.$set(d,k, node_option['note'][k]);
      this.$set(d['data'],'id', this.generate_id('note'))
      let p = this.graph.pageToLocal(window.innerWidth/2,window.innerHeight/2);
      d.x = p.x;
      d.y = p.y;
      this.graph.addNode(d)
    },
    __tool_add_chart:function(){
      let d = {};
      for(let k in node_option['chart'])this.$set(d,k, node_option['chart'][k]);
      this.$set(d['data'],'id', this.generate_id('chart'))
      let p = this.graph.pageToLocal(window.innerWidth/2,window.innerHeight/2);
      d.x = p.x;
      d.y = p.y;
      this.graph.addNode(d)
    },
    __tool_add_html:function(){
      let d = {};
      for(let k in node_option['html'])this.$set(d,k, node_option['html'][k]);
      this.$set(d['data'],'id', this.generate_id('html'))
      let p = this.graph.pageToLocal(window.innerWidth/2,window.innerHeight/2);
      d.x = p.x;
      d.y = p.y;
      this.graph.addNode(d)
    },
    __tool_add_anchor:function(){
      let d = {};
      for(let k in node_option['anchor'])this.$set(d,k, node_option['anchor'][k]);
      this.$set(d['data'],'id', this.generate_id('anchor'))
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
      for(let k in node_option['image'])this.$set(d,k,node_option['image'][k]);
      this.$set(d['data'],'id', this.generate_id('image'))
      let p = this.graph.pageToLocal(window.innerWidth/2,window.innerHeight/2);
      d.x = p.x;
      d.y = p.y;
      d.width = document.getElementById("pushed_image").offsetWidth;
      d.height = document.getElementById("pushed_image").offsetHeight;
      this.$set(d['data'], 'src', this.pushed_pic_config.url);
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
          for(let k in node_option['second'])this.$set(s_d,k,node_option['second'][k])
          this.$set(s_d["data"],"id",this.generate_id('second'))
        }else {
          for(let k in node_option['others'])this.$set(s_d,k , node_option['others'][k])
          this.$set(s_d["data"],"id", this.generate_id('others'))
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
        this.$notify({title: '提示',
          message:'添加子主题成功'});
        // this.__tool_dagre_graph();
    },
    __tool_add_sibling:function(){
        if(this.selected_node==null)return;
        let idx = this.selected_node.store.data.idx;
        let s_d ={};
        if(idx==0)return;
        if(idx==1){
          for(let k in node_option['second'])this.$set(s_d, k, node_option['second'][k])
          this.$set(s_d["data"],"id", this.generate_id('second'))
        }else {
          for(let k in node_option['others'])this.$set(s_d,k,node_option['others'][k])
          this.$set(s_d["data"],"id", this.generate_id('others'))
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
        this.$notify({title: '提示',
          message:'添加主题成功'});
        // this.__tool_dagre_graph();
    },
    __tool_add_group:function(){
        const cells = this.graph.getSelectedCells();
        const parent_option = node_option["group"];
        this.$set(parent_option['data'],'id', this.generate_id('group'))
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
          this.$notify({
            type: 'success',
            message: '新建位置成功：' + value
          });
        }).catch(() => {
          this.$notify({
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
      // console.log(this.graph)
      // let pos_graph = this.graph.coord.localToGraphPoint(pos.x, pos.y)
      // console.log(pos_graph)
      this.graph.translate(pos.x, pos.y)
    },
    __file_share_link:function(){
      if(this.online_file){
        
        const file_link = "http://wykxldz.gitee.io/mindbox/#/read?u="+this.gitee_info.username+"&r="+this.gitee_info.repos+"&s="+this.file_sha+"&n="+this.file_name+"."+this.file_type +"&k="+this.secretKeys[this.file_name+"."+this.file_type]
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
            this.$notify({
              type: 'warning',
              message: '已存在该文件名'
            });
            return;
          }
          this.file_name=value;
          this.tool_bar_list[this.tool_map['file']].title=this.file_name;
          this.$notify({
            type: 'success',
            message: '修改成功'
          });
        }).catch(() => {
          this.$notify({
            type: 'info',
            message: '取消输入'
          });       
        });
      
    },
    __get_gitee_files:function(){
      console.log(this.gitee_info)
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
                name: "Files",
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
        console.log("open", name)
        let decrypteddata = this.__decode(res.data.content)
        if(name in this.secretKeys) this.jsondata = this.__decrypt(decrypteddata,this.secretKeys[name])
        else this.jsondata = decrypteddata
        this.jsondata = JSON.parse(this.jsondata)

        if('graph' in this.jsondata){
          this.grpahsource = this.jsondata['graph']
          this.positions = this.jsondata['positions']
        }
        else{this.grpahsource = this.jsondata}
        
        this.check_graph_source(this.grpahsource)
        console.log("data:",this.jsondata)
        this.graph.fromJSON(this.grpahsource)
        this.graph.centerContent();
        this.file_name = name.split(".mb")[0];
        this.file_sha = sha;
        this.tool_bar_list[this.tool_map['file']].title=this.file_name;
        this.loading=false;
        this.online_file=true;
        document.getElementsByTagName('title')[0].innerText = this.file_name;
      }).catch((err)=>{
        console.log(err)
        this.loading=false;
      })
      
    },
    check_graph_source:function(graphsource){
      graphsource.cells.forEach(cell=>{
        if(!('ports' in cell)){
          cell.ports = {...ports}
        }
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
      
      const name = this.file_name+'.'+this.file_type;
      this.loading=true;
      let sKey = null
      if(name in this.secretKeys){
        sKey = this.secretKeys[name]
        console.log(sKey)
        console.log(data)
        const content =  this.__encode(this.__encrypt(data, sKey))
        this.upload_secretKeys().then(()=>{
          setTimeout(()=>{
            this.__upload_gitee_file(name,content).then(()=>{
              this.loading=false;
            }).catch(()=>{
              this.loading=false;
            })
          },2000)
        }).catch(()=>{
          this.loading=false;
        })
      }
      else{
        // no encryption
        const content =  this.__encode(data)
        this.upload_secretKeys().then(()=>{
          setTimeout(()=>{
            this.__upload_gitee_file(name,content).then(()=>{
              this.loading=false;
            }).catch(()=>{
              this.loading=false;
            })
          },2000)
        }).catch(()=>{
          this.loading=false;
        })
      }
    },
    __upload_pic_to_gitee_file:async function(){ 
        let content = this.pushed_pic_config.base64.substring(22);
        let name = this.pushed_pic_config.name;
        return new Promise((resolve,reject)=>{
          if(this.gitee_info.username == "" || this.gitee_info.repos == "" || this.gitee_info.token == "" ){
              this.$notify({
                  title: ' 失败',
                  message: "Gitee 信息有误"
              });
              reject(false)
              return false;
          }
        this.pushed_pic_config.loading = true;
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
                this.pushed_pic_config.url = res.data.content.download_url;
                this.pushed_pic_config.loading = false;
                resolve(res.data)
              }).catch((err)=>{
                this.$notify({
                    title: ' 失败',
                    message: err.data.responseJSON.message
                });
                this.pushed_pic_config.loading = false;
                reject(err.data)
              })
            }
            else{
              this.$alert('是否替换图片'+name, '替换', {
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
                  this.pushed_pic_config.url = res.data.content.download_url;
                  this.pushed_pic_config.loading = false;
                  resolve(res.data)
                }).catch((err)=>{
                  this.$notify({
                    title: ' 失败',
                    message: err.data.responseJSON.message
                  });
                  this.pushed_pic_config.loading = false;
                  reject(err.data)
                })
              }).catch((err)=>{
                this.$notify({
                  title: '取消替换',
                  message: ''
                });
                this.pushed_pic_config.loading = false;
                reject(err.data)
              })
            }
          }).catch(()=>{
            this.$notify({
                title: ' 失败',
                message: '请求出错'
            });
            this.pushed_pic_config.loading = false;
          })
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
      this.file_config.groups.splice(idx,1);
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
          this.$notify({
            type: 'success',
            message: '新建群组: ' + value
          });
        }).catch(() => {
          this.$notify({
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
    __encrypt:function(msg, key){
      return CryptoJS.AES.encrypt(msg, key)
    },
    __decrypt:function(msg,key){
      let d = CryptoJS.AES.decrypt(msg, key)
      return d.toString(CryptoJS.enc.Utf8);
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
.mindbox-logo{
  background-color: #4353b6;
  height: 100%;
  width: 100%;
  background-size: contain;
  display: block;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
    top: 0;
    left: 0;
    color: white;
}
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
    transition:ease all 200ms;
  }
  #main.position_mode{
    transform: scale(0.75) translate(-12.5%, -12.5%);
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0,0,0,.1);
  }
  #center{
    height:90vh;
    width:80vw;
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
      width: 20vw;
      background: transparent;
      position: absolute;
      right: -20vw;
      top: 0px;
      z-index: 2;
      transition:ease all 200ms;
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
      transition:ease all 200ms;
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
    position: relative;
    height: 30px;
    width: calc(100% - 10px);
    background: rgba(255,255,255,0.5);
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
    i{font-style: normal;}
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
.big_board{
  width: 100vw;
  height: 100vh;
  top: 0px;
  position: absolute;
  text-align: center;
  .behind_{
    width: 100%;
    position: absolute;
    height: 100%;
    z-index: 0;
    backdrop-filter: saturate(180%) blur(5px)
  }
}
.config_board{
    height: calc(100% - 20px);
    width: 20%;
    min-width: 300px;
    position: fixed;
    right: 10px;
    top: 10px;
    border-radius: 10px;
    background: rgba(255,255,255,.2);
    box-shadow: 0px 0px 10px rgba(0,0,0,.2);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    backdrop-filter: saturate(180%) blur(20px);
    padding: 10px;
    box-sizing: border-box;
    overflow: auto;
    .line{
      height: 40px;
      width: 100%;
      margin-top: 10px;
      padding: 5px 10px;
      border-radius: 4px;
      text-align: left;
      line-height: 30px;
      font-weight: bold;
      font-size: 14px;
      border: 1px solid #EBEEF5;
      background-color: #FFF;
      color: #303133;
      transition: .3s;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      ::v-deep .el-button-group{
        .el-button{
          width: 28px;
          height: 28px;
          line-height: 20px;
          padding: 0px;
          margin: 0px;
          font-size: 10px;
        }
      }
    }
    ::v-deep .el-card{
      margin-top: 10px;
      .el-card__header{
        padding:5px;
        font-size: 14px;
        font-weight: bold;
        .el-button{
          padding: 0px 5px;
        }
      }
      .el-card__body{
        padding:5px;
        .el-select{
          width: 100%;
        }
      }
    }
}

.config_board.tool_board{
  z-index: 1;
  width: 855px;
  height: 130px;
  left:10px;
  transition: ease 0.2s;
  overflow: hidden;
  .menu{
    position: absolute;
    top:5px;
    right:15px;
    height: 30px;
    width: 30px;
    line-height: 30px;
    padding: 5px;
    border-radius: 20px;
    border: 1px solid #ddd;
    box-sizing: border-box;
  }
}
.config_board.tool_board.collapse{
  width: 785px;
  height: 70px;
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
.btn.plain{
  background: white;
  color:black;
}
.btn.plain:hover{
  box-shadow: 0 5px 20px -10px black;
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
    top:85px;
    width: calc(100% - 10px);
    height: calc(100% - 80px);
    background: rgba(255,255,255,.75);
    box-shadow: 0px 0px 10px rgba(0,0,0,.2);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    backdrop-filter: saturate(180%) blur(20px);
    padding: 10px;
    box-sizing: border-box;
    z-index: 2;
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
      box-shadow: 0px 5px 20px -3px rgba(0,0,0,0.2);
    }
    .group_item,
    .file_item{
      width: calc(25% - 15px);
        float:left;
          height: 50px;
          line-height: 50px;
          margin:5px;
          background: white;
          border-radius: 5px;
          border: 1px solid #ddd;
          text-align: left;
          text-indent: 10px;
          transition: ease .2s;
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
      width: calc(100% - 20px);
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
    z-index: 2;
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
.edit_board{
    width:400px;
    margin: 40px auto;
    margin-top:170px;
    position: relative;
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
    left: 20px;
    box-shadow: 10px 10px 20px -5px rgba(0,0,0,0.1);
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
// #antv_container{background: white;}
#antv_minimap{
  position: absolute; 
  width: 140px;
  height: 100px; 
  border-radius: 10px;
  overflow: hidden; 
  top: 10px;
  right:10px;
  background:transparent;
  box-shadow: 0px 0px 10px -2px rgba(0,0,0,.2);
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
    left: 15px;
    border:1px solid #ddd;
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
  background:#111 !important;
  #main{
    background:#111 !important;
  }
  #antv_container{
    background-color:transparent !important;
  }
  .btn.menu{
    background: #444;
    color:white;
    border: 1px solid #666;
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
    .line{
      background: #666;
      border: 1px solid #444;
        color: white;
    }
    .el-input{
      ::v-deep input{
        background: #666;
        border: 1px solid #444;
        color: white;
      }
    }
    .el-select{
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
  .file_config_board .group_item,.file_item{
    background: #333;
    border:1px solid #444;
    i{
      color:rgba(255,255,255,.1);
    }
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
  margin-top: 0px;
    margin-left: -2px;
    padding: 0px;
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

.x6-cell:hover{
  .x6-port-body{
    visibility: visible;
  }
}
.read_mode{
  .x6-port-body{
    visibility: hidden;
  }
  .config_board{
    display:flex;
    .btn.plain.menu{
      display:none;
    }
  }
}
.x6-port-body{
  opacity: 1 !important;
  visibility: hidden;
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
table{border-collapse: collapse;}
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
.node{
    background: white;
    height: 100%;
    width: 100%;
    text-align: center;
    // border-radius: 1em;
    box-shadow: 0px 10px 20px -2px rgba(0,0,0,.1);
    
    // margin: -1px;
    box-sizing: border-box;
    font-weight: bold;
    .pinner{
      display: none;
    }
}
.node.first{
  padding:10px;
  border-radius: 10px;
  .inner_text{
    line-height: 40px;
    font-size: 18px;
    p{margin:0px;}
  }
}
.node.second{
  padding:5px;
  border-radius: 8px;
  .inner_text{
    line-height: 30px;
    font-size: 16px;
    p{margin:0px;}
  }
}
.node.others{
  padding:0px;
  border-radius: 5px;
  .inner_text{
    line-height: 20px;
    font-size: 14px;
    p{margin:0px;}
  }
}
.node.note{
  padding:5px;
  border-radius: 5px;
  .inner_text{
    line-height: 20px;
    font-size: 14px;
    .title{
      font-size: 18px;
    }
    .content{
      text-align:justify;
      padding:10px;
      font-weight: normal;
      code{font-family: monospace;}
      table{
        border-collapse: collapse;
        background: rgba(255,255,255,.2);
        margin:10px auto;
        border-radius: 5px;
        box-shadow: 0px 4px 10px -2px rgba(0,0,0,.1);
        thead{
          border: 0px;
          th{
            padding:5px 10px;
            border-bottom:1px solid #444;margin:0px;
            }
          th:nth-child(1){
              border-right:1px solid #444 !important;
          }
        }
        tbody{
          border: 0px;
          tr{
            td{padding:5px 10px;border:0px;}
            td:nth-child(1){
              border-right:1px solid #444 !important;
            }       
          }
        }
      }
    }
    p{margin:0px;}
  }
}
.node.note.min{
  .title{
    font-size: 14px;
  }
  .content{
    font-size: 10px;
    padding: 5px;
  }
}
.node.note.max{
  .title{
    font-size: 20px;
  }
  .content{
    font-size: 16px;
    padding: 10px;
  }
}
.node.image{
  border-radius: 10px;
}
.node.group{
  border-radius: 10px;
  border: 2px dashed;
}
.node.chart{
  padding:10px;
  border-radius: 10px;
  position: relative;
  box-sizing: border-box;
  .inner_text{
    line-height: 40px;
    font-size: 18px;
    p{margin:0px;}
  }
  .chart_container{
    position: absolute;
    border-radius: 10px;
    padding: 5px;
    box-sizing: border-box;
    background: #fafafa;
    height: calc(100% - 60px);
    width: calc(100% - 20px);
  }
}

.node.html {
  box-shadow: none;
  border:5px solid transparent;
  padding:5px;
  // box-sizing: border-box;
  border-radius: 15px;
  background: transparent;
  .inner_text{
    height: 100%;
    width: 100%;
    .frame{
      box-shadow: 0px 10px 20px -2px rgba(0,0,0,.1);
      height: calc(100% - 10px);
      width: calc(100% - 10px);
      border: none;
      overflow: hidden;
      background: transparent;
      position: absolute;
      top: 0;
      border-radius: 10px;
      left: 0px;
      margin: 5px;
    }
  }
}
.node.html:hover{
  border-color:black;
}

.node.anchor{
  background: transparent;
  box-shadow: none;
  .inner_text{
    line-height: 30px;
    padding: 5px;
    height: 40px;
    .position{
      height: 30px;
      width: 30px;
      background: #009688;
      border-radius: 30px;
      float: left;
      color: white;
      font-family: sans-serif;
    }
  }
}
.dark_mode .node.html:hover{
  border-color: #ddd;
}
// styles
.node.fold.folding{
  position: relative;
  .content{
    display:none;
  }
}
.node.fold.folding:hover{
  .content{
    display:block;
  }
}
.node.fold{
  position: relative;
  border-left: 8px solid black;
  .title{
    height: 30px;
    line-height: 30px;
    text-align: left;
    text-indent: 10px;
  }
  .content{
    position: absolute;
    background: #f5f5f5;
    top: calc(100% + 15px);
    left: -8px;
    min-width: 100%;
    border-radius: 5px;
    box-shadow: 0px 0px;
    z-index: -1;
    box-shadow: 0px 0px 10px -2px rgba(0,0,0,.1);
    border: 1px solid #ddd;
  }
  .content::after{
    content: "";
    position: absolute;
    background: #f5f5f5;
    height: 14px;
    width: 14px;
    top: -8px;
    left: 20px;
    box-sizing: border-box;
    border-top: 1px solid #ddd;
    transform: rotate(45deg);
    border-left: 1px solid #ddd;
    border-top-left-radius: 3px;
  }
}
.node.anchor .name{color:white;}
.node.fold.folding::after{
  content: "";
  position: absolute;
  height: 0px;
  width: 0px;
  border-top:6px solid #eee;
  border-left:6px solid transparent;
  border-right:6px solid transparent;
  border-bottom: 6px solid transparent;
  top:17px;
  right:10px;
}
.node.fold.folding::before{
  content: "";
  position: absolute;
  height: 18px;
  width: 18px;
  border-radius: 10px;
  border:1px solid #eee;
  top:9px;
  right:6px;
}
.node.plain{
  border: 2px solid black;
  background: white;
  color: black;
}
.node.transparent{
  background: transparent;
  box-shadow: none;
  transition: ease .2s;
}
.node.group.plain{
  border: 2px dashed;
}

.node.placeholder{
  opacity: 0;
  color: white;
}
.node.placeholder::after{
  content: "Placeholder";
  color: black;
}
.node.placeholder:hover{
  opacity: 0.5;
}

.node.pure-green{
  border: 2px solid #c8e6c9;
  background: #c8e6c9;
  color: black;
}
.node.pure-blue{
  border: 2px solid #bbdefb;
  background: #bbdefb;
  color: black;
}
.node.pure-yellow{
  border: 2px solid #fff59d;
  background: #fff59d;
  color: black;
}
.node.pure-red{
  border: 2px solid #ffcdd2;
  background: #ffcdd2;
  color: black;
}
.node.sticky {
  padding-top: 10px;
	background-color: #fff59d;
	border-bottom-left-radius: 20px 500px;
	border-bottom-right-radius: 500px 30px;
	border-top-right-radius: 5px 100px;
	background: 
		-webkit-gradient(
			linear,
			left top, left bottom,
			from(#81cbbc),
			color-stop(2%, #fff59d)
		);
	position: relative;
}
.node.sticky:after {
	width: 40px;
	height: 15px;
	content: " ";
	margin-left: -40px;
	border: 1px solid rgba(200, 200, 200, .8);
	background: rgba(254, 254, 254, .6);
	box-shadow: 0px 0 3px rgba(0, 0, 0, 0.1);
  transform: rotate(-5deg);
	position: absolute;
	left: 50%;
	top: -5px;
}
.node.emergency{
  border:2px solid black;
}
.node.inside{
  border:2px solid #eee;
  box-shadow: 2px 2px 10px 1px rgba(0,0,0,.1) inset;
}
.node.group.emergency, .node.group.inside{
  border: 2px dashed;
}
.node.emergency:after{
  content: "❗️";
    position: absolute;
    top: -10px;
    right: 0px;
    font-size: 1.5em;
    transform: rotate(25deg);
    text-shadow: 2px 2px 10px #f50000;
}

.node.pin{
  border: 2px solid black;
  .pinner{
    display: block;
    position: absolute;
    top: -4px;
    right: 0px;
    font-size: 1.8em;
    transform: rotate(15deg);
  }
  .pinner:nth-child(1)
  {
    filter: blur(5px);
    top:0px;
  }
}

@keyframes light-black-border {
  0% {
    box-shadow: 0 0 0 0 rgba(100,181,246, 0.6);
  }
  100% {
     box-shadow: 0 0 20px 10px rgba(100,181,246, 0);
  }
}
.node.light {
  border: 2px solid rgba(100,181,246, 0.5);
  background: #bbdefb;
  box-shadow: none;
  border-radius: 10px;
}
.node.light:hover {
  animation: light-black-border 1s infinite;
}
.node.border-flash {
    position: relative;
    
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        border-radius: 5px;
        bottom: 0;
        border: 2px solid #ff5722;
        transition: all .5s;
        animation: clippath 3s infinite linear;
    }
}

@keyframes clippath {
    0%,
    100% {
        clip-path: inset(0 0 95% 0);
    }
    
    25% {
        clip-path: inset(0 95% 0 0);
    }
    50% {
        clip-path: inset(95% 0 0 0);
    }
    75% {
        clip-path: inset(0 0 0 95%);
    }
}
.x6-widget-minimap .x6-graph{
  box-shadow:none;
}
.dark_mode{
  // styles
  .x6-port-body{
    fill:#333;
    stroke:#222;
  }
  .x6-widget-minimap{
    background-color: #222;
  }
  .node.transparent{color:white;}
  .node.plain{
    border:2px solid #444;
    background: #333;
    color: white;
  }
  .node.pin{
    border:2px solid #444;
    background: #333;
    color: white;
  }
  .node.fold{
    // border:2px solid #444;
    background: #333;
    color: white;
    .content{
      background: #333;
      border-color: #444;
      color: white;
    }
    .content::after{
      background: #333;
      border-color: #444;
    }
  }
  .node.group.plain{
    border:2px dashed white;
  }
  .node.emergency{
    border:2px solid #444;
    background: #333;
    color: white;
  }
  .node.group.emergency{
    border:2px dashed white;
  }
  .node.inside{
    border:2px solid #343434;
    background: #222;
    color: white;
  }
  .node.pure-red{
    background: #8d7174;
    border-color: #8d7174;
    color:white;
  }
  .node.pure-green{
    background: #7c8f7c;
    border-color: #7c8f7c;
    color:white;
  }
  .node.pure-yellow{
    background: #b6ae64;
    border-color: #b6ae64;
    color:white;
  }
  .node.pure-blue{
    background: #647c8f;
    border-color: #647c8f;
    color:white;
  }
}
.secretKeysboard{
  position: absolute;
  top:60px;
  right:10px;
  .line{
    margin:10px;
    .remove{
      color:red;
      border-radius: 20px;
      font-size:1.5em;
      position:absolute;
      cursor:pointer;
      &:hover{
        color:red;
      }
    }
  }
}
.file_item .encrypted::before, .file_item .open::before{
  position: absolute;
  top:0px;
  font-weight: bold;
  right:10px;
  height:20px;
  line-height: 20px;
}
.file_item .encrypted::before{
  content: "\e6e5";
  color: #ff5722;
  font-family: element-icons!important;
}
.file_item .open::before{
  content: "\e6e4";
  color: #4caf50;
  font-family: element-icons!important;
}
</style>