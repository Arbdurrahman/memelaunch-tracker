import React from 'react'

function CoinDetails({ coin, latestTweets = [] }) {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {coin.name} Details
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-700 dark:text-gray-200">Use Case</h3>
            <p className="text-gray-600 dark:text-gray-300">{coin.useCase}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-700 dark:text-gray-200">Social Media</h3>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(coin.socialMedia).map(([platform, handle]) => (
                <a 
                  key={platform}
                  href={`https://${platform}.com/${handle.replace('@','').replace('r/','')}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
                >
                  {platform}: {handle}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-700 dark:text-gray-200">Launch Date</h3>
            <p className="text-gray-600 dark:text-gray-300">{coin.launchDate}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Latest Tweets</h3>
        {latestTweets.length > 0 ? (
          <div className="space-y-2">
            {latestTweets.map((tweet, index) => (
              <div 
                key={index} 
                className="bg-gray-100 dark:bg-gray-600 p-3 rounded-lg"
              >
                <p className="text-sm text-gray-800 dark:text-gray-200">{tweet.text}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(tweet.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No recent tweets found</p>
        )}
      </div>
    </div>
  )
}

export default CoinDetails