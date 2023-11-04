import { useState, useEffect } from "react";

const CMS_SPACE_ID = import.meta.env.VITE_CMS_SPACE_ID;
const CMS_API_KEY = import.meta.env.VITE_CMS_API_KEY;
const ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${CMS_SPACE_ID}/`;

function useContentful(query: string) {
  const [data, setData] = useState(null);

  useEffect(() => {
    window
      .fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CMS_API_KEY}`,
        },
        body: JSON.stringify({ query }),
      })
      .then((resp) => resp.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.log(errors);
        }
        setData(data);
      });
  }, []);

  return { data };
}

export default useContentful;
