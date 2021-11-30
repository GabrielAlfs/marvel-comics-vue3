import { ComicEntity, ComicPreview } from '@/domain/entities/Comic';

export type ComicsState = {
  comics: Array<ComicEntity>;
  selectedComics: Array<ComicPreview>;
  stagedComic: ComicEntity | null;
  loading: boolean;
};

const state = (): ComicsState => ({
  comics: [],
  selectedComics: [],
  stagedComic: null,
  loading: false,
});

export default state;
