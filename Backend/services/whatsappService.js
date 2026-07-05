const axios = require('axios');

/**
 * Send a WhatsApp message using Meta Cloud API
 * @param {Object} formData - The data submitted from the frontend form
 * @returns {Promise<Object>} - The response from Meta API
 */
const sendWhatsAppNotification = async (formData) => {
    const { name, email, message } = formData;
    
    const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
    const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
    const TARGET_NUMBER = process.env.TARGET_WHATSAPP_NUMBER; // The number where you want to receive the message

    if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID || !TARGET_NUMBER) {
        throw new Error('WhatsApp API credentials are not fully configured in environment variables.');
    }

    // Format the message to be sent to your WhatsApp
    const messageBody = `*New Website Inquiry!*\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`;

    try {
        const response = await axios.post(
            `https://graph.facebook.com/v23.0/${PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: 'whatsapp',
                to: TARGET_NUMBER,
                type: 'text',
                text: {
                    body: messageBody
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${WHATSAPP_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error sending WhatsApp message:', error.response ? error.response.data : error.message);
        throw error;
    }
};

module.exports = { sendWhatsAppNotification };
