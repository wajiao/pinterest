// 图片集合模块
define(function (require, exports, module) {
	
	var ImgModel = require('imgModel');
	
	var ImgCollection = Backbone.Collection.extend({
		model: ImgModel,
		imageId: 0,
		//定义拉取数据方法
		fetchData: function () {
			var me = this;
			$.get('data/imageList.json', function (res) {

				if(res && res.errno === 0 ){
					//打乱数据顺序
					res.data.sort(function(){
						return Math.random() > .5 ? 1 : -1
					});
					//给每个数据添加id
					res.data.forEach(function(item,index,arrary){
						item.id = ++me.imageId;
					});

					me.add(res.data);
				}
					
			})
		},
	})
	module.exports = ImgCollection;	
})