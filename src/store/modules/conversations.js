import initialState from '@/mock/conversations';

export default {
  state: {
    ...initialState,
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

        const newParts = [...parts, message];

        commit('SET_MESSAGE', newParts);
      });
    },
  },
};
