import ButtonWithLoader from '@/components/ui/button-with-loader'
import { RiShareBoxLine } from 'react-icons/ri'
import { Separator } from '@/components/ui/separator'
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { FaRegStar } from 'react-icons/fa'
import { MdOutlineChatBubbleOutline } from 'react-icons/md'

export default function ProblemInteractions() {
  return (
    <div className='flex items-center p-2 gap-1'>
      <div className='flex items-center gap-0.5'>
        <ButtonWithLoader
          isLoading={false}
          text='sign_in'
          icon={<AiOutlineLike />}
          variant='secondary'
          className='rounded-tr-none rounded-br-none'
        />
        <ButtonWithLoader
          isLoading={false}
          icon={<AiOutlineDislike />}
          variant='secondary'
          className='rounded-tl-none rounded-bl-none'
        />
      </div>
      <ButtonWithLoader isLoading={false} text='sign_in' icon={<MdOutlineChatBubbleOutline />} variant='ghost' />
      <Separator orientation='vertical' className='h-5 mx-1' />
      <ButtonWithLoader isLoading={false} icon={<FaRegStar />} variant='ghost' size='icon' />
      <ButtonWithLoader isLoading={false} icon={<RiShareBoxLine />} variant='ghost' size='icon' />
    </div>
  )
}
