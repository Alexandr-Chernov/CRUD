<template>
  <div class="user__forms">
    <h1>Create</h1>
    <input v-model="username" placeholder="name">
    <button @click="createUser">create</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { User } from '@/store/modules/user/state';

export default defineComponent({
  data() {
    return {
      username: '',
    };
  },
  computed: {
    userList() {
      return this.$store.getters.userList;
    },
  },
  methods: {
    async createUser() {
      const getMaxId = async (userList: User[]) => userList.reduce((maxId, user) => {
        const currentMaxId = maxId;
        if (user.id > currentMaxId) {
          return user.id;
        }
        return currentMaxId;
      }, 0);

      const newUser: User = {
        id: await getMaxId(this.userList) + 1,
        name: this.username,
      };
      await this.$store.dispatch('pushEventList', {
        eventName: 'create',
        data: { newUser },
      });
      await this.$store.dispatch('createUserByUser', newUser);
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
