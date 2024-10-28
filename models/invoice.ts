import { fail } from "assert";
import { model, models, Schema } from "mongoose";

const InvoiceSchema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company is required!"],
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: [true, "Client is required!"],
    },
    invoiceNumber: {
      type: String,
      required: [true, "Invoice number is required!"],
    },
    date: {
      type: Date,
      required: [true, "Invoice date is required!"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required!"],
    },
    items: [
      {
        description: String,
        quantity: {
          type: Number,
          required: [true, "Quantity is required!"],
          min: [0, "Quantity cannot be negative!"],
        },
        price: {
          type: Number,
          required: [true, "Price is required!"],
          min: [0, "Price cannot be negative!"],
        },
        tax: {
          type: Number,
          min: [0, "Tax cannot be negative!"],
        },
        total: {
          type: Number,
          required: [true, "Total is required!"],
          min: [0, "Total cannot be negative!"],
        },
      },
    ],
    subtotal: {
      type: Number,
      required: [true, "Subtotal is required!"],
      min: [0, "Subtotal cannot be negative!"],
    },
    taxTotal: {
      type: Number,
      required: [true, "Tax total is required!"],
      min: [0, "Tax total cannot be negative!"],
    },
    total: {
      type: Number,
      required: [true, "Total is required!"],
      min: [0, "Total cannot be negative!"],
    },
    currency: {
      type: String,
      required: [true, "Currency is required!"],
      default: "USD",
    },
    notes: String,
    settings: {
      company: {
        address: {
          showAddress: {
            type: Boolean,
            default: true,
          },
          showStreet: {
            type: Boolean,
            default: true,
          },
          showCity: {
            type: Boolean,
            default: true,
          },
          showPostalCode: {
            type: Boolean,
            default: true,
          },
          showCountry: {
            type: Boolean,
            default: true,
          },
        },
        showEmail: {
          type: Boolean,
          default: true,
        },
        showPhone: {
          type: Boolean,
          default: true,
        },
        companyIdentifier: {
          showCompanyIdentifier: {
            type: Boolean,
            default: true,
          },
          label: {
            type: String,
            default: "ICE",
          },
        },
        taxID: {
          showTaxID: {
            type: Boolean,
            default: true,
          },
          label: {
            type: String,
            default: "IF",
          },
        },
        businessTax: {
          showBusinessTax: {
            type: Boolean,
            default: true,
          },
          label: {
            type: String,
            default: "TP",
          },
        },
        showLogo: {
          type: Boolean,
          default: false,
        },
        showSignature: {
          type: Boolean,
          default: false,
        },
      },
      client: {
        address: {
          showAddress: {
            type: Boolean,
            default: true,
          },
          showStreet: {
            type: Boolean,
            default: true,
          },
          showCity: {
            type: Boolean,
            default: true,
          },
          showPostalCode: {
            type: Boolean,
            default: true,
          },
          showCountry: {
            type: Boolean,
            default: true,
          },
        },
        showEmail: {
          type: Boolean,
          default: false,
        },
        showPhone: {
          type: Boolean,
          default: false,
        },
        companyIdentifier: {
          showCompanyIdentifier: {
            type: Boolean,
            default: true,
          },
          label: {
            type: String,
            default: "ICE",
          },
        },
        showLogo: {
          type: Boolean,
          default: true,
        },
      },
      showDueDate: {
        type: Boolean,
        default: true,
      },
      items: {
        showQuantity: {
          type: Boolean,
          default: true,
        },
        showTax: {
          type: Boolean,
          default: false,
        },
        showTotal: {
          type: Boolean,
          default: true,
        },
      },
      showTaxTotal: {
        type: Boolean,
        default: false,
      },
      showNotes: {
        type: Boolean,
        default: false,
      },
      colors: {
        type: [
          {
            label: String,
            value: String,
          },
        ],
        default: [
          {
            label: "Primary",
            value: "#5358e4",
          },
          {
            label: "Text",
            value: "#121722",
          },
          {
            label: "Text Light",
            value: "#60737D",
          },
          {
            label: "Background",
            value: "#ffffff",
          },
          {
            label: "Card",
            value: "#F2F5F9",
          },
        ],
      },
      language: {
        type: String,
        default: "en",
        enum: [
          "en",
          "fr",
          "es",
          "de",
          "it",
          "pt",
          "ar",
          "ru",
          "tr",
          "pl",
          "nl",
        ],
      },
    },
    template: {
      type: String,
      default: "default",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required!"],
    },
  },
  { timestamps: true }
);

const Invoice = models.Invoice || model("Invoice", InvoiceSchema);

export default Invoice;
