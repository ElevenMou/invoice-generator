import { getAuthSession } from "@/lib/auth/authOptions";
import Invoice from "@/models/invoice";
import User from "@/models/user";

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

    const invoice = await Invoice.findById(id).populate("client company");

    if (!invoice) {
      return new Response("Invoice not found", { status: 404 });
    }

    if (invoice.user.toString() !== user._id.toString()) {
      return new Response("Unauthorized", { status: 401 });
    }

    return new Response(
      JSON.stringify({
        ...invoice.toObject(),
        company: {
          ...invoice.company.toObject(),
          logo: invoice.company.logo?.url,
          signature: invoice.company.signature?.url,
        },
        client: {
          ...invoice.client.toObject(),
          logo: invoice.client.logo?.url,
        },
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response("Internal Error", { status: 500 });
  }
}
