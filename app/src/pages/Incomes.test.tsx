import * as React from "react";
import ReactDOM from "react-dom";
import Incomes from "./Incomes";

it("renders without crashing", (): void => {
  const div = document.createElement("div");
  ReactDOM.render(<Incomes />, div);
  ReactDOM.unmountComponentAtNode(div);
});
