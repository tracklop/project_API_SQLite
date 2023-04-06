"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"MembersMatches",
			{
				memberId: {
					allowNull: false,
					primaryKey: true,
					type: Sequelize.INTEGER,
					references: {
						model: "Members",
						key: "id",
					},
					onUpdate: "CASCADE",
					onDelete: "CASCADE",
				},
				matchId: {
					allowNull: false,
					primaryKey: true,
					type: Sequelize.INTEGER,
					references: {
						model: "Matches",
						key: "id",
					},
					onUpdate: "CASCADE",
					onDelete: "CASCADE",
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
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
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("MembersMatches");
	},
};
