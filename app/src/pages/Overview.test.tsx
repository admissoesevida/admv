import * as React from "react";
import ReactDOM from "react-dom";
import Overview from "./Overview";

it("renders without crashing", (): void => {
  const div = document.createElement("div");
  ReactDOM.render(<Overview />, div);
  ReactDOM.unmountComponentAtNode(div);
});
