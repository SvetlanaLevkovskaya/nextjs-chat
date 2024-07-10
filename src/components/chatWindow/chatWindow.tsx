'use client'

import { useEffect } from 'react'

import dayjs from 'dayjs'

import { InputField } from '@/components/inputField/inputField'
import { Messages } from '@/components/messages/messages'

import useCurrentDate from '@/hooks/useCurrentDate'

import styles from './chatWindow.module.scss'

import useStore from '@/store'
import { IMessage } from '@/types'

export const ChatWindow = () => {
  const { messages, addMessage } = useStore()
  const currentDate = useCurrentDate()

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
    <div className={styles.wrapper}>
      <div className={styles.dateWrapper}>{currentDate}</div>
      <Messages />
      <InputField />
    </div>
  )
}
