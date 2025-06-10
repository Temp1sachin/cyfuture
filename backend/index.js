const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { fetch } = require('undici');
const pdfParse = require('pdf-parse');

const app = express();
const upload = multer();
app.use(cors());

const PORT = 8000;
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
const OLLAMA_MODEL = 'mistral';


const cache = {};

const prompts = {
  summary: "You are a great legal advisor. Summarize this legal document clearly.",
  risks: "You are a great legal advisor. Identify and explain the key legal risks or liabilities in this document.",
  terms: "You are a great legal advisor. Extract key legal terms and provide their meanings from this document.",
};

app.get('/', (req, res) => {
  res.json({ status: "ok" });
});



app.post('/pdf', upload.single('pdf'), async (req, res) => {
  const { promptType } = req.body;
  const file = req.file;
  const filename = file?.originalname;

  if (!file || !promptType || !prompts[promptType]) {
    return res.status(400).json({ error: 'Missing file or valid prompt type' });
  }

  if (cache[filename]?.[promptType]) {
    console.log(`Cache hit for ${filename} [${promptType}]`);
    return res.json({
      success: true,
      fromCache: true,
      analysis: cache[filename][promptType],
    });
  }

  try {
    const pdfData = await pdfParse(file.buffer);
    const text = pdfData.text.slice(0, 3000); // Limit size for performance

    const ollamaRes = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: `${prompts[promptType]}\n\n${text}`,
        stream: false,
      }),
    });

    const result = await ollamaRes.json();

    if (!result.response) {
      throw new Error('No response from Ollama');
    }

    if (!cache[filename]) cache[filename] = {};
    cache[filename][promptType] = result.response;

    res.json({
      success: true,
      fromCache: false,
      analysis: result.response,
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to analyze PDF', details: error.message });
  }
});


app.listen(PORT, () => {
  console.log(` Server running `);
});
