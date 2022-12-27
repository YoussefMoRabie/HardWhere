import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [status, setSt] = useState(0);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setSt(data.status);
      });
  }, [url]);
  return { status, data };
};

export default useFetch;
