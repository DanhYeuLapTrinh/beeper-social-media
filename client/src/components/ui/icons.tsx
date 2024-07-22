import { LucideProps } from 'lucide-react'

export const Icons = {
  beeper: (props: LucideProps) => (
    <svg width='150' height='150' viewBox='0 0 150 150' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g clipPath='url(#clip0_15_2)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M23.33 48.62C23.33 29.28 38.93 13.37 58.66 13.37H87.87C107.38 13.37 123.2 29.11 123.2 48.62C123.18 59.13 118.59 68.18 112.2 74.2L105.51 80.87C115.26 86.56 123.12 95.48 123.12 107.58C123.12 125.7 108.43 138.7 90.32 138.7H40.96V79.16C30.53 73.07 23.34 61.68 23.34 48.63L23.33 48.62ZM58.66 23.16C44.38 23.16 33.13 34.63 33.13 48.62C33.13 62.61 44.39 74.08 58.66 74.08H70.82L64.06 108.29L105.33 67.24C110.06 62.83 113.42 56.17 113.42 48.63C113.42 34.43 101.79 23.02 87.89 23.17H58.68L58.66 23.16Z'
          fill='#3a72ec'
        />
      </g>
      <defs>
        <clipPath id='clip0_15_2'>
          <rect width='150' height='150' fill='white' />
        </clipPath>
      </defs>
    </svg>
  ),
  google: (props: LucideProps) => (
    <svg width='128' height='128' viewBox='0 0 128 128' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g clipPath='url(#clip0_24_19)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M27.585 64C27.585 59.843 28.275 55.857 29.508 52.119L7.938 35.648C3.734 44.183 1.366 53.801 1.366 64C1.366 74.191 3.732 83.802 7.929 92.332L29.487 75.829C28.266 72.108 27.585 68.137 27.585 64Z'
          fill='#FBBC05'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M65.457 26.182C74.488 26.182 82.645 29.382 89.054 34.618L107.698 16C96.337 6.109 81.771 0 65.457 0C40.129 0 18.361 14.484 7.938 35.648L29.507 52.119C34.477 37.033 48.644 26.182 65.457 26.182Z'
          fill='#EA4335'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M65.457 101.818C48.645 101.818 34.478 90.967 29.508 75.881L7.938 92.349C18.361 113.516 40.129 128 65.457 128C81.089 128 96.014 122.449 107.215 112.049L86.741 96.221C80.964 99.86 73.689 101.818 65.457 101.818Z'
          fill='#34A853'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M126.634 64C126.634 60.218 126.051 56.145 125.177 52.364H65.457V77.091H99.833C98.114 85.522 93.436 92.003 86.741 96.221L107.215 112.049C118.981 101.129 126.634 84.861 126.634 64Z'
          fill='#4285F4'
        />
      </g>
      <defs>
        <clipPath id='clip0_24_19'>
          <rect width='128' height='128' fill='white' />
        </clipPath>
      </defs>
    </svg>
  ),
  facebook: (props: LucideProps) => (
    <svg width='512' height='512' viewBox='0 0 512 512' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g clipPath='url(#clip0_24_13)'>
        <path
          d='M512 256C512 114.615 397.385 0 256 0C114.615 0 0 114.615 0 256C0 383.777 93.616 489.685 216 508.89V330H151V256H216V199.6C216 135.44 254.219 100 312.695 100C340.704 100 370 105 370 105V168H337.719C305.918 168 296 187.733 296 207.978V256H367L355.65 330H296V508.89C418.385 489.685 512 383.777 512 256Z'
          fill='#1877F2'
        />
        <path
          d='M355.65 330L367 256H296V207.978C296 187.733 305.917 168 337.719 168H370V105C370 105 340.703 100 312.695 100C254.219 100 216 135.44 216 199.6V256H151V330H216V508.89C229.033 510.935 242.392 512 256 512C269.608 512 282.966 510.935 296 508.89V330H355.65Z'
          fill='white'
        />
      </g>
      <defs>
        <clipPath id='clip0_24_13'>
          <rect width='512' height='512' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}
