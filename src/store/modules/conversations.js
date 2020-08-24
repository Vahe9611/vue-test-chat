export default {
  state: {
    items: [
      {
        id: 1,
        subject: 'Простой запрос',
        created: '2019-08-01 23:59',
        parts: [
          {
            id: 1,
            userId: 1,
            author: 'Вася',
            text: 'Привет, как дела?',
            created: '2019-08-01 23:59',
          },
          {
            id: 2,
            userId: 2,
            author: 'Петя',
            created: '2019-08-02 01:20',
            text: 'Привет, все хорошо, спасибо!',
          },
          {
            id: 3,
            userId: 2,
            author: 'Петя',
            created: '2019-08-02 05:20',
            text: 'А у тебя?',
          },
        ],
      },
      {
        id: 2,
        subject: 'Вопрос по домену',
        created: '2016-03-02 14:19',
        parts: [
          {
            id: 1,
            userId: 3,
            author: 'Петр',
            created: '2019-08-06 12:20',
            text: 'Здравствуйте, тут есть кто-нибудь?',
          },
          {
            id: 2,
            userId: 1,
            author: 'Вася',
            created: '2019-08-06 12:34',
            text: 'Да, я вас слушаю!',
          },
          {
            id: 3,
            userId: 3,
            author: 'Петр',
            created: '2019-08-06 12:38',
            text: 'Помогите мне настроить домен!',
          },
        ],
      },
    ],
    currentItem: {
      id: 1,
      subject: 'Простой запрос',
      created: '2019-08-01 23:59',
      parts: [
        {
          id: 1,
          userId: 1,
          author: 'Вася',
          text: 'Привет, как дела?',
          created: '2019-08-01 23:59',
        },
        {
          id: 2,
          userId: 2,
          author: 'Петя',
          created: '2019-08-02 01:20',
          text: 'Привет, все хорошо, спасибо!',
        },
        {
          id: 3,
          userId: 2,
          author: 'Петя',
          created: '2019-08-02 05:20',
          text: 'А у тебя?',
        },
      ],
    },
  },
  getters: {
    conversations: (state) => state.items,
    currentConversation: (state) => state.currentItem,
  },
  mutations: {
    SET_CONVERSATION: (state, conversation) => {
      state.currentItem = conversation;
    },
    SET_MESSAGE: (state, data) => {
      const { items, currentItem } = state;

      const newItem = { ...currentItem, parts: data };

      const newItems = items.map((item) => (item.id === newItem.id ? newItem : item));

      state.currentItem = newItem;
      state.items = newItems;
    },
  },
  actions: {
    selectConversation({ commit, state }, id) {
      const conversation = state.items.find((item) => item.id === Number(id));
      commit('SET_CONVERSATION', conversation);
    },

    sendMessage({ commit, state }, data) {
      // emiting api call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('success');
        }, 1000);
      }).then(() => {
        const { parts } = state.currentItem;

        const message = {
          ...data,
          id: parts.length + 1,
          created: new Date(),
        };
        parts.push(message);

        commit('SET_MESSAGE', parts);
      });
    },
  },
};
