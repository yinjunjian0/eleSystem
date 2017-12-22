<template>
	<div class="box">
	    <p>
	    	选择查询月份 : 
	    	<DatePicker type="month" placeholder="Select month" style="width: 200px"></DatePicker>
	    </p><br>
	    <template>
		    <Table :columns="columns1" :data="data1"></Table>
		</template>
	</div>
</template>
<script>
    export default {
        data () {
            return {
                columns1: [
                    {
                        title: '用户名',
                        key: 'name'
                    },
                    {
                        title: '月份',
                        key: 'month'
                    },
                    {
                        title: '用电',
                        key: 'yongdian'
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        yongdian: 18,
                        month: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        yongdian: 24,
                        month: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        yongdian: 30,
                        month: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        yongdian: 26,
                        month: '2016-10-04'
                    }
                ]
            }
        },
        methods:{
        	
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
	text-align: center;width:400px;margin:auto;
}
</style>  
