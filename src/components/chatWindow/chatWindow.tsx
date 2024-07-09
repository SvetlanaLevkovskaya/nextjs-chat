'use client'

import { useEffect } from 'react'

import dayjs from 'dayjs'

import { InputField } from '@/components/inputField/inputField'
import { MessageList } from '@/components/messageList/messageList'

import useStore from '@/store'
import { IMessage } from '@/types'

export const ChatWindow = () => {
  const { messages, addMessage } = useStore()

  useEffect(() => {
    if (messages.length && messages[messages.length - 1].user === 'me') {
      setTimeout(() => {
        const botMessage: IMessage = {
          id: Date.now(),
          user: 'bot',
          text: 'Hello World!',
          timestamp: dayjs().format('h:mm A'),
        }
        addMessage(botMessage)
      }, 1000)
    }
  }, [addMessage, messages])

  return (
    <div className="flex flex-col h-screen">
      <div className="text-center p-3.5 sm:p-3.5 sm:pl-28 text-sx text-neutral-500">
        {dayjs().format('M/D/YYYY')}
      </div>
      <MessageList />
      <InputField />
    </div>
  )
}
