export interface IMessage {
  id: number
  user: 'me' | 'bot'
  text: string
  timestamp: string
}
