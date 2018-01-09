<template>
	<div class="box">
		<h3>* 注意填写</h3><br>
		<Form :model="formItem" :label-width="80" style="width:400px;">
	        <FormItem label="旧密码" required>
	            <Input v-model="formItem.old" placeholder="" type="password"></Input>
	        </FormItem>
	        <FormItem label="新密码" required>
	            <Input v-model="formItem.new" placeholder="" type="password"></Input>
	        </FormItem>

	        <FormItem label="再输一次" required>
	            <Input v-model="formItem.newagain" placeholder="" type="password"></Input>
	        </FormItem>
	        <FormItem>
	            <Button type="primary" @click="confirm">确认修改</Button>
	        </FormItem>
	    </Form>
	</div>
    
</template>
<script>
import axios from 'axios'
    export default {
        data () {
            return {
                formItem: {
                    old: '',
                    new: '',
                    newagain: ''
                }
            }
        },
        methods:{
        	confirm(){
        		var self = this
        		if (this.formItem.old && this.formItem.new && this.formItem.newagain) {
        			if (this.formItem.new.length < 6) {
						this.$Message.error('密码应大于6位');
        			}else{
        				if (this.formItem.new == this.formItem.newagain) {
        					axios.post('/api/zhxx',{
				                name: localStorage.getItem("username"),
				            })
				              .then(function (response) {
				                if(response.data.data[0].user_password == self.formItem.old){
        							// 当旧密码正确 请求修改密码
					                axios.post('/api/xgmm',{
						                new: self.formItem.new,
						                name: localStorage.getItem("username")
						            })
						              .then(function (response) {
						                self.$Message.success('修改成功');
						              })
						              .catch(function (error) {
						                self.$Message.error('未知错误');
						              }); 
				                }else{
				                	self.$Message.error('旧密码错误');
				                }
				              })
				              .catch(function (error) {
				                self.$Message.error('未知错误1');
				              }); 
	        			}else{
	        				self.$Message.error('两次输入不一致');
	        			}
        			}
        		}else{
        			this.$Message.error('请按要求填写');
        		}
        	}
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
	text-align: center;width:400px;margin:auto;
}
</style>  
