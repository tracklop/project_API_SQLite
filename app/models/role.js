"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	const Role = sequelize.define(
		"role",
		{
			name: {
				unique: true,
				alllowNull: false,
				type: DataTypes.STRING,
			},
		},
		{}
	);

	Role.associate = (models) => {
		Role.hasMany(models.member, {
			foreignKey: "roleId",
			as: "members",
		});
	};

	return Role;
};
