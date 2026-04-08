require('dotenv').config();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function test() {
    try {
        const completion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: 'Say OK' }],
            model: 'llama-3.3-70b-versatile',
            max_tokens: 5
        });
        console.log('✅ API KEY IS WORKING!');
    } catch (error) {
        console.log('❌ ERROR:', error.message);
    }
}

test();
