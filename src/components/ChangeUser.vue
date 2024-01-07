<template>
  <div class="user__forms">
    <h1>Change</h1>
    <input v-model="username" placeholder="name">
    <button @click="changeUser()">change</button>
  </div>
</template>

<script lang="ts">
import { User } from '@/store/modules/user/state';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      username: '',
    };
  },
  async created() {
    const user = await this.$store.dispatch('getUserById', this.$route.params.id);
    this.username = user.name;
  },
  methods: {
    async changeUser() {
      const oldUser = {
        id: Number(this.$route.params.id),
        name: (await this.$store.dispatch('getUserById', this.$route.params.id)).name,
      };
      const changedUser: User = {
        id: Number(this.$route.params.id),
        name: this.username,
      };
      await this.$store.dispatch('pushEventList', {
        eventName: 'change',
        data: {
          oldUser,
          changedUser,
        },
      });
      await this.$store.dispatch('changeUserByUser', changedUser);
      this.$router.push('/');
    },
  },
});
</script>

<style scoped>
button,
input {
  margin-top: 1rem;
}
</style>
