<template>
    <div class="editor-viewer">
        <div class="content-list">
            <div v-for="(content, index) in contentList" class="editor-item" :key="index">
                <textarea v-if="content.text" v-model="content.text"></textarea>
                <img v-if="content.image" :src="content.image">
                <div class="editor-item-ops" >
                    <el-button icon="el-icon-plus" circle @click="beginAdd"></el-button>
                    <el-button icon="el-icon-arrow-down" v-if="contentList.length > 1 && index !== contentList.length - 1" 
                        circle @click="moveDown(index)"></el-button>
                    <el-button icon="el-icon-arrow-up" circle  v-if="contentList.length > 1 && index !== 0"
                        @click="moveUp(index)"></el-button>
                    <el-button icon="el-icon-delete" circle @click="delOne(index)"></el-button>
                </div>
            </div>
            <div class="add-module">

            </div>
        </div>
        <button class="editor-btn" @click="beginAdd">+ 添加模块</button>
    </div>
</template>

<script>
export default {
    props: ['contents'],
    computed: {
        contentList () {
            return this.contents;
        }
    },
    methods: {
        beginAdd () {

        },
        moveDown (index) {
            this.contentList.splice(index, 1)
        },
        moveUp (index) {
            this.contentList.splice(index, 1)
        },
        delOne (index) {
            this.contentList.splice(index, 1)
        }
    }
}
</script>
<style scoped>
.editor-viewer {
    width: 600px;
    height: 600px;
    border: 1px solid #eee;
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
}
.editor-btn{
    width: 100%;
    padding: 15px;
    background: #eee;
    position: absolute;
    bottom: 0;
    left: 0;
    outline: none;
}
.editor-item {
    position: relative;
}
.editor-item>textarea, 
 .editor-item>img{
    width: calc(100% - 10px);
    margin: 5px;
    height: auto;
    border: 1px solid #eee;
    min-height: 200px;
}
.editor-item>textarea{
    resize: none;
}
.editor-item-ops {
    height: 50px;
    position: absolute;
    right: 6px;
    bottom: 0;
    z-index:100;
}
.editor-item-ops > .editor-btn {
    background-color: #666;
}
.add-module {
    border: 1px dashed #eee;
    min-height: 100px;
    width: calc(100% - 10px);
    margin: 5px;
}
</style>

