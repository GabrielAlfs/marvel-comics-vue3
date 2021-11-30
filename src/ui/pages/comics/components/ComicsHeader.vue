<template>
  <section
    class="flex flex-wrap w-full items-center border-b-2 mb-4 p-2 sm:mt-5"
  >
    <p
      class="text-gray-600 pb-2 flex justify-center sm:inline-block text-lg font-semibold md:text-xl w-full sm:w-auto"
    >
      Quadrinhos Marvel
    </p>
    <div class="flex-grow"></div>
    <b-input
      v-model="searchInput"
      class="flex-grow sm:flex-grow-0"
      hideLabel
      :placeholder="`Pesquisar por quadrinhos...`"
    >
      <b-loading
        class="mx-auto w-5 h-5"
        color="text-gray-700"
        v-show="loading"
      />
      <search-icon class="w-5 h-5" v-show="!loading"></search-icon>
    </b-input>
  </section>
</template>

<script lang="ts">
import { defineComponent, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { SearchIcon } from '@heroicons/vue/outline';
import { useStore } from 'vuex';
import { useDebouncedRef } from '@/ui/composables';

export default defineComponent({
  name: 'ComicsHeader',
  components: {
    SearchIcon,
  },
  setup(_props, { emit }) {
    const { push, currentRoute } = useRouter();
    const { state } = useStore();

    const searchInput = useDebouncedRef(
      `${{ ...currentRoute.value.query }.titulo || ''}`,
      400
    );

    watch(searchInput, (queryValue) => {
      emit('query', queryValue);
      push({
        name: 'ComicsView',
        query: {
          titulo: queryValue,
        },
      });
    });

    return {
      searchInput,
      loading: computed(() => state.comics.loading),
    };
  },
});
</script>
