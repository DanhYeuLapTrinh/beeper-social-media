import { Button } from '@/components/ui/button'
import { useProblem } from '@/hooks/problems/use-problem'
import { GetProblemTestcaseResponseAPI } from '@/models/api/responses'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProblemDetailParams } from '../get-problem-detail/get-problem-detail'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function GetProblemTestcase() {
  const [chosenTestcase, setChosenTestcase] = useState(0)
  const { workspaceId } = useParams<ProblemDetailParams>()
  const { data } = useProblem<GetProblemTestcaseResponseAPI>(String(workspaceId), 'testcase')

  const [testcasePlaceholder, result] = (data?.data.exampleTestcaseList[chosenTestcase] ?? '').split('\n')

  return (
    <div className='flex flex-col gap-2 p-4'>
      <div className='flex items-center gap-2'>
        {data?.data.exampleTestcaseList.map((testcase, index) => (
          <Button
            key={testcase}
            size='sm'
            variant={index === chosenTestcase ? 'secondary' : 'ghost'}
            onClick={() => setChosenTestcase(index)}
          >
            Case {index + 1}
          </Button>
        ))}
      </div>
      <Label className='mt-4'>nums =</Label>
      <Input defaultValue={testcasePlaceholder} className='mb-5' />
      <Label>target =</Label>
      <Input defaultValue={result} />
    </div>
  )
}
