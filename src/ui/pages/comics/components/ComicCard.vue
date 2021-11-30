<template>
  <div class="relative border shadow overflow-hidden rounded-lg bg-white">
    <div
      class="absolute w-full h-36 bg-gradient-to-tr opacity-40 to-black from-transparent cursor-pointer"
      @click="toggleComic"
    ></div>
    <div class="absolute right-3 top-1 text-white">
      <input
        class="rounded-sm bg-transparent border border-white text-teal-600 focus:ring-0 focus:outline-none w-5 h-5 cursor-pointer"
        type="checkbox"
        :checked="comicSelected"
        @input="toggleComic"
      />
    </div>
    <img
      :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`"
      class="object-cover w-full h-36"
    />
    <section class="divide-y">
      <div class="px-5 py-2">
        <div class="flex items-center gap-x-3">
          <p
            class="text-gray-700 font-medium overflow-ellipsis whitespace-nowrap overflow-hidden"
          >
            {{ comic.title }}
          </p>
          <div class="flex-grow"></div>
          <p class="text-gray-800 text-sm font-light">
            {{
              comic.prices[0].price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })
            }}
          </p>
        </div>
        <div>
          <p class="text-xs text-gray-600 line-clamp-1">
            {{ comic.description || 'Sem descrição' }}
          </p>
        </div>
      </div>
      <div class="flex divide-x divide-gray-200">
        <div
          class="hover:bg-gray-100 group cursor-pointer flex gap-3 py-3 px-2 items-center justify-center w-full"
          @click="handleDetail"
        >
          <information-circle-icon
            class="w-5 h-5 min-w-max text-gray-500 group-hover:text-teal-600"
          />
          <span
            class="text-gray-600 text-xs group-hover:text-teal-600 font-medium whitespace-nowrap overflow-hidden overflow-ellipsis hidden md:block"
          >
            Detalhes
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { InformationCircleIcon } from '@heroicons/vue/outline';
import { useStore } from 'vuex';
import { Comic } from '@/domain/entities/Comic';

export default defineComponent({
  name: 'ComicCard',
  components: {
    InformationCircleIcon,
  },
  props: {
    comic: {
      type: Object as PropType<Comic>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { commit, state } = useStore();

    const comicSelected = computed(() =>
      state.comics.selectedComics.find((comic) => comic.id === props.comic.id)
    );

    const toggleComic = () => {
      if (comicSelected.value) {
        commit(
          'comics/UNSELECT_COMIC',
          state.comics.selectedComics.findIndex(
            (comicPreview) => comicPreview.id === props.comic.id
          )
        );
      } else {
        commit('comics/SELECT_COMIC', {
          id: props.comic.id,
          title: props.comic.title,
          price: props.comic.prices[0].price,
        });
      }
    };

    return {
      toggleComic,
      comicSelected,
      handleDetail: () => emit('detail', { id: props.comic.id }),
    };
  },
});
</script>
