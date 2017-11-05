
// 定义app模块
define(function (require, exports, module) {
	var ImgCollection = require('imgCollection');
	var List = require('list');
	var Layer = require('layer');

	var imgcollection = new ImgCollection();

	var list = new List({
		el: $('#app'),
		collection:imgcollection
	});
	var layer = new Layer({
		el: $('#app'),
		collection:imgcollection
	});


	var Router = Backbone.Router.extend({
		// 配置路由规则
		routes: {
			
			'layer/:id': 'renderLayer',
			
			'*other': 'renderList'
		},
		renderLayer: function (id) {
			layer.render(id);
			$(".list").hide();
		},
		// 定义渲染列表页方法
		renderList: function () {
		}
	})

	// 第二步 实例化路由
	var router = new Router();

	// 暴漏接口
	module.exports = function () {
		// 第三步 启动路由
		Backbone.history.start();
	}
})