export interface SupplierFormValuesType {
  id?: number;
  name: string;
  email: string;
  address?: string;
  phone?: string;
  userId?: any;
}

export type SupplierInput = {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  userId?: any;
  createdAt?: any;
  updatedAt?: any;
  status?: string;
};

export interface SupplierActionViewsProps {
  mode: "create" | "edit";
  id?: number; // id diperlukan saat edit
}

export interface SupplierContainerFormProps {
  id?: number; // id optional, kalau ada berarti Edit, kalau nggak berarti Create
}

/* export interface SupplierTableViewsProps {
  // onDataReady: (data: SupplierInput[]) => void;
  setData: (data: SupplierInput[]) => void;
  data: SupplierInput[];
  setLoading: (loading: boolean) => void;
  loading: boolean;
  fetchSuppliers: () => void;
  setShowAll: (showAll: boolean) => void;
  showAll: boolean;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  currentPage: number;
  currentSegment: string;
  filterName: string;
  filterStatus: string;
  filterEmail: string;
  setFilterName: (name: string) => void;
  setFilterStatus: (status: string) => void;
  setFilterEmail: (email: string) => void;
  hasFetched: boolean;
} */

export interface SupplierTableViewsProps {
  // filterName: string;
  // filterStatus: string;
  // filterEmail: string;
  // setFilterName: (name: string) => void;
  // setFilterStatus: (status: string) => void;
  // setFilterEmail: (email: string) => void;
  filters: {
    name: string;
    status: string;
    email: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      name: string;
      status: string;
      email: string;
    }>
  >;
  pagination: {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
    showAll: boolean;
    setShowAll: (value: boolean) => void;
    limit: number;
  };
  tableState: {
    data: SupplierInput[];
    setData: (data: SupplierInput[]) => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
    hasFetched: boolean;
  };
  fetchSuppliers: () => void;
  currentSegment: string;
}
