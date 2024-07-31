import GetProblemDetail from '@/features/problems/get-problem-detail/get-problem-detail'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

export default function WorkspaceID() {
  return (
    <ResizablePanelGroup direction='horizontal' className='rounded-lg border'>
      <ResizablePanel defaultSize={50} className='px-4 py-5'>
        <GetProblemDetail />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction='vertical'>
          <ResizablePanel defaultSize={65}></ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={35}></ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
