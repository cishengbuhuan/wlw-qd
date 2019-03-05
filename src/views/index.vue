<template>
	<div class="index-wrap wrap">
		<div class="content wrap-content">
			<!-- 公司基本信息 -->
			<div class="base-info">
				<!-- 公司名称和总卡数 -->
				<div class="info-item name-card">
					<div class="name">
						<span>{{ baseInfo.name }}</span>
						<div class="hello">
							<div class="icon"><img src="../assets/images/index/icon-admin.png"></div>
							<span>{{ baseInfo.hello }}好！</span>
						</div>
					</div>
					<div class="card">
						<div class="icon"><img src="../assets/images/index/icon-card.png"></div>
						<div class="tip">总卡数</div>
						<span>{{ baseInfo.totalCard }}</span>
					</div>
				</div>
				<!-- 账户余额 -->
				<div class="info-item balance">
					<div class="icon"><img src="../assets/images/index/icon-balance.png"></div>
					<div class="tip">账户余额</div>
					<span>{{ baseInfo.balance }}</span>
				</div>
				<!-- 客户数量 -->
				<div class="info-item customer">
					<div class="icon"><img src="../assets/images/index/icon-customer.png"></div>
					<div class="tip">客户数量</div>
					<span>{{ baseInfo.customer }}</span>
				</div>
			</div>
			<!-- 客户列表 -->
			<div class="customer-list">
				<div class="table-box">
					<el-table
							:data="tableData"
							border
							v-loading="loading"
							element-loading-text="正在加载数据，请稍候"
							style="width: 100%">
						<el-table-column label="客户名称" align="center">
							<template slot-scope="scope">
								<span class="detail" @click="goDeatil(scope.row)">{{ scope.row.customerName }}</span>
							</template>
						</el-table-column>
						<el-table-column label="总卡数" prop="totalCard" align="center"></el-table-column>
						<el-table-column label="激活数" prop="active" align="center"></el-table-column>
						<el-table-column label="在线数" prop="online" align="center"></el-table-column>
						<el-table-column label="停卡数" prop="stop" align="center"></el-table-column>
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
	export default {
		data() {
			return {
				baseInfo: {
					name: '上海量之阵信息技术有限公司',
					totalCard: '222',
					balance: '333',
					customer: '123',
					hello: ''
				},
				// 表格分页
				totalCount: 1234,
				pageSize: 20,
				pageNo: 1,
				// 加载
				loading: '',
				// 客户列表
				tableData: [
					{
						customerName: '上海量之阵信息技术有限公司',
						totalCard: 100,
						active: 20,
						online: 60,
						stop: 20,
						id: 1
					}
				]
			};
		},
		mounted() {
			this.getCurrentTime()
		},
		created() {
		},
		methods: {
			// 获取当前时间
			getCurrentTime() {
				let now = new Date(),
					hour = now.getHours()
				if(hour < 6) {
					this.baseInfo.hello = '凌晨'
				}else if(hour<9) {
					this.baseInfo.hello = '早上'
				}else if(hour<12) {
					this.baseInfo.hello = '上午'
				}else if(hour<14) {
					this.baseInfo.hello = '中午'
				}else if(hour<17) {
					this.baseInfo.hello = '下午'
				}else if(hour<19) {
					this.baseInfo.hello = '傍晚'
				}else if(hour<22) {
					this.baseInfo.hello = '晚上'
				}else {
					this.baseInfo.hello = '夜里'
				}
			},
			// 获取到基本信息
			getBaseInfo() {
				this.$axios({
					url: '/api/v2/base/getBasal',
					method: 'post'
				}).then(res => {
					let data = res.data.data;
					this.baseInfo.name = data.companyName
					this.baseInfo.totalCard = data.cardNo
				})
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
			// 跳转到客户详情
			goDeatil(data) {
				let id = data.id;
				this.$router.push({
					path: '/customerIntro',
					query: {
						id: id
					}
				})
			}
		}
	};
</script>

<style lang="stylus" scoped>
	mainBlue = #4cb2ff;
	.index-wrap {
		.content {
			.icon {
				width: 28px;
				height: 28px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			/* 公司基本信息 */
			.base-info {
				width: 100%;
				height: 200px;
				border-radius: 20px;
				display: flex;
				background-color: #fff;
				padding: 30px 40px 0;
				/* 公司名称和总卡数 */
				.name-card {
					display: flex;
					flex: 4;
					justify-content: space-between;
					.name {
						span {
							font-size: 30px;
						}
						.hello {
							display: flex;
							margin-top: 30px;
							.icon {
								margin-right: 10px;
							}
							span {
								font-size: 24px;
							}
						}
					}
					.card {
						padding-right: 30px;
						text-align: center;
						.icon {
							margin: 0 auto;
							margin-top: 20px;
						}
						.tip {
							font-size: 24px;
							margin: 15px 0 -5px;
						}
						span {
							color: #1d9eed;
							font-size: 36px;
						}
					}
				}
				/* 账户余额 */
				.balance, .customer {
					flex: 1;
					text-align: center;
					position: relative;
					.icon {
						margin: 0 auto;
						margin-top: 20px;
					}
					.tip {
						font-size: 24px;
						margin: 15px 0 -5px;
					}
					span {
						color: #ed7f1d;
						font-size: 36px;
					}
				}
				/* 客户数量 */
				.customer {
					span {
						color: #68de00;
					}
				}
				.balance:before, .customer:before {
					content: '';
					display: block;
					width: 1px;
					height: 60px;
					background-color: #d2d2d2;
					position: absolute;
					top: 70px;
					left: 0;
				}
			}
			/* 客户列表 */
			.customer-list {
				background-color: #fff;
				border-radius: 20px;
				margin-top: 20px;
				padding: 25px 50px;
				.table-box {
					/* 分页 */
					.el-pagination {
						text-align: center;
						margin-top: 40px;
					}
					.detail:hover {
						color mainBlue
						cursor pointer
					}
				}
			}
		}
	}
</style>
