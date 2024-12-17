import { useQuery } from "@tanstack/react-query";
import debounce from 'lodash.debounce';
import { proxyAxios } from "../axios";

async function fetchSuggestions(searchQuery) {
  try {
    const { data } = await proxyAxios.get(`/suggestions?q=${searchQuery}`);
    return data
  } catch(err) {
    console.error(`Couldn't fetch suggestions: ${err}`)
  }
}

const debouncedFetchSuggetions = debounce(fetchSuggestions, 500, { leading: true, trailing: true });

export function useQuickSearch(searchQuery) {
  return useQuery({
    queryKey: ['quick-search', searchQuery],
    queryFn: () => debouncedFetchSuggetions(searchQuery),
    enabled: !!searchQuery
  })
}