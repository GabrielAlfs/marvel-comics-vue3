<template>
  <button
    v-bind="$attrs"
    :disabled="disabled"
    class="BButton__button"
    :class="{
      [`bg-${color}-${hue.bg} hover:bg-${color}-${hue.hover} ${textColor} ${border}`]: true,
      'cursor-not-allowed': disabled,
    }"
  >
    <b-loading class="mx-auto w-6 h-6" v-show="loading" />
    <div v-show="!loading">
      <slot></slot>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import BLoading from '@/ui/components/base/BLoading.vue';

export default defineComponent({
  name: 'BButton',
  components: {
    BLoading,
  },
  props: {
    type: String,
    loading: {
      type: Boolean,
      default: false,
    },
    textColor: {
      type: String,
      default: 'text-white',
    },
    color: {
      type: String,
      default: 'teal',
    },
    border: {
      type: String,
      default: 'border-transparent',
    },
    disabled: {
      type: Boolean,
    },
    hue: {
      type: Object as PropType<{ hover: number; bg: number }>,
      default: () => ({
        hover: 600,
        bg: 700,
      }),
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="postcss" scoped>
.BButton__button {
  @apply px-4
    py-2
    border
    rounded-md
    transition-colors
    text-sm
    font-medium;
}
</style>
