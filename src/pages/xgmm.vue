<template>
	<div class="box">
		<Form :model="formItem" :label-width="80" style="width:400px;">
	        <FormItem label="旧密码">
	            <Input v-model="formItem.input" placeholder=""></Input>
	        </FormItem>
	        <FormItem label="新密码">
	            <Input v-model="formItem.input" placeholder=""></Input>
	        </FormItem>

	        <FormItem label="再输入一次">
	            <Input v-model="formItem.input" placeholder=""></Input>
	        </FormItem>
	        
	        
	        <FormItem>
	            <Button type="primary">Submit</Button>
	            <Button type="ghost" style="margin-left: 8px">Cancel</Button>
	        </FormItem>
	    </Form>
	</div>
    
</template>
<script>
    export default {
        data () {
            return {
                formItem: {
                    input: '',
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
