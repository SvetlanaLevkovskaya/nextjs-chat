'use client'

import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'

import { SendOutlined, SmileOutlined, UploadOutlined } from '@ant-design/icons'
import clsx from 'clsx'
import dayjs from 'dayjs'

import styles from './inputField.module.scss'

import useStore from '@/store'
import { IMessage } from '@/types'

export const InputField = () => {
  const [text, setText] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const { addMessage } = useStore((state) => ({
    addMessage: state.addMessage,
  }))

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (inputRef.current) {
      'focus' in inputRef.current && inputRef.current.focus()
      setIsFocused(true)
    }
  }, [])

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
          'value' in fileInputRef.current && (fileInputRef.current.value = '')
        }
      }
    },
    [addMessage, text]
  )

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      'click' in fileInputRef.current && fileInputRef.current.click()
    }
  }

  return (
    <div className={styles.wrapper}>
      <SmileOutlined style={{ color: '#3D3D3D', fontSize: 16 }} aria-label="Emoji Picker" />

      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Start typing..."
        autoFocus
      />

      <div className={styles.icons}>
        <div className={styles.iconWrapper} onClick={handleUploadClick}>
          <UploadOutlined aria-label="Upload" style={{ fontSize: 16 }} />
        </div>
        <div
          className={clsx(styles.sendIconWrapper, { [styles.activeSendIcon]: text || isFocused })}
          onClick={handleSend}
        >
          <SendOutlined aria-label="Send" style={{ fontSize: 16 }} />
        </div>
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
