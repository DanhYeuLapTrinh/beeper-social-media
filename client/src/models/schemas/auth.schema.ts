import { z } from 'zod'

export const signupSchema = z
  .object({
    type: z.string().min(1),
    name: z.string().min(4, { message: 'your full name must be atleast 4 characters long' }),
    email: z.string().email({ message: 'Incorrect email format' }),
    password: z.string().min(8, { message: 'Your password must be atleast 8 characters long' }).max(64, {
      message: 'Your password can not be longer then 64 characters long'
    }),
    confirmPassword: z.string(),
    otp: z.string().min(6, { message: 'You must enter a 6 digit code' })
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'passwords do not match',
    path: ['confirmPassword']
  })
  .superRefine(({ password }, checkPassComplexity) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch)
    const containsLowercase = (ch: string) => /[a-z]/.test(ch)
    const containsSpecialChar = (ch: string) => /[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/.test(ch)
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0
    for (let i = 0; i < password.length; i++) {
      const ch = password.charAt(i)
      if (!isNaN(+ch)) countOfNumbers++
      else if (containsUppercase(ch)) countOfUpperCase++
      else if (containsLowercase(ch)) countOfLowerCase++
      else if (containsSpecialChar(ch)) countOfSpecialChar++
    }
    if (countOfLowerCase < 1 || countOfUpperCase < 1 || countOfSpecialChar < 1 || countOfNumbers < 1) {
      checkPassComplexity.addIssue({
        code: 'custom',
        message: 'password does not meet complexity requirements'
      })
    }
  })

export const loginSchema = z.object({
  identifier: z
    .string()
    .refine((val) => val.length !== 0, {
      message: 'identifier_required'
    })
    .refine((val) => val.length >= 4 && val.length <= 50, {
      message: 'identifier_length_invalid'
    }),
  password: z
    .string()
    .refine((val) => val.length !== 0, {
      message: 'password_required'
    })
    .refine((val) => val.length >= 8 && val.length <= 50, {
      message: 'password_length_invalid'
    })
})

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'email_invalid' })
})

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .refine((val) => val.length !== 0, {
        message: 'password_required'
      })
      .refine((val) => val.length >= 8 && val.length <= 50, {
        message: 'password_length_invalid'
      }),
    confirmPassword: z.string(),
    isSignoutAll: z.string().default('off')
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'mismatch_password',
    path: ['confirmPassword']
  })
  .superRefine(({ password }, checkPassComplexity) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch)
    const containsLowercase = (ch: string) => /[a-z]/.test(ch)
    const containsSpecialChar = (ch: string) => /[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/.test(ch)
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0
    for (let i = 0; i < password.length; i++) {
      const ch = password.charAt(i)
      if (!isNaN(+ch)) countOfNumbers++
      else if (containsUppercase(ch)) countOfUpperCase++
      else if (containsLowercase(ch)) countOfLowerCase++
      else if (containsSpecialChar(ch)) countOfSpecialChar++
    }
    if (countOfLowerCase < 1 || countOfUpperCase < 1 || countOfSpecialChar < 1 || countOfNumbers < 1) {
      checkPassComplexity.addIssue({
        code: 'custom',
        message: 'password_complexity_invalid',
        path: ['password']
      })
    }
  })
