<template>
  <div>
    <div class="main">
      <div class="back__buttons">
        <button @click="backEvent()" :disabled="eventList.length === 0">
          back
        </button>
        <button @click="cancelBackEvent()" :disabled="Object.keys(lastEvent).length === 0">
          cancel back
        </button>
      </div>
      <div>
        <div class="adduser__button">
          <router-link :to="{ path: '/user', name: 'create' }">add user</router-link>
        </div>
        <ul>
          <li v-for="user in userList" :key="user.id">
            <p>id: {{ user.id }}</p>
            <p>name: {{ user.name }}</p>
            <router-link :to="{
              path: '/user',
              name: 'change',
              params: { id: user.id }
            }">
              change user
            </router-link>
            <button @click="openConfirmationDialog(user)" :disabled="showConfirmationDialog">
              delete
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="confirmation__box" v-if="showConfirmationDialog">
      <h1>Are you sure?</h1>
      <div>
        <button @click="confirmAction">Yes</button>
        <button @click="cancelAction">No</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { User } from '@/store/modules/user/state';

export default defineComponent({
  data() {
    return {
      confirmationUser: { id: Number(null), name: '' },
      showConfirmationDialog: false,
      lastEvent: this.$store.getters.lastEvent,
      eventList: this.$store.getters.eventList,
    };
  },
  computed: {
    userList() {
      return this.$store.getters.userList;
    },
  },
  methods: {
    openConfirmationDialog(user: User) {
      this.confirmationUser = { id: user.id, name: user.name };
      if (!this.showConfirmationDialog) {
        this.showConfirmationDialog = true;
      } else {
        this.confirmAction();
      }
    },
    confirmAction() {
      const user: User = this.confirmationUser;
      this.deleteUser(user);
      this.showConfirmationDialog = false;
    },
    cancelAction() {
      this.showConfirmationDialog = false;
      this.confirmationUser = { id: Number(null), name: '' };
    },
    async deleteUser(user: User) {
      await this.$store.dispatch('pushEventList', {
        eventName: 'delete',
        data: { user },
      });
      await this.$store.dispatch('deleteUserByUser', user);
    },
    async backEvent() {
      this.lastEvent = await this.$store.dispatch('popEventList');
      switch (this.lastEvent.eventName) {
        case 'create':
          await this.$store.dispatch('deleteUserByUser', this.lastEvent.data.newUser);
          break;
        case 'delete':
          await this.$store.dispatch('createUserByUser', this.lastEvent.data.user);
          break;
        case 'change':
          await this.$store.dispatch('changeUserByUser', this.lastEvent.data.oldUser);
          break;
        default:
          break;
      }
      await this.$store.dispatch('saveLastEvent', this.lastEvent);
    },
    async cancelBackEvent() {
      switch (await this.lastEvent.eventName) {
        case 'create':
          await this.$store.dispatch('createUserByUser', this.lastEvent.data.newUser);
          break;
        case 'delete':
          await this.$store.dispatch('deleteUserByUser', this.lastEvent.data.user);
          break;
        case 'change':
          await this.$store.dispatch('changeUserByUser', this.lastEvent.data.changedUser);
          break;
        default:
          break;
      }
      await this.$store.dispatch('pushEventList', this.lastEvent);
      await this.$store.dispatch('removeLastEvent');
      this.lastEvent = {};
    },
  },
});
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
}

.main a {
  margin-top: 2.5rem;
  font-size: 1.5rem;
  padding: 0.5rem;
  border-radius: 0.2rem;
}

.main div,
.main ul {
  margin: 1rem auto;
}

.main div:last-child {
  margin-top: 6rem;
}

.main li {
  border: 1px solid #000;
  padding: 0rem 0rem 1rem 0rem;
  margin: 1rem;
  display: flex;
  flex-flow: column nowrap;
}

.main ul button {
  margin: 0.4rem 0rem 0rem 18rem;
}

.adduser__button {
  display: flex;
  justify-content: center;
}

.back__buttons {
  position: absolute;
  right: 0;
}

.back__buttons button {
  margin: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
}

.back__buttons button:disabled {
  background-color: rgb(1, 184, 123) !important;
}

.confirmation__box button {
  margin: 1rem !important;
  padding: 0.5rem 2.5rem;
  font-size: 1.5rem;
}

.confirmation__box {
  display: flex;
  padding: 1rem 2rem;
  position: fixed;
  z-index: 2;
  top: 1rem;
  left: 25%;
  background: #defcf7;
}
</style>
