import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import * as router from './router';
import AppContainer from "./components/App/AppContainer";

const route = router.initialize();

ReactDOM.render(<AppContainer router={route} />, document.getElementById("root"));

if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
