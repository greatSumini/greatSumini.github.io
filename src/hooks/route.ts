import { useEffect, useState } from 'react';

export const useQueryParams = (): { [name: string]: string } => {
  const [params, setParams] = useState({});

  useEffect(() => {
    const temp = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, ((
      _str,
      key,
      value
    ) => {
      temp[key] = value;
    }) as () => string);
    setParams(temp);
  }, []);

  return params;
};
