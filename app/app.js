// NOTE - Imports
const express = require("express");
const app = express();
const teapotRoutes = require("./routes/teapot.routes");
const memberRoutes = require("./routes/member.routes");
const verifyToken = require("./middlewares/verifyToken");
require("dotenv").config();

// NOTE - Middlewares
app.use(/^\/api(?!\/auth$).*/, (req, res, next) => {
	return verifyToken(req, res, next);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", teapotRoutes);
app.use("/api", memberRoutes);

app.use((req, res, next) => {
	res.status(404).send({ error: req.originalUrl + " not found" });
});

// NOTE - Start server
app.listen(3000, "0.0.0.0", () => {
	console.log("server started !");
});
