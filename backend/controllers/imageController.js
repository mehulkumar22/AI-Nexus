import axios from 'axios';
import FormData from 'form-data';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// Controller function to generate image from prompt and style
export const generateImage = async (req, res) => {
  try {
    const { prompt, style } = req.body;
    const token = req.headers.token;

    // Validate inputs
    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    if (!prompt || !style) {
      return res.status(400).json({ success: false, message: 'Prompt and style are required' });
    }

    // Verify token and get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Fetch user
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check credit balance
    if (user.creditBalance <= 0) {
      return res.json({ 
        success: false, 
        message: 'No credits remaining', 
        creditBalance: user.creditBalance 
      });
    }

    // Prepare form data with prompt and style
    const formdata = new FormData();
    formdata.append('prompt', `${prompt}, ${style} style`);

    // Call Clipdrop API
    const response = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formdata,
      {
        headers: {
          'x-api-key': process.env.CLIPDROP_API,
          ...formdata.getHeaders()
        },
        responseType: 'arraybuffer'
      }
    );

    // Convert response to base64
    const base64Image = Buffer.from(response.data, 'binary').toString('base64');
    const resultImage = `data:image/png;base64,${base64Image}`;

    // Deduct credit
    user.creditBalance -= 1;
    await user.save();

    // Send response
    res.json({
      success: true,
      message: 'Image generated successfully',
      resultImage,
      creditBalance: user.creditBalance
    });

  } catch (error) {
    console.error('Generate Image Error:', error.message);
    
    // Handle specific error cases
    if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
    
    // Handle Clipdrop API errors
    if (error.response && error.response.status === 402) {
      return res.status(402).json({ 
        success: false, 
        message: 'Clipdrop API quota exceeded' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Internal server error' 
    });
  }
};