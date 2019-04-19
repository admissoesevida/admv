import * as React from "react";
import ReactDOM from "react-dom";
import Expenses from "./Expenses";

it("renders without crashing", (): void => {
  const div = document.createElement("div");
  ReactDOM.render(<Expenses />, div);
  ReactDOM.unmountComponentAtNode(div);
});
