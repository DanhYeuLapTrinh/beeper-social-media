import WorkspaceDescHeader from '@/components/workspace-desc-header'
import Wrapper from '@/components/wrapper'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { MIN_SIZE_PANEL } from '@/constants/index'
import { useAppDispatch, useAppSelector } from '@/lib/redux-toolkit/hooks'
import { setPanelSize } from '@/lib/redux-toolkit/slices/panel.slice'
import { useCallback, useRef } from 'react'
import { ImperativePanelHandle } from 'react-resizable-panels'
import { Outlet } from 'react-router-dom'

export default function WorkspaceLayout() {
  const ref = useRef<ImperativePanelHandle>(null)
  const dispatch = useAppDispatch()
  const panelSize = useAppSelector((state) => state.panel.size)

  const togglePanel = useCallback(() => {
    const panel = ref.current
    if (panel) {
      if (panel.getSize() === MIN_SIZE_PANEL) {
        panel.resize(50)
      } else {
        panel.resize(MIN_SIZE_PANEL)
      }
    }
  }, [])

  const expandPanel = useCallback(() => {
    const panel = ref.current
    if (panel) {
      if (panel.getSize() === 100) {
        panel.resize(50)
      } else {
        panel.resize(100)
      }
    }
  }, [])

  return (
    <Wrapper className='flex flex-col h-screen'>
      <p>Header</p>
      <div className='bg-background p-3 flex-grow overflow-auto'>
        <ResizablePanelGroup direction='horizontal' className='rounded-lg border'>
          <ResizablePanel
            onResize={(e) => dispatch(setPanelSize(e))}
            minSize={MIN_SIZE_PANEL}
            defaultSize={50}
            className='flex flex-col'
            ref={ref}
          >
            <WorkspaceDescHeader togglePanel={togglePanel} expandPanel={expandPanel} />
            {panelSize > MIN_SIZE_PANEL ? <Outlet /> : null}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <ResizablePanelGroup direction='vertical'>
              <ResizablePanel defaultSize={65}></ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={35}></ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Wrapper>
  )
}
