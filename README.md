# Meme Coin Tracker

A web application for tracking newly launched meme cryptocurrency tokens, analyzing their use cases and social media presence.

## Features

- List of new meme coins
- Detailed view of each coin's social media and use case
- Responsive design
- Dark/light mode support

## Development

### Prerequisites
1. Get API keys:
   - CoinMarketCap API Key: https://coinmarketcap.com/api/
   - Twitter Developer API Token: https://developer.twitter.com/

2. Create a `.env` file in the project root:
```bash
VITE_COINMARKETCAP_API_KEY=your_api_key
VITE_TWITTER_BEARER_TOKEN=your_bearer_token
```

### Running the Project
```bash
npm install
npm run dev
```

Server will be available at:
- Local: http://localhost:8080
- Network: http://0.0.0.0:8080
- k8s: http://*.nodeops.app

## Build

```bash
npm run build
npm run preview
```

## APIs Used
- CoinGecko: Cryptocurrency market data
- CoinMarketCap: Social media links and additional coin data
- Twitter: Real-time social media mentions

## Theme

Clean Light theme with dark mode support, using Tailwind CSS for styling.

## Rate Limits & Considerations
- CoinMarketCap: Free tier has limited requests
- Twitter API: Requires careful management of rate limits
- Recommended: Implement caching and throttling in production