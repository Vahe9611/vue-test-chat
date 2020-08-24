<template>
  <div id="app" class="app">
    <div class="app__conversations">
      <Conversations />
    </div>
    <div class="app__thread">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Conversations from '@/partials/Conversations.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    Conversations,
  },
  computed: {
    ...mapGetters([
      'currentConversation',
    ]),
  },
  created() {
    const { id: routeId } = this.$route.params;
    const { id: conversationId } = this.currentConversation;

    if (!routeId) {
      this.$router.push({ name: 'thread', params: { id: conversationId } });
    } else {
      this.$store.dispatch('selectConversation', routeId);
    }
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

p {
  margin: 0;
  padding: 0;

}

.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  position: relative;
  max-height: 100vh;
  min-width: 768px;

  &__conversations {
    flex: 1;
    max-width: 300px;
    background: #F3F6F8;
  }

  &__thread {
    flex: 1;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }
}

</style>
