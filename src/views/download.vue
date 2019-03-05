<template>
	<div class="download-wrap">
		<div class="content">
            <div class="title">{{ title }}</div>
            <div class="info">{{ info }}</div>
            <div class="icon"><img src="../assets/icon-pdf.png"></div>
            <div class="btn-download" @click="downloadPDF">立即下载</div>
		</div>
        <!-- ios -->
        <div class="modal-ios" v-show="isIOS">
            <div class="line"><img src="../assets/line.png"></div>
            <div class="tip">
                点击右上角分享按钮<br>然后选择“在Safari中打开”<br>就可以顺利下载文档了
            </div>
            <div class="tip-ios">
                <img src="../assets/ios.png">
            </div>
        </div>
        <!-- 安卓 -->
        <div class="modal-android" v-show="isAndroid">
            <div class="line"><img src="../assets/line.png"></div>
            <div class="tip">
                点击右上角分享按钮<br>然后选择“在浏览器中打开”<br>就可以顺利下载文档了
            </div>
            <div class="tip-android">
                <img src="../assets/android.png">
            </div>
        </div>
	</div>
</template>

<script>
import {getCode,baseUrl} from '../assets/base.js'
	export default {
		data() {
			return {
                // 页面元素
                title: '',
                info: '',
				id: '',
                // ios
                isIOS: false,
                // android
                isAndroid: false,
				// baseURL: 'http://47.96.232.174:8090/smsSendInfo/downLoadPdf',
				baseURL: `${baseUrl}/smsSendInfo/downLoadPdf`
			};
		},
		mounted() {
            // 页面加载之前，先去判断下当前浏览器的类型
            this.getWX()

            this.title = this.$route.query.title
            this.info = this.$route.query.info
            this.id = this.$route.query.id
		},
		created() {
		},
		methods: {
			// 下载PDF文件
			downloadPDF() {
                let id = this.id
				let phone = localStorage.getItem('telphone')
				let a = document.createElement('a')
                a.href = `${this.baseURL}?id=${id}&phone=${phone}`
                a.style.display = 'none'
				a.download = '下载'
				document.body.appendChild(a)
				console.log(a.href)
                a.click()
            },
            // 判断当前浏览器是否为微信
            getWX() {
                var isWeixin = function () { //判断是否是微信
                    var ua = navigator.userAgent.toLowerCase();
                    return ua.match(/MicroMessenger/i) == "micromessenger";
                };
                console.log(isWeixin());
                
                // 如果是微信
                if(isWeixin()) {
                    //判断是否是iOS下的微信浏览器
                    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
                        this.isIOS = true
                        this.isAndroid = false
                    }else if (navigator.userAgent.match(/android/i)) { //判断是否是Android
                        this.isAndroid = true
                        this.isIOS = false
                    }
                }else {
                    this.isAndroid = false
                    this.isIOS = false
                }
            }
		}
	};
</script>

<style lang="stylus" scoped>
	.download-wrap {
		width 100%
		height 100%
		.content {
			padding 0 0.24rem
            text-align center
            padding-top 1.5rem
            .title {
                font-size 0.3rem
                color #3c5ead
            }
            .info {
                font-size 0.28rem
                margin 0.2rem 0 0.9rem
            }
            .icon {
                width 1.46rem
                height 1.9rem
                margin 0 auto
                img {
                    width 100%
                    height 100%
                }
            }
            .btn-download {
                margin 1.6rem auto 0
                width 3.68rem
                height 0.74rem
                background linear-gradient(to right, #3cd785, #6edea3)
                border-radius 0.1rem
                text-align center
                line-height 0.74rem
                cursor pointer
                color #ffffff
                font-size 0.24rem
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
        /* ios/android */
        .modal-ios, .modal-android {
            width: 100%;
			height: 100%;
			background-color: #fff;
			position: fixed;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 999;
            .line {
                width 1.72rem
                height 1.63rem
                position absolute
                top 0.2rem
                right 2.2rem
            }
            .tip {
                text-align center
                font-size 0.28rem
                line-height 0.56rem
                margin-top 3.5rem
            }
            .tip-ios, .tip-android {
                width 5.82rem
                height 5.06rem
                margin 0.6rem auto 0
                img {
                    width 100%
                    height 100%
                }
            }
        }
	}
</style>
