"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../database/sequelize"));
const LearningPackage_1 = __importDefault(require("./LearningPackage"));
class LearningFact extends sequelize_1.Model {
}
LearningFact.init({
    learningFactId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    question: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    answer: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    nextStudyTime: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        allowNull: false,
    },
    nbTimeReviewed: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    lastDateReview: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    confidenceLevel: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    learningPackageId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'LearningPackage',
            key: 'learningPackageId', // Refer to the 'id' column of the LearningPackage model
        },
    },
}, {
    sequelize: sequelize_2.default,
    tableName: 'LearningFact',
    modelName: 'LearningFact',
    timestamps: false,
});
LearningPackage_1.default.hasMany(LearningFact, { foreignKey: 'learningPackageId', onDelete: 'CASCADE' });
LearningFact.belongsTo(LearningPackage_1.default, { foreignKey: 'learningPackageId' });
exports.default = LearningFact;
