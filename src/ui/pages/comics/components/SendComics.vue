<template>
  <div class="fixed bottom-8 right-8 z-50">
    <button
      class="relative rounded-full shadow-md bg-teal-700 p-3"
      @click="loadMap"
    >
      <paper-airplane-icon class="w-8 h-8 text-teal-100" />
      <div
        class="absolute rounded-full p-1 top-0 right-0 bg-red-600 text-white text-xs"
      >
        {{ selectedComics.length }}
      </div>
    </button>
  </div>
  <b-dialog :modelValue="sendComicDialog" @update:modelValue="handleClose">
    <div>
      <div class="w-full">
        <div ref="mapElement" class="h-96"></div>
      </div>
      <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
          Localização de entrega
        </dt>
        <dd
          class="mt-1 text-sm font-medium text-teal-700 sm:mt-0 sm:col-span-1"
        >
          <p class="font-medium text-gray-600">Latitude:</p>
          {{ currPos.lat.toFixed(4) }}
        </dd>
        <dd
          class="mt-1 text-sm font-medium text-teal-700 sm:mt-0 sm:col-span-1"
        >
          <p class="font-medium text-gray-600">Longitude:</p>
          {{ currPos.lng.toFixed(4) }}
        </dd>
      </div>
      <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-1 sm:px-6 divide-y">
        <dt class="text-sm font-medium text-gray-500 sm:grid-cols-3">
          Quadrinhos selecionados
        </dt>
        <dd
          class="text-sm text-gray-900 sm:col-span-3 flex items-center justify-between"
          v-for="(selectedComic, index) in selectedComics"
          :key="index"
        >
          <p class="text-gray-700">
            {{ selectedComic.title }}
          </p>
          <p class="text-gray-600 text-sm font-light">
            {{
              selectedComic.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })
            }}
          </p>
        </dd>
        <dd
          class="text-sm text-gray-900 sm:col-span-3 flex items-center justify-between"
        >
          <p class="text-gray-700 font-medium">Total</p>
          <p class="text-gray-600 text-sm">
            {{
              selectedComics
                .map((comic) => comic.price)
                .reduce((acc, v) => (v += acc), 0)
                .toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
            }}
          </p>
        </dd>
      </div>
    </div>
    <template v-slot:footer>
      <b-button class="w-full" @click="handleConfirm">Confirmar envio</b-button>
    </template>
  </b-dialog>
</template>

<script lang="ts">
/* eslint-disable no-new */
import { defineComponent, computed, ref, watch } from 'vue';
import { PaperAirplaneIcon } from '@heroicons/vue/outline';
import { useStore } from 'vuex';
import { useLoader } from '@/services/config/googlemaps';
import { useGeolocation } from '@/ui/composables';
import BDialog from '@/ui/components/base/BDialog.vue';
import { useToast } from '@/store/helpers';

export default defineComponent({
  name: 'SendComics',
  components: {
    PaperAirplaneIcon,
    BDialog,
  },
  setup() {
    const { state } = useStore();

    const { coords } = useGeolocation();

    const currPos = ref({
      lat: 0,
      lng: 0,
    });

    watch(coords, () => {
      currPos.value = {
        lat: coords.value.latitude,
        lng: coords.value.longitude,
      };
    });

    const mapElement = ref(null);
    const sendComicDialog = ref(false);
    const map = ref(null);

    const loadMap = async () => {
      sendComicDialog.value = true;
      await useLoader.load();
      // eslint-disable-next-line no-undef
      map.value = new google.maps.Map(mapElement.value, {
        center: currPos.value,
        zoom: 8,
      });
      map.value.addListener('click', ({ latLng: { lat, lng } }) => {
        currPos.value = { lat: lat(), lng: lng() };
      });
    };

    const handleClose = () => {
      sendComicDialog.value = false;
    };

    const handleConfirm = () => {
      handleClose();
      useToast({
        message: 'Pedido enviado com sucesso!',
        description:
          'Os quadrinhos que você selecionou foram enviados com sucesso!',
        type: 'success',
      });
    };

    return {
      currPos,
      loadMap,
      mapElement,
      handleClose,
      sendComicDialog,
      handleConfirm,
      selectedComics: computed(() => state.comics.selectedComics),
    };
  },
});
</script>
