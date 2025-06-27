# Spot Backend API

A Node.js/Express backend API that scrapes event data from Secret NYC.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file:

```bash
PORT=3001
NODE_ENV=development
```

3. Start the server:

**Production:**

```bash
npm start
```

**Development (with hot reload):**

```bash
npm run dev
```

## API Endpoints

### Health Check

- **GET** `/`
- Returns server status and health information

### Get Event Data

- **GET** `/getData`
- Scrapes and returns event data from Secret NYC
- Returns JSON with events array

## Example Response

```json
{
	"success": true,
	"data": [
		{
			"eventNumber": "1",
			"eventName": "Event Name",
			"imageUrl": "https://example.com/image.jpg",
			"description": "Event description...",
			"ticketLink": "https://example.com/tickets"
		}
	],
	"count": 1,
	"timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Development

The project uses **nodemon** for hot reloading during development. Any changes to `.js` or `.json` files will automatically restart the server.

**Features:**

- ✅ Hot reload on file changes
- ✅ Ignores `node_modules/` and test files
- ✅ 1-second delay to prevent rapid restarts
- ✅ Development environment variables

## Server Info

- **Port**: 3001 (configurable via PORT env variable)
- **Health Check**: http://localhost:3001/
- **Data Endpoint**: http://localhost:3001/getData
