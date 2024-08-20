import Header from '@/components/header'
import Wrapper from '@/components/wrapper'
import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {
  return (
    <Wrapper className='flex bg-background'>
      <div className='flex flex-col w-full'>
        <Header />
        <div className='w-full h-full bg-background'>
          <Outlet />
        </div>
      </div>
    </Wrapper>
  )
}
