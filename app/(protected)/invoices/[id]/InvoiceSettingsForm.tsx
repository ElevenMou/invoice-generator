"use client";

import React from "react";
import LabelInput from "@/components/UI/LabelInput";
import Card from "@/components/UI/Card";
import IInvoiceDetails from "@/types/IInvoiceDetails";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import Button from "@/components/UI/Button";
import pdfTemplate from "@/components/PDF/templates";

const InvoiceSettingsForm: React.FC<{
  invoice: IInvoiceDetails;
  setInvoice: React.Dispatch<React.SetStateAction<IInvoiceDetails>>;
}> = ({ invoice, setInvoice }) => {
  const handleCompanyAddressChange = (key: string) => {
    setInvoice((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        company: {
          ...prev.settings?.company,
          address: {
            ...prev.settings?.company?.address,
            [key]:
              !prev.settings?.company?.address?.[
                key as keyof typeof prev.settings.company.address
              ],
          },
        },
      },
    }));
  };

  const handleCompanySettingsChange = (k: string) => {
    setInvoice((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        company: {
          ...prev.settings?.company,
          [k]: !prev.settings?.company?.[
            k as keyof typeof prev.settings.company
          ],
        },
      },
    }));
  };

  const handleClientAddressChange = (key: string) => {
    setInvoice((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        client: {
          ...prev.settings?.client,
          address: {
            ...prev.settings?.client?.address,
            [key]:
              !prev.settings?.client?.address?.[
                key as keyof typeof prev.settings.client.address
              ],
          },
        },
      },
    }));
  };

  const handleClientSettingsChange = (k: string) => {
    setInvoice((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        client: {
          ...prev.settings?.client,
          [k]: !prev.settings?.client?.[k as keyof typeof prev.settings.client],
        },
      },
    }));
  };
  const handleItemsSettingsChange = (k: string) => {
    setInvoice((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        items: {
          ...prev.settings?.items,
          [k]: !prev.settings?.items?.[k as keyof typeof prev.settings.items],
        },
      },
    }));
  };

  const handleColorSettingsChange = (index: number, value: string) => {
    let colors = invoice.settings?.colors?.map((color, i) =>
      i === index ? { ...color, value } : color
    );
    setInvoice((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        colors: colors,
      },
    }));
  };

  const handleSettingsChange = (k: string) => {
    setInvoice((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        [k]: !prev.settings?.[k as keyof typeof prev.settings],
      },
    }));
  };

  return (
    <Card>
      <div className="flex justify-between gap-3 flex-wrap">
        <h2>Colors</h2>
        <Button
          variant="link"
          type="button"
          onClick={() => {
            let defaultColors = pdfTemplate.find(
              (t) => t.id === invoice.template
            )?.colors;
            if (defaultColors) {
              setInvoice((prev) => ({
                ...prev,
                settings: {
                  ...prev.settings,
                  colors: defaultColors,
                },
              }));
            }
          }}
        >
          Reset
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-3 px-6">
        {invoice.settings?.colors?.map((color, index) => (
          <LabelInput
            key={index}
            label={color.label}
            setValue={(v) => handleColorSettingsChange(index, v)}
            type="color"
            value={color.value}
          />
        ))}
      </div>

      <h2 className="mt-6">Language</h2>
      <div className="px-6 mt-3">
        <LabelInput label="Select language">
          <LanguageSwitcher
            value={invoice.settings?.language}
            setValue={(v) => {
              setInvoice((prev) => ({
                ...prev,
                settings: {
                  ...prev.settings,
                  language: v,
                },
              }));
            }}
          />
        </LabelInput>
      </div>
      <h2 className="mt-6">Company</h2>
      <div className="px-6">
        <h3 className="mt-3">Address</h3>
        <LabelInput
          label="Show Address"
          onClick={() => handleCompanyAddressChange("showAddress")}
          type="checkbox"
          checked={invoice.settings?.company?.address?.showAddress}
          className="mt-3"
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3">
          {invoice.settings?.company?.address?.showAddress && (
            <>
              <LabelInput
                label="Show Street"
                onClick={() => handleCompanyAddressChange("showStreet")}
                type="checkbox"
                checked={invoice.settings?.company?.address?.showStreet}
              />
              <LabelInput
                label="Show City"
                onClick={() => handleCompanyAddressChange("showCity")}
                type="checkbox"
                checked={invoice.settings?.company?.address?.showCity}
              />
              <LabelInput
                label="Show Postal Code"
                onClick={() => handleCompanyAddressChange("showPostalCode")}
                type="checkbox"
                checked={invoice.settings?.company?.address?.showPostalCode}
              />
              <LabelInput
                label="Show Country"
                onClick={() => handleCompanyAddressChange("showCountry")}
                type="checkbox"
                checked={invoice.settings?.company?.address?.showCountry}
              />
            </>
          )}
        </div>

        <h3 className="mt-3">Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3">
          <LabelInput
            label="Show Email"
            onClick={() => handleCompanySettingsChange("showEmail")}
            type="checkbox"
            checked={invoice.settings?.company?.showEmail}
          />
          <LabelInput
            label="Show Phone"
            onClick={() => handleCompanySettingsChange("showPhone")}
            type="checkbox"
            checked={invoice.settings?.company?.showPhone}
          />
        </div>

        <h3 className="mt-3">Others</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3">
          <LabelInput
            label="Show logo"
            onClick={() => handleCompanySettingsChange("showLogo")}
            type="checkbox"
            checked={invoice.settings?.company?.showLogo}
          />
          <LabelInput
            label="Show Signature"
            onClick={() => handleCompanySettingsChange("showSignature")}
            type="checkbox"
            checked={invoice.settings?.company?.showSignature}
          />
        </div>
      </div>
      <h2 className="mt-6">Client</h2>
      <div className="px-6">
        <h3 className="mt-3">Address</h3>
        <LabelInput
          label="Show Address"
          onClick={() => handleClientAddressChange("showAddress")}
          type="checkbox"
          checked={invoice.settings?.client?.address?.showAddress}
          className="mt-3"
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3">
          {invoice.settings?.client?.address?.showAddress && (
            <>
              <LabelInput
                label="Show Street"
                onClick={() => handleClientAddressChange("showStreet")}
                type="checkbox"
                checked={invoice.settings?.client?.address?.showStreet}
              />
              <LabelInput
                label="Show City"
                onClick={() => handleClientAddressChange("showCity")}
                type="checkbox"
                checked={invoice.settings?.client?.address?.showCity}
              />
              <LabelInput
                label="Show Postal Code"
                onClick={() => handleClientAddressChange("showPostalCode")}
                type="checkbox"
                checked={invoice.settings?.client?.address?.showPostalCode}
              />
              <LabelInput
                label="Show Country"
                onClick={() => handleClientAddressChange("showCountry")}
                type="checkbox"
                checked={invoice.settings?.client?.address?.showCountry}
              />
            </>
          )}
        </div>

        <h3 className="mt-3">Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3">
          <LabelInput
            label="Show Email"
            onClick={() => handleClientSettingsChange("showEmail")}
            type="checkbox"
            checked={invoice.settings?.client?.showEmail}
          />
          <LabelInput
            label="Show Phone"
            onClick={() => handleClientSettingsChange("showPhone")}
            type="checkbox"
            checked={invoice.settings?.client?.showPhone}
          />
        </div>

        <h3 className="mt-3">Others</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3">
          <LabelInput
            label="Show logo"
            onClick={() => handleClientSettingsChange("showLogo")}
            type="checkbox"
            checked={invoice.settings?.client?.showLogo}
          />
        </div>
      </div>
      <h2 className="mt-6">Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3 px-6">
        <LabelInput
          label="Show Quantity"
          onClick={() => handleItemsSettingsChange("showQuantity")}
          type="checkbox"
          checked={invoice.settings?.items?.showQuantity}
        />
        <LabelInput
          label="Show Tax"
          onClick={() => handleItemsSettingsChange("showTax")}
          type="checkbox"
          checked={invoice.settings?.items?.showTax}
        />
        <LabelInput
          label="Show Total"
          onClick={() => handleItemsSettingsChange("showTotal")}
          type="checkbox"
          checked={invoice.settings?.items?.showTotal}
        />
      </div>

      <h2 className="mt-6">Others</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3 px-6">
        <LabelInput
          label="Show Due Date"
          onClick={() => handleSettingsChange("showDueDate")}
          type="checkbox"
          checked={invoice.settings?.showDueDate}
        />
        <LabelInput
          label="Show Tax Total"
          onClick={() => handleSettingsChange("showTaxTotal")}
          type="checkbox"
          checked={invoice.settings?.showTaxTotal}
        />
        <LabelInput
          label="Show Notes"
          onClick={() => handleSettingsChange("showNotes")}
          type="checkbox"
          checked={invoice.settings?.showNotes}
        />
      </div>
    </Card>
  );
};

export default InvoiceSettingsForm;
