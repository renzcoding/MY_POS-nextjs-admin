export interface FilterFormProps {
  fetchSuppliers: () => void;
  setCurrentPage: (page: number) => void;
  showAll: boolean;
  setShowAll: (value: boolean) => void;
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
  //   filterName: string;
  //   filterStatus: string;
  //   filterEmail: string;
  //   setFilterName: (name: string) => void;
  //   setFilterStatus: (status: string) => void;
  //   setFilterEmail: (email: string) => void;

  //   fetchSuppliers: () => void;
  //   pagination: {
  //     showAll: boolean;
  //     setShowAll: (value: boolean) => void;
  //     setCurrentPage: (page: number) => void;
  //   };
  //   filters: {
  //     name: string;
  //     status: string;
  //     email: string;
  //   };
  //   setFilters: React.Dispatch<
  //     React.SetStateAction<{
  //       name: string;
  //       status: string;
  //       email: string;
  //     }>
  //   >;
}
