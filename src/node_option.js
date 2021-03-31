

module.exports={
    "first":{
        width: 120,
        height: 60,
        attrs: {
            body: {
                stroke: 'black',
                fill: 'white',
                rx: 10,
                ry: 10,
            },
            text:{
                text:"中心主题",
                fill:'black',
                fontSize: "18",
                fontWeight: "bold"
            }
        },
        data:{
            note:""
        },
        zIndex: 10,
        ignore_layout:false,
        idx:0,
    },
    "second":{
        width: 100,
        height: 40,
        attrs: {
            body: {
            stroke: 'black',
            fill: 'white',
            rx: 15,
            ry: 15,
            },
            text:{
                text:"分支主题",
                fill:'black',
                fontSize: "16",
            }
        },
        data:{
            note:""
        },
        idx:1,
        zIndex: 10,
        ignore_layout:false,
    },
    "others":{
        width: 80,
        height: 20,
        attrs: {
            body: {
            stroke: 'black',
            fill: 'white',
            rx: 5,
            ry: 5,
            },
            text:{
                text:"子主题",
                fill:'black',
            }
        },
        data:{
            note:""
        },
        idx:2,
        zIndex: 10,
        ignore_layout:false,
    },
    "note":{
        width: 100,
        height: 40,
        attrs: {
            body: {
            stroke: 'black',
            fill: 'white',
            rx: 5,
            ry: 5,
            },
            text:{
                text:"注释",
                fill:'black',
                fontSize: "14",
            }
        },
        data:{
            note:""
        },
        zIndex: 10,
        idx:3,
        ignore_layout:true,
    },
    "edge":{
        source:"",
        target: "",
        connector: { name: 'rounded' },
        zIndex: 10,
        // tools: {
        //     name: 'button-remove',
        //     args: { distance: -40 },
        //   },
    },
    "group":{
        width: 100,
        height: 40,
        label:"",
        attrs: {
            body: {
                stroke: 'black',
                fill: '#eee',
                strokeDasharray:5,
                rx: 5,
                ry: 5,
            },
        },
        data:{
            note:"",
        },
        zIndex: 1,
        idx:4,
    },
    "image":{
        shape: 'image',
        x:null,
        y:null,
        height:null,
        width:null,
        imageUrl:null,
    }
}