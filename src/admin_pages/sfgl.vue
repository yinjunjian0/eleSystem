<template>
    <div class="box"><br>
        <h3><Icon type="help-circled" color="#57a3f3"></Icon> 请输入用户名后获得用户资料后进行费用管理</h3><br>
        <h3><Icon type="help-circled" color="#57a3f3"></Icon> 获取用户资料后可进行充值功能</h3><br>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="user">
                <Input type="text" v-model="formInline.user" placeholder="请输入用户名" @on-enter="handleSubmit('formInline')">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">获取用户资料</Button>
            </FormItem>
        </Form>
        <Card v-if="cardshow">
            <h4 slot="title">用户资料</h4>
            <h4>用户名 : {{ name }}</h4>
            <h4>余额 : {{ yue }} 元</h4>
            <h4>用户类型 : {{ type }}</h4>
            <h4>当月电费 : {{ nowdianfei }} 元</h4><br>
            <Button type="primary" @click="shoufei">收费</Button>
            <Button type="primary" @click="showcharge" style="margin-left:30px;">充值</Button>
        </Card>

         <Modal v-model="modalRecharge" width="360">
             <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>充值</span>
            </p>
             <div style="text-align:center">
                <h3><Icon type="help-circled" color="#57a3f3"></Icon> 充值用户为 ： {{formInline.user}}</h3><br>
                <h3> 充值单位为 元 </h3><br>
                <Input v-model="rechargeMoney" placeholder="请输入充值金额" style="width: 300px"></Input>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long  @click="recharge">确认</Button>
            </div>
        </Modal>

        <Modal v-model="modal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>收费</span>
            </p>
            <div style="text-align:center">
                <p>确认 收费 ? </p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long  @click="confirmshoufei">确认</Button>
            </div>
        </Modal>

        <!-- <Modal v-model="modal2">
            <p slot="header" style="color:#2d8cf0;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>添加</span>
            </p>
            <Form ref="gonggao" :model="gonggao" :rules="gonggaorule" style="text-align: center;">
                <FormItem prop="title" label="标题">
                    <Input type="text" v-model="gonggao.title" placeholder="请输入题目">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
               
                <FormItem prop="content" label="内容">
                    <Input type="textarea" v-model="gonggao.content" placeholder="请输入邮箱">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" size="large" long :loading="modal_loading" @click="add('gonggao')">确认</Button width="100%">
            </div>
        </Modal> -->
    </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      modal: false,
      modalRecharge: false,
      cardshow: false,
      rechargeMoney: 0,
      name: "",
      yue: "",
      type: "",
      nowdianfei: "",
      formInline: {
        user: "",
        password: ""
      },
      bj: {
        date: ""
      },
      ruleInline: {
        user: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      },
      now_Date: ""
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
    this.now_Date = new Date().Format("yyyy-MM");
  },
  methods: {
    showcharge() {
      this.modalRecharge = true;
    },
    handleSubmit(name) {
      var self = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          // todo 获取用户资料
          this.getyhzl();
        } else {
          this.$Message.error("输入用户名");
        }
      });
    },
    shoufei() {
      if (this.yue > this.nowdianfei) {
        this.modal = true;
      } else {
        this.$Message.error("余额不足或未录入");
      }
    },
    confirmshoufei() {
      var self = this;
      console.log(self.type);
      if (self.type == "居民用电") {
        axios
          .post("/api/verify_recordExist", {
            name: self.formInline.user,
            date: self.now_Date
          })
          .then(function(response) {
            console.log("是否已缴费");
            console.log(response.data.data);
            if (response.data.data[0]["count(*)"] == 0) {
              axios
                .post("/api/updateyue", {
                  yue: parseFloat(self.yue) - parseFloat(self.nowdianfei),
                  name: self.formInline.user
                })
                .then(function(response) {
                  self.modal = false;
                  self.$Message.success("扣费成功");
                  axios
                    .post("/api/insertrecord", {
                      name: self.formInline.user,
                      date: self.now_Date,
                      dianfei: self.nowdianfei
                    })
                    .then(function(response) {
                      console.log(response);
                      self.refresh();
                      self.$Message.success("记录成功");
                    })
                    .catch(function(error) {
                      self.$Message.error("未知错误");
                    });
                  console.log(response);
                })
                .catch(function(error) {
                  self.$Message.error("未知错误");
                });
            } else {
              self.modal = false;
              self.$Message.error("该用户本月份已缴费");
            }
          })
          .catch(function(error) {
            self.$Message.error("未知错误");
          });
      } else {
        axios
          .post("/api/verify_recordExist", {
            name: self.formInline.user,
            date: self.now_Date
          })
          .then(function(response) {
            console.log("是否已缴费");
            console.log(response.data.data);
            if (response.data.data[0]["count(*)"] == 0) {
              axios
                .post("/api/updateyue", {
                  yue: parseFloat(self.yue) - parseFloat(self.nowdianfei),
                  name: self.formInline.user
                })
                .then(function(response) {
                  self.modal = false;
                  self.$Message.success("扣费成功");
                  axios
                    .post("/api/insertrecord", {
                      name: self.formInline.user,
                      date: self.now_Date,
                      dianfei: self.nowdianfei
                    })
                    .then(function(response) {
                      console.log(response);
                      self.refresh();
                      self.$Message.success("记录成功");
                    })
                    .catch(function(error) {
                      self.$Message.error("未知错误");
                    });
                  console.log(response);
                })
                .catch(function(error) {
                  self.$Message.error("未知错误");
                });
            } else {
              self.modal = false;
              self.$Message.error("该用户本月份已缴费");
            }
          })
          .catch(function(error) {
            self.$Message.error("未知错误");
          });
      }
    },
    getyhzl() {
      var self = this;
      axios
        .post("/api/zhxx", {
          name: self.formInline.user
        })
        .then(function(response) {
          if (response.data.data.length == 0) {
            self.$Message.error("用户名错误");
            return;
          }
          self.inliz();
          self.$Message.success("获取用户资料成功");
          self.cardshow = true;
          console.log(response.data.data);
          self.name = response.data.data[0].user_name;
          self.type = response.data.data[0].user_type;
          self.yue = response.data.data[0].yue;
          if (self.type == "居民用户") {
            axios
              .post("/api/verify_jumindianfei", {
                name: self.formInline.user,
                date: self.now_Date
              })
              .then(function(response) {
                console.log("用户资料：");
                console.log(response);
                if (response.data.data.length == 0) {
                  self.$Message.error("当月数据尚未录入");
                  self.nowdianfei = "未录入";
                  return;
                }
                self.nowdianfei = response.data.data[0].dianfei;
              })
              .catch(function(error) {
                self.$Message.error("未知错误");
              });
          } else {
            axios
              .post("/api/verify_gydianfei", {
                name: self.formInline.user,
                date: self.now_Date
              })
              .then(function(response) {
                console.log("用户资料：");
                console.log(response);
                if (response.data.data.length == 0) {
                  self.$Message.error("当月数据尚未录入");
                  self.nowdianfei = "未录入";
                  return;
                }
                self.nowdianfei = response.data.data[0].dianfei;
              })
              .catch(function(error) {
                self.$Message.error("未知错误");
              });
          }
        })
        .catch(function(error) {
          self.$Message.error("未知错误");
        });
    },
    inliz() {
      this.name = "";
      this.yue = "";
      this.type = "";
      this.nowdianfei = "";
    },
    refresh() {
      var self = this;
      axios
        .post("/api/zhxx", {
          name: self.formInline.user
        })
        .then(function(response) {
          self.inliz();
          self.name = response.data.data[0].user_name;
          self.type = response.data.data[0].user_type;
          self.yue = response.data.data[0].yue;
        })
        .catch(function(error) {
          self.$Message.error("未知错误");
        });
      if (self.type == "居民用户") {
        axios
          .post("/api/verify_jumindianfei", {
            name: self.formInline.user,
            date: self.now_Date
          })
          .then(function(response) {
            self.nowdianfei = response.data.data[0].dianfei;
          });
      } else {
        axios
          .post("/api/verify_gydianfei", {
            name: self.formInline.user,
            date: self.now_Date
          })
          .then(function(response) {
            self.nowdianfei = response.data.data[0].dianfei;
          });
      }
    },
    recharge() {
      console.log("充值");
      var self = this;
      axios
        .post("/api/recharge", {
          money: self.rechargeMoney,
          loginname: self.formInline.user
        })
        .then(function(response) {
          console.log("充值返回信息");
          console.log(response.data.msg);
          if (response.data.msg == "成功") {
            self.$Message.success("充值成功");
            self.modalRecharge = false;
            self.getyhzl();
          } else {
            self.$Message.error("充值失败，请联系相关开发人员。");
          }
        })
        .catch(function(error) {
          self.$Message.error("未知错误");
        });
    }
  }
};
</script>
<style type="text/css">
.box {
  width: 50%;
  text-align: center;
  margin: auto;
}
</style>