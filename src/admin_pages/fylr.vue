<template>
    <div class="box">
        <h3>请先选择用户类型 : </h3><br>
        <Select v-model="typeselect" style="width:200px">
            <Option value="jumin">居民用户</Option>
            <Option value="gongye">工业用户</Option>
        </Select>

        <Form v-if="this.typeselect == 'jumin'" :model="formItem" ref="formItem" :label-width="80" :rules="formItemrule" class="form">
            <br>
            <FormItem label="用户名" required prop="name">
                <Input v-model="formItem.name" placeholder=""></Input>
            </FormItem>
            <FormItem label="日期" required prop="date">
                <Row>
                    <Col span="11">
                        <DatePicker type="month" placeholder="" @on-change="setdate"></DatePicker>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="谷段" required prop="gu">
                <Input v-model="formItem.gu" placeholder=""></Input>
            </FormItem>
            <FormItem label="平段" required prop="ping">
                <Input v-model="formItem.ping" placeholder=""></Input>
            </FormItem>
            <FormItem label="峰段" required prop="feng">
                <Input v-model="formItem.feng" placeholder=""></Input>
            </FormItem>
            <h3>当前电费为 : {{ jumintotal }} 元</h3><br>
            <Button type="primary" @click="sub('formItem')">提交</Button>
        </Form>

        <Form v-if="this.typeselect == 'gongye'" :model="formItem" ref="formItem" :label-width="80" :rules="formItemrule" class="form">
            <br>
            <FormItem label="用户名" required prop="name">
                <Input v-model="formItem.name" placeholder=""></Input>
            </FormItem>
            <FormItem label="日期" required prop="date">
                <Row>
                    <Col span="11">
                        <DatePicker type="month" placeholder="" @on-change="setdate"></DatePicker>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="用电量" required prop="yongdian">
                <Input v-model="formItem.yongdian" placeholder=""></Input>
            </FormItem>
            
            <h3>当前电费为 : {{ gongyetotal }} 元</h3><br>
            <Button type="primary" @click="gongyesub('formItem')">提交</Button>
        </Form>
            
    </div>
    
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      typeselect: "",
      formItem: {
        name: "",
        date: "",
        yongdian: "",
        gu: "",
        ping: "",
        feng: "",
        handleFocus: 0
      },
      formItemrule: {
        name: [{ required: true, message: "请输入名字", trigger: "blur" }],
        date: [{ required: true, message: "请输入日期", trigger: "blur" }]
        // yongdian: [{ required: true, message: "请输入用电量", trigger: "blur" }]
      }
    };
  },
  computed: {
    jumintotal() {
      return (
        parseInt(this.formItem.gu) * 0.6 +
        parseInt(this.formItem.feng) * 0.8 +
        parseInt(this.formItem.ping) * 0.7
      ).toFixed(2);
    },
    gongyetotal() {
      let yd = this.formItem.yongdian;
      if (parseInt(yd) > 35000) {
        return 29500 + (yd - 35000) * 0.75;
      }
      if (parseInt(yd) > 20000) {
        return 17500 + (yd - 20000) * 0.8;
      }
      if (parseInt(yd) > 10000) {
        return 9000 + (yd - 10000) * 0.85;
      }
      return parseInt(yd) * 0.9;
    },
    yongdian() {
      return (
        parseInt(this.formItem.gu) +
        parseInt(this.formItem.feng) +
        parseInt(this.formItem.ping)
      );
    }
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
    console.log(new Date().Format("yyyy-MM"));
  },
  methods: {
    sub(a) {
      this.$refs[a].validate(valid => {
        if (valid) {
          var self = this;
          axios
            .post("/api/verify_nameExist", {
              name: self.formItem.name
            })
            .then(function(response) {
              if (response.data.data[0]["count(*)"] != 0) {
                axios
                  .post("/api/verify_monthExist", {
                    name: self.formItem.name,
                    date: self.formItem.date
                  })
                  .then(function(response) {
                    console.log(response.data.data[0]["count(*)"]);
                    if (response.data.data[0]["count(*)"] == 0) {
                      if (
                        !self.formItem.gu ||
                        !self.formItem.feng ||
                        !self.formItem.ping
                      ) {
                        self.$Message.error("请填写3个时段用电，无则填0。");
                        return false;
                      }
                      axios
                        .post("/api/insertzd", {
                          name: self.formItem.name,
                          date: self.formItem.date,
                          gu: parseInt(self.formItem.gu),
                          feng: parseInt(self.formItem.feng),
                          ping: parseInt(self.formItem.ping),
                          yongdian: parseInt(self.yongdian),
                          dianfei: self.jumintotal
                        })
                        .then(function(response) {
                          self.$Message.success("添加成功");
                        })
                        .catch(function(error) {
                          self.$Message.error("未知错误");
                        });
                    } else {
                      self.$Message.error("该用户此月份数据已录入");
                    }
                  })
                  .catch(function(error) {
                    self.$Message.error("未知错误");
                  });
              } else {
                self.$Message.error("用户名不存在");
              }
            })
            .catch(function(error) {
              self.$Message.error("未知错误");
            });
        } else {
          this.$Message.error("添加失败, 注意填写要求");
        }
      });
    },
    gongyesub(a) {
      this.$refs[a].validate(valid => {
        if (valid) {
          var self = this;
          axios
            .post("/api/verify_gynameExist", {
              name: self.formItem.name
            })
            .then(function(response) {
              console.log("用户名是否存在");
              console.log(response);
              if (response.data.data[0]["count(*)"] != 0) {
                axios
                  .post("/api/verify_gymonthExist", {
                    name: self.formItem.name,
                    date: self.formItem.date
                  })
                  .then(function(response) {
                    console.log(response.data.data[0]["count(*)"]);
                    if (response.data.data[0]["count(*)"] == 0) {
                      if (!self.formItem.yongdian) {
                        self.$Message.error("请填写用电，无则填0。");
                        return false;
                      }
                      axios
                        .post("/api/insert_gongyezd", {
                          name: self.formItem.name,
                          date: self.formItem.date,
                          yongdian: parseInt(self.formItem.yongdian),
                          dianfei: self.gongyetotal
                        })
                        .then(function(response) {
                          self.$Message.success("添加成功");
                        })
                        .catch(function(error) {
                          self.$Message.error("未知错误");
                        });
                    } else {
                      self.$Message.error("该用户此月份数据已录入");
                    }
                  })
                  .catch(function(error) {
                    self.$Message.error("未知错误");
                  });
              } else {
                self.$Message.error("用户名不存在");
              }
            })
            .catch(function(error) {
              self.$Message.error("未知错误");
            });
        } else {
          this.$Message.error("添加失败, 注意填写要求");
        }
      });
    },
    setdate(date) {
      this.formItem.date = date;
    }
  }
};
</script>
<style type="text/css">
.box {
  width: 400px;
  margin: auto;
  text-align: center;
}
</style>