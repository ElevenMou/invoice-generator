import { model, models, Schema } from "mongoose";

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    address: {
      street: {
        type: String,
        required: [true, "Street is required!"],
      },
      city: {
        type: String,
        required: [true, "City is required!"],
      },
      postalCode: {
        type: String,
        required: [true, "Postal code is required!"],
      },
      country: String,
    },
    email: String,
    phone: String,
    identifiers: [
      {
        label: String,
        value: String,
      },
    ],
    logo: {
      url: String,
      delete_url: String,
    },
    signature: {
      url: String,
      delete_url: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required!"],
    },
  },
  { timestamps: true }
);

CompanySchema.pre("deleteOne", async function (next) {
  const company = this.getFilter();
  await models.Invoice.deleteMany({ company: company._id });
  next();
});

const Company = models.Company || model("Company", CompanySchema);

export default Company;
