import Fuse from "fuse.js";
import { useEffect, useMemo, useRef, useState } from "react";
import Card from "@components/Card";
import type { CollectionEntry } from "astro:content";

export type SearchItem = {
  title: string;
  description: string;
  data: CollectionEntry<"blog">["data"];
  slug: string;
};

interface Props {
  searchList: SearchItem[];
}

interface SearchResult {
  item: SearchItem;
  refIndex: number;
}

export default function SearchBar({ searchList }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null
  );

  const fuse = useMemo(
    () =>
      new Fuse(searchList, {
        keys: ["title", "description"],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.5,
      }),
    [searchList]
  );

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInputVal(event.currentTarget.value);
  };

  useEffect(() => {
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");

    if (searchStr) {
      setInputVal(searchStr);
    }

    setTimeout(() => {
      if (!inputRef.current) return;

      const cursorPosition = searchStr?.length || 0;
      inputRef.current.selectionStart = cursorPosition;
      inputRef.current.selectionEnd = cursorPosition;
    }, 50);
  }, []);

  useEffect(() => {
    const inputResult =
      inputVal.length > 1
        ? fuse.search(inputVal)
        : [];

    setSearchResults(inputResult);

    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputVal);

      const newRelativePathQuery =
        window.location.pathname +
        "?" +
        searchParams.toString();

      history.replaceState(
        history.state,
        "",
        newRelativePathQuery
      );
    } else {
      history.replaceState(
        history.state,
        "",
        window.location.pathname
      );
    }
  }, [inputVal, fuse]);

  return (
    <div className="site-search">
      <label className="site-search-field">
        <span className="site-search-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            focusable="false"
          >
            <path
              d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>

        <span className="sr-only">
          Search articles
        </span>

        <input
          ref={inputRef}
          className="site-search-input"
          placeholder="Search articles..."
          type="search"
          name="search"
          value={inputVal}
          onChange={handleChange}
          autoComplete="off"
        />
      </label>

      {inputVal.length > 1 && (
        <div className="site-search-count">
          Found {searchResults?.length ?? 0}
          {(searchResults?.length ?? 0) === 1
            ? " result"
            : " results"}{" "}
          for “{inputVal}”
        </div>
      )}

      <div className="site-search-results">
        {searchResults &&
          searchResults.map(({ item, refIndex }) => (
            <Card
              href={`/posts/${item.slug}/`}
              frontmatter={item.data}
              key={`${refIndex}-${item.slug}`}
            />
          ))}
      </div>
    </div>
  );
}
