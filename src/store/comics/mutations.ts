import { MutationTree } from 'vuex';
import { ComicsState } from './state';

export default {
  SET_COMICS(state, comics) {
    state.comics = comics;
  },
  ADD_COMICS(state, comics) {
    state.comics.push(...comics);
  },
  SET_PAGINATION(state, { limit, offset }) {
    Object.assign(state.pagination, { limit, offset });
  },
  SELECT_COMIC(state, comicPreview) {
    state.selectedComics.unshift(comicPreview);
  },
  UNSELECT_COMIC(state, index) {
    state.selectedComics.splice(index, 1);
  },
  STAGE_COMIC(state, comic) {
    state.stagedComic = comic;
  },
  SET_LOADING(state, value) {
    state.loading = value;
  },
} as MutationTree<ComicsState>;
