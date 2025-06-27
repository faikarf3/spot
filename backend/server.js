import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import * as cheerio from 'cheerio';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());


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

// Start server
app.listen(PORT, () => {
	console.log(`🚀 Server running on port ${PORT}`);
	console.log(`📍 Health check: http://localhost:${PORT}/`);
	console.log(`📊 Data endpoint: http://localhost:${PORT}/getData`);
});
