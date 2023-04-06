"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	const Match = sequelize.define(
		"Match",
		{
			adversaire: {
				unique: true,
				alllowNull: false,
				type: DataTypes.STRING,
			},
			score: {
				alllowNull: true,
				type: DataTypes.INTEGER,
			},
			score_adversaire: {
				alllowNull: true,
				type: DataTypes.INTEGER,
			},
		},
		{}
	);

	Match.associate = (models) => {
		Match.belongsToMany(models.Member, {
			through: models.MemberMatch,
			foreignKey: "matchId",
			otherKey: "memberId",
			as: "members",
		});
	};

	return Match;
};
