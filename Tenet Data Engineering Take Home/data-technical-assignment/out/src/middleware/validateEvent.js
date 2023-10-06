"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateEvent(req, res, next) {
    const { body } = req;
    // Simple validation logic, you can expand this as needed
    if (!body.eventType || !body.userId || !body.activity) {
        return res.status(400).json({ error: "Invalid event structure" });
    }
    next();
}
exports.default = validateEvent;
