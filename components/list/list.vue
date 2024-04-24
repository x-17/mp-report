<template>
	<view class="listbox">
		<u-toast ref="uToastRef"></u-toast>
		<template v-for="item in item_info" :key="item.time">
			<my-list-item :itemInfo="item"></my-list-item>
		</template>
		<u-empty mode="history" textSize="25" iconSize="130" v-if="item_info.length == 0"
			:customStyle="emptyStyle"></u-empty>
		<view v-else>
			<u-loadmore fontSize="30" :status="loading_status" iconSize="30" @click="getListInfo" />
		</view>
	</view>

</template>

<script setup>
	import {
		ref,
		onMounted,
		onBeforeMount,
	} from 'vue';
	import {
		onReachBottom,
		onPullDownRefresh
	} from "@dcloudio/uni-app"
	let emptyStyle = {
		// position: "fixed",
		// left: "0",
		// top: "0",
		// bottom: "0",
		// right: "0",
	}
	let item_info = ref([])
	const db = uniCloud.database()
	defineExpose({
		insert
	})
	onPullDownRefresh(() => {
		item_info.value = []
		getListInfo()
	})
	async function insert() {
		try {
			let res = await db.collection("report-info").where("user_id==$cloudEnv_uid").field(
				"image[url],text,time").orderBy("time desc").limit(1).get()
			item_info.value = [...res.result.data, ...item_info.value]
			loading_status.value = "loadmore"
		} catch (e) {
			//TODO handle the exception
			console.log(e);
			showToast("error", "加载数据失败请重试")
		}
	}
	async function getListInfo() {
		try {
			let res = await db.collection("report-info").where("user_id==$cloudEnv_uid").field(
				"image[url],text,time").orderBy("time desc").skip(item_info.value.length).limit(5).get()
			console.log(res.result);
			if (res.result.data.length) {
				console.log(res.result);
				item_info.value = [...item_info.value, ...res.result.data]
				loading_status.value = "loadmore"
			} else {
				if (!item_info.value.length) showToast("default", "当前暂无上报过的数据")
				loading_status.value = "nomore"
			}

		} catch (e) {
			//TODO handle the exception
			loading_status.value = "loadmore"
			console.log(e);
			showToast("error", "加载数据失败请重试")
		} finally {
			uni.stopPullDownRefresh()
		}

	}
	let uToastRef = ref(null)

	function showToast(type, msg) {
		if (uToastRef.value) {
			uToastRef.value.show({
				type: type,
				message: msg,
			});
		}
	};
	onBeforeMount(() => {
		getListInfo()
	})
	let loading_status = ref("nomore")
	onReachBottom(() => {
		loading_status.value = "loading"
		getListInfo()
	})
</script>
<script>
	export default {
		options: {
			styleIsolation: 'shared'
		},
	}
</script>
<style lang="scss" scoped>
	.listbox {
		:deep(.u-empty) {
			position: fixed;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
		}
	}
</style>