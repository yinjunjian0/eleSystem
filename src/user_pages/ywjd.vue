<template>
    <Table :columns="columns1" :data="data1"></Table>
</template>
<script>
    export default {
        data () {
            return {
                modal1: false,
                columns1: [
                    {
                        title: '问题',
                        key: 'title'
                    },
                    {
                        title: '处理进度',
                        key: 'jindu',
                    },
                    {
                        title: '更新时间',
                        key: 'date',
                        width: 160,
                    },
                ],
                data1: [
                    {
                        title: '碧桂园停水通知',
                        date: '2016-10-03',
                        jindu: '处理中',
                    },
                ]
            }
        }
    }
</script>