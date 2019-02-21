var express = require('express');
var router = express.Router();


let User = require("./../models/user.js");
router.get('/checkLogin',function(req,res,next){
	if (req.cookies.userId) {
		res.json({
			status:"0",
			msg:"",
			result:req.cookies.userName
		})
	} else{
		res.json({
			sttatus:"1",
			msg:"未登录",
			result:""
		})
	}
});


//  查询当前用户的购物车的数据
router.get('/cartList',function(req,res,next){
	var userId = req.cookies.userId;
	User.find({userId:userId},function(err,userDoc){
		if (err) {
			res.json({
				sttatus:"1",
				msg:err.message,
				result:""
			});
		} else{
			if (userDoc) {
				console.log(userDoc.cartList)
				userDoc.cartList;
				res.json({
					status:"0",
					msg:"",
					result:userDoc.cartList
				});
			}
		}
	})
});

module.exports = router;
