<template>
	<view class="container">
		<view class="top">
			<view class="avator">
				<u-avatar :src="avatar" :size="120"></u-avatar>
				<view class="name">{{userInfo.nickname||'未设置'}}</view>
				<u-text suffixIcon="arrow-rightward" text="编辑资料" size="25" @click="gotoUserInfo"
					align="center"></u-text>
			</view>
			<view class="bg">
				<image :src="avatar"></image>
			</view>
		</view>
		<view class="setting">
			<u-cell-group>
				<u-cell icon="man-add-fill" title="职工信息" isLink :iconStyle="iconStyle" :titleStyle="titleStyle"
					:rightIconStyle="iconStyle" @click="toStaffInfo"></u-cell>
				<u-cell icon="close-circle-fill" title="退出登录" @click="logout" :iconStyle="iconStyle"
					:titleStyle="titleStyle" :rightIconStyle="iconStyle"></u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		computed,
		reactive
	} from "vue"
	import {
		store,
		mutations
	} from '@/uni_modules/uni-id-pages/common/store.js'
	//响应式对象
	let titleStyle = reactive({
		fontSize: "30rpx"
	})
	let iconStyle = reactive({
		fontSize: "25rpx"
	})
	//计算属性
	let hasLogin = computed(() => {
		return store.hasLogin
	})
	let userInfo = computed(() => {
		return store.userInfo
	})
	let avatar = computed(() => {
		console.log(store.userInfo)
		return (hasLogin && store.userInfo.avatar_file) ? store.userInfo.avatar_file.url : ""
	})
	//函数
	//个人信息页面
	function gotoUserInfo() {
		uni.navigateTo({
			url: "/uni_modules/uni-id-pages/pages/userinfo/userinfo"
		})
	}
	//退出登录
	function logout() {
		uni.showModal({
			title: "是否确认退出?",
			success: res => {
				console.log(res);
				if (res.confirm) {
					mutations.logout()
				}
			}
		})
	}
	//员工信息
	function toStaffInfo() {
		uni.navigateTo({
			url: "/pages/staffinfo/staffinfo"
		})
	}
</script>

<style lang="scss" scoped>
	.container {
		.top {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 260rpx;
			padding-top: var(--status-bar-height);
			padding-bottom: 80rpx;

			.avator {
				padding-top: 20rpx;
				z-index: 10;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;

				.name {
					color: $u-main-color;
					text-align: center;
					font-size: 35rpx;
					font-weight: 600;
					padding: 15rpx 0;
				}
			}

			.bg {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
					filter: blur(20px);
					transform: scale(2);
					opacity: 0.5;
				}
			}
		}

		.setting {
			border-radius: 30rpx;
			transform: translateY(-30rpx);
			background-color: #fff;
			overflow: hidden;

			.cell-style {
				font-size: 30rpx
			}
		}
	}
</style>