<template>
  <div
    class="conversation-item"
    :class="{ 'active': active }"
    @click="selectConversation"
  >
    <div class="conversation-item__title">
      <span class="conversation-item__name">
        {{name}}
      </span>
      <span class="conversation-item__date">
        {{lastMessageDate}}
      </span>
    </div>
    <div class="conversation-item__msg">
      <p>{{message}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConversationItem',
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    active: Boolean,
  },
  computed: {
    lastMessageDate() {
      return this.$moment(this.date).format('DD MMM YYYY');
    },
  },
  methods: {
    selectConversation() {
      if (Number(this.$route.params?.id) === Number(this.id)) return;

      this.$store.dispatch('selectConversation', this.id);
      this.$router.push({ name: 'thread', params: { id: this.id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.conversation-item {
  transition-timing-function: cubic-bezier(.4,0,.2,1);
  transition-duration: 83ms;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  left: 0;
  padding: 21px 23px;
  border-bottom: 1px solid #E9EDF2;;

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__name {
    color: #35383D;
    font-weight: bold;
  }

  &__date {
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-size: 10px;
    color: #B7C0C8;
  }

  &__msg {
    margin-top: 8px;
    line-height: 18px;
    color: #7D8790;
  }

  &.active {
    background-color: #fff;
    border-left: 2px solid #398BFF;

    .conversation-item__date {
      color: #7D8790;
    }
  }
}
</style>
