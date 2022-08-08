module.exports={
    "line":{
        xAxis: {
            type: 'category',
            name: '日期',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            nameLocation: 'center',
            nameGap: 20,
            axisLine:{show:true,lineStyle:{color:'black'}},
            splitLine:{show:true,lineStyle:{color:'#ccc'}}
          },
          tooltip: {
            trigger: 'axis'
          },
          yAxis: {
            type: 'value',
            name: '数量',
            axisLine:{show:true,lineStyle:{color:'black'}},
            splitLine:{show:true,lineStyle:{color:'#ccc'}},
          },
          grid: [
            {
              show:true,
              backgroundColor:'rgba(0,0,0,0.05)',
              containLabel:true,
              borderColor:'black',
              zlevel:2,
              borderWidth:1,
              top: 30,
              right: 10,
              bottom: 20,
              left: 10
            }
          ],
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'line'
            }
          ]
    }
}