// 创建mysql连接池
const mysql = require("mysql");
const pool = mysql.createPool({
	host: "127.0.0.1",
	user: "root",
	password: "lanwei",
	database: "xz",
	connectionLimit: 10
});
// 冻结pool变量，在兼具防扩展同时，进一步禁止删除现有属性
Object.freeze(pool);
// 把创建好的连接池导出
module.exports = pool;
