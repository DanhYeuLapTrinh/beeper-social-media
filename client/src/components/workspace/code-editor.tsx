import CodeMirror from '@uiw/react-codemirror'
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night'
import { LANGUAGES, MIN_SIZE_PANEL } from '@/constants'
import { useAppSelector } from '@/lib/redux-toolkit/hooks'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'

export default function CodeEditor() {
  const panelSize = useAppSelector((state) => state.panel.size)

  const [language, setLanguage] = useState('javascript')

  return (
    <div className='h-full'>
      <Select onValueChange={(e) => setLanguage(e)} defaultValue={language}>
        <SelectTrigger className='border-none w-32 m-1'>
          <SelectValue placeholder='Language' />
        </SelectTrigger>
        <SelectContent>
          {Object.values(LANGUAGES).map((lang) => (
            <SelectItem key={lang.id} value={lang.value}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <CodeMirror
        className={panelSize === 100 - MIN_SIZE_PANEL ? 'hidden' : 'h-full overflow-y-scroll text-base'}
        value='console.log("Hello, World!")'
        height='100%'
        theme={tokyoNight}
        extensions={[LANGUAGES[language].lang]}
      />
    </div>
  )
}
