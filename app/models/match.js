"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	// class match extends Model {
	//   /**
	//    * Helper method for defining associations.
	//    * This method is not a part of Sequelize lifecycle.
	//    * The `models/index` file will call this method automatically.
	//    */
	//   static associate(models) {
	//     // define association here
	//   }
	// }
	// match.init({
	//   adversaire: DataTypes.STRING,
	//   score: DataTypes.INTEGER,
	//   score_adversaire: DataTypes.INTEGER
	// }, {
	//   sequelize,
	//   modelName: 'match',
	// });
	// return match;

	const Match = sequelize.define(
		"match",
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
		Match.belongsToMany(models.member, {
			through: models.membermatch,
			foreignKey: "matchId",
			otherKey: "memberId",
			as: "members",
		});
	};

	return Match;
};
