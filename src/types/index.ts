export interface IMessage {
  id: number
  user: 'me' | 'bot'
  text: string
  imageUrl?: any
  timestamp: string
}
