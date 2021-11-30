export type Paginated<T> = {
  offset: number;
  limit: number;
  total: number;
  items: Array<T>;
};
