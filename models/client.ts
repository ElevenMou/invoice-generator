import { model, models, Schema } from "mongoose";
import Invoice from "./invoice";

const ClientSchema = new Schema(
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
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
    },
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
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required!"],
    },
  },

  { timestamps: true }
);

ClientSchema.pre("deleteOne", async function (next) {
  const client = this.getFilter();
  await Invoice.deleteMany({ client: client._id });
  next();
});

const Client = models.Client || model("Client", ClientSchema);

export default Client;
