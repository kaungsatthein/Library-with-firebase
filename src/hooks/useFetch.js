import { useEffect, useState } from "react";

function useFetch(url, method="GET") {
  const [data, setData] = useState(null);
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    let options = {
      signal,
      method
    }
    setLoading(true);
    const fetchData = () => {
      fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw Error("something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setError(null);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });
    }

    if( method === "POST" && postData) {
      options = {
        ...options,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      }
      fetchData()
    }
    if( method === "GET" ) {
      fetchData();
    }

    //cleanup function
    return () => {
      abortController.abort();
    };
  }, [url, postData]);
  return { setPostData, data, loading, error };
}

export default useFetch;
