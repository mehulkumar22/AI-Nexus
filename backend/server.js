import 'dotenv/config';
import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRoutes.js';
import connectDB from './configs/mongodb.js';
import imageRouter from './routes/imageRoutes.js';
import nudeDetectorRoutes from './routes/nudeDetector.js';
import path from 'path';
import { fileURLToPath } from 'url';

import session from 'express-session';
import passport from 'passport';
import './configs/passport.js';

// App Config
const PORT = process.env.PORT || 4000
const app = express();
await connectDB()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ CORS config
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Intialize Middlewares
app.use(express.json())
app.use(cors())

// API routes
app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)
app.use('/api', nudeDetectorRoutes); 

app.use(session({
  secret: process.env.JWT_SECRET || 'your_default_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, // set true if using https
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req,res) => res.send("API Working"))

app.listen(PORT, () => console.log('Server running on port ' + PORT));
