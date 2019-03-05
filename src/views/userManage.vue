<template>
	<div class="userManage-wrap wrap">
		<div class="content wrap-content">
			<!-- 标题 -->
			<div class="page-title">
				<div class="line"></div>
				<span>用户管理</span>
			</div>
			<!-- 表格数据 -->
			<div class="table-box">
				<!-- 工具栏 -->
				<div class="tools">
					<!-- 筛选框和搜索按钮 -->
					<div class="search">
						<!-- 登录账号 -->
						<div class="login-account">
							<span>登录账号: </span>
							<el-input class="input"
								v-model="tools.loginAccount">
							</el-input>
						</div>
						<!-- 姓名 -->
						<div class="name">
							<span>姓名: </span>
							<el-input class="input"
								v-model="tools.name">
							</el-input>
						</div>
						<!-- 角色 -->
						<div class="role">
							<span>角色: </span>
							<el-select class="select"
								placeholder="请选择"
								clearable
								v-model="tools.role">
								<el-option
										v-for="item in tools.roleOptions"
										:key="item.value"
										:label="item.role"
										:value="item.value">
								</el-option>
							</el-select>
						</div>
						<!-- 部门 -->
						<div class="department">
							<span>部门: </span>
							<el-select class="select"
								placeholder="请选择"
								clearable
								v-model="tools.department">
								<el-option
										v-for="item in tools.departmentOptions"
										:key="item.value"
										:label="item.department"
										:value="item.value">
								</el-option>
							</el-select>
						</div>
						<!-- 当前状态 -->
						<div class="status">
							<span>当前状态: </span>
							<el-select class="select"
								placeholder="全部"
								clearable
								v-model="tools.status">
								<el-option
										v-for="item in tools.statusOptions"
										:key="item.value"
										:label="item.status"
										:value="item.value">
								</el-option>
							</el-select>
						</div>
						<!-- 手机号 -->
						<div class="tel">
							<span>手机号: </span>
							<el-input class="input"
								v-model="tools.tel">
							</el-input>
						</div>
						<!-- 重置按钮 -->
						<div class="btn-reset btn-gray">重置</div>
						<!-- 搜索按钮 -->
						<div class="btn-search btn-main">搜索</div>
					</div>
					<!-- 按钮组 -->
					<div class="btn-group">
						<div class="btn btn-add btn-green" @click="btnAdd">添加</div>
						<div class="btn btn-enable btn-main">启用</div>
						<div class="btn btn-disable btn-warn">禁用</div>
						<div class="btn btn-reset btn-gray">密码重置</div>
					</div>
				</div>
				<!-- 表格 -->
				<div class="table">
					<el-table
							:data="tableData"
							border
							v-loading="loading"
							element-loading-text="正在加载数据，请稍候"
							style="width: 100%">
						<el-table-column label="ID" prop="id" align="center"></el-table-column>
						<el-table-column label="登录账号" prop="account" align="center"></el-table-column>
						<el-table-column label="姓名" prop="name" align="center"></el-table-column>
						<el-table-column label="角色" prop="role" align="center"></el-table-column>
						<el-table-column label="部门" prop="department" align="center"></el-table-column>
						<el-table-column label="手机号" prop="tel" align="center"></el-table-column>
						<el-table-column label="邮箱" prop="email" align="center"></el-table-column>
						<el-table-column label="当前状态" prop="status" align="center"></el-table-column>
						<el-table-column label="操作" width="200" align="center">
							<template slot-scope="scope">
								<span class="table-button watch">查看</span>
								<span class="table-button edit" @click="btnEdit(scope.row)">修改</span>
								<span class="table-button config" @click="btnConfig(scope.row)">角色配置</span>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
							v-if="totalCount > pageSize"
							layout="total, sizes, prev, pager, next, jumper"
							:page-size="pageSize"
							:current-page="pageNo"
							:total="totalCount"
							:page-sizes="[20, 50, 100]"
							@size-change="changeSize"
							@current-change="changePageNo">
					</el-pagination>
				</div>
			</div>
		</div>
		<!-- 添加/修改的弹出框 -->
		<div class="addEdit-modal" v-show="modal.isShow" @click.self="modal.isShow = false">
			<div class="add-edit">
				<div class="header">{{ modal.title }}用户</div>
				<div class="box">
					<!-- 登录账号 -->
					<div class="box-item login-account">
						<span>登录账号: </span>
						<el-input class="input"
							v-model="modal.account">
						</el-input>
					</div>
					<!-- 真实姓名 -->
					<div class="box-item name">
						<span>真实姓名: </span>
						<el-input class="input"
							v-model="modal.name">
						</el-input>
					</div>
					<!-- 所属部门 -->
					<div class="box-item department">
						<span>所属部门: </span>
						<el-select class="select"
							placeholder="请选择"
							v-model="modal.department">
							<el-option
									v-for="item in tools.departmentOptions"
									:key="item.value"
									:label="item.department"
									:value="item.value">
							</el-option>
						</el-select>
					</div>
					<!-- 手机号码 -->
					<div class="box-item tel">
						<span>手机号码: </span>
						<el-input class="input"
							v-model="modal.tel">
						</el-input>
					</div>
					<!-- 邮箱地址 -->
					<div class="box-item email">
						<span>邮箱地址: </span>
						<el-input class="input"
							v-model="modal.email">
						</el-input>
					</div>
					<!-- 按钮组 -->
					<div class="btn-group">
						<div class="btn-cancel btn-gray">取消</div>
						<div class="btn-save btn-main">保存</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {translatePackages,getNetWork,format,currentMonth} from '../assets/base.js'
	export default {
		data() {
			return {
				// 加载
				loading: '',
				// 表格工具栏
				tools: {
					// 登录账号
					loginAccount: '',
					// 姓名
					name: '',
					// 角色
					role: '',
					roleOptions: [
						{
							role: 'admin',
							value: '1'
						},
						{
							role: '管理员',
							value: '2'
						}
					],
					// 部门
					department: '',
					departmentOptions: [
						{
							department: '技术部',
							value: '1'
						},
						{
							department: '销售部',
							value: '2'
						}
					],
					// 当前状态
					status: '',
					statusOptions: [
						{
							status: '已启用',
							value: '1'
						},
						{
							status: '已禁用',
							value: '2'
						}
					],
					// 手机号
					tel: ''
				},
				// 表格数据
				tableData: [
					{
						id: 1,
						account: 'admin',
						name: '张三',
						role: '管理员',
						department: '运营',
						tel: '17788886666',
						email: '17788886666@163.com',
						status: '已启用'
					}
				],
				// 表格分页
				totalCount: 1234,
				pageSize: 20,
				pageNo: 1,
				// 加载
				loading: '',
				// 当前选中的
				currentArr: [],
				// 弹出框的数据
				modal: {
					// 弹出框的标题
					title: '',
					// 弹出框是否显示
					isShow: false,
					// 登录账号
					account: '',
					// 真实姓名
					name: '',
					// 所属部门
					department: '',
					departmentOptions: [
						{
							value: '1',
							department: '技术部'
						},
						{
							value: '2',
							department: '销售部'
						}
					],
					// 手机号码
					tel: '',
					// 邮箱地址
					email: ''
				}
			};
		},
		mounted() {
			// this.getNetWork()
			let route = this.$route.name
			console.log(route)
		},
		created() {

		},
		methods: {
			// 改变当前页数
			changePageNo(val) {
				this.pageNo = val;
			},
			// 改变每页显示的条数
			changeSize(val) {
				this.pageSize = val;
				this.pageNo = 1;
			},
			// 选中某几行
			selectRows(selection, row) {
				this.currentArr = selection
			},
			// 全选
			selectAll(selection){
				this.currentArr = selection
			},
			// 添加
			btnAdd() {
				this.modal.title = '添加'
				this.modal.isShow = true
				this.modal.account = ''
				this.modal.name = ''
				this.modal.department = ''
				this.modal.tel = ''
				this.modal.email = ''
			},
			// 修改
			btnEdit(data) {
				console.log(data)
				this.modal.title = '修改'
				this.modal.isShow = true
				this.modal.account = data.account
				this.modal.name = data.name
				this.modal.department = data.department
				this.modal.tel = data.tel
				this.modal.email = data.email
			},
			// 角色配置
			btnConfig(data) {
				let id = data.id
				this.$router.push({
					path: '/roleConfig',
					query: {
						id: id
					}
				})
			}
		}
	};
</script>

<style lang="stylus" scoped>
	mainBlue = #1d9eed;
	mainButton = #4cb2ff;
	.userManage-wrap {
		.content {
			/* 表格数据 */
			.table-box {
				background-color: #fff;
				border-radius: 20px;
				padding: 25px 50px;
				/* 工具栏 */
				.tools {
					/* 筛选框和搜索按钮 */
					.search {
						display: flex;
						flex-wrap: wrap;
						/* 登录账号、姓名、手机号 */
						.login-account, .name, .tel {
							display: flex;
							line-height: 40px;
							margin-right: 40px;
							span {
								margin-right: 10px;
								font-size: 18px;
								color: #545454;
							}
							.input {
								width: 200px;
							}
						}
						/* 角色、部门、当前状态 */
						.role, .department, .status {
							display: flex;
							line-height: 40px;
							margin-right: 40px;
							margin-bottom: 20px;
							span {
								margin-right: 10px;
								font-size: 18px;
								color: #545454;
							}
							.select {
								width: 130px;
							}
							.timePicker {
								width: 150px;
							}
						}
						.btn-search {
							margin-bottom: 20px;
							margin-left 20px
						}
					}
					/* 按钮组 */
					.btn-group {
						margin-top 20px
						.btn {
							margin-right 20px
						}
					}
				}
				/* 表格 */
				.table {
					margin-top 40px
					.cell {
						.edit {
							margin 0 15px
						}
					}
					.el-pagination {
						text-align: center;
						margin-top: 40px;
					}
				}
			}
		}
		/* 添加流量卡 */
		.addEdit-modal {
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.2);
			position: fixed;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 999;
			.add-edit {
				width: 590px;
				height: 490px;
				overflow-y: scroll;
				background-color: #fff;
				transform: translate(-50%, -50%);
				position: absolute;
				left: 50%;
				top: 50%;
				border-radius: 5px;
				.header {
					font-size: 30px;
					color: #737374;
					text-align: center;
					margin: 30px 0;
				}
				.box {
					padding: 0 95px;
					.box-item {
						display flex
						line-height: 34px;
						margin-bottom 22px
						span {
							margin-right: 10px;
							font-size: 18px;
							color: #545454;
						}
						.input, .select {
							width: 300px;
							height 34px
						}
					}
					.btn-group {
						margin-top 48px
						text-align center
						.btn-save {
							margin-left 80px
						}
					}
				}
			}
		}
	}
</style>
<style lang="stylus">
	.el-input {
		.el-input__inner {
			height 34px
			line-height 34px
		}
	}
</style>
