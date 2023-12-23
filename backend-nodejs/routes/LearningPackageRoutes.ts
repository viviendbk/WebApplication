import LearningPackage from '../models/LearningPackage';
import LearningFact from "../models/LearningFact";
import express, { Request, Response } from 'express';

const learningPackageRoutes = express.Router();


// Create a LearningPackage
learningPackageRoutes.post('/learning-packages', async (req, res) => {
    try {
        const newLearningPackage = await LearningPackage.create(req.body);
        res.status(201).json(newLearningPackage);
    } catch (error) {
        console.error('Error creating LearningPackage:', error);
        res.status(500).send('Error creating LearningPackage');
    }
});

// Read all LearningPackages
learningPackageRoutes.get('/learning-packages', async (req, res) => {
    try {
        const learningPackages = await LearningPackage.findAll();
        res.status(200).json(learningPackages);
    } catch (error) {
        console.error('Error retrieving LearningPackages:', error);
        res.status(500).send('Error retrieving LearningPackages');
    }
});

// Read a specific LearningPackage by ID
learningPackageRoutes.get('/learning-packages/:id', async (req, res) => {
    const learningPackageId = req.params.id;
    try {
        const learningPackage = await LearningPackage.findByPk(learningPackageId, {
            include: LearningFact,
        });
        if (learningPackage) {
            res.status(200).json(learningPackage);
        } else {
            res.status(404).send('LearningPackage not found');
        }
    } catch (error) {
        console.error('Error retrieving LearningPackage:', error);
        res.status(500).send('Error retrieving LearningPackage');
    }
});

// Route to get learning facts by learning package ID
learningPackageRoutes.get('/learning-packages/:id/learning-facts', async (req, res) => {
    const learningPackageId = req.params.id;

    try {
        const learningFacts = await LearningFact.findAll({
            where: { learningPackageId },
            include: [{ model: LearningPackage, as: 'LearningPackage' }],
        });

        res.json(learningFacts);
    } catch (error) {
        console.error('Error fetching learning facts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Update a LearningPackage by ID
learningPackageRoutes.put('/learning-packages/:id', async (req, res) => {
    const learningPackageId = req.params.id;
    try {
        const updatedLearningPackage = await LearningPackage.update(req.body, {
            where: { learningPackageId },
        });
        res.status(200).send('LearningPackage updated successfully');
    } catch (error) {
        console.error('Error updating LearningPackage:', error);
        res.status(500).send('Error updating LearningPackage');
    }
});

// Delete a LearningPackage by ID
learningPackageRoutes.delete('/learning-packages/:id', async (req, res) => {
    const learningPackageId = req.params.id;
    try {
        const deletedRows = await LearningPackage.destroy({
            where: { learningPackageId },
        });

        if (deletedRows > 0) {
            res.status(200).send('LearningPackage and associated LearningFacts deleted successfully');
        } else {
            res.status(404).send('LearningPackage not found');
        }
    } catch (error) {
        console.error('Error deleting LearningPackage:', error);
        res.status(500).send('Error deleting LearningPackage');
    }
});

export default learningPackageRoutes
