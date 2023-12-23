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
const LearningFact_1 = __importDefault(require("../models/LearningFact"));
const express_1 = __importDefault(require("express"));
const learningFactRoutes = express_1.default.Router();
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
learningFactRoutes.put('/learning-facts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const learningFactId = req.params.id;
    try {
        const updatedLearningFact = yield LearningFact_1.default.update(req.body, {
            where: { learningFactId },
        });
        res.status(200).send('LearningFact updated successfully');
    }
    catch (error) {
        console.error('Error updating LearningFact:', error);
        res.status(500).send('Error updating LearningFact');
    }
}));
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
