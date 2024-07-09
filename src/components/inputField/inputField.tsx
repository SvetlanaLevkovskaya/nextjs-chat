'use client'

import { useState } from 'react'

import { LinkOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

import useStore from '@/store'

export const InputField = () => {
  const [text, setText] = useState('')
  const { addMessage } = useStore()

  const handleSend = () => {
    if (text.trim()) {
      addMessage({ id: Date.now(), user: 'me', text, timestamp: dayjs().format('h:mm A') })
      setText('')
    }
  }

  return (
    <div className="flex items-center px-3.5 py-0.5 border-t border-gray-200">
      <SmileOutlined style={{ color: '#3D3D3D' }} />

      <input
        className="flex-1 border-none outline-none p-[10px]"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Start typing..."
      />

      <div className="flex items-center gap-4">
        <LinkOutlined style={{ color: '#3D3D3D' }} />
        <SendOutlined onClick={handleSend} style={{ color: text ? '#007AFF' : '#8E8E93' }} />
      </div>
    </div>
  )
}
