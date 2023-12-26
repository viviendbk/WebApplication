import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';

class LearningPackage extends Model {
    public learningPackageId!: number;
    public title!: string;
    public description!: string;
    public category!: string;
}

// @ts-ignore
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
    },
    {
        sequelize,
        tableName: 'LearningPackage',
        modelName: 'LearningPackage',
        timestamps: false,
    }
);

export default LearningPackage;