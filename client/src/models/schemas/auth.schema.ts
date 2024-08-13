import { validatePasswordStrength } from '@/lib/utils'
import { z } from 'zod'

export type UserType = 'owner' | 'student'

export type PasswordSchema = {
  password: string
  confirmPassword: string
}

const passwordMatchRefinement = (schema: PasswordSchema, ctx: z.RefinementCtx) => {
  if (schema.password !== schema.confirmPassword) {
    ctx.addIssue({
      code: 'custom',
      message: 'mismatch_password',
      path: ['confirmPassword']
    })
  }
}

// Schema validate only username
export const usernameSchema = z.object({
  username: z
    .string()
    .refine((val) => val.length !== 0, {
      message: 'username_required'
    })
    .refine((val) => val.length >= 4 && val.length <= 30, {
      message: 'username_length_invalid'
    })
    .refine((val) => !val.match(/^\d/), {
      message: 'username_cannot_start_with_number'
    })
    .refine((val) => /^[a-zA-Z0-9_.]+$/.test(val), {
      message: 'username_special_chars_invalid'
    })
})

// Schema validate password and confirmPassword
export const passwordsSchema = z
  .object({
    password: z
      .string()
      .refine((val) => val.length !== 0, {
        message: 'password_required'
      })
      .refine((val) => val.length >= 8 && val.length <= 50, {
        message: 'password_length_invalid'
      })
      .refine((val) => validatePasswordStrength(val), {
        message: 'password_complexity_invalid'
      }),
    confirmPassword: z.string()
  })
  .superRefine(passwordMatchRefinement)

export const infoSignupSchema = z.object({
  type: z.string().min(1),
  lastName: z.string().optional(),
  firstName: z.string().optional(),
  email: z.string().email({ message: 'email_invalid' }),
  otp: z.string().min(6, { message: 'otp_invalid' })
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

export const isSignoutAllSchema = z.object({
  isSignoutAll: z.string().default('off')
})

export const signupSchema = infoSignupSchema.and(passwordsSchema).and(usernameSchema)

export const resetPasswordSchema = isSignoutAllSchema.and(passwordsSchema)
