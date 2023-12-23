import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';

class LearningPackage extends Model {
    public learningPackageId!: number;
    public title!: string;
    public description!: string;
    public category!: string;
    public targetAudience!: string;
    public difficultyLevel!: number;
}

LearningPackage.init(
    {
        learningPackageId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        category: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        targetAudience: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        difficultyLevel: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    },
    {
        sequelize,
        tableName: 'LearningPackage', // This should match the actual table name in your database
        modelName: 'LearningPackage',
        timestamps: false, // Désactive les timestamps createdAt et updatedAt
    }
);

export default LearningPackage;