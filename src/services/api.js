import axios from 'axios'

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3'
const COINMARKETCAP_API_URL = 'https://pro-api.coinmarketcap.com/v1'

// Mocked API keys - replace with actual keys
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || 'mock_key'
const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN || 'mock_token'

export const fetchNewMemeCoinss = async () => {
  try {
    // Fetch recently added tokens from CoinGecko
    const response = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'date_added_desc',
        per_page: 50,
        page: 1,
        sparkline: false
      }
    })

    // Filter for meme coins (based on market cap and name)
    const memeCoinKeywords = ['doge', 'shiba', 'bonk', 'pepe', 'meme']
    const memeCoinFilter = response.data.filter(coin => 
      memeCoinKeywords.some(keyword => 
        coin.name.toLowerCase().includes(keyword) || 
        coin.symbol.toLowerCase().includes(keyword)
      ) && coin.market_cap < 1000000000 // Market cap < $1B
    )

    return memeCoinFilter.map(coin => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      launchDate: coin.date_added,
      useCase: 'Meme cryptocurrency',
      socialMedia: {
        twitter: `@${coin.name.replace(/\s/g, '')}`,
        telegram: `t.me/${coin.symbol}`,
        reddit: `r/${coin.symbol}`
      }
    }))
  } catch (error) {
    console.error('Error fetching meme coins:', error)
    return []
  }
}

export const fetchCoinSocialData = async (coinId) => {
  try {
    // Fetch Twitter data using CoinMarketCap
    const response = await axios.get(`${COINMARKETCAP_API_URL}/cryptocurrency/social-media-links`, {
      params: { id: coinId },
      headers: { 'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY }
    })

    return {
      twitter: response.data.twitter,
      telegram: response.data.telegram,
      reddit: response.data.reddit
    }
  } catch (error) {
    console.error('Error fetching social data:', error)
    return null
  }
}

// Additional helper for real-time social media tracking
export const getLatestTweets = async (coinSymbol) => {
  try {
    const response = await axios.get('https://api.twitter.com/2/tweets/search/recent', {
      params: { query: `$${coinSymbol} lang:en`, max_results: 10 },
      headers: { 'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}` }
    })

    return response.data.data.map(tweet => ({
      text: tweet.text,
      created_at: tweet.created_at
    }))
  } catch (error) {
    console.error('Error fetching tweets:', error)
    return []
  }
}