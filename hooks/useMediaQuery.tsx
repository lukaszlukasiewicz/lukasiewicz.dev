import React, { useState, useEffect, useCallback } from 'react';

const CreateComponent = (match: boolean): React.ReactNode => {
  const Component: React.FC = ({ children }) => <>{match ? children : null}</>
  return Component
}

const useMediaQuery = function (query = ""): boolean {
  const [match, setMatch] = useState(false);

  const matchQuery = useCallback(e => {
    const queryMatch = window.matchMedia(query);
    if (match !== queryMatch.matches) setMatch(queryMatch.matches);
  }, [match, query]);

  useEffect(() => {

    setMatch(window.matchMedia(query).matches)
    window.addEventListener('resize', matchQuery);
    return () => {
      window.removeEventListener('resize', matchQuery);
    }
  }, [matchQuery, query]);
  return match;
}

export default useMediaQuery