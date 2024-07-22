type UserFormType = {
  id: number
  type: 'email' | 'text' | 'password'
  inputType: 'select' | 'input' | 'checkbox'
  options?: { value: string; label: string; id: string }[]
  label?: string // label to display
  placeholder: string
  name: string // name of the field (used in react-hook-form)
  autoFocus?: boolean
}

export const USER_LOGIN_FORM: UserFormType[] = [
  {
    id: 1,
    type: 'text',
    inputType: 'input',
    label: 'identifier',
    placeholder: '',
    name: 'identifier',
    autoFocus: true
  },
  {
    id: 2,
    type: 'password',
    inputType: 'input',
    label: 'password',
    placeholder: '',
    name: 'password'
  }
]

export const USER_FORGOT_PASSWORD_FORM: UserFormType[] = [
  {
    id: 1,
    type: 'text',
    inputType: 'input',
    label: 'email',
    placeholder: 'example@gmail.com',
    name: 'email',
    autoFocus: true
  }
]

export const USER_RESET_PASSWORD_FORM: UserFormType[] = [
  {
    id: 1,
    type: 'password',
    inputType: 'input',
    label: 'password',
    placeholder: '',
    name: 'password'
  },
  {
    id: 2,
    type: 'password',
    inputType: 'input',
    label: 'confirm_password',
    placeholder: '',
    name: 'confirmPassword'
  },
  {
    id: 3,
    type: 'text',
    inputType: 'checkbox',
    label: 'sign_out_all',
    placeholder: '',
    name: 'isSignoutAll'
  }
]
