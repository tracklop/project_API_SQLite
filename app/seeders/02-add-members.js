"use strict";

const bcrypt = require("bcrypt");

const { QueryInterface } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const roles = await queryInterface.sequelize.query(
			"SELECT id, name FROM Roles"
		);
		const rolesMap = {};

		roles[0].forEach((role) => {
			rolesMap[role.name] = role.id;
		});

		await queryInterface.bulkInsert(
			"Members",
			[
				{
					name: "John Doe 1",
					mail: "john.doe1@example.com",
					password: bcrypt.hashSync("johndoe1123", 10),
					roleId: rolesMap["joueur"],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "John Doe 2",
					mail: "john.doe2@example.com",
					password: bcrypt.hashSync("johndoe2123", 10),
					roleId: rolesMap["joueur"],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "John Doe3",
					mail: "john.doe3@example.com",
					password: bcrypt.hashSync("johndoe3123", 10),
					roleId: rolesMap["joueur"],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Jack Doe",
					mail: "jack.doe@example.com",
					password: bcrypt.hashSync("jackdoe123", 10),
					roleId: rolesMap["contributeur"],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Jane Doe",
					mail: "jane.doe@example.com",
					password: bcrypt.hashSync("janedoe123", 10),
					roleId: rolesMap["coach"],
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Members", null, {});
	},
};
