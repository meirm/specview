import React from 'react';
import { useSelfDescribing } from './useSelfDescribing';
import { candyShopDB } from './database';

interface TopProductsData {
  top_products: Array<{
    type: string;
    total_units: number;
    total_revenue: number;
    percentage: number;
  }>;
  summary: {
    total_types: number;
    total_units: number;
    total_revenue: number;
  };
}

export const TopProductsCard: React.FC<{ storeId: string }> = ({ storeId }) => {
  const selfDescribing = useSelfDescribing<TopProductsData>({
    componentId: 'top-products-card',
    description: 'Bar chart of top-selling candy types at a store',
    entityId: storeId,
    generateData: () => {
      // Get real data from database
      return candyShopDB.getTopProducts(storeId);
    }
  });

  const { currentView, toggleView, exportAsJSON, copyToClipboard, getData, getJSONString, copySuccess } = selfDescribing;
  const data = getData();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-700">🍭 Top Products</h2>
        <div className="flex space-x-2">
          <button
            onClick={toggleView}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
          >
            {currentView === 'visual' ? 'Show JSON' : 'Show Visual'}
          </button>
          <button
            onClick={exportAsJSON}
            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md transition-colors"
          >
            Export JSON
          </button>
          <button
            onClick={copyToClipboard}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              copySuccess 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-600 hover:bg-gray-700 text-white'
            }`}
          >
            {copySuccess ? 'Copied!' : 'Copy JSON'}
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        {currentView === 'visual' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{data.summary.total_units}</div>
                <div className="text-sm text-orange-700">Total Units Sold</div>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-pink-600">${data.summary.total_revenue.toFixed(2)}</div>
                <div className="text-sm text-pink-700">Total Revenue</div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">{data.summary.total_types}</div>
                <div className="text-sm text-indigo-700">Product Categories</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Product Performance</h3>
              <div className="space-y-3">
                {data.top_products.map((product, index) => (
                  <div key={product.type} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          index === 0 ? 'bg-yellow-500' :
                          index === 1 ? 'bg-gray-400' :
                          index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 capitalize">{product.type}</div>
                          <div className="text-sm text-gray-600">
                            {product.total_units} units • ${product.total_revenue.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-800">{product.percentage}%</div>
                        <div className="text-xs text-gray-500">of total</div>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === 0 ? 'bg-yellow-500' :
                          index === 1 ? 'bg-gray-400' :
                          index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                        }`}
                        style={{ width: `${product.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2">Performance Insights</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>🏆 <strong>{data.top_products[0]?.type}</strong> is the top performer with {data.top_products[0]?.percentage}% of sales</div>
                <div>💰 Total revenue across all categories: <strong>${data.summary.total_revenue.toFixed(2)}</strong></div>
                <div>📊 Average revenue per category: <strong>${(data.summary.total_revenue / data.summary.total_types).toFixed(2)}</strong></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-900 text-green-400 p-4 rounded-md overflow-auto max-h-96">
            <pre className="text-sm">{getJSONString(true)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
