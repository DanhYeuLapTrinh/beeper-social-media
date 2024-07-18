import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import Wrapper from '@/components/wrapper'
import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {
  return (
    <Wrapper className='flex bg-secondary'>
      <Sidebar />
      <div className='flex flex-col w-full'>
        <Header />
        <Outlet />
      </div>
    </Wrapper>
  )
}
