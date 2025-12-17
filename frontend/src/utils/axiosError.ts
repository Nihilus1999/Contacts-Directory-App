import { AxiosError } from 'axios'

interface ApiErrorPayload {
  message?: string
}

export function getAxiosErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorPayload | undefined
    return data?.message || error.message || 'Error inesperado'
  }

  if (error instanceof Error) return error.message

  return 'Error inesperado'
}
