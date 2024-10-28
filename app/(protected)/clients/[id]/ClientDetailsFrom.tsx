"use client";

import { useEffect, useState } from "react";
import Button from "@/components/UI/Button";
import Card from "@/components/UI/Card";
import ImagePreview from "@/components/UI/ImagePreview";
import LabelInput from "@/components/UI/LabelInput";
import IClient from "@/types/IClient";
import Loading from "@/components/UI/Loading";
import { useRouter } from "next/navigation";

const initialClientState: IClient = {
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
};

const ClientDetailsForm = ({ clientId }: { clientId: string }) => {
  const [client, setClient] = useState<IClient>(initialClientState);
  const [logo, setLogo] = useState<File | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const router = useRouter();
  const isNewClient = clientId === "new";

  const fetchClient = async () => {
    if (isNewClient) {
      setDataLoaded(true);
      return;
    }

    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/client/${clientId}`
      );
      if (resp.ok) {
        const data = await resp.json();
        setClient(data);
      } else {
        throw new Error(await resp.text());
      }
    } catch (error) {
      setError("Failed to fetch client details.");
      console.error(error);
    } finally {
      setDataLoaded(true);
    }
  };

  useEffect(() => {
    fetchClient();
  }, [clientId]);

  const handleInputChange = (field: string, value: string) => {
    setClient((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addIdentifier = (p0: { label: string; value: string; }) => {
    setClient((prev) => ({
      ...prev,
      identifiers: [...prev.identifiers, { label: "", value: "" }],
    }));
  };

  const removeIdentifier = (index: number) => {
    setClient((prev) => ({
      ...prev,
      identifiers: prev.identifiers.filter((_, i) => i !== index),
    }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setClient((prev) => ({
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
    Object.entries(client).forEach(([key, value]) => {
      if (
        key !== "address" &&
        key !== "_id" &&
        key !== "logo" &&
        key !== "identifiers"
      ) {
        formData.append(key, value as string);
      }
    });
    Object.entries(client.address).forEach(([key, value]) => {
      formData.append(key, value);
    });

    client.identifiers.forEach((id) => {
      formData.append(
        "identifiers[]",
        `{"label": "${id.label}", "value": "${id.value}"}`
      );
    });

    if (logo) formData.append("logo", logo);

    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/client${
          isNewClient ? "" : `/${clientId}`
        }`,
        {
          method: isNewClient ? "POST" : "PATCH",
          body: formData,
        }
      );

      if (resp.ok) {
        const data = await resp.json();
        router.push(`/clients/${data._id}`);
      } else {
        throw new Error(await resp.text());
      }
    } catch (error) {
      setError("Failed to save client details.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (isNewClient) return;

    const confirm = window.confirm(
      "Are you sure you want to delete this client?"
    );
    if (!confirm) return;

    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/client/${clientId}`,
        {
          method: "DELETE",
        }
      );
      if (resp.ok) {
        router.push("/clients");
      } else {
        throw new Error(resp.statusText);
      }
    } catch (error) {
      setError("Failed to delete client.");
      console.error(error);
    }
  };

  return (
    <Card>
      {!dataLoaded && <Loading />}
      <h2>{isNewClient ? "Create New Client" : "Edit Client Details"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4 md:items-end flex-col md:flex-row mb-6">
          <ImagePreview
            className="aspect-square w-60"
            file={logo}
            setFile={(f) => setLogo(f)}
            label="Logo"
            fileUrl={client.logo}
          />
          <LabelInput
            label="Name"
            value={client.name}
            setValue={(v) => handleInputChange("name", v)}
            placeholder="Enter a name"
            required
          />
        </div>
        <h2>Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <LabelInput
            label="Street"
            value={client.address.street}
            setValue={(v) => handleAddressChange("street", v)}
            className="md:col-span-full"
            placeholder="Enter an address"
            required
          />
          <LabelInput
            label="City"
            value={client.address.city}
            setValue={(v) => handleAddressChange("city", v)}
            placeholder="Enter a city"
            required
          />
          <LabelInput
            label="Postal code"
            value={client.address.postalCode}
            setValue={(v) => handleAddressChange("postalCode", v)}
            placeholder="Enter a postal code"
            required
          />
          <LabelInput
            label="Country"
            value={client.address.country || ""}
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
            value={client.email || ""}
            setValue={(v) => handleInputChange("email", v)}
            placeholder="Enter an email"
          />
          <LabelInput
            label="Phone"
            type="tel"
            value={client.phone || ""}
            setValue={(v) => handleInputChange("phone", v)}
            placeholder="Enter a phone"
          />
        </div>

        <h2 className="mb-4">Identifiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 items-end">
          {client.identifiers.map((id, idx) => (
            <div key={idx} className="contents">
              <LabelInput
                label="Label"
                value={id.label}
                setValue={(v) =>
                  setClient((prev) => ({
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
                  setClient((prev) => ({
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
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mt-6 flex justify-end gap-4">
          {!isNewClient && (
            <Button variant="default" onClick={handleDelete} type="button">
              Delete
            </Button>
          )}
          <Button variant="primary" type="submit" loading={loading}>
            {isNewClient ? "Create" : "Update"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ClientDetailsForm;
