"use strict";

const bcrypt = require("bcrypt");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	const Member = sequelize.define(
		"member",
		{
			name: {
				alllowNull: false,
				type: DataTypes.STRING,
			},
			mail: {
				unique: true,
				alllowNull: false,
				type: DataTypes.STRING,
			},
			password: {
				alllowNull: false,
				type: DataTypes.STRING,
			},
			roleId: {
				alllowNull: false,
				type: DataTypes.INTEGER,
			},
		},
		{}
	);

	Member.associate = (models) => {
		Member.belongsTo(models.role, {
			foreignKey: "roleId",
			as: "role",
		});

		Member.belongsToMany(models.match, {
			through: models.membermatch,
			foreignKey: "memberId",
			otherKey: "matchId",
			as: "matches",
		});
	};

	Member.beforeCreate(async (member, options) => {
		const salt = await bcrypt.genSalt(10);
		member.password = await bcrypt.hash(member.password, salt);
	});

	Member.prototype.checkPassword = async (password) => {
		return await bcrypt.compare(password, this.password);
	};

	return Member;
};
