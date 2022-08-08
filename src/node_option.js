
const ports={
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#C2C8D5',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#C2C8D5',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      },
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#C2C8D5',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      },
      right: {
        position: 'right',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#C2C8D5',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      },
    },
    items:[
        {
            group: 'top',
        },
        {
            group: 'bottom',
        },
        {
            group: 'left',
        },
        {
            group: 'right',
        },
    ]
}

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
        ports:{...ports}
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
        ports:{...ports}
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
        ports:{...ports}
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
        ports:{...ports}
    },
    "edge":{
        source:"",
        target: "",
        zIndex: 10,
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
        ports:{...ports}
    },
    "chart":{
        width: 400,
        height: 250,
        label:"",
        shape: 'html',
        html: "chart",
        data:{
            type:"chart",
            id:"",
            data:"",
            title:"chart title",
            x_axis:"x",
            y_axis:"y",
            style:"line",
        },
        zIndex: 1,
        idx:4,
        ports:{...ports}
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
        ports:{...ports}
    },
    "html":{
        width: 280,
        height: 120,
        label:"",
        shape: 'html',
        html: "html",
        data:{
            type:"html",
            id:"",
            style:"plain",
            src:"https://httishere.github.io/notion-widget/new/blue-week.html"
        },
        zIndex: 1,
        idx:4,
        ports:{...ports}
    },
    "anchor":{
      width: 100,
      height: 40,
      label:"",
      shape: 'html',
      html: "anchor",
      data:{
          type:"anchor",
          position:{name:'原点',x:0,y:0},
          id:"",
          style:"plain",
      },
      zIndex: 1,
      idx:4,
      ports:{...ports}
    },
}