import { customerData } from "@/utlils/dataTableForms";

export type CustomerInputProps = {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  address?: string;
  description?: string;
  firstname?: string;
  lastname?: string;
  birthday?: any;
  genderId?: number;
  civil_StatusId?: number;
  nationality: number;
  mobile?: string;
  telp?: string;
  fax?: string;
  cityId?: number;
  stateId?: number;
  countryId?: number;
  districtId?: number;
  zipCodeId?: number;
  companyName?: string;
  companyAddress?: string;
  companyCityId?: number;
  companyStateId?: number;
  companyContryId?: number;
  companyZipCodeId?: number;
  membership_typeId?: number;
  alternativeCustomerId?: string;
  cashierId?: number;
  startDate?: any;
  expiryDate?: any;
  taxNumber?: string;
  notes?: string;
  status?: string;
  userId?: number;
  createdAt?: any;
  updatedAt?: any;
};

export type CustomerFilters = {
  name?: string;
  username?: string;
  firstname?: string;
  status?: string;
  email?: string;
};

export interface CustomerTableViewsProps {
  filters: {
    name?: string;
    username?: string;
    firstname?: string;
    status?: string;
    email?: string;
  };

  setFilters: React.Dispatch<
    React.SetStateAction<{
      name?: string;
      username?: string;
      firstname?: string;
      status?: string;
      email?: string;
    }>
  >;
  pagination: {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;
    showAll: boolean;
    setShowAll: (value: boolean) => void;
    limit: number;
  };
  tableState: {
    data: CustomerInputProps[];
    setData: (data: CustomerInputProps[]) => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
    hasFetched: boolean;
    setHasFetched: (value: boolean) => void;
    selectedIds: number[];
    setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
  };
  fetchListData: () => void;
  currentSegment: string;
}

export interface CustomerFormViewsProps {
  defaultValues: typeof customerData;
  id?: number;
  data: typeof customerData;
  currentSegment?: string;
}
export type CustomerFormHandleProps = {
  getValues: () => CustomerInputProps;
  reset: () => void;
  setValues: (values: CustomerInputProps) => void;
};
