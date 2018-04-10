<template>
<div>
    <div style="text-align: center;">
      <p><Icon type="close-circled" style="width:30px"></Icon>抱歉,暂时不支持网上付费功能</p>
      <p style="color:green"><Icon type="checkmark" style="width:30px"></Icon>用户可以到相关工作点充值或联系客服进行充值</p>
      <p style="color:red;cursor:pointer" @click="modal1 = true">点击获取客服微信二维码。</p>
    </div>
    
    <Modal
        v-model="modal1"
        title="微信二维码"
        >
        <img src="../assets/wechat.jpg" alt="" style="width:100%;height:auto">
    </Modal>
</div>
    
</template>

<script>
export default {
  data() {
    return {
      modal1: false
    };
  },
  created: function() {
    // todo 载入资料请求
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  letter-spacing: 3px;
  font-size: 18px;
  color: red;
  line-height: 40px;
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.ivu-modal {
  top: 0;
}
</style>  
