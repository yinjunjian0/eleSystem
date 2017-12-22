<template>
  <div style="text-align: center;">
    <Card style="width:350px;margin:auto;text-align: left;">
        <p slot="title">
          <Icon type="ios-cog-outline"></Icon>     
          账户信息
        </p>
        <ul>
          <li>用户名：</li>
          <li>姓名：</li>
          <li>用户类型：</li>
          <li>邮箱：</li>
          <li>电话：</li>
          <li>备注：</li>
        </ul>
    </Card>
    <p class="tips"><Icon type="ios-lightbulb-outline" style="width:30px;"></Icon>需要修改密码请浏览
      <strong>修改密码</strong>   页面</p>
  </div>
    
</template>
<script>
    export default {
        created:function(){
          // todo 载入资料请求
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li{
  font-size: 16px;
  line-height: 26px;
}
.tips{
  font-size: 16px;
  margin-top: 20px;
}
</style>  
