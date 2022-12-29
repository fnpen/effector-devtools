import { useStore } from "effector-react";
import * as React from "react";
import ReactDOM from "react-dom";
import { Details } from "./components/Details";
import { Logs } from "./components/Logs";
import { LogToolbar } from "./components/LogToolbar";
import { $logIds } from "./store/logs";

declare let __CSS__: string;
document.head.appendChild(document.createElement("style")).append(__CSS__);

const Body = () => {
  const logIds = useStore($logIds);

  return (
    <div className="ed-body">
      <Logs logIds={logIds} />
      <Details />
    </div>
  );
};

const App = () => {
  return (
    <div className="ed-layout">
      <LogToolbar />
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.body);

root.render(<App />);
