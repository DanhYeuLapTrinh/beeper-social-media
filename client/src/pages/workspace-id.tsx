import GetProblemDetail from '@/features/problems/get-problem-detail/get-problem-detail'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

export default function WorkspaceID() {
  return (
    <ResizablePanelGroup direction='horizontal' className='rounded-lg border'>
      <ResizablePanel defaultSize={50}>
        <GetProblemDetail />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction='vertical'>
          <ResizablePanel defaultSize={25}></ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}></ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
