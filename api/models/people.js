'use strict';
const {Model, ValidationError} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class People extends Model {

        static associate(models) {
            People.hasMany(models.Class, {
                foreignKey: 'teacher_id'
            })
            People.hasMany(models.Enrollment, {
                foreignKey: "student_id",
                scope: {status: "confirmed"},
                as: "registeredClasses"
            })
        }

    }

    People.init({
        name: {
            type: DataTypes.STRING,
            validate: {
                validLenName: function (namePeople) {
                    if (namePeople.length < 3) {
                        throw new ValidationError("the name must be longer than three characters.")
                    }
                }
            }
        },
        active: DataTypes.BOOLEAN,
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    args: true,
                    msg: "E-mail is not valid."
                }
            }
        },
        role: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'People',
        paranoid: true,
        defaultScope: {
            active: true
        },
        scopes: {
            all: {
                where: {}
            }
        }
    });
    return People;
};