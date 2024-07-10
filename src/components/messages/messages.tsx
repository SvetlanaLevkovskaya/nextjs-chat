'use client'

import { useEffect, useRef } from 'react'

import clsx from 'clsx'
import { motion } from 'framer-motion'

import { Message } from '@/components/message/message'

import styles from './messages.module.scss'

import useStore from '@/store'

export const Messages = () => {
  const { messages } = useStore()
  const messageEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messageEndRef.current &&
      'scrollIntoView' in messageEndRef.current &&
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className={clsx(styles.wrapper, styles.scrollbar)}>
      {messages.map((msg) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Message message={msg} />
        </motion.div>
      ))}
      <div ref={messageEndRef} />
    </div>
  )
}
