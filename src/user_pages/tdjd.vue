<template>
    <div>
    <Table :columns="columns1" :data="data1"></Table>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                 modal1: false,
                columns1: [
                    {
                        title: '停电通知',
                        key: 'title'
                    },
                    {
                        title: '发表时间',
                        key: 'date',
                        width: 160,
                    },
                    {
                        title: '查看内容',
                        key: 'date',
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
                    {
                        title: '碧桂园停水通知1',
                        date: '2016-10-03'
                    },
                    {
                        title: '碧桂园停水通知2',
                        date: '2016-10-01'
                    },
                    {
                        title: '碧桂园停水通知3',
                        date: '2016-10-02'
                    },
                    {
                        title: '碧桂园停水通知4',
                        date: '2016-10-04'
                    }
                ]
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: '内容',
                    content: `${this.data1[index].title}`
                })
            },
        }
    }
</script>