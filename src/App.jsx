import React, { useState, useEffect } from 'react'
import CoinList from './components/CoinList'
import CoinDetails from './components/CoinDetails'
import { fetchNewMemeCoinss, getLatestTweets } from './services/api'

function App() {
  const [coins, setCoins] = useState([])
  const [selectedCoin, setSelectedCoin] = useState(null)
  const [latestTweets, setLatestTweets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadCoins = async () => {
      try {
        setIsLoading(true)
        const fetchedCoins = await fetchNewMemeCoinss()
        setCoins(fetchedCoins)
        setIsLoading(false)
      } catch (err) {
        setError('Failed to load meme coins')
        setIsLoading(false)
      }
    }

    loadCoins()
  }, [])

  useEffect(() => {
    const loadTweets = async () => {
      if (selectedCoin) {
        try {
          const tweets = await getLatestTweets(selectedCoin.symbol)
          setLatestTweets(tweets)
        } catch (err) {
          console.error('Failed to load tweets', err)
        }
      }
    }

    loadTweets()
  }, [selectedCoin])

  const handleSelectCoin = (coin) => {
    setSelectedCoin(coin)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-800 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Meme Coin Tracker
      </h1>
      <div className="grid md:grid-cols-2 gap-4">
        <CoinList 
          coins={coins} 
          onSelectCoin={handleSelectCoin}
          selectedCoin={selectedCoin}
        />
        {selectedCoin && (
          <CoinDetails 
            coin={selectedCoin} 
            latestTweets={latestTweets}
          />
        )}
      </div>
    </div>
  )
}

export default App