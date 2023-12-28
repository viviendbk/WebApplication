// LearningFactRoutes.ts

/**
 * @swagger
 * tags:
 *   name: Learning Facts
 *   description: Operations related to Learning Facts
 */

import express, { Request, Response } from 'express';
import LearningFact from '../models/LearningFact';

const learningFactRoutes = express.Router();

/**
 * @swagger
 * /learning-facts:
 *   post:
 *     summary: Create a new Learning Fact
 *     description: Create a new Learning Fact with the provided data.
 *     tags: [Learning Facts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LearningFact'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LearningFact'
 *       500:
 *         description: Internal Server Error
 */
learningFactRoutes.post('/learning-facts', async (req, res) => {
    try {
        const newLearningFact = await LearningFact.create(req.body);
        res.status(201).json(newLearningFact);
    } catch (error) {
        console.error('Error creating LearningFact:', error);
        res.status(500).send('Error creating LearningFact');
    }
});

/**
 * @swagger
 * /learning-facts:
 *   get:
 *     summary: Get all Learning Facts
 *     description: Retrieve a list of all Learning Facts.
 *     tags: [Learning Facts]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LearningFact'
 *       500:
 *         description: Internal Server Error
 */
learningFactRoutes.get('/learning-facts', async (req, res) => {
    try {
        const learningFacts = await LearningFact.findAll();
        res.status(200).json(learningFacts);
    } catch (error) {
        console.error('Error retrieving LearningFacts:', error);
        res.status(500).send('Error retrieving LearningFacts');
    }
});

/**
 * @swagger
 * /learning-facts/{id}:
 *   get:
 *     summary: Get a Learning Fact by ID
 *     description: Retrieve a Learning Fact by its ID.
 *     tags: [Learning Facts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Learning Fact
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LearningFact'
 *       404:
 *         description: LearningFact not found
 *       500:
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /learning-facts/{id}:
 *   put:
 *     summary: Update a Learning Fact by ID
 *     description: Update a Learning Fact with the provided data by its ID.
 *     tags: [Learning Facts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Learning Fact
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LearningFact'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LearningFact'
 *       404:
 *         description: LearningFact not found
 *       500:
 *         description: Internal Server Error
 */
learningFactRoutes.put('/learning-facts/:id', async (req, res) => {
    const learningFactId = req.params.id;
    try {
        const updatedLearningFact = await LearningFact.update(req.body, {
            where: { learningFactId },
        });
        res.status(200).json(updatedLearningFact);
    } catch (error) {
        console.error('Error updating LearningFact:', error);
        res.status(500).send('Error updating LearningFact');
    }
});

/**
 * @swagger
 * /learning-facts/{id}:
 *   delete:
 *     summary: Delete a Learning Fact by ID
 *     description: Delete a Learning Fact by its ID.
 *     tags: [Learning Facts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Learning Fact
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: LearningFact deleted successfully
 *       404:
 *         description: LearningFact not found
 *       500:
 *         description: Internal Server Error
 */
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
