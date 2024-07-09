'use client'

import { useState } from 'react'

import { SendOutlined, SmileOutlined, UploadOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

import styles from './inputField.module.scss'

import useStore from '@/store'
import { IMessage } from '@/types'

export const InputField = () => {
  const [text, setText] = useState('')
  const { addMessage } = useStore()

  const handleSend = () => {
    if (text.trim()) {
      const newMessage: IMessage = {
        id: Date.now(),
        user: 'me',
        text,
        timestamp: dayjs().format('h:mm A'),
      }
      addMessage(newMessage)
      setText('')
    }
  }
  return (
    <div className={styles.wrapper}>
      <SmileOutlined style={{ color: '#3D3D3D' }} />

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Start typing..."
        autoFocus
      />

      <div className={styles.icons}>
        <UploadOutlined style={{ color: '#3D3D3D' }} />
        <SendOutlined onClick={handleSend} style={{ color: text ? '#007AFF' : '#8E8E93' }} />
      </div>
    </div>
  )
}
