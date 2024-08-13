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
    WORKSPACE_ID: '/workspace/:workspaceId',
    WORKSPACE_ID_DESC: '/workspace/:workspaceId/description',
    WORKSPACE_ID_EDITORIAL: '/workspace/:workspaceId/editorial',
    WORKSPACE_ID_SOLUTIONS: '/workspace/:workspaceId/solutions',
    WORKSPACE_ID_SUBMISSIONS: '/workspace/:workspaceId/submissions'
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
