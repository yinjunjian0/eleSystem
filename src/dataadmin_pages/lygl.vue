<template>
    <div>
        <Button type="ghost" @click="clearRow();modal1 = true">增加</Button>
        <Modal v-model="modal1" title="添加一条数据">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" >
                <FormItem prop="title" label="题目">
                    <Input type="text" v-model="formInline.title" >
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="name" label="用户名">
                    <Input name="text" v-model="formInline.name" >
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="type" label="类型">
                    <Input type="text" v-model="formInline.type" >
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="content" label="内容">
                    <Input type="text" v-model="formInline.content" >
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="date" label="日期" style="display:inline"></FormItem>
                <DatePicker type="date" @on-change="setdate" style="width: 200px"></DatePicker>
            </Form>
            <div slot="footer">
                <Button type="primary" size="large" long @click="handleSubmit('formInline')">添加</Button>
            </div>
        </Modal>
        <Button type="ghost" @click="setone('2');">编辑</Button>
        <Modal v-model="modal2" title="编辑">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" >
                <FormItem prop="title" label="题目">
                    <Input type="text" v-model="formInline.title" >
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="name" label="用户名">
                    <Input name="text" v-model="formInline.name" >
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="type" label="类型">
                    <Input type="text" v-model="formInline.type" >
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="content" label="内容">
                    <Input type="text" v-model="formInline.content" >
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="date" label="日期" style="display:inline"></FormItem>
                <DatePicker type="date" @on-change="setdate" style="width: 200px"></DatePicker>
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
          title: "题目",
          key: "title"
        },
        {
          title: "用户名",
          key: "name"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "内容",
          key: "content"
        },
        {
          title: "日期",
          key: "date"
        }
      ],
      data1: [],
      formInline: {
        title: "",
        name: "",
        type: "",
        content: "",
        date: "",
        id: ""
      },
      ruleInline: {
        user: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入用电", trigger: "blur" }]
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
          axios
            .post("/api/b_lygl_insert", {
              title: self.formInline.title,
              name: self.formInline.name,
              type: self.formInline.type,
              content: self.formInline.content,
              date: self.formInline.date
            })
            .then(function(response) {
              console.log(response);
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
      });
    },
    editSubmit(name) {
      var self = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          axios
            .post("/api/b_lygl_update", {
              title: self.formInline.title,
              name: self.formInline.name,
              type: self.formInline.type,
              content: self.formInline.content,
              date: self.formInline.date,
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
      });
    },
    deltesubmit() {
      var self = this;
      axios
        .post("/api/b_lygl_delete", {
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
      if (this.formInline.title == "") {
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
      console.log(currentRow);
      this.formInline.title = currentRow.title;
      this.formInline.name = currentRow.name;
      this.formInline.type = currentRow.type;
      this.formInline.content = currentRow.content;
      this.formInline.date = currentRow.date;
      this.formInline.id = currentRow.id;
    },
    clearRow() {
      this.formInline.title = "";
    },
    // 加载数据
    Initialize() {
      this.formInline.date = "";
      var self = this;
      axios
        .get("/api/b_lygl")
        .then(function(response) {
          var data = response.data.data;
          for (var index in data) {
            self.data1.push({
              id: data[index].id,
              title: data[index].title,
              name: data[index].name,
              type: data[index].type,
              content: data[index].content,
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