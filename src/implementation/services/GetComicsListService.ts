import { Paginated } from '@/domain/common/Pagination';
import { ComicEntity } from '@/domain/entities/Comic';
import {
  GetComicsListUseCase,
  GetComicsListUseCasePort,
} from '@/domain/usecases/GetComicsListUseCase';
import { HttpClient } from '../common/HttpClient';
import { DataContainer } from '../common/MarvelDataWrapper';
import { ComicDtoMapper, ComicEntityDto } from '../dtos/ComicDto';

export class GetComicsListService implements GetComicsListUseCase {
  constructor(
    private readonly resource: string,
    private readonly httpClient: HttpClient
  ) {}

  async execute(
    port: GetComicsListUseCasePort
  ): Promise<Paginated<ComicEntity>> {
    const { limit, offset, total, results } = await this.httpClient.request<
      DataContainer<ComicEntityDto>
    >({
      method: 'GET',
      url: this.resource,
      query: {
        limit: port.limit,
        offset: port.offset,
        orderBy: 'title',
        ...Object.fromEntries(
          Object.entries(port.where || {}).filter(([_, v]) => v !== '')
        ),
      },
    });

    return {
      limit,
      offset,
      total,
      items: results.map((comic) => ComicDtoMapper.toDomain(comic)),
    };
  }
}
