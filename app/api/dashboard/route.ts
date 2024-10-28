import { getAuthSession } from "@/lib/auth/authOptions";
import Client from "@/models/client";
import Company from "@/models/company";
import Invoice from "@/models/invoice";
import User from "@/models/user";

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    const user = await User.findById(session.user.id);
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const clients = await Client.find({ user: user._id });
    const companies = await Company.find({ user: user._id });
    const invoices = await Invoice.find({ user: user._id });
    const totalClients = clients.length;
    const totalCompanies = companies.length;
    const totalInvoices = invoices.length;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const previousYear = currentYear - 1;

    const getMonthlyRevenue = (year: number) => {
      const yearInvoices = invoices.filter((invoice) => {
        const createdAt = new Date(invoice.createdAt);
        return createdAt.getFullYear() === year;
      });

      return Array(12)
        .fill(0)
        .map((_, month) => {
          return yearInvoices.reduce((acc, invoice) => {
            const createdAt = new Date(invoice.date);
            return createdAt.getMonth() === month ? acc + invoice.total : acc;
          }, 0);
        });
    };

    const previousYearRevenue = getMonthlyRevenue(previousYear);
    const currentYearRevenue = getMonthlyRevenue(currentYear);

    const previousMonthRevenue =
      currentYearRevenue[(currentDate.getMonth() + 11) % 12];

    const last90DaysRevenue = invoices
      .filter((invoice) => {
        const createdAt = new Date(invoice.createdAt);
        const last90DaysAgo = new Date();
        last90DaysAgo.setDate(last90DaysAgo.getDate() - 90);
        return createdAt >= last90DaysAgo;
      })
      .reduce((acc, invoice) => {
        return acc + invoice.total;
      }, 0);

    const allTimeRevenue = invoices.reduce((acc, invoice) => {
      return acc + invoice.total;
    }, 0);

    const formatMonthlyData = (year: number, revenueData: any[]) => {
      return revenueData.map((revenue, index) => ({
        year,
        month: index + 1,
        revenue,
      }));
    };

    const monthlyData = [
      ...formatMonthlyData(previousYear, previousYearRevenue),
      ...formatMonthlyData(currentYear, currentYearRevenue),
    ];

    return new Response(
      JSON.stringify({
        totalClients,
        totalCompanies,
        totalInvoices,
        previousMonthRevenue,
        last90DaysRevenue,
        allTimeRevenue,
        monthlyData,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response("An unknown error occurred", { status: 500 });
  }
}
