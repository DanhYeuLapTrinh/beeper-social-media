import parse from 'html-react-parser'
import styles from '../get-problem-detail/get-problem-detail.module.scss'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { PROBLEM_ACCORDION_ITEMS } from '@/constants/menu-items'
import { useTranslation } from 'react-i18next'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { getDifficultyColor } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import { TopicTag } from '@/models/base.model'

interface GetProblemAccordionProps {
  topics: TopicTag[] | undefined
  hints: string[] | undefined
}

export default function ProblemAccordion({ hints, topics }: GetProblemAccordionProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()

  // TODO: move workspace to constant
  const handleNavigate = (titleSlug: string) => {
    navigate(`/workspace/${titleSlug}`)
  }

  return (
    <div className='mt-24'>
      {PROBLEM_ACCORDION_ITEMS.map((item) => {
        let content = null
        // const similarQuestions: SimilarQuestion[] = JSON.parse(data.question.similarQuestions)
        switch (item.name) {
          case 'topics':
            content = (
              <div className='flex items-center gap-2'>
                {topics &&
                  topics.map((topic) => (
                    <Badge key={topic.slug} variant='secondary'>
                      {topic.name}
                    </Badge>
                  ))}
              </div>
            )
            break
          // case 'similar_questions':
          //   content = (
          //     <div className='flex flex-col gap-2'>
          //       {similarQuestions.map((item) => (
          //         <div key={item.titleSlug} className='flex justify-between pl-[16px]'>
          //           <Button variant='link' onClick={() => handleNavigate(item.titleSlug)}>
          //             {item.title}
          //           </Button>
          //           <Label className={getDifficultyColor(item.difficulty)}>{item.difficulty}</Label>
          //         </div>
          //       ))}
          //     </div>
          //   )
        }
        if (item.name === 'hints') {
          if (hints && hints.length > 0) {
            return (
              <div key={item.id}>
                {hints.map((hint, index) => (
                  <Accordion key={hint} type='single' collapsible>
                    <AccordionItem value={item.value}>
                      <AccordionTrigger>
                        <Label className='flex items-center gap-3'>
                          {item.icon}
                          {t(item.name) + ' ' + ++index}
                        </Label>
                      </AccordionTrigger>
                      <AccordionContent className={styles.content}>{parse(hint)}</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            )
          }
          return null
        } else {
          return (
            <Accordion key={item.id} type='single' collapsible>
              <AccordionItem value={item.value}>
                <AccordionTrigger>
                  <Label className='flex items-center gap-3'>
                    {item.icon}
                    {t(item.name)}
                  </Label>
                </AccordionTrigger>
                <AccordionContent>{content}</AccordionContent>
              </AccordionItem>
            </Accordion>
          )
        }
      })}
    </div>
  )
}
