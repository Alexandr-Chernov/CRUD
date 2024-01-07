<template>
  <div id="app">
    <AppHeader />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '@/assets/style.css';
import AppHeader from '@/components/AppHeader.vue';

export default defineComponent({
  components: {
    AppHeader,
  },
});
</script>

<style scoped>
#app {
  font-weight: normal;
}
</style>
