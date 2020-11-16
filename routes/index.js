const router = require("express").Router();
const pool = require("../pool");
router.get("/", (req, res) => {
	var sql = "SELECT * FROM `xz_index_product` where seq_recommended!=0 order by seq_recommended";
	pool.query(sql, [], (err, result) => {
		if (err) throw err;
		res.write(JSON.stringify(result));
		res.end();
	})
})
module.exports = router;
// http://localhost:3000/index