import Editor from '@monaco-editor/react'
import { MIN_SIZE_PANEL } from '@/constants'
import { useAppSelector } from '@/lib/redux-toolkit/hooks'

export default function CodeEditor() {
  const panelSize = useAppSelector((state) => state.panel.size)

  return (
    <Editor
      className={panelSize === 100 - MIN_SIZE_PANEL ? 'hidden' : ''}
      defaultLanguage='TypeScript'
      theme='vs-dark'
      defaultValue='// some comment'
      language='java'
    />
  )
}
