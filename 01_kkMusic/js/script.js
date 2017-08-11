var num = 0;
$(function(){
	//反馈结果
	var $search = $(".header-search");
	var $search_text = $search.find(".text");
	var $search_result = $search.find(".result");

	$search_text.focus(function(){
		$search_result.show();
	}).click(function(){
		return false;
	});

	$(document).click(function(){
		$search_result.hide();
	});

	$("#newSong").slider();
});
;(function($ , window , document , undefined ){
	var Plugin = function(elem){
		this.$oParent = elem;
		this.$slider_wrapper = this.$oParent.find(".slider-wrapper");
		this.$slider_items = this.$slider_wrapper.find("li");
		this.$slider_btn = this.$oParent.find(".slider-btns").find("span");
		this.$slider_prev = this.$oParent.find(".slider-prev");
		this.$slider_next = this.$oParent.find(".slider-next");

		this.dis_w = 1200;
		this.b_stop = true;
	};
	Plugin.prototype={
		inital:function(){
			var self = this;
			console.log(this.$slider_next);

			this.$slider_prev.click(function(){
				if(self.b_stop){
					self.b_stop = false;
					self.prevClick();
				}
			});
			this.$slider_next.click(function(){
				if(self.b_stop){
					self.b_stop = false;
					self.nextClick();
				}
			});
		},
		setDot:function(index){
			this.$slider_btn.removeClass("cur");
			this.$slider_btn.eq(index).addClass("cur");
		},
		prevClick:function(){
			var self = this;
			if(num ===0){
				num = this.$slider_btn.length - 1;
			}else{
				num--;
			}

			this.setDot(num);
			this.$slider_wrapper.animate({ left:-num * this.dis_w },600,function(){
				self.b_stop = true;
			});
		},
		nextClick:function(){
			var self = this;
			if(num === this.$slider_btn.length - 1){
				num = 0;
			}else{
				num++;
			}
			this.setDot(num);
			this.$slider_wrapper.animate({ left: -num * this.dis_w },600,function(){
				self.b_stop = true;
			});
		},

		constructor:Plugin
	};

	$.fn.slider = function(){
		var plugin = new Plugin(this);
		return plugin.inital();
	};
})(jQuery , window , document);
