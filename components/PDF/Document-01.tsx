/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import IInvoiceDetails from "@/types/IInvoiceDetails";
import labels from "./labels";

Font.register({
  family: "Rubik",
  fonts: [
    {
      src: "/fonts/rubik/Rubik-Black.ttf",
      fontStyle: "normal",
      fontWeight: 900,
    },
    {
      src: "/fonts/rubik/Rubik-BlackItalic.ttf",
      fontStyle: "italic",
      fontWeight: 900,
    },
    {
      src: "/fonts/rubik/Rubik-ExtraBold.ttf",
      fontStyle: "normal",
      fontWeight: 800,
    },
    {
      src: "/fonts/rubik/Rubik-ExtraBoldItalic.ttf",
      fontStyle: "italic",
      fontWeight: 800,
    },
    {
      src: "/fonts/rubik/Rubik-Bold.ttf",
      fontStyle: "normal",
      fontWeight: 700,
    },
    {
      src: "/fonts/rubik/Rubik-BoldItalic.ttf",
      fontStyle: "italic",
      fontWeight: 700,
    },
    {
      src: "/fonts/rubik/Rubik-SemiBold.ttf",
      fontStyle: "normal",
      fontWeight: 600,
    },
    {
      src: "/fonts/rubik/Rubik-SemiBoldItalic.ttf",
      fontStyle: "italic",
      fontWeight: 600,
    },
    {
      src: "/fonts/rubik/Rubik-Medium.ttf",
      fontStyle: "normal",
      fontWeight: 500,
    },
    {
      src: "/fonts/rubik/Rubik-MediumItalic.ttf",
      fontStyle: "italic",
      fontWeight: 500,
    },
    {
      src: "/fonts/rubik/Rubik-Regular.ttf",
      fontStyle: "normal",
      fontWeight: 400,
    },
    {
      src: "/fonts/rubik/Rubik-Italic.ttf",
      fontStyle: "italic",
      fontWeight: 400,
    },
    {
      src: "/fonts/rubik/Rubik-Light.ttf",
      fontStyle: "normal",
      fontWeight: 300,
    },
    {
      src: "/fonts/rubik/Rubik-LightItalic.ttf",
      fontStyle: "italic",
      fontWeight: 300,
    },
  ],
});

const MyDocument = ({ invoice }: { invoice: IInvoiceDetails }) => {
  const styles = StyleSheet.create({
    Text: {
      fontFamily: "Rubik",
      fontSize: 12,
      color:
        invoice.settings?.colors?.find((c) => c.label === "Text")?.value ||
        "#121722",
    },
    table: {
      width: "100%",
      marginBottom: 40,
      flexDirection: "column",
      gap: 0,
      padding: 20,
    },
    tableRow: {
      flexDirection: "row",
      gap: 0,
    },
    tableCell: {
      flexDirection: "column",
      justifyContent: "center",
      gap: 0,
      minHeight: 40,
      flex: 1,
      padding: 8,
    },
    tableCellHeader: {
      flexDirection: "column",
      justifyContent: "center",
      gap: 0,
      minHeight: 40,
      flex: 1,
      padding: 8,
    },
    tableCellContent: {
      fontFamily: "Rubik",
      fontSize: 12,
      color:
        invoice.settings?.colors?.find((c) => c.label === "Text")?.value ||
        "#121722",
    },
    tableCellHeaderContent: {
      fontFamily: "Rubik",
      fontSize: 12,
      color:
        invoice.settings?.colors?.find((c) => c.label === "Text Light")
          ?.value || "#60737D",
    },
    signature: {
      alignItems: "flex-end",
      gap: 8,
      marginTop: 40,
    },
  });

  const LabelValue = ({
    label,
    value,
    align = "flex-start",
    gap = 4,
    bold,
    color = invoice.settings?.colors?.find((c) => c.label === "Text")?.value ||
      "#121722",
  }: {
    label: string;
    value?: string | undefined;
    align?: "center" | "flex-start" | "flex-end";
    gap?: number;
    bold?: boolean;
    color?: string;
  }) => (
    <View style={{ flexDirection: "column", alignItems: align, gap: gap }}>
      <Text
        style={{
          fontFamily: "Rubik",
          color:
            invoice.settings?.colors?.find((c) => c.label === "Text Light")
              ?.value || "#60737D",
          fontSize: 10,
        }}
      >
        {label}
      </Text>
      {value && (
        <Text
          style={{
            fontFamily: "Rubik",
            fontSize: bold ? 14 : 11,
            fontWeight: bold ? 700 : 400,
            color: color,
          }}
        >
          {value}
        </Text>
      )}
    </View>
  );

  const InvoiceHeader = () => {
    return (
      <View
        style={{
          gap: 24,
          padding: 20,
          borderRadius: 12,
          marginBottom: 24,
          backgroundColor:
            invoice.settings?.colors?.find((c) => c.label === "Card")?.value ||
            "#F2F5F9",
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              ...styles.Text,
              fontSize: 20,
              fontWeight: 700,
              color:
                invoice.settings?.colors?.find((c) => c.label === "Text")
                  ?.value || "#121722",
            }}
          >
            {labels[invoice.settings?.language || "en"].invoice}
          </Text>
          <View>
            <LabelValue
              label={labels[invoice.settings?.language || "en"].invoiceNo}
              value={`#${invoice.invoiceNumber}`}
              bold
              align="flex-end"
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <ClientDetails />
          <View style={{ gap: 12 }}>
            <LabelValue
              label={labels[invoice.settings?.language || "en"].date}
              value={new Date(invoice.date).toLocaleDateString()}
              align="flex-end"
            />
            {invoice.settings?.showDueDate && (
              <LabelValue
                label="Due Date:"
                value={new Date(invoice.dueDate).toLocaleDateString()}
                align="flex-end"
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  const CompanyDetails = () => {
    return (
      <View
        style={{
          gap: 16,
          flexDirection: "row",
          flex: 2,
          alignItems: "flex-end",
          borderTop: `1px solid ${
            invoice.settings?.colors?.find((c) => c.label === "Card")
              ?.value || "#F2F5F9"
          }`,
          padding: 12,
        }}
      >
        <View style={{ flex: 1, gap: 12 }}>
          {invoice?.settings?.company?.showLogo && (
            <Image
              src={invoice.company.logo}
              style={{ width: 40, height: 40 }}
            />
          )}
          <Text
            style={[
              styles.Text,
              {
                fontWeight: 700,
                fontSize: 14,
                textTransform: "capitalize",
              },
            ]}
          >
            {invoice.company.name}
          </Text>
          {invoice.settings?.company?.address?.showAddress && (
            <View>
              {invoice.settings?.company?.address?.showStreet && (
                <Text style={styles.Text}>
                  {invoice.company.address.street}
                </Text>
              )}
              <Text style={styles.Text}>
                {invoice.settings?.company?.address?.showCity &&
                  invoice.company.address.city}{" "}
                {invoice.settings?.company?.address?.showPostalCode &&
                  invoice.company.address.postalCode}{" "}
                {invoice.settings?.company?.address?.showCountry &&
                  invoice.company.address.country}
              </Text>
            </View>
          )}
          {invoice.settings?.company?.showEmail && (
            <LabelValue
              label="Email:"
              gap={0}
              value={invoice.company.email}
              color={
                invoice.settings?.colors?.find((c) => c.label === "Primary")
                  ?.value || "#60737D"
              }
            />
          )}
          {invoice.settings?.company?.showPhone && (
            <LabelValue
              label="Télephone:"
              gap={0}
              value={invoice.company.phone}
            />
          )}
        </View>
        <View style={{ flex: 1 }}>
          {invoice.company.identifiers.map((identifier) => (
            <LabelValue
              gap={0}
              key={identifier.value}
              label={identifier.label}
              value={identifier.value}
            />
          ))}
        </View>
      </View>
    );
  };

  const ClientDetails = () => {
    return (
      <View style={{ gap: 8 }}>
        <LabelValue
          label={`${labels[invoice.settings?.language || "en"].billedTo}:`}
        />
        <Text style={[styles.Text, { fontWeight: 700, fontSize: 14 }]}>
          {invoice.client.name}
        </Text>
        {invoice.settings?.client?.address?.showAddress && (
          <View>
            {invoice.settings?.client?.address?.showStreet && (
              <Text style={styles.Text}>{invoice.client.address.street}</Text>
            )}
            <Text style={styles.Text}>
              {invoice.settings?.client?.address?.showCity &&
                invoice.client.address.city}{" "}
              {invoice.settings?.client?.address?.showPostalCode &&
                invoice.client.address.postalCode}{" "}
              {invoice.settings?.client?.address?.showCountry &&
                invoice.client.address.country}
            </Text>
          </View>
        )}
        {invoice.settings?.client?.showEmail && (
          <LabelValue label="Email:" value={invoice.client.email} />
        )}
        {invoice.settings?.client?.showPhone && (
          <LabelValue label="Télephone:" value={invoice.client.phone} />
        )}
        {invoice.client.identifiers.map((identifier) => (
          <LabelValue
            key={identifier.value}
            label={identifier.label}
            value={identifier.value}
          />
        ))}
      </View>
    );
  };

  const InvoiceItems = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCellHeader, { flex: 2 }]}>
              <Text style={styles.tableCellHeaderContent}>
                {labels[invoice.settings?.language || "en"].items.description}
              </Text>
            </View>
            {invoice.settings?.items?.showQuantity && (
              <View style={styles.tableCellHeader}>
                <Text style={styles.tableCellHeaderContent}>
                  {labels[invoice.settings?.language || "en"].items.quantity}
                </Text>
              </View>
            )}
            <View style={styles.tableCellHeader}>
              <Text style={styles.tableCellHeaderContent}>
                {labels[invoice.settings?.language || "en"].items.price}
              </Text>
            </View>
            {invoice.settings?.items?.showTax && (
              <View style={styles.tableCellHeader}>
                <Text style={styles.tableCellHeaderContent}>
                  {labels[invoice.settings?.language || "en"].items.tax}
                </Text>
              </View>
            )}
            {invoice.settings?.items?.showTotal && (
              <View style={styles.tableCellHeader}>
                <Text style={styles.tableCellHeaderContent}>
                  {labels[invoice.settings?.language || "en"].items.total}
                </Text>
              </View>
            )}
          </View>
          {invoice?.items.map((item) => (
            <View style={styles.tableRow} key={item.description}>
              <View style={[styles.tableCell, { flex: 2 }]}>
                <Text style={styles.tableCellContent}>
                  {item.description || "-"}
                </Text>
              </View>
              {invoice.settings?.items?.showQuantity && (
                <View style={styles.tableCell}>
                  <Text style={styles.tableCellContent}>
                    {item.quantity || "0"}
                  </Text>
                </View>
              )}
              <View style={styles.tableCell}>
                <Text style={styles.tableCellContent}>{item.price || "0"}</Text>
              </View>
              {invoice.settings?.items?.showTax && (
                <View style={styles.tableCell}>
                  <Text style={styles.tableCellContent}>
                    {item.tax || "0"}%
                  </Text>
                </View>
              )}
              {invoice.settings?.items?.showTotal && (
                <View style={styles.tableCell}>
                  <Text style={styles.tableCellContent}>
                    {item.total || item.price * item.quantity || "0"}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
        {invoice.settings?.showTaxTotal && (
          <View
            style={{
              flexDirection: "row",
              gap: 0,
              marginBottom: 40,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                height: "1px",
                backgroundColor:
                  invoice.settings?.colors?.find((c) => c.label === "Card")
                    ?.value || "#5358e4",
              }}
            >
              <Text>&nbsp;</Text>
            </View>
            <View
              style={{
                padding: 20,
                height: 40,
                borderRadius: 12,
                alignItems: "center",
                gap: 14,
                flexDirection: "row",
                backgroundColor:
                  invoice.settings?.colors?.find((c) => c.label === "Card")
                    ?.value || "#5358e4",
              }}
            >
              <View style={{ flexDirection: "row", gap: 4 }}>
                <Text
                  style={[
                    styles.Text,
                    {
                      fontSize: 12,
                      color:
                        invoice.settings?.colors?.find(
                          (c) => c.label === "Text Light"
                        )?.value || "#60737D",
                    },
                  ]}
                >
                  {labels[invoice.settings?.language || "en"].items.tax}
                </Text>
                <Text
                  style={[
                    styles.Text,
                    {
                      fontSize: 12,
                      color:
                        invoice.settings?.colors?.find(
                          (c) => c.label === "Text"
                        )?.value || "#121722",
                    },
                  ]}
                >
                  {invoice.currency}
                </Text>
              </View>
              <Text
                style={[
                  styles.Text,
                  {
                    fontWeight: 700,
                    fontSize: 16,
                    color:
                      invoice.settings?.colors?.find((c) => c.label === "Text")
                        ?.value || "#121722",
                  },
                ]}
              >
                {invoice.taxTotal}
              </Text>
            </View>
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            gap: 0,
            marginTop: 12,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              height: "1px",
              backgroundColor:
                invoice.settings?.colors?.find((c) => c.label === "Card")
                  ?.value || "#5358e4",
            }}
          >
            <Text>&nbsp;</Text>
          </View>
          <View
            style={{
              padding: 20,
              height: 40,
              borderRadius: 12,
              alignItems: "center",
              gap: 14,
              flexDirection: "row",
              backgroundColor:
                invoice.settings?.colors?.find((c) => c.label === "Card")
                  ?.value || "#5358e4",
            }}
          >
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text
                style={[
                  styles.Text,
                  {
                    fontSize: 12,
                    color:
                      invoice.settings?.colors?.find(
                        (c) => c.label === "Text Light"
                      )?.value || "#60737D",
                  },
                ]}
              >
                {labels[invoice.settings?.language || "en"].total}
              </Text>
              <Text
                style={[
                  styles.Text,
                  {
                    fontSize: 12,
                    color:
                      invoice.settings?.colors?.find((c) => c.label === "Text")
                        ?.value || "#121722",
                  },
                ]}
              >
                ({invoice.currency})
              </Text>
            </View>
            <Text
              style={[
                styles.Text,
                {
                  fontWeight: 700,
                  fontSize: 16,
                  color:
                    invoice.settings?.colors?.find((c) => c.label === "Text")
                      ?.value || "#121722",
                },
              ]}
            >
              {invoice.total}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <Document>
      <Page
        size="A4"
        style={{
          backgroundColor:
            invoice.settings?.colors?.find((c) => c.label === "Background")
              ?.value || "#ffffff",
          padding: 10,
          fontSize: 12,
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <InvoiceHeader />

        <InvoiceItems />

        {invoice.settings?.company?.showSignature && (
          <View style={styles.signature}>
            <Text
              style={{
                width: "100",
                fontFamily: "Rubik",
                fontWeight: 700,
                color:
                  invoice.settings?.colors?.find((c) => c.label === "Text")
                    ?.value || "#333",
              }}
            >
              Signature
            </Text>
            {
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={invoice.company.signature} style={{ width: "100" }} />
            }
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            gap: 16,
            alignItems: "flex-end",
          }}
        >
          <CompanyDetails />
          {invoice.settings?.showNotes && (
            <View style={{ flex: 1 }}>
              <Text style={[styles.Text, { fontWeight: 700 }]}>
                {labels[invoice.settings?.language || "en"].notes}
              </Text>
              <Text style={styles.Text}>{invoice.notes}</Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
