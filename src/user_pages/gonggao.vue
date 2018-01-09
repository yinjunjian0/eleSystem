<template>
    <div style="text-align: center">
      <p>单位均为 <label>* 元 / 度</label></p>
      <p><Icon type="arrow-graph-up-right" style="color:green"></Icon> 居民用户采用 <label>阶梯型</label> 收费</p>
      <Table :columns="columns1" :data="data1"></Table><br>
      <p><Icon type="ios-alarm-outline" style="color:green"></Icon> 工业用户采用 <label>时段型</label> 收费</p>
      <Table :columns="columns2" :data="data2"></Table>
    </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      columns1: [
                    {
                        title: '用户类型',
                        key: 'type'
                    },
                    {
                        title: '谷段',
                        key: 'gu'
                    },
                    {
                        title: '峰段',
                        key: 'feng'
                    },
                    {
                        title: '平段',
                        key: 'ping'
                    }
                ],
                data1: [
                    {
                        type: '居民用户',
                        gu: 0.5,
                        feng: 0.7,
                        ping: 0.6
                    }
                ],
      columns2: [
                    {
                        title: '用户类型',
                        key: 'type'
                    },
                    {
                        title: '1-10千度',
                        key: 'Period_1'
                    },
                    {
                        title: '10-20千度',
                        key: 'Period_2'
                    },
                    {
                        title: '20-35千度',
                        key: 'Period_3'
                    },
                    {
                        title: '35千度以上',
                        key: 'Period_4'
                    }
                ],
                data2: [
                    {
                        type: '工业用户',
                        Period_1: 0.9,
                        Period_2: 0.85,
                        Period_3: 0.8,
                        Period_4: 0.75,
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
p{
   font-size: 16px;
   line-height: 34px;
}
label{
  color: red;
}
</style>  
