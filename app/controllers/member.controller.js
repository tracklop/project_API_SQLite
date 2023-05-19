// NOTE - Imports
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");
const { Member, Role } = require("../models");

// NOTE - Connexion
const Authentication = (req, res) => {
	const { mail, password } = req.body;

	Member.findOne({
		where: { mail },
		include: {
			model: Role,
			as: "role",
		},
	})
		.then((member) => {
			if (!member) {
				return res.status(404).send({
					error: "Not Found",
					message: "Member not found",
				});
			}

			member
				.checkPassword(password)
				.then((isPasswordValid) => {
					if (!isPasswordValid) {
						return res.status(401).send({
							error: "Unauthorized",
							message: "Invalid password",
						});
					}

					const accessToken = jwt.sign(
						{
							id: member.id,
							role: member.role.name,
						},
						authConfig.secret,
						{
							expiresIn: authConfig.accessTokenExpiration,
						}
					);

					const refreshToken = jwt.sign(
						{
							id: member.id,
							role: member.role.name,
						},
						authConfig.secret,
						{
							expiresIn: authConfig.refreshTokenExpiration,
						}
					);

					res.set({
						Authorization: `Bearer ${accessToken}`,
						"x-refresh-token": refreshToken,
					});

					res.status(200).send({ message: "Authenticated successfully" });
				})
				.catch((error) => {
					res.status(500).send({
						error: "Internal Server Error",
						message: "Sorry, we don't understand what happened",
					});
				});
		})
		.catch((error) => {
			res.status(500).send({
				error: "Internal Server Error",
				message: "Sorry, we don't understand what happened",
			});
		});
};

// NOTE - Get all players
const GetPlayers = (req, res) => {
	Member.findAll({
		where: {
			"$role.name$": "joueur",
		},
		include: [
			{
				model: Role,
				as: "role",
			},
		],
	})
		.then((players) => {
			res.status(200).send(players);
		})
		.catch((error) => {
			res.status(500).send({
				error: "Internal Server Error",
				message: "Sorry, we don't understand what happened",
			});
		});
};

// NOTE - Exporting the functions
module.exports = {
	Authentication,
	GetPlayers,
};
