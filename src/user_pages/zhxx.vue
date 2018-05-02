<template>
  <div style="text-align: center;">
    <Card style="width:350px;margin:auto;text-align: left;">
        <p slot="title">
          <Icon type="ios-cog-outline"></Icon>     
          账户信息
        </p>
        <ul>
          <li>用户名：<label>{{ username }}</label></li>
          <li>用户类型：<label>{{ type }}</label></li>
          <li>邮箱：<label>{{ email }}</label></li>
          <li>电话：<label>{{ phone }}</label></li>
          <li>余额(元)：<label>{{ yue }}</label></li>
          <li>备注：<label>{{ test }}</label></li>
        </ul>
    </Card>
    <p class="tips"><Icon type="ios-lightbulb-outline" style="width:30px;"></Icon>需要修改密码请浏览
      <strong>修改密码</strong>   页面</p>
  </div>
    
</template>
<script>
import axios from 'axios'
export default {
  data(){
    return {
      username: '',
      name: '',
      type: '',
      email: '',
      phone: '',
      test: '',
      yue:''
    }
  },
  created:function(){
    var self = this
    axios.post('/api/zhxx',{
        name: localStorage.getItem("username"),
    })
      .then(function (response) {
        console.log(response.data.data)
        self.username = response.data.data[0].user_name
        self.name = response.data.data[0].user_name
        self.type = response.data.data[0].user_type
        self.email = response.data.data[0].user_email
        self.phone = response.data.data[0].user_phone
        self.yue = response.data.data[0].yue
        self.test = ''
      })
      .catch(function (error) {
        self.$Message.error('未知错误');
      });     
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
