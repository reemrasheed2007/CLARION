import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import analyzeRoute from './routes/analyze.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env
dotenv.config({ path: join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ FIX: allow frontend (and avoid CORS issues in prototype)
app.use(cors()); 

app.use(express.json());

// ✅ Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Clarion API is running' });
});

// ✅ Routes
app.use('/api', analyzeRoute);

// ✅ Start server (important for Render)
app.listen(PORT, () => {
  console.log(`🚀 Clarion API running on port ${PORT}`);
});