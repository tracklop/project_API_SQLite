"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"match",
			[
				{
					adversaire: "Club de Lille",
					score: 17,
					score_adversaire: 19,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					adversaire: "Club de Rouen",
					score: 21,
					score_adversaire: 13,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("match", null, {});
	},
};
