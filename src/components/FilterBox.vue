<template>
    <div :class="filterList" class="filter-item" :style="`background-image: url(${이미지})`">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name : 'filterbox',
    data(){
        return{
            msg: 'hey11111111111111'
        }
    },

    props : {
        이미지 : String,
        filterList : String
    }
}
</script>

<style>
    .filter-item {
        width: 100px;
        height: 100px;
        margin: 10px 10px 10px auto;
        padding: 8px;
        display: inline-block;
        color: white;
        background-size: cover;
        background-position: center;
    }
</style>