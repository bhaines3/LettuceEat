module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("User", {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [6]
			}
		},
		phonenumber: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		isDonor: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		}
	});
	User.associate = function(models) {
		User.hasOne(models.Donor);
		User.hasOne(models.NonProfit);
  	};

	return User;
}