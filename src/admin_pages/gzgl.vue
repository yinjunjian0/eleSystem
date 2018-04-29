<template>
    <div>
     <Button type="ghost" icon="plus" @click="edit">修改进度</Button>
     <Modal v-model="modal" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>修改</span>
        </p>
        <div style="text-align:center">
            <Form>
                <FormItem label="修改进度"  required>
                    <Select v-model="jinduselect" clearable>
                        <Option value="已查看">已查看</Option>
                        <Option value="已派人">已派人</Option>
                        <Option value="已完成">已完成</Option>
                    </Select>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long @click="confirm">确认</Button>
        </div>
    </Modal>
     <Table highlight-row ref="currentRowTable" border :columns="columns" :data="data6" style="margin-top: 10px;" @on-current-change="getRow"></Table>  
    </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      modal: false,
      jinduselect: "",
      id: "",
      columns: [
        {
          title: "用户",
          key: "name"
        },
        {
          title: "地址",
          key: "address"
        },
        {
          title: "类别",
          key: "type"
        },
        {
          title: "提交时间",
          key: "date"
        },
        {
          title: "描述",
          key: "content"
        },
        {
          title: "进度",
          key: "progress"
        },
        {
          title: "修改进度时间",
          key: "updatetime"
        }
      ],
      data6: [
        // {
        //     name: 'John Brown',
        //     date: '2017-1-1',
        //     problem: '水龙头坏了',
        //     jindu: 'New York No. 1 Lake Park'
        // }
      ],
      selectrow: ""
    };
  },
  created: function() {
    Date.prototype.Format = function(fmt) {
      //author: meizz
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    };
    this.inliz();
  },
  computed: {
    updatetime() {
      return new Date().Format("yyyy-MM-dd hh:mm:ss");
    }
  },
  methods: {
    getRow(currentRow) {
      console.log(currentRow);
      this.selectrow = currentRow.name;
      this.id = currentRow.id;
    },
    confirm() {
      var self = this;
      axios
        .post("/api/update_gzbx", {
          jindu: self.jinduselect,
          updatetime: self.updatetime,
          id: self.id
        })
        .then(function(response) {
          self.$Message.success("添加成功");
          self.modal = false;
          self.inliz();
        })
        .catch(function(error) {
          self.$Message.error("未知错误");
        });
    },
    edit() {
      if (this.selectrow == "") {
        this.$Message.error("请选中需要修改的行");
        return;
      } else {
        this.modal = true;
      }
    },
    inliz() {
      this.data6 = [];
      var self = this;
      axios
        .get("/api/getgz")
        .then(function(response) {
          var data = response.data.data;
          console.log(data);
          for (var index in data) {
            self.data6.push({
              id: data[index].id,
              name: data[index].name,
              address: data[index].address,
              type: data[index].type,
              date: data[index].date,
              content: data[index].content,
              progress: data[index].progress,
              updatetime: data[index].updatetime
            });
          }
        })
        .catch(function(error) {
          console.log("异常");
        });
    }
  }
};
</script>