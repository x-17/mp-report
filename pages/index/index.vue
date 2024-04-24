<template>
	<view class="content">
		<list ref="listRef"></list>
		<view class="add_btn">
			<u-icon name="plus" color="#fff" @click="gotoReport" size="32rpx"></u-icon>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref,
		getCurrentInstance,
		onUnmounted,
		nextTick
	} from "vue"
	import {
		onLoad,
		onPullDownRefresh,
	} from "@dcloudio/uni-app"

	let listRef = ref(null)
	// onPullDownRefresh(() => {
	// 	console.log("1111");
	// })

	function gotoReport() {
		uni.navigateTo({
			url: "/pages/report/report"
		})
	}
	let uReadMoreRef = ref(null)
	onMounted(() => {
		// if (uReadMoreRef.value) {
		// 	uReadMoreRef.value.init();
		// }
	})
	onLoad(() => {
		uni.$on('refresh', function() {
			listRef.value.insert()
			setTimeout(() => {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0,
					selector: ".uni-app--showtabbar uni-page-wrapper"
				})
			}, 100)
		})
	})
	onUnmounted(() => {
		// console.log("unmounted");
		uni.$off("refresh")
	})
</script>

<style lang="scss" scoped>
	.content {
		.add_btn {
			position: fixed;
			right: calc(var(--window-right) + 15rpx);
			bottom: calc(var(--window-bottom) + 15rpx);
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			background-color: #3c9cff;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 999;
			cursor: pointer;
		}
	}
</style>