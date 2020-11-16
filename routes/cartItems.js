const router = require("express").Router();
const pool = require("../pool");
const query = require("./query");
// cartItems 获得当前用户的购物车项，按编号降序排列
router.get("/", (req, res) => {
	let uid = req.session.uid;
	const sql = "select *,(select md from xz_laptop_pic where laptop_id=lid limit 1) as md from xz_shoppingcart_item inner join xz_laptop on product_id=lid where user_id=? order by iid desc";
	pool.query(sql, [uid], (err, result) => {
		if (err) throw err;
		res.send(result);
	})
})
// 测试: 先http://localhost:3000/login.html 先登录成功，再http://localhost:3000/cartItems
router.get("/add", (req, res) => {
	let { lid, count } = req.query;
	let uid = req.session.uid;
	const sql = "select * from xz_shoppingcart_item where user_id=? and product_id=?";
	query(sql, [uid, lid]).then(result => {
		result.length == 0 ?
			pool.query("insert into xz_shoppingcart_item values(null,?,?,?,0)", [uid, lid, count], (err, result) => {
				if (err) throw err;
				res.send();
			}) :
			pool.query("update xz_shoppingcart_item set count=count+? where user_id=? and product_id=?", [count, uid, lid], (err, result) => {
				if (err) throw err;
				res.send();
			})
	})
})
// 测试: 先http://localhost:3000/login.html 先登录成功，再http://localhost:3000/cartItems/add?lid=X&count=X
// 结果: 数据库中多一行记录，再请求相同地址
// 结果: 数据库中不会多一行记录，而是原记录数量增长
router.get("/delete", (req, res) => {

})
router.get("/update", (req, res) => {
	let { iid, count } = req.query;
	count > 0 ?
		pool.query("update xz_shoppingcart_item set count=? where iid=?", [count, iid], (err, result) => {
			if (err) throw err;
			res.send();
		}) :
		pool.query("delete from xz_shoppingcart_item where iid=?", [iid], (err, result) => {
			if (err) throw err;
			res.send()
		})
})
// http://localhost:3000/cartItems/update?iid=X&count=X

module.exports = router;