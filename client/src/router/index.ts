export const ROUTES = {
  PRIVATE: {
    HOME: '/',
    EVENT: '/event',
    COMMUNITY: '/communities',
    WATCH: '/watch',
    MARKETPLACE: '/marketplace',
    EXPLORE: '/explore',
    BY_FRIENDS: '/by-friends',
    BY_COMMUNITIES: '/by-communities',
    WORKSPACE: '/workspace',
    WORKSPACE_ID: '/workspace/:workspaceId'
  },
  PUBLIC: {
    AUTH: '/auth',
    SIGN_IN: 'sign-in',
    SIGN_UP: 'sign-up',
    SSO_CALLBACK: '/sso-callback',
    FORGOT_PASSWORD: 'forgot-password',
    OTP_VERIFICATION: 'otp-verification',
    RESET_PASSWORD: 'reset-password',
    NOT_FOUND: '*'
  }
}
