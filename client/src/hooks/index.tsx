import React from "react";
import { useLocation } from "react-router-dom";

// use previous value, useful for evaluation prev props
export const usePrevious = (value) => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

// use route query parameters, useful for accessing query params
export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
