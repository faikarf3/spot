import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import * as cheerio from 'cheerio';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB Atlas connection
const MONGO_URI = 'mongodb+srv://spots-admin:IHFvEaHy74aSKkPH@spots.qrzztnh.mongodb.net/Users?retryWrites=true&w=majority&appName=SPOTS';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('✅ Connected to MongoDB Atlas'))
	.catch((err) => console.error('❌ MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

// User schema and model
const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }, // hashed password
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

app.get('/', (req, res) => {
	res.json({
		message: 'Spot Backend API is running!',
	});
});

// Data scraping endpoint
app.get('/getData', async (req, res) => {
	try {
		const events = await scrapeEvents();
		res.json({
			success: true,
			data: events,
			count: events.length,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error('Error scraping data:', error);
		res.status(500).json({
			success: false,
			error: 'Failed to scrape data',
			message: error.message,
		});
	}
});

//scraper fucntion needs some more cleanup for this page, I'll try and figure it out over the weekend
async function scrapeEvents() {
	try {
		// url for secret nyc
		const response = await axios.get(
			'https://secretnyc.co/best-things-to-do-in-june-in-new-york-city/'
		);
		const $ = cheerio.load(response.data);

		const events = [];

		
		$('h2').each((i, element) => {
			const eventNumber = $(element).text().trim();
			const eventName = $(element).next('h2').text().trim();
			const imageUrl = $(element).next('figure').find('img').attr('src');
			const description = $(element).next('figure').next('p').text().trim();
			// Get the ticket link if it exists
			const ticketLink = $(element)
				.next('figure')
				.next('p')
				.find('a')
				.attr('href');
			events.push({
				eventNumber,
				eventName,
				imageUrl,
				description,
				ticketLink,
			});
		});

		return events;
	} catch (error) {
		console.error('Error:', error);
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
		// Check if user already exists
		const existingUser = await User.findOne({ $or: [{ email }, { username }] });
		if (existingUser) {
			return res.status(409).json({ success: false, message: 'User already exists.' });
		}
		const user = new User({ username, email, password });
		await user.save();
		res.status(201).json({ success: true, message: 'User registered successfully.' });
	} catch (err) {
		console.error('Registration error:', err);
		res.status(500).json({ success: false, message: 'Server error.' });
	}
});

// Get all users (for testing/demo)
app.get('/api/users', async (req, res) => {
	try {
		const users = await User.find({}, '-password'); // Exclude password field
		res.json({ success: true, users });
	} catch (err) {
		res.status(500).json({ success: false, message: 'Server error.' });
	}
});

// Start server
app.listen(PORT, () => {
	console.log(`🚀 Server running on port ${PORT}`);
	console.log(`📍 Health check: http://localhost:${PORT}/`);
	console.log(`📊 Data endpoint: http://localhost:${PORT}/getData`);
});
