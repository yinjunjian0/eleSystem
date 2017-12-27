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
import axios from 'axios'
export default {
    data () {
        return {
            columns1: [
                {
                    title: '用户名',
                    key: 'user_name'
                },
                {
                    title: '月份',
                    key: 'date'
                },
                {
                    title: '用电',
                    key: 'yongdian'
                }
            ],
            data1: [
                // {
                //     name: 'John Brown',
                //     yongdian: 18,
                //     month: '2016-10-03'
                // }
            ]
        }
    },
    created:function(){
        var self = this
        axios.post('/api/zdcx',{
            name: localStorage.getItem("username"),
        })
          .then(function (response) {
            console.log(response.data.data)
            var arr = response.data.data
            for (var index in arr){
                self.data1.push(response.data.data[index])
            }
          })
          .catch(function (error) {
            self.$Message.error('未知错误');
          });     
      }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
	text-align: center;width:400px;margin:auto;
}
</style>  
