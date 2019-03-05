<template>
	<div class="add-edit-wrap wrap">
		<div class="content wrap-content">
			<!-- 标题 -->
			<div class="page-title">
				<div class="line"></div>
				<span>{{ title }}</span>
			</div>
            <!-- 表单 -->
            <div class="form">
                <!-- 客户名称 -->
                <div class="customer-name form-item">
                    <span>客户名称: </span>
                    <el-input class="input"
                        clearable
                        v-model="form.customerName">
                    </el-input>
                </div>
                <!-- 联系人 -->
                <div class="contact-name form-item">
                    <span>联系人: </span>
                    <el-input class="input"
                        clearable
                        v-model="form.contactName">
                    </el-input>
                </div>
                <!-- 联系方式 -->
                <div class="contact-way form-item">
                    <span>联系方式: </span>
                    <el-input class="input"
                        clearable
                        v-model="form.contactWay">
                    </el-input>
                </div>
                <!-- 邮箱地址 -->
                <div class="email form-item">
                    <span>邮箱地址: </span>
                    <el-input class="input"
                        clearable
                        v-model="form.email">
                    </el-input>
                </div>
                <!-- 客户地址 -->
                <div class="address form-item">
                    <span>客户地址: </span>
                    <el-input class="input"
                        clearable
                        v-model="form.address">
                    </el-input>
                </div>
                <!-- 状态 -->
                <div class="status form-item">
                    <span>状态: </span>
                    <el-select class="select"
                        placeholder="请选择"
                        clearable
                        v-model="form.status">
                        <el-option
                                v-for="item in form.statusOptions"
                                :key="item.value"
                                :label="item.status"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <!-- 备注 -->
                <div class="remark form-item">
                    <span>备注: </span>
                    <el-input class="input"
                        type="textarea"
                        clearable
                        :autosize="{ minRows: 2, maxRows: 4}"
                        v-model="form.remark">
                    </el-input>
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
                // 页面标题
                title: '',
                // 表单
				form: {
                    customerName: '',
                    contactName: '',
                    contactWay: '',
                    email: '',
                    address: '',
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
                    remark: ''
                }
			};
		},
		mounted() {
            this.way = this.$route.query.way
            console.log(this.way)
            if(this.way == 1) {
                this.title = '新增客户'
            }else {
                this.title = '修改'
                this.form.customerName = this.$route.query.customerName
                this.form.contactName = this.$route.query.contactName
                this.form.contactWay = this.$route.query.contactWay
                this.form.status = this.$route.query.status
                this.form.remark = this.$route.query.remark
            }
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
            /* 表单 */
            .form {
                background-color: #fff;
                border-radius: 20px;
                padding: 30px;
                margin-top: 20px;
                padding-left 70px
                .form-item {
                    display flex
                    margin-bottom 26px
                    span {
                        width 100px
                        color #545454
                        font-size 18px
                        line-height 40px
                    }
                    .input, .select {
                        width 200px
                    }
                }
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
