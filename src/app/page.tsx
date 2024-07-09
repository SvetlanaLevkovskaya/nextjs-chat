import { ChatWindow } from '@/components/chatWindow/chatWindow'
import { Header } from '@/components/header/header'

export default function Home() {
  return (
    <div className="flex flex-col h-dvh max-w-[656px] mx-auto">
      <Header />
      <ChatWindow />
    </div>
  )
}
