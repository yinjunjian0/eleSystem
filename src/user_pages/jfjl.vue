<template>
  <div class="box">
      <p>
        选择查询月份 : 
        <DatePicker type="month" placeholder="选择月份" style="width: 200px"></DatePicker>
      </p><br>
      <h3>以下账单为已缴清数据。</h3><br>
      <Table :columns="columns1" :data="data1"></Table>
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
                        key: 'name'
                    },
                    {
                        title: '月份',
                        key: 'month'
                    },
                    {
                        title: '用电(度)',
                        key: 'yongdian'
                    }
                ],
                data1: [

                ]
            }
        },
        created:function(){
            var self = this
            axios.get('/api/b_record_select')
              .then(function (response) {
                console.log(response.data.data)
                let data  = response.data.data
                for (var index in data) {
                    self.data1.push({
                        name: data[index].user_name,
                        month: data[index].date,
                        yongdian: data[index].dianfei,
                        yorn: data[index].yorn,
                    })
                }
              })
              .catch(function (error) {
                self.$Message.error('未知错误');
              }); 
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
