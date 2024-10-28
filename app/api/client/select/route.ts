import { getAuthSession } from "@/lib/auth/authOptions";
import Client from "@/models/client";
import User from "@/models/user";

/* Get all clients for authenticated user */
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
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const search = searchParams.get("search") || "";

    const total = await Client.find({ user: user._id })
      .where("name", {
        $regex: search,
        $options: "i",
      })
      .countDocuments({ user: user._id });

    if (page > Math.ceil(total / limit)) {
      return new Response(JSON.stringify({ clients: [], total }), {
        status: 200,
      });
    }

    const clients = await Client.find({ user: user._id })
      .where("name", { $regex: search, $options: "i" })
      .select("_id name")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    return new Response(
      JSON.stringify({
        options: clients.map((c) => ({ value: c._id, label: c.name })),
        total,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response("An unknown error occurred", { status: 500 });
  }
}
