require("dotenv").config();

module.exports = {
	secret: process.env.JWT_SECRET,
	accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION || 3600, // 1 heure
	refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || 86400, // 24 heures
};
