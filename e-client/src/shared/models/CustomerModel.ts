interface Name {
  first?: string;
  last?: string;
}
export interface Address {
  street?: string;
  city?: string;
  country?: string;
  pincode?: number;
}
interface cardDetails {
  cardNumber?: number;
  cardHolder?: string;
  cardType?: string;
  cvv?: number;
}

interface IObjectKeys {
  [key: string]: string | any;
}

interface Customer extends IObjectKeys {
  customerId?: number;
  name?: Name;
  mobile?: string;
  email?: string;
  password?: string;
  avatar?: string | File;
  status?: number;
  gender?: string;
  dob?: Date | File | string;
  address?: Address;
  cardDetails?: cardDetails;
  orders?: [];
  rating?: [];
}

export default Customer;
