"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const members = await queryInterface.sequelize.query(
			"SELECT id, mail FROM Members"
		);
		const membersMap = {};

		members[0].forEach((member) => {
			membersMap[member.mail] = member.id;
		});

		const matches = await queryInterface.sequelize.query(
			"SELECT id, adversaire FROM Matches"
		);
		const matchesMap = {};

		matches[0].forEach((match) => {
			matchesMap[match.adversaire] = match.id;
		});

		await queryInterface.bulkInsert(
			"MembersMatches",
			[
				{
					memberId: membersMap["john.doe1@example.com"],
					matchId: matchesMap["Club de Lille"],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					memberId: membersMap["john.doe2@example.com"],
					matchId: matchesMap["Club de Rouen"],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					memberId: membersMap["john.doe3@example.com"],
					matchId: matchesMap["Club de Lille"],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					memberId: membersMap["john.doe3@example.com"],
					matchId: matchesMap["Club de Rouen"],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("MembersMatches", null, {});
	},
};
