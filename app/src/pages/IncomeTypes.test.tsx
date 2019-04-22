import * as React from "react";
import ReactDOM from "react-dom";
import IncomeTypes from "./Incomes";

it("renders without crashing", (): void => {
  const div = document.createElement("div");
  ReactDOM.render(<IncomeTypes />, div);
  ReactDOM.unmountComponentAtNode(div);
});
