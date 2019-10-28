<template>
  <div>
      <div class="h3-title">タイムスタンプを申請する</div>
      <div class="success-top">
          <div class="pic-ico">
              <img src="@/assets/images/success-icon.png" alt="">
              <p>成功したアプリケーション</p>
          </div>
          <div class="btnlink">
              <p><span @click="lookpdf(id)">タイムスタンプ認証証書を表示する</span></p>
              <p><b @click="$router.replace('/page/applytime')">続けて申請する</b></p>
          </div>
      </div>
      <div class="problem">
          <ul>
              <li>
                  <h3>申请成功后下一步我该怎么做？</h3>
                  <div class="answer">
                        1、立即下载可信时间戳认证证书(*.pdf)。<br>
                        2、将申请时间戳的原文件与时间戳认证证书(*.pdf) 妥善保存。<br>
                        3、如何获得时间戳证书（*.tsa）文件？下载的可信时间戳认证证书用Adobe Reader 打开，将附件中.tsa格式的时间戳证书保存到本地即可。
                  </div>
              </li>
              <li>
                  <h3>特别提示：</h3>
                  <div class="answer">
                        1、原文件内容在申请时间戳后不能做任何修改，以保证文件的原始性。文件内容如果发生任何改变(如打开后保存)都无法通过可信时间戳验证。如需查看或修改请将原文件备份并在复制文件上进行。<br>
                        2、时间戳证书 是由联合信任时间戳服务中心签发的具有法律效力的电子凭证，有效证明申请时间戳的电子文件自申请时起，内容保持完整、未被更改；符合《中华人民共和国电子签名发》所规定的数据电文原件形式的要求，是申请人保护自身权益的有效法律证据。<br>
                        3、时间戳认证证书 记载了原文件通过时间戳验证后的详细内容，主要用于时间戳认证信息的展示。
                  </div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        id:''
    };
  },

  components: {},

  computed: {},

  created(){
        console.log(this.$route.params.id)
        this.id=this.$route.params.id       
  },

  mounted(){},

  methods: {
      lookpdf(id){
            window.open(this.$baseURL+"personal/download?id="+this.id,'_blank'); 
        },
  }
}

</script>
<style scoped>
.h3-title {
    width: 100%;
    border-bottom: 4px solid #7499f5;
    color: #7499f5;
    font-size: 18px;
    padding-bottom: 12px;
    opacity: 0.8;
}
.success-top{
    text-align: center;
    padding-top:35px;
}
.pic-ico p{
    margin-top:18px;
    color:#000;
    opacity: .8;
    font-size: 18px;
}
.btnlink{
    margin-top: 30px;
    font-size: 16px;
    color:#7499f5;
}
.btnlink span{
    display: inline-block;
    padding: 5px 10px;
    border:1px solid #7499f5;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 20px; 
}
.btnlink span:hover{
    background:#7499f5;
    color:#fff;
}
.btnlink b{
    cursor: pointer;
}
.btnlink b:hover{
    opacity:.8
}
.problem{
    margin-top:48px;
}
.problem li{
    margin-bottom: 22px;
}
.problem li h3{
    padding:6px 13px;
    font-size:16px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(116,153,245,1);
    line-height:32px;
    opacity:0.8;
    background:rgba(116,153,245,.1);
    margin-bottom: 25px;
}
.answer{
    padding:0 10px; 
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(0,0,0,1);
    line-height:24px;
    opacity:0.6; 
}
</style>