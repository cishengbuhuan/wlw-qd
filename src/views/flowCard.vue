<template>
	<div class="flowCard-wrap wrap">
		<div class="content wrap-content">
			<!-- 标题 -->
			<div class="page-title">
				<div class="line"></div>
				<span>流量卡库</span>
			</div>
			<!-- 运营商切换 -->
			<div class="tab-netWork">
				<div v-for="(item,index) in netWorkNav"
					:class="[{current: tabIndex == item.tabIndex},'tab-item']"
					@click="toggleNetWorkNav(item)"
					:key="index">
					{{ item.netWork }}
				</div>
			</div>
			<!-- 表格数据 -->
			<div class="table-box">
				<!-- 工具栏 -->
				<div class="tools">
					<!-- 筛选框和搜索按钮 -->
					<div class="search">
						<!-- 卡号或iccid -->
						<div class="card-iccid">
							<el-select class="select"
								placeholder="卡号/ICCID"
								@change="checkCardOrIccid"
								clearable
								v-model="tools.cardNum">
								<el-option
										v-for="item in tools.cardOptions"
										:key="item.value"
										:label="item.card"
										:value="item.value">
								</el-option>
							</el-select>
							<el-input class="input"
								v-show="tools.inputShow"
								:placeholder="tools.startPlaceHolder"
								v-model="tools.startNum">
							</el-input>
							<span v-show="tools.inputShow">-</span>
							<el-input class="input"
								v-show="tools.inputShow"
								:placeholder="tools.endPlaceHolder"
								v-model="tools.endNum">
							</el-input>
						</div>
						<!-- 制式 -->
						<div class="netWork-type">
							<span>制式: </span>
							<el-select class="select"
								placeholder="全部"
								clearable
								v-model="tools.netWorkType">
								<el-option
										v-for="item in tools.netWorkTypeOptions"
										:key="item.value"
										:label="item.netWorkType"
										:value="item.value">
								</el-option>
							</el-select>
						</div>
						<!-- 流量计算 -->
						<div class="flow-computed">
							<span>流量计算: </span>
							<el-select class="select"
								placeholder="全部"
								clearable
								v-model="tools.flow">
								<el-option
										v-for="item in tools.flowOptions"
										:key="item.value"
										:label="item.flow"
										:value="item.value">
								</el-option>
							</el-select>
						</div>
						<!-- 批次日期 -->
						<div class="batch-time">
							<span>批次日期: </span>
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
						<div class="btn-select btn-green" @click="btnDistribute(0)">选取分配</div>
						<div class="btn-all btn-main" @click="btnDistribute(1)">全量分配</div>
					</div>
				</div>
				<!-- 表格 -->
				<div class="table">
					<el-table
							:data="tableData"
							@select="selectRows"
							@select-all="selectAll"
							border
							v-loading="loading"
							element-loading-text="正在加载数据，请稍候"
							style="width: 100%">
						<el-table-column type="selection" width="55" align="center"></el-table-column>
						<el-table-column label="卡号" prop="cardNum" align="center"></el-table-column>
						<el-table-column label="ICCID" prop="iccid" align="center"></el-table-column>
						<el-table-column label="套餐名称" prop="packagesName" align="center"></el-table-column>
						<el-table-column label="流量计算" prop="flowComputed" align="center"></el-table-column>
						<el-table-column label="制式" prop="netWorkType" align="center"></el-table-column>
						<el-table-column label="批次时间" prop="batchTime" align="center"></el-table-column>
						<el-table-column label="到期时间" prop="endTime" align="center"></el-table-column>
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
				// 运营商切换
				tabIndex: '1',
				netWorkNav: [
					{
						netWork: '移动',
						tabIndex: 1
					},
					{
						netWork: '联通',
						tabIndex: 2
					},
					{
						netWork: '电信',
						tabIndex: 3
					}
				],
				// 加载
				loading: '',
				// 表格工具栏
				tools: {
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
					// 流量计算
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
					// 批次日期
					startTime: '',
					endTime: '',
				},
				// 表格数据
				tableData: [
					{
						cardNum: '1234567',
						iccid: '123456789',
						packagesName: '100MB/月',
						flowComputed: '单卡',
						netWorkType: '4G',
						batchTime: '2018-08-09',
						endTime: '2019-09-09'
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
	.flowCard-wrap {
		.content {
			/* 运营商切换 */
			.tab-netWork {
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
						/* 制式、流量计算 */
						.netWork-type, .flow-computed, .batch-time{
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