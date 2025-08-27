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
      const events = [
        {
          id: 1,
          timestamp: now.toISOString(),
          type: 'gummy',
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

  const { currentView, toggleView, exportAsJSON, copyToClipboard, getData, getJSONString } = selfDescribing;

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 6, padding: 16, marginBottom: 24 }}>
      <h3>📊 Candy Sales Timeline</h3>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={toggleView}>
          {currentView === 'visual' ? 'Show JSON' : 'Show Visual'}
        </button>
        <button onClick={exportAsJSON}>Export JSON</button>
        <button onClick={copyToClipboard}>Copy JSON</button>
      </div>
      <hr style={{ margin: '12px 0' }} />
      {currentView === 'visual' ? (
        <div>
          <p>Total Sales: {getData().summary.total_sales} units</p>
          <p>First Sale: {getData().summary.date_range.start}</p>
        </div>
      ) : (
        <pre style={{ backgroundColor: '#222', color: 'white', padding: 12, borderRadius: 6 }}>
          {getJSONString(true)}
        </pre>
      )}
    </div>
  );
};