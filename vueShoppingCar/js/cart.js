var vm = new Vue({
	el:"#app",
	data:{
		totalMoney:0,
		productList:[],
		checkAll:false
	},
	filters:{
		formatMoney:function(value){
			return "￥ "+value.toFixed(2);
		}
	},
	mounted:function(){
		this.$nextTick(function(){
			vm.cartView();
		});
	},
	methods:{
		cartView:function(){
			var _this = this;
			vm.$http.get("data/cartData.json").then(function(res){
				_this.productList = res.data.result.list;
				_this.totalMoney = res.data.result.totalMoney;
			},function(err){
				console.log(err);
			});
		},
		changeMoney:function(product,way){
			if( way>0 ){
				product.productQuantity++;
			}else{
				product.productQuantity--;
				if( product.productQuantity <= 0 ){
					product.productQuantity = 0;
				}
			}
		},
		selectedProducted:function(item){
			if( typeof item.checked == "undefined" ){
				this.$set(item,"checked",true);
			}else{
				item.checked = !item.checked;
			}
			var flag = true;
			this.productList.forEach(function(item,index){
				if(item.checked == false){
					flag = false;
				}
			});
			if(flag == true){
				this.checkAll = true;
			}else if( flag == false ){
				this.checkAll = false;
			}
		},
		changeCheckAll:function(){
			this.checkAll = !this.checkAll;
			if(this.checkAll){
				var _this = this;
				this.productList.forEach(function(item,index){
					if(typeof item.checked == "undefined"){
						_this.$set(item,"checked",true);
					}else{
						item.checked = true;
					}
				});
			}else{
				var _this = this;
				this.productList.forEach(function(item,index){				
					item.checked = !item.checked;
				});
			}
		}
	}
});
Vue.filter('money',function(value,type){
	return '￥'+value.toFixed(2) + type;
});