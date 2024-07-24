import UserTypeCard from './user-type-card'
import { UserType } from '@/models'
import { Dispatch, SetStateAction } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface UserTypeFormProps {
  userType: UserType
  setUserType: Dispatch<SetStateAction<UserType>>
  register: UseFormRegister<any>
}

export default function UserTypeForm({ userType, setUserType, register }: UserTypeFormProps) {
  return (
    <div className='flex flex-col gap-3 mb-1'>
      <UserTypeCard
        userType={userType}
        setUserType={setUserType}
        value='owner'
        title='business_owner'
        description='business_owner_desc'
        register={register}
      />
      <UserTypeCard
        userType={userType}
        setUserType={setUserType}
        value='student'
        title='student_owner'
        description='student_owner_desc'
        register={register}
      />
    </div>
  )
}
