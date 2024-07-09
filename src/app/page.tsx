import { ChatWindow } from '@/components/chatWindow/chatWindow'
import { Header } from '@/components/header/header'

export default function Home() {
  return (
    <div className="max-w-[656px] flex flex-col h-dvh">
      <Header />
      <ChatWindow />
    </div>
  )
}
