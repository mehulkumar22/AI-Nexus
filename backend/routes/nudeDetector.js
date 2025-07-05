import express from 'express';
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';
import { AbortController } from 'abort-controller';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

const analyzeSightengineResult = (result) => {
  const nudity = result.nudity || {};
  const nudityScores = [
    nudity.raw,
    nudity.partial,
    nudity.sexy,
    nudity.suggestive,
    nudity.sexual_activity,
    nudity.sexual_display
  ].filter(score => typeof score === 'number');

  const confidence = nudityScores.length > 0 ? Math.max(...nudityScores) : 0;
  const threshold = confidence > 0.7 ? 0.3 : 0.5;
  const isNudity = nudityScores.some(score => score > threshold);

  let category = 'Regular';
  if (isNudity) {
    const maxScore = Math.max(...nudityScores);
    if (nudity.raw === maxScore) category = 'Nude';
    else if (nudity.sexual_activity === maxScore) category = 'Sexual Activity';
    else if (nudity.suggestive === maxScore) category = 'Semi-Nude';
    else if (nudity.sexy === maxScore) category = 'Sexy';
    else category = 'Partial Nudity';
  }

  return {
    status: isNudity ? 'Nudity' : 'Not Nudity',
    percentage: Math.round(confidence * 100),
    category,
    apiUsed: 'Sightengine'
  };
};

router.post('/detect', upload.single('image'), async (req, res) => {
  try {
    const token = req.headers.token;
    const url = req.body.url;
    const file = req.file;

    // ✅ Check token
    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // ✅ Fetch user
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // ✅ Check credit balance
    if (user.creditBalance <= 0) {
      return res.json({ 
        success: false, 
        message: 'No credits remaining', 
        creditBalance: user.creditBalance 
      });
    }

    // ✅ Check input
    if (!url && !file) {
      return res.status(400).json({ error: 'No image or URL provided' });
    }

    // ✅ Prepare API request
    const form = new FormData();
    if (file) {
      form.append('media', file.buffer, { filename: file.originalname });
    } else {
      form.append('url', url);
    }

    form.append('models', 'nudity,wad,offensive,text-content,gore');
    form.append('api_user', process.env.SIGHTENGINE_USER);
    form.append('api_secret', process.env.SIGHTENGINE_SECRET);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
      const response = await axios.post('https://api.sightengine.com/1.0/check.json', form, {
        headers: form.getHeaders(),
        signal: controller.signal
      });

      clearTimeout(timeout);

      // ✅ Analyze result
      const result = analyzeSightengineResult(response.data);

      // ✅ Deduct credit
      user.creditBalance -= 1;
      await user.save();

      // ✅ Send response
      res.json({
        success: true,
        message: 'Analysis successful',
        result,
        creditBalance: user.creditBalance
      });

    } catch (apiErr) {
      clearTimeout(timeout);
      throw new Error(apiErr.response?.data?.error || 'Sightengine error');
    }
  } catch (error) {
    console.error('Detect Route Error:', error.message);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
});

export default router;
