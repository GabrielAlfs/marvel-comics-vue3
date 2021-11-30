import { Paginated } from '../common/Pagination';
import { ComicEntity } from '../entities/Comic';

export type GetComicsListUseCasePort = {
  limit: number;
  offset: number;
  where?: {
    titleStartsWith?: string;
  };
};

export interface GetComicsListUseCase {
  execute(port: GetComicsListUseCasePort): Promise<Paginated<ComicEntity>>;
}
