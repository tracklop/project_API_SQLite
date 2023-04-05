"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	// class membermatch extends Model {
	//   /**
	//    * Helper method for defining associations.
	//    * This method is not a part of Sequelize lifecycle.
	//    * The `models/index` file will call this method automatically.
	//    */
	//   static associate(models) {
	//     // define association here
	//   }
	// }
	// membermatch.init({
	//   memberId: DataTypes.INTEGER,
	//   matchId: DataTypes.INTEGER
	// }, {
	//   sequelize,
	//   modelName: 'membermatch',
	// });
	// return membermatch;

	const MemberMatch = sequelize.define(
		"membermatch",
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
		MemberMatch.belongsTo(models.member, {
			foreignKey: "memberId",
			onDelete: "CASCADE",
		});

		MemberMatch.belongsTo(models.match, {
			foreignKey: "matchId",
			onDelete: "CASCADE",
		});
	};

	return MemberMatch;
};
