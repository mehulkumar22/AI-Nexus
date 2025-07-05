import dotenv from 'dotenv';
dotenv.config();

import userModel from "../models/userModel.js";
import transactionModel from "../models/transactionModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Stripe from "stripe";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

// =============================
// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: 'Missing Details' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// =============================
// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({
        success: true,
        token,
        user: {
          name: user.name,
          email: user.email
        }
      });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// =============================
// Get user credits
const userCredits = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ from auth middleware
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      credits: user.creditBalance,
      user: {
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// =============================
// Stripe payment API
const paymentStripe = async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.user.id; // ✅ from auth middleware
    const { origin } = req.headers;

    const userData = await userModel.findById(userId);
    if (!userData || !planId) {
      return res.json({ success: false, message: 'Invalid Credentials' });
    }

    let credits, plan, amount;
    switch (planId) {
      case 'Basic':
        plan = 'Basic';
        credits = 100;
        amount = 49;
        break;
      case 'Advanced':
        plan = 'Advanced';
        credits = 250;
        amount = 99;
        break;
      case 'Premium':
        plan = 'Premium';
        credits = 2500;
        amount = 999;
        break;
      default:
        return res.json({ success: false, message: 'Plan not found' });
    }

    const transactionData = {
      userId,
      plan,
      amount,
      credits,
      date: Date.now(),
    };

    const newTransaction = await transactionModel.create(transactionData);

    const currency = (process.env.CURRENCY || "INR").toLowerCase();

    const line_items = [{
      price_data: {
        currency,
        product_data: { name: "Credit Purchase" },
        unit_amount: amount * 100,
      },
      quantity: 1,
    }];

    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&transactionId=${newTransaction._id}`,
      cancel_url: `${origin}/verify?success=false&transactionId=${newTransaction._id}`,
      line_items,
      mode: 'payment',
    });

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// =============================
// Verify Stripe payment
const verifyStripe = async (req, res) => {
  try {
    const { transactionId, success } = req.body;

    if (success === 'true') {
      const transactionData = await transactionModel.findById(transactionId);
      if (transactionData.payment) {
        return res.json({ success: false, message: 'Payment already verified' });
      }

      const userData = await userModel.findById(transactionData.userId);
      const creditBalance = userData.creditBalance + transactionData.credits;
      await userModel.findByIdAndUpdate(userData._id, { creditBalance });
      await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });

      res.json({ success: true, message: "Credits Added" });
    } else {
      res.json({ success: false, message: 'Payment Failed' });
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  userCredits,
  paymentStripe,
  verifyStripe
};
