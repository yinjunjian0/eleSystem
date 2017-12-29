<template>
    <div class="box">
        <Form :model="formItem" ref="formItem" :label-width="80" :rules="formItemrule" class="form">
            <FormItem label="用户名" required prop="name">
                <Input v-model="formItem.name" placeholder=""></Input>
            </FormItem>
            <FormItem label="日期" required prop="date">
                <Row>
                    <Col span="11">
                        <DatePicker type="date" placeholder="" @on-change="setdate"></DatePicker>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="用电量" required prop="yongdian">
                <Input v-model="formItem.yongdian" placeholder=""></Input>
            </FormItem>
        </Form>
            
        <Button type="primary" @click="sub('formItem')">提交</Button>
    </div>
    
</template>
<script>
import axios from 'axios'
    export default {
        data () {
            return {
                formItem: {
                    name: '',
                    date: '',
                    yongdian:'',
                    handleFocus: 0
                },
                formItemrule:{
                    name: [
                        { required: true, message: '请输入名字', trigger: 'blur' }
                    ],
                    date: [
                        { required: true, message: '请输入日期', trigger: 'blur' }
                    ],
                    yongdian: [
                        { required: true, message: '请输入用电量', trigger: 'blur' }
                    ]
                }
            }
        },
        created:function(){

        },
        methods:{
            sub(a){
                this.$refs[a].validate((valid) => {
                    if (valid) {
                        var self = this
                        axios.post('/api/insertzd',{
                            name: self.formItem.name,
                            date: self.formItem.date,
                            yongdian:self.formItem.yongdian,
                        })
                          .then(function (response) {
                            self.$Message.success('添加成功');
                          })
                          .catch(function (error) {
                            self.$Message.error('未知错误');
                          });
                    }else {
                        this.$Message.error('添加失败, 注意填写要求');
                    }
                })
            },
            setdate(date){
                this.formItem.date = date
                },
            }
        }
</script>
<style type="text/css">
    .box{
        width: 400px;
        margin: auto;
        text-align: center
    }
</style>