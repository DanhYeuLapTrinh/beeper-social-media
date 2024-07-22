import { useEffect, useState } from 'react'

export const useThrottle = (initialSeconds: number) => {
  const [isDisabled, setIsDisabled] = useState(true)
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isDisabled) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 1) {
            clearInterval(timer)
            setIsDisabled(false)
            return 0
          }
          return prevSeconds - 1
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [isDisabled])

  const handleClick = () => {
    setIsDisabled(true)
    setSeconds(initialSeconds)
  }

  return {
    isDisabled,
    seconds,
    handleClick
  }
}
