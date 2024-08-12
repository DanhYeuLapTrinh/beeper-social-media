import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ProblemDetailResponseAPI } from '@/models/problem.model'

interface GetProblemAccordionProps {
  data: ProblemDetailResponseAPI
  topics: any
}

export default function GetProblemAccordion({ data, topics }: GetProblemAccordionProps) {
  console.log(data)
  return (
    <Accordion className='mt-24' type='single' collapsible>
      <AccordionItem value='item-1'>
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
