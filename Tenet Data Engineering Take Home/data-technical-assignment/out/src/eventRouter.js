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
const eventService_1 = __importDefault(require("./eventService"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const validateEvent_1 = __importDefault(require("./middleware/validateEvent"));
// Router configuration
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
app.use(validateEvent_1.default);
// Initialize the Event Service
const eventService = new eventService_1.default();
// Router definition (MODIFY ME)
app.post("/", validateEvent_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        if (!body || Object.keys(body).length === 0) {
            return res.status(400).json({ error: "Empty request body." });
        }
        const result = yield eventService.processEvent(body); // Assuming you've added this method to your EventService.
        res.status(200).json({ data: { result: result } });
    }
    catch (error) {
        console.error(`Error processing event: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
// Use the global error handler
app.use(errorHandler_1.default);
// Router initialization
const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
exports.default = app;
