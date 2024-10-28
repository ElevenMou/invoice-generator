import { getAuthSession } from "@/lib/auth/authOptions";
import Client from "@/models/client";
import User from "@/models/user";
import uploadImage from "@/utils/uploadImage";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const session = await getAuthSession();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    const user = await User.findById(session.user.id);
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const client = await Client.findById(id);

    if (!client) {
      return new Response("Client not found", { status: 404 });
    }

    if (client.user.toString() !== user._id.toString()) {
      return new Response("Unauthorized", { status: 401 });
    }

    return new Response(
      JSON.stringify({ ...client.toObject(), logo: client.logo?.url || "" }),
      {
        status: 200,
      }
    );
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

    const client = await Client.findById(id);
    if (!client) {
      return new Response("Client not found", { status: 404 });
    }

    if (client.user.toString() !== user._id.toString()) {
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
    const logo = formData.get("logo");
    const identifiersData = formData.getAll("identifiers[]");

    if (logo instanceof File) {
      const { url, delete_url } = await uploadImage(logo);
      client.logo = {
        url,
        delete_url,
      };
    }
    client.name = name as string;
    client.address = {
      street: street as string,
      city: city as string,
      postalCode: postalCode as string,
      country: country as string,
    };
    client.email = email as string;
    client.phone = phone as string;
    client.identifiers = identifiersData
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
      .filter((identifier) => identifier !== null);
    await client.save();
    return new Response(JSON.stringify({ _id: client._id }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Error", { status: 500 });
  }
}

export async function DELETE(
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

    const client = await Client.findById(id);
    if (!client) {
      return new Response("Client not found", { status: 404 });
    }

    if (client.user.toString() !== user._id.toString()) {
      return new Response("Unauthorized", { status: 401 });
    }

    await client.deleteOne();
    return new Response("Client deleted", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Error", { status: 500 });
  }
}
