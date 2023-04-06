"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	const MemberMatch = sequelize.define(
		"MemberMatch",
		{
			memberId: {
				alllowNull: false,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			matchId: {
				alllowNull: false,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
		},
		{
			indexes: [
				{
					unique: true,
					fields: ["memberId", "matchId"],
				},
			],
		}
	);

	MemberMatch.associate = (models) => {
		MemberMatch.belongsTo(models.Member, {
			foreignKey: "memberId",
			onDelete: "CASCADE",
		});

		MemberMatch.belongsTo(models.Match, {
			foreignKey: "matchId",
			onDelete: "CASCADE",
		});
	};

	return MemberMatch;
};
