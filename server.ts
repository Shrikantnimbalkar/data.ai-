import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
  });

  const SYSTEM_PROMPT = `You are Student.AI, a brilliant and empathetic AI tutor. 
    Your goal is to help students solve academic problems and understand complex concepts.
    Rules:
    1. Always explain the 'why' and 'how', don't just give the answer.
    2. Use Markdown for formatting (bolding, lists, code blocks).
    3. If a question is about Math/Science, break it down step-by-step.
    4. If a question is about Writing, provide structural feedback and examples.
    5. Stay encouraging and academic. Do not answer questions that are not related to studies or student life.`;

  // API Routes
  app.post('/api/chat', async (req, res) => {
    try {
      const { query, history } = req.body;
      const chat = model.startChat({
        history: history.map((m: any) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }],
        })),
        generationConfig: {
          maxOutputTokens: 2000,
        },
      });

      // Include system prompt context in the first query if no history
      const finalQuery = history.length === 0 ? `${SYSTEM_PROMPT}\n\nUser Question: ${query}` : query;
      
      const result = await chat.sendMessage(finalQuery);
      res.json({ text: result.response.text() });
    } catch (error) {
      console.error('Chat API Error:', error);
      res.status(500).json({ error: 'Failed to generate response' });
    }
  });

  app.post('/api/tool', async (req, res) => {
    try {
      const { tool, input } = req.body;
      const prompts: Record<string, string> = {
        summarize: "Summarize the following educational text into key bullet points and a concluding summary.",
        math: "Solve this mathematics problem step-by-step. Explain each rule used.",
        flashcards: "Generate a set of 5 Q&A flashcards based on the following text. Format as Markdown lists.",
        concept: "Explain this concept like I am a 10th-grade student. Use analogies."
      };
      
      const prompt = `${SYSTEM_PROMPT}\n\nTASK: ${prompts[tool] || "Explain this:"}\n\nINPUT: ${input}`;
      const result = await model.generateContent(prompt);
      res.json({ text: result.response.text() });
    } catch (error) {
      console.error('Tool API Error:', error);
      res.status(500).json({ error: 'Tool processing failed' });
    }
  });

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Student.AI' });
  });

  app.post('/api/support', (req, res) => {
    res.json({ message: 'Support request received. We will contact you soon!' });
  });

  // Vite Middleware or Static Files
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Student.AI Server running on http://localhost:${PORT}`);
  });
}

startServer();
