<template>
  <el-container class="main" v-loading="loading">
    <el-header>
      <div :class="'header_item '+(item.enable?'enable':'disable')" :style="'width:'+item.width+'px;'+item.style" v-for="item in tool_bar_list" :key="item.name">
        <div class="header_btn" v-on:click="(item.enable&&item.click())">
          <i :class="item.icon"/> {{item.title}}
        </div>
        <div class="header_name">{{item.name}}</div>
      </div>
    </el-header>
    <el-main style="height:calc(100% - 60px);padding:0px;" id="antv_container"></el-main>
    <div class="first_load_cover" v-if="first_load">
      <div class="first_load_board">
      Choose a Operation:
      <div class="btn green" v-on:click="__init_a_blank_project"><i class="el-icon-check"/> Create</div>
      <div class="btn green" v-on:click="__init_an_online_project" v-if="gitee_enable"><i class="el-icon-check"/> Open</div>
    </div>
    </div>
    <div class="node_config_board" v-if="node_config.show">
      <div class="board_title">{{node_config.title}}</div>
      <el-card>
        <div slot="header" class="clearfix">
          <span>Label</span>
        </div>
        <el-input v-model="node_config.label" @change="__change_node_label" placeholder="请输入内容"></el-input>
      </el-card>
      <el-card style="margin-top:10px;">
        <div slot="header" class="clearfix">
          <span>Note</span>
        </div>
        <el-input v-model="node_config.note" @change="__change_node_note" placeholder="请输入内容"></el-input>
      </el-card>
        <div v-if="selected_node.store.data.idx!=0" class="btn" v-on:click="__del_node">Delete</div>
    </div>
    <div class="edge_config_board" v-if="edge_config.show">
      <div class="board_title">{{edge_config.title}}</div>
      <el-card>
        <div slot="header" class="clearfix">
          <span>Label</span>
        </div>
        <el-input v-model="edge_config.label" @change="__change_edge_label" placeholder="请输入内容"></el-input>
      </el-card>
      <div class="btn" v-on:click="__del_edge">Delete</div>
    </div>
    <div class="file_config_board" v-if="file_config.show">
      <div class="board_title">{{file_config.title}}</div>
      <div class="btn blue iconfont icon-refresh" v-on:click="this.__get_gitee_files"> Refresh</div>
      <div class="file_item iconfont icon-file" v-for="item in file_config.list" :key="item.path">
        <div  style="width:calc(100% - 30px);float:right;"  v-on:click="__load_gitee_file(item.path,item.sha)">
          {{item.path}}
        </div>
      </div>
    </div>
  </el-container>
</template>

<script>
const $ = require("jquery");
import { Graph } from '@antv/x6';
import { Layout } from '@antv/layout';
const dagreLayout = new Layout({
  type: 'dagre',
  // ranksep: 20,
  // nodesep: 30,
  controlPoints: true,
  nodesepFunc:(opt)=>{
    return parseInt(opt.width/2);
  },
  ranksepFunc:(opt)=>{
    return parseInt(opt.height/2);
  },
})
import node_option from '../node_option';
import gitee_info from '../index';
import "../assets/iconfont/iconfont.css"
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data:function(){
    return {
      loading:false,
      first_load:true,
      gitee_enable:gitee_info.enable,
      file_name:"untitled",
      file_type:"mb",
      selected_node:null,
      selected_edge:null,
      tool_bar_list:[
        {
          name:"Arron Liu",
          width:100,
          style:"margin-right: 20px;border-right: 1px solid #eee;padding-right: 20px;",
          enable:true,
          show:true,
          icon:"",
          title:"MindBox",
          click:()=>{this.index()},
        },
        {
          name:"文件名",
          width:200,
          style:"margin-right: 20px;border-right: 1px solid #eee;padding-right: 20px;",
          enable:true,
          show:true,
          icon:"",
          title:"null",
          click:()=>{this.__file_rename()},
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
          name:"排布",
          width:40,
          style:"",
          enable:true,
          show:true,
          icon:"iconfont icon-tree",
          title:"",
          click:()=>{this.__tool_dagre_graph()},
        },
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
          name:"上传",
          width:40,
          style:"",
          enable:true,
          show:true,
          icon:"iconfont icon-upload",
          title:"",
          click:()=>{this.__upload_to_gitee()},
        },
      ],
      tool_map:{
        "file":1,
        "child":2,
        "sibling":3
      },
      node_config:{
        show:false,
        title:'Node Config',
        label:"",
        note:"",
      },
      edge_config:{
        show:false,
        title:'Edge Config',
        label:""
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
          this.__get_gitee_files();
        }
      }
      else{alert("MindMap\nDesined by Arron Liu.")}
    },
    __init_graph:function(){
        const default_graph_option={
        container: document.getElementById('antv_container'),
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
          multiple: false,
          rubberband: true,
          movable: true,
          showNodeSelectionBox: true,
        },
        panning:true,
        background:{
          color:"#efefef"
        }
      }
      this.graph = new Graph(default_graph_option);
    },
    __init_an_online_project:function(){
      this.file_config.show=true;
      this.__get_gitee_files();
      this.first_load=false;
    },
    __init_a_blank_project:function(){
      this.graph.fromJSON({})
      let center_node_op = node_option['first'];
      this.graph.addNode(center_node_op)
      this.graph.centerContent();
      this.tool_bar_list[this.tool_map['file']].title=this.file_name;
      this.file_name = "untitled";
      this.tool_bar_list[this.tool_map['file']].title=this.file_name;
      this.first_load=false;
    },
    __extract_graph_json:function(){
        var data={nodes:[],edges:[]};
        const jsondata = this.graph.toJSON();
        var ignore_data={nodes:[]}
        jsondata.cells.forEach(item=>{
            if(item.ignore_layout == true){
              let d = {};
              for(let k in item)d[k]=item[k];
              ignore_data.nodes.push(d)
              return
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
        return {"data":data,"ignore":ignore_data};
    },
    __enable:function(name){
      this.tool_bar_list[this.tool_map[name]].enable=true;
    },
    __disable:function(name){
      this.tool_bar_list[this.tool_map[name]].enable=false;
    },
    __change_node_label:function(){
      this.selected_node.updateAttrs({label:{text:this.node_config.label}})
    },
    __change_node_note:function(){
      this.selected_node.updateData({note:this.node_config.note})
    },
    __change_edge_label:function(){
      if(this.edge_config.label==''){
        this.selected_edge.setLabels({attrs:{text:{text:''}}})
      }else{
        this.selected_edge.setLabels({attrs:{text:{text:' '+this.edge_config.label+' '}}})
      }
    },
    __add_events:function(){
      this.graph.on('node:selected', ( args) => { 
          this.selected_node = args.node;
          this.node_config.show=true;
          this.edge_config.show=false;
          this.node_config.label = this.selected_node.store.data.attrs.text.text;
          this.node_config.note = this.selected_node.store.data.data.note;
          this.__enable("child")
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
      })
      this.graph.on('edge:click', ( args) => { 
          this.selected_edge = args.edge;
          this.edge_config.show=true;
          this.node_config.show=false;
          try{
            this.edge_config.label = this.selected_edge.getLabels()[0].attrs.text.text.trim();
           }catch{
             this.edge_config.label = ''
            //  console.log(this.selected_edge.getLabels())
           }
          // console.log(this.selected_node)
      })
      // back to default
      this.graph.on('blank:click', ( ) => { 
          this.edge_config.show=false;
          this.node_config.show=false;
      })
    },
    __add_keyboard_events:function(){
      this.graph.bindKey('enter',()=>{this.__tool_add_sibling()})
      this.graph.bindKey('ctrl+enter',()=>{this.__tool_add_child()})
      this.graph.bindKey('backspace',()=>{this.__del_node()})
    },
    __del_node:function(){
      if(this.selected_node==null || this.selected_node.store.data.idx == 0)return;
      this.graph.removeNode(this.selected_node.id);
      this.$message('删除成功');
    },
    __del_edge:function(){
      this.graph.removeEdge(this.selected_edge.id);
      this.$message('删除成功');
    },
    __tool_add_note:function(){
      let d = {};
      for(let k in node_option['note'])d[k] = node_option['note'][k];
      this.graph.addNode(d)
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
        let e = {};for(let k in node_option['edge'])e[k] = node_option['edge'][k]
        e.source = s_d.parent;
        e.target = t_node.id;
        this.graph.unselect(this.selected_node);
        this.graph.select(t_node)
        this.graph.addEdge(e);
        this.$message('添加子主题成功');
        this.__tool_dagre_graph();
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
        s_d.parent=this.selected_node.store.data.parent;
        
        let t_node = this.graph.addNode(s_d);
        let e = {};for(let k in node_option['edge'])e[k] = node_option['edge'][k]
        e.source = s_d.parent;
        e.target = t_node.id;
        this.graph.unselect(this.selected_node);
        this.graph.select(t_node)
        this.graph.addEdge(e);
        this.$message('添加主题成功');
        this.__tool_dagre_graph();
    },
    __tool_dagre_graph:function(){
      var data= this.__extract_graph_json();
      let select_id = 0;
      if (this.selected_node!=null)select_id=this.selected_node.id;
      this.graph.cleanSelection();
      const newdata = dagreLayout.layout(data.data)
      // reconstruct edges
      newdata.edges.forEach(rel=>{
          rel.source={
              cell:rel.source,
              port:"output_port"
          }
          rel.target={
              cell:rel.target,
              port:"input_port"
          }
      })
      newdata.nodes = newdata.nodes.concat(data.ignore.nodes)
      console.log(newdata)
      this.graph.fromJSON(newdata);
      if (select_id!=0)this.graph.select(select_id)
    },
    __file_rename:function(){
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
        $.ajax({
            url:"https://gitee.com/api/v5/repos/"+gitee_info.username+"/"+gitee_info.repos+"/git/trees/master",
            type:"GET",
            contentType:"application/json",
            dataType:"json",
            headers:{"Authorization":"token "+gitee_info.token},
            success:(returen_data)=>{
              let tree = returen_data.tree;
              this.file_config.list.splice(0,this.file_config.list.length);
              for(let i = 0; i < tree.length;i++){
                let d = tree[i].path.split(".")
                if(d[d.length-1]=="mb"){
                  this.file_config.list.push(tree[i])
                }
              }
            },
            error:()=>{

            }
        });
        this.file_config.loading=false;
    },
    __load_gitee_file:function(name,sha){
      if(gitee_info.username == "" || gitee_info.repos == "" || gitee_info.token == "" ){
          this.$notify({
              title: ' 失败',
              message: "Gitee 信息有误"
          });
          return;
      }
      this.loading=true;
      $.ajax({
            url:"https://gitee.com/api/v5/repos/"+gitee_info.username+"/"+gitee_info.repos+"/git/blobs/"+sha,
            type:"GET",
            contentType:"application/json",
            dataType:"json",
            headers:{"Authorization":"token "+gitee_info.token},
            success:(returen_data)=>{
              this.graph.fromJSON(JSON.parse(this.__decode(returen_data.content)))
              this.graph.centerContent();
              this.file_name = name.split(".mb")[0];
              this.tool_bar_list[this.tool_map['file']].title=this.file_name;
              this.loading=false;
            },
            error:()=>{
              this.loading=false;
            }
        })
    },
    __upload_to_gitee:function(){
        
        if(gitee_info.username == "" || gitee_info.repos == "" || gitee_info.token == "" ){
            this.$notify({
                title: ' 失败',
                message: "Gitee 信息有误"
            });
            return;
        }
        this.loading=true;
            $.ajax({
                    url:"https://gitee.com/api/v5/repos/"+gitee_info.username+"/"+gitee_info.repos+"/contents/"+this.file_name+'.'+this.file_type,
                    type:"GET",
                    contentType:"application/json",
                    dataType:"json",
                    headers:{"Authorization":"token "+gitee_info.token},
                    success:(returndata)=>{
                        if(returndata.length == 0){
                            // put a new pic to gitee repos
                            $.ajax({
                                url:"https://gitee.com/api/v5/repos/"+gitee_info.username+"/"+gitee_info.repos+"/contents/"+this.file_name+'.'+this.file_type,
                                type:"POST",
                                contentType:"application/json",
                                dataType:"json",
                                data:JSON.stringify({
                                    "access_token":gitee_info.token,
                                    "owner":gitee_info.username,
                                    "repo":gitee_info.repos,
                                    "path":this.file_name+'.'+this.file_type,
                                    "message": "upload a pic named "+ this.file_name+'.'+this.file_type,
                                    "content": this.__encode(JSON.stringify(this.graph.toJSON()))
                                    }),
                                headers:{"Authorization":"token "+gitee_info.token},
                                success:()=>{
                                    // console.log(returndata)
                                    this.$notify({
                                        title: '成功',
                                        message: this.file_name+'.'+this.file_type+" 上传成功！"
                                    });
                                    this.loading=false;
                                },
                                error:function(returndata){
                                    this.$notify({
                                        title: ' 失败',
                                        message: returndata.responseJSON.message
                                    });
                                    this.loading=false;
                                }
                                

                            })
                        }
                        else{
                            this.$alert('是否替换'+this.file_name+'.'+this.file_type, '替换', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                                }).then(() => {
                                    $.ajax({
                                        url:"https://gitee.com/api/v5/repos/"+gitee_info.username+"/"+gitee_info.repos+"/contents/"+this.file_name+'.'+this.file_type,
                                        type:"PUT",
                                        contentType:"application/json",
                                        dataType:"json",
                                        data:JSON.stringify({
                                            "access_token":gitee_info.token,
                                            "owner":gitee_info.username,
                                            "repo":gitee_info.repos,
                                            "path":this.file_name+'.'+this.file_type,
                                            "message": "upload a pic named "+ this.file_name+'.'+this.file_type,
                                            "content": this.__encode(JSON.stringify(this.graph.toJSON())),
                                            "sha":returndata.sha
                                            }),
                                        headers:{"Authorization":"token "+gitee_info.token},
                                        success:()=>{
                                            // console.log(returndata)
                                            this.$notify({
                                                title: '成功',
                                                message: this.file_name+'.'+this.file_type+" 替换成功！"
                                            });
                                            this.loading=false;
                                        },
                                        error:(returndata)=>{
                                            this.$notify({
                                                title: ' 失败',
                                                message: returndata.responseJSON.message
                                            });
                                            this.loading=false;
                                        }
                                    })
                                }).catch(() => {
                                    this.$notify({
                                        title: '取消替换',
                                        message: ''
                                    });
                                    this.loading=false;        
                                    });
                        }
                        
                        
                    },
                    error:()=>{
                        $.ajax({
                            url:"https://gitee.com/api/v5/repos/"+gitee_info.username+"/"+gitee_info.repos+"/contents/"+this.file_name+'.'+this.file_type,
                            type:"PUT",
                            contentType:"application/json",
                            dataType:"json",
                            data:JSON.stringify({
                                "message": "upload a pic named "+ this.file_name+'.'+this.file_type,
                                "content": this.__encode(JSON.stringify(this.graph.toJSON()))
                                }),
                            headers:{"Authorization":"token "+gitee_info.token},
                            success:()=>{
                                // console.log(returndata)
                                this.$notify({
                                    title: '成功',
                                    message: this.file_name+'.'+this.file_type+" 上传成功！"
                                });
                                this.loading=false;
                            },
                            error:(returndata)=>{
                                this.$notify({
                                    title: ' 失败',
                                    message: returndata.responseJSON.message
                                });
                                this.loading=false;
                            }
                            

                        })
                }

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
  position:absolute;
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
.node_config_board{
  height: calc(100% - 60px);
    width: 20%;
    min-width: 200px;
    position: fixed;
    right: 0px;
    top: 60px;
    background: rgba(255,255,255,.75);
    box-shadow: 0px 0px 10px rgba(0,0,0,.2);
    backdrop-filter: blur(10px);
        padding: 10px;
    box-sizing: border-box;
}
.edge_config_board{
  height: calc(100% - 60px);
    width: 20%;
    min-width: 200px;
    position: fixed;
    right: 0px;
    top: 60px;
    background: rgba(255,255,255,.75);
    box-shadow: 0px 0px 10px rgba(0,0,0,.2);
    backdrop-filter: blur(10px);
        padding: 10px;
    box-sizing: border-box;
}
.board_title{
    font-size: 1.2em;
    font-weight: bold;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
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
    width: 20%;
    min-width: 200px;
    position: fixed;
    left: 0px;
    top: 60px;
    background: rgba(255,255,255,.75);
    box-shadow: 0px 0px 10px rgba(0,0,0,.2);
    backdrop-filter: blur(10px);
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
    background: rgba(0,0,0,.7);
    backdrop-filter: blur(2px);
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

</style>
