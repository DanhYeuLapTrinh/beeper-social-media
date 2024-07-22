import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Hàm giúp nối các className Tailwind lại với nhau
 * @param inputs: ClassValue[] (string)
 * @example
 * <div className={cn('text-red-500', 'bg-blue-500')} />
 * @returns thẻ div với className="text-red-500 bg-blue-500"
 * @author Nguyen Huu Danh
 * @version 1.0.1.0 [version] [subChange] [delivery] [fixBug]
 * Version 1 chưa có sự thay đổi lớn (>90%) đã delivery và chưa fixBug
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Hàm nhận vào email và trả về email đã censored
 * @param inputs: email (string)
 * @example demo@gmail.com
 * @returns demo****@gmail.com
 * @author Nguyen Huu Danh
 * @version 1.0.1.0
 */
export function maskEmail(email: string) {
  const [localPart, domain] = email.split('@')
  const maskedLocalPart = localPart.substring(0, 4) + '****'
  return `${maskedLocalPart}@${domain}`
}

export function getClerkError(code: string) {
  switch (code) {
    case 'form_code_incorrect':
      return 'incorrect_code'
    case 'form_password_incorrect':
      return 'incorrect_password'
    case 'form_identifier_not_found':
      return 'account_not_found'
    default:
      return 'something_went_wrong'
  }
}
