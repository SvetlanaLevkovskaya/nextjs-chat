import { FC } from 'react'

import clsx from 'clsx'
import Image from 'next/image'

import { Check } from '@/components/ui/icons/icons'

import styles from './messageWrapper.module.scss'

import { IMessage } from '@/types'

interface MessageContainerProps {
  message: IMessage
}

export const MessageWrapper: FC<MessageContainerProps> = ({ message }) => (
  <div className={styles.messageContainer}>
    {message.imageUrl && (
      <div className={styles.imageWrapper}>
        <Image src={message.imageUrl} alt="Uploaded" width={250} height={250} />
      </div>
    )}

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
