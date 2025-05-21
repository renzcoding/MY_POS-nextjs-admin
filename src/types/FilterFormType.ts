export interface FilterFormProps {
  fetchListData: () => void;
  pagination: {
    setCurrentPage: (page: number) => void;
    showAll: boolean;
    setShowAll: (value: boolean) => void;
  };
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
  currentSegment?: string;
}

export interface SearchAutocompleteProps {
  fetchListData: () => void;
  setFilters: React.Dispatch<
    React.SetStateAction<{
      name?: string;
      username?: string;
      firstname?: string;
      status?: string;
      email?: string;
    }>
  >;
  currentSegment?: string;
}
