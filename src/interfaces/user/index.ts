export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRefreshToken {
  id?: string;
  email?: string;
  fullName?: string;
  role?: string;
  rToken?: string;
  aToken?: string;
  title?: string;
  avatar?: string;
  isSupervisor?: boolean;
}

export type IUserProfile = {
  _id?: string;
  title?: Level;
  level?: Level;
  paymentCategory?: Level;
  partner?: Partner;
  developerOnProjectsData?: DeveloperOnProjectsDatum[];
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  fullName?: string;
  email?: string;
  phone?: string;
  isActive?: boolean;
  role?: string;
  password?: string;
  isArchived?: boolean;
  userData?: UserData;
  currentSalary?: number;
  fixedSalary?: null;
  bankName?: string;
  bankAccount?: string;
  avatar?: string;
  cv?: string;
  allowToDownloadCV?: boolean;
  joinDate?: Date;
  dateOfBirth?: Date;
  placeOfBirth?: string;
  address?: string;
  nationality?: string;
  IDNumber?: string;
  IDIssueDate?: Date;
  IDIssuePlace?: string;
  major?: string;
  defaultRating?: number;
  defaultAdmin?: boolean;
  isSupervisor?: boolean;
  projects?: string[];
  projectsOfSupervisor?: string[];
  extraProjects?: any[];
  externalProjects?: any[];
  createdBy?: string;
  updatedBy?: string;
  titleId?: string;
  levelId?: string;
  paymentCategoryId?: string;
  partnerId?: string;
  diagramNodeId?: string;
};

export type DeveloperOnProjectsDatum = {
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  id?: string;
  projectType?: string;
  isSupervisor?: boolean;
  developer?: string;
  project?: string;
};

export type Level = {
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  _id?: string;
  value?: string;
  type?: string;
  scope?: string;
  isArchived?: boolean;
  updatedBy?: string;
};

export type Partner = {
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  _id?: string;
  fullName?: string;
  type?: string;
  category?: string;
  number?: string;
  address?: string;
  phone?: string;
  email?: string;
  taxCode?: string;
  billingAddress?: string;
  isArchived?: boolean;
  isDefault?: boolean;
  createdBy?: string;
  updatedBy?: string;
};

export type UserData = {};
