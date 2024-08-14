import { ProblemDetailParams } from '@/features/problems/get-problem-detail/get-problem-detail'
import { Navigate, useParams } from 'react-router-dom'

export default function WorkspaceRedirect() {
  const { workspaceId } = useParams<ProblemDetailParams>()
  return <Navigate to={`/workspace/${workspaceId}/description`} replace />
}
