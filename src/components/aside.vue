<template>
	<div class="dream-slide">
		<el-col :span="24">
			<el-menu
					:default-active="index"
					active-text-color="#4cb2ff"
					class="el-menu-vertical-demo"
					unique-opened>
				<template v-for="(item,index) in menus">
					<el-submenu v-if="item.children && item.children.length > 0" :index="item.index">
						<template slot="title">
							<span>{{ item.name }}</span>
						</template>
						<el-menu-item-group v-for="(child,i) in item.children" :key="i">
							<el-menu-item :index="child.index" @click="toPath(child.url)">
								{{ child.name }}
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-menu-item v-else :index="item.index" @click="toPath(item.url)">
						<span>{{ item.name }}</span>
					</el-menu-item>
				</template>
			</el-menu>
		</el-col>
	</div>

</template>

<script>
	import bus from '../eventBus.js'
	export default {
		data() {
			return {
				index: '',
				// 主菜单的索引
				mainMenusIndex: '',
				menus: [
					// {
					// 	title: '首页',
					// 	index: '1',
					// 	path: '/'
					// },
					// {
					// 	title: '资产管理',
					// 	index: '2',
					// 	menuTwo: [
					// 		{
					// 			titleTwo: '流量卡库',
					// 			path: '/flowCard',
					// 			index: '2-1'
					// 		},
					// 		{
					// 			titleTwo: '流量池信息',
					// 			path: '/flowPoolInfo',
					// 			index: '2-2'
					// 		}
					// 	]
					// },
					// {
					// 	title: '客户管理',
					// 	index: '3',
					// 	menuTwo: [
					// 		{
					// 			titleTwo: '客户信息',
					// 			path: '/customerInfo',
					// 			index: '3-1'
					// 		},
					// 		{
					// 			titleTwo: '客户产品信息',
					// 			path: '/customerProductInfo',
					// 			index: '3-2'
					// 		}
					// 	]
					// },
				]
			};
		},
		created() {
			this.getAsideMenus()
		},
		mounted() {
			bus.$on('mainMenusIndex', data => {
				this.mainMenusIndex = data
			})
			this.getIndex(this.$route.name)
		},
		methods: {
			// 获取侧边栏的菜单
			getAsideMenus() {
				// debugger
				let mainMenusIndex = this.mainMenusIndex ? this.mainMenusIndex : 244
				this.$axios({
					url: '/menuapp/getMenusByRoleIds',
					method: 'post',
					params: {
						roleIds: 1,
						menuId: mainMenusIndex
					}
				}).then(res => {
					let data = res.data.object[0].children

					// 先清空左侧菜单栏
					this.menus = []
					// console.log(data);
					for(let i=0; i<data.length; i++) {
						this.menus.push(data[i])
					}
					console.log(this.menus);
					
				})
			},
			// 路由跳转的时候，根据不同的name，设置不同的index
			getIndex(name) {
				if(name === 'index') {
					this.index = '1'
				}else if(name === 'flowCard') {
					this.index = '2-1'
				}else if(name === 'flowPoolInfo') {
					this.index = '2-2'
				}else if(name === 'customerInfo') {
					this.index = '3-1'
				}else if(name === 'customerProductInfo') {
					this.index = '3-2'
				}
				// 操作管理
				else if(name === 'userManage') {
					this.index = '4-1'
				}else if(name === 'roleManage') {
					this.index = '4-2'
				}else if(name === 'departmentManage') {
					this.index = '4-3'
				}
			},
			toPath(path) {
				this.$router.replace(path)
			}
		},
		watch: {
			'$route.name'(val) {
				console.log(val);
				this.getIndex(val)
				console.log(this.index);
				
			},
			'mainMenusIndex'(val) {
				console.log(val)
				this.getAsideMenus()
			}
		}
	};
</script>

<style lang="stylus" scoped>
	.dream-slide {
		width: 200px;
		height: 100vh;
		/*background-color: #334766;*/
		background-color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 990;
		padding-top: 95px;
		.active {
			background-color: #48576a;
		}
	}
</style>
<style lang="stylus">
	mainBlue = #4cb2ff;
	.dream-slide {
		box-shadow: 0px 5px 10px rgba(47, 54, 82, 0.2);
		.el-col {
			ul.el-menu {
				border-right: none;
				background-color: transparent;
				li.el-menu-item {
					font-size: 20px;
					color: #a4a4a4;
					height: 52px;
					line-height: 52px;
				}
				>li.el-menu-item.is-active {
					background: #f3f3f3;
					position: relative;
				}
				>li.el-menu-item.is-active:after {
					content: '';
					display: block;
					width: 6px;
					height: 100%;
					background-color: mainBlue;
					position: absolute;
					left: 0;
					top: 0;
				}
				li.el-menu-item:hover, li.el-menu-item:focus {
					background-color: #f3f3f3;
				}
				li.el-submenu {
					.el-submenu__title {
						font-size: 20px;
						color: #a4a4a4;
					}
					.el-submenu__title:hover, .el-submenu__title:focus {
						background-color: #f3f3f3;
					}
					ul {
						li.el-menu-item-group {
							height: 36px;
							line-height: 36px;
							font-size: 16px;
							color: #585858;
							.el-menu-item-group__title {
								padding: 0;
							}
						}
						li.el-menu-item {
							height: 36px;
							line-height: 36px;
							font-size: 16px;
							color: #585858;
						}
						li .is-active {
							background: #f3f3f3;
							position: relative;
						}
						li .is-active:after {
							content: '';
							display: block;
							width: 6px;
							height: 100%;
							background-color: mainBlue;
							position: absolute;
							left: 0;
							top: 0;
						}
					}
				}

			}

		}
	}
</style>

