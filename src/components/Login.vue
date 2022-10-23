<template>
<div class="bg">
  <div class="board">
    <i class="icon">MindBox</i> | Xiaohao Liu
      <p class="msg_board" :style="{color:msg_color}">{{msg}}</p>
      <div style="padding:10px;background:#f3f3f3;border-radius:10px;">
        <p class="title">username</p>
        <input class="input" v-model="user"/>
        <p class="title">repository name</p>
        <input class="input" v-model="repo"/>
        <p class="title">token</p>
        <input class="input" v-model="token"/>

        <div class="button" @click="login()">Login</div>
    </div>
  </div>
</div>
</template>

<script>
const {setToken, GiteeAPI}  = require("../api");

export default {
    data: function(){
        return {
            msg: "This app utiles the gitee cloud storage, thus you need to check required information follows:",
            user:"",
            repo:"",
            token:"",
            is_first_set: true,
            msg_color: "black"
        };
    },
    mounted: function(){

    },
    methods:{
        login: function(){
            // setToken({
            //     "enable":true,
            //     "username":this.user,
            //     "repos": this.repo,
            //     "token": this.token
            // })
            // this.$router.push("/")
            const gitee_info = {
                    "enable":true,
                    "username":this.user,
                    "repos": this.repo,
                    "token": this.token
                }
            this.gAPI = new GiteeAPI(gitee_info);
            this.__check("mindbox.check", this.__encode("checked!")).then(res=>{
                console.log(res)
                setToken(gitee_info)
                this.$router.push("/")
            })
        },
        __check:async function(name,content){ 
        return new Promise((resolve,reject)=>{
          if(this.user == "" || this.repo == "" || this.token == "" ){
              this.$notify({
                  title: ' Failed!',
                  message: "Invalid Gitee information!"
              });
              reject(false)
              return false;
          }
          this.gAPI.get_file_by_path(name).then(res=>{
            if(res.data.length == 0){
              const data = {
                "content":content
              }
              this.gAPI.new_file(name,data).then((res)=>{
                this.$notify({
                    title: 'Success!',
                    message: "Infomation correct!"
                });
                resolve(res.data)
              }).catch((err)=>{
                this.$notify({
                    title: 'Failed',
                    message: 'Invalid Gitee information!'
                });
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
                      title: 'Success!',
                      message: "Infomation valid!"
                  });
                  resolve(res.data)
                }).catch((err)=>{
                  this.$notify({
                    title: 'Failed!',
                    message: 'Invalid Gitee information!'
                  });
                  reject(err.data)
                })
            }
        }).catch(err=>{
            this.$notify({
                title: 'Failed!',
                message: 'Invalid Gitee information!'
            });
            reject(err.data)
        })
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
    }
    
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.bg{
    position: absolute;
    top:0px;
    left:0px;
    height:100vh;
    width: 100vw;
    background-size:cover;
    background-position: center;
    background-repeat: no-repeat;
    background: #FC5C7D;  /* fallback for old browsers */
background: -webkit-linear-gradient(to bottom, #6A82FB, #FC5C7D);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to bottom, #6A82FB, #FC5C7D); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
.board{
    // height: 50%;
    width: 200px;
    margin: auto;
    margin-top: 10%;
    box-sizing: border-box;
    padding: 20px;
    min-width: 400px;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 4px 20px -2px rgba(0,0,0,.1);
    .msg_board{
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        margin:20px auto;
        font-size:14px;
        border-bottom: 1px solid #ddd;
    }
    .title{
        text-align:left;
        // font-size:10px;
        font-weight: bold;
        // margin: 0px;
        text-indent: 10px;
        font-size:14px;
        margin-top:10px;
        margin-bottom: 5px;
    }
    .input{
        height: 40px;
        border-radius: 10px;
        border: 2px solid #3f51b5;
        width: 100%;
        min-width: 300px;
        margin: auto;
        box-sizing: border-box;
        box-shadow: 0px 4px 20px -2px rgba(0,0,0,.1);
        text-align: left;
        text-indent: 10px;
        font-size: 1rem;
        font-weight: bold;
        line-height: 40px;
    }
    .button{
        height: 40px;
        width: 60px;
        background: #3f50b5;
        margin: 10px auto;
        margin-top:20px;
        border-radius: 5px;
        color: white;
        text-align: center;
        cursor: pointer;
        line-height: 40px;
        padding: 0px 10px;
        transition: ease .5s;
    }
    .button:hover{
        box-shadow:0px 4px 20px -4px#3f50b5;
    }

}
.icon{
  background-color: #4353b6;
  height: 30px;
  line-height: 30px;
  width: 100px;
  border-radius: 5px;
  background-size: contain;
  display: inline-block;
  background-position: center;
  background-repeat: no-repeat;
color: white;
}
</style>