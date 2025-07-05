import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import {
  userCredits,
  registerUser,
  loginUser,
  paymentStripe,
  verifyStripe
} from '../controllers/UserController.js';

import authUser from '../middlewares/auth.js';

const userRouter = express.Router();

// =============================
// User Registration & Login
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// =============================
// Get user credits
userRouter.get('/credits', authUser, userCredits);

// =============================
// Stripe Payment Routes
userRouter.post('/pay-stripe', authUser, paymentStripe);
userRouter.post('/verify-stripe', authUser, verifyStripe);

// =============================
// Google Auth Routes
userRouter.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

userRouter.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
    res.redirect(`${process.env.ALLOWED_ORIGINS}/verify?token=${token}`);
  }
);

export default userRouter;
