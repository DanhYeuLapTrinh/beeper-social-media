export type UserFormType = {
  id: number
  type: 'email' | 'text' | 'password'
  inputType: 'select' | 'input' | 'checkbox'
  options?: { value: string; label: string; id: string }[]
  label?: string // label to display
  placeholder: string
  name: string // name of the field (used in react-hook-form)
  autoFocus?: boolean
  layout?: 'row' | 'col'
  optional?: boolean
}

export const USER_SIGNIN_FORM: UserFormType[] = [
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
    name: 'password',
    autoFocus: true
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

export const USER_SIGNUP_FORM: UserFormType[] = [
  {
    id: 1,
    type: 'text',
    inputType: 'input',
    label: 'last_name',
    placeholder: '',
    name: 'lastName',
    autoFocus: true,
    layout: 'row',
    optional: true
  },
  {
    id: 2,
    type: 'text',
    inputType: 'input',
    label: 'first_name',
    placeholder: '',
    name: 'firstName',
    layout: 'row',
    optional: true
  },
  {
    id: 3,
    type: 'text',
    inputType: 'input',
    label: 'username',
    placeholder: '',
    name: 'username',
    layout: 'col'
  },
  {
    id: 4,
    type: 'text',
    inputType: 'input',
    label: 'email',
    placeholder: 'example@gmail.com',
    name: 'email',
    layout: 'col'
  },
  {
    id: 5,
    type: 'password',
    inputType: 'input',
    label: 'password',
    placeholder: '',
    name: 'password',
    layout: 'col'
  },
  {
    id: 6,
    type: 'password',
    inputType: 'input',
    label: 'confirm_password',
    placeholder: '',
    name: 'confirmPassword',
    layout: 'col'
  }
]
