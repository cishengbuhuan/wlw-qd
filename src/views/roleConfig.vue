<template>
	<div class="userManage-wrap wrap">
		<div class="content wrap-content">
			<!-- 标题 -->
			<div class="page-title">
				<div class="line"></div>
				<span>用户角色配置</span>
			</div>
            <div class="config-box">
                <div class="account">登录账号: {{ config.account }}</div>
                <div class="name">姓名: {{ config.name }}</div>
                <!-- 角色配置 -->
                <div class="role-config">
                    <div class="tip">角色配置: </div>
                    <el-transfer v-model="selected"
                                :titles="['可选配置', '已选配置']"
                                :button-texts="['移除', '添加']"
                                :data="data"></el-transfer>
                </div>
                <!-- 按钮组 -->
                <div class="btn-group">
                    <div class="btn-cancel btn-gray">取消</div>
                    <div class="btn-save btn-main" @click="btnSave">保存</div>
                </div>
            </div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
                config: {
                    account: 'admin',
                    name: '管理员'
                },
                data: [
                    {
                        key: 1,
                        label: '角色1',
                        disabled: false
                    },
                    {
                        key: 2,
                        label: '角色2',
                        disabled: true
                    },
                    {
                        key: 3,
                        label: '角色3',
                        disabled: false
                    },
                    {
                        key: 4,
                        label: '角色4',
                        disabled: false
                    }
                ],
                selected: [1,3]
			};
		},
		mounted() {
            
		},
		created() {

		},
		methods: {
            btnSave() {
                console.log(this.selected)
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
			.config-box {
				background-color: #fff;
				border-radius: 20px;
				padding: 25px 50px;
				.account, .name {
                    font-size 18px
                    color #545454
                }
                .name {
                    margin 25px 0
                }
                /* 角色配置 */
                .role-config {
                    .tip {
                        font-size 18px
                        color #545454
                        margin-bottom 20px
                    }
                }
                /* 按钮组 */
                .btn-group {
                    margin-top 60px
                    .btn-save {
                        margin-left 80px
                    }
                }
			}
		}
	}
</style>