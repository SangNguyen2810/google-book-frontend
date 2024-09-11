import { useState, useEffect, useMemo } from 'react';

interface FetchResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

interface FetchParams {
  title: string;
  authors: string;
  cursor: string | null;
  limit: number;
}

function useFetch<T>(baseUrl: string, params: FetchParams): FetchResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const url = useMemo(() => {
    console.log("params:", params.cursor)
    const query = new URLSearchParams({
      title: params.title,
      authors: params.authors,
      limit: params.limit.toString(),
      cursor: params.cursor || '',
    }).toString();

    return `${baseUrl}?${query}`;
  }, [baseUrl, params])

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isLoading, error, refetch };
}

export default useFetch;