// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	_before: function() { // 通用预处理器

	},
	/**
	 * method1方法描述
	 * @param {Array} fileArr 参数1描述
	 * @returns {object} 返回值描述
	 */
	async delFile(fileArr) {
		// 参数校验，如无参数则不需要
		if (!fileArr.length) {
			return {
				errCode: 'PARAM_IS_NULL',
				errMsg: '参数不能为空'
			}
		}
		// 业务逻辑
		try {
			let result = await uniCloud.deleteFile({
				fileList: fileArr // 阿里云fileID是url形式，例：https://xxx.com/xxx.png
			});
			// return result
			return {
				errCode: 0,
				errMsg: '删除成功'
			}
		} catch (e) {
			//TODO handle the exception
			return {
				errCode: 1,
				errMsg: '删除失败'
			}
		}
	}
}