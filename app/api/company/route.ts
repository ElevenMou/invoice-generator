import { getAuthSession } from "@/lib/auth/authOptions";
import Company from "@/models/company";
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
    const companyIdentifier = formData.get("companyIdentifier");
    const TaxID = formData.get("TaxID");
    const BusinessTax = formData.get("BusinessTax");
    const logo = formData.get("logo") as File;
    const signature = formData.get("signature") as File;
    const identifiers = formData.getAll("identifiers[]");
    const { url, delete_url } = await uploadImage(logo);
    const { url: signature_url, delete_url: signature_delete_url } =
      await uploadImage(signature);

    if (!name || !street || !city || !postalCode) {
      return new Response("Missing required fields", { status: 400 });
    }

    const company = await Company.create({
      name,
      address: { street, city, postalCode, country },
      email,
      phone,
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
      signature: {
        url: signature_url,
        delete_url: signature_delete_url,
      },
      user: user._id,
    });

    return new Response(JSON.stringify({ _id: company._id }), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response(error as string, { status: 500 });
  }
}

/* Get all companies for authenticated user */
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

    const total = await Company.find({ user: user._id }).countDocuments({
      user: user._id,
    });

    if (page > Math.ceil(total / limit)) {
      return new Response(JSON.stringify({ companiess: [], total }), {
        status: 200,
      });
    }

    const companies = await Company.find({ user: user._id })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    return new Response(JSON.stringify({ companies, total }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("An unknown error occurred", { status: 500 });
  }
}
