var vm = new Vue({
	el:"#app",
	data:{
		totalMoney:0,
		productList:[],
		checkAll:false,
		delFlag:false,
		curProduct:''
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
			this.calcPrice();
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
			this.calcPrice();
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
			this.calcPrice();
		},
		calcPrice:function(){
			var _this = this;
			this.totalMoney = 0;
			this.productList.forEach(function(item,index){
				if(item.checked){
					_this.totalMoney += item.productQuantity * item.productPrice;
				}
			});
		},
		delConfirm:function(item){
			this.delFlag = true;
			this.curProduct = item;
		},
		delProduct:function(){
			var index = this.productList.indexOf(this.curProduct);
			this.productList.splice(index,1);
			this.delFlag = false;
		}
	}
});
Vue.filter('money',function(value,type){
	return '￥ '+value.toFixed(2) + type;
});
