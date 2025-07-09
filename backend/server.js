import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import * as cheerio from 'cheerio';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

dotenv.config();  // loads environment variables from .env into process.env

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// MongoDB Atlas connection (using MONGODB_URI from .env)
const MONGO_URI = process.env.MONGODB_URI;
console.log('→ Mongo URI:', MONGO_URI);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

// Configure email transport for password reset
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: process.env.SMTP_SECURE === 'true', // true for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// User schema and model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
  resetPasswordToken:   String,
  resetPasswordExpires: Date,
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', userSchema);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Spot Backend API is running!' });
});

// Data scraping endpoint
app.get('/getData', async (req, res) => {
  try {
    const events = await scrapeEvents();
    res.json({ success: true, data: events, count: events.length, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Error scraping data:', error);
    res.status(500).json({ success: false, error: 'Failed to scrape data', message: error.message });
  }
});

async function scrapeEvents() {
  try {
    const response = await axios.get('https://secretnyc.co/best-things-to-do-in-june-in-new-york-city/');
    const $ = cheerio.load(response.data);
    const events = [];
    $('h2').each((i, el) => {
      const eventNumber = $(el).text().trim();
      const eventName   = $(el).next('h2').text().trim();
      const imageUrl    = $(el).next('figure').find('img').attr('src');
      const description = $(el).next('figure').next('p').text().trim();
      const ticketLink  = $(el).next('figure').next('p').find('a').attr('href');
      events.push({ eventNumber, eventName, imageUrl, description, ticketLink });
    });
    return events;
  } catch (error) {
    console.error('Error in scraper:', error);
    throw error;
  }
}

// Register a new user
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) return res.status(409).json({ success: false, message: 'User already exists.' });
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ success: true, message: 'User registered successfully.' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});



// Get a user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    res.json({ success: true, user });
  } catch (err) {
    console.error('Get-user error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Get all users (for testing)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Forgot Password - generate reset token and send email
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email is required.' });
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: true, message: 'If that email exists, a reset link has been sent.' });
    }

    // Generate reset token and expiry
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Build front-end reset link (React handles GET route)
    const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
    const resetUrl = `${FRONTEND_URL}/reset-password/${token}`;

    // Attempt to send email, but don't fail on error
    const mailOptions = {
      to: user.email,
      from: process.env.SMTP_FROM,
      subject: 'Spots Password Reset',
      text: `You requested a password reset. Click here: ${resetUrl}`
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (smtpErr) {
      console.error('⚠️  Email send error:', smtpErr);
      console.log('🔗  Password reset link:', resetUrl);
    }

    res.json({ success: true, message: 'If that email exists, a reset link has been sent.' });
  } catch (err) {
    console.error('Forgot-password error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Reset Password - verify token and update password
app.post('/api/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  if (!password) return res.status(400).json({ success: false, message: 'Password is required.' });
  try {
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ success: false, message: 'Token is invalid or has expired.' });
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.json({ success: true, message: 'Password has been reset successfully.' });
  } catch (err) {
    console.error('Reset-password error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ success: false, message: 'Email and password are required.' });
		}
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ success: false, message: 'Invalid email or password.' });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ success: false, message: 'Invalid email or password.' });
		}
		// Generate JWT
		const token = jwt.sign(
			{ id: user._id, email: user.email, username: user.username },
			JWT_SECRET,
			{ expiresIn: '1h' }
		);
		res.json({
			success: true,
			message: 'Login successful.',
			user: { username: user.username, email: user.email, id: user._id },
			token
		});
	} catch (err) {
		console.error('Login error:', err);
		res.status(500).json({ success: false, message: 'Server error.' });
	}
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/`);
  console.log(`📊 Data endpoint: http://localhost:${PORT}/getData`);
});
