'use client'

import { FC } from 'react'

import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import clsx from 'clsx'
import Image from 'next/image'

import { Check } from '@/components/ui/icons/icons'

import styles from './message.module.css'

import useStore from '@/store'
import { IMessage } from '@/types'

interface MessageProps {
  message: IMessage
}

export const Message: FC<MessageProps> = ({ message }) => {
  const { editMessage, deleteMessage } = useStore()

  const handleEditMessage = () => {
    const newText = prompt('Edit message', message.text)
    if (newText) {
      editMessage(message.id, newText)
    }
  }

  const handleDeleteMessage = () => {
    deleteMessage(message.id)
  }

  return (
    <div
      className={clsx(styles.wrapper, {
        [styles.myWrapper]: message.user === 'me',
        [styles.botWrapper]: message.user !== 'me',
      })}
    >
      {message.user !== 'me' && (
        <div className={styles.avatarWrapper}>
          <Image src="/avatar.png" alt="avatar" className={styles.avatar} width={32} height={32} />
          <span className={styles.badge}></span>
        </div>
      )}
      <div
        className={clsx(styles.messageBubble, {
          [styles.myMessage]: message.user === 'me',
          [styles.right]: message.user === 'me',
          [styles.botMessage]: message.user !== 'me',
          [styles.left]: message.user !== 'me',
        })}
        style={{ width: `calc(${message.text.length}ch + ${message.timestamp.length}ch)` }}
      >
        {message.user !== 'me' && (
          <div className={styles.titleWrapper}>
            <p className={styles.titleName}>Andrew</p>
            <p className={styles.textNeutral500}>Product</p>
          </div>
        )}

        <div className={styles.messageContainer}>
          <p className={styles.messageText}>{message.text}</p>
          <div className={styles.messageFooter}>
            <p className={clsx({ [styles.textNeutral500]: message.user !== 'me' })}>
              {message.timestamp}
            </p>
            {message.user === 'me' && <Check />}
          </div>
        </div>
      </div>
      {message.user === 'me' && (
        <div className="flex mt-1 space-x-2">
          <EditOutlined style={{ color: '#8E8E93' }} onClick={handleEditMessage} />
          <DeleteOutlined style={{ color: '#8E8E93' }} onClick={handleDeleteMessage} />
        </div>
      )}
    </div>
  )
}
