
module.exports={
    "first":{
        width: 120,
        height: 60,
        shape: 'html',
        html: "first",
        data:{
            type:"first",
            id:"",
            title:"Text",
            style:"plain",
            note:""
        },
        zIndex: 10,
        ignore_layout:false,
        idx:0,
    },
    "second":{
        width: 100,
        height: 40,
        shape: 'html',
        html: "second",
        data:{
            type:"second",
            id:"",
            title:"Text",
            style:"plain",
            note:""
        },
        idx:1,
        zIndex: 10,
        ignore_layout:false,
    },
    "others":{
        width: 80,
        height: 20,
        shape: 'html',
        html: "others",
        data:{
            type:"others",
            id:"",
            title:"Text",
            style:"plain",
            note:""
        },
        idx:2,
        zIndex: 10,
        ignore_layout:false,
    },
    "note":{
        width: 100,
        height: 40,
        shape: 'html',
        html: "note",
        data:{
            type:"note",
            id:"",
            title:"Note",
            style:"plain",
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
        shape: 'html',
        html: "group",
        data:{
            type:"group",
            id:"",
            title:"",
            style:"plain",
            note:""
        },
        zIndex: 1,
        idx:4,
    },
    "image":{
        width: 100,
        height: 100,
        shape: 'html',
        html: "image",
        data:{
            type:"image",
            id:"",
            src:"",
        },
    }
}