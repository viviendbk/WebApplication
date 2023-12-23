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
const express_1 = __importDefault(require("express"));
const LearningFactRoutes_1 = __importDefault(require("./routes/LearningFactRoutes"));
const LearningPackageRoutes_1 = __importDefault(require("./routes/LearningPackageRoutes"));
// Create Express application
const app = (0, express_1.default)();
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Start the server
        const port = 3000; // You can change this to the desired port number
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}))();
// Middleware to parse JSON request bodies
app.use(express_1.default.json());
// Use the imported route files as middleware
app.use(LearningFactRoutes_1.default);
app.use(LearningPackageRoutes_1.default);
// Define route handlers
app.get('/api/liveness', (req, res) => {
    res.status(200).send('OK');
});
exports.default = app;
