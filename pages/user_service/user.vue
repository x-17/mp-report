<template>
	<view>
		<view class="markdown-body" id="markdown-body">
			<h2 id="日常工作信息上报工具小程序用户服务协议" class="h2">日常工作信息上报工具小程序用户服务协议</h2>
			<h4 id="一、服务条款的确认及接受" class="h4">一、服务条款的确认及接受</h4>
			<ol class="ol">
				<li class="li">本日常工作信息上报工具小程序（以下简称“本小程序”）的所有权和运营权归属于开发者所有。用户在使用本小程序提供的服务时，应遵守本协议的所有条款和操作规则。</li>
				<li class="li">开发者有权根据需要对本协议进行修改，并在本小程序上公布修改后的内容。用户应及时关注并遵守修改后的协议内容。</li>
			</ol>
			<h4 id="二、用户的权利和义务" class="h4">二、用户的权利和义务</h4>
			<ol class="ol">
				<li class="li">用户在使用本小程序时，应遵守国家法律法规和相关规定，不得利用本小程序从事违法、违规或侵犯他人权益的行为。</li>
				<li class="li">用户应提供真实、准确、完整的个人信息，并及时更新个人信息。</li>
				<li class="li">用户应妥善保管自己的账号和密码，不得将其提供给他人使用。用户应对使用其账号和密码进行的一切活动负责。</li>
				<li class="li">用户在使用本小程序时，应遵守以下规定：<ul class="ul">
						<li class="li">不得发布、传播违法、淫秽、诽谤、侮辱、恶意攻击他人等不良信息；</li>
						<li class="li">不得干扰、破坏本小程序的正常运行；</li>
						<li class="li">不得利用本小程序从事商业活动或其他非个人使用的行为；</li>
						<li class="li">不得侵犯他人的知识产权或其他合法权益；</li>
						<li class="li">不得利用本小程序进行任何可能对网络安全造成威胁的行为。</li>
					</ul>
				</li>
			</ol>
			<h4 id="三、免责声明" class="h4">三、免责声明</h4>
			<ol class="ol">
				<li class="li">本小程序仅提供工作内容汇报的功能，不对用户的工作成果和工作效果负责。</li>
				<li class="li">用户在使用本小程序过程中可能会遇到不可抗力因素，如网络故障、设备故障等，导致服务中断或数据丢失，开发者不承担相应责任。</li>
				<li class="li">用户在使用本小程序过程中可能会遇到第三方提供的服务或产品，开发者不对第三方服务或产品的质量、安全性等方面承担责任。</li>
			</ol>
			<h4 id="四、协议的终止" class="h4">四、协议的终止</h4>
			<ol class="ol">
				<li class="li">用户可以随时停止使用本小程序，并可以通过注销账号的方式终止本协议。</li>
				<li class="li">开发者有权在用户违反本协议的情况下，终止用户使用本小程序的权利。</li>
			</ol>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style scoped lang="scss">
	/* #ifndef MP-WEIXIN */
	@import url("./stylesheets/prism.css");
	@import url("./stylesheets/style.css");
	@import url("./stylesheets/github-markdown.css");

	.markdown-body {
		padding: 10px;
	}

	/* #endif */

	/* #ifdef MP-WEIXIN */
	.markdown-body {
		padding: 10px;

		.h2 {
			padding-bottom: 0.3em;
			font-size: 1.5em;
			border-bottom: 1px solid #eaecef;
			margin-bottom: 16px;
			font-weight: 600;
			line-height: 1.25;
		}

		.h4 {
			margin-top: 24px;
			margin-bottom: 16px;
			font-weight: 600;
			line-height: 1.25;
		}

		.ul {
			display: block;
			margin-block-start: 1em;
			margin-block-end: 1em;
			margin-inline-start: 0px;
			margin-inline-end: 0px;
			padding-inline-start: 10px;
			unicode-bidi: isolate;
			list-style-type: circle; //加了也不生效，laji微信
			margin-block-start: 0px;
			margin-block-end: 0px;
			padding-left: 50px;

			.li {
				display: list-item !important;
				text-align: -webkit-match-parent;
				unicode-bidi: isolate;
			}
		}

		.ol {
			margin-top: 0;
			margin-bottom: 16px;
			display: block;
			list-style-type: decimal;
			margin-block-start: 1em;
			margin-block-end: 1em;
			margin-inline-start: 0px;
			margin-inline-end: 0px;
			padding-inline-start: 40px;
			unicode-bidi: isolate;

			.ul {
				display: block;
				margin-block-start: 1em;
				margin-block-end: 1em;
				margin-inline-start: 0px;
				margin-inline-end: 0px;
				padding-inline-start: 10px;
				unicode-bidi: isolate;
				list-style-type: circle; //加了也不生效，laji微信
				margin-block-start: 0px;
				margin-block-end: 0px;
			}

			.li {
				display: list-item !important;
				text-align: -webkit-match-parent;
				unicode-bidi: isolate;
			}
		}
	}

	/* #endif */
</style>