import CodeEditor from '@/components/workspace/code-editor'
import WorkspaceHeader from '@/components/workspace/workspace-header'
import Wrapper from '@/components/wrapper'
import GetProblemTestcase from '@/features/problems/get-problem-testcase/get-problem-testcase'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Button } from '@/components/ui/button'
import {
  DEFAULT_CODE_SIZE_PANEL,
  DEFAULT_SIZE_PANEL,
  DEFAULT_TEST_CASE_SIZE_PANEL,
  EXPAND_DESC_SIZE_PANEL,
  FULL_SIZE_PANEL,
  MIN_SIZE_PANEL,
  TOGGLE_SIZE_PANEL
} from '@/constants/index'
import {
  CODE_EDITOR_HEADER_MENU_ITEMS,
  TEST_CASE_HEADER_MENU_ITEMS,
  WORKSPACE_HEADER_MENU_ITEMS
} from '@/constants/menu-items'
import { ProblemDetailParams } from '@/features/problems/get-problem-detail/get-problem-detail'
import { useProblemSuspense } from '@/hooks/problems/use-problem'
import { useAppDispatch, useAppSelector } from '@/lib/redux-toolkit/hooks'
import { setPanelSize } from '@/lib/redux-toolkit/slices/panel.slice'
import { RefObject, startTransition, useCallback, useRef, useState } from 'react'
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from 'react-icons/io'
import { ImperativePanelHandle } from 'react-resizable-panels'
import { Outlet, useParams } from 'react-router-dom'

export default function WorkspaceLayout() {
  const dispatch = useAppDispatch()
  const panelSize = useAppSelector((state) => state.panel.size)

  const descRef = useRef<ImperativePanelHandle>(null)
  const codeRef = useRef<ImperativePanelHandle>(null)
  const testRef = useRef<ImperativePanelHandle>(null)

  const [isExpand, setIsExpand] = useState<undefined | string>(undefined)
  const [isToggle, setIsToggle] = useState<undefined | string>(undefined)

  const { workspaceId } = useParams<ProblemDetailParams>()

  useProblemSuspense(String(workspaceId))

  const handlePanel = useCallback((ref: RefObject<ImperativePanelHandle>, initialSize: number, targetSize: number) => {
    const panel = ref.current
    if (panel) {
      const size = panel.getSize()
      startTransition(() => {
        if (initialSize > targetSize) {
          // toggle panel size
          if (size > targetSize) {
            panel.resize(targetSize)
            setIsToggle(ref.current?.getId())
          } else {
            panel.resize(initialSize)
            setIsToggle(undefined)
          }
        } else {
          // expand panel size
          if (size < targetSize && size !== targetSize - MIN_SIZE_PANEL) {
            panel.resize(targetSize)
            setIsExpand(ref.current?.getId())
          } else {
            panel.resize(initialSize)
            setIsExpand(undefined)
          }
        }
      })
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
            defaultSize={DEFAULT_SIZE_PANEL}
            className='flex flex-col'
            ref={descRef}
          >
            <WorkspaceHeader
              isExpand={isExpand === descRef.current?.getId()}
              isCollapse={panelSize <= MIN_SIZE_PANEL}
              menuItems={WORKSPACE_HEADER_MENU_ITEMS}
              toggleAction={
                <Button
                  size='icon'
                  variant='ghost'
                  onClick={() => handlePanel(descRef, DEFAULT_SIZE_PANEL, MIN_SIZE_PANEL)}
                >
                  {panelSize === MIN_SIZE_PANEL || isToggle === descRef.current?.getId() ? (
                    <IoIosArrowForward />
                  ) : (
                    <IoIosArrowBack />
                  )}
                </Button>
              }
              expandPanel={() => handlePanel(descRef, DEFAULT_SIZE_PANEL, FULL_SIZE_PANEL)}
            />
            {panelSize > MIN_SIZE_PANEL ? <Outlet /> : null}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={MIN_SIZE_PANEL}>
            <ResizablePanelGroup direction='vertical'>
              <ResizablePanel defaultSize={DEFAULT_CODE_SIZE_PANEL} ref={codeRef}>
                <WorkspaceHeader
                  isExpand={isExpand === codeRef.current?.getId()}
                  isCollapse={panelSize === FULL_SIZE_PANEL - MIN_SIZE_PANEL}
                  menuItems={CODE_EDITOR_HEADER_MENU_ITEMS}
                  toggleAction={
                    <Button
                      size='icon'
                      variant='ghost'
                      onClick={() => handlePanel(codeRef, DEFAULT_SIZE_PANEL, TOGGLE_SIZE_PANEL)}
                    >
                      {isToggle === codeRef.current?.getId() ? <IoIosArrowDown /> : <IoIosArrowUp />}
                    </Button>
                  }
                  expandPanel={() => handlePanel(codeRef, DEFAULT_SIZE_PANEL, EXPAND_DESC_SIZE_PANEL)}
                />
                <CodeEditor />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={DEFAULT_TEST_CASE_SIZE_PANEL} ref={testRef}>
                <WorkspaceHeader
                  isExpand={isExpand === testRef.current?.getId()}
                  isCollapse={panelSize === FULL_SIZE_PANEL - MIN_SIZE_PANEL}
                  menuItems={TEST_CASE_HEADER_MENU_ITEMS}
                  toggleAction={
                    <Button
                      size='icon'
                      variant='ghost'
                      onClick={() => handlePanel(testRef, DEFAULT_TEST_CASE_SIZE_PANEL, TOGGLE_SIZE_PANEL)}
                    >
                      {isToggle === testRef.current?.getId() ? <IoIosArrowDown /> : <IoIosArrowUp />}
                    </Button>
                  }
                  expandPanel={() => handlePanel(testRef, DEFAULT_TEST_CASE_SIZE_PANEL, EXPAND_DESC_SIZE_PANEL)}
                />
                <GetProblemTestcase />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Wrapper>
  )
}
