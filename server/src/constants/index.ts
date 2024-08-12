export const ROUTES = {
  PREFIX: {
    V1: '/api/v1',
    USER: '/users',
    LEET_CODE: '/leet-code'
  },
  PRIVATE: {
    ME: '/me'
  }
}

export const enum HTTP_STATUS_CODES {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401, // not logged in
  FORBIDDEN = 403, // unauthorized access (logged in but has no permission)
  NOT_FOUND = 404, // resource not found
  CONFLICT = 409, // conflict or duplicate resource
  UNPROCESSABLE_ENTITY = 422, // missing required fields
  INTERNAL_SERVER_ERROR = 500 // server error
}

export const ERROR_MESSAGES = {
  AUTH: {
    VALIDATION_FAILED: 'Validation failed',
    INVALID_TOKEN: 'Invalid token'
  },
  GENERAL: {
    EMPTY_BODY: 'Request body is missing or empty',
    MISMATCH_TOKEN_VERSION: 'Token version mismatch',
    USER_NOT_FOUND: 'User not found',
    USER_NOT_VERIFIED: 'User not verified'
  },
  PROBLEMS: {
    GET_PROBLEMS_SUCCESS: 'Get problems successful',
    GET_PROBLEM_SUCCESS: 'Get problem successful',
    GET_PROBLEM_TOPICS_SUCCESS: 'Get problem topics successful'
  }
}

export const RESPONSE_MESSAGES = {
  USER: {
    GET_ME: 'Get me successful'
  }
}

export const enum USER_STATUS {
  UNVERIFIED,
  VERIFIED,
  BANNED
}
