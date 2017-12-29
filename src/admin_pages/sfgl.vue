<template>
    <div class="box"><br>
        <h3><Icon type="help-circled" color="#57a3f3"></Icon> 请输入用户名后获得用户资料后进行费用管理</h3><br>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="user">
                <Input type="text" v-model="formInline.user" placeholder="请输入用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">获取用户资料</Button>
            </FormItem>
        </Form>
        <Card v-if="cardshow">
            <p slot="title">用户资料</p>
            <p>用户名 : {{ formInline.user }}</p>
            <p>余额 : {{ yue }}</p>
        </Card>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                cardshow: false,
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
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // todo 获取用户资料
                        this.$Message.success('Success!');
                        this.cardshow = true
                    } else {
                        this.$Message.error('Fail!');
                    }
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