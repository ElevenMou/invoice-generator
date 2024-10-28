import { getAuthSession } from "@/lib/auth/authOptions";
import Company from "@/models/company";
import User from "@/models/user";
import uploadImage from "@/utils/uploadImage";

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

    const company = await Company.findById(id);

    if (!company) {
      return new Response("Company not found", { status: 404 });
    }

    if (company.user.toString() !== user._id.toString()) {
      return new Response("Unauthorized", { status: 401 });
    }

    return new Response(
      JSON.stringify({
        ...company.toObject(),
        logo: company.logo?.url || "",
        signature: company.signature?.url || "",
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

    const company = await Company.findById(id);
    if (!company) {
      return new Response("Company not found", { status: 404 });
    }

    if (company.user.toString() !== user._id.toString()) {
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
    const logo = formData.get("logo");
    const signature = formData.get("signature");
    const identifiers = formData.getAll("identifiers[]");

    if (logo instanceof File) {
      const { url, delete_url } = await uploadImage(logo);
      company.logo = {
        url,
        delete_url,
      };
    }

    if (signature instanceof File) {
      const { url, delete_url } = await uploadImage(signature);
      company.signature = {
        url,
        delete_url,
      };
    }

    company.name = name || company.name;
    company.address.street = street || company.address.street;
    company.address.city = city || company.address.city;
    company.address.postalCode = postalCode || company.address.postalCode;
    company.address.country = country || company.address.country;
    company.email = email || company.email;
    company.phone = phone || company.phone;
    company.companyIdentifier = companyIdentifier || company.companyIdentifier;
    company.TaxID = TaxID || company.TaxID;
    company.BusinessTax = BusinessTax || company.BusinessTax;

    company.identifiers = identifiers
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

    if (
      !company.name ||
      !company.address.street ||
      !company.address.city ||
      !company.address.postalCode
    ) {
      return new Response("Missing required fields", { status: 400 });
    }

    await company.save();
    return new Response(JSON.stringify({ _id: company._id }), { status: 200 });
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

    const company = await Company.findById(id);
    if (!company) {
      return new Response("Company not found", { status: 404 });
    }

    if (company.user.toString() !== user._id.toString()) {
      return new Response("Unauthorized", { status: 401 });
    }

    await company.deleteOne();
    return new Response("Company deleted", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Error", { status: 500 });
  }
}
