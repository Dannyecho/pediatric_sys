const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
// const { text } = require('body-parser');

const apiKey = 'AIzaSyAbsY5Tj_x-RCa3oFRp6B78e8vM_sUyxPM'; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const app = express();
const port = 3000;

app.use(express.json()); // Parse incoming JSON requests
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.post('/diagnose', async (req, res) => {
    let prompt = req.body.promptText;

    if (prompt) {
        prompt += "\nPlease generate your response as a pediatric consultant. Thanks";

        try {
            const result = await model.generateContent(prompt);
            const text = result.response.text();
            // console.log(text)
            res.json({
                type: 'bot',
                text: text
            });
        } catch (error) {
            console.error('Error:', error);
            // Handle errors appropriately (e.g., display an error message to the user)
        }
    }
    console.log('Received data body:', req.body);
    console.log('Received data:', prompt);

    // Process the data (e.g., save to database)

    // res.json({ message: 'Data received successfully!' });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});