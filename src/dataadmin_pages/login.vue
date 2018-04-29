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
                <FormItem prop="password" label="密码">
                    <Input type="password" v-model="formInline.password" >
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="phone" label="电话号码">
                    <Input type="text" v-model="formInline.phone" >
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="email" label="电子邮件">
                    <Input type="text" v-model="formInline.email" >
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="type" label="用户类型">
                    <Select v-model="formInline.type" style="width:200px">
                        <Option value="居民用户">居民用户</Option>
                        <Option value="工业用户">工业用户</Option>
                    </Select>
                </FormItem>
                <FormItem prop="yue" label="余额">
                    <Input type="text" v-model="formInline.yue" >
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <!-- <FormItem prop="date" label="注册日期" style="display:inline"></FormItem>
                <DatePicker type="date" @on-change="setdate" style="width: 200px"></DatePicker> -->
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
                <FormItem prop="password" label="密码">
                    <Input type="password" v-model="formInline.password" >
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="phone" label="电话号码">
                    <Input type="text" v-model="formInline.phone" >
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="email" label="电子邮件">
                    <Input type="text" v-model="formInline.email" >
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="type" label="用户类型">
                    <Select v-model="formInline.type" style="width:200px">
                        <Option value="居民用户">居民用户</Option>
                        <Option value="工业用户">工业用户</Option>
                    </Select>
                    <p><Icon type="information-circled"></Icon> 请重新选择用户类型</p>
                </FormItem>
                <FormItem prop="yue" label="余额">
                    <Input type="text" v-model="formInline.yue" >
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <!-- <FormItem prop="date" label="注册日期" style="display:inline"></FormItem>
                <DatePicker type="date" @on-change="setdate" style="width: 200px"></DatePicker> -->
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
          title: "密码",
          key: "password"
        },
        {
          title: "电话号码",
          key: "phone"
        },
        {
          title: "电子邮箱",
          key: "email"
        },
        {
          title: "用户类型",
          key: "type"
        },
        {
          title: "注册日期",
          key: "date"
        },
        {
          title: "余额",
          key: "yue"
        }
      ],
      data1: [],
      formInline: {
        user: "",
        password: "",
        phone: "",
        email: "",
        type: "",
        date: "",
        id: "",
        yue: ""
      },
      ruleInline: {
        user: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码.", trigger: "blur" },
          {
            type: "string",
            min: 6,
            message: "密码应大于6位",
            trigger: "blur"
          }
        ],
        phone: [{ required: true, message: "请输入电话号码", trigger: "blur" }],
        email: [{ required: true, message: "请输入电子邮箱", trigger: "blur" }],
        type: [{ required: true, message: "请输入用户类型", trigger: "blur" }],
        yue: [{ required: true, message: "请输入余额", trigger: "blur" }]
      }
    };
  },
  created: function() {
    this.Initialize();
    console.log(new Date().format("yyyy-MM-dd hh:mm:ss"));
  },
  methods: {
    handleClearCurrentRow() {
      this.$refs.currentRowTable.clearCurrentRow();
      this.formInline.user = "";
    },
    handleSubmit(name) {
      var self = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          axios
            .post("/api/b_userlogin_insert", {
              name: self.formInline.user,
              password: self.formInline.password,
              identity: self.formInline.type,
              email: self.formInline.email,
              phone: self.formInline.phone,
              time: new Date().format("yyyy-MM-dd hh:mm:ss"),
              yue: self.formInline.yue
            })
            .then(function(response) {
              console.log(response);
              self.$Message.success("添加成功");
              self.modal1 = false;
              self.data1.push({
                name: self.formInline.user,
                password: self.formInline.password,
                type: self.formInline.type,
                email: self.formInline.email,
                phone: self.formInline.phone,
                date: new Date().format("yyyy-MM-dd hh:mm:ss"),
                yue: self.formInline.yue
              });
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
            .post("/api/b_userlogin_update", {
              name: self.formInline.user,
              password: self.formInline.password,
              identity: self.formInline.type,
              email: self.formInline.email,
              phone: self.formInline.phone,
              // time: self.formInline.date,
              id: self.formInline.id,
              yue: self.formInline.yue
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
        .post("/api/b_userlogin_delete", {
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
    getRow(currentRow) {
      console.log(this.$refs.date11);
      console.log(currentRow);
      this.formInline.user = currentRow.name;
      this.formInline.password = currentRow.password;
      this.formInline.type = currentRow.type;
      this.formInline.email = currentRow.email;
      this.formInline.phone = currentRow.phone;
      this.formInline.yue = currentRow.yue;
      this.formInline.date = currentRow.date.toString().substring(0, 10);
      this.date2 = currentRow.date.toString().substring(0, 10);
      this.formInline.id = currentRow.id;
      console.log(this.formInline.date);
    },
    clearRow() {
      this.formInline.user = "";
      this.formInline.password = "";
      this.formInline.type = "";
      this.formInline.email = "";
      this.formInline.phone = "";
      this.formInline.date = "";
    },
    // 加载数据
    Initialize() {
      var self = this;
      axios
        .get("/api/b_userlogin")
        .then(function(response) {
          var data = response.data.data;
          for (var index in data) {
            self.data1.push({
              id: data[index].id,
              name: data[index].user_name,
              password: data[index].user_password,
              phone: data[index].user_phone,
              email: data[index].user_email,
              type: data[index].user_type,
              date: data[index].user_date,
              yue: data[index].yue
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