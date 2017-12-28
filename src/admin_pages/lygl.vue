<template>
    <Table border :columns="columns7" :data="data6"></Table>
</template>
<script>
import axios from 'axios'
    export default {
        data () {
            return {
                columns7: [
                    {
                        title: 'title',
                        key: 'title',
                    },
                    {
                        title: 'name',
                        key: 'name',
                    },
                    {
                        title: 'type',
                        key: 'type'
                    },
                    {
                        title: 'content',
                        key: 'content'
                    },
                    {
                        title: 'date',
                        key: 'date'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            console.log(this)
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data6: [
                    // {
                    //     title: 'John Brown',
                    //     name: 18,
                    //     content:'',
                    //     date: 'New York No. 1 Lake Park'
                    // }
                ]
            }
        },
        created:function(){
            var self = this
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
        },
        methods: {
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
            }
        }
    }
</script>