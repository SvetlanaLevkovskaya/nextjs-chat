'use client'

import { useCallback, useEffect, useMemo, useRef } from 'react'

import dayjs from 'dayjs'

import { InputField } from '@/components/inputField/inputField'
import { MessageList } from '@/components/messageList/messageList'

import styles from './chatWindow.module.scss'

import useStore from '@/store'
import { IMessage } from '@/types'

export const ChatWindow = () => {
  const { messages, addMessage } = useStore()
  const messageListRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = useCallback(() => {
    if (messageListRef.current) {
      setTimeout(() => {
        const messageListElement = messageListRef.current
        if (messageListElement) {
          messageListElement.scrollTo({ behavior: 'smooth' })
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

  const currentDate = useMemo(() => dayjs().format('M/D/YYYY'), [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.dateWrapper}>{currentDate}</div>
      <MessageList />
      <InputField />
      <div ref={messageListRef} />
    </div>
  )
}
