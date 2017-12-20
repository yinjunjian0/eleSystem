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
                    <Button type="primary" @click="handleSubmit('formInline')">登陆</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>
<script>
export default {
    data () {
        return {
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
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if(this.formInline.user == 1 && this.formInline.password == 1){
                        this.$Message.success('登陆成功');
                        this.$router.push('user')
                    }else{
                        this.$Message.error('用户名或密码错误');
                    }
                } else {
                    if (this.formInline.user == '' || this.formInline.password == '') {
                        this.$Message.error('用户名或密码不能为空');
                    }else if(this.formInline.identity == ''){
                        this.$Message.error('请选择身份');
                    }
                }
            })
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

</style>  
