"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	const Role = sequelize.define(
		"Role",
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
		Role.hasMany(models.Member, {
			foreignKey: "roleId",
			as: "members",
		});
	};

	return Role;
};
