export type PaginatedResponse<T> = T & {
  pagination: {
    page: number;
    size: number;
    pages: number;
    total: number;
  }
}

export const buildPaginatedResponse = <T> (
  data: T,
  {page, size, count}: { page: number, size: number, count: number }
): PaginatedResponse<T> => {
  return {
    ...data,
    pagination: {
      page: page + 1,
      size,
      pages: Math.ceil(count / size),
      total: count,
    }
  }
}
