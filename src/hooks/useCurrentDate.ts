import { useEffect, useState } from 'react'

import dayjs from 'dayjs'

const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState(dayjs().format('M/D/YYYY'))

  useEffect(() => {
    const updateDate = () => {
      setCurrentDate(dayjs().format('M/D/YYYY'))
    }
    updateDate()

    const midnightTimestamp = dayjs().endOf('day').add(1, 'second').toDate().getTime()

    const now = new Date().getTime()
    const initialTimeout = midnightTimestamp - now

    const hours = Math.floor((initialTimeout / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((initialTimeout / (1000 * 60)) % 60)
    const seconds = Math.floor((initialTimeout / 1000) % 60)

    console.log(`Hours: ${hours}, Minutes: ${minutes}, Seconds: ${seconds}`)

    const timeoutId = setTimeout(() => {
      updateDate()
      setInterval(updateDate, 86400000)
    }, initialTimeout)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return currentDate
}

export default useCurrentDate
