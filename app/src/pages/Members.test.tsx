import * as React from "react";
import ReactDOM from "react-dom";
import Members from "./Members";

it("renders without crashing", (): void => {
  const div = document.createElement("div");
  ReactDOM.render(<Members />, div);
  ReactDOM.unmountComponentAtNode(div);
});
