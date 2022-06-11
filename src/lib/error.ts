export interface BackendError {
  code: string;
  message: string;
}

export const VALIDATION_ERR = 'VALIDATION_ERR'
export const DATABASE_ERR = 'DATABASE_ERR'
export const SERVER_FAULT = 'SERVER_FAULT'

export const defaultError = () => ({
  code: SERVER_FAULT,
  message: 'terjadi kesalahan'
})