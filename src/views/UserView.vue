<template>
  <div>
    <div v-if="actionName === 'create'">
      <CreateUser />
    </div>
    <div v-else-if="actionName === 'change'">
      <ChangeUser :id="actionId"/>
    </div>
    <h1 v-else>No action!</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CreateUser from '@/components/CreateUser.vue';
import ChangeUser from '@/components/ChangeUser.vue';

export default defineComponent({
  computed: {
    actionName() {
      return this.$route.name;
    },
    actionId() {
      return this.$route.params.id;
    },
  },
  components: { CreateUser, ChangeUser },
});
</script>
