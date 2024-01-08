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
      <div class="adduser__button">
        <router-link :to="{ path: '/user', name: 'create' }">add user</router-link>
      </div>
      <div>
        <ul class="list__users">
          <li v-for="user in userList" :key="user.id">
            <p class="name">{{ user.name }}</p>
            <div class="footer__list__users">
              <div>
                <p class="id">id:{{ user.id }}</p>
              </div>
              <div>
                <div>
                  <router-link :to="{
                    path: '/user',
                    name: 'change',
                    params: { id: user.id }
                  }">
                    change user
                  </router-link>
                </div>
                <button @click="openConfirmationDialog(user)" :disabled="showConfirmationDialog">
                  delete
                </button>
              </div>
            </div>
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
        data: {
          deletedUser: user,
          lastIndex: await this.$store.dispatch('getUserIndexById', user.id),
        },
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
          await this.$store.dispatch('createUserByUser', {
            user: this.lastEvent.data.deletedUser,
            lastIndex: this.lastEvent.data.lastIndex,
          });
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
          await this.$store.dispatch('createUserByUser', { user: this.lastEvent.data.newUser });
          break;
        case 'delete':
          await this.$store.dispatch('deleteUserByUser', this.lastEvent.data.deletedUser);
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
  border: 1px solid #000;
  margin-top: 2.5rem;
  font-size: 1.5rem;
  padding: 0.5rem;
  border-radius: 0.2rem;
}

.main div,
.main ul {
  margin: 1rem auto;
}

.main .confirmation__box {
  margin-top: 6rem;
}

.list__users {
  height: 60vh;
  overflow: auto;
}
.list__users::-webkit-scrollbar {
  width: 12px;
}
.list__users::-webkit-scrollbar-track {
  background: linear-gradient(#6ddbff, #007ea8);
}
.list__users::-webkit-scrollbar-thumb {
  background-color: #007ea8;
  border-radius: 1rem;
}

.list__users li {
  background: linear-gradient(#6ddbff, #007ea8);
  border-radius: 3rem;
  border: 1px solid #000;
  padding: 1.5rem 1.5rem 0rem 1.5rem;
  margin: 1rem;
  display: flex;
  flex-flow: column nowrap;
}

.list__users li .id {
  font-size: 1.5rem;
  font-family: monospace;
}

.list__users li .name {
  font-family: Calibri;
  text-decoration: underline 2px;
  font-weight: 800;
  font-size: 3rem;
  margin-top: 1rem;
  text-align: center;
}

.footer__list__users {
  margin-top: 2rem !important;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
.footer__list__users div:first-child {
  display: grid;
  align-items: center;
}
.footer__list__users a {
  margin: 0;
}
.footer__list__users a, .footer__list__users button {
  background: linear-gradient(#6ddbff, #007ea8);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 35px;
  font-size: 1.2rem;
}
.footer__list__users a:hover, .footer__list__users button:hover {
  background: linear-gradient(#6ddbff, #005470);
}
.footer__list__users div:first-child {
  display: flex;
  flex-flow: row nowrap;
  align-items: end;
}
.footer__list__users div:last-child {
  min-width: 400px;
  display: flex;
  align-items: center;
  margin: 0;
}

.footer__list__users button {
  border: 1px solid #000;
}

.adduser__button {
  display: flex;
  justify-content: center;
}

.adduser__button a {
  margin-top: 18vh;
}

.back__buttons {
  position: absolute;
  right: 0;
}

.back__buttons button {
  border: 2px solid #000;
  border-radius: 1rem;
  margin: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
}

.back__buttons button:disabled {
  background: linear-gradient(#6ddbff, #00516c) !important;
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
  left: 50%;
  transform: translateX(-50%);
  background: #6ddbff;
}
</style>
