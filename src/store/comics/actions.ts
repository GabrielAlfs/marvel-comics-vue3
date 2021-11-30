import { ActionTree } from 'vuex';
import { useGetComicsList } from '@/services/resources/comics';
import { RootState } from '..';
import { ComicsState } from './state';
import { useRequestWrapper } from '../helpers';

export default {
  async fetchComics(
    { commit },
    { limit = 20, offset = 0, query, reset = false }
  ) {
    await useRequestWrapper(commit, async () => {
      const { results } = await useGetComicsList({
        limit,
        offset,
        where: { titleStartsWith: query },
      });

      commit('SET_PAGINATION', { limit, offset });
      commit(reset ? 'SET_COMICS' : 'ADD_COMICS', results);
    });
  },
  clearStaged({ commit }) {
    commit('STAGE_COMIC', null);
  },
} as ActionTree<ComicsState, RootState>;
