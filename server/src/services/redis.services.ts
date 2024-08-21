import { RedisError } from '@/models/api/error'
import { config } from 'dotenv'
import { createClient, RedisClientType } from 'redis'

config()

if (!process.env.REDIS_HOST || !process.env.REDIS_PASSWORD) {
  throw new Error('REDIS credentials are not defined')
}

const CONNECT_TIMEOUT = 10000

class RedisServices {
  private client: RedisClientType
  private connectTimeout: NodeJS.Timeout

  constructor() {
    this.client = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: 18827
      }
    })
    this.connectTimeout = setTimeout(() => {}, 0)
  }

  handleTimeout() {
    this.connectTimeout = setTimeout(() => {
      throw new RedisError()
    }, CONNECT_TIMEOUT)
  }

  handleConnection(redisInstance: any) {
    redisInstance.on('connect', () => {
      console.log('Connected to Redis')
      clearTimeout(this.connectTimeout)
    })
    redisInstance.on('reconnecting', () => {
      console.log('Reconnecting from Redis')
      this.handleTimeout()
    })
    redisInstance.on('end', () => {
      console.log('Disconnected from Redis')
      this.handleTimeout()
    })
    redisInstance.on('error', (err: any) => {
      console.error('Error connecting to Redis:', err.message)
      this.handleTimeout()
    })
  }

  async initRedis() {
    this.handleConnection(this.client)
    await this.client.connect()
  }

  getRedisClient() {
    return this.client
  }

  async closeRedis() {
    if (this.client) {
      try {
        await this.client.quit()
        console.log('Redis connection closed successfully')
      } catch (err) {
        console.error('Error closing Redis connection:', err)
      }
    }
  }
}

const redisServices = new RedisServices()
export default redisServices
