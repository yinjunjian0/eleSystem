<template>
    <div>
        <Button type="ghost" @click="clearRow();modal1 = true">增加</Button>
        <Modal v-model="modal1" title="添加一条数据">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" >
                <FormItem prop="user" label="用户名">
                    <Input type="text" v-model="formInline.user" >
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="yongdian" label="用电量">
                    <Input type="text" v-model="formInline.yongdian" >
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="dianfei" label="电费">
                    <Input type="text" v-model="formInline.dianfei" >
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="date" label="电费月份(请选择时间)" style="display:inline"></FormItem>
                <DatePicker type="month" @on-change="setdate" style="width: 200px"></DatePicker>
            </Form>
            <div slot="footer">
                <Button type="primary" size="large" long @click="handleSubmit('formInline')">添加</Button>
            </div>
        </Modal>
        <Button type="ghost" @click="setone('2');">编辑</Button>
        <Modal v-model="modal2" title="编辑">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" >
                <FormItem prop="user" label="用户名">
                    <Input type="text" v-model="formInline.user" >
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="yongdian" label="用电量">
                    <Input type="text" v-model="formInline.yongdian" >
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="dianfei" label="用电量">
                    <Input type="text" v-model="formInline.dianfei" >
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="date" label="电费月份(请选择时间)" style="display:inline"></FormItem>
                <DatePicker type="month" @on-change="setdate" style="width: 200px"></DatePicker>
            </Form>
            <div slot="footer">
                <Button type="error" size="large" long @click="editSubmit('formInline')">确认</Button>
            </div>
        </Modal>
        <Button type="ghost" @click="setone('3')">删除</Button>
        <Modal v-model="modal3" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>确认删除</span>
            </p>
            <div style="text-align:center">
                <p>点击确认删除</p>
                <p>点击窗口外交叉关闭此窗口</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long @click="deltesubmit">确认</Button>
            </div>
        </Modal>
        <Button @click="refresh" style="float:right;margin-left:5px;">刷新</Button>
        <Button @click="handleClearCurrentRow" style="float:right">清除选择</Button>
        <Table highlight-row ref="currentRowTable" :columns="columns3" :data="data1" style="margin-top: 10px;" @on-current-change="getRow"></Table><br>
    </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      modal1: false,
      modal2: false,
      modal3: false,
      date2: "",
      columns3: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "用户名",
          key: "name"
        },
        {
          title: "用电量(度)",
          key: "yongdian"
        },
        {
          title: "电费(元)",
          key: "dianfei"
        },
        {
          title: "电费月份",
          key: "date"
        }
      ],
      data1: [],
      formInline: {
        user: "",
        date: "",
        id: "",
        yongdian: "",
        dianfei: ""
      },
      ruleInline: {
        user: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        yongdian: [{ required: true, message: "请输入用电", trigger: "blur" }],
        dianfei: [{ required: true, message: "请输入电费", trigger: "blur" }]
      }
    };
  },
  created: function() {
    this.Initialize();
  },
  methods: {
    handleClearCurrentRow() {
      this.$refs.currentRowTable.clearCurrentRow();
      this.formInline.user = "";
    },
    // 添加
    handleSubmit(name) {
      var self = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.exDate()) {
            axios
              .post("/api/b_user_gongye_zd_insert", {
                name: self.formInline.user,
                time: self.formInline.date,
                yongdian: self.formInline.yongdian,
                dianfei: self.formInline.dianfei
              })
              .then(function(response) {
                console.log(self.formInline.date);
                self.$Message.success("添加成功");
                self.modal1 = false;
                self.refresh();
              })
              .catch(function(error) {
                self.$Message.error("未知错误");
              });
          } else {
            self.$Message.error("注意填写要求");
          }
        }
      });
    },
    editSubmit(name) {
      var self = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.exDate()) {
            axios
              .post("/api/b_user_gongye_zd_update", {
                name: self.formInline.user,
                time: self.formInline.date,
                yongdian: self.formInline.yongdian,
                dianfei: self.formInline.dianfei,
                id: self.formInline.id
              })
              .then(function(response) {
                console.log(response);
                self.$Message.success("编辑成功");
                self.modal2 = false;
                self.refresh();
              })
              .catch(function(error) {
                self.$Message.error("未知错误");
              });
          } else {
            self.$Message.error("注意填写要求");
          }
        }
      });
    },
    deltesubmit() {
      var self = this;
      axios
        .post("/api/b_user_gongye_zd_delete", {
          id: self.formInline.id
        })
        .then(function(response) {
          console.log(response);
          self.$Message.success("编辑成功");
          self.modal3 = false;
          self.refresh();
        })
        .catch(function(error) {
          self.$Message.error("未知错误");
        });
    },
    // 是否选中
    setone(index) {
      if (this.formInline.user == "") {
        this.$Message.error("选中其中一行");
        return false;
      } else {
        if (index == "2") {
          this.modal2 = true;
        }
        if (index == "3") {
          this.modal3 = true;
        }
      }
    },
    setdate(date) {
      this.formInline.date = date;
    },
    // 检测日期是否存在
    exDate() {
      if (!this.formInline.date) {
        this.$Message.error("请选择日期");
        return false;
      } else {
        return true;
      }
    },
    getRow(currentRow) {
      this.formInline.user = currentRow.name;
      this.formInline.dianfei = currentRow.dianfei;
      this.formInline.yongdian = currentRow.yongdian;
      console.log(currentRow.date.toString().substring(0, 10));
      this.formInline.date = currentRow.date.toString().substring(0, 10);
      this.date2 = currentRow.date.toString().substring(0, 10);
      this.formInline.id = currentRow.id;
      console.log(this.formInline.date);
    },
    clearRow() {
      this.formInline.user = "";
      this.formInline.yongdian = "";
      this.formInline.date = "";
    },
    // 加载数据
    Initialize() {
      this.formInline.date = "";
      var self = this;
      axios
        .get("/api/b_user_gongye_zd")
        .then(function(response) {
          var data = response.data.data;
          for (var index in data) {
            self.data1.push({
              id: data[index].id,
              name: data[index].user_name,
              yongdian: data[index].yongdian,
              dianfei: data[index].dianfei,
              date: data[index].date
            });
          }
        })
        .catch(function(error) {
          self.$Message.error("未知错误");
        });
    },
    // 刷新
    refresh() {
      this.data1 = [];
      this.Initialize();
    }
  }
};
</script>