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
