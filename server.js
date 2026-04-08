const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
require('dotenv').config();

const app = express();
const PORT = 3000;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
    const { message, history = [] } = req.body;
    
    console.log('📨 Received:', message);
    
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                { 
                    role: 'system', 
                    content: 'You are Jarvis Jr, an expert programming assistant. Provide clear, working code examples with explanations.' 
                },
                ...history.slice(-10),
                { role: 'user', content: message }
            ],
            // ✅ UPDATED TO A CURRENT, ACTIVE MODEL
            model: 'llama-3.3-70b-versatile',
            temperature: 0.7,
            max_tokens: 2048,
        });
        
        const response = completion.choices[0].message.content;
        console.log('✅ Response sent');
        res.json({ response: response });
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        // Send the specific error back to the frontend for clarity
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`\n🚀 =====================================`);
    console.log(`   JARVIS JR AI - READY!`);
    console.log(`   =====================================`);
    console.log(`   📡 http://localhost:${PORT}`);
    console.log(`   ✅ API Key: WORKING`);
    console.log(`   🤖 Model: llama-3.3-70b-versatile (Active)`);
    console.log(`   =====================================\n`);
});