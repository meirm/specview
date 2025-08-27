import React from 'react';
import { useSelfDescribing } from '@specview/react/useSelfDescribing';

interface TopProductsData {
  top_products: Array<{
    type: string;
    total_units: number;
  }>;
  summary: {
    total_types: number;
    total_units: number;
  };
}

export const TopProductsCard: React.FC<{ storeId: string }> = ({ storeId }) => {
  const selfDescribing = useSelfDescribing<TopProductsData>({
    componentId: 'top-products-card',
    description: 'Bar chart of top-selling candy types at a store',
    entityId: storeId,
    generateData: () => {
      const data = [
        { type: 'Gummy', total_units: 120 },
        { type: 'Chocolate', total_units: 95 },
        { type: 'Lollipop', total_units: 72 },
        { type: 'Drinks', total_units: 45 },
      ];
      return {
        top_products: data,
        summary: {
          total_types: data.length,
          total_units: data.reduce((sum, item) => sum + item.total_units, 0)
        }
      };
    }
  });

  const { currentView, toggleView, exportAsJSON, copyToClipboard, getData, getJSONString } = selfDescribing;

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 6, padding: 16, marginBottom: 24 }}>
      <h3>🍭 Top Products</h3>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={toggleView}>
          {currentView === 'visual' ? 'Show JSON' : 'Show Visual'}
        </button>
        <button onClick={exportAsJSON}>Export JSON</button>
        <button onClick={copyToClipboard}>Copy JSON</button>
      </div>
      <hr style={{ margin: '12px 0' }} />
      {currentView === 'visual' ? (
        <ul>
          {getData().top_products.map((p) => (
            <li key={p.type}>
              <strong>{p.type}</strong>: {p.total_units} units sold
            </li>
          ))}
        </ul>
      ) : (
        <pre style={{ backgroundColor: '#222', color: 'white', padding: 12, borderRadius: 6 }}>
          {getJSONString(true)}
        </pre>
      )}
    </div>
  );
};