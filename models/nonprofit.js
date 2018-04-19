module.exports = function (sequelize, DataTypes) {
    var NonProfit = sequelize.define("NonProfit",
        {
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
            phonenumber: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1]
                }
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1]
                }
            },
            summary: {
                type: DataTypes.STRING,
                allowNull: true
            },
            hoursforpickup: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: "No set time"
            },
            website: {
                type: DataTypes.STRING,
                allowNull: true
            }
        });
    NonProfit.associate = function (models) {
        NonProfit.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        NonProfit.belongsToMany(models.FoodPost, { through: "InterestedRoster" });
    };
    return NonProfit;
}