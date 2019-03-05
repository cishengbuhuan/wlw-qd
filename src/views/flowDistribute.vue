<template>
	<div class="add-edit-wrap wrap">
		<div class="content wrap-content">
			<!-- 标题 -->
			<div class="page-title">
				<div class="line"></div>
				<span>流量卡库<span class="small">卡片分配</span></span>
			</div>
            <!-- box -->
			<div class="distribute-box">
				<!-- 卡号 -->
				<div class="card">
					<span>卡号/ICCID</span>
					<div class="card-box"
						v-loading="cardBoxLoading"
						element-loading-text="正在加载数据，请稍侯">
						<p>{{ cardNum }}</p>
					</div>
				</div>
				<!-- 基本信息 -->
				<div class="base-info">
					<div class="info-item">
						套餐流量: <span>{{ base.packageFlow }}</span>
					</div>
					<div class="info-item">
						套餐类型: <span>{{ base.packageType }}</span>
					</div>
					<div class="info-item">
						流量计算: <span>{{ base.flowComputed }}</span>
					</div>
					<div class="info-item">
						制式: <span>{{ base.netWorkType }}</span>
					</div>
				</div>
				<!-- 分配商户 -->
				<div class="distribute-customer">
					<span>分配商户: </span>
					<el-select class="select"
						placeholder="请选择"
						clearable
						v-model="distribution">
						<el-option
								v-for="item in distributionOptions"
								:key="item.value"
								:label="item.distribution"
								:value="item.value">
						</el-option>
					</el-select>
				</div>
				<!-- 出售折扣率 -->
				<div class="discount">
					<span>出售折扣率: </span>
					<el-input class="input"
						v-model="discount">
					</el-input>
				</div>
				<!-- 小结 -->
				<div class="summary">
					<div class="summary-item">
						单卡套餐费用: <span>{{ summary.packageFee }}</span>
					</div>
					<div class="summary-item">
						卡数: <span>{{ summary.numbers }}</span>
					</div>
					<div class="summary-item">
						出售价格: <span>{{ summary.sellPrice }}</span>
					</div>
					<div class="summary-item">
						折后价格: <span>{{ summary.discountPrice }}</span>
					</div>
				</div>
				<!-- 按钮组 -->
				<div class="btn-group">
					<div class="btn-back btn-gray">返回</div>
					<div class="btn-sure btn-main">确认</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 卡号/ICCID
				cardNum: '',
				// 基本信息
				base: {
					packageFlow: '100M',
					packageType: '月',
					flowComputed: '流量池',
					netWorkType: '4G'
				},
				// 分配商户
				distribution: '',
				distributionOptions: [
					{
						value: '1',
						distribution: '自用'
					},
					{
						value: '2',
						distribution: '上海量之阵信息技术有限公司'
					}
				],
				// 出售折扣率
				discount: '',
				// 小结
				summary: {
					packageFee: '10元',
					numbers: '50张',
					sellPrice: '500元',
					discountPrice: '400元'
				}
			};
		},
		mounted() {
            this.way = this.$route.query.way
		},
		created() {
		},
		methods: {
			
		}
	};
</script>

<style lang="stylus" scoped>
	.add-edit-wrap {
		.content {
            .distribute-box {
                background-color: #fff;
                border-radius: 20px;
                padding: 30px;
                margin-top: 20px;
                padding-left: 70px;
				/* 卡号 */
				.card {
					display flex
					span {
						font-size: 28px;
						color: #85888f;
						margin-right: 76px;
					}
					.card-box {
						width: 350px;
						height: 200px;
						border: 1px solid #e7ebf3;
						overflow-x: hidden;
						overflow-y: scroll;
						font-size: 17px;
						color: #393d42;
						padding: 10px;
						p {
							line-height: 30px;
						}
					}
				}
				/* 基本信息 */
				.base-info {
					display flex
					margin 30px 0 35px
					.info-item {
						margin-right 60px
						font-size 18px
						color #85888f
						span {
							color #393d42
						}
					}
				}
				/* 分配商户 */
				.distribute-customer {
					display: flex;
					line-height: 40px;
					span {
						font-size: 18px;
						color: #545454;
						margin-right 40px
					}
					.select {
						width: 370px;
					}
				}
				/* 出售折扣率 */
				.discount {
					display: flex;
					line-height: 40px;
					margin 20px 0 30px
					span {
						font-size: 18px;
						color: #545454;
						margin-right: 21px;
					}
					.input {
						width: 200px;
					}
				}
				/* 小结 */
				.summary {
					display flex
					.summary-item {
						font-size 18px
						color #85888f
						margin-right 50px
						span {
							color #1d9eed
						}
					}
				}
				/* 按钮组 */
				.btn-group {
					margin-top 60px
					.btn-sure {
						margin-left 80px
					}
				}
			}
		}
	}
</style>
