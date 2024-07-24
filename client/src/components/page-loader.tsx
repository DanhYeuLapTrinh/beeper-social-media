import Wrapper from './wrapper'
import { Icons } from './ui/icons'

export default function PageLoader() {
  return (
    <Wrapper className='flex items-center justify-center bg-background'>
      <Icons.beeper className='w-20 h-20' />
    </Wrapper>
  )
}
