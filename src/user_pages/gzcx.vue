<template>
  <div style="text-align: center;">
    <Card style="width:350px;margin:auto;text-align: left;">
        <p slot="title">
          <Icon type="ios-cog-outline"></Icon>     
          故障报修
        </p>
        <Form ref="failure" :model="failure" :rules="failurerule" style="text-align: center;">
            <FormItem prop="address" label="地址">
                <Input type="text" v-model="failure.address" placeholder="请输入地址">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="problem" label="故障类型">
                <Input type="text" v-model="failure.problem" placeholder="请输入故障问题">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem label="出现时间" style="height: 10px;" required></FormItem>
                <DatePicker type="date" placeholder="请输入出现时间" style="width: 200px"  @on-change="dataformat"></DatePicker>
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            <FormItem prop="remark" label="描述">
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
                address: '',
                problem: '',
                date: '',
                remark: '',
            },
            failurerule: {
                address: [
                    { required: true, message: '请输入地址', trigger: 'blur' }
                ],
                problem: [
                    { required: true, message: '请输入故障问题', trigger: 'blur' },
                ],
                date: [
                    { required: true, type: 'date', message: '请输入出现时间', trigger: 'change' },
                ],
                remark: [
                    { required: true, message: '请输入故障描述', trigger: 'blur' }
                ]
            },
        }
    },
    created:function(){
      
    },
    methods:{
        dataformat(date){
            this.failure.date = date
        },
        failuresub(name) {
           var self = this
           this.$refs[name].validate((valid) => {
                if (valid) {
                    axios.post('/api/gzbx',{
                        address: self.failure.address,
                        problem: self.failure.problem,
                        date: self.failure.date,
                        remark: self.failure.remark
                    })
                      .then(function (response) {
                        console.log(response.data)
                        if (response.data == '报修成功') {
                            self.$Message.success('报修成功');
                        }else{
                            self.$Message.error('报修失败, 注意填写要求');
                        }
                      })
                      .catch(function (error) {
                        self.$Message.error('未知错误');
                      });                        
                } else {
                    self.$Message.error('报修失败, 注意填写要求');
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
