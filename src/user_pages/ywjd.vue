<template>
    <Table :columns="columns1" :data="data1"></Table>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      modal1: false,
      columns1: [
        {
          title: "用户名",
          key: "name"
        },
        {
          title: "问题",
          key: "title"
        },
        {
          title: "处理进度",
          key: "jindu"
        },
        {
          title: "更新时间",
          key: "date",
          width: 160
        }
      ],
      data1: []
    };
  },
  created: function() {
    var self = this;
    axios
      .post("/api/select_gzwhere", {
        name: localStorage.getItem("username")
      })
      .then(function(response) {
        let data = response.data.data;
        console.log(data);
        for (var index in data) {
          self.data1.push({
            name: data[index].name,
            title: data[index].content,
            date: data[index].date,
            jindu: data[index].progress
          });
        }
      })
      .catch(function(error) {
        self.$Message.error("未知错误");
      });
  }
};
</script>