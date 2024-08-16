import Wrapper from '../wrapper'
import { Icons } from './icons'

export default function PageLoader() {
  return (
    <Wrapper className='fixed inset-0 flex items-center justify-center bg-background z-50'>
      <Icons.beeper className='w-20 h-20' />
    </Wrapper>
  )
}
