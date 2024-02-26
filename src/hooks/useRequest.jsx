import useSWR from 'swr';

const baseUrl = 'https://pokeapi.co/api/v2';

export function useRequest(path, name) {
  if (!path) {
    throw new Error('Path is required');
  }
  
  const url = name ? `${baseUrl}${path}/${name}?limit=20&offset=20` : `${baseUrl}${path}`;
  
  // We use the useSWR hook to fetch the data based on the key
  // that is provided as well as the fetcher function
  // The key with useSWR is the URL that you want to fetch from.
  // useSWR does use caching as well.
  // The URL will be the key in useSWR's cache
  const { data, error } = useSWR(url);
  
  return { data, error };
}
