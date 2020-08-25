<template>
  <div class="thread">
    <div ref="container" class="thread__messages_container">
      <Loading
        :active.sync="isLoading"
        :is-full-page="false"
        loader="dots"
      />

      <div class="thread__messages">
        <div
          v-for="message in messages"
          :key="message.id"
          class="thread__message"
        >
          <MessageItem
            :fromMe="message.userId === 1"
            :text="message.text"
            :author="message.author"
            :date="new Date(message.created)"
          />
        </div>
      </div>
    </div>
    <div class="thread__message-form">
      <form
        class="message-form"
        v-on:submit.prevent="sendMessage"
      >
        <div class="message-form__msg-container">
          <textarea
            name="message"
            class="message-form__msg"
            placeholder="Введите текст..."
            v-model="text"
            @keydown.enter.exact.prevent
            @keyup.enter.exact="sendMessage"
          />
        </div>
        <button type="submit" class="message-form__send-button">
          <VectorSvg />
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import MessageItem from '@/components/MessageItem.vue';
import { mapGetters } from 'vuex';
import Loading from 'vue-loading-overlay';
import VectorSvg from '../assets/Vector.svg';

export default {
  name: 'Thread',
  components: {
    VectorSvg,
    MessageItem,
    Loading,
  },
  data() {
    return {
      text: '',
      isLoading: false,
    };
  },
  mounted() {
    this.scrollBottom();

    this.emitLoading();
  },
  watch: {
    $route() {
      this.emitLoading();
    },
  },
  computed: {
    ...mapGetters([
      'currentConversation',
    ]),

    messages() {
      return this.currentConversation.parts;
    },
  },
  methods: {
    async sendMessage() {
      if (this.text === '') return;

      this.isLoading = true;

      const message = {
        userId: 1,
        author: 'Вася',
        text: this.text,
      };

      await this.$store.dispatch('sendMessage', message);

      this.resetState();
      this.scrollBottom();
    },

    emitLoading() {
      const settings = {
        container: this.$refs.container,
        loader: 'dots',
      };

      const loader = this.$loading.show(settings);

      // simulate AJAX
      setTimeout(() => {
        loader.hide();
      }, 1000);
    },

    scrollBottom() {
      const { container } = this.$refs;
      container.scrollTop = container.scrollHeight;
    },

    resetState() {
      this.isLoading = false;
      this.text = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.thread {
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  &__messages {

    &_container {
      overflow: auto;
      height: 100%;
    }

    box-sizing: border-box;
    min-height: 100%;
    flex: 1;
    padding: 24px 16px 42px 32px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  &__message {
    margin: 10px 0;
  }

  &__message-form {
    width: 100%;
    position: static;
    margin-top: auto;
    bottom: 0;
    max-height: 80px;
    min-height: 80px;
  }

  .message-form {
    display: flex;
    align-items: center;
    height: 80px;

    &__msg-container {
      flex: 1;
      height: inherit;
      border-top: 1px solid #E9EDF2;
      box-sizing: border-box;
    }

    &__msg {
      width: 100%;
      max-height: 100%;
      resize: none;
      border: none;
      outline: none;
      padding: 30px 34px;
      box-sizing: border-box;
    }

    &__send-button {
      flex: 1;
      max-width: 80px;
      height: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #398BFF;
      cursor: pointer;
      outline: none;
      border: none;
    }

  }
}
</style>
