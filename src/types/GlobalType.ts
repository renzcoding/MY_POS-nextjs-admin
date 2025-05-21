import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AlertProps } from "./AlertType";
import { globalData } from "@/utlils/dataTableForms";

export interface GlobalInputProps {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  address?: string;
  description?: string;
  createdAt?: any;
  updatedAt?: any;
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
}

export interface GlobalTableViewsProps {
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
  >; // ✅ Not optional
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
    data: GlobalInputProps[];
    setData: (data: GlobalInputProps[]) => void;
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

export interface GlobalFetchListDataProps {
  filters: {
    name?: string;
    username?: string;
    firstname?: string;
    status?: string;
    email?: string;
  };
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
    data: GlobalInputProps[];
    setData: (data: GlobalInputProps[]) => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
    hasFetched: boolean;
    setHasFetched: (value: boolean) => void;
    selectedIds: number[];
    setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
  };
  currentSegment: string;
}

export interface GlobalButtonSelectedProps {
  tableState: {
    data: GlobalInputProps[];
    setData: (data: GlobalInputProps[]) => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
    hasFetched?: boolean;
    selectedIds: number[];
    setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
  };
  fetchListData: () => void;
  currentSegment?: string;
}

export interface GlobalCheckAllSelectedProps {
  tableState: {
    data: GlobalInputProps[];
    setData: (data: GlobalInputProps[]) => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
    hasFetched: boolean;
    selectedIds: number[];
    setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
  };
}

export interface GlobalDeleteButtonListProps {
  fetchListData: () => void;
  tableState: {
    data: GlobalInputProps[];
    setData: (data: GlobalInputProps[]) => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
  };
  currentSegment: string;
  item: any;
}

export interface GlobalPaginationListButtonProps {
  pagination: {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;
    showAll: boolean;
    setShowAll: (value: boolean) => void;
    limit: number;
  };
}

export interface GlobalFormValuesProps {
  id?: number;
  name: string;
  email: string;
  address?: string;
  phone?: string;
  status?: string;
  userId?: any;
}

export interface GlobalFormViewsProps {
  defaultValues?: Partial<GlobalInputProps>;
  currentSegment?: string;
  id?: number;
  data: typeof globalData;
}
export type GlobalFormHandleProps = {
  getValues: () => GlobalInputProps;
  reset: () => void;
  setValues: (values: GlobalInputProps) => void;
};

export interface GlobalToHandleSaveToComponentCardProps {
  router: AppRouterInstance;
  currentSegment: string;
  id: any;
  setLoading: (value: boolean) => void;
  setSuccess: (value: boolean) => void;
  formRef: React.RefObject<any>; // Atau spesifik: React.RefObject<FormComponentType>
  setAlert: React.Dispatch<React.SetStateAction<AlertProps | null>>;
}

export type GlobalFilters = {
  name?: string;
  username?: string;
  firstname?: string;
  status?: string;
  email?: string;
};
