module.exports = function(sequelize, DataTypes) {
	var Volunteer = sequelize.define("Volunteer", {
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
        canDrive: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	});
	Volunteer.associate = function(models) {
		Volunteer.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});
		Volunteer.belongsToMany(models.FoodPost, { through: "VolunteerRoster" });
  	};
	return Volunteer;
}