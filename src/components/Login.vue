<template>
<div class="bg">
  <div class="board" v-if="is_first_set">
      <p class="msg_board" :style="{color:msg_color}">{{msg}}</p>
      <input type="text" class="input" v-model="password"/>
      <div class="button" @click="first_set()">Submit</div>
  </div>
  <div class="board" v-else>
      <p class="msg_board">{{msg}}</p>
      <input type="password" class="input" v-model="password" @keyup.enter="login()"/>
      <div class="button" @click="login()">Login</div>
  </div>
</div>
</template>

<script>
const {checkFirst ,login, firstSet, setToken}  = require("../api");

export default {
    data: function(){
        return {
            msg: "This is the first time you enter this website, thus input your password at the beginning.",
            password:"",
            is_first_set: true,
            msg_color: "black"
        };
    },
    mounted: function(){
        checkFirst().then(res=>{
            this.is_first_set = res.data.is_first
            console.log(res)
            if(!this.is_first_set) this.msg="Please input your password.";
        })
    },
    methods:{
        first_set: function(){
            if(this.password.length < 6){
                console.log(this.password)
                this.msg = "Please input at least 6 characters."
                this.msg_color = "red"
                return null
            }
            firstSet({password: this.password}).then((res)=>{
                this.msg = "Success."
                this.msg_color = "green"
                console.log(res)
                this.is_first_set=false
            })
        },
        login: function(){
            if(this.password.length < 6){
                console.log(this.password)
                this.msg = "Please input at least 6 characters."
                this.msg_color = "red"
                return null
            }
            login({password: this.password}).then((res)=>{
                this.msg = "Success."
                this.msg_color = "green"
                setToken(res.token)
                this.$router.push("/")
            })
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
    width: 50vw;
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
        min-width: 300px;
        margin:auto;
        margin-bottom:20px;
    }
    .input{
        height: 40px;
        border-radius: 10px;
        border: 2px solid #3f51b5;
        width: calc(80% - 20px);
        min-width: 300px;
        margin: auto;
        box-sizing: border-box;
        box-shadow: 0px 4px 20px -2px rgba(0,0,0,.1);
        text-align: center;
        font-size: 1rem;
        font-weight: bold;
        line-height: 40px;
    }
    .button{
        height: 40px;
        width: 60px;
        background: #3f50b5;
        margin: 20px auto;
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
</style>