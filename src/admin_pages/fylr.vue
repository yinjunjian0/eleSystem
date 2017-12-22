<template>
    <div>
      <Table :columns="columns1" :data="data1"></Table>
      
    </div>
</template>
<script>
    export default {
        data () {
            return {
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
                    //     age: 18,
                    //     content: 'New York No. 1 Lake Park',
                    //     date: '2016-10-03'
                    // },  
                    
                ]
            }
        }
    }
</script>