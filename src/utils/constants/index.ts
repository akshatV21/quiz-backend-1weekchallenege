import { Permission, Role } from '../types'

export const ROLES = {
  USER: 'user',
  MODERATOR: 'moderator',
  ADMIN: 'admin',
} as const

export const ENTITIES = {
  USER: 'user',
  QUESTION: 'question',
  SET: 'set',
  SUBMISSION: 'submission',
  REPORT: 'report',
} as const

export const ACTIONS = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
} as const

// user-specific actions
export const USER_ACTIONS = {
  BAN: 'ban',
  UNBAN: 'unban',
} as const

// submission-specific actions
export const SUBMISSION_ACTIONS = {
  APPROVE: 'approve',
  REJECT: 'reject',
} as const

// Role-Based Access (RBA) configuration
export const RBAs: Record<Role, Readonly<Permission[]>> = {
  admin: [
    'user:create',
    'user:read',
    'user:update',
    'user:delete',
    'user:ban',
    'user:unban',
    'question:create',
    'question:read',
    'question:update',
    'question:delete',
    'set:create',
    'set:read',
    'set:update',
    'set:delete',
    'submission:read',
  ],
  moderator: [
    'user:read',
    'user:ban',
    'user:unban',
    'question:read',
    'question:update',
    'question:delete',
    'set:read',
    'set:update',
    'submission:read',
    'submission:approve',
    'submission:reject',
    'report:read',
    'report:delete',
  ],
  user: [
    'user:read',
    'question:read',
    'set:read',
    'submission:create',
    'submission:read',
    'submission:update',
    'submission:delete',
    'report:create',
    'report:read',
  ],
} as const

export const TOPICS = {
  ANIMALS: 'animals',
  SCIENCE: 'science',
  PHYSICS: 'physics',
  BIOLOGY: 'biology',
  CHEMISTRY: 'chemistry',
  MATH: 'math',
  GEOGRAPHY: 'geography',
  HISTORY: 'history',
  SPORTS: 'sports',
  MOVIES: 'movies',
  MUSIC: 'music',
  LITERATURE: 'literature',
  ART: 'art',
  POLITICS: 'politics',
  PROGRAMMING: 'programming',
  SPACE: 'space',
} as const

export const QUESTIONS_LIST_LIMIT = 20
