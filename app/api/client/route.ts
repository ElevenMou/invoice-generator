import { getAuthSession } from "@/lib/auth/authOptions";
import Client from "@/models/client";
import User from "@/models/user";
import uploadImage from "@/utils/uploadImage";

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

    const formData = await request.formData();
    const name = formData.get("name");
    const street = formData.get("street");
    const city = formData.get("city");
    const postalCode = formData.get("postalCode");
    const country = formData.get("country");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const identifiers = formData.getAll("identifiers[]");
    const logo = formData.get("logo") as File;
    const { url, delete_url } = await uploadImage(logo);

    const client = await Client.create({
      name: name as string,
      address: {
        street: street as string,
        city: city as string,
        postalCode: postalCode as string,
        country: country as string,
      },
      email: email as string,
      phone: phone as string,
      identifiers: identifiers
        .map((identifier) => {
          if (typeof identifier === "string") {
            try {
              return JSON.parse(identifier);
            } catch (error) {
              console.error("Error parsing identifier:", error);
              return null;
            }
          }
          return identifier;
        })
        .filter((identifier) => identifier !== null),
      logo: {
        url,
        delete_url,
      },
      user: user._id,
    });

    return new Response(JSON.stringify({ _id: client._id }), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response("Uknown error", { status: 500 });
  }
}

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
    const limit = parseInt(searchParams.get("limit") || "15", 10);

    const total = await Client.find({ user: user._id }).countDocuments({
      user: user._id,
    });

    if (page > Math.ceil(total / limit)) {
      return new Response(JSON.stringify({ clients: [], total }), {
        status: 200,
      });
    }

    const clients = await Client.find({ user: user._id })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    return new Response(JSON.stringify({ clients, total }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Uknown error", { status: 500 });
  }
}
