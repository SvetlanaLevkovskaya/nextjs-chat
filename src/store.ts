import { create } from 'zustand'

import { IMessage } from './types'

interface StoreState {
  messages: IMessage[]
  addMessage: (message: IMessage) => void
  editMessage: (id: number, newText: string) => void
  deleteMessage: (id: number) => void
}

const useStore = create<StoreState>((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  editMessage: (id, newText) =>
    set((state) => ({
      messages: state.messages.map((msg) => (msg.id === id ? { ...msg, text: newText } : msg)),
    })),
  deleteMessage: (id) =>
    set((state) => ({ messages: state.messages.filter((msg) => msg.id !== id) })),
}))

export default useStore
