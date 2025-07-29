export const selectChannels = (state) => state.channels.channels;
export const selectCurrentChannelId = (state) => state.channels.currentChannelId;
export const selectCurrentChannel = (state) => {
  const channels = selectChannels(state);
  const currentId = selectCurrentChannelId(state);
  return channels.find(ch => ch.id === parseInt(currentId, 10));
};
export const selectChannelsLoading = (state) => state.channels.loading;

export const selectAllMessages = (state) => state.messages.messages;
export const selectCurrentChannelMessages = (state) => {
  const messages = selectAllMessages(state);
  const currentChannelId = selectCurrentChannelId(state);
  return messages.filter(msg => msg.channelId === parseInt(currentChannelId, 10));
};
export const selectMessagesLoading = (state) => state.messages.loading;
export const selectMessagesSending = (state) => state.messages.sending;

export const selectUsername = (state) => state.auth.username;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => !!state.auth.token;
