export interface PaginatedResult<T> {
  result: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export const createPaginatedResult = <T>({
  items,
  page,
  pageSize,
}: {
  items: T[];
  pageSize: number;
  page: number;
}): PaginatedResult<T> => {
  const total = items.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const result = items.slice(startIndex, endIndex);

  return {
    result,
    pagination: {
      page,
      pageSize,
      total,
      totalPages,
    },
  };
};
