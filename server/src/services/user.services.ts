import dbServices from './db.services'
import { ObjectId } from 'mongodb'

class UserServices {
  async getMe(user_id: string) {
    const user = await dbServices.users.findOne(
      { _id: new ObjectId(user_id) },
      {
        projection: {
          password: 0,
          created_at: 0,
          updated_at: 0,
          status: 0
        }
      }
    )
    return user
  }
}
const userServices = new UserServices()
export default userServices
