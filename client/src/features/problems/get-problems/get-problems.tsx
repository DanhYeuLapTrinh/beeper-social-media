import { DataTable } from '@/components/data-table'
import { PROBLEMS_TABLE_HEADERS } from '@/constants/columns'
import { useProblems } from '@/hooks/problems/use-problems'
import { getColumns } from '@/lib/utils'
import { LCProblem } from '@/models/problem.model'
import { useEffect } from 'react'

export default function GetProblems() {
  const { mutate, isPending, data } = useProblems()

  useEffect(() => {
    mutate()
  }, [mutate])

  const columns = getColumns<LCProblem>({
    columns: PROBLEMS_TABLE_HEADERS,
    isLoading: isPending
  })

  return (
    <div className='w-[1000px] mx-auto my-10'>
      <DataTable columns={columns} data={data?.data.questions} />
    </div>
  )
}
