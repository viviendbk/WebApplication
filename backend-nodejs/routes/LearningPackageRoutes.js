"use strict";
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
const LearningPackage_1 = __importDefault(require("../models/LearningPackage"));
const LearningFact_1 = __importDefault(require("../models/LearningFact"));
const express_1 = __importDefault(require("express"));
const learningPackageRoutes = express_1.default.Router();
// Create a LearningPackage
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
// Read all LearningPackages
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
// Read a specific LearningPackage by ID
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
// Route to get learning facts by learning package ID
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
// Update a LearningPackage by ID
learningPackageRoutes.put('/learning-packages/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const learningPackageId = req.params.id;
    try {
        const updatedLearningPackage = yield LearningPackage_1.default.update(req.body, {
            where: { learningPackageId },
        });
        res.status(200).send('LearningPackage updated successfully');
    }
    catch (error) {
        console.error('Error updating LearningPackage:', error);
        res.status(500).send('Error updating LearningPackage');
    }
}));
// Delete a LearningPackage by ID
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
