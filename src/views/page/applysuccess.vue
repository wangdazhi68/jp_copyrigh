<template>
  <div>
      <div class="h3-title">タイムスタンプを申請する</div>
      <div class="success-top">
          <div class="pic-ico">
              <img src="@/assets/images/success-icon.png" alt="">
              <p>タイムスタンプの申請が完了しました。</p>
          </div>
          <div class="btnlink">
              <p><span @click="lookpdf(id)">タイムスタンプ認証証書を表示する</span></p>
              <p><span @click="looktsa(id)">TSA証明書をダウンロードする</span></p>
              <p><b @click="$router.replace('/page/applytime')">続けて申請する</b></p>
          </div>
      </div>
      <div class="problem">
          <ul>
              <li>
                  <h3>【タイムスタンプの申請が完了した後にすべきこと】</h3>
                  <div class="answer">
                        ステップ１：タイムスタンプ認証証書(*.pdf)とトークンファイル（*.tsa）をダウンロードする。<br>
                        ステップ２：対象資料、認証証書、トークンファイルの三つのファイルと１セットとして厳重に保管する。<br>
                  </div>
              </li>
              <li>
                  <h3>注意事項：</h3>
                  <div class="answer">
                        ・タイムスタンプを取得した後は、対象資料のデータの内容に対して厳重に保管し、如何なる修正もしないでください。<br>
                        ・データの内容に少しでも修正があった場合は認証が成功しません。内容の修正をした後に、再修正をして元の状態に復元したとしても認証は成功しませんのでご注意ください（ただし、対象資料のファイル名は変更しても認証には影響いたしません）。<br>
                        ・タイムスタンプは取得をした日時からデータが改ざんされていないことを証明するためのツールであり、それ以上の事実を証明するためには通常ほかの証拠と組み合わせる必要があります。<br>
                        ・タイムスタンプ証書（トークンファイル）は「中華人民共和国電子署名法」に規定する要件を満たしている電子的証拠です。<br>
                        ・タイムスタンプ認証証書はタイムスタンプの申請時の詳細情報を示すためのファイルです。
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
        id:'',
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
        looktsa(id){
            window.open(this.$baseURL+"personal/downloadtsa?id="+this.id,'_blank'); 
        }
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