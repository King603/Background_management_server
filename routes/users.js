const express = require("express");
const router = express.Router();
const pool = require("../pool");

router.post("/signin", (req, res) => {
	let { uname, upwd } = req.body;
	let sql = "select * from xz_user where uname=? and upwd=?";
	pool.query(sql, [uname, upwd], (err, result) => {
		err && console.log(err);
		if (result.length > 0) {
			req.session.uid = result[0].uid;
			res.write(JSON.stringify({ ok: 1 }));
		} else {
			res.write(JSON.stringify({ ok: 0, msg: "用户名或密码错误!" }));
		}
		res.end();
	})
})
router.get("/islogin", (req, res) => {
	let uid = req.session.uid
	if (uid == null) {
		res.write(JSON.stringify({ ok: 0 }));
		res.end();
	} else {
		let sql = "select * from xz_user where uid=?";
		pool.query(sql, [uid], (err, result) => {
			if (err) throw err;
			res.write(JSON.stringify({ ok: 1, uname: result[0].uname }));
			res.end();
		})
	}
})
router.get("/signout", (req, res) => {
	delete req.session.uid;
	res.send();
})

module.exports = router;
