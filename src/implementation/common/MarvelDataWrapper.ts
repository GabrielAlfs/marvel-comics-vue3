export type DataContainer<T> = {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Array<T>;
};

export type DataWrapper<T> = {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: T;
  etag: string;
};
