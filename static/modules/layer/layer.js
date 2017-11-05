// 创建大图页面
define(function (require, exports, module) {
	
	require('modules/layer/layer.css')
	var Layer = Backbone.View.extend({
		imgId :0,
		imgList: [],
		tpl:_.template($("#tpl_pinlLayer").html()),
		
		events: {
			
			'swipeLeft .content': 'showNextImage',
			
			'swipeRight .content': 'showPreImage',
			
		},

		render:function(modelId){
			this.imgId = modelId;
			this.imgList.push(this.imgId);
			var model = this.collection.get(this.imgId);
			if (!model) {
	
				location.href = '';
				return ;
			}
			
			

			var data = {
				pinUrl:model.get('pinUrl'),
				pinUrl: model.get('pinUrl'),
				pinTitle: model.get('pinTitle'),
				pinDescription: model.get('pinDescription'),
				pinAttribution: model.get('pinAttribution'),
				pinPiked: model.get('pinPiked'),
				pinCreditsname: model.get('pinCreditsname'),
				pinLike: model.get('pinLike'),
				pinSocialitem: model.get('pinSocialitem'),
				pinProtrait: model.get('pinProtrait'),
				pinSourceType:model.get('pinSourceType')
			};

			var html = this.tpl(data);
			$("#layer").append(html);
			
		},
		showNextImage: function () {
			
			this.imgId++;
			var model = this.collection.get(this.imgId);
			
			if (!model) {
				alert('已经是最后一张了！');
				this.imgId--;
			} else {
				// 更新页面
				this.updateView(model)
				// 缓存图片的id
				this.imgList.push(this.imgId)
			}
		},
		
		showPreImage: function () {
			
			this.imgId--;
			
			var model = this.collection.get(this.imgId);
			
			if (!model) {
				alert('已经是第一张了！');
				
				this.imgId++;
			} else {
				
				this.updateView(model);
				
				this.imgList.push(this.imgId)
			}
		},
		
		updateView: function (model) {
			
			this.$el.find('img.currentImg').attr('src', model.get('pinUrl'));
		}


		});

	module.exports = Layer;
})