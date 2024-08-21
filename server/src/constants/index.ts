export const ROUTES = {
  PREFIX: {
    V1: '/api/v1',
    USER: '/users',
    LEET_CODE: '/leet-code'
  },
  PRIVATE: {
    ME: '/me'
  },
  LEET_CODE: {
    ALL: '/all',
    QUESTION: '/:titleSlug',
    CONTENT: '/:titleSlug/content',
    TOPIC: '/:titleSlug/topic',
    HINTS: '/:titleSlug/hints',
    TEST_CASE: '/:titleSlug/testcase',
    QUESTION_OF_TODAY: '/question-of-today'
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

export enum USER_STATUS {
  NORMAL,
  PREMIUM
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
    USER_NOT_VERIFIED: 'User not verified',
    UNAUTHORIZED: 'Unauthorized access',
    NOT_FOUND: 'Resource not found',
    FORBIDDEN: 'Forbidden access',
    BAD_REQUEST: 'Bad request',
    CONFLICT: 'Conflict or duplicate resource',
    REDIS_TIMEOUT: 'Redis takes too long to respond'
  },
  QUESTIONS: {
    GET_QUESTIONS_SUCCESS: 'Get questions successful',
    GET_QUESTION_SUCCESS: 'Get question successful'
  },
  FILTERS: {
    INVALID_FILTER_KEYS: 'Invalid filter keys',
    INVALID_TYPE_CATEGORY_SLUG: 'Category slug must be a string',
    INVALID_TYPE_LIMIT: 'Limit must be a number',
    INVALID_TYPE_SKIP: 'Skip must be a number'
  }
}

export const RESPONSE_MESSAGES = {
  USER: {
    GET_ME: 'Get me successful'
  }
}

export const LEET_CODE_FILTER_KEYS = ['difficulty', 'listId', 'status', 'tags']

export const CACHE_KEYS = {
  QUESTION: {
    PREFIX: 'question',
    HEADER: 'header',
    CONTENT: 'content',
    TOPIC: 'topic',
    HINTS: 'hints',
    TEST_CASE: 'testcase'
  }
}
