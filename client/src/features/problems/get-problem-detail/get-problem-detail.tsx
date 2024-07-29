import { useParams } from 'react-router-dom'

type ProblemDetailParams = {
  workspaceId: string
}

export default function GetProblemDetail() {
  const { workspaceId } = useParams<ProblemDetailParams>()
  return <div>{workspaceId}</div>
}
