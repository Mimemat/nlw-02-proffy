import { AxiosError } from 'axios';
import useSwr from 'swr';

import { api } from '../../services/api';

export function useGet<Data = 'any', Error = 'any'>(
  url: string,
): {
  data?: Data;
  error?: AxiosError<Error>;
} {
  const { data, error } = useSwr<Data, AxiosError<Error>>(
    url,
    async givenUrl => {
      const response = await api.get(givenUrl);

      return response.data;
    },
    {
      errorRetryCount: 3,
    },
  );

  return { data, error };
}
