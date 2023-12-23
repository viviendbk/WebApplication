import LearningFact from '../models/LearningFact';
import express, { Request, Response } from 'express';

const learningFactRoutes = express.Router();

learningFactRoutes.post('/learning-facts', async (req, res) => {
    try {
        const newLearningFact = await LearningFact.create(req.body);
        res.status(201).json(newLearningFact);
    } catch (error) {
        console.error('Error creating LearningFact:', error);
        res.status(500).send('Error creating LearningFact');
    }
});

learningFactRoutes.get('/learning-facts', async (req, res) => {
    try {
        const learningFacts = await LearningFact.findAll();
        res.status(200).json(learningFacts);
    } catch (error) {
        console.error('Error retrieving LearningFacts:', error);
        res.status(500).send('Error retrieving LearningFacts');
    }
});

learningFactRoutes.get('/learning-facts/:id', async (req, res) => {
    const learningFactId = req.params.id;
    try {
        const learningFact = await LearningFact.findByPk(learningFactId);
        if (learningFact) {
            res.status(200).json(learningFact);
        } else {
            res.status(404).send('LearningFact not found');
        }
    } catch (error) {
        console.error('Error retrieving LearningFact:', error);
        res.status(500).send('Error retrieving LearningFact');
    }
});

learningFactRoutes.put('/learning-facts/:id', async (req, res) => {
    const learningFactId = req.params.id;
    try {
        const updatedLearningFact = await LearningFact.update(req.body, {
            where: { learningFactId },
        });
        res.status(200).send('LearningFact updated successfully');
    } catch (error) {
        console.error('Error updating LearningFact:', error);
        res.status(500).send('Error updating LearningFact');
    }
});

learningFactRoutes.delete('/learning-facts/:id', async (req, res) => {
    const learningFactId = req.params.id;
    try {
        const deletedRows = await LearningFact.destroy({
            where: { learningFactId },
        });

        if (deletedRows > 0) {
            res.status(200).send('LearningFact deleted successfully');
        } else {
            res.status(404).send('LearningFact not found');
        }
    } catch (error) {
        console.error('Error deleting LearningFact:', error);
        res.status(500).send('Error deleting LearningFact');
    }
});


export default learningFactRoutes;