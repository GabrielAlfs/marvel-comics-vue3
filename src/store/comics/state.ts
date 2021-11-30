import { Comic } from '@/domain/entities/Comic';

type ComicPreview = {
  id: number;
  title: string;
  price: number;
};

export type ComicsState = {
  comics: Array<Comic>;
  selectedComics: Array<ComicPreview>;
  stagedComic: Comic | null;
  pagination: {
    limit: number;
    offset: number;
  };
  loading: boolean;
};

const state = (): ComicsState => ({
  comics: [],
  selectedComics: [],
  pagination: {
    limit: 20,
    offset: 0,
  },
  stagedComic: null,
  loading: false,
});

export default state;
