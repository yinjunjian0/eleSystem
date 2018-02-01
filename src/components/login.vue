<template>
    <div class="box">
        <Card class="Card">
            <h3 style="height: 40px;">电力系统</h3>
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="user">
                    <Input type="text" v-model="formInline.user" placeholder="请输入账号">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="请输入密码">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem><br>
                <FormItem prop="identity">
                    <RadioGroup v-model="formInline.identity">
                        <Radio label="用户">用户</Radio>
                        <Radio label="管理员">管理员</Radio>
                        <Radio label="数据管理员">数据管理员</Radio>
                    </RadioGroup>
                </FormItem><br>
                <FormItem>
                    <Button type="info" @click="handleSubmit('formInline')">登陆</Button>
                    <Button @click="modal2 = true">注册</Button>
                    <Modal v-model="modal2" width="360">
                        <p slot="header" style="color:#f60;text-align:center">
                            <Icon type="information-circled"></Icon>
                            <span>用户注册</span>
                        </p>
                        <Form ref="regisinline" :model="regisinline" :rules="regisrule" style="text-align: center;">
                            <FormItem prop="user">
                                <Input type="text" v-model="regisinline.user" placeholder="请输入用户名">
                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                            <FormItem prop="password">
                                <Input type="text" v-model="regisinline.password" placeholder="请输入密码">
                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                            <FormItem prop="phone">
                                <Input type="text" v-model="regisinline.phone" placeholder="请输入手机">
                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                            <FormItem prop="email">
                                <Input type="text" v-model="regisinline.email" placeholder="请输入邮箱">
                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                            <FormItem prop="identity">
                                <RadioGroup v-model="regisinline.identity">
                                    <label>用户类型 ： </label>
                                    <Radio label="居民用电">居民用电</Radio>
                                    <Radio label="大工业用电">大工业用电</Radio>
                                </RadioGroup>
                            </FormItem>
                            <p><Icon type="android-happy"></Icon> 注册功能仅开放 <strong>用户角色</strong></p>
                        </Form>
                        <div slot="footer">
                            <Button type="error" size="large" long :loading="modal_loading" @click="regis('regisinline')">确认</Button width="100%">
                        </div>
                    </Modal>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      modal2: false,
      modal_loading: false,
      formInline: {
        user: "",
        password: "",
        identity: ""
      },
      ruleInline: {
        user: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { type: "string", min: 1, message: "密码至少为6位", trigger: "blur" }
        ],
        identity: [{ required: true, message: "请选择身份", trigger: "change" }]
      },
      // 注册
      regisinline: {
        user: "",
        password: "",
        phone: "",
        email: "",
        identity: ""
      },
      regisrule: {
        user: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { type: "string", min: 6, message: "密码至少为6位", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机", trigger: "blur" },
          {
            type: "string",
            min: 11,
            message: "手机为11位数字",
            trigger: "blur"
          }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        identity: [{ required: true, message: "请选择身份", trigger: "change" }]
      }
    };
  },
  created: function() {
    Date.prototype.format = function(fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return fmt;
    };
  },
  methods: {
    handleSubmit(name) {
      var self = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          var name = this.formInline.user.toString();
          var password = this.formInline.password.toString();
          if (this.formInline.identity == "用户") {
            axios
              .post("/api/login", {
                name: name
              })
              .then(function(response) {
                console.log(response);
                if (password === response.data.data[0].user_password) {
                  self.$Message.success("登陆成功");
                  self.$router.push("user");
                  localStorage.setItem("identity", "用户");
                  localStorage.setItem("username", name);
                } else {
                  self.$Message.error("用户名或密码错误");
                }
              })
              .catch(function(error) {
                self.$Message.error("用户名不存在");
              });
          } else if (self.formInline.identity == "管理员") {
            axios
              .post("/api/adminlogin", {
                name: self.formInline.user
              })
              .then(function(response) {
                console.log(response);
                if (password === response.data.data[0].password) {
                  self.$Message.success("登陆成功");
                  self.$router.push("admin");
                } else {
                  self.$Message.error("用户名或密码错误");
                }
              })
              .catch(function(error) {
                self.$Message.error("管理员不存在");
              });
          } else if (self.formInline.identity == "数据管理员") {
            axios
              .post("/api/dataadmin", {
                name: self.formInline.user
              })
              .then(function(response) {
                console.log(response);
                if (password === response.data.data[0].password) {
                  self.$Message.success("登陆成功");
                  self.$router.push("dataadmin");
                } else {
                  self.$Message.error("用户名或密码错误");
                }
              })
              .catch(function(error) {
                self.$Message.error("该数据管理员不存在");
              });
          }
        } else {
          if (self.formInline.user == "" || self.formInline.password == "") {
            self.$Message.error("用户名或密码不能为空");
          } else if (self.formInline.identity == "") {
            self.$Message.error("请选择身份");
          }
        }
      });
    },
    regis(name) {
      var self = this;
      var time = new Date().format("yyyy-MM-dd hh:mm:ss");
      alert(time);
      this.$refs[name].validate(valid => {
        if (valid) {
          axios
            .post("/api/regis", {
              name: this.regisinline.user,
              password: this.regisinline.password,
              identity: this.regisinline.identity,
              email: this.regisinline.email,
              phone: this.regisinline.phone,
              time: time
            })
            .then(function(response) {
              console.log(response);
              self.$Message.success("注册成功");
            })
            .catch(function(error) {
              self.$Message.error("未知错误");
            });
        } else {
          this.$Message.error("注册失败, 注意填写要求");
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  width: 100%;
  height: 800px;
  background: linear-gradient(to top, AliceBlue, Lavender);
  overflow: hidden;
  background: url(../assets/bg.jpg);
  background-size: 100%;
  overflow: hidden;
}
.Card {
  width: 400px;
  margin: 0 auto;
  margin-top: 200px;
  text-align: center;
}
</style>  
