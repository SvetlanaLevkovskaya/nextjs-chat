'use client'

import { useCallback, useEffect, useRef } from 'react'

import dayjs from 'dayjs'

import { InputField } from '@/components/inputField/inputField'
import { MessageList } from '@/components/messageList/messageList'

import useStore from '@/store'
import { IMessage } from '@/types'

export const ChatWindow = () => {
  const { messages, addMessage } = useStore()
  const messageListRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = useCallback(() => {
    if (messageListRef.current) {
      setTimeout(() => {
        const messageListElement = messageListRef.current
        if (messageListElement && 'scrollTo' in messageListElement) {
          messageListElement.scrollTo({
            top: messageListElement.scrollHeight,
            behavior: 'smooth',
          })
        }
      }, 0)
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

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
      <div ref={messageListRef} />
    </div>
  )
}
