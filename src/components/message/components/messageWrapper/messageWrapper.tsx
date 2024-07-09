import { FC } from 'react'

import clsx from 'clsx'

import { Check } from '@/components/ui/icons/icons'

import styles from './messageWrapper.module.scss'

import { IMessage } from '@/types'

interface MessageContainerProps {
  message: IMessage
}

export const MessageWrapper: FC<MessageContainerProps> = ({ message }) => (
  <div className={styles.messageContainer}>
    <p className={styles.messageText}>{message.text}</p>
    <div className={styles.messageFooter}>
      <p
        className={clsx({
          [styles.textNeutral500]: message.user !== 'me',
          [styles.fontLight]: message.user == 'me',
        })}
      >
        {message.timestamp}
      </p>
      {message.user === 'me' && <Check />}
    </div>
  </div>
)
