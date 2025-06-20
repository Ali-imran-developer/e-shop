import { atom, useAtom } from "jotai";
import { useNavigation } from "react-router-dom";
import { useEffect, useState } from "react";

const queryAtom = atom("");

export function createQueryString(queryObj: any) {
  let path = [];
  for (const [key, value] of Object.entries(queryObj)) {
    path.push(`${key}=${value}`);
  }
  return path.join("&").toString();
}

export default function useQueryParams(pathname: string = "/") {
  const [query, setQuery] = useAtom(queryAtom);
  const navigation: any = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const l = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(l);
  }, [query]);

  const clearQueryParam = (key: string[]) => {
    let url = new URL(location.href);
    key.forEach((item) => url.searchParams.delete(item));
    setQuery(url.search);
    navigation(`${pathname}${url.search}`);
  };

  const setQueryParams = (data: any) => {
    let queryString = "";
    if (typeof data !== "string") {
      queryString = createQueryString(data);
    }
    setQuery(queryString);
  };

  function getParams(url = window.location) {
    const params: any = {};
    // @ts-ignore
    new URL(url).searchParams.forEach(function (val: string, key: string) {
      if (params[key] !== undefined) {
        if (!Array.isArray(params[key])) {
          params[key] = [params[key]];
        }
        params[key].push(val);
      } else {
        params[key] = val;
      }
    });
    return params;
  }

  const updateQueryParams = (key: string, value: string | number | boolean) => {
    if (!value) {
      clearQueryParam([key]);
      return;
    }
    const url = new URL(location.href);
    url.searchParams.set(key, value.toString());
    setQuery(url.search);
    navigation(`${pathname}${url.search}`);
  };

  return {
    query,
    loading,
    getParams,
    setQueryParams,
    updateQueryParams,
    clearQueryParam,
  };
}
