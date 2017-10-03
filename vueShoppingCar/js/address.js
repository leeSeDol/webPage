new Vue({
	el:'.container',
	data:{
		addressList:[],
		limitNum:3,
		currentIndex:0,
		moreFlag:false,
		shippingMethod:1
	},
	mounted:function(){
		this.$nextTick(function(){
			this.getAdressList();
		});
	},
	computed:{
		filterAddress:function(){
			return this.addressList.slice(0,this.limitNum);
		}
	},
	methods:{
		getAdressList:function(){
			var _this = this;
			this.$http.get("data/address.json").then(function(response){
				var res = response.data;
				if(res.status == "0"){
					_this.addressList = res.result;
				}
			});
		},
		loadMore:function(){
			if(this.moreFlag == false){
				this.limitNum = this.addressList.length;
				this.moreFlag = true;
			}else{
				this.limitNum = 3;
				this.moreFlag = false;
			}
		},
		setDefault:function(addressId){
			this.addressList.forEach(function(item , index){
				if(item.addressId == addressId){
					item.isDefault = true;
				}else{
					item.isDefault = false;
				}
			});
		}
	}
});
