<template>
	<div class="departmentManage-wrap wrap">
		<div class="content wrap-content">
			<!-- 标题 -->
			<div class="page-title">
				<div class="line"></div>
				<span>部门管理</span>
			</div>
			<!-- 树状图 -->
			<div class="tree">
				<div class="btn-group">
					<div class="btn-add btn-green">添加</div>
					<div class="btn-edit btn-main">编辑</div>
					<div class="btn-delete btn-warn">删除</div>
				</div>
				<el-tree :data="treeData"
						:props="defaultProps"
						show-checkbox
						@check="checked"
						ref="tree"
						default-expand-all></el-tree>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				treeData: [
					{
						label: '一级 1',
						children: [
							{
								label: '二级 1-1',
								children: [
									{
										label: '三级 1-1-1'
									},
									{
										label: '三级 1-1-2'
									}
								]
							}
						]
					},
					{
						label: '一级 2',
						children: [
							{
								label: '二级 2-1',
								children: [
									{
										label: '三级 2-1-1'
									},
									{
										label: '三级 2-1-2'
									},
									{
										label: '三级 2-1-3'
									}
								]
							},
							{
								label: '二级 2-2',
								children: [
									{
										label: '三级 2-2-1'
									}
								]
							}
						]
					},
					{
						label: '一级 3',
						children: [
							{
								label: '二级 3-1',
								children: [
									{
										label: '三级 3-1-1'
									}
								]
							},
							{
								label: '二级 3-2',
								children: [
									{
										label: '三级 3-2-1'
									}
								]
							}
						]
					}
				]
			};
		},
		mounted() {
//			this.getAllDictionary()
			let route = this.$route.name
			console.log(route)
		},
		methods: {
			// 获取全部字典
			getAllDictionary(){
				this.$axios({
					url: '/admin/dict/all',
					method: 'post'
				}).then(res => {
					let data = res.data.data
					console.log(data)
					let result = []
					for(let i=0; i<data.length; i++){
						if(data[i].dicttype === 'sys'){
							result.push(data[i])
						}
					}
					let dict=[];
					for(let t of result){
						if(t.dictpid === 0){
							t.id= t.dictid
							t.label = t.dictname
							dict.push(t)
							getItem(t)
						}
					}
					function getItem(p){
						for(let a of result){
							if(p.dictid === a.dictpid){
								if(!p.hasOwnProperty('children')){
									p.children=[];
								}
								a.id= a.dictid
								a.label = a.dictname
								p['children'].push(a)
								getItem(a);
							}
						}
						return
					}
//					this.treeData = dict
//					console.log(dict)
				})
			},
			// 获取到选中的节点
			checked(obj,aaa){
				console.log(obj,aaa)
			}
		}
	};
</script>

<style lang="stylus" scoped>
	mainBlue = #4cb2ff;
	.departmentManage-wrap {
		.content {
			/* 树状图 */
			.tree {
				background-color: #fff;
				border-radius: 20px;
				padding: 25px 50px;
				.btn-group {
					margin-bottom 40px
					.btn-edit {
						margin 0 30px
					}
				}
			}
		}
	}
</style>
<style lang="stylus">
	.el-tree .el-tree-node__content {
		height: 50px;
		.el-tree-node__label {
			font-size: 18px;
		}
	}
</style>