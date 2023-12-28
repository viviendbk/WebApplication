"use strict";
// LearningFactRoutes.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @swagger
 * tags:
 *   name: Learning Facts
 *   description: Operations related to Learning Facts
 */
const express_1 = __importDefault(require("express"));
const LearningFact_1 = __importDefault(require("../models/LearningFact"));
const learningFactRoutes = express_1.default.Router();
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
learningFactRoutes.post('/learning-facts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newLearningFact = yield LearningFact_1.default.create(req.body);
        res.status(201).json(newLearningFact);
    }
    catch (error) {
        console.error('Error creating LearningFact:', error);
        res.status(500).send('Error creating LearningFact');
    }
}));
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
learningFactRoutes.get('/learning-facts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const learningFacts = yield LearningFact_1.default.findAll();
        res.status(200).json(learningFacts);
    }
    catch (error) {
        console.error('Error retrieving LearningFacts:', error);
        res.status(500).send('Error retrieving LearningFacts');
    }
}));
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
learningFactRoutes.get('/learning-facts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const learningFactId = req.params.id;
    try {
        const learningFact = yield LearningFact_1.default.findByPk(learningFactId);
        if (learningFact) {
            res.status(200).json(learningFact);
        }
        else {
            res.status(404).send('LearningFact not found');
        }
    }
    catch (error) {
        console.error('Error retrieving LearningFact:', error);
        res.status(500).send('Error retrieving LearningFact');
    }
}));
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
learningFactRoutes.put('/learning-facts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const learningFactId = req.params.id;
    try {
        const updatedLearningFact = yield LearningFact_1.default.update(req.body, {
            where: { learningFactId },
        });
        res.status(200).json(updatedLearningFact);
    }
    catch (error) {
        console.error('Error updating LearningFact:', error);
        res.status(500).send('Error updating LearningFact');
    }
}));
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
learningFactRoutes.delete('/learning-facts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const learningFactId = req.params.id;
    try {
        const deletedRows = yield LearningFact_1.default.destroy({
            where: { learningFactId },
        });
        if (deletedRows > 0) {
            res.status(200).send('LearningFact deleted successfully');
        }
        else {
            res.status(404).send('LearningFact not found');
        }
    }
    catch (error) {
        console.error('Error deleting LearningFact:', error);
        res.status(500).send('Error deleting LearningFact');
    }
}));
exports.default = learningFactRoutes;
