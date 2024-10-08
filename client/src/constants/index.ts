import { langs } from '@uiw/codemirror-extensions-langs'

export const LOCAL_STORAGE_KEYS = {
  HEADER_OPTION: 'headerOption',
  EMAIL_TEMP: 'emailTemp'
}

export const ERROR_MESSAGES = {
  OOPS: 'Oops!'
}

export const MIN_SIZE_PANEL = 2.8
export const TOGGLE_SIZE_PANEL = 5
export const EXPAND_DESC_SIZE_PANEL = 95
export const FULL_SIZE_PANEL = 100
export const DEFAULT_SIZE_PANEL = 50
export const DEFAULT_CODE_SIZE_PANEL = 50
export const DEFAULT_TEST_CASE_SIZE_PANEL = 50

export const LANGUAGES: Record<string, any> = {
  javascript: {
    id: 1,
    name: 'JavaScript',
    value: 'javascript',
    lang: langs.javascript()
  },
  java: {
    id: 2,
    name: 'Java',
    value: 'java',
    lang: langs.java()
  },
  python: {
    id: 3,
    name: 'Python',
    value: 'python',
    lang: langs.python()
  },
  csharp: {
    id: 4,
    name: 'C#',
    value: 'csharp',
    lang: langs.csharp()
  }
}

export const PROBLEM_QUERIES = [
  {
    queryKey: ['problemContent', 'content'],
    params: 'content'
  },
  {
    queryKey: ['problemTopic', 'topic'],
    params: 'topic'
  },
  {
    queryKey: ['problemHints', 'hints'],
    params: 'hints'
  },
  {
    queryKey: ['problemSimilarQuestions', 'similarQuestions'],
    params: 'similar-questions'
  }
]
