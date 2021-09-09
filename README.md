
# mindbox 
![](public/ic_launcher.png)

A MindMap application powered by **vue**, **antvis/X6** and **element**. This app is a pure web page without any backend for data interactions. Thus, it's **convenient** to build your own mindmap app.

![](./pic_2.png)

Inspired by **XMind**, I designed the MindBox with many necessary and useful Features as follows:

- create child node
- create sibling node
- layout 
- note node
- upload to your gitee repo
- file manager (open an online file)
- dark mode
- ...

Here is a [demo](http://wykxldz.gitee.io/mindbox/?u=WYKXLDZ&r=MindBoxCollection&s=3746793b39d93d69f05aaac9ac39035ec3ae5544&n=Demo.mb) without gitee storage.

Enjoy it!

## Deploy
For the security, I add a simple server that can valid your identification and send the private gitee/github info to you.

First, set a json of settings of `pm2`:
```json
// start.json
{
	"apps":[
		{
		"name":"MarkBox",
		"script":"/opt/MindBox/server.js", 
		"env":{
			"GITEE_USER":"XiaoHao_Liu", 
			"GITEE_TOKEN":"xxxxxx", 
			"MINDBOX_REPO":"xxxxxx", 
			"MINDBOX_GITEE_ENABLE":1 
			}
		}
	]
}
```
Next, start your server by pm2:
```shell
pm2 start start.json

#│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
#├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
#│ 1  │ MarkBox            │ fork     │ 0    │ online    │ 0%       │ 41.8mb
```

