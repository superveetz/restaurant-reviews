import React from "react";
import styled from "@emotion/styled";

// src
import Spinner from "components/ui/spinner";
import AppLayout from "components/layout";

const AppWrapper = styled.div`
  margin: 0;
  padding: 0;
  min-height: 100vh;
  min-width: 100vw;
`;
export interface AppProps {
  isFetchingActiveSession: boolean;
}

const App: React.FC<AppProps> = (props) => {
  const { isFetchingActiveSession } = props;

  if (isFetchingActiveSession) return <Spinner />;
  return (
    <AppWrapper className="App">
      <AppLayout />
    </AppWrapper>
  );
};

export default App;
