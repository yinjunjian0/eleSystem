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
            <FormItem prop="date" label="出现时间">
              <DatePicker type="date" placeholder="请输入故障出现时间" style="width: 100%" v-model="failure.date"></DatePicker>
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
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
        failuresub(name) {
          this.$refs[name].validate((valid) => {
                if (valid) {
                    // todo 后端注册请求
                                        
                    this.$Message.success('注册成功');
                } else {
                    this.$Message.error('注册失败, 注意填写要求');

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
