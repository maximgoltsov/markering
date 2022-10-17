import React from "react";
import ReactDOM from "react-dom";
import Auth from "./Auth";
import AppContent from "./AppContent";

const App = () => {
  return (
    <Auth>
      <AppContent />
    </Auth>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
