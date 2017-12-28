<template>
  <div style="text-align: center;">
    <Card style="width:350px;margin:auto;text-align: left;">
        <p slot="title">
          <Icon type="ios-cog-outline"></Icon>     
          留言
        </p>
        <Form ref="failure" :model="failure" :rules="failurerule" style="text-align: center;">
            <FormItem prop="title" label="留言标题">
                <Input type="text" v-model="failure.title" placeholder="请输入留言标题">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem label="问题类型" prop="liuyanType">
                <Select v-model="failure.liuyanType" placeholder="问题类型">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            <FormItem prop="remark" label="留言内容">
                <Input type="textarea" v-model="failure.remark" placeholder="请输入故障描述">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <Button type="ghost" @click="failuresub('failure')">确认报修</Button>
        </Form>
    </Card>
  </div>
    
</template>
<script>
import axios from 'axios'
    export default {
      data () {
        return {
            failure: {
                title: '',
                liuyanType: '',
                date: '',
                remark: '',
            },
            failurerule: {
                title: [
                    { required: true, message: '请输入留言标题', trigger: 'blur' }
                ],
                liuyanType: [
                    { required: true, message: '请选择问题类型', trigger: 'change' },
                ],
                remark: [
                    { required: true, message: '请输入留言', trigger: 'blur' }
                ]
            },
        }
    },
    created:function(){
      Date.prototype.format = function(fmt) { 
             var o = { 
                "M+" : this.getMonth()+1,                 //月份 
                "d+" : this.getDate(),                    //日 
                "h+" : this.getHours(),                   //小时 
                "m+" : this.getMinutes(),                 //分 
                "s+" : this.getSeconds(),                 //秒 
                "q+" : Math.floor((this.getMonth()+3)/3), //季度 
                "S"  : this.getMilliseconds()             //毫秒 
            }; 
            if(/(y+)/.test(fmt)) {
                    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
            }
             for(var k in o) {
                if(new RegExp("("+ k +")").test(fmt)){
                     fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                 }
             }
            return fmt; 
        }   
    },
    methods:{
        failuresub(name) {
            var self = this
            self.failure.date = new Date().format("yyyy-MM-dd hh:mm:ss");
            this.$refs[name].validate((valid) => {
                if (valid) {
                    axios.post('/api/ly',{
                        title: self.failure.title,
                        type: self.failure.liuyanType,
                        content: self.failure.remark,
                        date: self.failure.date
                    })
                      .then(function (response) {
                        console.log(response)
                        if (response.data == '留言成功') {
                            self.$Message.success('留言成功');
                        }else{
                            self.$Message.error('留言失败, 注意填写要求111');
                        }
                      })
                      .catch(function (error) {
                        self.$Message.error('未知错误');
                      });                       
                } else {
                    this.$Message.error('留言失败, 注意填写要求');
                }
            })
        }
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
