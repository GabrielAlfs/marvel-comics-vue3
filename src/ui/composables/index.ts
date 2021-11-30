import { Ref, ref, customRef, onMounted, onUnmounted } from 'vue';

const debounce = (fn, delay = 0, immediate = false) => {
  let timeout: NodeJS.Timeout;
  return (...args) => {
    if (immediate && !timeout) fn(...args);
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export const useDebouncedRef = <T = any>(
  initialValue: any,
  delay: number,
  immediate?: boolean
): Ref<T> => {
  const state = ref(initialValue);
  const debouncedRef = customRef((track, trigger) => ({
    get() {
      track();
      return state.value;
    },
    set: debounce(
      (value) => {
        state.value = value;
        trigger();
      },
      delay,
      immediate
    ),
  }));

  return debouncedRef;
};

export const useGeolocation = () => {
  const coords = ref({ latitude: 0, longitude: 0 });
  const isSupported = 'navigator' in window && 'geolocation' in navigator;

  let watcher: number | null = null;

  onMounted(() => {
    if (isSupported) {
      watcher = navigator.geolocation.watchPosition((position) => {
        coords.value = position.coords;
      });
    }
  });
  onUnmounted(() => {
    if (watcher) navigator.geolocation.clearWatch(watcher);
  });

  return { coords, isSupported };
};
