import { getAuthSession } from "@/lib/auth/authOptions";
import Client from "@/models/client";
import Company from "@/models/company";
import Invoice from "@/models/invoice";
import User from "@/models/user";
import IInvoice from "@/types/IInvoice";

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    const user = await User.findById(session.user.id);
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body: IInvoice = await request.json();

    if (!body) {
      return new Response("Invalid data", { status: 400 });
    }

    if (
      !body.company ||
      !body.client ||
      !body.invoiceNumber ||
      !body.date ||
      body.items.length < 1
    ) {
      return new Response("Invalid data", { status: 400 });
    }

    body.items.forEach((item) => {
      if (!item.price || !item.quantity) {
        return new Response("Invalid data", { status: 400 });
      }
    });

    if (body.dueDate < body.date) {
      return new Response("Invalid data", { status: 400 });
    }

    console.log(body);

    const { _id, ...invoiceData } = body;
    const invoice = new Invoice({
      user: user._id,
      ...invoiceData,
    });

    await invoice.save();

    return new Response(JSON.stringify({ _id: invoice._id }), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response(error as string, { status: 500 });
  }
}

/* Get all invoices for authenticated user */
export async function GET(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    const user = await User.findById(session.user.id);
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "15", 10);

    const total = await Invoice.countDocuments({ user: user._id });

    if (page > Math.ceil(total / limit)) {
      return new Response(JSON.stringify({ invoicess: [], total }), {
        status: 200,
      });
    }

    const invoices = await Invoice.find({ user: user._id })
      .sort({ invoiceNumber: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    if (!invoices) {
      return new Response(JSON.stringify({ invoices: [], total }), {
        status: 200,
      });
    }

    const formattedInvoices = invoices.map(async (invoice) => {
      const company = await Company.findById(invoice.company);
      const client = await Client.findById(invoice.client);
      return {
        _id: invoice._id,
        company: company?.name,
        client: client?.name,
        invoiceNumber: invoice.invoiceNumber,
        date: invoice.date,
        total: invoice.total,
      };
    });

    return new Response(
      JSON.stringify({ invoices: await Promise.all(formattedInvoices), total }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response("An unknown error occurred", { status: 500 });
  }
}
