interface IDashboard {
  totalInvoices: number;
  totalClients: number;
  totalCompanies: number;

  previousMonthRevenue: number;
  last90DaysRevenue: number;
  allTimeRevenue: number;

  monthlyData: Array<{
    year: number;
    month: number;
    revenue: number;
  }>;
}
