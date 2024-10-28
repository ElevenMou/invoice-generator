"use client";

import React, { useEffect } from "react";
import Button from "@/components/UI/Button";
import LabelInput from "@/components/UI/LabelInput";
import DatePicker from "react-datepicker";
import CompaniesSelect from "@/app/(protected)/companies/CompaniesSelect";
import ClientsSelect from "@/app/(protected)/clients/ClientsSelect";
import Card from "@/components/UI/Card";
import IInvoiceDetails from "@/types/IInvoiceDetails";

const InvoiceDetailsForm = ({
  invoice,
  setInvoice,
}: {
  invoice: IInvoiceDetails;
  setInvoice: React.Dispatch<React.SetStateAction<IInvoiceDetails>>;
}) => {
  const handleInputChange = (field: keyof IInvoiceDetails, value: any) => {
    setInvoice((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    setInvoice((prev) => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };

      // Recalculate item total
      const item = newItems[index];
      item.total = item.quantity * item.price;
      if (item.tax) {
        item.total += item.total * (item.tax / 100);
      }

      return { ...prev, items: newItems };
    });
  };

  const addItem = () => {
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", quantity: 1, price: 0, total: 0 }],
    }));
  };

  const removeItem = (index: number) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const calculateTotals = () => {
    let subtotal = 0;
    let taxTotal = 0;

    invoice.items.forEach((item) => {
      subtotal += item.price * item.quantity;
      if (item.tax) {
        taxTotal += (item.price * item.quantity * item.tax) / 100;
      }
    });

    const total = subtotal + taxTotal;

    setInvoice((prev) => ({ ...prev, subtotal, taxTotal, total }));
  };

  useEffect(() => {
    calculateTotals();
  }, [invoice.items]);

  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <LabelInput
          label="Invoice Number"
          value={invoice.invoiceNumber}
          setValue={(v) => handleInputChange("invoiceNumber", v)}
          required
        />
        <LabelInput label="Invoice Date">
          <DatePicker
            selected={invoice.date}
            onChange={(date) => handleInputChange("date", date)}
            required
          />
        </LabelInput>

        <LabelInput label="Due Date">
          <DatePicker
            selected={invoice.dueDate}
            onChange={(date) => handleInputChange("dueDate", date)}
            required
          />
        </LabelInput>
        <LabelInput
          label="Company"
          value={invoice.company._id}
          setValue={(v) => handleInputChange("company", v)}
          required
        >
          <CompaniesSelect
            setValue={(v) => handleInputChange("company", v)}
            value={invoice.company._id}
          />
        </LabelInput>
        <LabelInput
          label="Client"
          value={invoice.client._id}
          setValue={(v) => handleInputChange("client", v)}
          required
        >
          <ClientsSelect
            setValue={(v) => handleInputChange("client", v)}
            value={invoice.client._id}
          />
        </LabelInput>
        <LabelInput
          label="Currency"
          value={invoice.currency}
          setValue={(v) => handleInputChange("currency", v)}
          required
        />
      </div>

      <h2 className="mt-4">Items ({invoice.items.length})</h2>
      <table className="mb-6 mt-2">
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Tax (%)</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index}>
              <td data-header="Description">
                <LabelInput
                  value={item.description || ""}
                  setValue={(v) => handleItemChange(index, "description", v)}
                  placeholder="Item Description"
                />
              </td>
              <td className="w-full md:w-32" data-header="Quantity">
                <LabelInput
                  value={item.quantity.toString()}
                  setValue={(v) =>
                    handleItemChange(index, "quantity", Number(v))
                  }
                  type="number"
                  required
                />
              </td>
              <td className="w-full md:w-32" data-header="Price">
                <LabelInput
                  value={item.price.toString()}
                  setValue={(v) => handleItemChange(index, "price", Number(v))}
                  type="number"
                  required
                />
              </td>
              <td className="w-full md:w-32" data-header="Tax (%)">
                <LabelInput
                  value={item.tax?.toString() || ""}
                  setValue={(v) => handleItemChange(index, "tax", Number(v))}
                  type="number"
                />
              </td>
              <td data-header="Total">
                <span className="pb-2">{item.total.toFixed(2)}</span>
              </td>
              <td>
                <Button
                  type="button"
                  onClick={() => removeItem(index)}
                  variant="default"
                  className="w-full"
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>
              <Button
                type="button"
                onClick={addItem}
                variant="primary"
                className="w-full"
              >
                Add Item
              </Button>
            </td>
          </tr>
          <tr>
            <td colSpan={1}>
              <strong>Subtotal: </strong> {invoice.subtotal.toFixed(2)}
              {invoice.currency}
            </td>
            <td colSpan={2}>
              <strong>Tax Total: </strong> {invoice.taxTotal.toFixed(2)}
              {invoice.currency}
            </td>
            <td colSpan={3}>
              <strong>Total: </strong> {invoice.total.toFixed(2)}
              {invoice.currency}
            </td>
          </tr>
        </tfoot>
      </table>

      <LabelInput label="Notes" className="mt-4">
        <textarea
          value={invoice.notes || ""}
          onChange={(e) => handleInputChange("notes", e.target.value)}
          placeholder="Enter notes here..."
          style={{ height: "100px" }}
        />
      </LabelInput>
    </Card>
  );
};

export default InvoiceDetailsForm;
