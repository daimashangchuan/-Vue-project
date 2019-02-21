let mongoose = require('mongoose')
//  Schema是用来建立模板
let userSchema = new mongoose.Schema({ 
	"userId":String,
	"userName":String,
	"userPwd":String,
	"orderList":Array,
	"cartList":[
		{
			"productImage":String,
			"salePrice":String,
			"productName":String,
			"productId":String,
			"productNum":String,
			"checked":String
		}
	],
	"addressList":[
		{
			"addressId" : String,
            "userName" : String,
            "streetName" : String,
            "postCode" : String,
            "tel" : String,
            "isDefault" : Boolean
		}
	],
	"goodsList":[
		{
			"productId":String,
			"productName":String,
			"productImage":String,
			"salePrice":String,
			"productNum":String,
			"checked":String
		}
	]
	
});
//  model是匹配数据库的集合
module.exports = mongoose.model('User',userSchema);









