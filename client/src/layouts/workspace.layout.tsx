import Wrapper from '@/components/wrapper'
import { Outlet } from 'react-router-dom'

export default function WorkspaceLayout() {
  return (
    <Wrapper className='flex'>
      {/* TODO: Coding navigator */}
      <div className='flex flex-col w-full'>
        Header
        <div className='w-full h-full bg-background p-4'>
          <Outlet />
        </div>
      </div>
    </Wrapper>
  )
}
