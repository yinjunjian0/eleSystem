<template>
    <div>
        <Button type="ghost" @click="removerow" icon="close">删除</Button>
        <p style="height: 10px;"></p>
        <Table highlight-row border :columns="columns7" :data="data6" @on-current-change="getRow"></Table>
        <Modal v-model="modal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除</span>
            </p>
            <div style="text-align:center">
                <p>确认删除 ?</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long  @click="remove">确认</Button>
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
                columns7: [
                    {
                        title: '题目',
                        key: 'title',
                    },
                    {
                        title: '用户名',
                        key: 'name',
                    },
                    {
                        title: '类型',
                        key: 'type'
                    },
                    {
                        title: '内容',
                        key: 'content'
                    },
                    {
                        title: '日期',
                        key: 'date'
                    }
                ],
                data6: [
                    // {
                    //     title: 'John Brown',
                    //     name: 18,
                    //     content:'',
                    //     date: 'New York No. 1 Lake Park'
                    // }
                ],
                selectrowid: ''
            }
        },
        created:function(){
            this.Initialize()
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            removerow(){
                if(!this.selectrowid){
                    this.$Message.error('请单击选中你想删除的行');
                }else{
                    this.modal = true
                }
            },
            remove () {
                var self = this
                // todo ajax删除留言
                axios.post('/api/b_ly_delete',{
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
            getRow(currentRow){
                console.log(currentRow)
                this.selectrowid = currentRow.id
            },
            Initialize(){
                var self = this
                this.data6 = []
                axios.get('/api/getly')
                  .then(function (response) {
                    var data = response.data.data
                    console.log(data)
                    for (var index in data) {
                        self.data6.push({
                            id: data[index].id,
                            title: data[index].title,
                            name: data[index].name,
                            type: data[index].type,
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