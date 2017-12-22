<template>
    <div class="layout">
        <Menu mode="horizontal" theme="dark" active-name="1" @on-select="menushow">
            <div class="layout-logo">电力系统(管理员)</div>
            <div class="layout-exit" @click="exit">退出</div>
            <div class="layout-nav">
                <MenuItem name="1" >
                    <Icon type="ios-navigate"></Icon>
                    业务管理
                </MenuItem>
                <MenuItem name="2">
                    <Icon type="ios-keypad"></Icon>
                    收费管理
                </MenuItem>
            </div>
        </Menu>
        <Menu mode="horizontal" active-name="1" @on-select="click" v-if="menuIndex == 1">
            <div class="layout-assistant">
                <MenuItem name="gonggao">公告管理</MenuItem>
                <MenuItem name="lygl">留言管理</MenuItem>
                <MenuItem name="gzgl">故障管理</MenuItem>
            </div>
        </Menu>
        <Menu mode="horizontal" active-name="1" @on-select="click" v-if="menuIndex == 2">
            <div class="layout-assistant_2">
                <MenuItem name="fylr">费用录入</MenuItem>
                <MenuItem name="sfgl">收费管理</MenuItem>
            </div>
        </Menu>
        

        
        
        <div class="layout-content">
            <div class="layout-content-main">    
                <router-view/>
            </div>
        </div>
        <div class="layout-copy">
            2017.12-2017.12 &copy; Charles
        </div>
    </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      menuIndex: 1,
    }
  },
  methods:{
    menushow:function(name){
        this.menuIndex = name
        console.log(name)
        console.log(this.menuIndex)
    },
    click:function(name){
        this.$router.push('/admin/' + name)
    },
    exit(){
        this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    overflow: hidden;
}
.layout-logo{
    text-align: center;
    width: 150px;
    height: 30px;
    line-height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    color: #FFF;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-exit{
    text-align: center;
    width: 100px;
    height: 30px;
    line-height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    color: #FFF;
    position: absolute;
    top: 15px;
    right: 20px;
    cursor:pointer;
}
.layout-nav{
    width: 250px;
    margin: 0 auto;
}

.layout-assistant{
    width: 300px;
    margin: 0 auto;
    height: inherit;
}
.layout-assistant_2{
    width: 200px;
    margin: 0 auto;
    height: inherit;
}
.layout-breadcrumb{
    padding: 10px 15px 0;
}
.layout-content{
    min-height: 600px;
    width: 98%;
    margin: auto;
    margin-top: 10px;
    background: #fff;
    border-radius: 4px;
}
.layout-content-main{
    padding: 10px;
}
.layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}
</style>  
