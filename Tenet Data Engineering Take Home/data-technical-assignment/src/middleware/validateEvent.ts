import { Request, Response, NextFunction } from 'express';

export default function validateEvent(req: Request, res: Response, next: NextFunction) {
    const { body } = req;

    // validation logic
    if (!body.eventType || !body.userId || !body.activity) {
        return res.status(400).json({ error: "Invalid event structure" });
    }

    next();
}
