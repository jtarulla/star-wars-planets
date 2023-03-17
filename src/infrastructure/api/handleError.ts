import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

export const handleError = (
  error: AxiosError,
  defaultMessage?: string
): void => {
  const message = defaultMessage || error.message || 'An error occurred'

  toast.error(message)
}
