//express_demo.js 文件
var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var axios = require('axios')

var { jwtAuth } = require("./jwt")
const jwt = require('jsonwebtoken')
const { PRIVATE_KEY, JWT_EXPIRED } = require('./constant')
const md5 = require("./md5")

const fs = require("fs");
var dirname = process.cwd()

// set static file director
app.use('/', express.static( dirname + '/dist' ));
app.use(bodyParser.urlencoded({ extended: false }));
//解析json数据格式
app.use(bodyParser.json())  
// cros
app.use(cors()); /* NEW */
// app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile( dirname + "/dist/" + "index.html" );
})

app.get('/api/is_first', function (req, res, next){
    if(! fs.existsSync("./.pwd")){
        res.json({ code: 401, msg: 'Password not set', data: {is_first:true}});
    }
    else res.json({ code: 401, msg: 'Password  set', data: {is_first:false}});
})

app.post('/api/first_set', function (req, res, next) {

    let { password } = req.body;

    if(! fs.existsSync("./.pwd")){
        fs.writeFileSync('./.pwd', md5(password))
        res.json({ code: 401, msg: 'Password set'});
    }
    else{
        res.json({ code: -1, msg: 'Password exists'});
    }
    
})
  
app.post('/api/login',function (req, res, next) {

    let { password } = req.body;
    //md5加密
    password = md5(password)

    // console.log(md5(password))
    var pwd = fs.readFileSync("./.pwd", 'utf-8')
    console.log(pwd)
    if (pwd!=password) {
        res.json({ code: -1, msg: '密码错误', data: {} })
    } else {
        //登录成功，签发一个token并返回给前端
        const token = jwt.sign(
        //playload：签发的 token 里面要包含的一些数据。
        { password },
        //私钥
        PRIVATE_KEY,
        { algorithm: 'HS256' },
        //设置过期时间
        { expiresIn: JWT_EXPIRED }
        )
        res.json({ code: 401, msg: 'Login', data: {},'token':token });
    }
    
})

app.get('/api/giteeinfo', jwtAuth,  function (req, res) {
    var response = {
        "enable":process.env.MINDBOX_GITEE_ENABLE==1?true:false,
        "username":process.env.GITEE_USER,
        "repos":process.env.MINDBOX_REPO,
        "token":process.env.GITEE_TOKEN
    };
    res.end(JSON.stringify(response));
    // console.log(response)
})

app.get('/api/pic_file',  async function (req, res) {
    axios.get(req.query.url, {
    responseType: 'arraybuffer', //这里只能是arraybuffer，不能是json等其他项，blob也不行
    }).then(response => {
    res.set(response.headers) //把整个的响应头塞入更优雅一些
    res.end(response.data.toString('binary'), 'binary') //这句是关键，有两次的二进制转换
    })
    // console.log(response)
})

var server = app.listen(80, function () {
 
  var host = server.address().address
  var port = server.address().port

  console.log("website: http://%s:%s", host, port);
  console.log("workdir: %s", dirname);
})