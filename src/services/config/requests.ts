import { AxiosRequestConfig, Method } from 'axios';
import { useAxios } from './axios';
import { DataWrapper } from './marvel';

const useRequest = async <T>(
  method: Method,
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const axios = useAxios();

  const { data } = (await axios.request({
    method,
    url,
    ...config,
  })) as { data: DataWrapper<T> };

  return data.data;
};

export const useGetList = async <T>({
  url,
  limit,
  offset,
  where,
}: {
  url: string;
  limit?: number;
  offset?: number;
  where?: Record<string, string | number | symbol>;
}): Promise<T> => {
  return useRequest<T>('GET', url, {
    params: { offset, limit, ...where },
  });
};

export const useGet = async <T>({
  url,
  slug,
}: {
  url: string;
  slug?: string;
}): Promise<T> => {
  return useRequest<T>('GET', `${url}${slug ? `/${slug}` : ''}`);
};
