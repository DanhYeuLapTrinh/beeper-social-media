import { type ClassValue, clsx } from 'clsx'
import { UserFormType } from '@/constants/forms'
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
export const cn = (...inputs: ClassValue[]) => {
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
export const maskEmail = (email: string) => {
  const [localPart, domain] = email.split('@')
  const maskedLocalPart = localPart.substring(0, 4) + '****'
  return `${maskedLocalPart}@${domain}`
}

export const getClerkError = (code: string) => {
  switch (code) {
    case 'form_code_incorrect':
      return 'incorrect_code'
    case 'form_password_incorrect':
      return 'incorrect_password'
    case 'form_identifier_not_found':
      return 'account_not_found'
    case 'too_many_requests':
      return 'too_many_requests'
    case 'form_identifier_exists':
      return 'username_exists'
    case 'form_password_pwned':
      return 'password_pwned'
    default:
      return 'something_went_wrong'
  }
}

export const validatePasswordStrength = (password: string) => {
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/.test(password)

  return hasUppercase && hasLowercase && hasNumber && hasSpecialChar
}

export const renderForm = (fields: UserFormType[]): UserFormType[][] => {
  const rows: UserFormType[][] = []
  let currentRow: UserFormType[] = []

  fields.forEach((field, index) => {
    // We first push the field into the currentRow array
    currentRow.push(field)

    const isLastField = index === fields.length - 1
    const nextField = fields[index + 1]
    // If the field has col layout (it will take the full width and stand alone) or it is the last field
    // or the next field is also col then push the currentRow (at this point an array of 1 field) into rows
    // then reset the currentRow to an empty array.
    if (!field.layout || field.layout === 'col' || isLastField || (nextField && nextField.layout === 'col')) {
      rows.push(currentRow)
      currentRow = []
    } else if (field.layout === 'row' && (!nextField || nextField.layout === 'row')) {
      // If the current field is for a double layout and the next field exists and is also double,
      // we will do nothing and wait for the loop to start over to push the next field into the currentRow
    }
    // DEMO:
    // row row col col
    // (1) (2) (3) (4)
    // The loop starts with (1) and push it into currentRow then it see that it is a row and the nextField is also a row so it do nothing
    // The loop starts with (2) and push it into currentRow (at this time contains (1)) since (2) also a row
    // The loop starts with (3) and see that it is a col so it push the currentRow (contains 1 and 2) into rows and reset currentRow to an empty array
    // ...
  })
  return rows
}

export const getDifficultyColor = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
  switch (difficulty) {
    case 'Easy':
      return 'text-teal-500'
    case 'Medium':
      return 'text-amber-500'
    case 'Hard':
      return 'text-red-500'
  }
}
