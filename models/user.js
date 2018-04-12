var bcrypt = require('bcrypt-nodejs');
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
		location: {
			type: DataTypes.STRING,
			allowNull: false
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
			allowNull: false
		},
		isDonor: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	});
	User.associate = function(models) {
		User.hasOne(models.Donor);
		User.hasOne(models.NonProfit);
  	};

	  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
	User.prototype.validPassword = function(password) {
		return bcrypt.compareSync(password, this.password);
	};
	// Hooks are automatic methods that run during various phases of the User Model lifecycle
	// In this case, before a User is created, we will automatically hash their password
	User.hook("beforeCreate", function(user) {
	user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
	});
	return User;
}