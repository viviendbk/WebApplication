import {DataTypes, Model} from "sequelize";
import sequelize from '../database/sequelize';
import LearningPackage from "./LearningPackage";
class LearningFact extends Model {
    public learningFactId!: number;
    public title!: string;
    public question!: string;
    public answer!: string;
    public nextStudyTime!: Date;
    public lastDateReview!: Date;
    public nbTimeReviewed!: number
    public confidenceLevel!: number
    public learningPackageId!:number;
}

LearningFact.init(
    {
        learningFactId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        question: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        answer: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        nextStudyTime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        nbTimeReviewed : {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        lastDateReview: {
            type: DataTypes.DATE,
            allowNull: true
        },
        confidenceLevel: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        learningPackageId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'LearningPackage', // Refer to the LearningPackage model
                key: 'learningPackageId', // Refer to the 'id' column of the LearningPackage model
            },
        },
    },
    {
        sequelize,
        tableName: 'LearningFact',
        modelName: 'LearningFact',
        timestamps: false,
    }
);

LearningPackage.hasMany(LearningFact, { foreignKey: 'learningPackageId', onDelete: 'CASCADE' });
LearningFact.belongsTo(LearningPackage, { foreignKey: 'learningPackageId' });

export default LearningFact;