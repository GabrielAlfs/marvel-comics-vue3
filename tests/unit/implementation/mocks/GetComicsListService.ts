import { HttpClient, HttpClientArgs } from '@/implementation/common/HttpClient';
import { DataContainer } from '@/implementation/common/MarvelDataWrapper';
import { ComicEntityDto } from '@/implementation/dtos/ComicDto';

export const mockGetComicsListPayload = {
  limit: 1,
  offset: 1,
  where: { titleStartsWith: 'test' },
};

export const mockComicEntityDto: ComicEntityDto = {
  id: 91992,
  title: ' Fantastic Four by Dan Slott Vol. 1 (Hardcover)',
  description: null,
  prices: [
    {
      type: 'printPrice',
      price: 39.99,
    },
  ],
  thumbnail: {
    path: 'http://i.annihil.us/u/prod/marvel/i/mg/8/a0/603d5b82a5bc0',
    extension: 'jpg',
  },
  creators: {
    available: 1,
    collectionURI: 'http://gateway.marvel.com/v1/public/comics/91992/creators',
    items: [
      {
        resourceURI: 'http://gateway.marvel.com/v1/public/creators/4430',
        name: 'Jeff Youngquist',
        role: 'editor',
      },
    ],
    returned: 1,
  },
  characters: {
    available: 0,
    collectionURI:
      'http://gateway.marvel.com/v1/public/comics/91992/characters',
    items: [],
    returned: 0,
  },
};

export const mockGetComicListReturn: DataContainer<ComicEntityDto> = {
  count: 1,
  limit: 1,
  offset: 0,
  results: [mockComicEntityDto],
  total: 10000,
};

export class HttpClientComicsMock implements HttpClient {
  async request(args: HttpClientArgs): Promise<any> {
    return mockGetComicListReturn;
  }
}
