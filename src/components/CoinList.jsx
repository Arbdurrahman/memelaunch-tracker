import React from 'react'

function CoinList({ coins, onSelectCoin, selectedCoin }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        New Meme Coins
      </h2>
      {coins.map(coin => (
        <div 
          key={coin.id} 
          onClick={() => onSelectCoin(coin)}
          className={`
            cursor-pointer p-3 mb-2 rounded-lg transition-colors 
            ${selectedCoin?.id === coin.id 
              ? 'bg-blue-100 dark:bg-blue-900' 
              : 'bg-white dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500'}
          `}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">
                {coin.name} ({coin.symbol})
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Launched: {coin.launchDate}
              </p>
            </div>
            <span className="text-sm bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full">
              New
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CoinList