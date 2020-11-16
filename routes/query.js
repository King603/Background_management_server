var pool = require("../pool");
/**
 * 
 * @param {string} sql 
 * @param {string[]} params 
 */
module.exports = function (sql, params) {
	return new Promise((resolve, reject) => {
		pool.query(sql, params, (error, result) => {
			error ? reject(error) : resolve(result);
		})
	})
};
