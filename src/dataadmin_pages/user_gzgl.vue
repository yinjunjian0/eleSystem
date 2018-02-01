<template>
    <div>
        <Button type="ghost" @click="clearRow();modal1 = true">增加</Button>
        <Modal v-model="modal1" title="添加一条数据">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" >
                <FormItem prop="name" label="用户名">
                    <Input type="text" v-model="formInline.name" >
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="address" label="地址">
                    <Input type="text" v-model="formInline.address" >
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="type" label="类型">
                    <Input type="text" v-model="formInline.type" >
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="date" label="报修月份(请选择时间)" style="display:inline"></FormItem>
                <DatePicker type="date" @on-change="setdate" style="width: 200px"></DatePicker>
                <FormItem prop="content" label="描述">
                    <Input type="text" v-model="formInline.content" >
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="progress" label="进度">
                    <Input type="text" v-model="formInline.progress" >
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="updatetime" label="更新月份(请选择时间)" style="display:inline"></FormItem>
                <DatePicker type="date" @on-change="setupdate" format="yyyy-MM-dd HH:mm:ss" style="width: 200px"></DatePicker>
            </Form>
            <div slot="footer">
                <Button type="primary" size="large" long @click="handleSubmit('formInline')">添加</Button>
            </div>
        </Modal>
        <Button type="ghost" @click="setone('2');">编辑</Button>
        <Modal v-model="modal2" title="编辑">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" >
                <FormItem prop="name" label="用户名">
                    <Input type="text" v-model="formInline.name" >
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="address" label="地址">
                    <Input type="text" v-model="formInline.address" >
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="type" label="类型">
                    <Input type="text" v-model="formInline.type" >
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="date" label="报修月份(请选择时间)" style="display:inline"></FormItem>
                <DatePicker type="date" @on-change="setdate" style="width: 200px"></DatePicker>
                <FormItem prop="content" label="描述">
                    <Input type="text" v-model="formInline.content" >
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="progress" label="进度">
                    <Input type="text" v-model="formInline.progress" >
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="date" label="更新月份(请选择时间)" style="display:inline"></FormItem>
                <DatePicker type="date" @on-change="setupdate" format="yyyy-MM-dd" style="width: 200px"></DatePicker>
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
          title: "地址",
          key: "address"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "报修时间",
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
          title: "更新时间",
          key: "updatetime"
        }
      ],
      data1: [],
      formInline: {
        name: "",
        address: "",
        type: "",
        date: "",
        content: "",
        progress: "",
        updatetime: "",
        id: ""
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
              .post("/api/b_user_gzgl_insert", {
                name: self.formInline.name,
                address: self.formInline.address,
                type: self.formInline.type,
                date: self.formInline.date,
                content: self.formInline.content,
                progress: self.formInline.progress,
                updatetime: self.formInline.updatetime
              })
              .then(function(response) {
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
    //编辑
    editSubmit(name) {
      var self = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.exDate()) {
            axios
              .post("/api/b_user_gzgl_update", {
                name: self.formInline.name,
                address: self.formInline.address,
                type: self.formInline.type,
                date: self.formInline.date,
                content: self.formInline.content,
                progress: self.formInline.progress,
                updatetime: self.formInline.updatetime,
                id: self.formInline.id
              })
              .then(function(response) {
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
        .post("/api/b_user_gzgl_delete", {
          id: self.formInline.id
        })
        .then(function(response) {
          console.log(response);
          self.$Message.success("删除成功");
          self.modal3 = false;
          self.refresh();
        })
        .catch(function(error) {
          self.$Message.error("未知错误");
        });
    },
    // 是否选中
    setone(index) {
      if (this.formInline.name == "") {
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
    setupdate(date) {
      this.formInline.updatetime = date;
    },
    // 检测日期是否存在
    exDate() {
      if (!(this.formInline.date && this.formInline.updatetime)) {
        this.$Message.error("请选择日期");
        return false;
      } else {
        return true;
      }
    },
    getRow(currentRow) {
      this.formInline.name = currentRow.name;
      this.formInline.address = currentRow.address;
      this.formInline.type = currentRow.type;
      this.formInline.date = currentRow.date;
      this.formInline.content = currentRow.content;
      this.formInline.progress = currentRow.progress;
      this.formInline.updatetime = currentRow.updatetime;
      this.formInline.date = currentRow.date.toString().substring(0, 10);
      console.log(currentRow);
      this.date2 = currentRow.date.toString().substring(0, 10);
      this.formInline.id = currentRow.id;
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
        .get("/api/b_user_gzgl")
        .then(function(response) {
          var data = response.data.data;
          for (var index in data) {
            self.data1.push({
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