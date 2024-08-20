import { Skeleton as ShadSkeleton } from './ui/skeleton'

interface SkeletonProps {
  className?: string
  isLoading: boolean
  children?: React.ReactNode
}

export default function Skeleton({ className, children, isLoading }: SkeletonProps) {
  return <>{isLoading ? <ShadSkeleton className={className} /> : children}</>
}
