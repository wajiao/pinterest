// 定义主页视图
define(function (require, exports, module) {

	require('modules/list/list.css')
	
	var List = Backbone.View.extend({
		
		events: {
			//搜索事件
			'tap .nav .search span': 'showSearchView',
			//分类查找事件
			'tap .nav .group': 'showGroupView',
			//返回顶部
			'tap .go-top':'goTop'
		},
		
		initDOM: function () {

			this.leftContainer = this.$el.find('.leftContent')
			this.rightContainer = this.$el.find('.rightContent')
		},
		initialize: function () {

			this.initDOM();

			//nav初始隐藏
			var me = this;
			me.$el.find('.nav').hide();
			me.$el.find('.go-top').hide();

			//拉取数据，监听数据添加后，渲染
			this.collection.fetchData();
			this.listenTo(this.collection,'add',function(model,collection,options){
				this.render(model)
			});
			//界面滚动时，对goTop的设置
			$(window).on('scroll',function(){
				if($('body').height() < $(window).scrollTop() +$(window).height() + 200){
					
					me.collection.fetchData();
				}
				
				if($(window).scrollTop() > 60){
					me.$el.find('.nav').show();

				}
				if($(window).scrollTop() > 400){
					me.$el.find('.go-top').show()
				}
			});
		},

		leftHeight: 0,

		rightHeight: 0,

		tpl:_.template($("#tpl_pinGird").html()),
		//定义渲染的数据
		render:function(model){
			//配置数据
			var data = {
				id:model.get('id'),
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
			// 提供渲染高度数据
			var height = model.get('viewHeight');
			// 填充数据模版
			var html = this.tpl(data);
			// 添加到文档页面
			if(this.leftHeight > this.rightHeight){
				this.renderRight(html,height);
			} else {
				this.renderLeft(html,height);
			}
		},
		renderRight:function(html,height){
			$('#rightContent').append(html);
			this.rightHeight += height+10;
		},
		renderLeft:function(html,height){
			$('#leftContent').append(html);
			this.leftHeight += height+10;
		},


		showSearchView:function(){
			var value = this.$el.find('.search input').val()
			
			if (!this.checkInputValue(value)) {
				
				return;
			} 
			value = value.replace(/^\s+|\s+$/g, '');
		
			var result = this.searchCollectionByKey(value);
			//问题
			console.log(result)
			this.clearView();
			this.resetView(result);
		},
		
		checkInputValue: function (val) {
			
			if (/^\s*$/.test(val)) {
				
				alert('请输入搜索内容！');
				return false;
			}
			return true;
		},
		
		searchCollectionByKey: function (val, type) {
			
			return this.collection.filter(function (model, index, models) {
				if (type === 'group') {

					return model.get('pinIdType') == val;
				}
				return model.get('pinTitle').indexOf(val) > -1;
			})
		},
		
		clearView: function () {
			
			this.leftContainer.html('');
			this.rightContainer.html('');
		
			this.leftHeight= 0;
			this.rightHeight = 0;
		},
		resetView: function (arr) {
			
			for (var i = 0; i < arr.length; i++) {
				
				this.render(arr[i])
			}
		},
		showGroupView:function(e){
	
			this.$el.find('.group_pannal').toggleClass('hide');

			var id  = $(e.target).attr('data-id');
			var result = this.searchCollectionByKey(id, 'group');
			console.log(id,result)
			if(result.length > 0 ){
				this.clearView();
				this.resetView(result);
			}
			
		},

		goTop:function(){
			window.scrollTo(0, 0)
		},
	})
	module.exports = List;
})