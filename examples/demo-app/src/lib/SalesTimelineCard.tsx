import React from 'react';
import { useSelfDescribing } from './useSelfDescribing';
import { candyShopDB, Sale } from './database';

interface SalesTimelineData {
  events: Sale[];
  summary: {
    total_sales: number;
    total_revenue: number;
    sales_by_type: Record<string, number>;
    date_range: { start: string; end: string };
  };
}

export const SalesTimelineCard: React.FC<{ storeId: string }> = ({ storeId }) => {
  const selfDescribing = useSelfDescribing<SalesTimelineData>({
    componentId: 'sales-timeline',
    description: 'Timeline of candy sales for a specific store',
    entityId: storeId,
    generateData: () => {
      // Get real data from database
      const recentSales = candyShopDB.getRecentSales(storeId, 10);
      const summary = candyShopDB.getSalesTimeline(storeId);

      return {
        events: recentSales,
        summary: summary
      };
    }
  });

  const { currentView, toggleView, exportAsJSON, copyToClipboard, getData, getJSONString, copySuccess } = selfDescribing;
  const data = getData();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-700">📊 Candy Sales Timeline</h2>
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
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{data.summary.total_sales}</div>
                <div className="text-sm text-blue-700">Total Units Sold</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">${data.summary.total_revenue.toFixed(2)}</div>
                <div className="text-sm text-green-700">Total Revenue</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{Object.keys(data.summary.sales_by_type).length}</div>
                <div className="text-sm text-purple-700">Product Types</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Recent Sales</h3>
              <div className="space-y-2">
                {data.events.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <div className="font-medium text-gray-800">{event.product_name}</div>
                      <div className="text-sm text-gray-600">
                        {new Date(event.timestamp).toLocaleString()} • {event.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">{event.amount} units</div>
                      <div className="text-sm text-gray-600">
                        ${(event.amount * event.price_per_unit).toFixed(2)} • ${event.price_per_unit}/unit
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Sales by Type</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(data.summary.sales_by_type).map(([type, amount]) => (
                  <div key={type} className="bg-gray-100 p-3 rounded-md text-center">
                    <div className="font-semibold text-gray-800 capitalize">{type}</div>
                    <div className="text-sm text-gray-600">{amount} units</div>
                  </div>
                ))}
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
