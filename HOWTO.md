# 🧩 How to Use SpecView in Your Project

A comprehensive guide to integrating SelfDescribingComponents into any React project.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Installation](#installation)
3. [Basic Usage](#basic-usage)
4. [Creating SelfDescribingComponents](#creating-selfdescribingcomponents)
5. [Data Integration](#data-integration)
6. [Export & Sharing](#export--sharing)
7. [Advanced Patterns](#advanced-patterns)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install @specview/react @specview/core
# or
yarn add @specview/react @specview/core
```

### 2. Create Your First Component

```tsx
import React from 'react';
import { useSelfDescribing } from '@specview/react';

interface MyData {
  message: string;
  timestamp: string;
}

export const HelloWorldComponent: React.FC = () => {
  const selfDescribing = useSelfDescribing<MyData>({
    componentId: 'hello-world',
    description: 'A simple greeting component',
    generateData: () => ({
      message: 'Hello, SpecView!',
      timestamp: new Date().toISOString()
    })
  });

  const { currentView, toggleView, exportAsJSON, copyToClipboard, getData } = selfDescribing;
  const data = getData();

  return (
    <div className="border rounded-lg p-4">
      <div className="flex gap-2 mb-4">
        <button onClick={toggleView} className="px-3 py-1 bg-blue-500 text-white rounded">
          {currentView === 'visual' ? 'Show JSON' : 'Show Visual'}
        </button>
        <button onClick={exportAsJSON} className="px-3 py-1 bg-green-500 text-white rounded">
          Export JSON
        </button>
        <button onClick={copyToClipboard} className="px-3 py-1 bg-gray-500 text-white rounded">
          Copy JSON
        </button>
      </div>

      {currentView === 'visual' ? (
        <div>
          <h2 className="text-xl font-bold">{data.message}</h2>
          <p className="text-gray-600">Generated at: {data.timestamp}</p>
        </div>
      ) : (
        <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-auto">
          {JSON.stringify(selfDescribing.getSelfDescribingOutput(), null, 2)}
        </pre>
      )}
    </div>
  );
};
```

### 3. Use in Your App

```tsx
import React from 'react';
import { HelloWorldComponent } from './HelloWorldComponent';

function App() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">My SpecView App</h1>
      <HelloWorldComponent />
    </div>
  );
}
```

---

## 📦 Installation

### Prerequisites

- React 16.8+ (for hooks support)
- TypeScript (recommended)
- Node.js 14+

### Install Packages

```bash
# Core functionality
npm install @specview/core

# React integration
npm install @specview/react

# Export utilities (optional)
npm install @specview/export-utils
```

### TypeScript Setup

Add to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["@specview/core"]
  }
}
```

---

## 🎯 Basic Usage

### The `useSelfDescribing` Hook

The core of SpecView is the `useSelfDescribing` hook:

```tsx
const selfDescribing = useSelfDescribing<YourDataType>({
  componentId: 'unique-component-id',
  description: 'Human-readable description',
  generateData: () => yourData,
  // Optional parameters
  entityId: 'entity-id',
  contextId: 'context-id',
  sessionId: 'session-id',
  filters: { dateRange: 'last-30-days' }
});
```

### Available Methods

```tsx
const {
  // Data access
  getData,                    // Get current data
  getSelfDescribingOutput,    // Get full structured output
  getJSONString,              // Get JSON string
  
  // View control
  currentView,                // 'visual' | 'json'
  toggleView,                 // Switch between views
  setCurrentView,             // Set specific view
  
  // Export functions
  exportAsJSON,              // Download JSON file
  copyToClipboard,           // Copy to clipboard
  
  // Status
  copySuccess,               // Boolean
  exportSuccess,             // Boolean
  isGenerating,              // Boolean
  error                      // Error message
} = selfDescribing;
```

---

## 🧩 Creating SelfDescribingComponents

### 1. Define Your Data Type

```tsx
interface SalesData {
  totalSales: number;
  salesByMonth: Record<string, number>;
  topProducts: Array<{
    name: string;
    units: number;
    revenue: number;
  }>;
  metadata: {
    dateRange: { start: string; end: string };
    storeId: string;
  };
}
```

### 2. Create the Component

```tsx
import React from 'react';
import { useSelfDescribing } from '@specview/react';

export const SalesDashboard: React.FC<{ storeId: string }> = ({ storeId }) => {
  const selfDescribing = useSelfDescribing<SalesData>({
    componentId: 'sales-dashboard',
    description: 'Sales performance dashboard for retail store',
    entityId: storeId,
    generateData: () => {
      // Your data generation logic here
      return fetchSalesData(storeId);
    }
  });

  const { currentView, toggleView, exportAsJSON, copyToClipboard, getData } = selfDescribing;
  const data = getData();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Control buttons */}
      <div className="flex gap-2 mb-4">
        <button onClick={toggleView} className="btn btn-primary">
          {currentView === 'visual' ? 'Show JSON' : 'Show Visual'}
        </button>
        <button onClick={exportAsJSON} className="btn btn-success">
          Export JSON
        </button>
        <button onClick={copyToClipboard} className="btn btn-secondary">
          Copy JSON
        </button>
      </div>

      {/* Content */}
      {currentView === 'visual' ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Sales Dashboard</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded">
              <div className="text-2xl font-bold text-blue-600">
                ${data.totalSales.toLocaleString()}
              </div>
              <div className="text-sm text-blue-700">Total Sales</div>
            </div>
            {/* More visual elements */}
          </div>
        </div>
      ) : (
        <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-auto">
          {JSON.stringify(selfDescribing.getSelfDescribingOutput(), null, 2)}
        </pre>
      )}
    </div>
  );
};
```

---

## 🗄️ Data Integration

### Real Data Sources

SpecView works with any data source. Here are common patterns:

#### API Integration

```tsx
const selfDescribing = useSelfDescribing<ApiData>({
  componentId: 'api-dashboard',
  description: 'Data from external API',
  generateData: async () => {
    const response = await fetch('/api/sales-data');
    return response.json();
  }
});
```

#### Database Integration

```tsx
const selfDescribing = useSelfDescribing<DbData>({
  componentId: 'database-dashboard',
  description: 'Data from database',
  generateData: () => {
    return queryDatabase('SELECT * FROM sales WHERE store_id = ?', [storeId]);
  }
});
```

#### Local State Integration

```tsx
const [localData, setLocalData] = useState<LocalData>();

const selfDescribing = useSelfDescribing<LocalData>({
  componentId: 'local-dashboard',
  description: 'Data from local state',
  generateData: () => localData || { message: 'No data available' }
});
```

### Data Refresh Patterns

```tsx
// Manual refresh
const handleRefresh = () => {
  setLocalData(fetchNewData());
};

// Auto-refresh with useEffect
useEffect(() => {
  const interval = setInterval(() => {
    setLocalData(fetchNewData());
  }, 30000); // Refresh every 30 seconds

  return () => clearInterval(interval);
}, []);
```

---

## 📤 Export & Sharing

### Export Formats

SpecView supports multiple export formats:

```tsx
import { exportUtils } from '@specview/export-utils';

// JSON Export
const handleExportJSON = () => {
  const data = selfDescribing.getSelfDescribingOutput();
  exportUtils.exportAsJSON(data, 'my-component-data.json');
};

// CSV Export
const handleExportCSV = () => {
  const data = selfDescribing.getData();
  exportUtils.exportAsCSV(data, 'my-component-data.csv');
};

// PDF Export
const handleExportPDF = () => {
  const data = selfDescribing.getSelfDescribingOutput();
  exportUtils.exportAsPDF(data, 'my-component-report.pdf');
};
```

### Sharing Components

```tsx
// Share component data
const shareComponent = async () => {
  const data = selfDescribing.getSelfDescribingOutput();
  
  if (navigator.share) {
    await navigator.share({
      title: 'Component Data',
      text: 'Check out this component data',
      url: `data:application/json,${encodeURIComponent(JSON.stringify(data))}`
    });
  } else {
    // Fallback to clipboard
    await selfDescribing.copyToClipboard();
  }
};
```

---

## 🔧 Advanced Patterns

### Component Composition

```tsx
// Parent component that combines multiple SelfDescribingComponents
export const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <SalesDashboard storeId="store-1" />
      <InventoryDashboard storeId="store-1" />
      <CustomerDashboard storeId="store-1" />
    </div>
  );
};
```

### Conditional Rendering

```tsx
const ConditionalComponent: React.FC<{ showData: boolean }> = ({ showData }) => {
  const selfDescribing = useSelfDescribing<Data>({
    componentId: 'conditional-component',
    description: 'Component with conditional data',
    generateData: () => showData ? fetchData() : { message: 'No data to show' }
  });

  if (!showData) {
    return <div>Component disabled</div>;
  }

  return <ComponentRenderer selfDescribing={selfDescribing} />;
};
```

### Error Handling

```tsx
const RobustComponent: React.FC = () => {
  const selfDescribing = useSelfDescribing<Data>({
    componentId: 'robust-component',
    description: 'Component with error handling',
    generateData: () => {
      try {
        return fetchRiskyData();
      } catch (error) {
        return { error: error.message, fallback: true };
      }
    }
  });

  const { error, getData } = selfDescribing;
  const data = getData();

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (data.fallback) {
    return <div className="text-yellow-500">Using fallback data</div>;
  }

  return <ComponentRenderer selfDescribing={selfDescribing} />;
};
```

---

## ✅ Best Practices

### 1. Component Naming

```tsx
// ✅ Good
componentId: 'sales-dashboard-v1'
componentId: 'inventory-tracker-store-123'

// ❌ Bad
componentId: 'component1'
componentId: 'dashboard'
```

### 2. Data Structure

```tsx
// ✅ Good - Structured and descriptive
interface GoodData {
  summary: {
    total: number;
    count: number;
  };
  details: Array<{
    id: string;
    name: string;
    value: number;
  }>;
  metadata: {
    generatedAt: string;
    source: string;
  };
}

// ❌ Bad - Flat and unclear
interface BadData {
  data: any[];
  info: string;
}
```

### 3. Error Handling

```tsx
// Always handle errors gracefully
const selfDescribing = useSelfDescribing<Data>({
  componentId: 'error-safe-component',
  description: 'Component with proper error handling',
  generateData: () => {
    try {
      return fetchData();
    } catch (error) {
      console.error('Data fetch failed:', error);
      return { error: true, message: 'Unable to load data' };
    }
  }
});
```

### 4. Performance

```tsx
// Use memoization for expensive data generation
const selfDescribing = useSelfDescribing<ExpensiveData>({
  componentId: 'performance-optimized',
  description: 'Component with memoized data',
  generateData: useMemo(() => {
    return () => expensiveDataCalculation();
  }, [dependencies])
});
```

---

## 🔍 Troubleshooting

### Common Issues

#### 1. Component Not Rendering

```tsx
// Check if data is being generated
const selfDescribing = useSelfDescribing<Data>({
  componentId: 'debug-component',
  description: 'Debug component',
  generateData: () => {
    console.log('Generating data...');
    const data = fetchData();
    console.log('Generated data:', data);
    return data;
  }
});
```

#### 2. Export Not Working

```tsx
// Ensure proper error handling
const handleExport = () => {
  try {
    selfDescribing.exportAsJSON();
  } catch (error) {
    console.error('Export failed:', error);
    // Fallback to clipboard
    selfDescribing.copyToClipboard();
  }
};
```

#### 3. TypeScript Errors

```tsx
// Ensure proper type definitions
interface MyData {
  // Define all required properties
  required: string;
  optional?: number;
}

const selfDescribing = useSelfDescribing<MyData>({
  componentId: 'typed-component',
  description: 'Properly typed component',
  generateData: (): MyData => {
    return {
      required: 'value',
      optional: 42
    };
  }
});
```

### Debug Mode

```tsx
// Enable debug logging
const selfDescribing = useSelfDescribing<Data>({
  componentId: 'debug-component',
  description: 'Component with debug logging',
  generateData: () => {
    console.group('SpecView Debug');
    console.log('Component ID:', 'debug-component');
    console.log('Generating data...');
    const data = fetchData();
    console.log('Generated data:', data);
    console.groupEnd();
    return data;
  }
});
```

---

## 📚 Examples

### Complete Example: Analytics Dashboard

```tsx
import React, { useState, useEffect } from 'react';
import { useSelfDescribing } from '@specview/react';

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  conversionRate: number;
  topPages: Array<{
    path: string;
    views: number;
  }>;
  metadata: {
    dateRange: string;
    source: string;
  };
}

export const AnalyticsDashboard: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const selfDescribing = useSelfDescribing<AnalyticsData>({
    componentId: 'analytics-dashboard',
    description: 'Website analytics dashboard',
    generateData: () => {
      // Simulate API call
      return {
        pageViews: Math.floor(Math.random() * 10000),
        uniqueVisitors: Math.floor(Math.random() * 5000),
        conversionRate: Math.random() * 10,
        topPages: [
          { path: '/home', views: 1500 },
          { path: '/products', views: 1200 },
          { path: '/about', views: 800 }
        ],
        metadata: {
          dateRange: 'Last 30 days',
          source: 'Google Analytics'
        }
      };
    }
  });

  const { currentView, toggleView, exportAsJSON, copyToClipboard, getData } = selfDescribing;
  const data = getData();

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6" key={refreshKey}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <div className="flex gap-2">
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-500 text-white rounded">
            Refresh
          </button>
          <button onClick={toggleView} className="px-4 py-2 bg-gray-500 text-white rounded">
            {currentView === 'visual' ? 'Show JSON' : 'Show Visual'}
          </button>
          <button onClick={exportAsJSON} className="px-4 py-2 bg-green-500 text-white rounded">
            Export
          </button>
        </div>
      </div>

      {currentView === 'visual' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded">
              <div className="text-2xl font-bold text-blue-600">
                {data.pageViews.toLocaleString()}
              </div>
              <div className="text-sm text-blue-700">Page Views</div>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <div className="text-2xl font-bold text-green-600">
                {data.uniqueVisitors.toLocaleString()}
              </div>
              <div className="text-sm text-green-700">Unique Visitors</div>
            </div>
            <div className="bg-purple-50 p-4 rounded">
              <div className="text-2xl font-bold text-purple-600">
                {data.conversionRate.toFixed(2)}%
              </div>
              <div className="text-sm text-purple-700">Conversion Rate</div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Top Pages</h3>
            <div className="space-y-2">
              {data.topPages.map((page, index) => (
                <div key={page.path} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">{page.path}</span>
                  <span className="text-gray-600">{page.views.toLocaleString()} views</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-auto">
          {JSON.stringify(selfDescribing.getSelfDescribingOutput(), null, 2)}
        </pre>
      )}
    </div>
  );
};
```

---

## 🎉 Next Steps

1. **Explore the Demo**: Check out the [demo app](examples/demo-app) for more examples
2. **Join the Community**: Share your SelfDescribingComponents
3. **Contribute**: Help improve SpecView by contributing to the project
4. **Build**: Create your own SelfDescribingComponents and share them

---

## 📞 Support

- **Documentation**: [README.md](README.md)
- **Issues**: [GitHub Issues](https://github.com/meirm/specview/issues)
- **Discussions**: [GitHub Discussions](https://github.com/meirm/specview/discussions)

---

*Happy building with SpecView! 🚀*
