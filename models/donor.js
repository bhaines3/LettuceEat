module.exports = function (sequelize, DataTypes) {
    var Donor = sequelize.define("Donor", {
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
        },
        summary: {
            type: DataTypes.STRING,
            allowNull: true
        },
        website: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    Donor.associate = function (models) {
        Donor.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Donor.hasMany(models.FoodPost);
    };
    return Donor;
}