<template>
    <div>
     <Button type="ghost" icon="plus" @click="edit">修改进度</Button>
     <Modal v-model="modal" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>修改</span>
        </p>
        <div style="text-align:center">
            <Form>
                <FormItem label="修改进度"  required>
                    <Select v-model="jinduselect" clearable>
                        <Option value="beijing">已查看</Option>
                        <Option value="shanghai">已派人</Option>
                        <Option value="shenzhen">已完成</Option>
                    </Select>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long >确认</Button>
        </div>
    </Modal>
     <Table highlight-row ref="currentRowTable" border :columns="columns" :data="data6" style="margin-top: 10px;" @on-current-change="getRow"></Table>  
    </div>
</template>
<script>
import axios from 'axios'
    export default {
        data () {
            return {
                modal: false,
                jinduselect: '',
                columns: [
                    {
                        title: '用户',
                        key: 'name',
                    },
                    {
                        title: '地址',
                        key: 'address'
                    },
                    {
                        title: '类别',
                        key: 'type'
                    },
                    {
                        title: '提交时间',
                        key: 'date',
                    },
                    {
                        title: '描述',
                        key: 'content',
                    },
                    {
                        title: '进度',
                        key: 'progress',
                    },
                    {
                        title: '修改进度时间',
                        key: 'updatetime',
                    }
                ],
                data6: [
                    // {
                    //     name: 'John Brown',
                    //     date: '2017-1-1',
                    //     problem: '水龙头坏了',
                    //     jindu: 'New York No. 1 Lake Park'
                    // }
                ],
                selectrow:''
            }
        },
        created:function(){
            var self = this
            axios.get('/api/getgz')
              .then(function (response) {
                var data = response.data.data
                console.log(data)
                for (var index in data) {
                    self.data6.push({
                        id: data[index].id,
                        name: data[index].name,
                        address:data[index].address,
                        type: data[index].type,
                        date: data[index].date,
                        content: data[index].content,
                        progress: data[index].progress,
                        updatetime: data[index].updatetime
                    })
                }
              })
              .catch(function (error) {
                console.log('异常')
              });
        },
        methods: {
            getRow(currentRow){
                console.log(currentRow)
                this.selectrow = currentRow.name
            },
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                // todo ajax删除留言
                alert('删除')
                this.data6.splice(index, 1);
            },
            edit(){
                if (this.selectrow == '') {
                    this.$Message.error('请选中需要修改的行');
                    return
                }else{
                    this.$Message.success(this.selectrow);
                    this.modal = true
                }
            }
        }
    }
</script>