<template>
    <div class="box"><br>
        <h3><Icon type="help-circled" color="#57a3f3"></Icon> 请输入用户名后获得用户资料后进行费用管理</h3><br>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="user">
                <Input type="text" v-model="formInline.user" placeholder="请输入用户名" @on-enter="handleSubmit('formInline')">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">获取用户资料</Button>
            </FormItem>
        </Form>
        <Card v-if="cardshow">
            <h4 slot="title">用户资料</h4>
            <h4>用户名 : {{ name }}</h4>
            <h4>余额 : {{ yue }} 元</h4>
            <h4>用户类型 : {{ type }}</h4>
            <h4>当月电费 : {{ nowdianfei }} 元</h4><br>
            <Button type="primary" @click="shoufei">收费</Button>
        </Card>
        <Modal v-model="modal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>收费</span>
            </p>
            <div style="text-align:center">
                <p>确认 收费 ? </p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long  @click="confirmshoufei">确认</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import axios from 'axios'
    export default {
        data () {
            return {
                modal: false,
                cardshow: false,
                name: '',
                yue: '',
                type: '',
                nowdianfei:'',
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                },
                now_Date:''
            }
        },
        created:function(){
            Date.prototype.Format = function (fmt) { //author: meizz 
                var o = {
                    "M+": this.getMonth() + 1, //月份 
                    "d+": this.getDate(), //日 
                    "h+": this.getHours(), //小时 
                    "m+": this.getMinutes(), //分 
                    "s+": this.getSeconds(), //秒 
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                    "S": this.getMilliseconds() //毫秒 
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
            this.now_Date = new Date().Format("yyyy-MM")
        },
        methods: {
            handleSubmit(name) {
                var self = this
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // todo 获取用户资料
                        this.getyhzl()
                         
                    } else {
                        this.$Message.error('输入用户名');
                    }
                })
            },
            shoufei(){
                if(this.yue > this.nowdianfei){
                    this.modal = true
                }else{
                    this.$Message.error('余额不足或未录入');
                }
            },
            confirmshoufei(){
                var self = this
                axios.post('/api/updateyue',{
                    yue: parseFloat(self.yue) - parseFloat(self.nowdianfei),
                    name: self.formInline.user
                })
                .then(function (response) {
                    self.modal = false
                    self.$Message.success('扣费成功');
                    axios.post('/api/insertrecord',{
                        name: self.formInline.user,
                        date: self.now_Date,
                        dianfei: self.nowdianfei
                    })
                    .then(function (response) {
                        console.log(response)
                        self.refresh()
                        self.$Message.success('记录成功');
                    })
                    .catch(function (error) {
                        self.$Message.error('未知错误');
                    }); 
                    console.log(response)
                })
                .catch(function (error) {
                    self.$Message.error('未知错误');
                }); 
            },
            getyhzl(){
                var self = this
                axios.post('/api/zhxx',{
                    name: self.formInline.user,
                })
                .then(function (response) {
                    if(response.data.data.length == 0){
                        self.$Message.error('用户名错误');
                        return 
                    }
                    self.inliz()
                    self.$Message.success('Success!');
                    self.cardshow = true
                    console.log(response.data.data)
                    self.name = response.data.data[0].user_name
                    self.type = response.data.data[0].user_type
                    self.yue = response.data.data[0].yue
                    axios.post('/api/selectname_juminzd',{
                        name: self.formInline.user,
                    })
                    .then(function (response) {
                        if(response.data.data.length == 0){
                            self.$Message.error('当月数据尚未录入');
                            self.nowdianfei = '未录入'
                            return 
                        }
                        self.nowdianfei = response.data.data[0].dianfei
                    })
                    .catch(function (error) {
                        self.$Message.error('未知错误');
                    }); 
                })
                .catch(function (error) {
                    self.$Message.error('未知错误');
                });
            },
            inliz(){
                this.name = ''
                this.yue = ''
                this.type = ''
                this.nowdianfei = ''
            },
            refresh(){
                var self = this
                axios.post('/api/zhxx',{
                    name: self.formInline.user,
                })
                .then(function (response) {
                    self.inliz()
                    self.name = response.data.data[0].user_name
                    self.type = response.data.data[0].user_type
                    self.yue = response.data.data[0].yue
                })
                .catch(function (error) {
                    self.$Message.error('未知错误');
                });
                axios.post('/api/selectname_juminzd',{
                    name: self.formInline.user,
                })
                .then(function (response) {
                    self.nowdianfei = response.data.data[0].dianfei
                })
            }
        }
    }
</script>
<style type="text/css">
    .box{
        width: 50%;
        text-align: center;
        margin: auto;
    }
</style>