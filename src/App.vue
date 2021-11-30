<template>
  <toast />
  <router-view :key="$route.fullPath" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Toast from '@/ui/components/base/Toast.vue';

export default defineComponent({
  name: 'App',
  components: {
    Toast,
  },
  setup() {
    return {};
  },
});
</script>
