<template>
	<view class="contanier">
		<u-toast ref="uToastRef"></u-toast>
		<view class="report-btn">
			<u-button @click="report" type="success" :customStyle="btnStyle">上报</u-button>
		</view>
		<u-textarea v-model="text" placeholder="请输入内容" border="none" :maxlength="300" autoHeight
			height="auto"></u-textarea>
		<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="6"
			width="209" height="209"></u-upload>
	</view>
</template>

<script setup>
	import {
		onHide
	} from '@dcloudio/uni-app';
	const db = uniCloud.database()
	const delOption = uniCloud.importObject("delFile")
	import {
		ref,
		getCurrentInstance
	} from 'vue';
	// let location = ref("")

	// function getLocation() {
	// 	uni.chooseLocation({
	// 		success: function(res) {
	// 			console.log('位置名称：' + res.name);
	// 			console.log('详细地址：' + res.address);
	// 			console.log('纬度：' + res.latitude);
	// 			console.log('经度：' + res.longitude);
	// 			location.value = res.name + res.address
	// 		}
	// 	});
	// }
	let btnStyle = {
		width: '85rpx',
		height: '50rpx',
		padding: 0,
		fontSize: '25rpx',
		float: 'right'
	}

	let text = ref("")

	let uToastRef = ref(null)

	function showToast(type, msg) {
		uToastRef.value.show({
			type: type,
			message: msg,
		});
	};

	const fileList1 = ref([]);

	// 删除图片
	const deletePic = (event) => {
		fileList1.value.splice(event.index, 1);
	};

	// 新增图片
	const afterRead = async (event) => {
		// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
		let lists = [].concat(event.file);
		// file []
		// name 仅H5支持
		// 	:
		// 	"lwx.jpg"
		// size
		// 	:
		// 	111916
		// thumb
		// 	:
		// 	"blob:http://localhost:5173/d1eea07f-6ae6-459b-b558-780b57e36b2e"
		// type
		// 	:
		// 	"image"
		// url
		// 	:
		// 	"blob:http://localhost:5173/d1eea07f-6ae6-459b-b558-780b57e36b2e"
		let fileListLen = fileList1.value.length;
		console.log(lists);
		lists.map((item) => {
			fileList1.value.push({
				...item,
				// status: 'failed',
				// message: '上传中',
			})
		});
	}

	function upLoadAllImages() {
		if (!fileList1.value.length) return Promise.resolve("")
		const file_arr = [];
		let success_length = 0;
		return new Promise(async (resolve, reject) => {
			for (let i = 0; i < fileList1.value.length; i++) {
				try {
					// console.log(fileList1.value[i].url);
					let res = await uniCloud.uploadFile({
						filePath: fileList1.value[i].url,
						cloudPath: +new Date() + "image",
					});
					// let file_name_split = fileList1.value[i].name.split(".")
					file_arr.push({
						name: fileList1.value[i].type,
						extname: "jpg,png,jpeg",
						url: res.fileID,
					})
					if (++success_length == fileList1.value.length) {
						resolve(file_arr)
					}
				} catch (e) {
					//TODO handle the exception
					console.log(e);
					reject({
						code: 1,
						err: file_arr
					})
				}
			}
		})
	}
	async function report() {
		if (!text.value.length) {
			uni.showToast({
				title: "请输入文字",
				icon: "none"
			})
			return
		}
		try {
			uni.showLoading({
				title: "上传中..."
			})
			let upload_res = await upLoadAllImages();
			let staffID = await db.collection("staff-info").where("user_id==$cloudEnv_uid").field("_id").get({
				getOne: true
			});
			// console.log(staffID);
			if (!staffID.result.data) {
				showToast("default", "请先填写员工信息")
				return
			}
			let res = await db.collection("report-info").add({
				text: text.value,
				image: upload_res,
				staff_id: staffID.result.data._id
			})
			showToast("success", "上报成功")
			uni.navigateBack()
			uni.$emit("refresh", "")
		} catch (e) {
			//TODO handle the exception
			console.log(e);
			if (e && e.code == 1) {
				let fileArr = []
				e.err.forEach((val) => {
					fileArr.push(val.url)
				})
				let del_res = await delOption.delFile(fileArr)
			}
			showToast("error", "上传失败请稍后重试")
		} finally {
			uni.hideLoading()
		}
	}
</script>

<style lang="scss" scoped>
	.contanier {
		padding: 20rpx;

		.report-btn {
			width: 100%;
			float: right;
			display: flow-root;
		}

		/* #ifdef H5 */
		// :deep(.u-textarea__field) {
		// 	height: auto !important;
		// }

		/* #endif */
		:deep(.u-upload) {
			padding: 8px;
		}

		:deep(.u-icon__icon.uicon-close.u-iconfont) {
			font-size: 22rpx !important;
			line-height: 22rpx !important;
		}

		:deep(.u-upload__deletable) {
			width: 30rpx !important;
			height: 30rpx !important;
		}

		:deep(.u-textarea) .u-textarea__field {
			font-size: 30rpx !important;
		}
	}
</style>