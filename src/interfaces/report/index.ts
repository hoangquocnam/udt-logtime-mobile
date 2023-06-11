export interface ReportDetail {
  userName: string;
  defaultRating: number;
  projectName: string;
  paymentCategory: string[];
  rateExchange: number;
  currency: string;
  totalWorkingTime: number;
  totalSalary: number;
}

export interface TimeSheet {
  fixed: any[];
  hourly: Hourly[];
}

export interface Hourly {
  _id: string;
  taskName: string;
  description: string;
  hourlyRate: number;
  rateExchange: number;
  currency: Currency;
  workingTime: number;
  salary: number;
  startTime: Date;
  endTime: Date;
  isAdminUpdated: boolean;
  isUpdated: boolean;
}

export enum Currency {
  Usd = "USD",
}
