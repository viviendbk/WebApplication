/**
 * @swagger
 * tags:
 *   name: Learning Packages
 *   description: Operations related to Learning Packages
 */

import express, { Request, Response } from 'express';
import LearningPackage from '../models/LearningPackage';
import LearningFact from '../models/LearningFact';

const learningPackageRoutes = express.Router();

/**
 * @swagger
 * /learning-packages:
 *   post:
 *     summary: Create a new Learning Package
 *     description: Create a new Learning Package with the provided data.
 *     tags: [Learning Packages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LearningPackage'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LearningPackage'
 *       500:
 *         description: Internal Server Error
 */
learningPackageRoutes.post('/learning-packages', async (req, res) => {
    try {
        const newLearningPackage = await LearningPackage.create(req.body);
        res.status(201).json(newLearningPackage);
    } catch (error) {
        console.error('Error creating LearningPackage:', error);
        res.status(500).send('Error creating LearningPackage');
    }
});

/**
 * @swagger
 * /learning-packages/{id}/learning-facts:
 *   post:
 *     summary: Create new Learning Facts for a Learning Package
 *     description: Create new Learning Facts associated with a Learning Package by its ID.
 *     tags: [Learning Packages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Learning Package
 *         schema:
 *           type: integer
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
learningPackageRoutes.post('/learning-packages/:id/learning-facts', async (req, res) => {
    const learningPackageId = req.params.id;

    try {
        const learningFacts = await LearningFact.create(req.body);

        res.json(learningFacts);
    } catch (error) {
        console.error('Error fetching learning facts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /learning-packages:
 *   get:
 *     summary: Get all Learning Packages
 *     description: Retrieve a list of all Learning Packages.
 *     tags: [Learning Packages]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LearningPackage'
 *       500:
 *         description: Internal Server Error
 */
learningPackageRoutes.get('/learning-packages', async (req, res) => {
    try {
        const learningPackages = await LearningPackage.findAll();
        res.status(200).json(learningPackages);
    } catch (error) {
        console.error('Error retrieving LearningPackages:', error);
        res.status(500).send('Error retrieving LearningPackages');
    }
});

/**
 * @swagger
 * /learning-packages/{id}:
 *   get:
 *     summary: Get a Learning Package by ID
 *     description: Retrieve a Learning Package by its ID.
 *     tags: [Learning Packages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Learning Package
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LearningPackage'
 *       404:
 *         description: LearningPackage not found
 *       500:
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /learning-packages/{id}/learning-facts:
 *   get:
 *     summary: Get Learning Facts by Learning Package ID
 *     description: Retrieve a list of Learning Facts associated with a Learning Package by its ID.
 *     tags: [Learning Packages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Learning Package
 *         schema:
 *           type: integer
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

/**
 * @swagger
 * /learning-packages/{id}:
 *   put:
 *     summary: Update a Learning Package by ID
 *     description: Update a Learning Package with the provided data by its ID.
 *     tags: [Learning Packages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Learning Package
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LearningPackage'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LearningPackage'
 *       404:
 *         description: LearningPackage not found
 *       500:
 *         description: Internal Server Error
 */
learningPackageRoutes.put('/learning-packages/:id', async (req, res) => {
    const learningPackageId = req.params.id;
    try {
        const updatedLearningPackage = await LearningPackage.update(req.body, {
            where: { learningPackageId },
        });
        res.status(200).json(updatedLearningPackage);
    } catch (error) {
        console.error('Error updating LearningPackage:', error);
        res.status(500).send('Error updating LearningPackage');
    }
});

/**
 * @swagger
 * /learning-packages/{id}:
 *   delete:
 *     summary: Delete a Learning Package by ID
 *     description: Delete a Learning Package by its ID.
 *     tags: [Learning Packages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Learning Package
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: LearningPackage and associated LearningFacts deleted successfully
 *       404:
 *         description: LearningPackage not found
 *       500:
 *         description: Internal Server Error
 */
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

export default learningPackageRoutes;
