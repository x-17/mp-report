<template>
	<view class="u-page">
		<view class="u-demo-block">
			<view class="u-demo-block__content">
				<view class="album">
					<view class="album__avatar">
						<image :src="avatar_url" mode="" style="width: 80rpx;height: 80rpx;"></image>
					</view>
					<view class="album__content">
						<view class="top">
							<u--text :text="nickname" type="primary" bold size="36"></u--text>
							<u--text :text="props.itemInfo.time" bold size="25" align="right" margin="0 20rpx 0 0"
								mode="date" color="#767a82"></u--text>
						</view>
						<!-- <u--text margin="0 0 8px 0" size="34" :text="props.itemInfo?.text"
							wordWrap="anywhere"></u--text> -->
						<u-read-more :toggle="true" showHeight="200" fontSize="25rpx" ref="uReadMoreRef">
							<u--text margin="0 0 8px 0" size="34" :text="props.itemInfo?.text" wordWrap="anywhere"
								mode="text"></u--text>
						</u-read-more>
						<template v-if="props.itemInfo?.image?.length">
							<u-album :urls="props.itemInfo.image" keyName="url" :maxCount="6" multipleSize="200"
								singleSize="200"></u-album>
						</template>
					</view>
				</view>
			</view>
		</view>
		<u-divider text="分割线" :dot="true"></u-divider>
	</view>
</template>
<script setup>
	import {
		computed,
		onMounted,
		nextTick,
		ref,
		onBeforeMount,
		watch,
		onUpdated
	} from 'vue';
	import {
		store
	} from '@/uni_modules/uni-id-pages/common/store.js'
	let props = defineProps({
		itemInfo: {
			type: Object,
			default: () => ({})
		}
	})
	onMounted(() => {})

	let nickname = computed(() => {
		return store.hasLogin && store.userInfo && store.userInfo.nickname
	})
	let avatar_url = computed(() => {
		return store.hasLogin && store.userInfo && store.userInfo.avatar_file?.url
	})
	let uReadMoreRef = ref(null)
	// let urls = computed(() => {
	// 	return props.itemInfo.image.reduce((preValue, currentValue) => {
	// 		preValue.push(currentValue.url)
	// 		return preValue
	// 	}, [])
	// })
</script>

<style lang="scss" scoped>
	.album {
		@include flex;
		align-items: flex-start;

		&__avatar {
			background-color: $u-bg-color;
			padding: 5px;
			border-radius: 3px;
		}

		&__content {
			margin-left: 10px;
			flex: 1;

			.top {
				display: flex;
				justify-content: space-around;
			}

			// :deep(.u-text__value) {
			// 	font-size: 36rpx !important;
			// }
		}
	}
</style>