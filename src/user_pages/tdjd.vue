<template>
    <div>
    <Table :columns="columns1" :data="data1"></Table>
  </div>
</template>
<script>
import axios from 'axios'
    export default {
        data () {
            return {
                modal1: false,
                columns1: [
                    {
                        title: '通知',
                        key: 'title'
                    },
                    {
                        title: '发表时间',
                        key: 'date',
                        width: 160,
                    },
                    {
                        title: '查看内容',
                        key: 'content',
                        width: 110,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '点击查看'),
                            ]);
                        }
                    }
                ],
                data1: [
                    
                ]
            }
        },
        created:function(){
            var self = this
            axios.get('/api/getgonggao')
              .then(function (response) {
                let data = response.data.data
                for (var index in data) {
                    self.data1.push({
                        title: data[index].title,
                        date: data[index].date,
                        content: data[index].content
                    })
                }
              })
              .catch(function (error) {
                self.$Message.error('未知错误');
              });        
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: '内容',
                    content: `<strong>${this.data1[index].title}</strong><br><br>` + `${this.data1[index].content}`
                })
            },
        }
    }
</script>