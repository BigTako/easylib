export const errorMessage = {
  UNAUTHORIZED: 'You are not logged in',
  INVALID_TOKEN: 'Token is invalid or has expired',
  DOC_NOT_FOUND: 'No document found with that ID',
  FIELD_REQUIRED: (field: string) => `${field} is required`,
  INVALID_FIELD_TYPE: (field: string, type: string) => `${field} must be a ${type}`,
  UNKNOWN_URL: (url: string) => `Can't find ${url} on this server!`,
  STRLEN_MAX: (field: string, max: number) => `${field} must be at most ${max} characters long`,
  STRLEN_MIN: (field: string, min: number) => `${field} must be at least ${min} characters long`
}
