import { KeySquare, MailCheck, SquareAsterisk } from 'lucide-react'

type IconsType = 'key' | 'mail' | 'reset'

export default function AuthIcons({ type }: { type: IconsType }) {
  let iconElement

  switch (type) {
    case 'key':
      iconElement = <KeySquare className='w-12 h-12 border-1 text-primary' />
      break
    case 'mail':
      iconElement = <MailCheck className='w-12 h-12 border-1 text-primary' />
      break
    case 'reset':
      iconElement = <SquareAsterisk className='w-12 h-12 border-1 text-primary' />
      break
    default:
      iconElement = <div>Unknown icon</div>
  }

  return <div className='p-4 rounded-2xl bg-secondary mb-4'>{iconElement}</div>
}
