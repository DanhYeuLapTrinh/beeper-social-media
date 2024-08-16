export const ROUTES = {
  PRIVATE: {
    HOME: '/',
    EVENT: '/event',
    COMMUNITY: '/communities',
    WATCH: '/watch',
    MARKETPLACE: '/marketplace',
    PROBLEM_SET: '/problemset',
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
    SSO_CALLBACK: '/sso-callback',
    NOT_FOUND: '*'
  }
}
