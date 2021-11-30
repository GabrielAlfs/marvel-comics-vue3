<template>
  <b-dialog :modelValue="modelValue" @update:modelValue="handleClose">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Informações do {{ stagedComic.title }}
      </h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">
        Detalhes e curiosidades sobre esse quadrinho
      </p>
    </div>
    <div class="border-t border-gray-200">
      <dl>
        <img
          class="h-64 mx-auto my-2"
          :src="`${stagedComic.thumbnail.path}.${stagedComic.thumbnail.extension}`"
        />
        <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Descrição</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ stagedComic.description || 'Sem descrição' }}
          </dd>
        </div>
        <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Personagens</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{
              stagedComic.characters.items
                .map((character) => character.name)
                .join(', ') || 'Desconhecidos'
            }}
          </dd>
        </div>
        <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Criadores</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{
              stagedComic.creators.items
                .map((creator) => creator.name)
                .join(', ') || 'Desconhecidos'
            }}
          </dd>
        </div>
      </dl>
    </div>
    <template v-slot:footer>
      <b-button class="w-full sm:w-24" @click="handleClose">Fechar</b-button>
    </template>
  </b-dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import BDialog from '@/ui/components/base/BDialog.vue';

export default defineComponent({
  name: 'DetailTechnicianDialog',
  components: {
    BDialog,
  },
  props: {
    modelValue: {
      type: Boolean,
    },
  },
  setup(_props, { emit }) {
    const { state } = useStore();
    const handleClose = () => {
      emit('update:modelValue', false);
    };

    return {
      handleClose,
      stagedComic: computed(() => state.comics.stagedComic || {}),
    };
  },
});
</script>
