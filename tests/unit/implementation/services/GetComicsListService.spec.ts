import { GetComicsListService } from '@/implementation/services/GetComicsListService';
import { ComicDtoMapper } from '@/implementation/dtos/ComicDto';
import { ComicEntity } from '@/domain/entities/Comic';
import {
  HttpClientComicsMock,
  mockComicEntityDto,
  mockGetComicsListPayload,
} from '../mocks/GetComicsListService';

const httpClientMock = new HttpClientComicsMock();

const buildSut = (): GetComicsListService =>
  new GetComicsListService('/comics', httpClientMock);

describe('GetComicsListService', () => {
  it('should call HttpClient.request with the correct payload', async () => {
    const sut = buildSut();

    const httpClientSpy = jest.spyOn(httpClientMock, 'request');

    await sut.execute(mockGetComicsListPayload);

    expect(httpClientSpy).toHaveBeenCalledWith({
      method: 'GET',
      url: '/comics',
      query: {
        limit: mockGetComicsListPayload.limit,
        offset: mockGetComicsListPayload.offset,
        titleStartsWith: mockGetComicsListPayload.where.titleStartsWith,
        orderBy: 'title',
      },
    });
  });
  it('should call return a list of comic entities', async () => {
    const sut = buildSut();

    const { items } = await sut.execute(mockGetComicsListPayload);

    expect(items).toEqual(
      expect.arrayContaining<ComicEntity>([
        ComicDtoMapper.toDomain(mockComicEntityDto),
      ])
    );
  });
  it('should throw if HttpClient throws', async () => {
    expect.assertions(1);

    const sut = buildSut();

    jest.spyOn(httpClientMock, 'request').mockImplementationOnce(() => {
      throw new Error('request');
    });

    try {
      await sut.execute(mockGetComicsListPayload);
    } catch (error: any) {
      expect(error.message).toBe('request');
    }
  });
});
