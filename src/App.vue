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

export default {
  components: {
    Conversations,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
