import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { IMessage } from './types'

interface StoreState {
  messages: IMessage[]
  addMessage: (message: IMessage) => void
  editMessage: (id: number, newText: string) => void
  deleteMessage: (id: number) => void
}

const useStore = create<StoreState>(
  persist(
    immer((set) => ({
      messages: [],
      addMessage: (message) =>
        set((state) => {
          state.messages.push(message)
        }),
      editMessage: (id, newText) =>
        set((state) => {
          const msg = state.messages.find((msg) => msg.id === id)
          if (msg) {
            msg.text = newText
          }
        }),
      deleteMessage: (id) =>
        set((state) => {
          state.messages = state.messages.filter((msg) => msg.id !== id)
        }),
    })),
    {
      name: 'messages',
    }
  )
)

export default useStore
