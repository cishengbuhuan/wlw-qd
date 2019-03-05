<template>
	<div class="flowCard-wrap wrap">
		<div class="content wrap-content">
			<!-- 标题 -->
			<div class="page-title">
				<div class="line"></div>
				<span>客户产品信息</span>
			</div>
			<!-- 流量池切换 -->
			<div class="tab-flowPool">
				<div v-for="(item,index) in flowPoolNav"
					:class="[{current: tabIndex == item.tabIndex},'tab-item']"
					@click="toggleflowPoolNav(item)"
					:key="index">
					{{ item.flowPool }}
				</div>
			</div>
			<!-- 表格数据 -->
			<div class="table-box" v-if="tabIndex == 1">
				<!-- 工具栏 -->
				<div class="tools">
					<!-- 筛选框和搜索按钮 -->
					<div class="search">
						<!-- 客户名称 -->
						<div class="customer">
							<span>客户名称: </span>
							<el-input class="input"
								v-model="tools.pool.customer">
							</el-input>
						</div>
						<!-- 运营商 -->
						<div class="netWork">
							<span>运营商: </span>
							<el-select class="select"
								placeholder="全部"
								clearable
								v-model="tools.pool.netWork">
								<el-option
										v-for="item in tools.pool.netWorkOptions"
										:key="item.value"
										:label="item.netWork"
										:value="item.value">
								</el-option>
							</el-select>
						</div>
						<!-- 套餐流量 -->
						<div class="flow-packages">
							<span>流量计算: </span>
							<el-select class="select"
								placeholder="全部"
								clearable
								v-model="tools.pool.flow">
								<el-option
										v-for="item in tools.pool.flowOptions"
										:key="item.value"
										:label="item.flow"
										:value="item.value">
								</el-option>
							</el-select>
						</div>
						<!-- 套餐类型 -->
						<div class="flow-type">
							<span>套餐类型: </span>
							<el-select class="select"
								placeholder="全部"
								clearable
								v-model="tools.pool.type">
								<el-option
										v-for="item in tools.pool.typeOptions"
										:key="item.value"
										:label="item.type"
										:value="item.value">
								</el-option>
							</el-select>
						</div>
						<!-- 搜索按钮 -->
						<div class="btn-search btn-main">搜索</div>
					</div>
					<!-- 导出按钮 -->
					<div class="btn-export btn-main">导出</div>
				</div>
				<!-- 表格 -->
				<div class="table">
					<el-table
							:data="poolData"
							border
							v-loading="loading"
							element-loading-text="正在加载数据，请稍候"
							style="width: 100%">
						<el-table-column label="客户名称" prop="customerName" align="center"></el-table-column>
						<el-table-column label="运营商" prop="netWork" align="center"></el-table-column>
						<el-table-column label="套餐流量" prop="packageFlow" align="center"></el-table-column>
						<el-table-column label="套餐类型" prop="packageType" align="center"></el-table-column>
						<el-table-column label="总流量" prop="totalFlow" align="center"></el-table-column>
						<el-table-column label="已使用流量" prop="flowUsage" align="center"></el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<span class="table-button" @click="goCardInfo(scope.row)">卡片信息</span>
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
			<div class="table-box" v-if="tabIndex == 2">
				<!-- 工具栏 -->
				<div class="tools">
					<!-- 筛选框和搜索按钮 -->
					<div class="search">
						<!-- 商户名称 -->
						<div class="customer">
							<span>商户名称: </span>
							<el-input class="input"
								v-model="tools.notPool.customer">
							</el-input>
						</div>
						<!-- 卡号或iccid -->
						<div class="card-iccid">
							<el-select class="select"
								placeholder="卡号/ICCID"
								@change="checkCardOrIccid"
								clearable
								v-model="tools.notPool.cardNum">
								<el-option
										v-for="item in tools.notPool.cardOptions"
										:key="item.value"
										:label="item.card"
										:value="item.value">
								</el-option>
							</el-select>
							<el-input class="input"
								v-show="tools.notPool.inputShow"
								:placeholder="tools.notPool.startPlaceHolder"
								v-model="tools.notPool.startNum">
							</el-input>
							<span v-show="tools.notPool.inputShow">-</span>
							<el-input class="input"
								v-show="tools.notPool.inputShow"
								:placeholder="tools.notPool.endPlaceHolder"
								v-model="tools.notPool.endNum">
							</el-input>
						</div>
						<!-- 在线状态 -->
						<div class="online-status">
							<span>在线状态: </span>
							<el-select class="select"
								placeholder="全部"
								clearable
								v-model="tools.notPool.onlineStatus">
								<el-option
										v-for="item in tools.notPool.onlineStatusOptions"
										:key="item.value"
										:label="item.onlineStatus"
										:value="item.value">
								</el-option>
							</el-select>
						</div>
						<!-- 激活状态 -->
						<div class="active-status">
							<span>激活状态: </span>
							<el-select class="select"
								placeholder="全部"
								clearable
								v-model="tools.notPool.activeStatus">
								<el-option
										v-for="item in tools.notPool.activeStatusOptions"
										:key="item.value"
										:label="item.activeStatus"
										:value="item.value">
								</el-option>
							</el-select>
						</div>
						<!-- 停机状态 -->
						<div class="stop-status">
							<span>停机状态: </span>
							<el-select class="select"
								placeholder="全部"
								clearable
								v-model="tools.notPool.stopStatus">
								<el-option
										v-for="item in tools.notPool.stopStatusOptions"
										:key="item.value"
										:label="item.stopStatus"
										:value="item.value">
								</el-option>
							</el-select>
						</div>
						<!-- 制式 -->
						<div class="netWork-type">
							<span>制式: </span>
							<el-select class="select"
								placeholder="全部"
								clearable
								v-model="tools.notPool.netWorkType">
								<el-option
										v-for="item in tools.notPool.netWorkTypeOptions"
										:key="item.value"
										:label="item.netWorkType"
										:value="item.value">
								</el-option>
							</el-select>
						</div>
						<!-- 批次日期 -->
						<div class="batch-time">
							<span>批次日期: </span>
							<el-date-picker
									v-model="tools.notPool.startTime"
									@change="pickChange"
									class="timePicker"
									type="date"
									placeholder="开始日期">
							</el-date-picker>
							&nbsp; 至 &nbsp;
							<el-date-picker
									v-model="tools.notPool.endTime"
									@change="pickChange"
									class="timePicker"
									type="date"
									placeholder="结束日期">
							</el-date-picker>
						</div>
						<!-- 备注信息 -->
						<div class="remark">
							<span>备注信息: </span>
							<el-input class="input"
								v-model="tools.notPool.remark">
							</el-input>
						</div>
						<!-- 搜索按钮 -->
						<div class="btn-search btn-main">搜索</div>
					</div>
					<!-- 导出按钮 -->
					<div class="btn-export btn-main">导出</div>
				</div>
				<!-- 表格 -->
				<div class="table">
					<el-table
							:data="notPoolData"
							border
							v-loading="loading"
							element-loading-text="正在加载数据，请稍候"
							style="width: 100%">
						<el-table-column label="客户名称" prop="customerName" align="center"></el-table-column>
						<el-table-column label="卡号" prop="cardNum" align="center"></el-table-column>
						<el-table-column label="ICCID" prop="iccid" align="center"></el-table-column>
						<el-table-column label="本月已使用流量" prop="usageMonth" align="center"></el-table-column>
						<el-table-column label="剩余流量" prop="flowOverage" align="center"></el-table-column>
						<el-table-column label="套餐名称" prop="packagesName" align="center"></el-table-column>
						<el-table-column label="在线状态" prop="onlineStatus" align="center"></el-table-column>
						<el-table-column label="激活状态" prop="activeStatus" align="center"></el-table-column>
						<el-table-column label="停机状态" prop="stopStatus" align="center"></el-table-column>
						<el-table-column label="制式" prop="netWorkType" align="center"></el-table-column>
						<el-table-column label="批次时间" prop="batchTime" align="center"></el-table-column>
						<el-table-column label="到期时间" prop="endTime" align="center"></el-table-column>
						<el-table-column label="备注" prop="remark" align="center"></el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<span class="table-button" @click="goDeatil(scope.row)">卡片详情</span>
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
				// 流量池
				tabIndex: '1',
				flowPoolNav: [
					{
						flowPool: '流量池',
						tabIndex: 1
					},
					{
						flowPool: '非流量池',
						tabIndex: 2
					}
				],
				// 加载
				loading: '',
				// 表格工具栏
				tools: {
					// 流量池
					pool: {
						// 客户名称
						customer: '',
						// 运营商
						netWork: '',
						netWorkOptions: [
							{
								value: '1',
								netWork: '移动'
							},
							{
								value: '2',
								netWork: '联通'
							},
							{
								value: '3',
								netWork: '电信'
							}
						],
						// 套餐流量
						flow: '',
						flowOptions: [
							{
								value: '1',
								flow: '流量池'
							},
							{
								value: '2',
								flow: '单卡'
							}
						],
						// 套餐类型
						type: '',
						typeOptions: [
							{
								value: '1',
								type: '月'
							},
							{
								value: '2',
								type: '半年'
							},
							{
								value: '3',
								type: '季'
							},
							{
								value: '4',
								type: '年'
							}
						]
					},
					// 非流量池
					notPool: {
						// 商户名称
						customer: '',
						// 卡号或者iccid
						cardNum: '',
						cardOptions: [
							{
								value: '1',
								card: '卡号'
							},
							{
								value: '2',
								card: 'ICCID'
							}
						],
						inputShow: false,
						startNum: '',
						endNum: '',
						startPlaceHolder: '',
						endPlaceHolder: '',
						// 在线状态
						onlineStatus: '',
						onlineStatusOptions: [
							{
								value: '1',
								onlineStatus: '在线'
							},
							{
								value: '2',
								onlineStatus: '离线'
							}
						],
						// 激活状态
						activeStatus: '',
						activeStatusOptions: [
							{
								value: '1',
								activeStatus: '已激活'
							},
							{
								value: '2',
								activeStatus: '未激活'
							}
						],
						// 停机状态
						stopStatus: '',
						stopStatusOptions: [
							{
								value: '1',
								stopStatus: '已停机'
							},
							{
								value: '2',
								stopStatus: '未停机'
							}
						],
						// 制式
						netWorkType: '',
						netWorkTypeOptions: [
							{
								value: '1',
								netWorkType: '5G'
							},
							{
								value: '2',
								netWorkType: '4G'
							},
							{
								value: '3',
								netWorkType: '3G'
							},
							{
								value: '4',
								netWorkType: '2G'
							},
							{
								value: '5',
								netWorkType: 'NB'
							},
							{
								value: '6',
								netWorkType: 'EMTC'
							}
						],
						// 批次日期
						startTime: '',
						endTime: '',
						// 备注信息
						remark: ''
					}
				},
				// 流量池表格数据
				poolData: [
					{
						customerName: '张三',
						netWork: '移动',
						packageFlow: '100MB',
						packageType: '月',
						totalFlow: '100M',
						flowUsage: '10M',
						deviceId: 12
					}
				],
				// 非流量池表格数据
				notPoolData: [
					{
						customerName: '章三',
						cardNum: '123456',
						iccid: '123456',
						usageMonth: '30M',
						flowOverage: '70M',
						packagesName: '100M/月',
						onlineStatus: '在线',
						activeStatus: '已激活',
						stopStatus: '已停机',
						netWorkType: '5G',
						batchTime: '2018-08-08',
						endTime: '2019-08-07',
						remark: 'this is a remrak',
						deviceId: 46120
					}
				],
				// 表格分页
				totalCount: 1234,
				pageSize: 20,
				pageNo: 1,
				// 加载
				loading: '',
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
					this.tools.notPool.startPlaceHolder = '请输入开始的卡号'
					this.tools.notPool.endPlaceHolder = '请输入结束的卡号'
					this.tools.notPool.startNum = ''
					this.tools.notPool.endNum = ''
					this.tools.notPool.inputShow = true
				}else if(i == '2') {
					this.tools.notPool.startPlaceHolder = '请输入开始的ICCID'
					this.tools.notPool.endPlaceHolder = '请输入结束的ICCID'
					this.tools.notPool.startNum = ''
					this.tools.notPool.endNum = ''
					this.tools.notPool.inputShow = true
				}else {
					this.tools.notPool.startPlaceHolder = ''
					this.tools.notPool.endPlaceHolder = ''
					this.tools.notPool.startNum = ''
					this.tools.notPool.endNum = ''
					this.tools.notPool.inputShow = false
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
			// 切换流量池与非流量池
			toggleflowPoolNav(item) {
				this.tabIndex = item.tabIndex
				// this.tools.poolId = ''
			},
			// 选择日期
			pickChange() {
				if (!this.tools.notPool.startTime && !this.tools.notPool.endTime) {
					this.tools.notPool.startTime = ''
					this.tools.notPool.endTime = ''
					this.pageNo = 1
					return
				}
				this.tools.notPool.startTime = format(new Date(this.tools.notPool.startTime).getTime(), "Y-m-d")
				this.tools.notPool.endTime = format(new Date(this.tools.notPool.endTime).getTime(), "Y-m-d")
				this.pageNo = 1
			},
			// 跳转到卡片信息
			goCardInfo(data) {
				let deviceId = data.deviceId
				this.$router.push({
					path: '/cardInfo',
					query: {
						deviceId: deviceId
					}
				})
			},
			// 跳转到卡片详情
			goDeatil(data) {
				let deviceId = data.deviceId
				this.$router.push({
					path: '/cardDetail',
					query: {
						deviceId: deviceId
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
			/* 流量池切换 */
			.tab-flowPool {
				display: flex;
				.tab-item {
					width: 166px;
					height: 78px;
					font-size: 24px;
					color: #545454;
					text-align: center;
					line-height: 58px;
					cursor: pointer;
				}
				.current {
					background-color: #fff;
					border-top-left-radius: 20px;
					border-top-right-radius: 20px;
					color: mainBlue;
					position: relative;
				}
				.current:before {
					content: '';
					display: block;
					width: 32px;
					height: 4px;
					background-color: mainBlue;
					position: absolute;
					bottom: 20px;
					left: 67px;
				}
			}
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
						/* 卡号或iccid */
						.card-iccid {
							display: flex;
							margin-right: 40px;
							.select {
								width: 130px;
								margin-right: 10px;
							}
							.input {
								width: 200px;
							}
							span {
								line-height: 40px;
								margin: 0 10px;
							}
						}
						/* 运营商、套餐流量、套餐类型 */
						.netWork, .flow-packages, .flow-type,
						/* 在线状态、激活状态、停机状态、制式、批次时间 */
						.online-status, .active-status, .stop-status, .netWork-type, .batch-time  {
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
						/* 客户名称、备注信息 */
						.customer, .remark {
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
						.btn-all {
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