export class ResponseOptions {
  message: string
  status?: number
  data?: any
  constructor({ message, status, data }: { message: string; status?: number; data?: any }) {
    this.message = message
    this.status = status
    this.data = data
  }
}
