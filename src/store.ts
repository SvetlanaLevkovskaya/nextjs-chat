import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { IMessage } from './types'

type StoreState = {
  messages: IMessage[]
  addMessage: (message: IMessage) => void
  editMessage: (id: number, newText: string) => void
  deleteMessage: (id: number) => void
}

const useStore = create<StoreState, [['zustand/persist', unknown], ['zustand/immer', never]]>(
  persist(
    immer((set) => ({
      messages: [],
      addMessage: (message: IMessage) =>
        set((state) => {
          state.messages.push(message)
        }),
      editMessage: (id: number, newText: string) =>
        set((state) => {
          const msg = state.messages.find((msg) => msg.id === id)
          if (msg) {
            msg.text = newText
          } else {
            console.warn(`Message with id ${id} not found`)
          }
        }),
      deleteMessage: (id: number) =>
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
