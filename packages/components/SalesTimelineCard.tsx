import React from 'react';
import { useSelfDescribing } from '@specview/react/useSelfDescribing';

type SaleEvent = {
  id: number;
  timestamp: string;
  type: 'gummy' | 'chocolate' | 'lollipop' | 'drink';
  productName: string;
  amount: number;
  location?: string;
};

interface SalesTimelineData {
  events: SaleEvent[];
  summary: {
    total_sales: number;
    sales_by_type: Record<string, number>;
    date_range: { start: string; end: string };
  };
}

export const SalesTimelineCard: React.FC<{ storeId: string }> = ({ storeId }) => {
  const selfDescribing = useSelfDescribing<SalesTimelineData>({
    componentId: 'sales-timeline',
    description: 'Timeline of candy sales for a specific store',
    entityId: storeId, // Generic entity identifier
    generateData: () => {
      const now = new Date();
      const events: SaleEvent[] = [
        {
          id: 1,
          timestamp: now.toISOString(),
          type: 'gummy' as const,
          productName: 'Sour Worms',
          amount: 12,
          location: 'Downtown'
        }
      ];
      return {
        events,
        summary: {
          total_sales: events.reduce((acc, e) => acc + e.amount, 0),
          sales_by_type: { gummy: 1 },
          date_range: { start: events[0].timestamp, end: events[0].timestamp }
        }
      };
    }
  });

  const { currentView, toggleView, exportAsJSON, copyToClipboard, getData, getJSONString, copySuccess } = selfDescribing;
  const data = getData();

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
      {/* Header with title and action buttons */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          <span className="mr-2">📊</span>
          Candy Sales Timeline
        </h3>
        <div className="flex space-x-2">
          <button 
            onClick={toggleView}
            className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition-colors duration-200"
          >
            {currentView === 'visual' ? 'Show JSON' : 'Show Visual'}
          </button>
          <button 
            onClick={exportAsJSON}
            className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm font-medium transition-colors duration-200"
          >
            Export JSON
          </button>
          <button 
            onClick={copyToClipboard}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              copySuccess 
                ? 'bg-green-100 text-green-800 border border-green-300' 
                : 'bg-gray-500 hover:bg-gray-600 text-white'
            }`}
          >
            {copySuccess ? 'Copied!' : 'Copy JSON'}
          </button>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-200 mb-4" />

      {/* Content area */}
      {currentView === 'visual' ? (
        <div className="space-y-4">
          {/* Summary stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{data.summary.total_sales}</div>
              <div className="text-sm text-blue-800">Total Sales</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{data.events.length}</div>
              <div className="text-sm text-green-800">Events</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-purple-800">
                {new Date(data.summary.date_range.start).toLocaleDateString()}
              </div>
              <div className="text-sm text-purple-600">First Sale</div>
            </div>
          </div>

          {/* Sales by type */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Sales by Type</h4>
            <div className="space-y-2">
              {Object.entries(data.summary.sales_by_type).map(([type, count]) => (
                <div key={type} className="flex justify-between items-center">
                  <span className="capitalize text-gray-700">{type}</span>
                  <span className="font-medium text-gray-900">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent events */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Recent Events</h4>
            <div className="space-y-2">
              {data.events.slice(0, 3).map((event) => (
                <div key={event.id} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">{event.productName}</span>
                  <span className="font-medium text-gray-900">{event.amount} units</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <pre className="text-green-400 p-4 text-sm overflow-auto max-h-96">
            {getJSONString(true)}
          </pre>
        </div>
      )}
    </div>
  );
};