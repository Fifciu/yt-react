import React, { useEffect, useRef } from "react";
import classes from "./MobileSearch.module.css";
import ArrowIcon from "../icons/ArrowIcon";
import SearchIcon from "../icons/SearchIcon";
import { SearchContext } from "../context/SearchContext";
import { UIContext } from "../context/UIContext";
import { useFocus } from "../../hooks/useFocus";
import { proxyAxios } from "../../axios";
import debounce from 'lodash.debounce';
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import SpeechToSearchQueryBtn from "../SpeechToSearchQueryBtn";

async function fetchSuggestions(searchQuery) {
  if (searchQuery.length < 1) {
    return
  }
  try {
    const { data } = await proxyAxios.get(`/suggestions?q=${searchQuery}`);
    return JSON.parse(data)?.[1]?.map(arr => arr[0]) || data;
  } catch (err) {
    console.error(`Couldn't fetch suggestions: ${err}`)
  }
}

const debouncedFetchSuggetions = debounce(fetchSuggestions, 500, { leading: true, trailing: true });

function MobileSearch() {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = React.useContext(SearchContext);
  const { setIsMobileSearchOpen } = React.useContext(UIContext);
  const searchInput = useRef(null);
  // const { startRecording, stopRecording, isRecording, } = useSpeechRecognition();

  function search(event) {
    event.preventDefault();
    navigate(`/app/search-results?q=${searchQuery}`);
  }

  // TODO: Improve
  const { refetch, data: searchSuggestions, error } = useQuery({
    queryKey: ['quick-search', searchQuery],
    queryFn: () => debouncedFetchSuggetions(searchQuery),
    enabled: !!searchQuery
  });

  useEffect(() => {
    if (searchQuery.length) {
      refetch();
    }
  }, [searchQuery, refetch]);

  useFocus(searchInput);

  return (
    <>
      <form className={classes.search} onSubmit={search}>
        <button type="button" className={classes.searchCloseBtn} onClick={() => setIsMobileSearchOpen(false)}><ArrowIcon /></button>
        <div className={classes.searchWrapper}>
          <input ref={searchInput} type="search" placeholder="Search in YouTube" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
          <button type="submit"><span><SearchIcon /></span></button>
        </div>
        <SpeechToSearchQueryBtn />
      </form>
      {searchSuggestions?.length && <SearchSuggestions suggestions={searchSuggestions} />}
    </>
  );
}

function SearchSuggestions({ suggestions }) {
  const { searchQuery } = React.useContext(SearchContext);
  const emphasizedSuggestions = suggestions?.map(suggestion => suggestion.slice(searchQuery.length));

  return (
    <ul className={classes.searchResults}>
      {emphasizedSuggestions?.map((suggestion, index) =>
        <li key={suggestions[index]} className={classes.searchSuggestion}>
          <Link to={`/app/search-results?q=${encodeURIComponent(suggestion)}`} className={classes.searchSuggestionLink}>
            <span>{searchQuery}</span>
            <span className={classes.emphasizedPart}>{suggestion}</span>
          </Link>
        </li>
      )}
    </ul>
  )
}

export default MobileSearch;
