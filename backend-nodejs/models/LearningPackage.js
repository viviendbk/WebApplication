"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../database/sequelize"));
class LearningPackage extends sequelize_1.Model {
}
LearningPackage.init({
    learningPackageId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    targetAudience: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    difficultyLevel: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: 'LearningPackage',
    modelName: 'LearningPackage',
    timestamps: false, // Désactive les timestamps createdAt et updatedAt
});
exports.default = LearningPackage;
