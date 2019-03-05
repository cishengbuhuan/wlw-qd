<template>
	<div class="index-wrap">
		<div class="content">
			<!-- title -->
			<div class="title">
				<div class="icon">
					<img src="../assets/icon-title.png" alt="">
				</div>
				<span>数据模块资料</span>
			</div>
			<!-- 搜索框 -->
			<div class="search">
				<div class="input">
					<input type="text" v-model="searchVal">
				</div>
				<div class="btn-search" @click="getBaseInfo">搜索</div>
			</div>
			<!-- 筛选 -->
			<div class="select">
				<div class="select-title" @click="toggleSelect">
					<div class="icon">
						<img src="../assets/icon-select.png">
					</div>
					<span>筛选</span>
					<div class="arrow">
						<img class="arrow-right" v-show="!selectShow" src="../assets/icon-arrow-right.png">
						<img class="arrow-bottom" v-show="selectShow" src="../assets/icon-arrow-bottom.png">
					</div>
				</div>
				<div class="select-group" v-show="selectShow">
					<!-- 厂商 -->
					<div class="group-item">
						<div class="name">厂商</div>
						<div class="group">
							<div v-for="(item,index) in vendor"
								:key="index"
								:class="['item',{ isSelected: item.isSelected }]"
								@click="btnSelect(item)">{{ item.name }}</div>
						</div>
					</div>
					<!-- 通信环境 -->
					<div class="group-item">
						<div class="name">通信环境</div>
						<div class="group">
							<div v-for="(item,index) in communicationEnvironment"
								:key="index"
								:class="['item',{ isSelected: item.isSelected }]"
								@click="btnSelect(item)">{{ item.name }}</div>
						</div>
					</div>
					<!-- 文档类型 -->
					<div class="group-item">
						<div class="name">文档类型</div>
						<div class="group">
							<div v-for="(item,index) in documentType"
								:key="index"
								:class="['item',{ isSelected: item.isSelected }]"
								@click="btnSelect(item)">{{ item.name }}</div>
						</div>
					</div>
					<!-- 功能 -->
					<div class="group-item">
						<div class="name">功能</div>
						<div class="group">
							<div v-for="(item,index) in functionArr"
								:key="index"
								:class="['item',{ isSelected: item.isSelected }]"
								@click="btnSelect(item)">{{ item.name }}</div>
						</div>
					</div>
					<!-- 基带芯片 -->
					<div class="group-item">
						<div class="name">基带芯片</div>
						<div class="group">
							<div v-for="(item,index) in baseChipArr"
								:key="index"
								:class="['item',{ isSelected: item.isSelected }]"
								@click="btnSelect(item)">{{ item.name }}</div>
						</div>
					</div>
					<!-- 频段基数 -->
					<div class="group-item">
						<div class="name">频段基数</div>
						<div class="group">
							<div v-for="(item,index) in freBaseArr"
								:key="index"
								:class="['item',{ isSelected: item.isSelected }]"
								@click="btnSelect(item)">{{ item.name }}</div>
						</div>
					</div>
					<div class="btn-sure" @click="btnSure">确定</div>
				</div>
			</div>
			<!-- 产品 -->
			<div class="product">
				<div class="product-item" v-for="(item,index) in product" :key="index">
					<div class="intro">
						<div class="item-title">{{ item.title }}</div>
						<div class="item-info">{{ item.info }}</div>
						<div class="download-num">
							<div class="icon"><img src="../assets/icon-download.png"></div>
							<span>已下载{{ item.num }}次</span>
						</div>
					</div>
					<div class="download" @click="downloadPDF(item)">下载</div>
				</div>
			</div>
		</div>
		<!-- 手机验证码弹出框 -->
		<div class="modal-verify" v-show="verifyShow" @click.self="verifyShow = false">
			<div class="verify-box">
				<!-- 手机号 -->
				<div class="tel">
					<div class="icon">
						<img src="../assets/icon-tel.png">
					</div>
					<span>手机号</span>
					<div class="input">
						<input type="text" v-model="telVal">
					</div>
				</div>
				<!-- 验证码 -->
				<div class="code-btn">
					<div class="code">
						<div class="icon">
							<img src="../assets/icon-code.png">
						</div>
						<span>验证码</span>
						<div class="input">
							<input type="text" v-model="codeVal">
						</div>
					</div>
					<div class="btn-get" @click="getCode" v-if="!sendMsgDisabled">{{ code }}</div>
					<div class="btn-get" v-if="sendMsgDisabled">{{ count + '秒后获取' }}</div>
				</div>
				<!-- 立即验证 -->
				<div class="btn-verify" @click="btnVerify">立即验证</div>
				<!-- 底层背景图 -->
				<div class="bg-png"><img src="../assets/verify-tel.png"></div>
			</div>
		</div>
		<!-- 验证成功 -->
		<div class="verify-success" v-show="verifySuccess">
			<div class="success-box">
				<div class="btn-back" @click="btnBack">返回</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {baseUrl} from '../assets/base.js'
	export default {
		data() {
			return {
				// baseURL: 'http://47.96.232.174:8090',
				baseURL: `${baseUrl}`,
				// 搜索框
				searchVal: '',
				// 筛选项是否显示
				selectShow: false,
				// 手机号
				telVal: '',
				// 验证码弹出框
				verifyShow: false,
				code: '发送验证码',
				codeVal: '',
				count: '',
				defaultTime: 5,
				sendMsgDisabled: false,
				// 验证成功
				verifySuccess: false,
				// 厂商
				vendor: [
					{
						name: '移远',
						id: 1,
						isSelected: false
					},
					{
						name: '芯讯通',
						id: 2,
						isSelected: false
					},
					{
						name: '中移物联',
						id: 3,
						isSelected: false
					}
				],
				// 通信环境
				communicationEnvironment: [
					{
						name: '2G',
						type: 4,
						isSelected: false
					},
					{
						name: '4G',
						type: 2,
						isSelected: false
					},
					{
						name: 'NB',
						type: 5,
						isSelected: false
					},
				],
				// 文档类型
				documentType: [
					{
						name: 'AT命令手册',
						id: 1,
						isSelected: false
					},
					{
						name: '设计手册',
						id: 2,
						isSelected: false
					},
					{
						name: '产品规格书 ',
						id: 3,
						isSelected: false
					}
				],
				// 功能
				functionArr: [
					{
						name: '蓝牙',
						id: 1,
						isSelected: false
					},
					{
						name: 'GPS',
						id: 2,
						isSelected: false
					},
					{
						name: '语音',
						id: 3,
						isSelected: false
					}
				],
				// 基带芯片
				baseChipArr: [
					{
						name: 'C216B',
						isSelected: false
					},
					{
						name: 'MT2503 联发科',
						isSelected: false
					},
					{
						name: 'MTK 联发科',
						isSelected: false
					},
					{
						name: 'MTK 联发科6261',
						isSelected: false
					},
					{
						name: 'RDA',
						isSelected: false
					},
					{
						name: 'simcom',
						isSelected: false
					},
					{
						name: '中兴',
						isSelected: false
					},
					{
						name: '华为海思',
						isSelected: false
					},
					{
						name: '华为海思120',
						isSelected: false
					},
					{
						name: '华为海思150',
						isSelected: false
					},
					{
						name: '高通',
						isSelected: false
					},
					{
						name: '高通9207',
						isSelected: false
					},
					{
						name: '高通9607',
						isSelected: false
					},
				],
				// 频段基数
				freBaseArr: [
					{
						name: '13频',
						isSelected: false
					},
					{
						name: '三频',
						isSelected: false
					},
					{
						name: '两频',
						isSelected: false
					},
					{
						name: '六频',
						isSelected: false
					},
					{
						name: '单频',
						isSelected: false
					},
					{
						name: '四频',
						isSelected: false
					},
					{
						name: '多频',
						isSelected: false
					}
				],
				// 产品
				product: [],

				
				tradeMark: '',
				netWorkType: '',
				wordType: '',
				baseChip: '',
				freBase: '',
				fun: ''
			};
		},
		mounted() {
			this.getBaseInfo()
		},
		created() {
		},
		methods: {
			// 厂商
			btnSelect(item) {
				item.isSelected = !item.isSelected
			},
			// 搜索
			btnSearch() {
				// 厂商
				this.tradeMark = ''
				for(let i=0; i<this.vendor.length; i++) {
					if(this.vendor[i].isSelected) {
						if(this.tradeMark.indexOf(this.vendor[i].name) <0) {
							// this.tradeMark.push(this.vendor[i].name)
							this.tradeMark += this.vendor[i].name + ','
						}
					}
				}
				this.tradeMark = this.tradeMark.slice(0,this.tradeMark.length-1)
				// console.log(this.tradeMark)

				// 功能
				this.fun = ''
				for(let i=0; i<this.functionArr.length; i++) {
					if(this.functionArr[i].isSelected) {
						if(this.fun.indexOf(this.functionArr[i].name) <0) {
							this.fun += this.functionArr[i].id + ','
						}
					}
				}
				this.fun = this.fun.slice(0,this.fun.length-1)
				// console.log(this.fun)

				// // 通信环境
				this.netWorkType = ''
				for(let i=0; i<this.communicationEnvironment.length; i++) {
					if(this.communicationEnvironment[i].isSelected) {
						if(this.netWorkType.indexOf(this.communicationEnvironment[i].name) <0) {
							this.netWorkType += this.communicationEnvironment[i].type + ','
						}
					}
				}
				this.netWorkType = this.netWorkType.slice(0,this.netWorkType.length-1)
				// console.log(this.netWorkType)

				// 文档类型
				this.wordType = ''
				for(let i=0; i<this.documentType.length; i++) {
					if(this.documentType[i].isSelected) {
						if(this.wordType.indexOf(this.documentType[i].name) <0) {
							this.wordType += this.documentType[i].id + ','
						}
					}
				}
				this.wordType = this.wordType.slice(0,this.wordType.length-1)
				// console.log(this.wordType)

				// 基带芯片
				this.baseChip = ''
				for(let i=0; i<this.baseChipArr.length; i++) {
					if(this.baseChipArr[i].isSelected) {
						if(this.baseChip.indexOf(this.baseChipArr[i].name) <0) {
							this.baseChip += this.baseChipArr[i].name + ','
						}
					}
				}
				this.baseChip = this.baseChip.slice(0,this.baseChip.length-1)
				// console.log(this.baseChip)

				// 频段基数
				this.freBase = ''
				for(let i=0; i<this.freBaseArr.length; i++) {
					if(this.freBaseArr[i].isSelected) {
						if(this.freBase.indexOf(this.freBaseArr[i].name) <0) {
							this.freBase += this.freBaseArr[i].name + ','
						}
					}
				}
				this.freBase = this.freBase.slice(0,this.freBase.length-1)
				// console.log(this.freBase)
				this.getBaseInfo()
			},
			// 确定按钮
			btnSure() {
				this.selectShow = !this.selectShow
				this.btnSearch()
			},

			// 获取到文件信息
			getBaseInfo() {
				console.log(`${baseUrl}`)
				this.$axios({
					url: `${this.baseURL}/wordInfos/findWordInfo`,
					method: 'post',
					params: {
						// 品牌/厂商
						tradeMark: this.tradeMark,
						// 通信环境/制式
						netWorkType: this.netWorkType,
						// 文档类型
						wordType: this.wordType,
						// 是否为蓝牙，1是2否
						isBlue: '',
						// 是否为GPS，1是2否
						isGps: '',
						// 是否为语音，1是2否
						isVoice: '',
						// 功能
						fun: this.fun,
						// 基带芯片
						baseChip: this.baseChip,
						// 频段基数
						freBase: this.freBase,
						// 搜索框的值
						wordName: this.searchVal
					}
				}).then(res => {
					let data = res.data.object
					if(res.data.code == '100') {
						console.log(res.data.object)
						this.product = []
						for(let i=0; i<data.length; i++) {
							this.product.push({
								title: data[i].modeuleType,
								// info: `${data[i].tradeMark}${data[i].modeuleType}${this.getType(data[i].wordType)}`,
								info: data[i].wordName,
								num: data[i].downloadCount,
								id: data[i].wordInfoId,
							})
						}
					}
				})
			},
			// 获取到简介
			getType(i) {
				if(i==1) {
					return 'AT技术文档'
				}else if(i==2) {
					return '硬件手册'
				}else if(i==3) {
					return '产品规格书'
				}else {
					return
				}
			},
			// 下载PDF文件
			downloadPDF(item) {
				let phone = localStorage.getItem('telphone')
				// 如果缓存内没有手机号，则先绑定手机号
				if(!phone) {
					this.verifyShow = true
					return
				}
				let title = item.title
				let info = item.info
				let id = item.id
				window.location.href = `http://www.91dream.net/dataLoad/#/download?title=${title}&info=${info}&id=${id}`
				// this.$router.push({
				// 	path: '/test',
				// 	query: {
				// 		title: title,
				// 		info: info,
				// 		id: id
				// 	}
				// })
			},
			// 切换显示筛选项
			toggleSelect() {
				this.selectShow = !this.selectShow
			},
			// 获取验证码的倒计时
			countDown() {
				this.sendMsgDisabled = true;
				this.count = 60;
				var timer = setInterval(() => {
					this.count--;
					if (this.count <= 0) {
						this.sendMsgDisabled = false;
						clearInterval(timer);
					}
				}, 1000);
			},
			// 发送验证码
			getCode() {
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.telVal))) {
					this.$message.error('请输入正确的手机号码！');
				} else {
					this.$axios({
						url: `${this.baseURL}/smsSendInfo/sendPhoneCode`,
						method: 'post',
						params: {
							phone: this.telVal
						}
					}).then(res => {
						if (res.data.code == 100) {
							this.$message.success('验证码已发送，请注意查收！');
							this.countDown()
						} else {
							this.$message.error(res.data.object);
						}
					})
				}
			},
			// 立即验证
			btnVerify() {
				this.$axios({
					url: `${this.baseURL}/smsSendInfo/valPhoneCode`,
					method: 'post',
					params: {
						phone: this.telVal,
						code: this.codeVal
					}
				}).then(res => {
					if (res.data.code == 100) {
						localStorage.setItem('telphone',this.telVal)
						this.verifyShow = false
						this.verifySuccess = true
					}
				})
			},
			// 返回
			btnBack() {
				this.verifySuccess = false
				
			}
		}
	};
</script>

<style lang="stylus" scoped>
	.index-wrap {
		width 100%
		height 100%
		background-color #f7f6f6
		.content {
			padding 0 0.24rem
			/* 标题 */
			.title {
				display flex
				.icon {
					width 0.29rem
					height 0.23rem
					margin-top 0.23rem
					img {
						width 100%
						height 100%
					}
				}
				span {
					font-size 0.36rem
					color #373c42
					line-height 0.95rem
					margin-left 0.2rem
				}
			}
			/* 搜索 */
			.search {
				display flex
				justify-content space-between
				.input {
					width 5.7rem
					height 0.58rem
					background-color #ededed
					border-radius 0.2rem
					position relative
					input {
						width 100%
						height 100%
						padding-left 0.65rem
					}
					&:before {
						content ''
						display block
						width 0.26rem
						height 0.26rem
						background url('../assets/icon-search.png') no-repeat
						background-size contain
						position absolute
						left 0.23rem
						top 0.16rem
					}
				}
				.btn-search {
					width 0.92rem
					height 0.48rem
					border-radius 0.24rem
					color #ffffff
					font-size 0.24rem
					text-align center
					line-height 0.48rem
					cursor pointer
					background linear-gradient(to right, #3490ff, #4a71e0)
    				box-shadow: 0 3px 6px 0px rgba(53, 142, 253, 0.6);
				}
			}
			/* 筛选 */
			.select {
				margin-top 0.4rem
				.select-title {
					display flex
					.icon {
						width 0.17rem
						height 0.17rem
						margin-top -0.02rem
						img {
							width 100%
							height 100%
						}
					}
					span {
						font-size 0.3rem
						color #3c5ead
						margin-left 0.15rem
					}
					.arrow {
						margin-left 0.15rem
						.arrow-right {
							width 0.07rem
							height 0.13rem
						}
						.arrow-bottom {
							width 0.12rem
							height 0.07rem
						}
					}
				}
				.select-group {
					.group-item {
						padding 0 0.36rem
						margin-top 0.3rem
						.name {
							font-size 0.24rem
							margin-bottom 0.1rem
						}
						.group {
							display flex
							flex-wrap wrap
							.item {
								height 0.6rem
								line-height 0.6rem
								padding 0 0.16rem
								background-color #eae9e9
								border-radius 0.1rem
								text-align center
								cursor pointer
								font-size 0.24rem
								margin-right 0.3rem
								margin-bottom 0.2rem
							}
							.isSelected {
								background-color #f7e9ea
								color #f3797d
								position relative
								&:before {
									content ''
									display block
									width 0.26rem
									height 0.26rem
									background url('../assets/icon-delete.png') no-repeat
									background-size contain
									position absolute
									right -0.06rem
									top -0.09rem
								}
							}
						}
					}
					/* 确定按钮 */
					.btn-sure {
						margin 0.2rem auto 0
						width 1.62rem
						height 0.74rem
						border-radius 0.14rem
						cursor pointer
						text-align center
						line-height 0.74rem
						color #fff
						font-size 0.24rem
						background linear-gradient(to right, #3cd785, #6edea3)
					}
				}
			}
			/* 产品 */
			.product {
				margin-top 0.4rem
				.product-item {
					display flex
					height 1.7rem
					// border 1px solid red
					justify-content space-between
					background-color #fff
					border-radius 0.2rem
					margin-bottom 0.12rem
					align-items center
					padding 0 0.36rem 0 0.25rem
					.intro {
						.item-title {
							font-size 0.28rem
							color #3c5ead
							width: 3.9rem;
							white-space:nowrap;
							overflow:hidden;
							text-overflow:ellipsis;
						}
						.item-info {
							font-size 0.24rem
							width: 3.9rem;
							white-space:nowrap;
							overflow:hidden;
							text-overflow:ellipsis;
						}
						.download-num {
							display flex
							.icon {
								width 0.12rem
								height 0.12rem
								margin-top 0.15rem
								img {
									width 100%
									height 100%
								}
							}
							span {
								font-size 0.18rem
								margin-top 0.2rem
								margin-left 0.1rem
							}
						}
					}
					.download {
						width 1.62rem
						height 0.74rem
						border-radius 0.14rem
						cursor pointer
						text-align center
						line-height 0.74rem
						color #fff
						font-size 0.24rem
						background linear-gradient(to right, #3cd785, #6edea3)
					}
				}
			}
		}
		/* 手机验证码弹出框 */
		.modal-verify {
			width: 7.5rem;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.2);
			position: fixed;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 999;
			.verify-box {
				width: 7.02rem;
				height: 3.9rem;
				overflow-y: scroll;
				background-color: #fff;
				transform: translate(-50%, -50%);
				position: absolute;
				left: 50%;
				top: 50%;
				border-radius: 0.2rem;
				padding-top 0.68rem
				/* 手机号 */
				.tel {
					height 0.55rem
					line-height 0.55rem
					padding 0 0.85rem 0 0.48rem
					display flex
					justify-content space-between
					margin-bottom 0.48rem
					.icon {
						width 0.24rem
						height 0.34rem
						img {
							width 100%
							height 100%
						}
					}
					span {
						color #373c42
						font-size 0.24rem
					}
					.input {
						width 4.4rem
						border-radius 0.2rem
						background-color #f0f0f0
						padding-left 0.2rem
					}
				}
				/* 验证码 */
				.code-btn {
					height 0.55rem
					line-height 0.55rem
					padding 0 0.85rem 0 0.48rem
					display flex
					justify-content space-between
					.code {
						display flex
						justify-content space-between
						.icon {
							width 0.29rem
							height 0.33rem
							img {
								width 100%
								height 100%
							}
						}
						span {
							color #373c42
							font-size 0.24rem
							margin 0 0.15rem 0 0.1rem
						}
						.input {
							width 2.33rem
							border-radius 0.2rem
							background-color #f0f0f0
							padding-left 0.2rem
						}
					}
					.btn-get {
						width 1.87rem
						height 0.55rem
						background-color #39e288
						border-radius 0.1rem
						color #ffffff
						text-align center
						line-height 0.55rem
						cursor pointer
						font-size 0.24rem
						font-weight 300
					}
				}
				/* 立即验证 */
				.btn-verify {
					width 2.27rem
					height 0.71rem
					background linear-gradient(to right, #3cd785, #6edea3)
					font-size 0.3rem
					text-align center
					line-height 0.71rem
					cursor pointer
					border-radius 0.2rem
					// position relative
					z-index 9999
					position absolute
					// left 2.38rem
					// bottom -0.26rem
					margin-left 2.38rem
					margin-top 0.6rem
				}
				/* 背景图 */
				.bg-png {
					width 7.02rem
					height 1.61rem
					position absolute
					bottom 0
					left 0
					img {
						width 100%
						height 100%
					}
				}
			}
		}
		/* 验证成功 */
		.verify-success {
			width: 7.5rem;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.2);
			position: fixed;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 999;
			.success-box {
				width: 7.02rem;
				height: 3.88rem;
				overflow-y: scroll;
				transform: translate(-50%, -50%);
				position: absolute;
				left: 50%;
				top: 50%;
				border-radius: 0.2rem;
				background url('../assets/verify-success.png') no-repeat
				background-size contain
				.btn-back {
					width 1.6rem
					height 0.6rem
					border-radius 0.2rem
					font-size 0.3rem
					text-align center
					line-height 0.6rem
					cursor pointer
					background linear-gradient(to right, #3cd785, #6edea3)
					position absolute
					left 2.7rem
					bottom 0.1rem
				}
			}
		}
	}
</style>
