import { getAuthSession } from "@/lib/auth/authOptions";
import Invoice from "@/models/invoice";
import User from "@/models/user";
import IInvoice from "@/types/IInvoice";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const session = await getAuthSession();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    const user = await User.findById(session.user.id);
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return new Response("Invoice not found", { status: 404 });
    }

    if (invoice.user.toString() !== user._id.toString()) {
      return new Response("Unauthorized", { status: 401 });
    }

    return new Response(JSON.stringify(invoice.toObject().settings), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const session = await getAuthSession();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    const user = await User.findById(session.user.id);
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    let invoice = await Invoice.findById(id);
    if (!invoice) {
      return new Response("Invoice not found", { status: 404 });
    }

    if (invoice.user.toString() !== user._id.toString()) {
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
      return new Response("Provide all required fields", { status: 400 });
    }

    body.items.forEach((item) => {
      if (!item.price || !item.quantity) {
        return new Response("Name, price and quantity are required", {
          status: 400,
        });
      }
    });

    if (body.dueDate < body.date) {
      return new Response("Due date cannot be before invoice date", {
        status: 400,
      });
    }

    invoice.set(body);

    await invoice.save();
    return new Response(JSON.stringify({ _id: invoice._id }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Error", { status: 500 });
  }
}
