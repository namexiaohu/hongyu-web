export type CompanyLabelValue = {
  label: string;
  value: string;
};

export type CompanyTeamMember = {
  title: string;
  name: string;
};

export type CompanyOffice = {
  coverImage: string;
  name: string;
  location: string;
  phone: string;
  contactPerson: string;
  email: string;
};

export type CompanyPublicFile = {
  name: string;
  url: string;
};

export type StorefrontCompanyProfile = {
  locale: string;
  companyName: string;
  slogan: string;
  positioning: string;
  copyright: string;
  companyEmail: string;
  businessEmail: string;
  website: string;
  icpNumber: string;
  contactPhone: string;
  address: string;
  businessHours: string;
  businessHotline: string;
  basicInfo: CompanyLabelValue[];
  executives: CompanyTeamMember[];
  managers: CompanyTeamMember[];
  offices: CompanyOffice[];
  publicFiles: CompanyPublicFile[];
};

export type StorefrontCompanyBranding = {
  companyName: string;
  positioning: string;
  copyright: string;
  icpNumber: string;
};

export const EMPTY_COMPANY_PROFILE: StorefrontCompanyProfile = {
  locale: '',
  companyName: '',
  slogan: '',
  positioning: '',
  copyright: '',
  companyEmail: '',
  businessEmail: '',
  website: '',
  icpNumber: '',
  contactPhone: '',
  address: '',
  businessHours: '',
  businessHotline: '',
  basicInfo: [],
  executives: [],
  managers: [],
  offices: [],
  publicFiles: [],
};
