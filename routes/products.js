const router = require("express").Router();
let query = require("./query");
router.get("/", (req, res) => {
	let output = {
		count: 0,
		pageSize: 9,
		pageCount: 0,
		pno: req.query.pno,
		data: []
	};
	/**@type {string} */
	let kw = req.query.kw;
	// "mac i5 128g"
	let kws = kw.split(" ");
	// [mac,i5,128g]
	kws.forEach((elem, i, arr) => arr[i] = "title like '%${elem}%'");
	/*[	title like '%mac%',	title like '%i5%',	title like '%128g%']*/
	// join(" and ");
	let where = kws.join(" and ");
	// "title like '%mac%' and title like '%i5%' and title like '%128g%'"
	let sql = `select *,(select md from xz_laptop_pic where laptop_id=lid limit 1) as md from xz_laptop where ${where}`;
	query(sql, [])
		.then(result => {
			output.count = result.length;
			output.pageCount = Math.ceil(output.count / output.pageSize);
			sql += " limit ?,?";
			return query(sql, [output.pageSize * output.pno, output.pageSize]);
		})
		.then(result => {
			output.data = result;
			res.send(output);
		});
})
router.get("/shelp", (req, res) => {
	/**@type {string} */
	let kw = req.query.kw;
	let kws = kw.split(" ");
	kws.forEach((elem, i, arr) => arr[i] = "title like '%${elem}%'");
	let where = kws.join(" and ");
	let sql = "select lid,title from xz_laptop where ${where} limit 10";
	query(sql, []).then(result => res.send(result));
})
module.exports = router;