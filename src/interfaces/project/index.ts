export interface ProjectDetail {
  _id: string;
  name: string;
  companyName: string;
  companyWebsite: string;
  companyPhone: string;
  country: string;
  logo: string;
  customer: string;
  address: string;
  customerEmail: string;
  customerPhone: string;
  paymentCategory: string;
  paymentPeriod: number;
  currency: string;
  partner: null;
  partnerId: string;
  startedDate: Date;
  endedDate: null;
  neededDeveloperNumber: number;
  type: string[];
  technology: string[];
  untilNow: boolean;
  margin: number;
  commitedHours: number;
  requiredTag: boolean;
  isPastLock: boolean;
  canOverlap: boolean;
  countryId: {
    _id: string;
    value: string;
  }
}
