module.exports={
    "first":{
        width: 120,
        height: 60,
        attrs: {
            body: {
            stroke: '#7e57c2',
            fill: '#b39ddb',
            rx: 20,
            ry: 20,
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
        ignore_layout:false,
        idx:0,
    },
    "second":{
        width: 100,
        height: 40,
        attrs: {
            body: {
            stroke: '#b39ddb',
            fill: '#d1c4e9',
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
        ignore_layout:false,
    },
    "others":{
        width: 80,
        height: 20,
        attrs: {
            body: {
            stroke: 'transparent',
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
        idx:3,
        ignore_layout:true,
    },
    "edge":{
        source:"",
        target: "",
        connector: { name: 'rounded' },
        attrs:{
            rect:{
                stroke: 'black',
            },
            label:{
                text:"",
                fill:'black',
            }
        },
        router: {
            name: 'manhattan',
            args: {
              startDirections: ['bottom'],
              endDirections: ['top'],
            },
        },
        // tools: {
        //     name: 'button-remove',
        //     args: { distance: -40 },
        //   },
    },
}