<template>
	<view class="container">
		<u-toast ref="uToastRef"></u-toast>
		<u-form :model="form" ref="uFormRef" label-width="auto" class="form" borderBottom :rules="rules">
			<u-form-item label="姓名" prop="name"><u-input v-model="form.name" border="none" /></u-form-item>
			<u-form-item label="性别" prop="gender">
				<u-radio-group v-model="form.gender" placement="row" size="15px">
					<u-radio label="男" :name="1" label-size="15px">
					</u-radio>
					<u-radio label="女" :customStyle="{paddingLeft:'10rpx'}" :name="2" label-size="15px">
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="手机号" prop="phone"><u-input v-model="form.phone" border="none" /></u-form-item>
			<u-form-item label="部门" prop="department" @click="getDepartment">
				<u-input v-model="form.department" border="none" disabled disabledColor="#ffffff"
					placeholder="请选择部门"></u-input>
				<template #right>
					<u-icon name="arrow-right"></u-icon>
				</template>
			</u-form-item>
			<u-form-item>
				<u-button type="primary" size="small" text="提交" @click="submit"></u-button>
			</u-form-item>
		</u-form>
		<u-picker :show="show" :columns="actions" @cancel="closePicker" @confirm="depSelect" @close="closePicker"
			:closeOnClickOverlay="true"></u-picker>
	</view>
</template>

<script setup>
	import {
		onMounted
	} from 'vue';
	const db = uniCloud.database()
	import {
		onBeforeMount,
		reactive,
		ref
	} from 'vue';
	let uToastRef = ref(null);
	let uFormRef = ref(null);

	function showToast(type, msg) {
		uToastRef.value.show({
			type: type,
			message: msg,
		});
	};
	let show = ref(false);
	let form = reactive({
		name: "",
		department: "",
		gender: "",
		phone: ""
	});

	let actions = reactive([
		[]
	]);
	let rules = reactive({
		name: {
			type: 'string',
			required: true,
			min: 2,
			max: 17,
			message: '请填写正确的名字',
			trigger: ['blur']
		},
		depatment: {
			type: 'string',
			required: true,
			message: '请选择部门',
			trigger: ['change', 'blur']
		},
		gender: {
			type: 'number',
			required: true,
			message: '请选择性别',
			trigger: ['change', 'blur']
		},
		phone: {
			type: 'string',
			required: true,
			message: '填写正确的手机号',
			min: 11,
			max: 11,
			pattern: /^1[3-9][0-9]{9}$/,
			trigger: ['blur']
		},
	});
	onMounted(() => {
		getUserStaffInfo()
	})
	async function getUserStaffInfo() {
		try {
			uni.showLoading({
				title: "加载中",
			})
			let staff = await db.collection('staff-info').where('user_id==$cloudEnv_uid').get()
			if (!staff.result.data.length) {
				showToast("default", "未查询到信息，请进行填写")
				return
			}
			let res = await db.collection('staff-info').where('user_id==$cloudEnv_uid').field(
					"name,department,gender,phone")
				.get({
					getOne: true
				})
			Object.keys(form).forEach((key) => {
				form[key] = res.result.data[key]
			})
		} catch (e) {
			//TODO handle the exception
			console.log(e);
			showToast("error", "获取信息失败")
		} finally {
			uni.hideLoading()
		}
	}
	async function getDepartment() {
		try {
			if (!actions[0].length) {
				uni.showLoading({
					title: "加载中..."
				})
				let {
					result
				} = await db.collection("company-department").field("name").get()
				result.data.forEach((obj) => {
					actions[0].push(obj.name)
				})
			}
			show.value = true
		} catch (err) {
			//TODO handle the exception
			showToast("error", "获取部门数据失败")
			console.log(err);
		} finally {
			uni.hideLoading()
		}
	}

	function depSelect({
		value
	}) {
		form.department = value[0]
		show.value = false
	}

	function closePicker() {
		show.value = false
		uFormRef.value.validateField("department")
	}

	function submit() {
		uFormRef.value.validate().then(async (valid) => {
			if (valid) {
				try {
					uni.showLoading({
						title: "上传中..."
					})
					let staff = await db.collection('staff-info').where('user_id==$cloudEnv_uid').get()
					if (!staff.result.data.length) {
						await db.collection("staff-info").add(form)
					} else {
						await db.collection("staff-info").where("user_id==$cloudEnv_uid").update(form)
					}
					showToast("success", "提交成功")
				} catch (e) {
					//TODO handle the exception
					showToast("err", "提交失败，请稍后重试")
				} finally {
					uni.hideLoading()
				}
			} else {
				uni.$u.toast('表单校验失败')
			}
		}).catch(() => {
			// 处理验证错误  
			uni.$u.toast('表单校验失败')
		});
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 15rpx;

		.form {
			:deep(.u-form-item) {
				padding: 0 0 0 0;
			}

		}
	}
</style>