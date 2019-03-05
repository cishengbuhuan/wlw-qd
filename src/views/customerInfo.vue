<template>
	<div class="flowCard-wrap wrap">
		<div class="content wrap-content">
			<!-- 标题 -->
			<div class="page-title">
				<div class="line"></div>
				<span>客户信息</span>
			</div>
			<!-- 表格数据 -->
			<div class="table-box">
				<!-- 工具栏 -->
				<div class="tools">
					<!-- 筛选框和搜索按钮 -->
					<div class="search">
						<!-- 客户 -->
						<div class="customer">
							<span>客户: </span>
							<el-input class="input"
								v-model="tools.customer">
							</el-input>
						</div>
						<!-- 状态 -->
						<div class="status">
							<span>状态: </span>
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
						<!-- 更新时间 -->
						<div class="update-time">
							<span>更新时间: </span>
							<el-date-picker
									v-model="tools.startTime"
									@change="pickChange"
									class="timePicker"
									type="date"
									placeholder="开始日期">
							</el-date-picker>
							&nbsp; 至 &nbsp;
							<el-date-picker
									v-model="tools.endTime"
									@change="pickChange"
									class="timePicker"
									type="date"
									placeholder="结束日期">
							</el-date-picker>
						</div>
						<!-- 搜索按钮 -->
						<div class="btn-search btn-main">搜索</div>
					</div>
					<!-- 套餐变更按钮 -->
					<div class="btn-group">
						<div class="btn-add btn-green" @click="btnOperate(1)">新增</div>
						<div class="btn-edit btn-main" @click="btnOperate(2)">修改</div>
					</div>
				</div>
				<!-- 表格 -->
				<div class="table">
					<el-table
							:data="tableData"
							v-loading="loading"
							element-loading-text="正在加载数据，请稍候"
							highlight-current-row
							@row-click = "showRow"
							border
							style="width: 100%">
						<el-table-column label="选择" width="70" align="center">
							<template slot-scope="scope">
								<el-radio class="radio"
									v-model="radio"
									:label="scope.$index"
									@change.native="getCurrentRow(scope.row)"></el-radio>
							</template>
						</el-table-column>
						<el-table-column label="客户编号" prop="customerCode" align="center"></el-table-column>
						<el-table-column label="客户名称" prop="customerName" align="center"></el-table-column>
						<el-table-column label="更新时间" prop="updateTime" align="center"></el-table-column>
						<el-table-column label="联系人" prop="contactName" align="center"></el-table-column>
						<el-table-column label="联系方式" prop="contactWay" align="center"></el-table-column>
						<el-table-column label="状态" prop="status" align="center"></el-table-column>
						<el-table-column label="备注" prop="remark" align="center"></el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<span class="table-button" @click="goDeatil(scope.row)">详情</span>
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
				// 工具栏
				tools: {
					// 客户
					customer: '',
					// 状态
					status: '',
					statusOptions: [
						{
							value: '1',
							status: '正常'
						},
						{
							value: '2',
							status: '停用'
						}
					],
					// 更新时间
					startTime: '',
					endTime: ''
				},
				// 加载
				loading: '',
				// 表格数据
				tableData: [
					{
						customerCode: '12345',
						customerName: '章三',
						updateTime: '2018-08-08',
						contactName: '章三',
						contactWay: '123456',
						status: '正常',
						remark: 'this is a remark'
					}
				],
				// 表格分页
				totalCount: 1234,
				pageSize: 20,
				pageNo: 1,
				// 加载
				loading: '',
				radio: '',
				// 当前选中的项
				currentSelect: '',
			};
		},
		mounted() {
			// this.getNetWork()
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
			showRow(row){
				//赋值给radio
				this.radio = this.tableData.indexOf(row);
				this.currentSelect = row

//				console.log(row)
			},
			getCurrentRow(data){
				console.log(data)
				this.currentSelect = data
			},
			// 新增/修改
			btnOperate(i) {
				// 如果是新增，则直接跳转到新增页面去
				if(i==1) {
					// 跳转到新增页面
					this.$router.push({
						path: '/addEdit',
						query: {
							way: i
						}
					})
				}else {
					if(!this.currentSelect) {
						this.$message.info('请先选择要修改的客户')
						return
					}
					console.log(this.currentSelect)
					let customerName = this.currentSelect.customerName
					let contactName = this.currentSelect.contactName
					let contactWay = this.currentSelect.contactWay
					let status = this.currentSelect.status
					let remark = this.currentSelect.remark
					// 带上信息跳转到修改页面去
					this.$router.push({
						path: '/addEdit',
						query: {
							way: i,
							customerName: customerName,
							contactName: contactName,
							contactWay: contactWay,
							status: status,
							remark: remark
						}
					})
				}
			},
			// 日期改变
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
			}
		}
	};
</script>

<style lang="stylus" scoped>
	mainBlue = #1d9eed;
	mainButton = #4cb2ff;
	.flowCard-wrap {
		.content {
			/* 表格数据 */
			.table-box {
				background-color: #fff;
				border-radius: 20px;
				margin-top: -20px;
				padding: 25px 50px;
				/* 工具栏 */
				.tools {
					/* 筛选框和搜索按钮 */
					.search {
						display: flex;
						flex-wrap: wrap;
						/* 客户、状态、更新时间 */
						.customer, .status, .update-time{
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
								width: 190px;
							}
						}
						.customer {
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
						}
					}
					/* 按钮组 */
					.btn-group {
						.btn-edit {
							margin-left 20px
						}
					}
				}
				/* 表格 */
				.table {
					margin-top 40px
					.el-pagination {
						text-align: center;
						margin-top: 40px;
					}
				}
			}
		}
	}
</style>

<style lang="stylus">
	.cell {
		.radio {
			display: flex;
			justify-content: center;
			.el-radio__label {
				display: none;
			}
		}
	}
</style>