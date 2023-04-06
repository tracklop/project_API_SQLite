// NOTE - Imports
const { Member, Role } = require("../models");

// NOTE - Connexion
const Login = (req, res) => {
	const { mail, password } = req.body;

	Member.findOne({ where: { mail } })
		.then((member) => {
			if (!member) {
				res.status(404).send({
					error: "Not Found",
					message: "Member not found",
				});
				return;
			}

			member
				.checkPassword(password)
				.then((isPasswordValid) => {
					if (isPasswordValid) {
						res.status(200).send({
							message: "Login successful",
						});
					} else {
						res.status(401).send({
							error: "Unauthorized",
							message: "Invalid password",
						});
					}
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
	Login,
	GetPlayers,
};
