import { create } from 'zustand'

import { IMessage } from './types'

const loadMessages = (): IMessage[] => {
  if (typeof window !== 'undefined') {
    const storedMessages = localStorage.getItem('messages')
    return storedMessages ? JSON.parse(storedMessages) : []
  }
  return []
}

const saveMessages = (messages: IMessage[]) => {
  localStorage.setItem('messages', JSON.stringify(messages))
}

interface StoreState {
  messages: IMessage[]
  addMessage: (message: IMessage) => void
  editMessage: (id: number, newText: string) => void
  deleteMessage: (id: number) => void
}

const useStore = create<StoreState>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => {
      const newMessages = [...state.messages, message]
      if (typeof window !== 'undefined') {
        saveMessages(newMessages)
      }
      return { messages: newMessages }
    }),
  editMessage: (id, newText) =>
    set((state) => {
      const newMessages = state.messages.map((msg) =>
        msg.id === id ? { ...msg, text: newText } : msg
      )
      if (typeof window !== 'undefined') {
        saveMessages(newMessages)
      }
      return { messages: newMessages }
    }),
  deleteMessage: (id) =>
    set((state) => {
      const newMessages = state.messages.filter((msg) => msg.id !== id)
      if (typeof window !== 'undefined') {
        saveMessages(newMessages)
      }
      return { messages: newMessages }
    }),
}))

if (typeof window !== 'undefined') {
  const storedMessages = loadMessages()
  useStore.setState?.({ messages: storedMessages })
}

export default useStore
