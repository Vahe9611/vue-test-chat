<template>
  <div class="conversations">
    <div class="conversations__header">
      <span>Сообщения</span>
      <span class="conversations__count">{{items.length}}</span>
    </div>
    <ul class="conversations__list">
      <li
        v-for="item in items"
        :key="item.id"
        class="conversations__item"
      >
        <ConversationItem
          :id="item.id"
          :name="item.subject"
          :date="new Date(item.created)"
          :message="item.parts[item.parts.length - 1].text"
          :active="currentId == item.id"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import ConversationItem from '@/components/ConversationItem.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    ConversationItem,
  },
  computed: {
    ...mapGetters({
      items: 'conversations',
    }),
    currentId() {
      return this.$route?.params.id;
    },
  },
};
</script>

<style lang="scss" scoped>
.conversations {
  height: 100%;

  &__header {
    padding: 24px 20px;
    border-bottom: 1px solid #E9EDF2;
    color: #656B77;
  }

  &__count {
    margin-left: 10px;
    color: #D2D8DE;
    font-weight: bold;
  }

  &__list {
    overflow-x: hidden;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__item {
    position: relative;
    display: block;
    width: 100%;
  }
}
</style>
