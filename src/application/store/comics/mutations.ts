import { MutationTree } from 'vuex';
import { ComicsState } from './state';

export default {
  SET_COMICS(state, comics) {
    state.comics = comics;
  },
  ADD_COMICS(state, comics) {
    state.comics.push(...comics);
  },
  SELECT_COMIC(state, comicPreview) {
    state.selectedComics.unshift(comicPreview);
  },
  UNSELECT_COMIC(state, index) {
    state.selectedComics.splice(index, 1);
  },
  CLEAR_SELECTED_COMICS(state) {
    state.selectedComics = [];
  },
  STAGE_COMIC(state, comic) {
    state.stagedComic = comic;
  },
  SET_LOADING(state, value) {
    state.loading = value;
  },
} as MutationTree<ComicsState>;
