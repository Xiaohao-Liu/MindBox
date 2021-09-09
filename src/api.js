const axios = require('axios').default;


function GiteeAPI(gitee_info){
    this.username = gitee_info.username;
    this.token = gitee_info.token;
    this.repos = gitee_info.repos;
}

GiteeAPI.prototype = {
    get_files:async function(){
        return axios({
            method:"get",
            url:"https://gitee.com/api/v5/repos/"+this.username+"/"+this.repos+"/git/trees/master",
            responseType: 'json',
            headers:{"Authorization":"token "+this.token},
        })
    },
    get_file_by_sha:async function(sha){
        return axios({
            method:"get",
            url:"https://gitee.com/api/v5/repos/"+this.username+"/"+this.repos+"/git/blobs/"+sha,
            responseType: 'json',
            headers:{"Authorization":"token "+this.token},
        })
    },
    get_file_by_path:async function(file_name){
        return axios({
            method:"get",
            url:"https://gitee.com/api/v5/repos/"+this.username+"/"+this.repos+"/contents/"+file_name,
            responseType: 'json',
            headers:{"Authorization":"token "+this.token},
        })
    },
    new_file:async function(file_name,data){
        data = {
            "access_token":this.token,
            "owner":this.username,
            "repo":this.repos,
            "path":file_name,
            "message": "[new file] "+ file_name,
            "content": data.content
            }
        return axios({
            method:"post",
            url:"https://gitee.com/api/v5/repos/"+this.username+"/"+this.repos+"/contents/"+file_name,
            responseType: 'json',
            headers:{"Authorization":"token "+this.token},
            data:data,
        })
    },
    update_file:async function(file_name,data){
        data = {
            "access_token":this.token,
            "owner":this.username,
            "repo":this.repos,
            "path":file_name,
            "message": "[update file] "+ file_name,
            "content": data.content,
            "sha":data.sha
            }
        return axios({
            method:"put",
            url:"https://gitee.com/api/v5/repos/"+this.username+"/"+this.repos+"/contents/"+file_name,
            responseType: 'json',
            headers:{"Authorization":"token "+this.token},
            data:data,
        })
    }
}



const Cookies =require('js-cookie')

const TokenKey = 'User-Token'
function getToken() {
  return Cookies.get(TokenKey)
}
function setToken(token) {
  return Cookies.set(TokenKey, token)
}
function removeToken() {
  return Cookies.remove(TokenKey)
}

const service = axios.create({
  baseURL: "",
  timeout: 5000
})
//请求拦截器
service.interceptors.request.use(
  config => {
    let token = getToken()
    if(token)config.headers['Authorization'] = token
    return config
  },
  error => {
    return Promise.reject(error)
  })

//响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data || {}
    // 如果响应成功但结果不为0,则提示错误信息
    if (res.code == -1) {
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return res
  },
  error => {
    const res = error.response || {}
    /**
     * 如果token失效,重新刷新页面。会触发beforeRouter钩子函数。
     * 钩子函数里会请求`UserInfo`接口，因为token失效，会抛出401抛出异常，
     * 捕获异常后就会清除本地`token`，然后跳转到登录页面。
     */
    if (res.status === 401) {
        removeToken()
        // vue.$router.push("./login")
    }
    return Promise.reject(error)
  })

async function getGiteeInfo(){
    return service({
        method:"get",
        url:"/api/giteeinfo",
        
        responseType: 'json'
    })
}

async function checkFirst(){
  return service({
      method:"get",
      url:"/api/is_first",
  })
}

async function firstSet(data){
    return service({
        method:"post",
        url:"/api/first_set",
        data        
    })
}

async function login(data){
    return service({
        url:"/api/login",
        method:"post",
        data
    })
}

module.exports={
    GiteeAPI:GiteeAPI,
    checkFirst: checkFirst,
    firstSet:firstSet,
    login:login,
    getGiteeInfo:getGiteeInfo,
    setToken: setToken,
    getToken: getToken,
    removeToken: removeToken
}
// const gitee_info = require("./index")

// const gAPI = new GiteeAPI(gitee_info)
// gAPI.get_file_by_path("LGN_Master.mb").then(res=>{
//     console.log(res)
// }).catch(err=>{
//     console.log(err)
// })