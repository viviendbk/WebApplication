import {DataTypes, Model} from "sequelize";
import sequelize from '../database/sequelize';
import LearningPackage from "./LearningPackage";
class LearningFact extends Model {
    public learningFactId!: number;
    public title!: string;
    public question!: string;
    public answer!: string;
    public nextStudyTime!: string;
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
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
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
        timestamps: false, // Désactive les timestamps createdAt et updatedAt
    }
);

LearningPackage.hasMany(LearningFact, { foreignKey: 'learningPackageId', onDelete: 'CASCADE' });
LearningFact.belongsTo(LearningPackage, { foreignKey: 'learningPackageId' });

export default LearningFact;