"use strict";
/**
 * @swagger
 * tags:
 *   name: Learning Packages
 *   description: Operations related to Learning Packages
 */
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
const express_1 = __importDefault(require("express"));
const LearningPackage_1 = __importDefault(require("../models/LearningPackage"));
const LearningFact_1 = __importDefault(require("../models/LearningFact"));
const learningPackageRoutes = express_1.default.Router();
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
learningPackageRoutes.post('/learning-packages', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newLearningPackage = yield LearningPackage_1.default.create(req.body);
        res.status(201).json(newLearningPackage);
    }
    catch (error) {
        console.error('Error creating LearningPackage:', error);
        res.status(500).send('Error creating LearningPackage');
    }
}));
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
learningPackageRoutes.post('/learning-packages/:id/learning-facts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const learningPackageId = req.params.id;
    try {
        const learningFacts = yield LearningFact_1.default.create(req.body);
        res.json(learningFacts);
    }
    catch (error) {
        console.error('Error fetching learning facts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
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
learningPackageRoutes.get('/learning-packages', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const learningPackages = yield LearningPackage_1.default.findAll();
        res.status(200).json(learningPackages);
    }
    catch (error) {
        console.error('Error retrieving LearningPackages:', error);
        res.status(500).send('Error retrieving LearningPackages');
    }
}));
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
learningPackageRoutes.get('/learning-packages/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const learningPackageId = req.params.id;
    try {
        const learningPackage = yield LearningPackage_1.default.findByPk(learningPackageId, {
            include: LearningFact_1.default,
        });
        if (learningPackage) {
            res.status(200).json(learningPackage);
        }
        else {
            res.status(404).send('LearningPackage not found');
        }
    }
    catch (error) {
        console.error('Error retrieving LearningPackage:', error);
        res.status(500).send('Error retrieving LearningPackage');
    }
}));
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
learningPackageRoutes.get('/learning-packages/:id/learning-facts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const learningPackageId = req.params.id;
    try {
        const learningFacts = yield LearningFact_1.default.findAll({
            where: { learningPackageId },
            include: [{ model: LearningPackage_1.default, as: 'LearningPackage' }],
        });
        res.json(learningFacts);
    }
    catch (error) {
        console.error('Error fetching learning facts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
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
learningPackageRoutes.put('/learning-packages/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const learningPackageId = req.params.id;
    try {
        const updatedLearningPackage = yield LearningPackage_1.default.update(req.body, {
            where: { learningPackageId },
        });
        res.status(200).json(updatedLearningPackage);
    }
    catch (error) {
        console.error('Error updating LearningPackage:', error);
        res.status(500).send('Error updating LearningPackage');
    }
}));
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
learningPackageRoutes.delete('/learning-packages/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const learningPackageId = req.params.id;
    try {
        const deletedRows = yield LearningPackage_1.default.destroy({
            where: { learningPackageId },
        });
        if (deletedRows > 0) {
            res.status(200).send('LearningPackage and associated LearningFacts deleted successfully');
        }
        else {
            res.status(404).send('LearningPackage not found');
        }
    }
    catch (error) {
        console.error('Error deleting LearningPackage:', error);
        res.status(500).send('Error deleting LearningPackage');
    }
}));
exports.default = learningPackageRoutes;
