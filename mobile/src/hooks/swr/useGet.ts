import { AxiosRequestConfig, AxiosError } from 'axios';
import useSWR from 'swr';

import { api } from '../../services/api';

export function useGet<Data = 'any', Error = 'any'>(
  givenUrl: string,
  aditional?: AxiosRequestConfig,
): { data?: Data; error?: AxiosError<Error> } {
  const { data, error } = useSWR<Data, AxiosError>(
    givenUrl,
    async url => {
      const response = await api.get(url, aditional && aditional);

      return response.data;
    },
    {
      errorRetryCount: 3,
    },
  );

  return { data, error };
}
