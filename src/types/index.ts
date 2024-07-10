export interface IMessage {
  id: number
  user: 'me' | 'bot'
  text: string
  imageUrl?: string
  timestamp: string
}
