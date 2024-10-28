"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/UI/Button";
import Card from "@/components/UI/Card";
import ImagePreview from "@/components/UI/ImagePreview";
import LabelInput from "@/components/UI/LabelInput";
import ICompany from "@/types/ICompany";
import Loading from "@/components/UI/Loading";
import SignaturePad from "@/components/UI/SignaturePad";

const initialCompanyState: ICompany = {
  _id: "",
  name: "",
  address: {
    street: "",
    city: "",
    postalCode: "",
    country: "",
  },
  email: "",
  phone: "",
  identifiers: [{ label: "", value: "" }],
  logo: "",
  signature: "",
};

const CompanyDetailsForm = ({ companyId }: { companyId: string }) => {
  const [company, setCompany] = useState<ICompany>(initialCompanyState);
  const [logo, setLogo] = useState<File | undefined>();
  const [signature, setSignature] = useState<File | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const router = useRouter();
  const isNewCompany = companyId === "new";

  const fetchCompany = async () => {
    if (isNewCompany) {
      setDataLoaded(true);
      return;
    }

    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/company/${companyId}`
      );
      if (resp.ok) {
        const data = await resp.json();
        setCompany(data);
      } else {
        throw new Error(await resp.text());
      }
    } catch (error) {
      setError("Failed to fetch company details.");
      console.error(error);
    } finally {
      setDataLoaded(true);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, [companyId]);

  const addIdentifier = (p0: { label: string; value: string }) => {
    setCompany((prev) => ({
      ...prev,
      identifiers: [...prev.identifiers, { label: "", value: "" }],
    }));
  };

  const removeIdentifier = (index: number) => {
    setCompany((prev) => ({
      ...prev,
      identifiers: prev.identifiers.filter((_, i) => i !== index),
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setCompany((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setCompany((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    Object.entries(company).forEach(([key, value]) => {
      if (
        key !== "address" &&
        key !== "_id" &&
        key !== "logo" &&
        key !== "signature" &&
        key !== "identifiers"
      ) {
        formData.append(key, value as string);
      }
    });
    Object.entries(company.address).forEach(([key, value]) => {
      formData.append(key, value);
    });

    company.identifiers.forEach((id) => {
      formData.append(
        "identifiers[]",
        `{"label": "${id.label}", "value": "${id.value}"}`
      );
    });

    if (logo) formData.append("logo", logo);

    if (signature) formData.append("signature", signature);

    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/company${
          isNewCompany ? "" : `/${companyId}`
        }`,
        {
          method: isNewCompany ? "POST" : "PATCH",
          body: formData,
        }
      );

      if (resp.ok) {
        const data = await resp.json();
        router.push(`/companies/${data._id}`);
      } else {
        throw new Error(await resp.text());
      }
    } catch (error) {
      setError("Failed to save company details.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (isNewCompany) return;

    const confirm = window.confirm(
      "Are you sure you want to delete this company?"
    );
    if (!confirm) return;

    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/company/${companyId}`,
        {
          method: "DELETE",
        }
      );
      if (resp.ok) {
        router.push("/companies");
      } else {
        throw new Error(resp.statusText);
      }
    } catch (error) {
      setError("Failed to delete company.");
      console.error(error);
    }
  };

  return (
    <Card>
      {!dataLoaded && <Loading />}
      <h2>{isNewCompany ? "Create New Company" : "Edit Company Details"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4 md:items-end flex-col md:flex-row mb-6">
          <ImagePreview
            className="aspect-square w-60"
            file={logo}
            setFile={(f) => setLogo(f)}
            label="Logo"
            fileUrl={company.logo}
          />
          <LabelInput
            label="Name"
            value={company.name}
            setValue={(v) => handleInputChange("name", v)}
            placeholder="Enter a name"
            required
          />
        </div>
        <h2>Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <LabelInput
            label="Street"
            value={company.address.street}
            setValue={(v) => handleAddressChange("street", v)}
            className="md:col-span-full"
            placeholder="Enter an address"
            required
          />
          <LabelInput
            label="City"
            value={company.address.city}
            setValue={(v) => handleAddressChange("city", v)}
            placeholder="Enter a city"
            required
          />
          <LabelInput
            label="Postal code"
            value={company.address.postalCode}
            setValue={(v) => handleAddressChange("postalCode", v)}
            placeholder="Enter a postal code"
            required
          />
          <LabelInput
            label="Country"
            value={company.address.country || ""}
            setValue={(v) => handleAddressChange("country", v)}
            placeholder="Enter a country"
            required
          />
        </div>

        <h2>Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <LabelInput
            label="Email"
            type="email"
            value={company.email || ""}
            setValue={(v) => handleInputChange("email", v)}
            placeholder="Enter an email"
          />
          <LabelInput
            label="Phone"
            type="tel"
            value={company.phone || ""}
            setValue={(v) => handleInputChange("phone", v)}
            placeholder="Enter a phone"
          />
        </div>

        <h2>Identifiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 items-end">
          {company.identifiers.map((id, idx) => (
            <div key={idx} className="contents">
              <LabelInput
                label="Label"
                value={id.label}
                setValue={(v) =>
                  setCompany((prev) => ({
                    ...prev,
                    identifiers: prev.identifiers.map((i, iIdx) =>
                      iIdx === idx ? { ...i, label: v } : i
                    ),
                  }))
                }
                placeholder="Enter a label"
              />
              <LabelInput
                label="Value"
                value={id.value}
                setValue={(v) =>
                  setCompany((prev) => ({
                    ...prev,
                    identifiers: prev.identifiers.map((i, iIdx) =>
                      iIdx === idx ? { ...i, value: v } : i
                    ),
                  }))
                }
                placeholder="Enter a value"
              />
              <Button
                type="button"
                variant="default"
                onClick={() => removeIdentifier(idx)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => addIdentifier({ label: "", value: "" })}
            className="col-span-full"
          >
            Add Identifier
          </Button>
        </div>

        <h2>Signature</h2>
        <SignaturePad
          initialSignature={company.signature}
          onChange={setSignature}
        />

        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mt-6 flex justify-end gap-4">
          {!isNewCompany && (
            <Button variant="default" onClick={handleDelete} type="button">
              Delete
            </Button>
          )}
          <Button variant="primary" type="submit" loading={loading}>
            {isNewCompany ? "Create" : "Update"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CompanyDetailsForm;
