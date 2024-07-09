'use client'

import { Message } from '@/components/message/message'

import useStore from '@/store'

export const MessageList = () => {
  const { messages } = useStore()

  return (
    <div className="flex-1">
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
    </div>
  )
}
