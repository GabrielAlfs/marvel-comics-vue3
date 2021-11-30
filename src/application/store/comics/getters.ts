import { GetterTree } from 'vuex';
import { RootState } from '..';
import { ComicsState } from './state';

export default {
  getComicIndexById(state) {
    return (id: number) => state.comics.findIndex((each) => each.id === id);
  },
  getComicById(state) {
    return (id: number) => state.comics.find((each) => each.id === id);
  },
} as GetterTree<ComicsState, RootState>;
