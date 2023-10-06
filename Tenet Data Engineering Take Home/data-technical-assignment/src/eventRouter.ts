import express from "express";
import { nextTick } from "process";
import EventService from "./eventService";
import errorHandler from './middleware/errorHandler';
import rateLimit from "express-rate-limit";
import validateEvent from './middleware/validateEvent';



// Router configuration
const app = express();
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.use(validateEvent);


// Initialize the Event Service
const eventService = new EventService();

// Router definition (MODIFY ME)
app.post("/", validateEvent, async (req, res) => {
    try {
        const { body } = req;

        if (!body || Object.keys(body).length === 0) {
            return res.status(400).json({ error: "Empty request body." });
        }

        const result = await eventService.processEvent(body); // Assuming you've added this method to your EventService.
        
        res.status(200).json({ data: { result: result } });

    } catch (error: any) {
        console.error(`Error processing event: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



// Use the global error handler
app.use(errorHandler);

// Router initialization
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app; 
