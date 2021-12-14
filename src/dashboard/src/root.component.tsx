import { Suspense } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { RecoilRoot } from "recoil";
import { Dashboard } from "./dashboard";
import { DataProvider } from "./data-provider";

const url = "http://localhost:8181/websocketHub";

const FallbackComponent = (props: FallbackProps) => {
  return (
    <div>
      <div>Sorry. Couldn't get configuration data {props.error}</div>
      <button onClick={props.resetErrorBoundary}>OK</button>
    </div>
  );
};

export default function Root(props) {
  return (
    <RecoilRoot>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <Suspense fallback={<div>Trying to get devices configuration ...</div>}>
          <DataProvider url={url}>
            {(props) => <Dashboard {...props} />}
          </DataProvider>
        </Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
}
