import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/generate-image', async (req, res) => {
  try {
    const { prompt, style = 'realistic' } = req.body;

    if (!prompt || prompt.trim() === '') {
      return res.status(400).json({ error: 'Please enter a prompt' });
    }

    const startTime = Date.now();
    const fullPrompt = `${style} style: ${prompt}`;
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}`;

    const response = await axios.get(pollinationsUrl, {
      timeout: 30000,
      params: {
        width: 1024,
        height: 1024,
        seed: Math.floor(Math.random() * 10000),
      },
      responseType: 'arraybuffer'
    });

    const processingTime = Date.now() - startTime;
    const imageBase64 = Buffer.from(response.data, 'binary').toString('base64');
    const imageUrl = `data:image/png;base64,${imageBase64}`;

    res.json({
      prompt,
      style,
      images: [
        {
          url: imageUrl,
          id: `img-${startTime}`,
          created_at: new Date().toISOString(),
        },
      ],
      processingTime,
    });
  } catch (error) {
    console.error('Image generation error:', error.message);
    res.status(500).json({
      error: 'Image generation failed',
      details: error.message,
    });
  }
});

export default router;
