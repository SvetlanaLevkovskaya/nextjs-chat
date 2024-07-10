'use client'

import { FC, useCallback, useState } from 'react'

import clsx from 'clsx'

import { AvatarWrapper, MessageWrapper, TitleWrapper } from '@/components/message/components'
import MessageActions from '@/components/message/components/messageActions/messageActions'

import styles from './message.module.scss'

import useStore from '@/store'
import { IMessage } from '@/types'

interface MessageProps {
  message: IMessage
}

export const Message: FC<MessageProps> = ({ message }) => {
  const { editMessage, deleteMessage } = useStore((state) => ({
    editMessage: state.editMessage,
    deleteMessage: state.deleteMessage,
  }))

  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(message.text)

  const handleEditMessage = useCallback(() => {
    setIsEditing(true)
  }, [])

  const handleSaveEditMessage = useCallback(() => {
    const trimmedText = editText.trim()
    if (trimmedText && trimmedText !== message.text) {
      editMessage(message.id, trimmedText)
    }
    setIsEditing(false)
  }, [editText, editMessage, message.id, message.text])

  const handleDeleteMessage = useCallback(() => {
    deleteMessage(message.id)
  }, [deleteMessage, message.id])

  const wrapperStyle = clsx(styles.wrapper, {
    [styles.myWrapper]: message.user === 'me',
    [styles.botWrapper]: message.user !== 'me',
  })

  const messageStyle = clsx(styles.messageBubble, {
    [styles.myMessage]: message.user === 'me',
    [styles.botMessage]: message.user !== 'me',
  })

  const messageWidthStyle = !message.imageUrl
    ? { width: `calc(${message.text.length}ch + ${message.timestamp?.length}ch)` }
    : {}

  return (
    <div className={wrapperStyle}>
      {message.user !== 'me' && <AvatarWrapper />}

      <div className={messageStyle} style={messageWidthStyle}>
        {message.user !== 'me' && <TitleWrapper />}
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSaveEditMessage}
            onKeyDown={(e) => e.key === 'Enter' && handleSaveEditMessage()}
            autoFocus
            className={styles.editInput}
          />
        ) : (
          <MessageWrapper message={message} />
        )}

        {message.user === 'me' && (
          <div className={`${styles.triangle} ${styles.myMessageTriangle}`} />
        )}
        {message.user !== 'me' && (
          <div className={`${styles.triangle} ${styles.botMessageTriangle}`} />
        )}
      </div>
      {message.user === 'me' && !isEditing && (
        <MessageActions onEdit={handleEditMessage} onDelete={handleDeleteMessage} />
      )}
    </div>
  )
}
