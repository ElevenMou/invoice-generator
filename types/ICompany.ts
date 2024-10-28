interface ICompany {
  _id: string;
  name: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country?: string;
  };
  email?: string;
  phone?: string;
  identifiers: Array<{ label: string; value: string }>;
  logo?: string;
  signature?: string;
}

export default ICompany;
