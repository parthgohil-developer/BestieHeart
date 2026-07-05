const express = require('express');
const router = express.Router();
const { sendProsConsEmail, sendDeepQAEmail, sendPersonalReplyEmail, sendMeetingEmail } = require('../services/emailService');

// POST /api/form/pros-cons
router.post('/pros-cons', async (req, res) => {
    try {
        await sendProsConsEmail(req.body);
        res.status(200).json({ success: true, message: 'Pros & Cons sent securely via Gmail!' });
    } catch (error) {
        console.error('Failed to send Pros & Cons email:', error);
        res.status(500).json({ success: false, error: 'Failed to process inquiry.' });
    }
});

// POST /api/form/deep-qa
router.post('/deep-qa', async (req, res) => {
    try {
        // req.body should contain { answers: { "0-0": "answer", ... } }
        await sendDeepQAEmail(req.body);
        res.status(200).json({ success: true, message: 'Deep Q&A sent securely via Gmail!' });
    } catch (error) {
        console.error('Failed to send Deep Q&A email:', error);
        res.status(500).json({ success: false, error: 'Failed to process Deep Q&A.' });
    }
});

// POST /api/form/personal-reply
router.post('/personal-reply', async (req, res) => {
    try {
        await sendPersonalReplyEmail(req.body);
        res.status(200).json({ success: true, message: 'Personal Message sent securely via Gmail!' });
    } catch (error) {
        console.error('Failed to send Personal Reply email:', error);
        res.status(500).json({ success: false, error: 'Failed to process personal reply.' });
    }
});

// POST /api/form/meeting
router.post('/meeting', async (req, res) => {
    try {
        await sendMeetingEmail(req.body);
        res.status(200).json({ success: true, message: 'Meeting Request sent securely via Gmail!' });
    } catch (error) {
        console.error('Failed to send Meeting email:', error);
        res.status(500).json({ success: false, error: 'Failed to process meeting request.' });
    }
});

module.exports = router;
