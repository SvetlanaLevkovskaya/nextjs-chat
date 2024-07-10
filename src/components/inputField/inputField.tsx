'use client'

import { ChangeEvent, useCallback, useRef, useState } from 'react'

import { SendOutlined, SmileOutlined, UploadOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

import styles from './inputField.module.scss'

import useStore from '@/store'
import { IMessage } from '@/types'

export const InputField = () => {
  const [text, setText] = useState('')
  const { addMessage } = useStore()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleSend = useCallback(() => {
    const trimmedText = text.trim()
    if (trimmedText) {
      const newMessage: IMessage = {
        id: Date.now(),
        user: 'me',
        text: trimmedText,
        timestamp: dayjs().format('h:mm A'),
      }
      addMessage(newMessage)
      setText('')
    }
  }, [text, addMessage])

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const imageMessage: IMessage = {
            id: Date.now(),
            user: 'me',
            text,
            imageUrl: e.target?.result as string,
            timestamp: dayjs().format('h:mm A'),
          }
          addMessage(imageMessage)
        }
        reader.readAsDataURL(file)
        setText('')
        if (fileInputRef.current) {
          if ('value' in fileInputRef.current) {
            fileInputRef.current.value = ''
          }
        }
      }
    },
    [addMessage, text]
  )

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      if ('click' in fileInputRef.current) {
        fileInputRef.current.click()
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <SmileOutlined style={{ color: '#3D3D3D' }} aria-label="Emoji Picker" />

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Start typing..."
        autoFocus
      />

      <div className={styles.icons}>
        <UploadOutlined
          onClick={handleUploadClick}
          style={{ color: '#3D3D3D' }}
          aria-label="Upload"
        />
        <SendOutlined
          onClick={handleSend}
          style={{ color: text ? '#007AFF' : '#8E8E93' }}
          aria-label="Send"
        />
      </div>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*"
        aria-label="File Input"
      />
    </div>
  )
}
