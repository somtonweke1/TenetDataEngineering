import express from 'express';
import ErrorHandler from './middlewares/errorHandler';
import limiter from './middlewares/rateLimiter';
import logger from './middlewares/logger';
import { getAnalyticsForPartner, getAnalyticsForOfferStatus } from './services/analyticsService';

const app = express();

// Middlewares
app.use(express.json());
app.use(logger);
app.use(limiter);

// Routes
app.get('/analytics/partner/:partner', async (req, res) => {
    try {
        const partner = req.params.partner;
        const analytics = await getAnalyticsForPartner(partner);
        res.json(analytics);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch analytics for partner' });
    }
});

app.get('/analytics/offerstatus/:status', async (req, res) => {
    try {
        const status = req.params.status;
        const analytics = await getAnalyticsForOfferStatus(status);
        res.json(analytics);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch analytics for offer status' });
    }
});

// Error handler (should be the last middleware)
app.use(ErrorHandler.handleError);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
