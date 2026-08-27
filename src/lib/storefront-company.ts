export type CompanyLabelValue = {
  label: string;
  value: string;
};

export type CompanyTeamLevel = 'executive' | 'manager' | 'staff';

export type CompanyTeamMember = {
  id: string;
  level: CompanyTeamLevel;
  sortOrder: number;
  name: string;
  title: string;
  email: string;
  contact: string;
  region: string;
  avatarUrl: string;
  supervisorId: string;
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
  managementTeam: CompanyTeamMember[];
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
  managementTeam: [],
  offices: [],
  publicFiles: [],
};

export function membersAtLevel(team: CompanyTeamMember[] | undefined, level: CompanyTeamLevel) {
  return (team ?? [])
    .filter((member) => member.level === level && member.name.trim())
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function staffForManager(team: CompanyTeamMember[] | undefined, managerId: string) {
  return (team ?? [])
    .filter((member) => member.level === 'staff' && member.supervisorId === managerId && member.name.trim())
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
