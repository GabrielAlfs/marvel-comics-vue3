import { ActionTree } from 'vuex';
import { RootState } from '..';
import { ComicsState } from './state';
import { useRequestWrapper } from '../helpers';
import { buildGetComicsListUseCase } from '@/application/factories/usecases/GetComicsList';

const getComicsList = buildGetComicsListUseCase();

export default {
  async fetchComics(
    { commit },
    { limit = 20, offset = 0, query, reset = false }
  ) {
    await useRequestWrapper(commit, async () => {
      const { items } = await getComicsList.execute({
        limit,
        offset,
        where: { titleStartsWith: query },
      });

      commit(reset ? 'SET_COMICS' : 'ADD_COMICS', items);
    });
  },
  clearStaged({ commit }) {
    commit('STAGE_COMIC', null);
  },
} as ActionTree<ComicsState, RootState>;
