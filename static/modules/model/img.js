// 定义图片模型
define(function (require, exports, module) {

	var w = ($(window).width() - 8 * 3) / 2;
	
	var ImgModel = Backbone.Model.extend({
		//适配模型数据，添加图片模型真实的宽高
		initialize: function (obj) {
			var h = w / obj.width * obj.height;
			this.attributes.viewWidth = w;
			this.attributes.viewHeight = h;
		}
	})
	module.exports = ImgModel;
})