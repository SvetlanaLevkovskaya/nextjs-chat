'use client'

import { FC, useCallback, useMemo } from 'react'

import clsx from 'clsx'

import {
  AvatarWrapper,
  MessageActions,
  MessageWrapper,
  TitleWrapper,
} from '@/components/message/components'

import styles from './message.module.scss'

import useStore from '@/store'
import { IMessage } from '@/types'

interface MessageProps {
  message: IMessage
}

export const Message: FC<MessageProps> = ({ message }) => {
  const { editMessage, deleteMessage } = useStore()

  const handleEditMessage = useCallback(() => {
    const newText = prompt('Edit message', message.text)
    if (newText && newText.trim() !== message.text.trim()) {
      editMessage(message.id, newText.trim())
    }
  }, [editMessage, message])

  const handleDeleteMessage = useCallback(() => {
    deleteMessage(message.id)
  }, [deleteMessage, message.id])

  const wrapperStyle = useMemo(
    () =>
      clsx(styles.wrapper, {
        [styles.myWrapper]: message.user === 'me',
        [styles.botWrapper]: message.user !== 'me',
      }),
    [message.user]
  )

  const messageStyle = useMemo(
    () =>
      clsx(styles.messageBubble, {
        [styles.myMessage]: message.user === 'me',
        [styles.botMessage]: message.user !== 'me',
      }),
    [message.user]
  )

  return (
    <div className={wrapperStyle}>
      {message.user !== 'me' && <AvatarWrapper />}
      <div
        className={messageStyle}
        style={{ width: `calc(${message.text.length}ch + ${message.timestamp.length}ch)` }}
      >
        {message.user !== 'me' && <TitleWrapper />}
        <MessageWrapper message={message} />
        {message.user === 'me' && (
          <div className={`${styles.triangle} ${styles.myMessageTriangle}`} />
        )}
        {message.user !== 'me' && (
          <div className={`${styles.triangle} ${styles.botMessageTriangle}`} />
        )}
      </div>
      {message.user === 'me' && (
        <MessageActions onEdit={handleEditMessage} onDelete={handleDeleteMessage} />
      )}
    </div>
  )
}
