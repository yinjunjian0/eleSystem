<template>
    <div class="box">
        <h3>请先选择用户类型 : </h3><br>
        <Select v-model="typeselect" style="width:200px">
            <Option value="jumin">居民用户</Option>
            <Option value="gongye">工业用户</Option>
        </Select>

        <Form v-if="this.typeselect == 'jumin'" :model="formItem" ref="formItem" :label-width="80" :rules="formItemrule" class="form">
            <br>
            <FormItem label="用户名" required prop="name">
                <Input v-model="formItem.name" placeholder=""></Input>
            </FormItem>
            <FormItem label="日期" required prop="date">
                <Row>
                    <Col span="11">
                        <DatePicker type="month" placeholder="" @on-change="setdate"></DatePicker>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="谷段" required prop="gu">
                <Input v-model="formItem.gu" placeholder=""></Input>
            </FormItem>
            <FormItem label="平段" required prop="ping">
                <Input v-model="formItem.ping" placeholder=""></Input>
            </FormItem>
            <FormItem label="峰段" required prop="feng">
                <Input v-model="formItem.feng" placeholder=""></Input>
            </FormItem>
            <h3>当前电费为 : {{ jumintotal }} 元</h3><br>
            <Button type="primary" @click="sub('formItem')">提交</Button>
        </Form>

        <Form v-if="this.typeselect == 'gongye'" :model="formItem" ref="formItem" :label-width="80" :rules="formItemrule" class="form">
            <br>
            <FormItem label="用户名" required prop="name">
                <Input v-model="formItem.name" placeholder=""></Input>
            </FormItem>
            <FormItem label="日期" required prop="date">
                <Row>
                    <Col span="11">
                        <DatePicker type="month" placeholder="" @on-change="setdate"></DatePicker>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="用电量" required prop="yongdian">
                <Input v-model="formItem.yongdian" placeholder=""></Input>
            </FormItem>
            
            <h3>当前电费为 : {{ gongyetotal }} 元</h3><br>
            <Button type="primary" @click="sub('formItem')">提交</Button>
        </Form>
            
    </div>
    
</template>
<script>
import axios from 'axios'
    export default {
        data () {
            return {
                typeselect:'',
                formItem: {
                    name: '',
                    date: '',
                    yongdian:0,
                    gu: 0,
                    ping: 0,
                    feng: 0,
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
        computed:{
            jumintotal(){
                return (parseInt(this.formItem.gu) * 0.6 + parseInt(this.formItem.feng) * 0.8 + parseInt(this.formItem.ping) * 0.7).toFixed(2)
            },
            gongyetotal(){
                return (parseInt(this.formItem.yongdian) * 0.6).toFixed(2)
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