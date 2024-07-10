import { create } from 'zustand'
import { PersistOptions, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { IMessage } from './types'

interface StoreState {
  messages: IMessage[]
  addMessage: (message: IMessage) => void
  editMessage: (id: number, newText: string) => void
  deleteMessage: (id: number) => void
}

type State = StoreState
type CustomSetState = (partial: (state) => void) => void
type CustomStore = State & {
  setState: CustomSetState
}

const useStore = create<State, CustomStore>(
  persist(
    immer((set: CustomSetState) => ({
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
    } as PersistOptions<State>
  )
)

export default useStore
