import React, { useState } from 'react';
import { SalesTimelineCard } from './lib/SalesTimelineCard';
import { TopProductsCard } from './lib/TopProductsCard';
import { candyShopDB } from './lib/database';

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    // Refresh the data in the store
    candyShopDB.refreshData();
    // Force component re-render
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 font-sans bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">🍭 SpecView Candy Shop Dashboard</h1>
            <p className="text-gray-600 text-lg">
              Self-describing components consuming real data from in-memory store
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center space-x-2"
          >
            <span>🔄</span>
            <span>Refresh Data</span>
          </button>
        </div>
      </div>

      {/* SelfDescribingComponents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div key={`sales-${refreshKey}`}>
          <SalesTimelineCard storeId="candyshop-001" />
        </div>
        <div key={`products-${refreshKey}`}>
          <TopProductsCard storeId="candyshop-001" />
        </div>
      </div>

      {/* Information Panel */}
      <div className="mt-12 bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">🧠 SelfDescribingComponents with Real Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-blue-600">🗄️ In-Memory Data Store</h3>
            <p className="text-gray-600 text-sm">
              Components consume real data from an in-memory store with 50+ sales records and 10 product types
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-green-600">🔄 Live Data</h3>
            <p className="text-gray-600 text-sm">
              Click "Refresh Data" to regenerate data and see components update with new timestamps
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-purple-600">📊 Rich Analytics</h3>
            <p className="text-gray-600 text-sm">
              Real revenue calculations, sales by type, and performance insights from actual data
            </p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Try it out:</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Click "Refresh Data" to see new data with updated timestamps</li>
            <li>• Click "Show JSON" to see the structured data format with real data values</li>
            <li>• Click "Export JSON" to download the current data snapshot</li>
            <li>• Click "Copy JSON" to copy the structured data to your clipboard</li>
            <li>• Notice how the JSON includes metadata about when the data was generated</li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Data Store Features:</h3>
          <ul className="text-green-700 text-sm space-y-1">
            <li>• <strong>10 Product Types:</strong> Gummy, Chocolate, Lollipop, Hard Candy</li>
            <li>• <strong>50+ Sales Records:</strong> Random data from the last 30 days</li>
            <li>• <strong>5 Locations:</strong> Downtown, Mall, Airport, University, Hospital</li>
            <li>• <strong>Real Calculations:</strong> Revenue, percentages, and summaries</li>
            <li>• <strong>Browser Compatible:</strong> No external dependencies, works in any browser</li>
          </ul>
        </div>
      </div>
    </div>
  );
}