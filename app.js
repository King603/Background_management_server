// 使用express构建web服务器
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");

/**引入路由模块 */
const routes = {
	index: require("./routes/index"),
	detail: require("./routes/details"),
	product: require("./routes/products"),
	user: require("./routes/users"),
	cartItem: require("./routes/cartItems"),
};
// 封装URL字段方便更改
const HTTP = ["http", "https"];
const NAME = ["localhost", "127.0.0.1", "192.168.1.15"];
const PORT = 8080;

let app = express();
app.use(cors({
	origin: ((httpArr, nameArr, port) => {
		let origin = [];
		httpArr.forEach(http => nameArr.forEach(name => origin.push(http + "://" + name + ":" + port)));
		return origin;
	})(HTTP, NAME, PORT),
	credentials: true
}));

// 根据端口监听前端信息
app.listen(PORT);
// 使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }));
// 托管静态资源到public目录下
app.use(express.static("public"));
app.use(session({
	secret: "随机字符串",
	cookie: { maxAge: 60 * 1000 * 30 },// 过期时间ms
	resave: false,
	saveUninitialized: true
}));// 将服务器的session，放在req.session中

// 使用路由器来管理路由 
app.use("/index", routes.index);
app.use("/details", routes.detail);
app.use("/products", routes.product);
app.use("/users", routes.user);
app.use("/cartItems", routes.cartItem)
