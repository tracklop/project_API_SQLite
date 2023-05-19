const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");

const verifyToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const accessToken = authHeader && authHeader.split(" ")[1];
	const refreshToken = req.headers["x-refresh-token"];

	if (!authHeader) {
		return res.status(403).send({
			error: "Forbidden",
			message: "No authorization header provided",
		});
	}

	if (!refreshToken) {
		return res.status(403).send({
			error: "Forbidden",
			message: "No refresh token provided",
		});
	}

	try {
		const decodedAccess = jwt.verify(accessToken, authConfig.secret);

		req.userId = decodedAccess.id;
		req.userRole = decodedAccess.role;

		next();
	} catch (accessError) {
		if (accessError.name === "TokenExpiredError") {
			try {
				const decodedRefresh = jwt.verify(refreshToken, authConfig.secret);

				const newAccessToken = jwt.sign(
					{
						id: decodedRefresh.id,
						role: decodedRefresh.role,
					},
					authConfig.secret,
					{
						expiresIn: authConfig.accessTokenExpiration,
					}
				);

				req.userId = decodedRefresh.id;
				req.userRole = decodedRefresh.role;

				res.setHeader("Authorization", `Bearer ${newAccessToken}`);

				next();
			} catch (refreshError) {
				return res.status(500).send({
					error: "Internal Server Error",
					message: "Fail to Authentication. Error -> " + refreshError,
				});
			}
		} else {
			return res.status(500).send({
				error: "Internal Server Error",
				message: "Fail to Authentication. Error -> " + accessError,
			});
		}
	}
};

module.exports = verifyToken;
