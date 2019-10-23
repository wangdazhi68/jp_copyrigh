<template>
    <div class="upload-imgs">
        <div v-if="imgLen>=1 ? false : true">
            <input
                type="file"
                class="uploadfile"
                @change="addImg"
                ref="inputer"
                accept="image/png, image/jpeg, image/gif, image/jpg"
            />
            <div class="add">
                <img src="@/assets/images/uploadbtn.png" alt />
            </div>
            <p>
                点击上传证件照
                <b class="red">{{message}}</b>
            </p>
        </div>
        <div v-for="(value, key) in imgs" :key="key">
            <div class="lookimg">
                <img :src="getObjectURL(value)" alt />
                <a class="close" title="删除" @click="delImg(key)">×</a>
            </div>
            <p>
                证件照
                <b class="red">{{message}}</b>
            </p>
        </div>
    </div>
</template>
<script>
import { constants } from 'crypto';
export default {
    data() {
        return {
            imgs: {},
            imgLen: 0
        };
    },
    props: ["message","sort"],
    methods: {
        addImg(event) {
            //console.log(this.sort)
            let inputDOM = this.$refs.inputer;
            // 通过DOM取文件数据
            this.fil = inputDOM.files;
            //console.log(this.fil);
            let oldLen = this.imgLen;
            let len = this.fil.length + oldLen;
            if (len > 1) {
                alert("最多可上传4张，您还可以上传" + (4 - oldLen) + "张");
                return false;
            }
            for (let i = 0; i < this.fil.length; i++) {
                let size = Math.floor(this.fil[i].size / 1024);
                if (size > 10 * 1024 * 1024) {
                    alert("请选择10M以内的图片！");
                    return false;
                }
                this.imgLen++;
                this.$set(
                    this.imgs,
                    this.sort, //+ "?" + new Date().getTime() + i,
                    this.fil[i]
                );
            }
           // console.log(this.imgs);
            this.$emit("uploadData",this.imgs);
        },
        getObjectURL(file) {
            var url = null;
            if (window.createObjectURL != undefined) {
                // basic
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) {
                // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) {
                // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        },
        async delImg(key) {
            let imgs=this.imgs;
            await this.$emit("delpic",imgs);
            this.$delete(this.imgs, key);
            this.imgLen--;  
        },
        // submit() {
        //     for (let key in this.imgs) {
        //         let name = key.split("?")[0];
        //         //console.log(this.imgs[key]);
        //         this.formData.append(this.imgs[key], name);
        //     }
        //     this.$http
        //         .post("/opinion/feedback", this.formData, {
        //             headers: { "Content-Type": "multipart/form-data" }
        //         })
        //         .then(res => {
        //             this.alertShow = true;
        //         });
        // }
    }
};
</script>  
<style scoped>
.upload-imgs {
    text-align: center;
    position: relative;
    background: #f5f5f5;
}
.upload-imgs p {
    line-height: 50px;
}
.uploadfile {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    height: 210px;
    width: 100%;
    z-index: 999;
    cursor: pointer;
}
.add {
    position: relative;
    width: 100%;
    height: 160px;
    z-index: 998;
}
.lookimg,
.lookimg img {
    width: 100%;
    height: 160px;
}
.add img {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
}
.red {
    color: red;
}
.close {
    display: none;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 30px;
    z-index: 9999;
    color: #333;
}
.upload-imgs:hover .close {
    display: block;
}
</style>