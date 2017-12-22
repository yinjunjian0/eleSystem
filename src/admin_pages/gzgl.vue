<template>
    <Table border :columns="columns" :data="data6"></Table>
</template>
<script>
    export default {
        data () {
            return {
                columns: [
                    {
                        title: '用户',
                        key: 'name',
                    },
                    {
                        title: '故障问题',
                        key: 'problem'
                    },
                    {
                        title: '提交时间',
                        key: 'date'
                    },
                    {
                        title: '进度',
                        key: 'jindu',
                        width: 500,
                    }
                ],
                data6: [
                    {
                        name: 'John Brown',
                        date: '2017-1-1',
                        problem: '水龙头坏了',
                        jindu: 'New York No. 1 Lake Park'
                    }
                ]
            }
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