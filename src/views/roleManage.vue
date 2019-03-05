<template>
	<div class="roleManage-wrap wrap">
		<div class="content wrap-content">
			<!-- 标题 -->
			<div class="page-title">
				<div class="line"></div>
				<span>角色管理</span>
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
						<!-- 搜索按钮 -->
						<div class="btn-search btn-main">搜索</div>
					</div>
					<!-- 按钮组 -->
					<div class="btn-group">
						<div class="btn btn-add btn-green">添加</div>
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
						<el-table-column label="序号" prop="sortNum" align="center"></el-table-column>
						<el-table-column label="角色名称" prop="roleName" align="center"></el-table-column>
						<el-table-column label="备注" prop="remark" align="center"></el-table-column>
						<el-table-column label="操作" width="200" align="center">
							<template slot-scope="scope">
								<span class="table-button watch" @click="goDeatil(scope.row)">查看</span>
								<span class="table-button edit">修改</span>
								<span class="table-button config">角色配置</span>
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
					loginAccount: ''
				},
				// 表格数据
				tableData: [
					{
						sortNum: 1,
						roleName: '管理员',
						remark: 'this is a remark'
					},
					{
						sortNum: 2,
						roleName: '运营专员',
						remark: 'this is a remark'
					}
				],
				// 表格分页
				totalCount: 1234,
				pageSize: 20,
				pageNo: 1,
				// 加载
				loading: '',
				// 当前选中的
				currentArr: []
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

			// 选择卡号或者iccid
			checkCardOrIccid(i) {
				if(i == '1') {
					this.tools.startPlaceHolder = '请输入开始的卡号'
					this.tools.endPlaceHolder = '请输入结束的卡号'
					this.tools.startNum = ''
					this.tools.endNum = ''
					this.tools.inputShow = true
				}else if(i == '2') {
					this.tools.startPlaceHolder = '请输入开始的ICCID'
					this.tools.endPlaceHolder = '请输入结束的ICCID'
					this.tools.startNum = ''
					this.tools.endNum = ''
					this.tools.inputShow = true
				}else {
					this.tools.startPlaceHolder = ''
					this.tools.endPlaceHolder = ''
					this.tools.startNum = ''
					this.tools.endNum = ''
					this.tools.inputShow = false
				}
			},
			// 改变当前页数
			changePageNo(val) {
				this.pageNo = val;
			},
			// 改变每页显示的条数
			changeSize(val) {
				this.pageSize = val;
				this.pageNo = 1;
			},
			// 获取所有的运营商
			getNetWork() {
				this.$axios({
					url: '/api/getNetWork',
					method: 'post'
				}).then(res => {
					// console.log(res.data.data)
					let data = res.data.object
//					console.log(data)
					this.netWorkNav = []
					// 如果没有流量池，则跳出
					if(!data.length) {
						this.noPool = true
						return
					}
					this.noPool = false
					this.tabIndex = data[0].netWork
					for(let i=0; i<data.length; i++) {
						this.netWorkNav.push({
							netWork: getNetWork(data[i].netWork),
							tabIndex: data[i].netWork
						})
					}
				})
			},
			// 切换运营商
			toggleNetWorkNav(item) {
				this.tabIndex = item.tabIndex
				this.tools.poolId = ''
			},
			// 选择日期
			pickChange() {
				if (!this.tools.startTime && !this.tools.endTime) {
					this.tools.startTime = ''
					this.tools.endTime = ''
					this.pageNo = 1
					return
				}
				this.tools.startTime = format(new Date(this.tools.startTime).getTime(), "Y-m-d")
				this.tools.endTime = format(new Date(this.tools.endTime).getTime(), "Y-m-d")
				this.pageNo = 1
			},

			// 选中某几行
			selectRows(selection, row) {
				this.currentArr = selection
			},
			// 全选
			selectAll(selection){
				this.currentArr = selection
			},
			// 分配
			btnDistribute(i) {
				this.$router.push({
					path: '/flowDistribute',
					query: {
						id: 1
					}
				})
			}
		}
	};
</script>

<style lang="stylus" scoped>
	mainBlue = #1d9eed;
	mainButton = #4cb2ff;
	.roleManage-wrap {
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
						/* 登录账号 */
						.login-account {
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
	}
</style>