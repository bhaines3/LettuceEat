module.exports = function(sequelize, DataTypes) {
	var NonProfit = sequelize.define("NonProfit",
	{
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		phonenumber: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				len: [1]
			}
		},
		location: {
			type: DataTypes.STRING,
			allowNull: true
			// ,
			// validate: {
			// 	len: [1]
			// }
		}
  });
    NonProfit.associate = function(models) {
		NonProfit.belongsTo(models.User, {
		  foreignKey: {
		    allowNull: false
		  }
		});
		NonProfit.belongsToMany(models.FoodPost, {through: "InterestedRoster"});
	};
	return NonProfit;
}