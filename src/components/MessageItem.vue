<template>
  <div
    class="message"
    :class="{'message_from-me': fromMe}"
  >
    <div
      class="message__text"
      :class="{'message__text_from-me': fromMe}"
    >
      {{text}}
    </div>
    <div class="message__info">
      <span class="message__sender">
        {{author}}
      </span>
      <span class="message__date">
        {{messageDate}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageItem',
  props: {
    fromMe: Boolean,
    text: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  computed: {
    messageDate() {
      return this.$moment(this.date).format('DD.MM.YYYY HH:mm');
    },
  },

};
</script>

<style lang="scss" scoped>
.message {
  width: 100%;
  display: flex;
  flex-direction: column;

  &_from-me {
    align-items: flex-end;
  }

  &__text {
    width: 60%;
    padding: 20px;
    background-color: #F6F7F9;
    border-radius: 8px 8px 8px 0px;
    line-height: 141.62%;
    color: #475453;

    &_from-me {
      background: #E9F5F4;
      border-radius: 8px 8px 0px 8px;
    }
  }

  &__info {
    margin-top: 16px;
    display: flex;
    align-items: center;
  }

  &__sender {
    font-weight: bold;
    color: #000000;
  }

  &__date {
    margin-left: 12px;
    color: #B7C0C8;
    font-size: 10px;
  }
}
</style>
