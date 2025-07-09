import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import * as cheerio from 'cheerio';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import process from 'process';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB Atlas connection
const MONGO_URI =
	'mongodb+srv://spots-admin:IHFvEaHy74aSKkPH@spots.qrzztnh.mongodb.net/Users?retryWrites=true&w=majority&appName=SPOTS';

// Remove deprecated options
mongoose
	.connect(MONGO_URI)
	.then(() => console.log('✅ Connected to MongoDB Atlas'))
	.catch((err) => {
		console.error(' MongoDB connection error:', err);
		console.log(
			'💡 Please check your MongoDB Atlas connection string and network connectivity'
		);
	});

app.use(cors());
app.use(express.json());

// User schema and model
const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true }, // hashed password
	},
	{ timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (err) {
		next(err);
	}
});

const postSchema = new mongoose.Schema(
	{
		eventName: { type: String, required: true },
		imageURL: { type: String },
		description: { type: String },
		location: { type: String, default: 'New York' },
		date: { type: String, default: '07/25' },
		time: { type: String, default: '7:00 PM' },
		price: { type: String, default: 'Free' },
		link: { type: String, default: 'https://google.com' },
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema, 'user');
const Post = mongoose.model('Post', postSchema, 'posts');

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
			const h2 = $(element);
			const parent = h2.closest('section.article__body');
			const figure = parent.find('figure').first();
			const img = figure.find('img');
			const imageUrl = img.attr('src');
			const caption = figure.find('figcaption').text().trim();

			const eventName = h2.text().trim();
			const description = h2.next('p').text().trim();
			const ticketLink = h2.next('p').find('a').attr('href');

			events.push({
				eventName,
				imageUrl,
				description,
				ticketLink,
				caption,
			});
		});

		console.log(events);

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
			return res
				.status(400)
				.json({ success: false, message: 'All fields are required.' });
		}
		// Check if user already exists
		const existingUser = await User.findOne({ $or: [{ email }, { username }] });
		if (existingUser) {
			return res
				.status(409)
				.json({ success: false, message: 'User already exists.' });
		}
		const user = new User({ username, email, password });
		await user.save();
		res
			.status(201)
			.json({ success: true, message: 'User registered successfully.' });
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
	} catch (error) {
		console.error('Error fetching users:', error);
		res.status(500).json({ success: false, message: 'Server error.' });
	}
});

// Get user by ID (excluding password)
app.get('/api/users/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id, '-password');
		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: 'User not found.' });
		}
		res.json({ success: true, user });
	} catch (error) {
		console.error('Error fetching user by ID:', error);
		res.status(500).json({ success: false, message: 'Server error.' });
	}
});

// Login endpoint
app.post('/api/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res
				.status(400)
				.json({ success: false, message: 'Email and password are required.' });
		}
		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(401)
				.json({ success: false, message: 'Invalid email or password.' });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res
				.status(401)
				.json({ success: false, message: 'Invalid email or password.' });
		}
		res.json({
			success: true,
			message: 'Login successful.',
			user: { username: user.username, email: user.email, id: user._id },
		});
	} catch (err) {
		console.error('Login error:', err);
		res.status(500).json({ success: false, message: 'Server error.' });
	}
});

// Create a new post
app.post('/api/posts', async (req, res) => {
	try {
		const { eventName, imageURL, description } = req.body;
		if (!eventName) {
			return res
				.status(400)
				.json({ success: false, message: 'Event name is required.' });
		}

		const post = new Post({ eventName, imageURL, description });
		await post.save();

		res
			.status(201)
			.json({ success: true, message: 'Post created successfully.', post });
	} catch (error) {
		console.error('Error creating post:', error);
		res.status(500).json({ success: false, message: 'Server error.' });
	}
});

// Get all posts
app.get('/api/posts', async (req, res) => {
	try {
		const posts = await Post.find();
		res.json({ success: true, posts });
	} catch (error) {
		console.error('Error fetching posts:', error);
		res.status(500).json({ success: false, message: 'Server error.' });
	}
});

// Get post by ID
app.get('/api/posts/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res
				.status(404)
				.json({ success: false, message: 'Post not found.' });
		}
		res.json({ success: true, post });
	} catch (error) {
		console.error('Error fetching post:', error);
		res.status(500).json({ success: false, message: 'Server error.' });
	}
});

// Update post by ID
app.put('/api/posts/:id', async (req, res) => {
	try {
		const {
			eventName,
			imageURL,
			description,
			location,
			date,
			time,
			price,
			link,
		} = req.body;
		const post = await Post.findByIdAndUpdate(
			req.params.id,
			{ eventName, imageURL, description, location, date, time, price, link },
			{ new: true, runValidators: true }
		);
		if (!post) {
			return res
				.status(404)
				.json({ success: false, message: 'Post not found.' });
		}
		res.json({ success: true, message: 'Post updated successfully.', post });
	} catch (error) {
		console.error('Error updating post:', error);
		res.status(500).json({ success: false, message: 'Server error.' });
	}
});

// Delete post by ID
app.delete('/api/posts/:id', async (req, res) => {
	try {
		const post = await Post.findByIdAndDelete(req.params.id);
		if (!post) {
			return res
				.status(404)
				.json({ success: false, message: 'Post not found.' });
		}
		res.json({ success: true, message: 'Post deleted successfully.' });
	} catch (error) {
		console.error('Error deleting post:', error);
		res.status(500).json({ success: false, message: 'Server error.' });
	}
});

app.listen(PORT, () => {
	console.log(` Server running on port ${PORT}`);
	console.log(` Data endpoint: http://localhost:${PORT}/getData`);
});
