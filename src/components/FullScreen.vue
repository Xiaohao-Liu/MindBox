<template>
    <div id="full-screen">
        <span @click="toggle">
        <i class="el-icon-full-screen"/>
        </span>
    </div>
</template>
<script>
import { useFullscreen } from '@vueuse/core';
export default {
    data: function(){
        return {
            isFullscreen: false
        };
    },
    mounted: function(){
    },
    methods:{
        toggle: function(){
            useFullscreen().toggle()
        }
    }
}

</script>
<style scoped>
#full-screen{
    position: fixed;
    top: 10px;
    right: 10px;
    background: white;
    z-index: 10000;
    font-size: 20px;
    border-radius: 5px;
    text-align: center;
    line-height: 30px;
    height: 30px;
    width: 30px;
    box-shadow: 0px 0px 20px rgba(0,0,0,.2);
}
</style>
  