let express = require('express');
let router = express.Router(); // 获取路由
let mongoose = require('mongoose');
require('./../util/util');

//  

// 链接数据库
// 有密码的情况下 'mongodb://root:123465@127.0.0.1:27017/dumall'
// 链接数据库   库名db_demo
mongoose.connect('mongodb://127.0.0.1:27017/db_demo',{useNewUrlParser: true});

//  监听数据库   链接成功
mongoose.connection.on('connected',function(){
	console.log('Mongodb connected success');
});
//   链接失败
mongoose.connection.on('error',function(){
	console.log('Mongodb connected error');
});
//   断开连接
mongoose.connection.on('disconnected',function(){
	console.log('Mongodb connected disconnected');
});


//  【查询商品列表数据】
//  new Schema一个实例做一个模板
let Schema = mongoose.Schema;
let productchena = new Schema({
	'productId':String,
	'productName':String,
	'salePrice':Number,
	'productImage':String,
	'checked':String,
	'productNum':Number
});
//  模板与数据库中的集合做匹配
let Goods = mongoose.model('good',productchena);
router.get('/list',function(req,res,next){
	//   获取前端传过来的数据    因为是get请求   所以是拼接到url上的    用param来获取
	let sort = req.param('sort');
	let page = parseInt(req.param('page'));
	let pageSize = parseInt(req.param('pageSize'));
	let priceLevel = req.param('priceLevel');
	let priceGt = "",priceLte = "";
	let params = {};
	
	if (priceLevel !== 'all') {
		switch(priceLevel){  //  将价格区间按照索引来过滤
			case "0":priceGt = 0;priceLet=500;break;
			case "1":priceGt = 500;priceLet=1000;break;
			case "2":priceGt = 1000;priceLet=2000;break;
			case "3":priceGt = 2000;priceLet=5000;break;
		}
		params = {
			salePrice:{
				$gt:priceGt,
				$lte:priceLet
			}
		}
	};
	
	let skip = (page-1)*pageSize; //  相当于索引*条数     页面上一共有几条
	//  limit    一次加载多少条数据
	let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
	goodsModel.sort({"salePrice":sort});  //   排序
	goodsModel.exec(function(err,doc){    //   exec  执行
		if(err){
			res.json({
				status:"1",
				msg:err.message
			});
		}else{
			res.json({
				status:"0",
				msg:"",
				list:{
					count:doc.length,
					list:doc
				}
			});
		}
	});
});



let User = require("./../models/user.js");
//  添加到购物车
router.post('/addCart',function(req,res,next){
	let userId = '100000077';
	let productId = req.body.productId
	User.findOne({userId:userId},function(err,userDoc){
		if (err) {
			res.json({
				status:'1',
				msg:"报错了！"
			})
		} else{
			if(userDoc){
				let goodsItem = '';
				userDoc.cartList.forEach(item=>{
					if(item.productId == productId){
						goodsItem = item;
						item.productNum++;
					}
				})
				if (goodsItem) {
					userDoc.save(function(err2,doc2){
						if (err2) {
							res.json({
								status:'1',
								msg:"报错了！"
							})
						} else{
							res.json({
								status:"0",
								msg:"",
								result:"success"
							})
						} //  if  五
					})
				} else{
					Goods.findOne({productId:productId},function(err1,doc1){
						if (err1) {
							res.json({
								status:'1',
								msg:"报错了！"
							})
						} else{
							if (doc1) {
								doc1.productNum = 1;
								doc1.checked = 1;
								userDoc.cartList.push(doc1);
								userDoc.save(function(err2,doc2){
									if (err2) {
										res.json({
											status:'1',
											msg:"报错了！"
										})
									} else{
										res.json({
											status:"0",
											msg:"",
											result:"success"
										})
									} //  if  五
								})
							} else{
								
							} //  if  四
						} //  if  三
					})  // Goods.findOne					
				}
			}//  if  二
		}//  if 一
	})
});


//  登录
router.post('/login',function(req,res,next){
	let userId = '100000077';
	var param = {
		userName:req.body.userName,
		userPwd:req.body.userPwd
	};
	User.findOne(param,function(err,doc){	
		if (err) {
			res.json({
				status:"1",
				msg:err.message
			})
		} else{
			if(doc){
				res.cookie('userId',doc.userId,{
					path:'/',
					maxAge:6000*60
				});
				res.cookie('userName',doc.userName,{
					path:'/',
					maxAge:6000*60
				})
				res.json({
					status:"0",
					msg:"",
					result:{
						userName:doc.userName
					}
				})
			} else {
				res.json({
					status:"1",
					msg:"账号密码错误",
					result:''
				})
			}
		}
	})
});


//  退出  req请求,res响应,next下一个
router.post("/logout",function(req,res,next){
	res.cookie('userId',"",{
		path:'/',
		maxAge:-1
	});
	res.json({
		status:"0",
		msg:"",
		result:""
	})
});


//  获取cookies值    将它方到用户名的地方
router.get('/checkLogin',function(req,res,next){
	if (req.cookies.userId) {
		res.json({
			status:"0",
			msg:"",
			result:req.cookies.userName
		})
	} else{
		res.json({
			status:"1",
			msg:"未登录",
			result:""
		})
	}
});


//  查询当前用户的购物车的数据
router.get('/cartList',function(req,res,next){
	var userId = req.cookies.userId;
	User.findOne({userId:userId},function(err,doc){		
		if (err) {
			res.json({
				status:"1",
				msg:err.message,
				result:""
			});
		} else{
			if (doc) {				
				res.json({
					status:"0",
					msg:"",
					result:doc.cartList
				});
			}
		}
	})
});


//  删除购物车商品
router.post('/cartdel',function(req,res,next){
	var userId = req.cookies.userId,
		productId = req.body.productId;		
	User.update({
		userId:userId
	},{
		$pull:{
			'cartList':{
				'productId':productId
			}
		}
	},function(err,doc){
		if (err) {
			res.json({
				status:"1",
				msg:err.message,
				result:""
			});
		} else{
			res.json({
				status:"0",
				msg:"",
				result:"删除成功"
			});
		}
	})
});


// 修改商品数量  保存productNum与checked
router.post('/cartEdit',function(req,res,next){
	var userId = req.cookies.userId,
		productId = req.body.productId,
		productNum = req.body.productNum,
		checked = req.body.checked;
	User.update({"userId":userId,"cartList.productId":productId},{
		"cartList.$.productNum":productNum,
		"cartList.$.checked":checked,
	},function(err,doc){
		if (err) {
			res.json({
				status:"1",
				msg:err.message,
				result:""
			});
		} else{
			res.json({
				status:"0",
				msg:"",
				result:"更新数据成功"
			});
		}
	})
});



//  购物车修改    全部选中    全不选中
router.post('/editCheckAll',function(req,res,next){
	var userId = req.cookies.userId,
		checkAll = req.body.checkAll?"1":'0';
	User.findOne({userId:userId},function(err,user){
		if (err) {
			res.json({
				status:"1",
				msg:err.message,
				result:""
			});
		} else{
			if(user){
				user.cartList.forEach((item)=>{
					item.checked = checkAll;
				})
				user.save(function(err,doc){
					if (err) {
						res.json({
							status:"1",
							msg:err.message,
							result:""
						});
					} else{
						res.json({
							status:"0",
							msg:"",
							result:"更新数据成功（选中）"
						});
					}
				})
			}
			
		}
	})
});


//  查询用户地址接口
router.get('/addressList',function(req,res,next){
	var userId = req.cookies.userId;
	User.findOne({userId:userId},function(err,doc){
		if (err) {
			res.json({
				status:"1",
				msg:err.message,
				result:""
			})
		} else{
			res.json({
				status:"0",
				msg:"",
				result:doc.addressList
			})
		}
	})
});


// 设置默认地址
router.post('/setDefault',function(req,res,next){
	var userId = req.cookies.userId,
		addressId = req.body.addressId;
	if (!addressId) {
		res.json({
			status:"1003",
			msg:"addressId is null",
			result:""
		})
	} else{
		User.findOne({userId:userId},function(err,doc){
			var addressList = doc.addressList;
			addressList.forEach((item)=>{
				if(item.addressId == addressId){
					item.isDefault = true;
				} else {
					item.isDefault = false;
				}
			});
			doc.save(function(err1,doc1){
				if (err1) {
					err1.json({
						status:"1",
						msg:err.message,
						result:""
					})
				} else{
					res.json({
						status:"0",
						msg:"",
						result:""
					})
				}
			})
		})
	}
})


//  删除地址的接口
router.post('/delAddress',function(req,res,next){
	var userId = req.cookies.userId,
		addressId = req.body.addressId;
	User.update({
		userId:userId
	},{
		$pull:{
			'addressList':{
				'addressId':addressId
			}
		}
	},function(err,doc){
		if (err) {
			res.json({
				status:"1",
				msg:err.message,
				result:""
			})
		} else{
			res.json({
				status:"0",
				msg:"",
				result:"删除成功"
			})
		}
	})
})


//  生成订单
router.post('/payMent',function(req,res,next){
	var userId = req.cookies.userId,
		orderTotal = req.body.orderTotal,
		addressId = req.body.addressId;
	User.findOne({userId:userId},function(err,doc){
		if (err) {
			res.json({
				status:"1",
				msg:err.message,
				result:""
			})
		} else{
			var address = '',
				goodsList = [];
			//  获取当前用户的地址信息
			doc.addressList.forEach((item)=>{
				if (addressId == item.addressId) {
					address = item;
				}
			});
			//  获取用户购物车的购买商品
			doc.cartList.filter((item)=>{
				if (item.checked=='1') {
					goodsList.push(item);
				}
			});
			
			//  生成独一无二的ID和准确日期
			var platform = '622';
			var r1 = Math.floor(Math.random()*10),
				r2 = Math.floor(Math.random()*10);
			var sysDate = new Date().Format('yyyyMMddhhmmss');	
			var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
			var orderId = platform+r1+sysDate+r2;	
				
				
			//  创建订单
			var order = {
				orderId:orderId,
				orderTotal:orderTotal,
				addressInfo:address,
				goodsList:goodsList,
				orderStatus:"1",
				createDate:createDate
			}
			
			// 存入数据库
			doc.orderList.push(order);
			doc.save(function(err1,doc1){
				if (err1) {
					res.json({
						status:"1",
						msg:err1.message,
						result:""
					})
				} else {
					res.json({
						status:"0",
						msg:"",
						result:{
							orderId:order.orderId,
							orderTotal:order.orderTotal
						}
					})
				}
			})				
		}
	})
})


//  根据 订单ID 查询订单信息
router.post('/orderDetail',function(req,res,next){
	var userId = req.cookies.userId,
		orderId = req.body.orderId;
//		orderId = req.param('orderId');
	User.findOne({userId:userId},function(err,userInfo){
		if(err){
			res.json({
				status:"1",
				msg:err.message,
				result:""
			})
		} else{
			var orderList = userInfo.orderList;
			var orderTotal = '';
			if (orderList.length>0) {
				orderList.forEach((item)=>{
					if(item.orderId == orderId){
						orderTotal = item.orderTotal
					}
				});
				if(orderTotal>0){
					res.json({
						status:'0',
						msg:"",
						result:{
							orderTotal:orderTotal,
							orderId:orderId
						}
					})
				} else{
					res.json({
						status:"12002",
						msg:"没有找到订单",
						result:""
					})
				};
				
			} else{
				res.json({
					status:"12001",
					msg:"用户未创建订单",
					result:""
				})
			}
		}
	})
});


//  用Vuex来做动态加减商品数量接口  
router.get('/getCartCount',function(req,res,next){
	if (req.cookies && req.cookies.userId) {
		var userId = req.cookies.userId;
		User.findOne({userId:userId},function(err,doc){
			if (err) {
				res.json({
					status:"1",
					msg:err.message,
					result:""
				})
			} else{
				var cartList = doc.cartList;
				let cartCount = 0;
				cartList.map(item=>{
					cartCount += parseInt(item.productNum);
				});
				res.json({
					stateu:"0",
					msg:"",
					result:cartCount
				})
			}
		})
	}
});
module.exports = router;   //  将router返出去



 

