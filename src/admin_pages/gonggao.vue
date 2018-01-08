<template>
    <div>
        <Button type="ghost" @click="openadd"  icon="plus">添加</Button>
        <Button type="ghost" @click="delselect"  icon="close">删除</Button>
        <Modal v-model="modal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除</span>
            </p>
            <div style="text-align:center">
                <p>确认删除 {{ selectrow }}?</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long  @click="del">确认</Button>
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
                selectrowid: ''
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
            var self = this
            this.Initialize()
        },
        methods:{
            getRow(currentRow){
                console.log(currentRow)
                this.selectrow = currentRow.name
                this.selectrowid = currentRow.id
            },
            openadd(){
                this.modal2 = true
            },
            add(name){
                var time = new Date().Format("yyyy-MM-dd hh:mm:ss")
                var self = this
                    this.$refs[name].validate((valid) => {
                    if (valid) {
                        // todo 添加请求
                        axios.post('/api/b_gonggao_insert',{
                            title : self.gonggao.title,
                            content: self.gonggao.content,
                            date : time
                        })
                          .then(function (response) {
                            self.$Message.success('添加成功');  
                            self.Initialize()
                            self.modal2 = false
                          })
                          .catch(function (error) {
                            self.$Message.error('失败');
                          });
                                
                    } else {
                        this.$Message.error('添加失败, 注意填写要求');
                    }
                })
            },
            delselect(){
                if (this.selectrow == '') {
                    this.$Message.error('请单击选中你想删除的行');
                }else{
                    this.modal = true
                }
            },
            del(){
                var self = this
                axios.post('/api/b_gonggao_delete',{
                    id : self.selectrowid,
                })
                  .then(function (response) {
                    var data = response.data.data
                    console.log(response)
                    self.$Message.success('删除成功');  
                    self.Initialize()
                    self.modal = false
                  })
                  .catch(function (error) {
                    self.$Message.error('失败');
                  });
            },
            Initialize(){
                var self = this
                this.data1 = []
                axios.get('/api/getgonggao')
                  .then(function (response) {
                    var data = response.data.data
                    console.log(data)
                    for (var index in data) {
                        self.data1.push({
                            id: data[index].id,
                            name: data[index].title,
                            content:data[index].content,
                            date: data[index].date
                        })
                    }
                  })
                  .catch(function (error) {
                    console.log('异常')
                  });
            }
        }
    }
</script>