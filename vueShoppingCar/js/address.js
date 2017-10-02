new Vue({
	el:'.container',
	data:{
		addressList:[],
		limitNum:3
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
			this.limitNum = this.addressList.length;
		}
	}
});
