//express_demo.js 文件
var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');

var dirname = process.cwd()

// set static file director
app.use('/static', express.static( dirname + '/dist' ));
app.use(bodyParser.urlencoded({ extended: false }));

// cros
app.use(cors()); /* NEW */
// app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile( dirname + "/dist/" + "index.html" );
})

app.get('/api/giteeinfo', function (req, res) {
    var response = {
        "enable":process.env.MINDBOX_GITEE_ENABLE==1?true:false,
        "username":process.env.GITEE_USER,
        "repos":process.env.MINDBOX_REPO,
        "token":process.env.GITEE_TOKEN
    };
    res.end(JSON.stringify(response));
    // console.log(response)
})
var server = app.listen(80, function () {
 
  var host = server.address().address
  var port = server.address().port

  console.log("website: http://%s:%s", host, port);
  console.log("workdir: %s", dirname);
})