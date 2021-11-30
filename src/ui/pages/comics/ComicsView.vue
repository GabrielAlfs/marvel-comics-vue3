<template>
  <send-comics />
  <comic-detail-dialog v-model="dialogs.detail" />
  <main class="min-h-screen to-gray-50 from-gray-100 bg-gradient-to-t">
    <div class="flex flex-col max-w-7xl items-center justify-center mx-auto">
      <comics-header />
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-3"
      >
        <comic-card
          v-for="comic in comics"
          @detail="handleDetail"
          :key="`comic-${comic.id}`"
          :comic="comic"
        />
      </div>
      <div class="my-2 mt-3">
        <b-button :loading="loading" @click="handleLoadMore">
          Carregar mais
        </b-button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ComicsHeader from './components/ComicsHeader.vue';
import ComicCard from './components/ComicCard.vue';
import ComicDetailDialog from './components/ComicDetailDialog.vue';
import SendComics from './components/SendComics.vue';

export default defineComponent({
  name: 'ComicsView',
  components: {
    ComicsHeader,
    ComicCard,
    ComicDetailDialog,
    SendComics,
  },
  setup() {
    const { dispatch, state, commit, getters } = useStore();
    const { currentRoute } = useRouter();

    const dialogs = reactive({
      detail: false,
    });

    const fetchComicsPayload = computed(() => ({
      limit: parseInt(`${{ ...currentRoute.value.query }.limit || '12'}`, 10),
      offset: parseInt(`${{ ...currentRoute.value.query }.offset || '0'}`, 10),
      query: { ...currentRoute.value.query }.titulo || '',
    }));

    dispatch('comics/fetchComics', {
      ...fetchComicsPayload.value,
      reset: true,
    });

    const handleLoadMore = () => {
      fetchComicsPayload.value.offset += fetchComicsPayload.value.limit;

      dispatch('comics/fetchComics', { ...fetchComicsPayload.value });
    };

    const handleDetail = ({ id }: { id: string }) => {
      dialogs.detail = true;
      commit('comics/STAGE_COMIC', getters['comics/getComicById'](id));
    };

    return {
      dialogs,
      handleLoadMore,
      handleDetail,
      comics: computed(() => state.comics.comics),
      loading: computed(() => state.comics.loading),
    };
  },
});
</script>
