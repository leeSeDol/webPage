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


	//旋转木马
	var $recommend = $('#recommend');
	var $carousel_item = $recommend.find('.carousel-slider').find('.item');
	var $carousel_prev = $recommend.find('.slider-prev');
	var $carousel_next = $recommend.find('.slider-next');
	var $carousel_btn = $recommend.find('.slider-btns').find('span');

	var carouselArr = ['item-pic1','item-pic2','item-pic3','item-pic4','item-pic5','item-pic6'];
	var b_stop = true;
	var iNum = 0;

	$carousel_btn.click(function(){
		var cur_index = $(this).index();
		var _num = cur_index - iNum;

		if(iNum === cur_index){
			return;
		}else if(iNum < cur_index){
			var newArr = carouselArr.splice(0,_num);
			carouselArr = $.merge(carouselArr,newArr);

			$carousel_item.each(function(i,elem){
				$carousel_item.removeClass(carouselArr[i]);
				$(elem).addClass(carouselArr[i]);
			});
		}else{
			carouselArr.reverse();
			var newArr = carouselArr.splice(0,-_num);
			$.merge(carouselArr,newArr);
			carouselArr.reverse();

			$carousel_item.each(function(i,elem){
				$carousel_item.removeClass(carouselArr[i]);
				$(elem).addClass(carouselArr[i]);
			});
		}
		setBtn(cur_index);
		iNum = cur_index;
	});

	$carousel_prev.click(function(){
		if(b_stop){
			b_stop = false;
			prevImg();
		}
		return false;
	});
	$carousel_next.click(function(){
		if(b_stop){
			b_stop = false;
			nextImg();
		}
		return false;
	});
	$(document).on('click','#recommend .item-pic2',function(){
		if(b_stop){
			b_stop = false;
			prevImg();
		}
		return false;
	});
	$(document).on('click','#recommend .item-pic4',function(){
		if(b_stop){
			b_stop = false;
			nextImg();
		}
		return false;
	});
	function setBtn(index){
		$carousel_btn.removeClass("cur");
		$carousel_btn.eq(index).addClass("cur");
	}
	function prevImg(){
		carouselArr.push(carouselArr.shift());

		$carousel_item.each(function(i,elem){
			$carousel_item.removeClass(carouselArr[i]);
			$(elem).addClass(carouselArr[i]);

			setTimeout(function(){
				b_stop = true;
			},300);
		});

		if(iNum === 0){
			iNum = $carousel_item.length - 1;
		}else{
			iNum--;
		}
		setBtn(iNum);
	}
	function nextImg(){
		carouselArr.unshift(carouselArr.pop());

		$carousel_item.each(function(i,elem){
			$carousel_item.removeClass(carouselArr[i]);
			$(elem).addClass(carouselArr[i]);
			setTimeout(function(){
				b_stop = true;
			},300);
		});

		if(iNum === $carousel_item.length - 1){
			iNum = 0;
		}else{
			i=iNum++;
		}
		setBtn(iNum);
	}
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

			this.$slider_btn.click(function(){
				var cur_index = $(this).index();
				num = cur_index;
				self.setDot(num);
				self.$slider_wrapper.animate({left: -num * self.dis_w},600);
			});

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
