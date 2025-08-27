// Browser-compatible data store that mimics database functionality
export interface Sale {
  id: number;
  timestamp: string;
  product_name: string;
  product_type: string;
  amount: number;
  price_per_unit: number;
  location: string;
  store_id: string;
}

export interface Product {
  id: number;
  name: string;
  type: string;
  price_per_unit: number;
  stock_quantity: number;
  category: string;
}

export interface SalesSummary {
  total_sales: number;
  total_revenue: number;
  sales_by_type: Record<string, number>;
  date_range: { start: string; end: string };
}

export interface TopProductsSummary {
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

class CandyShopDataStore {
  private products: Product[] = [];
  private sales: Sale[] = [];
  private nextSaleId = 1;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize products
    this.products = [
      { id: 1, name: 'Sour Worms', type: 'gummy', price_per_unit: 2.50, stock_quantity: 100, category: 'Gummy Candy' },
      { id: 2, name: 'Dark Chocolate Bars', type: 'chocolate', price_per_unit: 3.99, stock_quantity: 50, category: 'Chocolate' },
      { id: 3, name: 'Rainbow Lollipops', type: 'lollipop', price_per_unit: 1.25, stock_quantity: 200, category: 'Hard Candy' },
      { id: 4, name: 'Gummy Bears', type: 'gummy', price_per_unit: 2.00, stock_quantity: 150, category: 'Gummy Candy' },
      { id: 5, name: 'Milk Chocolate Truffles', type: 'chocolate', price_per_unit: 4.50, stock_quantity: 75, category: 'Chocolate' },
      { id: 6, name: 'Rock Candy Sticks', type: 'hard_candy', price_per_unit: 1.75, stock_quantity: 120, category: 'Hard Candy' },
      { id: 7, name: 'Fruit Slices', type: 'gummy', price_per_unit: 2.25, stock_quantity: 80, category: 'Gummy Candy' },
      { id: 8, name: 'White Chocolate Bars', type: 'chocolate', price_per_unit: 3.25, stock_quantity: 60, category: 'Chocolate' },
      { id: 9, name: 'Caramel Lollipops', type: 'lollipop', price_per_unit: 1.50, stock_quantity: 90, category: 'Hard Candy' },
      { id: 10, name: 'Jelly Beans', type: 'gummy', price_per_unit: 1.99, stock_quantity: 200, category: 'Gummy Candy' }
    ];

    // Generate sample sales data
    this.generateSampleSales();
  }

  private generateSampleSales() {
    const now = new Date();
    const locations = ['Downtown', 'Mall', 'Airport', 'University', 'Hospital'];
    
    // Clear existing sales
    this.sales = [];
    this.nextSaleId = 1;

    // Generate 50 random sales for the last 30 days
    for (let i = 0; i < 50; i++) {
      const date = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
      const product = this.products[Math.floor(Math.random() * this.products.length)];
      const amount = Math.floor(Math.random() * 20) + 1;
      const location = locations[Math.floor(Math.random() * locations.length)];
      
      this.sales.push({
        id: this.nextSaleId++,
        timestamp: date.toISOString(),
        product_name: product.name,
        product_type: product.type,
        amount: amount,
        price_per_unit: product.price_per_unit,
        location: location,
        store_id: 'candyshop-001'
      });
    }

    // Sort sales by timestamp (newest first)
    this.sales.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  getSalesTimeline(storeId: string): SalesSummary {
    const storeSales = this.sales.filter(sale => sale.store_id === storeId);
    
    const salesByType = storeSales.reduce((acc, sale) => {
      acc[sale.product_type] = (acc[sale.product_type] || 0) + sale.amount;
      return acc;
    }, {} as Record<string, number>);

    const totalSales = storeSales.reduce((acc, sale) => acc + sale.amount, 0);
    const totalRevenue = storeSales.reduce((acc, sale) => acc + (sale.amount * sale.price_per_unit), 0);

    return {
      total_sales: totalSales,
      total_revenue: totalRevenue,
      sales_by_type: salesByType,
      date_range: {
        start: storeSales[storeSales.length - 1]?.timestamp || new Date().toISOString(),
        end: storeSales[0]?.timestamp || new Date().toISOString()
      }
    };
  }

  getTopProducts(storeId: string): TopProductsSummary {
    const storeSales = this.sales.filter(sale => sale.store_id === storeId);
    
    // Group by product type and calculate totals
    const productTypeMap = new Map<string, { total_units: number; total_revenue: number }>();
    
    storeSales.forEach(sale => {
      const existing = productTypeMap.get(sale.product_type) || { total_units: 0, total_revenue: 0 };
      existing.total_units += sale.amount;
      existing.total_revenue += sale.amount * sale.price_per_unit;
      productTypeMap.set(sale.product_type, existing);
    });

    // Convert to array and sort by total units
    const result = Array.from(productTypeMap.entries())
      .map(([type, data]) => ({
        product_type: type,
        total_units: data.total_units,
        total_revenue: data.total_revenue
      }))
      .sort((a, b) => b.total_units - a.total_units);

    const totalUnits = result.reduce((sum, item) => sum + item.total_units, 0);
    const totalRevenue = result.reduce((sum, item) => sum + item.total_revenue, 0);

    const topProducts = result.map(item => ({
      type: item.product_type,
      total_units: item.total_units,
      total_revenue: item.total_revenue,
      percentage: Math.round((item.total_units / totalUnits) * 100)
    }));

    return {
      top_products: topProducts,
      summary: {
        total_types: result.length,
        total_units: totalUnits,
        total_revenue: totalRevenue
      }
    };
  }

  getRecentSales(storeId: string, limit: number = 10): Sale[] {
    return this.sales
      .filter(sale => sale.store_id === storeId)
      .slice(0, limit);
  }

  // Method to regenerate data (for refresh functionality)
  refreshData() {
    this.generateSampleSales();
  }
}

// Create and export a singleton instance
export const candyShopDB = new CandyShopDataStore();
