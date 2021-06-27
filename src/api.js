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

async function getGiteeInfo(){
    return axios({
        method:"get",
        url:"/api/giteeinfo",
        responseType: 'json'
    })
}

module.exports={
    GiteeAPI:GiteeAPI,
    getGiteeInfo:getGiteeInfo
}
// const gitee_info = require("./index")

// const gAPI = new GiteeAPI(gitee_info)
// gAPI.get_file_by_path("LGN_Master.mb").then(res=>{
//     console.log(res)
// }).catch(err=>{
//     console.log(err)
// })