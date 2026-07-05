const nodemailer = require('nodemailer');

const qnaSections = [
  { title: "Fun Questions", questions: [ "If you had to describe me using only 3 emojis, which ones would you choose?", "What's the funniest memory you have with me?", "What's the weirdest thing I do that you've never told me?", "If I were a movie character, who would I be?", "If you had to roast me on my birthday, what would you say?", "What's one habit of mine that annoys you the most?", "If you could change one thing about me, what would it be?" ] },
  { title: "Emotional Questions", questions: [ "What was your first impression of me, and how has it changed?", "What's one moment with me you'll never forget?", "What's something you've always wanted to tell me but never did?", "Have I ever helped you in a way I probably don't even know?", "What's one quality of mine you genuinely admire?", "If one day we stopped talking, what would you miss the most?", "What's one thing you hope never changes between us?" ] },
  { title: "Drama Questions", questions: [ "Have you ever been angry with me but acted like everything was okay?", "Have you ever cried because of something I did or said?", "Have you ever been jealous because of me?", "What's the biggest misunderstanding we've ever had?", "Have you ever hidden something from me to protect me?", "If someone asked you to stop talking to me, what would you do?" ] },
  { title: "Deep Questions", questions: [ "What's your favorite thing about our friendship?", "If we had met earlier in life, do you think we'd still be this close?", "Have you ever felt I was ignoring you?", "If I moved to another country tomorrow, what would you do?", "What's one thing you wish I understood about you?" ] },
  { title: "If I Were...", questions: [ "If I were a flower, which one would I be?", "If I were a movie, what genre or which movie would I be?", "If I were an animal, which one would I be?", "If I were an actor, who would I be?", "If I were a place, where would I be?", "If I were a food, what dish would I be?", "If I were a song, which track would I be?", "If I were a cartoon character, who would I be?" ] },
  { title: "Birthday Specials", questions: [ "Be honest—did you remember my birthday on your own or did Instagram remind you?", "What's the best birthday gift you could give me that isn't money?", "Rate me as a best friend from 1 to 10, and explain the missing points.", "What's one birthday wish you'd make for me?", "If you had to write one sentence about me that I'd remember forever, what would it be?" ] },
  { title: "Heart-Touching Finale", questions: [ "If years pass and life gets busy, do you think we'll still be friends?", "What's one promise you want us to keep as friends?", "What role do you think I play in your life?", "If you could relive one memory with me, which one would it be?", "On my birthday, what's the one thing you genuinely want me to know?" ] }
];

const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

const sendProsConsEmail = async (data) => {
    const transporter = createTransporter();
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.TARGET_EMAIL || process.env.EMAIL_USER,
        subject: '📝 New Pros & Cons Submission',
        html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #ff6b81;">Pros & Cons Dashboard Alert</h2>
                <hr style="border: 1px solid #ffb6c1; margin: 20px 0;" />
                <h3 style="color: #2e86de;">Pros:</h3>
                <p style="background: #f1f2f6; padding: 15px; border-left: 4px solid #2e86de; border-radius: 4px;">
                    ${data.pros || 'No pros listed.'}
                </p>
                <h3 style="color: #ee5253;">Cons:</h3>
                <p style="background: #f1f2f6; padding: 15px; border-left: 4px solid #ee5253; border-radius: 4px;">
                    ${data.cons || 'No cons listed.'}
                </p>
            </div>
        `
    };
    return transporter.sendMail(mailOptions);
};

const sendDeepQAEmail = async (data) => {
    const transporter = createTransporter();
    
    // Dynamically unfold the massive answers payload JSON into a readable HTML stack
    let answersHtml = '';
    if (data.answers && typeof data.answers === 'object') {
        for (const [key, value] of Object.entries(data.answers)) {
            let questionText = `Question ID: ${key}`;
            
            // Try decrypting the key coordinate (e.g. "0-2")
            if (key.includes('-')) {
                const parts = key.split('-');
                if (parts.length === 2) {
                    const secIdx = parseInt(parts[0]);
                    const qIdx = parseInt(parts[1]);
                    if (qnaSections[secIdx] && qnaSections[secIdx].questions[qIdx]) {
                        questionText = qnaSections[secIdx].questions[qIdx];
                    }
                }
            }

            answersHtml += `
                <div style="margin-bottom: 12px; background: #fdfdfd; padding: 12px; border: 1px solid #ffe6e6; border-radius: 8px;">
                    <strong style="color: #4a4a4a; display: block; font-size: 14px; margin-bottom: 6px;">Q: ${questionText}</strong>
                    <p style="margin: 0; font-size: 15px; color: #d63031; font-weight: 500;">A: ${value}</p>
                </div>
            `;
        }
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.TARGET_EMAIL || process.env.EMAIL_USER,
        subject: '🧠 New Deep Q&A Submission',
        html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #ff6b81;">Deep Q&A Detailed Response</h2>
                <hr style="border: 1px solid #ffb6c1; margin: 20px 0;" />
                ${answersHtml || '<p>No answers recorded.</p>'}
            </div>
        `
    };
    return transporter.sendMail(mailOptions);
};

const sendPersonalReplyEmail = async (data) => {
    const transporter = createTransporter();
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.TARGET_EMAIL || process.env.EMAIL_USER,
        subject: '💌 New Interactive Personal Message',
        html: `
            <div style="font-family: serif; padding: 40px 20px; background-color: #fff0f5; text-align: center; border-radius: 12px;">
                <h2 style="color: #e84393; font-size: 24px;">Message for "Cartoon"</h2>
                <div style="max-width: 600px; margin: 30px auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                    <p style="font-size: 18px; line-height: 1.6; color: #2d3436; text-align: left;">
                        ${data.message || data.personalReply || data.text || 'Empty message.'}
                    </p>
                </div>
            </div>
        `
    };
    return transporter.sendMail(mailOptions);
};

const sendMeetingEmail = async (data) => {
    const transporter = createTransporter();
    
    let infoHtml = '';
    if (data.wantToMeet === 'Yes') {
        infoHtml = `
            <p style="background: #e3f2fd; padding: 15px; border-left: 4px solid #3498db; border-radius: 4px;">
                <strong>They absolutely want to meet! 🎉</strong><br/><br/>
                🗓️ <strong>Date:</strong> ${data.meetingDate || 'Not specified'}<br/><br/>
                ⏰ <strong>Time:</strong> ${data.meetingTime || 'Not specified'}<br/><br/>
                📝 <strong>Purpose:</strong> ${data.purpose || 'Not specified'}
            </p>
        `;
    } else {
        infoHtml = `
            <p style="background: #fff3f3; padding: 15px; border-left: 4px solid #e74c3c; border-radius: 4px;">
                <strong>They politely declined a meeting.</strong> No worries!
            </p>
        `;
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.TARGET_EMAIL || process.env.EMAIL_USER,
        subject: '🗓️ New Appointment Request',
        html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #ff6b81;">Meeting Scheduler Alert</h2>
                <hr style="border: 1px solid #ffb6c1; margin: 20px 0;" />
                ${infoHtml}
            </div>
        `
    };
    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendProsConsEmail,
    sendDeepQAEmail,
    sendPersonalReplyEmail,
    sendMeetingEmail
};
