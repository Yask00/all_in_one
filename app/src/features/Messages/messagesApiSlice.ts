import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../store/createAppSlice";
import { Message } from "../../types/interfaces";

export interface MessagesState {
  messages: Message[];
}

const initialState: MessagesState = {
  messages: [],
};

export const messagesSlice = createAppSlice({
  name: "messages",
  initialState,
  reducers: (create) => ({
    addMessage: create.reducer((state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    }),
  }),
  selectors: {
    selectMessages: (messages) => messages.messages,
  },
});

export const { addMessage } = messagesSlice.actions;
export const { selectMessages } = messagesSlice.selectors;
