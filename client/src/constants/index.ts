export const LOCAL_STORAGE_KEYS = {
  HEADER_OPTION: 'headerOption',
  EMAIL_TEMP: 'emailTemp'
}

export const ERROR_MESSAGES = {
  IDENTIFIER: {
    REQUIRED: 'Please enter your email or username',
    LENGTH_INVALID: 'Identifier must be between 4 and 50 characters long'
  },
  PASSWORD: {
    REQUIRED: 'Please enter your password',
    LENGTH_INVALID: 'Password must be between 8 and 50 characters long'
  },
  WRONG_CREDS: 'Identifier or password is incorrect',
  EMAIL: {
    INVALID_EMAIL: 'Please enter a valid email address',
    EMAIL_NOT_FOUND: "Couldn't find your account",
    MISSING_EMAIL_FOR_OTP: 'Please enter your email address to receive a code',
    INVALID_CODE: 'Invalid code',
    RESET_PASSWORD_FAILED: 'Failed to reset password'
  },
  OOPS: 'Oops! Something went wrong'
}
