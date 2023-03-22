import { AxiosError, AxiosResponse } from 'axios'

import apiClient from '@/infrastructure/api'
import { Resident, ResidentsResponse } from '@/domain/models/Resident'
import { handleError } from '@/infrastructure/api/handleError'

export const fetchResidents = async (
  urls: string[]
): Promise<ResidentsResponse> => {
  try {
    const residentResponses = await Promise.all<AxiosResponse<Resident>>(
      urls.map((url) => apiClient.get(url))
    )
    const responseData = residentResponses.map((response) => response.data)

    return {
      residents: responseData,
    }
  } catch (error) {
    handleError(error as AxiosError, `Error fetching residents: ${error}`)
    throw error
  }
}
