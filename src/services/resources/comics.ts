import { Comic } from '@/domain/entities/Comic';
import { DataContainer } from '../config/marvel';
import { useGetList } from '../config/requests';

const comicsResource = '/comics';

export const useGetComicsList = async ({
  limit,
  offset,
  where,
}: {
  limit: number;
  offset: number;
  where?: {
    titleStartsWith?: string;
  };
}): Promise<DataContainer<Comic>> => {
  const response = await useGetList<DataContainer<Comic>>({
    url: comicsResource,
    limit,
    offset,
    where: Object.fromEntries(
      Object.entries(where || {}).filter(([_, v]) => v !== '')
    ),
  });

  return response;
};
