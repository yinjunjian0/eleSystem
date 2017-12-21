<template>
    <div class="box">
        <Card class="Card">
            <h3 style="height: 40px;">电力系统</h3>
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="user">
                    <Input type="text" v-model="formInline.user" placeholder="请输入账号">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="请输入密码">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem><br>
                <FormItem prop="identity">
                    <RadioGroup v-model="formInline.identity">
                        <Radio label="用户">用户</Radio>
                        <Radio label="管理员">管理员</Radio>
                        <Radio label="数据管理员">数据管理员</Radio>
                    </RadioGroup>
                </FormItem><br>
                <FormItem>
                    <Button type="info" @click="handleSubmit('formInline')">登陆</Button>
                    <Button @click="modal2 = true">注册</Button>
                    <Modal v-model="modal2" width="360">
                        <p slot="header" style="color:#f60;text-align:center">
                            <Icon type="information-circled"></Icon>
                            <span>用户注册</span>
                        </p>
                        <Form ref="regisinline" :model="regisinline" :rules="regisrule" style="text-align: center;">
                            <FormItem prop="user">
                                <Input type="text" v-model="regisinline.user" placeholder="请输入用户名">
                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                            <FormItem prop="password">
                                <Input type="text" v-model="regisinline.password" placeholder="请输入密码">
                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                            <FormItem prop="phone">
                                <Input type="text" v-model="regisinline.phone" placeholder="请输入手机">
                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                            <FormItem prop="email">
                                <Input type="text" v-model="regisinline.email" placeholder="请输入邮箱">
                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                            <FormItem prop="identity">
                                <RadioGroup v-model="regisinline.identity">
                                    <label>用户类型 ： </label>
                                    <Radio label="居民用电">居民用电</Radio>
                                    <Radio label="大工业用电">大工业用电</Radio>
                                </RadioGroup>
                            </FormItem>
                            <p><Icon type="android-happy"></Icon> 注册功能仅开放 <strong>用户角色</strong></p>
                        </Form>
                        <div slot="footer">
                            <Button type="error" size="large" long :loading="modal_loading" @click="regis('regisinline')">确认</Button width="100%">
                        </div>
                    </Modal>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data () {
        return {
            modal2: false,
            modal_loading: false,
            formInline: {
                user: '',
                password: '',
                identity: '',
            },
            ruleInline: {
                user: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 1, message: '密码至少为6位', trigger: 'blur' }
                ],
                identity: [
                    { required: true, message: '请选择身份', trigger: 'change' },
                ]
            },
            // 注册
            regisinline: {
                user: '',
                password: '',
                phone: '',
                email: '',
                identity: ''
            },
            regisrule: {
                user: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码至少为6位', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机', trigger: 'blur' },
                    { type: 'string', min: 11, message: '手机为11位数字', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' }
                ],
                identity: [
                    { required: true, message: '请选择身份', trigger: 'change' },
                ]
            },
        }
    },
    created:function(){
        
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this.formInline.identity == '用户') {
                        if(this.formInline.user == 1 && this.formInline.password == 1){
                            this.$Message.success('登陆成功');
                            // ajax请求
                            // axios.get('/sql/login.php')
                            //   .then(function (response) {
                            //     console.log(response);
                            //   })
                            //   .catch(function (error) {
                            //     console.log(error);
                            //   });
                            this.$router.push('user')
                        }else{
                            this.$Message.error('用户名或密码错误');
                        }
                    }else if(this.formInline.identity == '管理员'){
                        if(this.formInline.user == 1 && this.formInline.password == 1){
                            this.$Message.success('登陆成功');
                            this.$router.push('admin')
                        }else{
                            this.$Message.error('用户名或密码错误');
                        }
                    }else if(this.formInline.identity == '数据管理员'){
                        if(this.formInline.user == 1 && this.formInline.password == 1){
                            this.$Message.success('登陆成功');
                            this.$router.push('dataadmin')
                        }else{
                            this.$Message.error('用户名或密码错误');
                        }
                    }
                    
                } else {
                    if (this.formInline.user == '' || this.formInline.password == '') {
                        this.$Message.error('用户名或密码不能为空');

                    }else if(this.formInline.identity == ''){
                        this.$Message.error('请选择身份');
                    }
                }
            })
        },
        regis(name) {

            this.$refs[name].validate((valid) => {
                if (valid) {
                    // todo 后端注册请求
                                        
                    this.$Message.success('注册成功');
                } else {
                    this.$Message.error('注册失败, 注意填写要求');

                }
            })
        },
        del () {
            this.modal_loading = true;
            setTimeout(() => {
                this.modal_loading = false;
                this.modal2 = false;
                this.$Message.success('Successfully delete');
            }, 2000);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
    width: 100%;
    height: 1200px;
    background: linear-gradient(to top, AliceBlue, Lavender);
    overflow: hidden;
}
.Card{
    width: 400px;
    margin: 0 auto;
    margin-top: 200px;
    text-align: center;
}
Button{
}

</style>  
