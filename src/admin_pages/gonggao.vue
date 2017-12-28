<template>
    <div>
        <Button type="ghost" @click="openadd"  icon="plus">添加</Button>
        <Button type="ghost" @click="modal = true"  icon="close">删除</Button>
        <Modal v-model="modal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除</span>
            </p>
            <div style="text-align:center">
                <p>确认删除 {{ selectrow }}?</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="del">确认</Button>
            </div>
        </Modal>
        <Table highlight-row ref="currentRowTable" :columns="columns1" :data="data1" style="margin-top: 10px;" @on-current-change="getRow"></Table>
        <Modal v-model="modal2">
            <p slot="header" style="color:#2d8cf0;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>添加</span>
            </p>
            <Form ref="gonggao" :model="gonggao" :rules="gonggaorule" style="text-align: center;">
                <FormItem prop="title" label="标题">
                    <Input type="text" v-model="gonggao.title" placeholder="请输入题目">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
               
                <FormItem prop="content" label="内容">
                    <Input type="textarea" v-model="gonggao.content" placeholder="请输入邮箱">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" size="large" long :loading="modal_loading" @click="add('gonggao')">确认</Button width="100%">
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
                modal2: false,
                modal_loading: false,
                gonggao: {
                    title: '',
                    content: ''
                },
                gonggaorule: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入内容', trigger: 'blur' }
                    ] 
                },
                columns1: [
                    {
                        title: '题目',
                        key: 'name'
                    },
                    {
                        title: '内容',
                        key: 'content'
                    },
                    {
                        title: '发表时间',
                        key: 'date',
                        width:160
                    }
                ],
                data1: [
                    // {
                    //     name: 'John Brown',
                    //     content: 'New York No. 1 Lake Park',
                    //     date: '2016-10-03'
                    // },  
                ],
                selectrow: '',
            }
        },
        created:function(){
            var self = this
            axios.get('/api/getgonggao')
              .then(function (response) {
                var data = response.data.data
                console.log(data)
                for (var index in data) {
                    self.data1.push({
                        id: data[index].id,
                        name: data[index].title,
                        content:data[index].content,
                        data: data[index].date
                    })
                }
              })
              .catch(function (error) {
                console.log('异常')
              });
        },
        methods:{
            getRow(currentRow){
                console.log(currentRow)
                this.selectrow = currentRow.name
            },
            openadd(){
                this.modal2 = true
            },
            add(name){
                var self = this
                    this.$refs[name].validate((valid) => {
                    if (valid) {
                        // todo 添加请求
                        this.$Message.success('添加成功');          
                    } else {
                        this.$Message.error('添加失败, 注意填写要求');
                    }
                })
            },
            del(){
                if (this.selectrow == '') {
                    this.$Message.error('请单击选中你想删除的行');
                }else{
                    // todo 删除请求
                    this.$Message.error(this.selectrow);
                }
            }
        }
    }
</script>