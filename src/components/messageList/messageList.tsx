'use client'

import { motion } from 'framer-motion'

import { Message } from '@/components/message/message'

import useStore from '@/store'

export const MessageList = () => {
  const { messages } = useStore()

  return (
    <div className="flex-1">
      {messages.map((msg) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Message message={msg} />
        </motion.div>
      ))}
    </div>
  )
}
